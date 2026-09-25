#!/usr/bin/env node
/**
 * Auditoria visual de uma landing scrollytelling.
 *
 * Faz as duas coisas que uma rodada precisa: mede o que dá para medir
 * (overflow horizontal, conteúdo preso invisível, erros de runtime) e produz
 * o que precisa ser olhado (um print por seção, em cada largura).
 *
 * Medição não substitui olhar o print — ela só diz onde olhar primeiro.
 *
 * Uso:
 *   node audit-viewports.mjs <url> [dir-de-saida] [larguras] [seletor-de-secao]
 *
 * Ex.:
 *   node audit-viewports.mjs http://localhost:3000/minha-pagina
 *   node audit-viewports.mjs http://localhost:3000/minha-pagina .audit 320,768,1280 "[data-dobra]"
 *
 * Requer Playwright instalado no projeto; rode a partir da raiz do repositório.
 */
import { createRequire } from "module";
import path from "node:path";
import { mkdirSync } from "node:fs";

const require = createRequire(path.join(process.cwd(), "package.json"));
const { chromium } = require("playwright");

const [, , url, outArg, widthsArg, selectorArg] = process.argv;

if (!url) {
  console.error("Uso: node audit-viewports.mjs <url> [dir-saida] [larguras] [seletor]");
  process.exit(1);
}

const outDir = outArg ?? path.join(process.cwd(), ".audit-viewports");
const WIDTHS = (widthsArg ?? "320,375,414,768,1024,1280,1440")
  .split(",")
  .map((w) => Number(w.trim()))
  .filter(Boolean);
const SECTION = selectorArg ?? "[data-dobra], section[id]";

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
let failures = 0;
let warnings = 0;

/**
 * Procura conteúdo que a pessoa nunca vai ver — mas sem acusar o que está
 * invisível de propósito, que é a fonte de falso alarme mais comum aqui.
 *
 * Dois filtros, ambos deliberados:
 *
 * - **Só conta elemento com texto.** Camada decorativa invisível não prejudica
 *   ninguém; parágrafo que não aparece, sim.
 * - **Ignora elemento com `animation-name` próprio.** Num ciclo de estados
 *   (a janela que alterna quatro ferramentas, por exemplo) as telas ficam
 *   empilhadas e só uma é visível por vez — por projeto, não por defeito. Quem
 *   decide a visibilidade delas é o próprio CSS.
 *
 * O que sobra é o alvo real: texto deixado em opacity 0 por uma entrada que
 * nunca disparou.
 */
const probeInvisible = () => {
  const out = [];
  for (const el of document.querySelectorAll("section *")) {
    const cs = getComputedStyle(el);
    if (Number(cs.opacity) > 0.01) continue;
    if (cs.animationName && cs.animationName !== "none") continue;
    if (!el.textContent?.trim()) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 24 || r.height < 24) continue;
    const cls = (el.className?.toString?.() ?? "").slice(0, 44);
    out.push(`${el.tagName.toLowerCase()}.${cls} — "${el.textContent.trim().slice(0, 40)}"`);
  }
  return out;
};

/**
 * Rola como uma pessoa rolaria. Saltar direto para o fim não dispara os
 * gatilhos de scroll, e a página fotografada fica com tudo ainda escondido.
 */
async function scrollLikeAUser(page) {
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const steps = Math.max(40, Math.round(total / 120));
    for (let i = 0; i <= steps; i += 1) {
      window.scrollTo(0, (total * i) / steps);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
  await page.waitForTimeout(1200);
}

for (const width of WIDTHS) {
  // Uma página por largura, criada e fechada por vez. Páginas em paralelo
  // dessincronizam animações em CSS e produzem prints que parecem bugados
  // sem que exista bug nenhum.
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const runtimeErrors = [];
  page.on("pageerror", (e) => runtimeErrors.push(String(e).slice(0, 200)));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await scrollLikeAUser(page);

  // 1. Overflow horizontal, com o elemento culpado nomeado.
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    if (doc.scrollWidth <= doc.clientWidth) return null;
    const limit = doc.clientWidth;
    const culprits = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > limit + 1 || r.left < -1) {
        culprits.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.toString?.() ?? "").slice(0, 70),
          right: Math.round(r.right),
          left: Math.round(r.left),
        });
      }
    }
    return { scrollWidth: doc.scrollWidth, clientWidth: limit, culprits: culprits.slice(0, 5) };
  });

  if (overflow) {
    failures += 1;
    console.log(`✗ ${width}px — overflow horizontal: ${overflow.scrollWidth} > ${overflow.clientWidth}`);
    for (const c of overflow.culprits) {
      console.log(`    <${c.tag} class="${c.cls}"> left ${c.left} right ${c.right}`);
    }
  } else {
    console.log(`✓ ${width}px — sem overflow`);
  }

  // 2. Conteúdo preso invisível depois de a página ter sido rolada inteira.
  const stuck = (await page.evaluate(probeInvisible)).slice(0, 8);

  if (stuck.length) {
    warnings += 1;
    console.log(`  ⚠ ${stuck.length} elemento(s) em opacity 0 após o scroll — conferir no print:`);
    for (const s of stuck) console.log(`    ${s}`);
  }

  if (runtimeErrors.length) {
    failures += 1;
    console.log(`✗ ${width}px — erro de runtime: ${runtimeErrors[0]}`);
  }

  // 3. Um print por seção. O viewport é alto o bastante para caber a seção
  //    inteira: fotografar um elemento mais alto que o viewport reinicia
  //    animações que dependem de media query.
  const sections = await page.$$(SECTION);
  for (const [i, section] of sections.entries()) {
    const box = await section.boundingBox();
    if (!box) continue;
    const tall = Math.min(Math.ceil(box.height) + 80, 4000);
    await page.setViewportSize({ width, height: tall });
    await page.waitForTimeout(250);
    const id = (await section.getAttribute("data-dobra")) ?? (await section.getAttribute("id")) ?? String(i + 1);
    await section.screenshot({ path: path.join(outDir, `${width}-${String(id).padStart(2, "0")}.png`) });
    await page.setViewportSize({ width, height: 900 });
  }

  await page.close();
}

// 4. Uma passada com movimento reduzido: tudo precisa nascer visível e legível.
const reduced = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await reduced.goto(url, { waitUntil: "networkidle" });
await reduced.waitForTimeout(800);
const invisibleUnderReduced = await reduced.evaluate(probeInvisible);
if (invisibleUnderReduced.length > 0) {
  // Aviso, não falha: um ciclo automático parado deixa os estados seguintes
  // invisíveis, e isso pode ser deliberado — quem não quer movimento vê só a
  // primeira tela. Vira defeito quando o texto escondido só existe ali. Essa
  // diferença um script não decide; quem revisa, sim.
  warnings += 1;
  console.log(
    `  ⚠ reduced-motion — ${invisibleUnderReduced.length} trecho(s) de texto não aparecem sem movimento:`,
  );
  for (const s of invisibleUnderReduced.slice(0, 6)) console.log(`    ${s}`);
  console.log("    Deliberado se for estado de ciclo; defeito se esse texto não existir em outro lugar.");
} else {
  console.log("✓ reduced-motion — nenhum texto escondido");
}
await reduced.screenshot({ path: path.join(outDir, "reduced-motion.png"), fullPage: true });
await reduced.close();

await browser.close();

console.log(`\nPrints em ${outDir}`);
console.log(failures ? `\n${failures} falha(s), ${warnings} aviso(s).` : `\nSem falhas, ${warnings} aviso(s).`);
process.exit(failures ? 1 : 0);
