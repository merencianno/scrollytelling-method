# Briefing de implementação — <peca>

<!-- Entregue a cada subagente que implementa uma seção a partir da
     imagem-conceito aprovada. Um subagente por seção; um commit por seção;
     entrega em até 25 linhas. -->

## Modo: fidelidade à imagem aprovada

Reproduza da imagem `pecas/<peca>/secoes/NN-slug/ideia-vK-aprovada-<modelo>.png`:

- o **arranjo** (o que fica onde, proporções das colunas);
- o **dispositivo** (o objeto encenado e a anatomia real dele);
- a **hierarquia** (o que se lê primeiro, segundo, terceiro);
- o **lugar do acento** (cor de ação nos pontos marcados, no máximo três);
- a **profundidade e o corte pela borda** (o que sai do quadro continua saindo).

A imagem manda na composição; a copy manda no texto; os tokens mandam no
estilo.

## Regras invioláveis

- Copy literal (`pecas/<peca>/copy/copy.md`), **na ordem da fonte dentro do DOM**, não
  só na leitura visual.
- Um `h1` na peça.
- CTA onde a copy manda, com o texto dela.
- Cores, fontes, espaços, raios, easings e durações pelos tokens.
- `prefers-reduced-motion` respeitado; foco visível; alvos ≥ 44 px.
- Mobile conforme `pecas/<peca>/taste.md`.
- Nenhuma frase para o lead fora da copy, nem em estado de interação.

## Conceito × implementação

O conceito pode inventar a interface; **a implementação usa só asset real**
(ou componente criado sobre ele). O que faltar vira placeholder visível e
rotulado **mais um pedido ao dono** na lista única da gestão.

## Quem é quem

- Átomos compartilhados: `<caminho>` — <o que cada um faz>.
- Arquivo desta seção: `<caminho>`.
- **Não tocar:** <seções congeladas, arquivos de outras seções, tokens>.

## Assets

| Asset | Caminho | Título/conteúdo conferido |
|---|---|---|
| <…> | `<…>` | <sim · falta> |

## Entrega

Até 25 linhas: o que entrou, commit, prints (em
`arquivo-local/prints-teste/<peca>/<secao>/`), o que ficou de fora e por quê.
