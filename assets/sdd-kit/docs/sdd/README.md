# SDD — <projeto>

Índice do projeto. **Ordem:** no changelog, no prompt de retomada e na lista
de checkpoints, **o mais recente fica no topo** (exceção: o log de pedidos,
que cresce para baixo).

## Peças

| Peça | Formato · unidade | Copy | Status | Declarada pronta em |
|---|---|---|---|---|
| `<peca>` | <landing/seção · deck/slide · …> | `pecas/<peca>/copy/copy.md` | <rascunho · ideias · imagens · implementação · refino · pronta · no ar> | — |

## Decisões de ambiente

| Tema | Decisão | Desde |
|---|---|---|
| Stack | <…> | <data> |
| Publicação | <destino, quem faz merge, rollback> | |
| Imagens-conceito no git | <LFS · fora do git (`.gitignore`)> | |
| Quem gera imagem | <o dono no navegador · o agente por MCP> | |
| Modelo padrão e custo por imagem | <definido no bake-off; detalhe em `pecas/<peca>/secoes/README.md`> | |
| Versão da skill | <hash do clone> · companheiras: <…> | |
| Idioma do dono | <pt-BR> | |

## Documentos

- [`contexto-do-projeto.md`](contexto-do-projeto.md) — o que não cabe no código
- [`log-de-prompts.md`](log-de-prompts.md) — pedidos do dono, literais
- [`changelog.md`](changelog.md) — mudanças
- [`gestao-do-projeto.md`](gestao-do-projeto.md) — tarefas, entregáveis, pronto
- [`PROMPT-RETOMADA.md`](PROMPT-RETOMADA.md) — bloco para colar no próximo chat
- [`specs/`](specs/) — uma spec por peça (`_modelo.md`)
- [`decisoes/`](decisoes/) — ADRs (`0000-modelo.md`)
- Checkpoints (mais recente no topo):
  - <!-- [`CHECKPOINT-AAAA-MM-DD.md`](CHECKPOINT-AAAA-MM-DD.md) — tema -->
