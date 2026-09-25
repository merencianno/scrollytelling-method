# Briefing de refino — <peca>

<!-- Para subagentes em fila, sem o dono olhando. Nasce das 3–4 primeiras
     seções refinadas ao vivo com o dono: as lições delas entram aqui antes
     de disparar o resto. -->

## O seu critério é o do dono

Leia `pecas/<peca>/taste.md` inteiro. Lista de vetos e aprovações desta
peça:

- <veto — motivo — citação>
- <aprovação — citação>

## Regras de refino

- **Mockup não estica:** interface no tamanho nativo, reduzida por `scale()`
  medido; excesso cortado pela borda; proporção do aparelho fixa.
- **Animação filmada:** 10–12 quadros a ~90 ms numa folha, antes de dizer que
  funciona; troca de estado em dois tempos.
- **Nenhum texto coberto:** onde há sobreposição, conferir por
  `getBoundingClientRect` em todas as larguras.
- **Colisões medidas em 320 px.**
- **CTA em uma linha:** contar linhas por `getClientRects`, não altura do
  botão.
- **Correção responsiva só em `@media`**, com as medidas dos elementos
  tocados antes e depois em todos os tamanhos, e o diff no relatório.
- **Altura real de janela:** todo `sticky` cabe em `innerHeight` ou deixa de
  grudar abaixo de ~700 px.
- **Prints** em `arquivo-local/prints-teste/<peca>/<secao>/`, nunca na pasta
  da seção.
- **Parcial em disco** antes de reportar; interrupção não perde trabalho.

## Escopo

- Um commit por seção.
- Não tocar em seção congelada: <lista>.
- Arquivos desta leva (disjuntos entre subagentes): <lista>.

## Entrega

Até 25 linhas: seção, o que mudou, commit, medidas antes/depois quando houve
correção de largura, o que ficou para o dono decidir.
