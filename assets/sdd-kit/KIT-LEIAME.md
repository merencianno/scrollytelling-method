# sdd-kit — esqueleto do projeto novo

Estrutura mínima de um projeto conduzido com a skill `scrollytelling-method`:
o `CLAUDE.md`, o SDD (log literal dos pedidos, changelog, gestão com
entregável, specs, checkpoints, prompt de retomada), a skill de projeto
`/ctxt-full` e o molde de uma peça (`pecas/_modelo/`). O roteiro que usa este
kit é `references/bootstrap.md`.

A pasta de cada peça é a mesma do fluxo do `SKILL.md` ("O que você prepara" e
"O que a skill cria"): `projeto.md`, `copy/copy.md`, `direcao-visual.md`,
`referencias/`, `blocagem.md`, `secoes/NN-slug/`, `saida/`, `historico/`. O
kit só acrescenta a camada do projeto em volta dela.

## Como copiar

```bash
cp -R <caminho-da-skill>/assets/sdd-kit/. <raiz-do-projeto>/
rm <raiz-do-projeto>/KIT-LEIAME.md
```

O `.` no fim copia também os ocultos (`.claude/`, `.gitignore`,
`.gitattributes`). Este `KIT-LEIAME.md` vem junto na cópia e é apagado logo
depois: ele é da skill, não do projeto. Para cada peça:
`cp -R pecas/_modelo pecas/<peca>` e, por seção,
`cp -R pecas/<peca>/secoes/NN-slug pecas/<peca>/secoes/01-<slug>`. Os
templates de direção, blocagem, camadas e briefing de ideação vêm de
`<caminho-da-skill>/assets/*-template.*` e
`assets/briefing-subagente-ideacao.md`.

## O que preencher primeiro

1. `CLAUDE.md` — objetivo, peças, comandos, destino de publicação.
2. `docs/sdd/README.md` — tabela de peças e decisões de ambiente (formato,
   publicação, LFS, quem gera imagem, modelo e custo).
3. `docs/sdd/gestao-do-projeto.md` — frentes, primeiras tarefas com
   entregável.

Todo placeholder é `<…>`; instrução ao preenchedor fica em `<!-- -->` e pode
ser apagada depois de preenchida.

## O que registrar onde

| O quê | Onde |
|---|---|
| Pedido do dono (literal) | `docs/sdd/log-de-prompts.md` |
| Mudança feita | `docs/sdd/changelog.md` (mais recente no topo) |
| Tarefa, entregável, status, pronto | `docs/sdd/gestao-do-projeto.md` |
| Escopo e critérios de uma peça | `docs/sdd/specs/<peca>.md` |
| Estado da rodada | `docs/sdd/CHECKPOINT-AAAA-MM-DD.md` |
| Ordem de leitura do próximo chat | `docs/sdd/PROMPT-RETOMADA.md` (novo no topo) |
| Contexto que não cabe na peça | `docs/sdd/contexto-do-projeto.md` |
| Formato, proporção, prazo da peça | `pecas/<peca>/projeto.md` |
| Gosto do dono | `pecas/<peca>/taste.md` |
| Ideias, escolha e veredito | `pecas/<peca>/secoes/NN-slug/{ideias.md, veredito.md}` |
| Decisão difícil de reverter | `docs/sdd/decisoes/NNNN-<slug>.md` (ADR curto) |
