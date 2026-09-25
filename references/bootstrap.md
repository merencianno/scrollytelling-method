# Bootstrap — projeto novo, máquina nova

Roteiro do primeiro dia de um projeto com esta skill, do terminal vazio ao
primeiro portão e daí até a peça final. Cada etapa diz **o que fazer**, **o
que registrar** e **o que perguntar**. O prompt que dispara este roteiro está
em `assets/prompt-novo-projeto.md`; o esqueleto que ele copia, em
`assets/sdd-kit/`. As regras de conduta que valem em todas as etapas estão em
`references/principios-de-trabalho.md` — leia antes.

De início, leia só este roteiro e os princípios. O resto da skill se abre na
hora: cada etapa diz, em **Abrir**, o arquivo que ela pede (caminhos a partir
da pasta da skill, `~/.claude/skills/scrollytelling-method/`).

Vocabulário: **o dono** é quem aprova (ideia, imagem, pronto); **o cliente** é
a empresa ou marca da peça. As **etapas** são deste roteiro; os **passos**
(0 a 8) são os do fluxo no `SKILL.md`.

O escopo é o da skill: da copy à peça final. Build, teste automatizado,
deploy e gate de publicação ficam fora ("O que fica fora", no `SKILL.md`);
se o projeto levar uma peça web a produção, isso se combina à parte com o
dono.

---

## Etapa 0 — Instalação e ambiente

- **Abrir:** o `README.md` da skill, só se a instalação travar.
- **Fazer:**
  - Se `~/.claude/skills/scrollytelling-method` não existe:
    `git clone https://github.com/merencianno/scrollytelling-method.git ~/.claude/skills/scrollytelling-method`.
    Se existe: `git -C ~/.claude/skills/scrollytelling-method pull`. O
    repositório é público; não precisa de conta nem de `gh`.
  - A sessão do Claude Code só descobre skill nova ao reiniciar
    (`claude --continue` ou sessão nova). Na mesma sessão, leia os arquivos da
    skill direto do disco (`SKILL.md`, `references/…`, `assets/…`).
  - Companheiras: symlink de `companions/tangibilizacao-css` em
    `~/.claude/skills/`; as demais (tabela "Skills companheiras" do README)
    são opcionais. Listar as presentes e dizer quais faltam, **sem bloquear**.
  - `git lfs version`, se o projeto for versionar imagens-conceito (Etapa 2).
  - `git config user.name` e `user.email` conferidos antes do primeiro commit.
- **Registrar:** no `docs/sdd/README.md` (quando existir, Etapa 3): versão da
  skill (hash do clone), companheiras presentes, LFS sim/não.
- **Perguntar:** nada, a não ser que o clone falhe.

## Etapa 1 — Intake

Pedir ao dono **tudo de uma vez**, numa mensagem numerada, **antes de qualquer
ideia**, e esperar. O que faltar vira slot rotulado, nunca invenção.

O que já veio preenchido nas linhas finais do prompt de abertura (cliente,
peças e formatos, copies, quem gera imagem, prazo, stack e destino) **não se
pergunta de novo**: a mensagem repete cada valor recebido para o dono
confirmar ou corrigir, e só pede o que está em `<…>` ou falta na lista.

- **Abrir:** `SKILL.md`, seção "O formato decide três coisas" (para o item 2).

1. **Copies** — um arquivo por peça, na forma em que foram aprovadas
   (Docs, Markdown, DOCX). Vão para `pecas/<peça>/copy/copy.md` e são
   invioláveis.
2. **Formatos e proporções** — para cada peça: formato da tabela "O formato
   decide três coisas" do `SKILL.md`, a unidade (dobra, slide, card, tela), a
   proporção da imagem-conceito e a peça final.
3. **Briefing** — negócio, produto, público, o que a peça precisa fazer, o que
   existe hoje (links), o que é prova real e de onde vem.
4. **Marca e assets** — logo, paleta com hex, fontes com licença, ícones,
   fotos autorizadas, Figma (acesso), design system; perfis públicos que podem
   ser usados como mock data, com os links exatos (real por link, genérico sem
   link, nunca adivinhado).
5. **Referências** — o que o dono gosta e o que veta, com o motivo; a peça-mãe,
   se houver.
6. **Prazo** e ordem das peças.
7. **Geração de imagem** — quem gera (o dono no navegador ou o agente por
   MCP), com qual conta, quanto crédito há.
8. **Stack e destino** — em que ferramenta a peça final nasce (HTML/Next,
   `.pptx`, PNG, Figma), para onde ela vai, versionar imagens-conceito (LFS)
   ou não, idioma do dono.

- **Registrar:** `briefing/intake-AAAA-MM-DD.md` com as respostas literais;
  `docs/sdd/log-de-prompts.md` com o pedido inicial, literal.
- **Perguntar:** a lista acima (confirmando o que o prompt trouxe), e nada
  mais até ela voltar.

## Etapa 2 — Grill inicial

Uma leva só, com as perguntas que o intake **não** respondeu. Depois dela,
execução autônoma até o próximo portão.

- Qual peça primeiro, e qual é o objeto próprio dela (o que a distingue das
  irmãs)?
- Existe direção visual? Com que fidelidade chegou: nada, texto, moodboard,
  Figma de direção, Figma de página com medida? (Define o modo — "Em que modo
  você está", no `SKILL.md`.)
- Quem declara "pronto"? Quem dá veredito de imagem, e por texto ou por áudio?
- O que é prova real (números, depoimentos, logos) e o que nunca pode
  aparecer?
- Mock data: quais perfis ou acervos posso usar (links)? Há algo a excluir?
- Componentes de referência: link exato para portar o código (com licença) ou
  mecânica para reimplementar? Sem link, reimplementa-se.
- Imagens-conceito: geradas por mim (MCP, modelo, custo) ou pelo dono? Um
  bake-off de modelos nas 3 primeiras seções, ok?
- Versionar imagens-conceito com LFS ou deixar fora do git? Sem resposta: LFS
  se `git lfs` estiver instalado; senão, fora do git.
- Idioma dos relatórios; frequência de checkpoint.
- Já existe uma versão entregue ou publicada? Onde está a que vale? (A fonte
  de verdade de uma peça entregue é o que foi entregue, não a pasta.)

- **Registrar:** respostas no log (bullet "Respostas do grill" no pedido
  correspondente) e em `docs/sdd/contexto-do-projeto.md`.
- **Perguntar:** esta leva; o resto se decide (ajuste de ofício não vira
  pergunta).

## Etapa 3 — Estrutura do projeto

- **Abrir:** `assets/sdd-kit/KIT-LEIAME.md`.

Copiar o kit para a raiz do projeto e apagar o leia-me dele, que é da skill e
não do projeto:

```bash
cp -R ~/.claude/skills/scrollytelling-method/assets/sdd-kit/. <projeto>/
rm <projeto>/KIT-LEIAME.md
cp -R <projeto>/pecas/_modelo <projeto>/pecas/<peça>     # uma vez por peça
```

Depois, preencher os placeholders `<…>`. A pasta de cada peça é exatamente a
do fluxo do `SKILL.md`; na árvore, "kit" é o que a cópia já traz, e o resto
diz de onde vem e em que etapa nasce.

```text
<projeto>/
  CLAUDE.md                                   kit
  .gitignore  .gitattributes                  kit
  .claude/skills/ctxt-full/SKILL.md           kit
  docs/sdd/                                   kit
    README.md  contexto-do-projeto.md  log-de-prompts.md  changelog.md
    gestao-do-projeto.md  PROMPT-RETOMADA.md  CHECKPOINT-modelo.md
    specs/_modelo.md
    decisoes/0000-modelo.md
  briefing/               intake, referências gerais do dono (data no nome)   kit (vazia)
  marca/                  assets do cliente (logo, paleta, fontes)            kit (vazia)
  pecas/<peça>/           cp -R pecas/_modelo pecas/<peça>
    projeto.md            a ficha: formato, unidade, proporção, peça final     kit, Etapa 4
    copy/copy.md          a copy aprovada, inviolável                          Etapa 1
    direcao-visual.md     ← assets/direcao-visual-template.md, Etapa 4
    taste.md              gosto deste cliente, nasce vazio                     kit
    blocagem.md           ← assets/blocagem-template.md, Etapa 5
    subagentes/
      BRIEFING-IDEACAO.md ← assets/briefing-subagente-ideacao.md, Etapa 5
      BRIEFING-IMPLEMENTACAO.md  BRIEFING-REFINO.md                            kit
    secoes/README.md      estado, modelo e custo, dispositivos usados         kit
    secoes/NN-slug/       ideias.md  prompt-vK.md  veredito.md                 kit (cp -R por seção)
                          ideia-vK-<modelo>.png                                Etapa 6
                          camadas.md ← assets/camadas-template.md, Etapa 7
    referencias/          recortes, prints, folhas de contato (data no nome)  kit (vazia)
    saida/                a peça final, no formato do projeto.md              kit (vazia), Etapa 9
    historico/            direção e briefings substituídos                    kit (vazia)
  arquivo-local/          ignorado: prints-teste/<peça>/<seção>/, saídas antigas;
                          criada no primeiro print
```

Regras de nome, fixadas aqui e escritas no `docs/sdd/README.md`:

- **Prefixo de tarefa** na gestão: 2–3 letras maiúsculas da peça + número de
  dois dígitos (`CAR-01`, `CAR-02` para um carrossel; `LP-01` para uma
  landing); `GER-01…` para o que é geral. Uma frente por peça.
- **Slug de seção:** `NN-` + 2 a 4 palavras da ideia central da copy daquela
  unidade, minúsculas, sem acento, separadas por hífen (`03-quadra-ja-ocupada`).
  `NN` segue a ordem da copy, com dois dígitos. O slug não muda quando a ideia
  visual muda: ele nomeia a copy, não o conceito.

- Ordem de preenchimento: `CLAUDE.md` (a seção "Comandos" conforme o
  formato: página ou peça exportada) → `docs/sdd/README.md` → gestão.
- LFS: se sim, `git lfs install` e manter o `.gitattributes`; se não, apagar
  as linhas LFS do `.gitattributes` e descomentar a linha de PNG no
  `.gitignore`. A decisão fica escrita no `docs/sdd/README.md`.
- **Registrar:** `docs/sdd/README.md` (tabela de peças, decisões de ambiente);
  primeiro commit `chore: estrutura do projeto com SDD`.
- **Perguntar:** nada.

## Etapa 4 — Pasta e direção (Passo 0 do `SKILL.md`)

- **Abrir:** `SKILL.md` (agora inteiro), `references/copy-contrato.md`,
  `references/direcao-visual.md` e `references/taste.md` — este **antes do
  primeiro conceito**, com os prefixos de escopo; do gosto, só as "Lições de
  ofício" valem para o cliente novo.
- **Fazer:** `projeto.md` da peça (formato, unidade, **proporção**, peça
  final, prazo, condicionais); copy congelada em `copy/copy.md`; direção
  visual escrita (obrigatória), com nome e o prefixo comum colável, e
  apresentada ao dono; `taste.md` da peça aberto **vazio**.
- **Registrar:** spec da peça em `docs/sdd/specs/<peça>.md` (do `_modelo.md`),
  com escopo e critérios; tarefa na gestão com entregável.
- **Perguntar:** só o que for conceito, copy, preço ou gosto entre
  alternativas equivalentes — com imagem.

## Etapa 5 — Blocagem → ideias em texto → portão 1 (Passos 1 e 2)

- **Abrir:** `references/blocagem.md`, `references/conceitos-por-dobra.md`,
  `references/ideias-ascii.md`.
- **Fazer:** blocagem; antes, listar por unidade o que **esta** peça vende.
  Depois, 3–5 ideias por unidade em texto com esboço ASCII e uma
  recomendação. O double-check por subagente de contexto limpo é opcional
  sobre a leva em texto.
- **Registrar:** `secoes/NN-slug/ideias.md` (uma seção datada por leva);
  escolha do dono em `veredito.md`; pedido no log.
- **Perguntar (portão 1):** qual ideia (1–2 por unidade).

## Etapa 6 — Prompts e imagens → portão 2 (Passos 3 e 4)

- **Abrir:** `references/imagem-conceito.md`; `GUIA-IMAGENS.md` (na raiz da
  skill), para quem gera; `references/revisao-por-audio.md` se o veredito
  vier por áudio.
- **Fazer:** double-check (a–d) por subagente de contexto limpo sobre as
  ideias escolhidas, **obrigatório antes de gerar**; prompt só delas, com o
  ASCII escolhido no `LAYOUT.`; no máximo duas gerações por ideia; recusada
  duas vezes, volta à Etapa 5, não a outra imagem; anunciar a última leva.
  Se quem gera é o agente (MCP): procedimento de `GUIA-IMAGENS.md`, "Pelo
  agente (MCP)". Se é o dono: ele salva na pasta da seção com o nome da
  convenção (`ideia-vK-<modelo>.png`; aprovada →
  `ideia-vK-aprovada-<modelo>.png`).
- **Registrar:** `secoes/README.md` (modelo, custo, estado); `veredito.md`
  (entrada datada, citação literal).
- **Perguntar (portão 2):** qual imagem — mostrando a imagem.

## Etapa 7 — Wireframe e layout (Passos 5 e 6)

- **Abrir:** `references/camadas.md`, `references/orquestracao.md`,
  `references/animacao.md` (se o formato tem eixo de tempo),
  `references/mecanismos.md`; `stacks/next-tailwind-gsap.md` se for essa a
  stack.
- **Fazer:** ficha de sete camadas por seção aprovada (`secoes/NN-slug/camadas.md`),
  wireframe (1–3) antes de layout (4–7); a peça montada com a imagem aberta
  ao lado, usando `subagentes/BRIEFING-IMPLEMENTACAO.md`. Invariante: uma
  unidade por commit, vista antes da próxima; paralelo só com seções
  aprovadas em imagem, arquivos disjuntos, um servidor e um navegador por vez,
  e sem o dono revisando ao vivo. Cada job diz em que trilho está (correção
  com referência dada × ideia nova que espera imagem).
- **Registrar:** um commit por unidade; changelog no mesmo commit; gestão.
- **Perguntar:** o que o checklist vivo da rodada reunir, numa lista única.

## Etapa 8 — Refinamento, revisão e check final da copy (Passo 7)

- **Abrir:** `references/medicao.md`, `references/armadilhas.md`,
  `references/revisao-por-audio.md`.
- **Fazer:** refinamento primeiro (print de cada unidade ao lado da imagem
  aprovada, medida em vez de estimativa), com
  `subagentes/BRIEFING-REFINO.md` quando o refino for em fila; depois a
  revisão ao vivo com o dono, uma unidade por vez. Check final da copy:
  conferência literal contra `copy/copy.md` (numa página, também a ordem no
  DOM), texto nunca coberto, CTA em uma linha contando linhas; numa página,
  larguras e alturas reais de janela e animação filmada; numa peça
  exportada, dimensão e área segura.
- **Registrar:** vetos e aprovações no `taste.md` da peça, com o motivo e a
  citação literal; resultado da conferência no changelog e no checkpoint.

## Etapa 9 — Portão 3 e peça final (Passo 8)

- **Fazer:** o dono declara pronto → linha na tabela "declaradas prontas" da
  gestão, com ressalvas (pronto não exige toda unidade resolvida). Exportação
  para `saida/`, no formato do `projeto.md`, rastreável (de que versão da
  direção e de que prompt nasceu). Publicação ou deploy, se houver, só com
  pedido explícito e fora do escopo da skill.
- **Perguntar (portão 3):** está pronta? Gates verdes, commit ou elogio não
  são resposta.

## Em toda sessão

- A cada pedido substantivo do dono: entrada literal no log, commitada junto
  com o trabalho.
- Changelog no mesmo commit da mudança (mais recente no topo).
- Tarefa só com entregável; ✅ só com o entregável verificado.
- Ao trocar de chat: `/ctxt-full` (checkpoint datado + prompt de retomada).

## O que registrar onde

| O quê | Onde |
|---|---|
| Pedido do dono (literal) | `docs/sdd/log-de-prompts.md` |
| Mudança feita | `docs/sdd/changelog.md` (mais recente no topo) |
| Tarefa, entregável, status, pronto | `docs/sdd/gestao-do-projeto.md` |
| Escopo e critérios de uma peça | `docs/sdd/specs/<peça>.md` |
| Estado da rodada | `docs/sdd/CHECKPOINT-AAAA-MM-DD.md` |
| Ordem de leitura do próximo chat | `docs/sdd/PROMPT-RETOMADA.md` (novo no topo) |
| Contexto que não cabe na peça | `docs/sdd/contexto-do-projeto.md` |
| Formato, proporção, prazo | `pecas/<peça>/projeto.md` |
| Gosto do dono | `pecas/<peça>/taste.md` |
| Ideias, escolha e veredito | `pecas/<peça>/secoes/NN-slug/{ideias.md, veredito.md}` |
| Decisão difícil de reverter | `docs/sdd/decisoes/NNNN-<slug>.md` (ADR curto: contexto, decisão, consequências, pedido literal citado) |
