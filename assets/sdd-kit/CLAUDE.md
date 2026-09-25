# <projeto>

## Objetivo

Peças de <cliente>: <lista de peças e formatos>. Onde há copy, **a copy
aprovada é a fonte de verdade e é literal**. Onde não há, não se inventa
atributo, prova, métrica, depoimento nem oferta: fica slot rotulado.

## Leia antes de mexer

1. `docs/sdd/contexto-do-projeto.md` — o que não cabe no código.
2. `docs/sdd/gestao-do-projeto.md` — status, critério de pronto, decisões
   pendentes.
3. `docs/sdd/log-de-prompts.md` — os últimos pedidos do dono.
4. O checkpoint mais recente em `docs/sdd/CHECKPOINT-*.md`.

## Estrutura

```text
docs/sdd/        SDD: README, contexto, log, changelog, gestão, specs, decisões, checkpoints
briefing/        intake e referências gerais do dono (data no nome)
marca/           assets do cliente (logo, paleta, fontes, fotos autorizadas)
pecas/<peca>/    uma pasta por peça:
                 projeto.md · copy/copy.md (inviolável) · direcao-visual.md · blocagem.md
                 taste.md · subagentes/ · secoes/NN-slug/ · referencias/ · saida/ · historico/
arquivo-local/   ignorado: prints de teste, saídas antigas
```

## Método

Este projeto usa a skill `scrollytelling-method`. Pipeline com três portões do
dono: **qual ideia** (ideias em texto com esboço ASCII antes de qualquer
imagem), **qual imagem** (imagem-conceito aprovada antes de qualquer código) e
**está pronta**. Uma seção por commit, vista antes da próxima.

## Regras de conduta

- Pronto é o dono quem diz; gates verdes e elogio não são aprovação.
- Todo pedido do dono entra literal no log, com entendido e feito.
- Anotar não é fazer: tarefa só com entregável; ✅ só verificado.
- Decidir o óbvio (ajuste de ofício); perguntar só conceito, copy, preço,
  publicação ou gosto — sempre mostrando imagem ou print.
- Nenhuma frase para o lead fora da copy, nem em estado de interação.
- Prints de teste em `arquivo-local/prints-teste/<peca>/<secao>/`, nunca na
  pasta da seção.
- Nunca citar outro cliente ou projeto, nem na conversa nem no artefato.
- Dois trilhos, ditos em voz alta: correção com referência dada segue; ideia
  nova espera imagem aprovada.

## Gosto

Da skill, só as lições de ofício valem aqui, e estão em
`references/taste.md` ("Lições de ofício"). O gosto deste cliente vive em
`pecas/<peca>/taste.md` (prefixos `[ofício]`, `[casa]`, `[projeto]`,
`[gosto]`), que nasce vazio.

## Publicação

Só após pedido explícito do dono. Destino: `<…>`. <!-- como publica, quem faz merge, rollback -->

## Git

- Branches: `<…>`. <!-- ex.: dev (trabalho) e main (publicável) -->
- Commits pequenos: `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`.
- Autor conferido (`git config user.name/email`) antes do primeiro commit da
  sessão.
- Nunca versionar segredos, `.env`, `arquivo-local/` nem builds.

## Comandos

<!-- Preencher conforme o formato da peça e apagar o bloco que não se aplica.
     Em projeto com as duas formas, um bloco por peça. -->

Página (landing, UI servida):

```bash
<dev>       # servidor de desenvolvimento (um processo por vez)
<build>
<verify>    # verificador literal da copy contra o artefato servido
<test>
```

Peça exportada (deck, carrossel, criativo, impresso):

```bash
<export>    # gera o entregável (PNG, PDF, .pptx) em pecas/<peca>/saida/
<check>     # conferência da copy no exportado; sem script, checklist contra o texto
```

## Protocolo do SDD

1. Log de pedidos sempre, literal, commitado junto com o trabalho.
2. Changelog no mesmo commit da mudança (mais recente no topo).
3. Gestão com entregável por tarefa; "pronta" só declarada pelo dono.
4. Ao fechar a sessão, `/ctxt-full`: checkpoint datado + prompt de retomada.
5. Decisão difícil de reverter: ADR em `docs/sdd/decisoes/`.
