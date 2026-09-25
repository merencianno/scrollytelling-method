# Imagem-conceito por seção: a ideia antes do código

> Passos 3 e 4 do método. Entre as ideias escolhidas e o primeiro `.tsx`, cada
> seção vira **uma imagem na proporção do formato** que o dono aprova. A imagem é ferramenta
> de pensamento e de aprovação — **não é asset da página**. O que vai ao ar
> continua nascendo em HTML/CSS, e a copy literal só entra no código.

## Por que existe

O pedido que criou a etapa, em paráfrase: sair da blocagem direto para o
layout mistura ideia e implementação; gerar primeiro uma imagem por seção
libera a imaginação, e só em cima da imagem aprovada se destrincha em camadas.

Depois de ver as catorze imagens, o veredito foi: como ideias de seção,
aprovadas; a vida vai estar nas microinterações, nas animações e na rolagem —
as imagens são simples, mas quem tem olhar de design lê nelas o que a seção
quer fazer.

O ganho é de **separação**: a imagem decide composição, dispositivo e lugar
do acento de cor; o código decide texto, token, semântica e movimento. Pensar
os dois juntos custa contexto e produz seções que são wireframe com cor.

## Onde entra no pipeline

```text
Passo 0    Pasta e direção — projeto.md, copy congelada, direção ESCRITA (references/direcao-visual.md §0)
Passo 1    Blocagem (coluna Assets ganha "IC" = imagem-conceito)
Passo 2    ► IDEIAS EM TEXTO com esboço ASCII (references/ideias-ascii.md) → portão 1: o dono escolhe 1–2
Passo 3    ► PROMPTS só das escolhidas: double-check → prompt com o ASCII no LAYOUT.
Passo 4    ► IMAGEM → veredito datado (portão 2)
Passos 5–6 CAMADAS: wireframe (1–3) e layout (4–7) por seção aprovada (references/camadas.md)
Passo 7    Refinamento e revisão (references/orquestracao.md)
```

## Os artefatos e onde ficam

Tudo vive na pasta da peça (`pecas/<peça>/`, ver `SKILL.md`):

```text
pecas/<peça>/
├─ projeto.md              formato, unidade, PROPORÇÃO, arquivo final, prazo
├─ copy/copy.md            a copy aprovada, dividida em blocos — inviolável
├─ direcao-visual.md       direção nomeada + paleta + o que não entra + PREFIXO COMUM colável
├─ blocagem.md             uma linha por unidade; marca "IC" nas que passam por imagem-conceito
├─ subagentes/
│  └─ BRIEFING-IDEACAO.md  briefing autocontido do double-check (assets/briefing-subagente-ideacao.md)
├─ secoes/
│  ├─ README.md            estado por seção, modelo padrão e custo, dispositivos já usados
│  └─ NN-slug/
│     ├─ ideias.md                       levas de ideias em texto com esboço ASCII (references/ideias-ascii.md)
│     ├─ prompt-vK.md                    K = número do prompt; versão nova nasce AO LADO, nunca por cima
│     ├─ ideia-vK-<modelo>.png           gerada pelo prompt K; o modelo vai só no sufixo
│     ├─ ideia-vK-aprovada-<modelo>.png  a escolhida, renomeada; as outras ficam ao lado
│     ├─ veredito.md                     log datado, append-only, com a citação literal do dono
│     └─ camadas.md                      wireframe (camadas 1–3) e layout (camadas 4–7)
├─ referencias/            imagens que o dono traz no meio da rodada, com data no nome
├─ saida/                  a peça final, no formato do projeto.md
└─ historico/              direção visual e briefings substituídos — nada se apaga
```

Uma pasta por unidade. O nome do arquivo carrega **o número do prompt e o
modelo**, que é o que permite empilhar tentativas sem perder nenhuma e
comparar geradores. **As versões ficam lado a lado na pasta da seção**,
visíveis no editor — nunca cópia em pasta ignorada; `historico/` não recebe
imagens. Variação nomeada do mesmo K é permitida: `prompt-vK-<nome>.md` →
`ideia-vK-<nome>-<modelo>.png`.

Sufixos de modelo (fixos, para ordenar e comparar). O sufixo é o nome curto
do modelo **que o dono diz que usou**: disse só "ChatGPT", `chatgpt`; sabe a
versão, `gpt25` etc.

| sufixo | modelo |
|---|---|
| `chatgpt` | ChatGPT, versão não informada |
| `gpt25` | GPT Image 2.5 |
| `seedream5pro` | Seedream 5 Pro |
| `nanobanana` | Nano Banana (Gemini) |
| `mystic` | Mystic |
| `flux` | Flux |
| `outro-<nome>` | qualquer outro |

Num projeto de código, essa árvore fica **fora da pasta publicada**, e o gate
reprova qualquer `.md` ou `.png` de trabalho dentro do artefato.

## O prompt de uma seção

Template em `assets/prompt-secao-template.md`. Estrutura, nesta ordem:

1. **Título** `NN — <Função> · "<conceito nomeável>"`, e logo abaixo
   **Ideia:** `<nome escolhido na leva de ideias.md>` — o mesmo nome no
   prompt, no arquivo e no commit.
2. **Ato** (claro/escuro, conforme a blocagem) e **elemento visual**: qual
   anatomia entra e **o que ela diz da copy**.
3. **Double-check** (a–d, abaixo).
4. **Copy literal da seção** em blockquote — para o dono ler ao lado da
   imagem, nunca para entrar na imagem.
5. **O prompt**: prefixo comum **inalterado** + linha em branco + `LAYOUT.` +
   a cena.
6. **Duas variações** de uma linha.
7. **Critério de aceite** em 3–4 linhas, terminando sempre pelas proibições.

**O prefixo comum** vive na direção visual e é colado igual em todas as
seções. Ele fixa: formato ("screenshot de uma seção de site real, 1440 px,
a proporção do projeto, export de Figma, não ilustração"), paleta com hex, tipografia,
a anatomia real do vocabulário escolhido, e as proibições (cores, logotipos,
rostos, números, molduras, glow, fade). Termina dizendo que o texto na imagem
é placeholder.

**A cena** (`LAYOUT.`) descreve coluna a coluna, de cima para baixo, com
porcentagens de largura: o que é cada bloco de texto (headline de duas
linhas, lista de quatro itens — **nunca a frase**), onde entra o mockup e o
que ele mostra, e **onde estão os pontos da cor de ação**, numerados e no
máximo três.

**O esboço ASCII escolhido vai dentro do `LAYOUT.`** como descrição de
layout, antes da descrição coluna a coluna. **O esboço leva a frase real da
copy; o prompt nunca.** Ao colar o esboço no `LAYOUT.`, cada frase vira
marcador de lugar e peso — `<headline, 2 linhas>`, `<lista de 3 itens>`,
`<CTA>` —, porque o gerador escreve na imagem o que lê no prompt. Quando a seção **não** mostra o
produto, diga isso no `LAYOUT.` — o prefixo comum puxa o produto sozinho
(numa rodada real, uma imagem saiu com a plataforma numa seção que não a
pedia).

### Regras da cena

- Peça o **lugar e o peso** do texto, nunca a frase exata. O gerador escreve
  errado, e a copy só existe no código.
- **Tudo que a copy não diz, a imagem não afirma.** Sem rosto, número que se
  leia como prova, nome, depoimento, print de resultado. Pessoa real citada
  na copy entra só como texto. Na imagem, todo número vira um traço e todo
  rosto vira um círculo cinza.
- **Um dispositivo por seção e nunca repetido na peça** — não só entre
  vizinhas. Dois perfis ou dois Reels na mesma página são colisão; repetição
  só vale como eco declarado (ver `conceitos-por-dobra.md`).
- **O conceito pode inventar a interface; a implementação usa só asset
  real**, ou componente criado sobre ele, ou placeholder rotulado com pedido
  ao dono. A imagem decide composição; o real vem do código.
- Nomeie a **anatomia real** do que está citando (barra de ações, avatar,
  estatísticas, bio, abas, grade), não "um card de rede social". Sem essa
  lista o resultado sai em nível de wireframe.
- Cor de ação em até três pontos; ato claro/escuro conforme a blocagem.

## Double-check em contexto limpo (gate da fase)

A ordem é fixa: o **agente principal** escreve a leva de ideias em texto
(Passo 2) → o dono escolhe (portão 1) → **só então** o double-check, por
subagente de contexto limpo, sobre as escolhidas → prompt → imagem. É
**obrigatório depois da escolha do dono e antes de gerar imagem**, e de novo
antes de implementar. Subagente de ideação escrevendo a leva é opcional, para
peça longa (ver `assets/briefing-subagente-ideacao.md`). Subagentes com
**contexto limpo** julgam cada ideia por escrito, dentro do
próprio arquivo da seção:

- **(a) Função.** A ideia sustenta a função narrativa da copy nesta seção?
- **(b) Nomeável e única.** Cabe em uma frase e não repete o dispositivo de
  outra seção?
- **(c) Fidelidade sem prova.** Dá para desenhar em alta fidelidade sem
  inventar rosto, número ou depoimento?
- **(d) Existe ideia mais forte?** Se sim, proponha e use. Se não, mantenha e
  diga por quê. **Manter é resultado válido; trocar por trocar não é.**

Regras de operação que fizeram o gate funcionar:

- lotes de **3–4 seções** por subagente, em paralelo, disparados por um prompt
  curto que aponta para o `subagentes/BRIEFING-IDEACAO.md` (autocontido, com
  os vetos e as regras do dono **com o motivo de cada um** — veto sem motivo
  vira superstição);
- todos recebem a **tabela de blocagem inteira**, para julgar vizinhança, e
  **a tabela de dispositivos já testados e vistos pelo dono** (seção →
  dispositivo → versão), para não repetir na peça;
- proibidos de ler os vereditos de outras seções antes de escrever a sua — o
  julgamento tem de ser limpo;
- relatório de até 3 linhas por seção **mais a lista de buracos de copy**
  notados, sem corrigir a copy;
- o orquestrador valida mecanicamente depois: prefixo íntegro (`diff` contra
  a direção), zero ocorrências das cores proibidas, seções do arquivo
  presentes, ato certo.

Resultado na primeira execução (14 seções): 12 mantidas, 2 revistas, 1
execução corrigida, e uma auditoria de copy que a sessão longa não tinha
visto (dobra sem headline, bônus sem autor, garantia sem canal de contato).
Contexto limpo enxerga colisão entre vizinhas que quem escreveu não vê.

## Gerar

O gargalo é a descrição da ideia; gerar é o menor problema. Regras aprendidas
em imagem perdida:

- **Cole só o bloco ```text.** Todo texto fora do bloco vira instrução: um
  cabeçalho de arquivo que citava o nome de outro projeto ("sem a cor X, é do
  projeto X") fez a imagem sair com esse nome escrito dentro dela.
- **Gere individualmente.** Modo lista/lote piora o resultado e não avisa.
- **Mude uma variável por vez.** Prompt, modelo e modo de geração nunca mudam
  juntos — três mudaram de uma vez e o teste ficou inconclusivo.
- **A skill não fixa modelo; o bake-off decide.** Nas três primeiras seções,
  mesmo prompt e mesma referência em dois modelos (uma variável por vez); o
  dono escolhe, e pode preferir o caro. O vencedor vira o padrão do projeto,
  registrado no `projeto.md`, e o custo observado por modelo fica no
  `secoes/README.md` da peça. Anote o modelo no nome (`ideia-v2-gpt25.png`) e
  no veredito. Como dado histórico, não como padrão: nos testes que deram
  origem a esta skill os melhores para interface foram GPT Image 2.5 e
  Seedream 5 Pro; Nano Banana serviu; Mystic não serviu para UI; e numa
  rodada o modelo mais caro venceu todas as seções apesar de custar 6–8×
  mais.
- **No máximo duas gerações por ideia.** A segunda só se o essencial saiu
  errado (dispositivo trocado, comparativo, cor proibida). Recusada duas
  vezes, volta às ideias em texto (Passo 2), não a outra imagem.
- **Referências sobem uma vez** e são reutilizadas pelo identificador que o
  gerador devolve. **Catálogo grande vira folha de contato** (uma imagem com
  a fileira inteira de thumbs), não dez uploads.
- **Quando o dono descreve a solução**, gere a dele **e** pelo menos uma sem
  viés — na rodada em que isso foi feito, a escolhida foi uma sem viés.
- **Seção que não se gera se explica** antes de o dono perguntar: toda
  unidade da leva aparece no checklist, gerada ou com "não gerei porque X".
- **Com ou sem MCP, o fluxo é o mesmo.** Quem tem um servidor de geração
  ligado ao Claude (Higgsfield, Magnific…) pode pedir ao Claude para gerar;
  quem não tem cola o bloco de prompt no navegador. A qualidade depende do
  modelo, não do caminho — só não prometa automação sem confirmar crédito e
  workspace.
- CLI de geração só é promessa quando há crédito **e workspace selecionado**
  — confirme antes. Sem isso o entregável é o `.md`, e o dono gera no
  navegador e sobe a imagem na pasta. Foi assim que a primeira rodada
  aconteceu, e foi o que permitiu testar modelos.
- Uma imagem por unidade, **na proporção declarada no `projeto.md`**. Numa
  landing é 16:9 de desktop e o mobile nasce nas camadas; num carrossel é 1:1
  ou 4:5; num story, 9:16. A proporção entra no prefixo comum e não muda no
  meio do projeto — trocá-la invalida a comparação entre unidades.
- **Prompt longo faz o modelo ignorar proibições** (wordmark, moldura de
  celular, cor vetada). Na imagem-conceito não importa: é lixo do gerador.
  Importa **não copiar isso no código** — diga no briefing de implementação:
  "a imagem vale como composição; o texto e os detalhes dentro dela são lixo".

## Aprovação

O dono vê a imagem e responde — no chat, por áudio ou no arquivo. Quem
registra é você: **`veredito.md` é log datado, append-only**, uma entrada
por veredito, com **a citação literal do dono** e o nome do arquivo
escolhido (`ideia-vK-aprovada-<modelo>.png`). Troca posterior é entrada
nova; a anterior nunca se sobrescreve. `aprovada`, `composição (refaz o
acabamento)`, `refazer: <o quê>`, `usar parte: <qual>` e `voltar às ideias`
são o **vocabulário de estado** dentro de cada entrada, não o formato do
arquivo. O arquivo existe mesmo com veredito pendente. Na primeira execução
ele foi especificado duas vezes e nunca criado; a aprovação veio em bloco.
Aceite o que vier, mas escreva.

**O gate é a satisfação com as ideias, não a primeira imagem.** Regras de
fechamento:

- **no máximo duas gerações por ideia**, e a leva seguinte só depois do
  veredito da anterior;
- **recusada duas vezes → volta às ideias em texto** (Passo 2), não a outra
  imagem — numa rodada real, quatro imagens recusadas seguidas na mesma
  seção custaram milhares de créditos antes de oito ideias em texto
  resolverem;
- **anuncie a última leva** ("a última; depois o veredito e implementamos"):
  dá ao dono uma escolha finita;
- **aprovação de ideia cujo valor é o movimento é hipótese até rodar** —
  diga isso e mostre o movimento cedo (um letreiro aprovado em imagem foi
  implementado, visto animado e descartado).

Só se avança para as camadas e o código quando o dono estiver satisfeito
**com a ideia de cada seção e com a distribuição da copy entre as seções** —
se uma frase parece estar na seção errada, é aqui que se corrige,
reescrevendo a blocagem, não depois no código. **No fim, uma ideia por
seção**, com todas as versões preservadas ao lado, na pasta da seção.

**A imagem aprovada é ideia, não seção final.** O que se aprova é a
composição e o dispositivo; texto, cor exata e movimento vêm do código. Ao
implementar, tenha a imagem **aberta ao lado**; ao refazer, tenha a imagem
**e o print atual** lado a lado — a composição da imagem vale mais do que a
leitura livre dela.

## Versionamento e histórico

- Numere as linhas de direção (V1, V2, V3…) e guarde a anterior ao lado como
  registro, com a fala literal que a substituiu.
- **Versão nova nasce ao lado, nunca sobrescreve** — o dono pode estar
  testando a anterior neste momento. Vale também para a peça inteira:
  mudança de muitas unidades nasce em **rota ou arquivo `-v2`** ao lado da
  versão atual, com escopo próprio; a atual fica intacta até o dono comparar
  e escolher.
- Quando a direção mudar, **reescreva a blocagem no mesmo commit**. Dois
  documentos de verdade divergentes fizeram três subagentes reportar o mesmo
  conflito.
- Nada se apaga: imagens ficam lado a lado na pasta da seção; direção e
  briefing substituídos vão para `historico/`.

## O que a primeira execução ensinou

- A **V1 nasceu por inércia do projeto anterior** — herdou a cor auxiliar e o
  vocabulário genérico da página anterior. Vetada como "cara de IA". A
  correção veio de ler a página de referência do próprio cliente e extrair os
  hex reais dela. Direção
  nasce de referência real, não de neutralidade; e `[projeto]` nunca se
  transporta (ver `taste.md`).
- Um levantamento antes de planejar (dois subagentes de exploração lendo a
  skill e o inventário de ferramentas) mostrou que o buraco já estava
  documentado no backlog — a etapa nova encaixou em vez de competir.
- A ficha de camadas **tende a virar documentação a posteriori** se o mesmo
  subagente escreve ficha e código. Se o valor da separação importa, exija a
  ficha entregue **antes** do primeiro `.tsx` (ver `camadas.md`).
- A imagem decide pouco e decide bem: **arranjo, dispositivo, hierarquia e o
  lugar do acento de cor — e mais nada.** Tudo o mais nasce depois.

Lições das rodadas seguintes:

- **O prefixo comum se confere contra a referência real** no double-check:
  um prefixo herdado dizia "janela escura" onde a interface real era clara, e
  só o contexto limpo notou.
- **Laptop com tela esticada** foi reprovado: o dispositivo tem proporção
  fixa; a interface entra no tamanho nativo, reduzida por `scale()` medido,
  e o excesso é cortado pela borda.
- **Imagem aprovada sem ver a animação** foi descartada depois de
  implementada. Ideia que vive do movimento se prova rodando, não na imagem.
