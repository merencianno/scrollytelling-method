# INICIAR-PROJETO

> **Para o dono:** baixe este arquivo para a pasta do projeto novo (funciona
> antes de a skill existir na máquina):
>
> ```bash
> curl -fsSL https://raw.githubusercontent.com/merencianno/scrollytelling-method/main/INICIAR-PROJETO.md -o INICIAR-PROJETO.md
> ```
>
> Depois abra o Claude Code nela e diga: *"leia INICIAR-PROJETO.md e
> comece"*. O resto é com ele.
>
> **Para o Claude:** este arquivo é a sua ordem de serviço. Siga as etapas em
> ordem. Responda sempre em pt-BR. Não pule etapa, não junte etapas e não
> invente o que não foi entregue. **Onde divergir de
> `references/bootstrap.md`, vale este arquivo.** Cada etapa diz, em
> **Abrir:**, os arquivos da skill que ela pede; não abra os outros antes.

---

## Etapa A — Instalar o método (sem perguntar nada)

**Abrir:** `references/principios-de-trabalho.md` e `references/bootstrap.md`
(item 3).

1. Se `~/.claude/skills/scrollytelling-method` não existe:
   `git clone https://github.com/merencianno/scrollytelling-method.git ~/.claude/skills/scrollytelling-method`
   Se existe: `git -C ~/.claude/skills/scrollytelling-method pull`.
2. Opcional, sem travar: `ln -s ~/.claude/skills/scrollytelling-method/companions/tangibilizacao-css ~/.claude/skills/`
   se ainda não existir. Diga numa linha quais companheiras do `README.md` da
   skill faltam.
3. A sessão não enxerga skill nova sem reiniciar. **Leia direto do disco**,
   agora, só estes dois arquivos:
   `references/principios-de-trabalho.md` e `references/bootstrap.md`.
   Os outros você abre quando a etapa pedir. Cada etapa do `bootstrap.md` diz
   qual.

Daqui em diante, `<skill>` = `~/.claude/skills/scrollytelling-method`.

## Etapa B — Preparar o projeto (sem perguntar nada)

**Abrir:** `assets/sdd-kit/KIT-LEIAME.md` (antes de copiar).

1. Se a pasta não estiver vazia (fora este arquivo), **liste o que existe** e
   não sobrescreva nada: `cp -Rn <skill>/assets/sdd-kit/. .` (com a pasta
   vazia, dá no mesmo). Depois `rm KIT-LEIAME.md`. Diga numa linha o que do
   kit ficou de fora por já existir.
2. `git init` se ainda não for repositório. Se `git lfs` estiver instalado,
   `git lfs install --local` (o `.gitattributes` do kit já manda as imagens
   para o LFS). Se não estiver, as imagens ficam fora do git e você avisa
   numa linha.
3. Confira `git config user.name` e `git config user.email`. Se estiverem
   vazios, **não invente**: pergunte numa linha, junto com o C1; o commit
   do item 6 espera essa resposta.
4. `pecas/_modelo/` fica como molde (não apague); cada peça nasce de uma
   cópia dele. `INICIAR-PROJETO.md` fica versionado na raiz.
5. Abra `docs/sdd/log-de-prompts.md` e registre como **pedido 1**, literal:
   *"leia INICIAR-PROJETO.md e comece"*.
6. Commit: `chore: estrutura do projeto a partir do kit`.
7. Diga ao dono, em até 5 linhas, o que foi instalado e criado, e passe para
   a Etapa C. Os placeholders `<…>` do `CLAUDE.md` e do `docs/sdd/README.md`
   se preenchem no fim do grill, quando houver resposta para eles.

## Etapa C — O grill: quatro pedidos, um de cada vez

Faça **um pedido por mensagem** e **espere a resposta** antes do próximo.
Cada pedido é curto e diz exatamente o que você quer e em que formato
aceita. Ao receber, **guarde no lugar certo, registre no log, commite** e só
então peça o próximo. Não reformule a copy nem corrija o que o dono mandou:
o que chega é o que vale.

**C1 — A copy.** **Abrir:** `references/copy-contrato.md`.
> "Me manda a copy. Pode colar aqui, anexar o arquivo (.md, .docx, .pdf) ou
> dizer a pasta. Se forem várias peças, uma copy por peça, com o nome de
> cada uma."

Guarde em `pecas/<peça>/copy/copy.md`, **literal** (nenhuma palavra, acento,
número, caixa, emoji ou ordem muda). Crie a pasta de cada peça com
`cp -R pecas/_modelo pecas/<peça>`. Se a copy tiver buraco (dobra sem
headline, CTA sem destino, prova sem fonte), anote no `projeto.md` da peça,
na tabela de buracos, e **não preencha**. Se o `user.name`/`user.email` do
git estava vazio (B3), a mesma mensagem do C1 pede os dois numa linha.

**C2 — As peças e os formatos.** **Abrir:** `SKILL.md`, só a seção "O
formato decide três coisas".
> "Quais peças são e em que formato cada uma sai? Ex.: landing (16:9, vira
> página), carrossel de 6 cards (4:5, PNG), story (9:16), deck (16:9,
> .pptx/PDF). E qual vem primeiro?"

Preencha o `projeto.md` de cada peça: formato, unidade, proporção, peça
final, ordem. A proporção vira parâmetro de todo prompt de imagem dessa
peça e não muda no meio.

**C3 — O briefing do contexto.** **Abrir:** nada novo.
> "Me conta o contexto: quem é o cliente, o que vende, pra quem, o que a peça
> precisa fazer, o que é prova real (números, depoimentos, logos que posso
> usar) e o que nunca pode aparecer. Se tiver link do que já está no ar,
> manda também."

Guarde em `briefing/AAAA-MM-DD-briefing.md` e resuma em
`docs/sdd/contexto-do-projeto.md`.

**C4 — A direção visual.** **Abrir:** `SKILL.md`, só a seção "Em que modo
você está" e a tabela "o que você tem" de "O que você prepara antes de chamar
a skill".
> "Agora a cara: marca (logo, paleta com hex, fontes), referências de que
> você gosta e o que você veta, com o motivo. Pode ser print, link,
> moodboard, Figma ou só texto. Se não tiver nada, diz 'não tem' que eu
> proponho."

Assets em `marca/`, referências em `pecas/<peça>/referencias/` (com data no
nome). Anote **com que fidelidade** a direção chegou (nada, texto, moodboard,
Figma de direção, Figma com medida). Isso define o modo; ver "Em que modo
você está", no `SKILL.md`.

**C5 — Só se sobrar lacuna.** **Abrir:** a Etapa 2 do `bootstrap.md` (já
lido). Depois dos quatro, **uma** mensagem, numerada,
só com o que ainda falta e é decisão do dono (conceito, copy, prova, publicação,
gosto entre alternativas equivalentes). Use a lista da Etapa 2 do
`bootstrap.md` como menu, **não** como questionário: pergunte só o que os
quatro pedidos não responderam. O óbvio você decide e registra. Sem resposta
sobre quem gera as imagens: **o dono gera à mão** (Etapa D3). Se o dono gera
e você não sabe **em qual gerador**, pergunte aqui: é dele que sai o sufixo
dos arquivos de imagem.

Feche o grill com: spec de cada peça em `docs/sdd/specs/<peça>.md` (do
`docs/sdd/specs/_modelo.md`), tarefas em `docs/sdd/gestao-do-projeto.md`
(tarefa, entregável, status), os placeholders `<…>` do `CLAUDE.md` e do
`docs/sdd/README.md` preenchidos, e commit `docs: grill e specs das peças`.

## Etapa D — Execução

Agora é seguir o `bootstrap.md` da Etapa 4 em diante, **uma peça por vez**, na
ordem do C2. Os três portões são do dono: **qual ideia, qual imagem, se está
pronto**. Entre um portão e o outro, você trabalha sozinho.

**D1 — Direção escrita.** **Abrir:** `SKILL.md` (agora inteiro; o Passo 0 é
a direção), `references/copy-contrato.md`, `references/direcao-visual.md`,
`references/taste.md` (só as "Lições de ofício" valem para o cliente novo) e
`assets/direcao-visual-template.md`. Escreva `pecas/<peça>/direcao-visual.md`
com nome, a leitura da copy que a sustenta, 3–5 referências quando houver
(sem referência, a direção nasce da leitura da copy e diz isso), a paleta com
hex, a tipografia, o que não entra e **o prefixo comum dos prompts**, pronto
para colar. Mostre ao dono. Ele aprova antes de qualquer ideia, e a
aprovação fica em dois lugares: o pedido no log e a linha `Aprovada em
AAAA-MM-DD: "<fala do dono>"` no topo do `direcao-visual.md`.

**D2 — Blocagem e ideias.** **Abrir:** `references/blocagem.md`,
`references/conceitos-por-dobra.md`, `references/ideias-ascii.md` e
`assets/blocagem-template.md`. Primeiro `blocagem.md`, **no formato do
template**: uma linha por seção, com função, conceito, componente ou
elemento, ato, onde o texto fica e o que mais está ali. Depois, **por
seção**, em `secoes/NN-slug/ideias.md` (a leva é **sua**, do agente
principal; subagente de ideação só em peça longa, e aí crie
`pecas/<peça>/subagentes/BRIEFING-IDEACAO.md` a partir de
`assets/briefing-subagente-ideacao.md`):
3 a 5 ideias em texto, cada uma com **nome curto · leitura da copy ·
mecanismo vivo · esboço ASCII** (dimensão pela proporção, tabela no
`ideias-ascii.md`; só ASCII e box-drawing, sem emoji), e **uma recomendação**
no fim. Um dispositivo por seção, sem repetir na peça. No máximo um
comparativo lado a lado na peça inteira; o normal é um objeto único que se
transforma. → **Portão 1:** o dono escolhe uma ou duas.

**D3 — Prompts de imagem.** **Abrir:** `references/imagem-conceito.md`,
`assets/prompt-secao-template.md`, `GUIA-IMAGENS.md` (para passar ao dono) e
`references/revisao-por-audio.md` se o veredito vier por áudio. Só das ideias
escolhidas. **Depois da escolha do dono e antes de escrever o prompt**, rode
o double-check (a–d) com um subagente de contexto limpo, sobre as
escolhidas. Um arquivo por prompt, `secoes/NN-slug/prompt-vK.md`: o prefixo
comum da direção **sem alterar** + `LAYOUT.` descrito a partir do esboço
ASCII aprovado. O esboço leva a frase real da copy; **o prompt nunca**: ao
colar o esboço no `LAYOUT.`, cada frase vira marcador de lugar e peso
(`<headline, 2 linhas>`, `<lista de 3 itens>`, `<CTA>`), porque o gerador
escreve na imagem o que lê. O dono cola **só o bloco ```text** no gerador dele e gera **à
mão**. Se houver MCP de imagem ligado e o dono pedir, você gera; senão, não
ofereça duas vezes.

Diga ao dono, para cada prompt, **onde salvar a imagem e com que nome**:

| arquivo | quem cria | regra |
|---|---|---|
| `secoes/NN-slug/ideias.md` | você | uma seção datada por leva |
| `secoes/NN-slug/prompt-vK.md` | você | K = número do prompt; variação: `prompt-vK-<nome>.md` |
| `secoes/NN-slug/ideia-vK-<modelo>.png` | o dono | K = o do prompt que gerou; `<modelo>` = sufixo abaixo |
| `secoes/NN-slug/ideia-vK-aprovada-<modelo>.png` | você renomeia | só a escolhida |
| `secoes/NN-slug/veredito.md` | você | log datado, só acrescenta, com a fala literal do dono |

O sufixo é o nome curto do modelo **que o dono diz que usou**: disse só
"ChatGPT", `chatgpt`; sabe a versão, `gpt25` etc. Não sabe, pergunte antes
de nomear. Sufixos: `chatgpt` · `gpt25` · `seedream5pro` · `nanobanana` ·
`mystic` · `flux` · `outro-<nome>`. As versões ficam **lado a lado** na pasta da seção; nada se
apaga. Print de teste **nunca** entra em `secoes/`: vai para
`arquivo-local/prints-teste/`.

→ **Portão 2:** o dono dá o veredito (`aprovada`, `refazer: …` ou `usar
parte: …`). No máximo **duas gerações por ideia**. Se foi recusada duas
vezes, **volte ao D2** com ideias novas em texto, e não para outra imagem.

**D4 — Finalização** (Etapas 7 a 9 do `bootstrap.md`). **Abrir:**
`references/camadas.md`, `assets/camadas-template.md`,
`references/orquestracao.md`, `references/mecanismos.md`,
`references/animacao.md` (se o formato tem eixo de tempo),
`references/medicao.md`, `references/armadilhas.md`; `stacks/next-tailwind-gsap.md`
só se for essa a stack. Por seção aprovada:
`camadas.md` (wireframe e layout), a peça no formato do `projeto.md`, refino
com a imagem aprovada aberta ao lado, check final da copy **na peça**, **um
commit por seção**. Saída em `pecas/<peça>/saida/`. → **Portão 3:** "pronto"
só quando o dono disser. Gate verde e elogio não são aprovação.

## Em toda mensagem do dono, sem exceção

1. `docs/sdd/log-de-prompts.md`: pedido **literal** (com os erros de
   digitação), **Entendido** e **Feito** honestos.
2. `docs/sdd/gestao-do-projeto.md`: status da tarefa tocada, **a partir do
   fim do grill**, quando as tarefas passam a existir. ✅ só com entregável
   verificado.
3. `docs/sdd/changelog.md` no mesmo commit do trabalho.
4. Commits pequenos (`feat:`, `fix:`, `docs:`, `chore:`).
5. Contexto apertando ou troca de chat: `/ctxt-full`. Ele escreve o
   checkpoint datado e o prompt de retomada em `docs/sdd/`.

## O que não se negocia

- A copy é literal. Nenhuma frase para o público que não esteja nela, nem em
  estado de interação (toast, feedback, sucesso).
- Nada de prova inventada: número, depoimento, rosto, logo de terceiro. Na
  imagem-conceito, número vira traço e rosto vira círculo cinza.
- Decida o óbvio (tamanho de fonte, colunas, quebra de linha no celular) e
  relate. Quando perguntar, **mostre a imagem ou o print**, não descreva.
- Nunca cite outro cliente, projeto ou pessoa: nem na conversa nem na peça.
- Diagnóstico do dono é ordem; a solução que ele sugere com "talvez" é
  hipótese.
