# Camadas: a ponte entre a imagem aprovada e o código

> Passos 5 e 6. Por seção aprovada, uma ficha em sete camadas, escrita **antes**
> do componente. A ficha é o briefing de implementação; o código é a
> consequência dela. Template em `assets/camadas-template.md`.

## As sete camadas, na ordem

Cada camada registra a **decisão e o token**, nunca a implementação:

| # | Camada | O que decide |
|---|---|---|
| 1 | **Fundo da página** | ato (claro/escuro/deep), ambiente, grão |
| 2 | **Fundo da seção** | tone do container de seção, glow, forma |
| 3 | **Textos** | a copy literal na hierarquia h1/h2/h3/p/li — e, **listado à parte e rotulado "não é copy, não é prova"**, todo mock data que vai dentro de mockup |
| 4 | **Estilo dos textos** | degrau da escala tipográfica, acento (serif, cor), eyebrow, medida, alinhamento por breakpoint |
| 5 | **Cores** | onde entra a cor de ação (contar os pontos), a estrutura, os cinzas; tokens semânticos liberados e onde |
| 6 | **Imagens e mockups** | o que vira mockup HTML/CSS (e qual anatomia), ícone, slot de foto, o que fica como fallback |
| 7 | **Animações e micro-interações** | padrão A/B/C/D/E por elemento, o que é loop, o que é scrub, hover/focus, o estado sob reduced-motion |

A ordem é a do raciocínio de quem desenha: do fundo para a frente, do
estático para o vivo. **A camada 7 é onde entra tudo o que a imagem não
mostra** — coração que enche, contador que sobe, anel que acende, grade em
loop, gráfico no scrub. É onde a página ganha vida; sem ela a seção está
incompleta mesmo com a composição aprovada.

## Regras da ficha

- **Ficha antes do código.** Se o mesmo agente escreve ficha e componente,
  a ficha vira relato do que foi feito. Para preservar a separação, peça a
  ficha como primeira entrega (ou num subagente separado) e só depois o `.tsx`.
- **Copy e mock data em linhas separadas** na camada 3. É o que impede um
  número de mockup migrar para o texto da página numa revisão futura.
- **Revisão reescreve a camada, não a ficha inteira.** Abra com um bloco
  "Revisão <data> (origem: áudio NN / pedido X): o que mudou e por quê", cite a
  fala do cliente, e diga que a versão anterior está no histórico do git.
- **Uma ficha por seção, todas no mesmo arquivo** (`sdd/camadas.md`). Em
  execução por lotes, cada lote escreve em `camadas-lote-<x>.md` e o
  orquestrador funde, arquivando os originais em `sdd/historico/`.

## O que mais vive no arquivo de camadas

Além das fichas, o `camadas.md` fundido abre com:

1. **Tabela dos blocos de UI compartilhados** — bloco · quem criou · função ·
   props · ganchos `data-*` de motion. É o catálogo do vocabulário aprovado
   que os subagentes seguintes leem antes de criar bloco novo.
2. **"Locais a unificar numa rodada futura"** — blocos que nasceram locais
   dentro de uma seção porque o átomo compartilhado ainda não existia. A
   lista cresce a cada rodada de lotes paralelos; é o custo estrutural do
   fallback "faça local" (ver `orquestracao.md`).
3. **"Slots e pendências para o orquestrador"** e **"dúvidas de copy
   encontradas (não corrigidas)"** — o que os subagentes viram e não podiam
   resolver.

## Exemplo de densidade (uma camada, real)

> **7. Animações** — **A**: `[data-in]` sobe em stagger 0,1 s (`top 78%`).
> **D**: timeline scrub 0,6 no painel de métricas (`top 80%` → `center 40%`):
> barras `scaleY` 0,06 → 1 da base em stagger 0,08; 0,3 s antes do fim das
> barras o arco vai de `strokeDashoffset` = circunferência até a fração
> final (1 s) e, em paralelo, um proxy corre 0 → 36 escrevendo no número.
> **A** nos doodles (`once`): `prepareDraw` nos dois paths, vermelho desenha
> aos 0,35 s, verde entra 0,25 s antes do vermelho acabar. Sem `transition`
> CSS em nada que o GSAP toca. Reduced-motion: o builder não roda — barras na
> altura final, arco na fração final, número no HTML, doodles nascem
> desenhados.

Uma camada assim permite ao orquestrador **montar a página e revisar sem
reler o código** — e é o que faz a ficha valer como contrato, não como
descrição.
