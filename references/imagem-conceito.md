# Imagem-conceito por seção: a ideia antes do código

> Fase 1.5a do método. Entre a blocagem e o primeiro `.tsx`, cada seção vira
> **uma imagem na proporção do formato** que o cliente aprova. A imagem é ferramenta
> de pensamento e de aprovação — **não é asset da página**. O que vai ao ar
> continua nascendo em HTML/CSS, e a copy literal só entra no código.

## Por que existe

Nas palavras de quem pediu a etapa (2026-09-21):

> "Você vai logo da blocagem a pensar no layout. Eu queria uma etapa extra de,
> em cima da blocagem, pensar em ideias de seções gerando um prompt de imagem
> dessa seção. Você é muito mais criativo imaginando com uma skill de imagem.
> Aí em cima da imagem que você gerar, aí sim você destrincha em camadas. Você
> não vai pensar em implementação e ideia juntos — isso te dá muito mais
> liberdade de contexto."

E, depois de ver as catorze imagens:

> "Como ideias de seções tá perfeito. A vida mesmo vai ser nas micro
> interações, nas animações, nos scrolls. Se você olhar pelas imagens são
> seções relativamente simples, mas eu tendo o olhar de design eu sei o que
> você quis fazer ali."

O ganho é de **separação**: a imagem decide composição, dispositivo e lugar
do acento de cor; o código decide texto, token, semântica e movimento. Pensar
os dois juntos custa contexto e produz seções que são wireframe com cor.

## Onde entra no pipeline

```text
Fase 0    Fundações (ficha, contrato de copy, tokens, ritmo de superfícies)
Fase 0.5  Direção visual — ESCRITA e obrigatória (references/direcao-visual.md §0)
Fase 1    Blocagem (coluna Assets ganha "IC" = imagem-conceito)
Fase 1.5a ► IMAGEM-CONCEITO: prompt por seção → double-check → imagem → veredito
Fase 1.5b ► CAMADAS: ficha de 7 camadas por seção aprovada (references/camadas.md)
Fase 3    Implementação por seção (references/orquestracao.md)
```

## Os artefatos e onde ficam

```text
meu-projeto/
├─ projeto.md              formato, unidade, PROPORÇÃO, arquivo final, prazo
├─ copy/copy.md            a copy aprovada, dividida em blocos — inviolável
├─ direcao-visual.md       direção nomeada + paleta + o que não entra + PREFIXO COMUM colável
├─ blocagem.md             uma linha por unidade; marca "IC" nas que passam por imagem-conceito
├─ BRIEFING-IDEACAO.md     briefing autocontido do double-check (assets/briefing-subagente-ideacao.md)
├─ secoes/
│  └─ NN-slug/
│     ├─ prompt-v1.md      versão nova nasce AO LADO (prompt-v2.md), nunca por cima
│     ├─ imagem-v1-<modelo>.png   na proporção do projeto; o nome diz versão e origem
│     ├─ veredito.md       aprovada | refazer: … | usar parte: …   (uma linha)
│     └─ camadas.md        wireframe (camadas 1–3) e layout (camadas 4–7)
├─ referencias/            imagens que o cliente traz no meio da rodada, com data no nome
├─ saida/                  a peça final, no formato do projeto.md
└─ historico/              versões substituídas — nada se apaga
```

Uma pasta por unidade. O nome do arquivo carrega **a versão e o modelo**, que é
o que permite empilhar tentativas sem perder nenhuma e comparar geradores.

Num projeto de código, essa árvore fica **fora da pasta publicada**, e o gate
reprova qualquer `.md` ou `.png` de trabalho dentro do artefato.

## O prompt de uma seção

Template em `assets/prompt-secao-template.md`. Estrutura, nesta ordem:

1. **Título** `NN — <Função> · "<conceito nomeável>"`.
2. **Ato** (claro/escuro, conforme a blocagem) e **elemento visual**: qual
   anatomia entra e **o que ela diz da copy**.
3. **Double-check** (a–d, abaixo).
4. **Copy literal da seção** em blockquote — para o cliente ler ao lado da
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

### Regras da cena

- Peça o **lugar e o peso** do texto, nunca a frase exata. O gerador escreve
  errado, e a copy só existe no código.
- **Tudo que a copy não diz, a imagem não afirma.** Sem rosto, número que se
  leia como prova, nome, depoimento, print de resultado. Pessoa real citada
  na copy entra só como texto. Na imagem, todo número vira um traço e todo
  rosto vira um círculo cinza.
- **Um dispositivo por seção e nunca o mesmo em seções vizinhas.** Dois perfis
  seguidos ou dois Reels seguidos são colisão; repetição só vale como eco
  declarado (ver `conceitos-por-dobra.md`).
- Nomeie a **anatomia real** do que está citando (barra de ações, avatar,
  estatísticas, bio, abas, grade), não "um card de rede social". Sem essa
  lista o resultado sai em nível de wireframe.
- Cor de ação em até três pontos; ato claro/escuro conforme a blocagem.

## Double-check em contexto limpo (gate da fase)

Antes de gerar — e de novo antes de implementar — subagentes com **contexto
limpo** julgam cada ideia por escrito, dentro do próprio arquivo da seção:

- **(a) Função.** A ideia sustenta a função narrativa da copy nesta seção?
- **(b) Nomeável e única.** Cabe em uma frase e não repete o dispositivo de
  outra seção?
- **(c) Fidelidade sem prova.** Dá para desenhar em alta fidelidade sem
  inventar rosto, número ou depoimento?
- **(d) Existe ideia mais forte?** Se sim, proponha e use. Se não, mantenha e
  diga por quê. **Manter é resultado válido; trocar por trocar não é.**

Regras de operação que fizeram o gate funcionar:

- lotes de **3–4 seções** por subagente, em paralelo, disparados por um prompt
  curto que aponta para o `BRIEFING-SUBAGENTE.md` (autocontido, com os vetos
  **e o motivo de cada um** — veto sem motivo vira superstição);
- todos recebem a **tabela de blocagem inteira**, para julgar vizinhança;
- proibidos de ler `historico/` — o julgamento tem de ser limpo;
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
- Modelos, pelo resultado dos testes da casa (2026-09-21/22): os melhores
  para interface foram **GPT Image 2.5** e **Seedream 5 Pro pelo Magnific**;
  Nano Banana (Gemini) serviu; Mystic não serve para UI. O cliente fica à
  vontade para testar outros — anote o modelo no nome da imagem
  (`imagem-v2-gpt25.png`) e no veredito. Quando um modelo vencer 3–4 seções
  seguidas, vira o padrão do projeto e é registrado no `projeto.md`.
- **Com ou sem MCP, o fluxo é o mesmo.** Quem tem um servidor de geração
  ligado ao Claude (Higgsfield, Magnific…) pode pedir ao Claude para gerar;
  quem não tem cola o bloco de prompt no navegador. A qualidade depende do
  modelo, não do caminho — só não prometa automação sem confirmar crédito e
  workspace.
- CLI de geração só é promessa quando há crédito **e workspace selecionado**
  — confirme antes. Sem isso o entregável é o `.md`, e o cliente gera no
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

O cliente vê a imagem e responde com uma linha: `aprovada`,
`refazer: <o quê>` ou `usar parte: <qual>`. No arquivo `veredito.md` ou no
chat — se for no chat, **registre você**. Na primeira execução o arquivo foi
especificado duas vezes e nunca criado; a aprovação veio em bloco. Aceite o
que vier, mas escreva.

**O gate é a satisfação com as ideias, não a primeira imagem.** O cliente
pode pedir variações e **empilhar versões do prompt** de uma seção
(`prompt-v2.md`, `prompt-v3.md`…), gerar cada uma, guardar todas na
pasta da seção e escrever no veredito o que cada versão acertou. Só se avança
para as camadas e o código quando ele estiver satisfeito **com a ideia de cada
seção e com a distribuição da copy entre as seções** — se uma frase parece
estar na seção errada, é aqui que se corrige, reescrevendo a blocagem, não
depois no código. **No fim, uma ideia por seção**, com o histórico inteiro
preservado em `historico/`.

**A imagem aprovada é ideia, não seção final.** O que se aprova é a
composição e o dispositivo; texto, cor exata e movimento vêm do código. Ao
implementar, tenha a imagem **aberta ao lado**; ao refazer, tenha a imagem
**e o print atual** lado a lado — a composição da imagem vale mais do que a
leitura livre dela.

## Versionamento e histórico

- Numere as linhas de direção (V1, V2, V3…) e guarde a anterior ao lado como
  registro, com a fala literal que a substituiu.
- **Versão nova nasce ao lado, nunca sobrescreve** — o cliente pode estar
  testando a anterior neste momento.
- Quando a direção mudar, **reescreva a blocagem no mesmo commit**. Dois
  documentos de verdade divergentes fizeram três subagentes reportar o mesmo
  conflito.
- Nada se apaga: `historico/`.

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
