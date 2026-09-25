# Spec — <peca>

<!-- Uma spec por peça: docs/sdd/specs/<peca>.md. Guarda escopo, critérios e
     histórico; formato, proporção e prazo ficam em pecas/<peca>/projeto.md e
     não se repetem aqui. O histórico no fim é append-only; o resto se
     atualiza com data. -->

**Objetivo:** <uma frase: o que esta peça precisa fazer por quem chega nela>.

| | |
|---|---|
| Ficha | `pecas/<peca>/projeto.md` (formato, unidade, proporção, peça final, prazo) |
| Copy-fonte | `pecas/<peca>/copy/copy.md` · hash `<sha256 curto>` |
| Direção | `pecas/<peca>/direcao-visual.md` — linha V<K> |

## O objeto próprio da peça

<!-- O que esta peça vende, por unidade, e o que a distingue das outras peças.
     Regra de outra peça não se herda sem reler isto. -->

## O que já existe

<Link e onde está a versão que vale, ou "nada entregue". Se a peça já foi
entregue ou publicada, a fonte de verdade é o que foi entregue, não a pasta:
comparar antes de regerar.>

## Critérios que reprovam

- Copy literal diferente da fonte (verificador ou checklist contra o texto).
- Ordem da copy diferente da fonte (no DOM, numa página).
- Texto coberto ou fora da área segura em qualquer tamanho do formato.
- CTA que quebra linha onde a copy manda uma linha.
- <critérios específicos do formato: dimensão exigida pela plataforma,
  overflow horizontal e `sticky` na altura real da janela numa página, fontes
  embutidas num deck…>

## Tarefas

Ver `docs/sdd/gestao-do-projeto.md`, frente <prefixo>.

## Critério de pronto

O dono declara. Ressalvas: <…>.

## Histórico

<!-- Append-only, uma linha por evento, com data e pedido do log. -->

- <AAAA-MM-DD> — spec aberta (pedido <N>).
