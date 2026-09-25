---
name: tangibilizacao-css
description: Tangibilizar copy com mini-UIs 100% CSS (telas ilustrativas animadas) no lugar de imagens/stock — use quando o usuário pedir para "tangibilizar", criar mini-UI/tela ilustrativa, ilustrar um item de copy sem imagem, ou aplicar o padrão de cards ilustrados de uma página de vendas em outra página.
license: MIT
---

# Tangibilização por mini-UIs CSS

Técnica consolidada numa página de vendas real (seções de mecanismo,
problema, currículo e bônus): cada item da copy ganha uma **mini-tela
ilustrativa construída só com CSS/SVG** — um frame de "janela" com
composições abstratas + os números/rótulos reais da copy — em vez de foto,
stock ou ilustração gerada.

## Por que funciona (o racional)

1. **Ilustra o argumento, não decora.** A mini-UI mostra o leitor *usando* a
   coisa prometida (o checkout vendendo, o anúncio rodando, a IA
   respondendo). É o "show, don't tell" do direct response: o benefício vira
   cena, não adjetivo.
2. **Zero assets = zero atrito.** Nada de licença, brief pra designer, peso
   de imagem, CLS, ou foto genérica de banco que grita template. Um bloco
   de marcação e CSS entra no bundle já existente.
3. **Coerência automática.** As mini-UIs herdam tokens (cores, raios,
   sombras, fontes) — combinam com o design system por construção, em light
   e dark, e escalam em qualquer viewport sem perder nitidez.
4. **Honestidade editorial.** Onde não existe conteúdo aprovado, entra forma
   abstrata (skeleton bar), não lorem nem dado inventado — a página nunca
   mente e a copy permanece a única fonte de texto.
5. **Movimento com significado.** Uma micro-animação por mini-UI (o caret
   digitando, a barra subindo, o check acendendo) dá vida na medida — pausada
   fora de tela e muda sob `prefers-reduced-motion`.

## Regras invioláveis

- **Conteúdo textual/numérico: somente o que já existe na copy da página**
  (um preço, um rótulo de seção que a copy escreve). Todo o resto é forma
  abstrata (`SkeletonBar`). Nunca lorem, nunca nomes/valores inventados.
- O bloco inteiro é `aria-hidden` (é ilustração; a copy real está ao lado).
- **Uma** micro-animação por mini-UI, compositor-friendly (transform/opacity/
  background-position; nada de width/height/blur animados), `paused` até o
  bloco entrar em tela e coberta por `motion-safe`/reduced-motion.
- Ícones de biblioteca real (lucide/phosphor), nunca emoji.
- Um acento de cor por mini-UI (o resto em `currentColor` com opacidades).
- Tokens sempre; nenhum valor cru de marca.

## Stack e blocos de construção

Funciona em qualquer stack com CSS moderno. A implementação de referência
nasceu em React + Tailwind; os blocos abaixo são portáveis:

- **`MiniUiFrame`** — o chrome da "tela": borda, cantos arredondados, barra
  superior com 3 dots (`bg-current opacity-30`), fundo do tema, sombra token,
  `aria-hidden`.
- **`SkeletonBar`** — `height ~6px, rounded-full, bg-current, opacity .1–.4`,
  largura por prop. É o "texto que não existe".
- **Chip de dado real** — pill pequena (font ~9-10px, bold,
  `tabular-nums`) com o número literal da copy, no acento da marca.
- **Gatilho de visibilidade** — o wrapper de reveal da página adiciona uma
  classe (ex.: `.in-view`) quando o bloco entra; as animações usam
  `[animation-play-state:paused]` + `[.in-view_&]:[animation-play-state:running]`.
  Sem sistema de reveal, um IntersectionObserver de 5 linhas resolve.
- **Keyframes locais** ao componente (`<style>` no próprio arquivo), nomes
  prefixados por seção.

Esqueleto Tailwind do frame (portável):

```jsx
<div aria-hidden className="overflow-hidden rounded-xl border shadow-sm">
  <div className="flex items-center gap-1.5 border-b px-3 py-2">
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-30" />
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-30" />
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-30" />
  </div>
  <div className="p-3">{composicao}</div>
</div>
```

## Receituário (conceito → composição)

| Conceito na copy | Mini-UI |
|---|---|
| Produto/checkout | Linha de produto (bloco + skeletons) com chip de preço real pulsando; botão abstrato na cor de ação |
| Página de vendas | Skeletons em hierarquia (1 grossa, 2 finas, 1 bloco) + botãozinho no acento |
| Anúncio/feed | Header (avatar circular + skeleton), bloco de mídia com ícone, rodapé coração/balão |
| Métricas/tráfego | Barras verticais subindo em stagger (`scaleY origin-bottom`), a última no acento |
| Orçamento/investimento baixo | Chip com o valor real + barra de progresso curta preenchendo (`scaleX origin-left`) |
| Escrita/copywriting | Editor: skeletons + caret fino piscando no fim da última linha |
| Storytelling/sequência | 3 quadros que acendem em sequência + dots de progresso |
| Chat/IA | Balões alternados (IA translúcida, usuário no acento suave) + 3 pontinhos "digitando" |
| Busca/garimpo | Barra de busca (lupa + skeleton) + resultados surgindo, o melhor com borda no acento |
| Mídia/carrossel | Grade de 3 tiles (imagem/play/tile) + dots de carrossel |
| Duas rotas/escolha | 2 tiles lado a lado alternando a borda de destaque (só onde a copy é literalmente um par) |
| Suporte/comunidade | Pergunta enviada → resposta com check verde + fileira de avatares sobrepostos |
| Fracasso/zero resultado | Gráfico de barras baixinhas com a última vazia em tracejado pulsando |
| Vendas acontecendo | Ticker: linhas skeleton + check no verde acendendo em loop lento com delays |

## De onde vem a técnica

- **Princípio-mãe**: "copy → narrativa visual" — tangibilização é a coluna
  "coisas que tangibilizam" da tabela papel narrativo → tratamento.
- **Pesquisa de referência**: telas reais de checkout, FAQ e pricing de
  produtos SaaS conhecidos, de onde vêm o número-herói com contexto
  minúsculo, um acento por bloco escuro e o vídeo emoldurado como objeto de
  produto; e índices públicos de blocos de marketing em shadcn.
- **Piso de qualidade**: a skill `impeccable` (upstream `pbakaus/impeccable`)
  — proibição de emoji-como-ícone e de sparklines/skeletons *como
  decoração*; aqui os skeletons são ilustração deliberada de conteúdo
  abstrato, sempre a serviço de um argumento da copy, nunca preenchimento.

## Como aplicar em um site novo

1. Liste os itens de copy que prometem algo operável (produto, anúncio,
   ferramenta, suporte…).
2. Para cada um, escolha a cena do receituário (ou componha uma nova cena
   que o leitor reconheça em 1 segundo).
3. Monte o frame + composição com os tokens do projeto; extraia da copy os
   únicos textos/números permitidos.
4. Uma micro-animação por cena, pausada até entrar em tela.
5. Verifique: reduced-motion mudo, `aria-hidden`, sem overflow nos
   breakpoints, contraste do chip de dado real, e se removendo a animação a
   cena ainda comunica.

## Relação com a `scrollytelling-method`

Esta skill é a técnica de mini-UI CSS que a `scrollytelling-method` usa na
camada 6 (mockups) do layout quando a copy tem um objeto reconhecível. A
regra "conteúdo textual só da copy" é a mesma do `copy-contrato.md` daquela
skill. Onde o dono indicou conteúdo real por link (perfis, páginas,
acervos), o real substitui o skeleton: real por link, genérico sem link,
nunca adivinhado.
