#!/usr/bin/env node
/**
 * Contrato de copy executável.
 *
 * A regra "a copy não muda uma vírgula" só vale se algo verificar. Este script
 * confere que cada frase-contrato continua literalmente no HTML publicado, que
 * a contagem de CTAs bate, e que nenhum marcador de pendência escapou.
 *
 * Roda contra o HTML gerado, não contra o código-fonte: é o que o visitante
 * recebe que importa, e é onde um refactor bem-intencionado quebra a copy.
 *
 * Uso:
 *   node verify-copy-contract.mjs <arquivo-ou-diretorio> <contratos.json>
 *
 * Ex.:
 *   node verify-copy-contract.mjs out/index.html contratos.json
 *   node verify-copy-contract.mjs out-one/ contratos.json
 *
 * Formato de contratos.json:
 * {
 *   "frases": [
 *     ["1a dobra", "Tudo que sua empresa precisa"],
 *     ["7a dobra (preco)", "12x de R$ X"]
 *   ],
 *   "cta": { "label": "QUERO CONHECER", "minimo": 6, "atributo": "data-cta", "exato": 6 },
 *   "proibidos": ["TODO(", "TODO-PENDENTE", "lorem ipsum", "placeholder"]
 * }
 *
 * Só "frases" é obrigatório.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const [, , targetArg, contractsArg] = process.argv;

if (!targetArg || !contractsArg) {
  console.error("Uso: node verify-copy-contract.mjs <arquivo-ou-diretorio> <contratos.json>");
  process.exit(1);
}

const target = existsSync(targetArg) && statSync(targetArg).isDirectory()
  ? path.join(targetArg, "index.html")
  : targetArg;

if (!existsSync(target)) {
  console.error(`✗ HTML não encontrado: ${target}`);
  process.exit(1);
}
if (!existsSync(contractsArg)) {
  console.error(`✗ contratos não encontrados: ${contractsArg}`);
  process.exit(1);
}

const html = readFileSync(target, "utf8");
const contracts = JSON.parse(readFileSync(contractsArg, "utf8"));
const failures = [];

/**
 * O HTML traz entidades e quebras que não existem na copy. Normalizar os dois
 * lados evita falso negativo — mas sem colapsar o que importa: acento, caixa e
 * pontuação continuam significativos, porque é exatamente o que não pode mudar.
 */
function normalize(s) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/\s+/g, " ");
}

/**
 * Só para o diagnóstico: aplaina aspas e travessões tipográficos. A verificação
 * de verdade não usa isso — ’ e ' são caracteres diferentes e a copy escolheu um
 * deles. Serve para dizer "a frase está lá, o que difere é a pontuação", que é o
 * erro mais comum de quem escreve o contrato à mão a partir de um documento.
 */
function flattenTypography(s) {
  return s
    .replace(/[‘’‛′]/g, "'")
    .replace(/[“”″]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...");
}

const text = normalize(html);
const textFlat = flattenTypography(text);

// 1. Uma frase literal e contígua por dobra.
for (const entry of contracts.frases ?? []) {
  const [rotulo, frase] = Array.isArray(entry) ? entry : [entry, entry];
  const alvo = normalize(frase);
  if (text.includes(alvo)) continue;

  if (textFlat.includes(flattenTypography(alvo))) {
    // A frase está na página; o que difere é aspas curvas, travessão ou
    // reticências. Quase sempre o contrato é que foi digitado errado, não a
    // página — o documento de origem costuma trazer a pontuação tipográfica.
    failures.push(
      `${rotulo}: a frase existe, mas com pontuação tipográfica diferente` +
        `\n      no contrato: "${frase}"` +
        `\n      corrija o contrato copiando a frase direto da copy canônica`,
    );
  } else {
    failures.push(`${rotulo}: a frase-contrato sumiu do HTML\n      esperado: "${frase}"`);
  }
}

// 2. CTAs: o rótulo repetido e, quando houver, o atributo que os marca.
//    A contagem exata pega tanto CTA perdido quanto CTA duplicado sem querer.
const cta = contracts.cta;
if (cta?.label) {
  const encontrados = text.split(normalize(cta.label)).length - 1;
  if (cta.minimo != null && encontrados < cta.minimo) {
    failures.push(`CTA: ${encontrados} ocorrência(s) do rótulo, esperado ao menos ${cta.minimo}`);
  }
  if (cta.atributo) {
    const marcados = html.split(cta.atributo).length - 1;
    if (cta.exato != null && marcados !== cta.exato) {
      failures.push(`CTA: ${marcados} elemento(s) com ${cta.atributo}, esperado exatamente ${cta.exato}`);
    }
  }
}

// 3. Pendências que não podem ir para produção.
for (const proibido of contracts.proibidos ?? []) {
  if (html.toLowerCase().includes(proibido.toLowerCase())) {
    failures.push(`Placeholder no artefato: "${proibido}"`);
  }
}

const total = (contracts.frases ?? []).length;

if (failures.length) {
  console.error(`\n✗ Contrato de copy quebrado (${failures.length} de ${total} verificações):\n`);
  for (const f of failures) console.error(`  • ${f}`);
  console.error(
    "\n  Se a frase mudou de propósito, atualize o contrato no mesmo commit.",
    "\n  Se ela foi partida por um <span> de ênfase no meio, escolha outro trecho",
    "\n  contíguo da mesma frase como contrato — a verificação é por string inteira.\n",
  );
  process.exit(1);
}

console.log(`✓ Contrato de copy íntegro: ${total} frase(s), CTAs conferidos, sem placeholders.`);
