# Armadilhas verificadas

Tudo aqui aconteceu de verdade na construção da `/ref` e custou tempo. Cada
entrada traz o sintoma (como o problema aparece), a causa e a correção.

## `[text-wrap:balance]` morre em silêncio dentro de parágrafos

**Sintoma.** Títulos equilibram, parágrafos não. Palavras órfãs sobrando na
última linha de `<p>` e `<li>`, mesmo com a utilitária aplicada no elemento
certo e visível no DOM.

**Causa.** A folha de tokens da página tem uma regra global
`.escopo p, .escopo li { text-wrap: pretty }`. Especificidade 0,1,1 (classe +
elemento) contra 0,1,0 da utilitária do Tailwind (classe só). A global vence
sempre, e o navegador não reclama de nada.

**Correção.** Criar uma classe no `<style>` da própria seção, que ganha o
prefixo do id e sobe para 1,1,0: `#dobra-NN .xx-bal { text-wrap: balance }`.
De preferência dentro de `@media (min-width: 640px)`, porque o resultado no
celular já foi aprovado com `pretty`. Títulos (`h1`–`h3`) não sofrem disso.

**Custo.** Foi a causa da maioria das órfãs nas dobras 02 a 07, descobertas
só numa revisão dedicada de tipografia.

## `bg-[var(--x)]/40` não compila no Tailwind 3

**Sintoma.** Acentos de cor simplesmente somem. Fundo transparente, borda
caindo para o cinza do preflight. Nenhum erro de build, nenhum aviso.

**Causa.** O modificador de opacidade do Tailwind 3 precisa decompor a cor em
canais para montar o `rgb(... / alpha)`. Uma custom property é opaca para o
compilador, então a classe inteira é descartada.

**Correção.** Alpha sobre token vira rgba literal: `bg-[rgba(88,172,225,0.14)]`.
Se o valor precisa viver como token, declarar o token já com o alpha embutido
(`--brand-success-soft: rgba(95,211,179,0.16)`) e usá-lo sem modificador.

## `overflow: hidden` num ancestral mata `position: sticky`

**Sintoma.** O painel "sticky" rola embora como se fosse `relative`. Nenhum
erro; testar em várias larguras não ajuda porque falha em todas.

**Causa.** `overflow: hidden` cria um scroll container. O `sticky` se ancora
no ancestral de rolagem mais próximo, e esse container rola junto com a
página, então não há o que grudar.

**Correção.** Trocar por `overflow: clip`. Corta exatamente igual (o wrapper
de seção precisa disso para conter radiais e cenas que sangram nas laterais),
mas não cria scroll container. Medido em 1440/1366/1280/1024: o ledger da
dobra 11 gruda em todas. Voltar para `hidden` quebra de novo.

## Opacidade sem quadro em `0%` interpola o ciclo inteiro

**Sintoma.** Um elemento que deveria apagar por 2 s no fim do ciclo fica
permanentemente acinzentado — parece um bug de cor, não de animação.

**Causa.** Keyframe que só descreve o meio do ciclo. O navegador interpola do
primeiro quadro declarado até o último, cobrindo os 100%.

**Correção.** Ancorar os dois extremos: `0%, X% { inicial } … Y%, 100%
{ inicial }`. O padrão C em `animacao.md` traz o molde. Vale para toda
propriedade, não só opacidade.

## Fotografar animação CSS com Playwright dá falso alarme

**Sintoma.** O print mostra um estado que a animação nunca deveria manter — um
chip preso em "Em andamento" que no navegador real vira "Concluída"; elementos
em `opacity: 0` numa seção que na tela aparece inteira.

**Causa.** Três mecanismos distintos:
(a) `locator.screenshot()` de um elemento **mais alto que o viewport** faz o
Playwright alterar as métricas do dispositivo para caber tudo — isso reavalia
media queries e **reinicia** as animações dos filhos que dependem delas;
(b) seek por WAAPI (`animation.currentTime = t`) e páginas em paralelo no
mesmo browser dessincronizam o que é pintado em relação ao estilo computado;
(c) screenshot de elemento abaixo do viewport captura sem rolar, então a
animação de entrada de fato ainda não disparou — é artefato, não bug.

**Correção.** Uma página por vez, viewport mais alto que a seção, relógio
real, nada de seek. E o critério final: se `getComputedStyle` mostra o valor
certo, o CSS está certo — o print é que mente.

**Custo.** Cerca de uma hora perseguindo um bug inexistente na rodada 4.

## Build com dev server aberto corrompe o diretório de build

**Sintoma.** Chunks em 404, hidratação que nunca acontece, a página "quebra
inteira". Parece regressão de código.

**Causa.** Dois processos do framework escrevendo no mesmo diretório de build
(`dev` + `dev`, `dev` + `build`, `dev` + suíte de testes que sobe o próprio
servidor).

**Correção.** Matar todos, apagar o diretório de build, subir um só — ou, para
medir performance sem derrubar o dev server, buildar numa cópia do projeto num
diretório temporário (rsync + symlink do `node_modules`).

## O elemento de LCP nunca nasce em `opacity: 0`

**Sintoma.** LCP alto e instável sem explicação no waterfall: a headline já
está no HTML, a fonte já carregou, e ainda assim a métrica fica em segundos.

**Causa.** O navegador não registra pintura transparente como LCP. A métrica
passa a depender do próximo repaint grande da página, que pode ser qualquer
coisa tardia.

**Correção.** Entrada do LCP é transform-only (ou nenhuma), em CSS, disparada
no primeiro paint sem esperar hidratação. Fades ficam para os vizinhos. O
padrão `from` descrito em `animacao.md` já entrega isso: o HTML servido é o
estado final.

## Contratos de verificação são strings contíguas no HTML

**Sintoma.** O verificador de copy falha dizendo que uma frase sumiu da
página, mas a frase está lá, visível e correta.

**Causa.** O verificador procura a string no HTML gerado. Colorir uma palavra
no meio da frase com `<span>` insere tags no meio da string e parte o trecho
contíguo em dois.

**Correção.** Escolher como contrato outro trecho da mesma frase que não seja
interrompido por marcação, ou colorir a partir da borda da frase. O mesmo vale
para `whitespace-nowrap` aplicado a um pedaço do texto.

## Duas de menor porte

- **Selecionar sempre a partir do escopo.** Helpers globais de seleção não são
  escopados pelo contexto de animação; consultar via `scope.querySelectorAll`
  evita que a seção 3 anime elementos da seção 8 quando as duas usam o mesmo
  data-attribute.
- **Posições de trigger mudam quando as fontes carregam.** Sem um refresh
  depois de `document.fonts.ready`, todo `start`/`end` calculado antes da troca
  de fonte fica alguns pixels fora — o suficiente para uma entrada disparar
  cedo demais ou nunca.
