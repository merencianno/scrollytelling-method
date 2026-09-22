# Medição: como conferir antes de dizer que está pronto

> **Não reportar como feito o que não foi medido.**
>
> Essa é a regra inteira. Tudo abaixo é o ferramental para cumpri-la.

A skill sabe desenhar e sabe verificar contrato de copy. O que faltava era
**medir** — e foi por aí que o tempo vazou. Numa sessão de referência, 47% das
rodadas foram correções de fidelidade a um golden master: tracejado com cadência
errada, cor aproximada, largura estimada, sombra que o protótipo não tinha.

Nenhuma delas era difícil. Todas eram mensuráveis. O erro não foi de técnica, foi
de hábito: eu entregava dizendo "pixel perfect" sem ter comparado com o print.

Há uma assimetria que vale internalizar: **o que dá para medir, quem constrói
pega sozinho e custa zero. O que se confere no olho, o cliente pega e custa uma
rodada.** Mover itens da segunda coluna para a primeira é o trabalho deste
arquivo.

---

## 1. Retângulos de um protótipo em PNG

O comando que encerra a discussão de medida.

```bash
magick PROTOTIPO.png -colorspace sRGB -threshold 98% -negate \
  -define connected-components:verbose=true \
  -define connected-components:area-threshold=8000 \
  -connected-components 8 null: 2>/dev/null | head -12
```

Saída: um `LARGURAxALTURA+X+Y` por bloco detectado.

**Ache a escala do export** dividindo uma largura medida por uma largura que o
cliente declarou. Com a escala na mão, todas as outras medidas do print viram
valores reais.

```
medido 447 px  ÷  declarado 366 px  =  escala 1,2235
```

O `-threshold 98%` isola o que é quase-branco (cards sobre fundo cinza). Para
outros contrastes, ajuste o threshold ou inverta o `-negate`. Para achar um
bloco de cor específica:

```bash
magick REF.png -colorspace sRGB -fuzz 12% -fill black -opaque "#B0246F" \
  -fill white +opaque black \
  -define connected-components:verbose=true \
  -define connected-components:area-threshold=20000 \
  -connected-components 8 null: 2>/dev/null | head -6
```

**Episódio.** Quatro cards num protótipo tinham larguras de 366, 270, 292 e
312 px — quatro valores diferentes, desenhados à mão. Duas rodadas foram gastas
tentando chegar lá por proporção de coluna numa grade, o que era impossível por
construção. O comando acima devolveu os quatro retângulos ao décimo, na primeira
tentativa.

**Regra derivada:** grade de colunas iguais não reproduz layout desenhado à mão.
Se o protótipo tem medida, a medida é o contrato.

---

## 2. Cor exata, por moda de região

```bash
magick REF.png -crop 150x42+178+524 -colorspace sRGB txt:- \
  | grep -oE '#[0-9A-Fa-f]{6}' | sort | uniq -c | sort -rn | head -3
# -> 156 #E7F2FB   <- o fundo
```

Para a **tinta** dentro do bloco (o pixel mais escuro da região):

```bash
magick REF.png -crop 150x42+178+524 -colorspace sRGB txt:- | python3 -c "
import sys, re
p = [(0.299*int(h[1:3],16)+0.587*int(h[3:5],16)+0.114*int(h[5:7],16), h)
     for h in re.findall(r'#[0-9A-Fa-f]{6}', sys.stdin.read())]
print(min(p)[1])"
# -> #1C68C6
```

**Nunca amostre por pixel único.** `%[pixel:p{x,y}]` parece mais simples e é
armadilha: em borda de texto ou de forma arredondada o pixel cai em antialias e
devolve uma cor que não existe no design. Cinco amostragens por pixel único
numa sessão devolveram valores misturados — `srgba(148,230,246,1)` para um texto
que é `#1C68C6`.

**Cor que se repete é canônica; cor que aparece uma vez é acidente de slide.**
Uma cor de apoio apareceu com o hex idêntico em três lugares da referência —
foi assim que se soube que era cor de sistema e não de uma peça.

---

## 3. Padrão de um tracejado

`border-dashed` não reproduz tracejado de referência: o navegador reparte os
traços por conta própria e a cadência sai diferente. Escaneie uma linha do PNG e
conte as corridas de cor:

```bash
magick REF.png -crop LARGURAx1+0+Y -depth 8 txt:- | grep -oE '#[0-9A-Fa-f]{6}'
# agrupe corridas iguais: traço 12 px, vão 8 px, espessura 2 px, #989A9D
```

Vira exato em CSS:

```css
background-image: repeating-linear-gradient(90deg, #989A9D 0 12px, transparent 12px 20px);
height: 2px;
```

**Episódio.** Uma linha tracejada de 1 px com `border-dashed` foi entregue como
fiel ao protótipo. O cliente viu na hora: "parece que o pontilhado está muito
mais fino do que na referência". Era. E a ponta da seta, feita de traço fino,
lia como um segundo elemento — o protótipo tinha triângulo cheio na mesma cor.

---

## 4. Escala tipográfica da página inteira

O de maior retorno por linha escrita. **Rodar ao fim de cada rodada, não só no
fim do projeto.**

```js
// audit-tipografia.mjs — node audit-tipografia.mjs http://localhost:3000/rota
import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
await p.goto(process.argv[2], { waitUntil: "networkidle" });
const d = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll("section[data-dobra]").forEach((s) => {
    s.querySelectorAll("h1,h2,h3").forEach((h) => {
      const cs = getComputedStyle(h);
      out.push({
        dobra: s.dataset.dobra,
        tag: h.tagName,
        px: Math.round(parseFloat(cs.fontSize)),
        lh: Math.round(parseFloat(cs.lineHeight)),
        ls: cs.letterSpacing,
        txt: h.textContent.trim().slice(0, 34),
      });
    });
  });
  return { out, aninhados: document.querySelectorAll("h1 h1, h2 h2, h3 h3").length };
});
d.out.forEach((h) => console.log(h.dobra, h.tag, `${h.px}/${h.lh}/${h.ls}`, h.txt));
console.log("\ntamanhos distintos:", [...new Set(d.out.map((h) => h.px))].sort((a, b) => a - b).join(", "));
console.log("títulos aninhados no DOM:", d.aninhados);
await b.close();
```

**Episódio.** Este script achou **quinze headlines em nove tamanhos**, com dois
sistemas de tracking convivendo (-1% nas dobras refeitas, -2,5% herdado do global
nas intocadas). Nenhuma revisão visual pega isso: cada seção, sozinha, parece
certa. É o sedimento de construir em ondas — cada rodada refaz algumas dobras e
deixa as outras.

O contador de **títulos aninhados** achou outro defeito invisível: um componente
de acordeão de biblioteca já renderiza `<h3>` no cabeçalho, e havia outro `<h3>`
dentro. Sete perguntas existiam duas vezes no DOM. Invisível na tela, HTML
inválido, leitor de tela lendo em dobro.

---

## 5. Contar linhas de verdade

```js
const r = document.createRange();
r.selectNodeContents(el);
r.getClientRects().length;   // número real de caixas de linha
```

**Nunca `altura ÷ line-height`.** Com fonte secundária no meio do título, a caixa
de linha infla e a conta mente: três linhas de 52 px mediram 187 px, a divisão
deu 3,6 e o arredondamento disse 4. Isso levou a alargar uma coluna atrás de um
problema que não existia — duas rodadas.

**Ressalva:** com `<span>` aninhado dentro do título, `getClientRects()` também
infla, porque conta fragmentos. Quando houver aninhamento, **olhe o print**. A
medição diz onde olhar; não substitui olhar.

---

## 6. Medir o elemento certo

```js
document.querySelector("#dobra-02 h2");        // o primeiro h2 da dobra
document.querySelector("#dobra-02 .and-tit");  // o que você quer medir
```

**Episódio.** Três medições seguidas descreveram o elemento errado. A dobra tinha
dois `h2` — o do cabeçalho e o da cena — e `querySelector` devolve o primeiro. As
conclusões tiradas dali (tamanho errado, tracking errado) mandaram a investigação
para o lado oposto do problema.

**Regra:** em dobra com mais de um título, dar classe própria ao que se quer
medir, e medir por ela.

---

## 7. Vãos, folgas e espaçamento declarado

```js
const r = (el) => el.getBoundingClientRect();
Math.round(r(cards[0]).top - r(h2).bottom);    // vão título → cards
Math.round(r(sec).bottom - r(img).bottom);     // folga da foto até o fim da seção
```

Isto transforma "parece certo" em "52 px, como pedido". Foi como os
52 / 32 / 16 / 12 / 0 px de um golden master foram confirmados um a um, em vez de
aprovados no olho.

**Folga zero é medível.** Quando o pedido é "a imagem cola no fim da seção", o
número existe e é 0 — não "parece colado".

---

## 8. Contraste, antes de aprovar

```js
const lum = (h) => {
  const c = [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contraste = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return ((x + 0.05) / (y + 0.05)).toFixed(2);
};
contraste("#ffffff", "#a9a9b8");   // 2.32  <- baixo
contraste("#ffffff", "#6d6d86");   // 5.02  <- mesmo tom, um degrau mais escuro
```

**Episódio.** Texto branco sobre uma cor de apoio clara foi implementado a
pedido do cliente e entregue com o número junto: 2,3:1. Isso é o certo a fazer — a decisão é dele,
mas ele decide sabendo. Sem medir, a entrega teria sido "ficou bonito" e o
problema apareceria depois, no celular, no sol.

**Medir não é vetar.** É dar ao cliente o dado que ele não tem como enxergar.

---

## 9. Conversão de imagem para o artefato

```bash
magick identify ORIGEM.png              # confira a resolução nativa primeiro
cwebp -q 84 ORIGEM.png -o destino.webp
```

**Nunca reamostre para cima.** Uma foto de 800×1126 virou 1000 px de largura numa
primeira tentativa e foi descartada: é pixel inventado por interpolação. De
1,6 MB para 74 KB é ganho real; de 800 para 1000 px é ilusão que só pesa o
artefato.

---

## Quando medir

| momento | o que rodar |
|---|---|
| ao receber um golden master | §1, §2, §3 — extrair as medidas antes de escrever CSS |
| ao fechar uma seção | §7 (vãos declarados) e §5 (quebras de linha) |
| ao fim de cada rodada | §4 (escala tipográfica) e `verify-fidelidade.mjs` |
| antes de aprovar cor sobre cor | §8 |
| antes de publicar | `verify-copy-contract.mjs` + `audit-viewports.mjs` |

## O que a medição não resolve

Ela elimina **falta de insumo**, não **construção de gosto**.

Um "ficou horrível" depois de três rodadas pode ser descoberta legítima — o
cliente vendo na tela o que não sabia que queria. Isso não é desperdício e não se
previne com script. O que se previne é a outra metade: entregar com sombra que o
protótipo não tem, largura estimada, cor aproximada.

Separar as duas é o ponto. Medição encurta a primeira metade para que sobre tempo
para a segunda.

## Print de uma dobra com animação

Não medir a partir de `fullPage`: ele redimensiona o viewport e reinicia as
entradas no instante da captura. `scripts/shoot-dobra.mjs <url> <seletor>
[largura]` mede a altura da dobra, reabre com viewport ≥ dobra **antes** de
carregar, rola em passos, espera, exercita os scrubs e captura o clip — e
devolve, no mesmo comando, o teste de overflow-x e os `pageerror` da dobra.
Sempre dois prints por seção, 1440 e 390; 768 quando o subagente avisar
risco naquele breakpoint. Quem faz o mockup confere o print **na largura
real do mockup** (300 px de tela de celular), não só da seção.
