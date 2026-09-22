// Print de UMA dobra sem reiniciar as animações.
//
// Por que existe: `fullPage` (e `locator.screenshot()` de elemento mais alto que a
// viewport) redimensiona o viewport durante a captura; o `matchMedia` roda de novo e
// o `gsap.from` reinicia no instante do print. O elemento aparece vazio com
// `opacity: 1` no `getComputedStyle`. Custou uma hora em duas sessões diferentes.
//
// Receita: 1) mede a altura da dobra; 2) reabre com viewport >= dobra ANTES do goto;
// 3) rola em passos até a dobra (dispara os gatilhos no caminho), espera o GSAP
// assentar, rola por dentro (exercita scrubs) e volta; 4) captura o clip, sem fullPage.
// De graça: teste de overflow-x e captura de pageerror/console.error da dobra.
//
// uso: node scripts/shoot-dobra.mjs <url> <seletor> [largura=1440] [espera_ms=1800] [saida=shots/]
// ex.: node scripts/shoot-dobra.mjs http://localhost:3000/pagina "#dobra-06" 390
// Rodar de dentro do projeto (precisa do playwright de node_modules).
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const [url, seletor, larguraArg = "1440", esperaArg = "1800", saidaArg = "shots"] = process.argv.slice(2);
if (!url || !seletor) {
  console.error("uso: node scripts/shoot-dobra.mjs <url> <seletor> [largura] [espera_ms] [saida]");
  process.exit(2);
}
const largura = Number(larguraArg);
const espera = Number(esperaArg);
const nome = seletor.replace(/[^a-z0-9-]/gi, "") || "dobra";
mkdirSync(saidaArg, { recursive: true });
const out = join(saidaArg, `${nome}-${largura}.png`);
const RUIDO = /CORS|ERR_FAILED|favicon/;

const browser = await chromium.launch();

// 1) medir a altura da dobra numa página descartável
let page = await browser.newPage({ viewport: { width: largura, height: 900 } });
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector(seletor, { timeout: 60000 });
const altura = await page.evaluate((s) => document.querySelector(s).offsetHeight, seletor);
await page.close();

// 2) reabrir com o viewport definitivo ANTES de carregar
const alturaViewport = Math.min(Math.max(altura + 120, 900), 6000);
page = await browser.newPage({ viewport: { width: largura, height: alturaViewport } });
const erros = [];
page.on("pageerror", (e) => erros.push("PAGEERROR " + e.message));
page.on("console", (m) => {
  if (m.type() === "error" && !RUIDO.test(m.text())) erros.push("CONSOLE " + m.text().slice(0, 160));
  if (m.type() === "warning" && /builder falhou/.test(m.text())) erros.push("WARN " + m.text().slice(0, 160));
});
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector(seletor, { timeout: 60000 });
await page.waitForTimeout(800);

// 3) rolar em passos até o topo da dobra, esperar, rolar por dentro, voltar
const topo = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + window.scrollY, seletor);
for (let y = 0; y < topo; y += 500) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(60);
}
await page.evaluate((yy) => window.scrollTo(0, yy), topo);
await page.waitForTimeout(espera);
const h = await page.evaluate((s) => document.querySelector(s).offsetHeight, seletor);
for (let y = topo; y < topo + h; y += 400) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(80);
}
await page.evaluate((yy) => window.scrollTo(0, yy), topo);
await page.waitForTimeout(700);

// 4) capturar o clip da dobra, nunca fullPage
const r = await page.evaluate((s) => {
  const b = document.querySelector(s).getBoundingClientRect();
  return { top: b.top, height: b.height };
}, seletor);
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
await page.screenshot({
  path: out,
  clip: { x: 0, y: Math.max(0, r.top), width: largura, height: Math.min(r.height, 6000) },
});
console.log(`ok ${out} ${Math.round(r.height)}px alto; overflow-x=${overflow}${erros.length ? "\n" + erros.join("\n") : ""}`);
await browser.close();
process.exit(erros.some((e) => e.startsWith("PAGEERROR")) ? 1 : 0);
