#!/usr/bin/env node
/**
 * Contrato de geometria executável — o irmão do `verify-copy-contract.mjs`.
 *
 * A copy tem verificador desde sempre. A **fidelidade ao golden master** não
 * tinha nenhum, e é onde o retrabalho se concentra: tracejado com cadência
 * errada, largura estimada, altura que não bate, folga que "parece" zero.
 *
 * O contrato declara o que foi combinado com quem aprova — tamanho de fonte,
 * entrelinha, tracking, largura, altura, vão entre blocos. O script mede a
 * página de verdade e **falha com código 1** se algo divergir, para poder
 * entrar em gate ao lado do verificador de copy.
 *
 * Roda contra a página servida (dev ou preview), não contra o código: é o que
 * o navegador calcula que importa. Uma classe de tipografia perdida para uma
 * regra global de maior especificidade não aparece no código-fonte — aparece
 * aqui.
 *
 * Uso:
 *   node verify-fidelidade.mjs <url> <contrato.json> [largura]
 *
 * Ex.:
 *   node verify-fidelidade.mjs http://localhost:3000/pagina contrato.json
 *   node verify-fidelidade.mjs http://localhost:3000/pagina contrato.json 390
 *
 * Formato do contrato: ver `assets/contrato-fidelidade-exemplo.json`.
 */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(path.join(process.cwd(), "package.json"));

/** O projeto pode ter `playwright` ou `@playwright/test`; os dois servem. */
function carregarChromium() {
  for (const pkg of ["playwright", "@playwright/test"]) {
    try {
      return require(pkg).chromium;
    } catch {
      /* tenta o próximo */
    }
  }
  console.error("✗ Playwright não encontrado. Rode a partir da raiz do projeto.");
  process.exit(1);
}

const [, , url, contratoArg, larguraArg] = process.argv;

if (!url || !contratoArg) {
  console.error("Uso: node verify-fidelidade.mjs <url> <contrato.json> [largura]");
  process.exit(1);
}
if (!existsSync(contratoArg)) {
  console.error(`✗ contrato não encontrado: ${contratoArg}`);
  process.exit(1);
}

const contrato = JSON.parse(readFileSync(contratoArg, "utf8"));
const LARGURA = Number(larguraArg) || contrato.largura || 1440;
const TOLERANCIA = contrato.tolerancia ?? 1;

/**
 * Tracking precisa de tolerância própria, muito menor. Ele é sub-pixel: a
 * diferença entre -1% e -2,5% num título de 38px é 0,57px, e uma tolerância de
 * 1px deixa passar exatamente o tipo de deriva que este script existe para
 * pegar — foi assim que uma página acumulou dois sistemas de tracking
 * convivendo sem ninguém notar.
 */
const TOLERANCIA_TRACKING = contrato.toleranciaTracking ?? 0.05;

/**
 * Tracking costuma ser especificado em porcentagem no Figma e calculado em px
 * pelo navegador. Aceitar os dois evita que o contrato tenha de ser reescrito
 * a cada mudança de tamanho de fonte.
 */
function esperadoEmPx(valor, fontSize) {
  if (typeof valor === "number") return valor;
  const txt = String(valor).trim();
  if (txt.endsWith("%")) return (parseFloat(txt) / 100) * fontSize;
  return parseFloat(txt);
}

const chromium = carregarChromium();
const browser = await chromium.launch();

/* `reducedMotion` porque o contrato descreve a **geometria em repouso**. Com
   movimento ligado, medir no meio de uma entrada devolve o estado intermediário
   e o script acusaria falha onde não há. */
const page = await browser.newPage({
  viewport: { width: LARGURA, height: 1200 },
  reducedMotion: "reduce",
});

await page.goto(url, { waitUntil: "networkidle" });
/* As fontes mudam métrica depois de carregar, e métrica muda altura de caixa.
   Sem esperar, o primeiro alvo de tipografia mede o fallback. */
await page.evaluate(() => (document.fonts ? document.fonts.ready : null));
await page.waitForTimeout(400);

const falhas = [];
const linhas = [];

for (const alvo of contrato.alvos ?? []) {
  const tol = alvo.tolerancia ?? TOLERANCIA;
  const rotulo = alvo.rotulo ?? alvo.seletor ?? (alvo.entre ?? []).join(" → ");

  // ---- Vão entre dois elementos ------------------------------------------
  if (alvo.entre) {
    const [selA, selB] = alvo.entre;
    const medido = await page.evaluate(
      ([a, b]) => {
        const ea = document.querySelector(a);
        const eb = document.querySelector(b);
        if (!ea || !eb) return null;
        const ra = ea.getBoundingClientRect();
        const rb = eb.getBoundingClientRect();
        return {
          folgaInferior: Math.round(rb.bottom - ra.bottom),
          folgaSuperior: Math.round(ra.top - rb.top),
          vao: Math.round(rb.top - ra.bottom),
        };
      },
      [selA, selB],
    );

    if (!medido) {
      falhas.push(`${rotulo}: seletor não encontrado (${selA} ou ${selB})`);
      linhas.push(`  ✗ ${rotulo} — elemento ausente`);
      continue;
    }

    let ok = true;
    const partes = [];
    for (const chave of ["folgaInferior", "folgaSuperior", "vao"]) {
      if (alvo[chave] == null) continue;
      const dif = Math.abs(medido[chave] - alvo[chave]);
      const passou = dif <= tol;
      ok = ok && passou;
      partes.push(`${chave} ${medido[chave]}px (esperado ${alvo[chave]})`);
      if (!passou) falhas.push(`${rotulo}: ${chave} ${medido[chave]}px, esperado ${alvo[chave]}px`);
    }
    linhas.push(`  ${ok ? "✓" : "✗"} ${rotulo} — ${partes.join(", ")}`);
    continue;
  }

  // ---- Tipografia e caixa de um ou mais elementos --------------------------
  const medidos = await page.evaluate((sel) => {
    return [...document.querySelectorAll(sel)].map((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        fontSize: parseFloat(cs.fontSize),
        lineHeight: parseFloat(cs.lineHeight),
        letterSpacing: cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    });
  }, alvo.seletor);

  if (!medidos.length) {
    falhas.push(`${rotulo}: nenhum elemento casa com "${alvo.seletor}"`);
    linhas.push(`  ✗ ${rotulo} — seletor sem correspondência`);
    continue;
  }

  if (alvo.quantidade != null && medidos.length !== alvo.quantidade) {
    falhas.push(`${rotulo}: ${medidos.length} elemento(s), esperado ${alvo.quantidade}`);
  }

  let ok = alvo.quantidade == null || medidos.length === alvo.quantidade;
  const partes = [];

  for (const chave of ["fontSize", "lineHeight", "letterSpacing", "width", "height"]) {
    if (alvo[chave] == null) continue;

    /* Valor em lista = um esperado por elemento, na ordem do DOM. É o caso de
       cards com largura própria, que foi justamente o que uma grade de colunas
       iguais nunca conseguiu reproduzir. */
    const esperados = Array.isArray(alvo[chave]) ? alvo[chave] : medidos.map(() => alvo[chave]);

    if (Array.isArray(alvo[chave]) && alvo[chave].length !== medidos.length) {
      falhas.push(
        `${rotulo}: ${chave} tem ${alvo[chave].length} valor(es) para ${medidos.length} elemento(s)`,
      );
      ok = false;
      continue;
    }

    /* Tracking usa a tolerância fina; caixa e tamanho usam a do alvo. */
    const tolChave =
      chave === "letterSpacing" ? (alvo.toleranciaTracking ?? TOLERANCIA_TRACKING) : tol;

    const divergentes = [];
    medidos.forEach((m, i) => {
      const esperado = esperadoEmPx(esperados[i], m.fontSize);
      if (Math.abs(m[chave] - esperado) > tolChave) {
        divergentes.push(`#${i + 1} ${Math.round(m[chave] * 100) / 100} ≠ ${Math.round(esperado * 100) / 100}`);
      }
    });

    if (divergentes.length) {
      ok = false;
      falhas.push(`${rotulo}: ${chave} — ${divergentes.join(", ")}`);
      partes.push(`${chave} ✗`);
    } else {
      const amostra = Array.isArray(alvo[chave])
        ? alvo[chave].join("/")
        : Math.round(medidos[0][chave] * 100) / 100;
      partes.push(`${chave} ${amostra}`);
    }
  }

  linhas.push(`  ${ok ? "✓" : "✗"} ${rotulo} (${medidos.length}) — ${partes.join(", ")}`);
}

await browser.close();

console.log(`\nFidelidade em ${LARGURA}px — ${url}\n`);
for (const l of linhas) console.log(l);

if (falhas.length) {
  console.error(`\n✗ Geometria fora do contrato (${falhas.length} divergência(s)):\n`);
  for (const f of falhas) console.error(`  • ${f}`);
  console.error(
    "\n  Se a medida mudou de propósito, atualize o contrato no mesmo commit.",
    "\n  Se um valor de tipografia veio diferente do declarado, suspeite de",
    "\n  especificidade: regra global de h1–h3 (0,1,1) vence utilitária (0,1,0)",
    "\n  e o tamanho aplicado por classe utilitária é descartado em silêncio.\n",
  );
  process.exit(1);
}

console.log(`\n✓ Geometria conforme o contrato: ${(contrato.alvos ?? []).length} alvo(s).\n`);
