# Animação — os quatro padrões

Agnóstico de stack: aqui ficam o padrão e o porquê. A implementação colável
está em `stacks/next-tailwind-gsap.md`.

## A divisão de trabalho

**A biblioteca de animação faz entradas, scrub e parallax. O CSS faz todos os
loops.** Tudo que é pontual e reage ao scroll vive no JS; tudo que repete para
sempre (um cursor arrastando um card, um chip trocando de estado, um fio de
luz respirando) vive em `@keyframes`. Três razões:

1. **Custo por frame.** Um loop em JS mantém o motor acordado a cada frame,
   para cada elemento, o tempo inteiro. Numa página de 14 dobras com dezenas
   de micro-cenas simultâneas isso é uma fila permanente na main thread. Em
   CSS, a composição fica com o navegador e o JS não participa.
2. **O que não está em cena não anima.** Loops de CSS nascem com
   `animation-play-state: paused` e só ligam quando a seção entra na viewport
   (padrão B). Seção nunca vista custa zero.
3. **Fallback estático trivial.** Sob `prefers-reduced-motion`, desligar um
   loop de CSS é `animation: none` e o elemento fica no estado que o HTML já
   descreve. Desligar um loop de JS exige que alguém tenha pensado no estado
   final.

Regra de decisão: se o efeito precisa saber onde o scroll está, é JS; se
repete sozinho, é CSS. Híbridos (loop que começa quando a seção entra) são
CSS com o gatilho em JS — nunca um loop em JS.

## Padrão A — entrada por scroll

Um bloco sobe alguns pixels e aparece ao chegar perto da viewport, uma vez só.

- `opacity` 0 → 1; `y` entre 16 e 40 px (texto em 26; cards e caixas grandes
  36–40; listas laterais usam `x: -14` no lugar do `y`).
- Duração 0.5–0.95 s: quanto maior o elemento, mais longa a entrada.
- Easing `power3.out` — chega rápido e assenta devagar. Para "pops" (um check
  que acende, um selo que carimba), um `back.out` curto de ~0.4 s.
- `stagger` 0.08–0.14 entre irmãos. Acima disso a lista arrasta; abaixo, vira
  um bloco só.
- `start` entre `"top 70%"` e `"top 92%"`: blocos de texto disparam cedo
  (70–80%), itens dentro de um container já animado disparam tarde (86–92%),
  senão a entrada do pai atropela a do filho.
- Dispara uma vez e não reverte — em direct response nada some ao rolar de
  volta.

Listas longas não ganham um tween por item: ganham um mecanismo de lote
(`ScrollTrigger.batch`) com `once: true` e intervalo de ~0.08 s. No celular
isso acumula linha a linha; no desktop vira cascata.

## Padrão B — loops pausados (a assinatura do estilo)

É o que dá a sensação de "produto funcionando" na página inteira.

1. Escrever a micro-cena em `@keyframes` puros.
2. Dar aos elementos animados da seção uma classe comum (`flow-anim`,
   `grid-anim`, `cost-anim`) com duração, iteração infinita,
   `animation-fill-mode: both` e `animation-play-state: paused`.
3. Cada elemento recebe uma segunda classe que só diz `animation-name`.
4. Uma regra `.secao-live .secao-anim { animation-play-state: running }` liga
   tudo de uma vez.
5. A classe `*-live` entra **uma única vez** quando a seção aparece —
   `toggleClass` com `once: true`, geralmente entre `"top 60%"` e `"top 80%"`.

O ponto sutil: a classe vai no **container da cena**, não em cada elemento.
Todas as micro-ações partem no mesmo instante e ficam em fase — um ciclo de
12 s com quatro estações só funciona se as quatro começaram juntas.

**Por que os keyframes ficam num `<style>` local prefixado pelo id da seção**
(`#dobra-03 .flow-anim { … }`):

- **Colocalidade** — cena e timing no mesmo arquivo; reescrever a seção não
  deixa keyframes órfãos numa folha global.
- **Isolamento de nomes** — dezenas de seções usam nomes curtos e parecidos
  (`grid-tick`, `flow-type`, `hero-check`); o prefixo impede que a regra de
  uma alcance elemento de outra. Os `@keyframes` em si são globais no
  documento, então o nome deles também é prefixado.
- **Keyframes calculados** — quando os quadros dependem de constantes do
  componente (número de estações, duração do ciclo), o CSS precisa ser gerado
  por função no mesmo módulo; folha estática não conseguiria.

O preço é HTML maior (na `/ref`, os 14 blocos inline foram parte de ~260 KB,
que o gzip reduz a ~40 KB). Vale para uma landing; num app com muitas rotas,
mover para uma folha por rota.

## Padrão C — ciclos multi-estado

Quando N estados se alternam no mesmo espaço — o hero alterna quatro
ferramentas, CRM → Tasks → Chat → VSL — os keyframes passam a ser **gerados
por função**. Cada estado ocupa `100/N` do ciclo: 8 s por ferramenta, quatro
ferramentas, ciclo de 32 s, 25% cada. Para o estado `i`, com `a = i * 25`:

```text
0%,  a%         → invisível (ainda não é a vez)
a+1.5%, a+24%   → visível (a entrada leva ~1,5% ≈ 0,5 s)
a+25.5%, 100%   → invisível de novo
```

Dois relógios convivem: um ciclo longo decide **qual** estado está em cena
(32 s) e um ciclo curto toca a micro-ação **dentro** do estado (8 s). Como 32
é múltiplo de 8, cada ferramenta sempre vê a micro-ação desde o começo.

**Ancorar `0%` e `100%`.** Todo keyframe gerado precisa declarar o valor nos
dois extremos. Sem isso o navegador interpola do primeiro quadro declarado até
o último, atravessando o ciclo inteiro: na `/ref`, um card ficava acinzentado
o tempo todo porque a opacidade não tinha quadro em `0%` — um apagar de 2 s
virou um fade de 10 s. A forma segura é sempre
`0%, X% { inicial } … Y%, 100% { inicial }`, com os estados no meio.

## Padrão D — scrub

Raro, e reservado a **narrativas de progresso**: uma conta que soma, barras
que preenchem, uma linha que se desenha acompanhando a leitura. O scrub prende
o tempo da animação à posição do scroll, então o leitor sente que produz o
efeito.

- Easing sempre linear (`ease: "none"`): curva sobre algo já controlado pelo
  dedo do usuário vira borracha.
- Suavização pequena (0.6–0.8) para o movimento não granular com a roda.
- Intervalo curto (`start: "top 70%"`, `end: "bottom 55%"`) — a narrativa
  termina antes de a seção sair de cena.
- Parallax é um caso de scrub: `y` negativo, `ease: "none"`, de `"top bottom"`
  a `"bottom top"`, só no desktop; no celular o ganho é invisível e o custo
  por frame é real.

Fora disso, preferir entrada pontual: scrub em texto obriga a rolar para
terminar de ler.

## Sticky é CSS, nunca pin

Todo painel que acompanha o scroll usa `position: sticky` nativo. O pin da
biblioteca funciona transformando o elemento e injetando espaçadores: muda a
altura da página, muda os offsets de todos os triggers seguintes, exige
recálculo a cada resize e quebra quando fontes ou imagens mudam de tamanho.
O `sticky` é resolvido pelo navegador, custa zero por frame, não altera o
layout ao redor e sobrevive à falha do JS. A condição é nenhum ancestral criar
scroll container — ver `armadilhas.md`.

## Reduced-motion em três camadas

1. **O builder de JS não roda.** A condição `prefers-reduced-motion:
   no-preference` entra no `matchMedia` do hook; sendo falsa, o callback
   retorna antes de criar qualquer tween e nenhum estado inicial é aplicado.
2. **O CSS local da seção zera.** Cada `<style>` termina com
   `@media (prefers-reduced-motion: reduce) { #dobra-NN .secao-anim
   { animation: none } }`, mais `opacity: 1 !important; transform: none
   !important` nos elementos que nascem invisíveis dentro de uma cena.
3. **O CSS global zera.** A folha de tokens desliga os loops compartilhados
   (respiração, halo, marquee, shimmer do CTA).

**A consequência arquitetural**: para a camada 1 bastar, toda entrada precisa
ser um `from` — declarar o estado inicial e animar até o estado que já está no
HTML, nunca um `to` a partir de um estado escondido escrito no markup. Com
`from`, o HTML servido **já é o estado final**: se o JS não roda, se a
preferência está ativa, se o script falha na rede, a página aparece inteira.

Isso protege o LCP de graça — o maior elemento de texto nunca nasce
transparente, então a pintura é registrada na hora em vez de ficar refém de um
repaint tardio. Acima da dobra a entrada é CSS puro (dispara no primeiro
paint, sem esperar hidratação) e o título é transform-only.

## Desenhar SVG sem plugin pago

Medir o traço e usar o tracejado como cortina:

```js
const len = path.getTotalLength();     // comprimento real do traço
set(path, { strokeDasharray: len,      // um traço único do tamanho todo
            strokeDashoffset: len });  // empurrado inteiro para fora
// depois: animar strokeDashoffset até 0 → a linha "cresce"
```

Com scrub, easing linear; como entrada pontual, curva suave de ~1.4 s. A
medição precisa acontecer com o SVG já no DOM e nas dimensões finais — por
isso vive no builder de motion, não no render. Vale para `path`, `line` e
`polyline`. Beats da narrativa (nós que acendem conforme a linha passa) são
posições absolutas na mesma timeline, não triggers separados: a sincronia
sobrevive a qualquer mudança de duração.
