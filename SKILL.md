---
name: scrollytelling-method
description: Transformar uma copy aprovada em interface narrativa — landing com scrollytelling, deck de slides, carrossel de social, criativo estático ou tela de produto. Direção visual escrita antes de tudo, imagem-conceito aprovada por unidade antes do código, ficha de 7 camadas como briefing, mockup de interface com mock data (nunca prova) no lugar de screenshot, loops em CSS pausados até entrar em cena, identidade token-first, copy inviolável verificada por script e orquestração "uma unidade por vez" em subagentes. Use sempre que o usuário pedir "página de vendas", "landing com scrollytelling", "transformar essa copy em página", "reimaginar a landing", "transformar essa copy em slides", "deck", "apresentação", "carrossel", "criativo", "tela de produto", "tangibilizar a copy", "imagem-conceito por seção", "revisão por áudio", ou quando existir uma copy dividida em blocos esperando virar interface. Cobre o pipeline inteiro, da ficha do projeto à publicação.
license: MIT
---

# scrollytelling-method

Método para transformar copy comercial em interface que se conta sozinha.
Destilado de quatro páginas que existem em produção, aqui chamadas `/ref-vsl`,
`/ref`, `/ref-funil-a` e `/ref-funil-b`, e das armadilhas que todas custaram.

Não é um tema visual: é um processo com contratos verificáveis. Trocar cor e
fonte numa estrutura existente é maquiagem, e vai ser rejeitado na primeira
revisão.

## O formato e a unidade

O método organiza **uma narrativa quebrada em unidades**. O que muda de um
formato para outro é o eixo do tempo; o pipeline é o mesmo.

| formato | a unidade | o eixo do tempo |
|---|---|---|
| página de vendas, landing | a dobra | o scroll |
| apresentação, deck | o slide | o avanço |
| carrossel de social | o card | o swipe |
| criativo estático | a peça | não existe: resolve-se em composição |
| UI de produto | a tela ou o estado | a interação de quem usa |

**Identifique o formato na Fase 0** e leia "dobra" e "seção", no resto destes
arquivos, como *a unidade daquele formato* — o vocabulário vem do caso de
origem, que é a página.

O que muda fora da página, e só isto:

- **O padrão D (scrub) não existe sem scroll.** Em deck ele vira transição
  entre slides; em UI de produto, transição de estado. Os padrões A, B, C e E
  seguem iguais.
- **O ritmo de superfícies** (escuro nos picos, claro nos respiros) é
  ferramenta de página longa. Em deck marca os atos; em criativo isolado não
  se aplica; em UI de produto a consistência vale mais que o contraste.
- **Os gates pressupõem artefato servido.** Para peça exportada (PNG, PDF), a
  regra da copy continua e o verificador precisa ser outro — conferência
  contra o texto da peça, não contra HTML.
- **Em UI de produto, mock data vira dado real** e a copy vem do produto, não
  da oferta. O limite da afirmação continua valendo.

## Arquivos de apoio

Abrir conforme a fase — nenhum precisa ser lido de antemão, e ler todos de uma
vez desperdiça contexto.

| Arquivo | Quando abrir |
|---|---|
| `references/taste.md` | **Antes de propor qualquer conceito.** O que é vetado e o que já foi aprovado, com prefixo de escopo. É o que separa este estilo do visual genérico de IA |
| `references/copy-contrato.md` | Ao receber a copy, antes de escrever a primeira seção |
| `references/direcao-visual.md` | **Fase 0.5, obrigatória.** Escrever a direção quando não existe; extrair quando existe |
| `references/blocagem.md` | Na hora de planejar as dobras, antes de codar |
| `references/imagem-conceito.md` | **Fase 1.5a.** Como cada seção vira uma imagem aprovada antes do código |
| `references/camadas.md` | **Fase 1.5b.** A ficha de 7 camadas que faz a ponte entre a imagem e o código |
| `references/medicao.md` | **Sempre que houver referência com medida.** Como medir protótipo, cor, tracejado e fotografar uma dobra animada |
| `references/conceitos-por-dobra.md` | Ao inventar o conceito de cada seção — inclui a árvore "qual tela o item pede" |
| `references/mecanismos.md` | Quando souber o que a seção precisa dizer mas não como mostrar |
| `references/animacao.md` | **Antes de escrever a primeira linha de animação.** Os cinco padrões e o limite de falha do motor |
| `references/orquestracao.md` | **Antes de disparar o primeiro subagente.** Uma seção por vez, átomos antes do loop, o template do prompt |
| `references/revisao-por-audio.md` | Quando o feedback chegar em áudio — e o grill de perguntas antes de implementar |
| `references/armadilhas.md` | Antes de depurar qualquer coisa que "deveria funcionar" |
| `references/assets-gerados.md` | Para o asset gerado que de fato entra na página (a imagem-conceito não entra) |
| `references/revisao-e-gates.md` | Ao fechar cada rodada |
| `references/publicacao.md` | Antes de publicar — o que só o artefato de produção revela |
| `stacks/next-tailwind-gsap.md` | Se o projeto for Next + Tailwind + GSAP: o código colável |
| `assets/` | Templates: ficha, direção visual, blocagem, prompt de seção, briefing de ideação, camadas, prompt de subagente, checkpoint, sessão, contratos, tokens |
| `scripts/` | `audit-viewports`, `verify-copy-contract`, `verify-fidelidade`, `shoot-dobra` |

## A regra de ouro

Cada seção precisa de um **conceito nomeável em uma frase**. "O placar dos dois
caminhos", "a pilha que pousa", "a publicação que não vira presença". Se não dá
para nomear a cena, ainda é repaginação disfarçada — e o cliente vai perceber
antes de você. E a cena precisa **caber numa imagem que o cliente aprove antes
do código**: se não dá para desenhar, não dá para implementar.

## Em que modo você está

A regra de ouro vale no modo **autor** — e autor é um dos quatro. Antes de
desenhar qualquer coisa, responder:

> **Existe referência? Ela tem número?**

| resposta | modo | o que fazer |
|---|---|---|
| referência **com medida** | **executor** | medir e copiar; nada que a referência não tenha |
| referência **sem medida** | **intenção** | ler o que ela quer dizer, não o que ela mostra |
| referência **de composição** (a imagem-conceito aprovada) | **fidelidade** | reproduzir arranjo, dispositivo e lugar do acento; texto, cor exata e movimento vêm do código |
| não existe referência | **autor** | aí sim conceito nomeável e reimaginação |

O quarto modo é novo: a referência é **criada pelo próprio pipeline** (Fase
1.5a) e obriga fidelidade de arranjo sem obrigar fidelidade de pixel. Se a
imagem divergir de uma revisão escrita posterior, a revisão vence.

**Quando a casa tem designer própria, o modo executor é o caso comum, não a
exceção** — a referência chega como print de Figma com medida. **O modo
muda no meio do projeto, seção a seção** — a pergunta se refaz a cada entrega.

### Executor — existe medida

Reproduzir. O erro característico é **melhorar o que já estava especificado**:
acrescentar sombra e borda ao card porque o componente da casa tem as duas;
escolher proporção de coluna quando o desenho tinha quatro larguras próprias;
inclinar as pills porque ficou bonito. Em modo autor isso é o trabalho. Em modo
executor é desobediência. **Nada de cromo que a referência não tem. Medir, não
estimar** (`references/medicao.md`).

### Intenção — existe rascunho, sem medida

Ler o que a referência quer dizer. Alinhamento, espaçamento e quebra de linha
num protótipo rudimentar são acidente do desenho rápido, não instrução. O mesmo
cliente disse "quero idêntico, pixel perfect" e "é óbvio que é pra centralizar,
estava assim no protótipo porque era rudimentar" — **o que separa os dois casos
é a presença de medida.** Na dúvida, perguntar.

### Fidelidade — existe imagem-conceito aprovada

Implementar com a imagem **aberta ao lado**; refazer com a imagem **e o print
atual** lado a lado, iterando. A composição da imagem vale mais do que a
leitura livre dela. O que a imagem carrega: arranjo, dispositivo, hierarquia,
lugar do acento de cor. O que ela **não** carrega e é lixo do gerador: texto,
número, logotipo, cor que escapou da proibição.

### Autor — não existe direção

Vale o método inteiro: direção escrita, conceito nomeável por seção,
imagem-conceito, camadas, tangibilização.

## Fase 0 — Fundações

1. **Formato e unidade.** Página, deck, carrossel, criativo ou UI? Qual é a
   unidade e qual é o eixo do tempo? Decidido aqui, não descoberto na terceira
   unidade. Ver a tabela acima.
2. **Ficha do projeto.** Quem pediu, para que serve em uma frase, público, e o
   que não é óbvio. Template em `assets/ficha-template.md`. Num conjunto com
   várias peças, cada peça tem **um objeto próprio** que a distingue das
   irmãs — a imagem-conceito é por unidade; o objeto é por peça.
3. **Contrato de copy.** Fonte canônica congelada. Nenhuma palavra, acento,
   número, caixa, emoji ou ordem muda. Hierarquia, agrupamento e ênfase, sim.
   `contratos.json` versionado (`assets/contratos-exemplo.json`), e a tabela de
   **buracos da copy → encaminhamento**. Ver `references/copy-contrato.md`.
4. **Tokens antes de componentes**, escopados por classe. `assets/tokens-template.css`.
5. **Ritmo de superfícies**, quando o formato tem sequência longa. Escuro nos
   picos, claro nos respiros, escrito como string versionada (`1B 2C 3B 4E …`).

### Quais condicionais valem para este formato

Decidir agora, por escrito, e não descobrir na terceira unidade. O invariante
nunca é condicional: formato e unidade, contrato de copy, tokens, direção
visual escrita, blocagem, imagem-conceito, camadas, uma unidade por vez,
gates, revisão e fechamento acontecem **sempre**.

| condicional | entra quando | não entra em |
|---|---|---|
| ritmo de superfícies | a sequência é longa | criativo isolado, peça única |
| motion | o formato tem eixo de tempo | criativo estático |
| responsividade | o viewport varia | carrossel e criativo (dimensão fixa) |
| performance | a peça carrega | o que é exportado como arquivo |
| formato de exportação | **sempre** — muda o quê, nunca se pula | — |

## Fase 0.5 — Direção visual (obrigatória, escrita)

O projeto chega como **copy + direção visual livre**: pode ser texto, imagens,
pesquisa, um Figma, ou nada além da copy. A primeira pergunta não é "existe
direção?", é **"com que fidelidade ela chegou?"** — é a mesma pergunta dos
quatro modos, um andar acima.

| o que chega junto da copy | o que fazer com isso |
|---|---|
| nada | escrever do zero, a partir da leitura da copy e de referência real do cliente |
| texto solto, briefing falado | ler **intenção**, não instrução; o que for medida, perguntar |
| imagens, moodboard | extrair paleta e vocabulário — **nunca layout** |
| pesquisa + imagens + texto | material rico e ainda sem medida: vira direção escrita, não cópia |
| Figma de direção (paleta, marca, ícones) | extrair só três coisas: paleta exata, assets exportáveis, frames como moodboard |
| Figma de página, golden master com medida | **modo executor**: medir e copiar, sem cromo a mais |

O erro caro é tratar os dois últimos como o mesmo caso. Extrair a árvore de
nós de um arquivo de direção é trabalho jogado fora; ler um moodboard como
layout produz seção que não faz sentido nenhum.

Seja qual for a entrada, a saída é a mesma: um documento **escrito**, com
nome, a leitura da copy que o sustenta, a tabela elemento → o que diz na copy
→ onde entra, paleta com hex, o que não entra e o **prefixo comum dos
prompts**, colável. Template em `assets/direcao-visual-template.md`; regras em
`references/direcao-visual.md`.

### A direção é entregável, não documento interno

É a primeira coisa que quem aprova vê, e é o que compra alinhamento antes de
qualquer unidade ser desenhada. Duas densidades, conforme o prazo:

- **Enxuta** — nome da direção em uma frase, paleta com hex, tipografia, 3–5
  referências, o que não entra e por quê, o prefixo de prompt.
- **Elaborada** — tudo isso, mais a leitura da copy, a tabela elemento → copy
  → seções, a anatomia do objeto, duas linhas alternativas (V1/V2) para
  escolher, e **uma ou duas imagens-conceito de amostra** de uma unidade-chave.

A amostra é o item de maior retorno: direção lida como texto o cliente aprova
por educação; direção com uma unidade já desenhada ele aprova ou veta de
verdade. É antecipar a Fase 1.5a numa unidade só para destravar o resto.

### A direção carrega assets

Marcas exportadas, ícones, fotos, texturas viajam junto dela. É o que faz
peças irmãs de um mesmo conjunto parecerem da mesma família sem serem iguais,
e encaixa nos prefixos de escopo do `taste.md`: **a casa dá paleta e
tipografia (`[casa]`); a direção dá o vocabulário do objeto (`[projeto]`).**

A direção nasce de referência real (a página do cliente, o app que o público
usa), **nunca por inércia do projeto anterior** — foi assim que um funil
herdou a cor de outro e perdeu uma rodada. Antes de herdar qualquer regra do
`taste.md`, ler o prefixo de escopo.

## Fase 1 — Blocagem

Leitura estrutural da copy primeiro; depois a tabela: dobra → função narrativa
→ conceito → componente → ato → blocagem → motion → assets (com a marca **IC**
quando a seção passa por imagem-conceito). Uma linha por dobra, conceito
nomeado em cada, **sem repetir dispositivo em seções vizinhas**. Template em
`assets/blocagem-template.md`, critérios em `references/blocagem.md`. Quando a
direção mudar, a blocagem é reescrita no mesmo commit.

## Fase 1.5a — Imagem-conceito por seção

Entre a blocagem e o código, cada seção vira **uma imagem 16:9 de desktop**
que o cliente aprova. Um prompt por seção (`assets/prompt-secao-template.md`):
prefixo comum inalterado + `LAYOUT.` + a cena, com o double-check (a–d)
respondido por **subagentes de contexto limpo** antes de gerar. A imagem é
ferramenta de pensamento e de aprovação — **não é asset**: o que vai ao ar
nasce em HTML/CSS e a copy só entra no código. Veredito do cliente por seção:
`aprovada` / `refazer:` / `usar parte:`. Ele pode empilhar versões de prompt e
testar modelos; **só se avança quando ele estiver satisfeito com a ideia de
cada seção e com a distribuição da copy** — uma ideia por seção no fim, o
histórico inteiro guardado. Guia para quem não programa em `GUIA-IMAGENS.md`.
Tudo em `references/imagem-conceito.md`.

Separa o que custava contexto junto: a imagem decide composição e dispositivo;
o código decide texto, token, semântica e movimento.

## Fase 1.5b — Camadas

Por seção aprovada, uma ficha em **sete camadas**, escrita antes do componente:
fundo da página → fundo da seção → textos (copy literal; mock data listado à
parte) → estilo dos textos → cores → imagens e mockups → animações e
micro-interações. A ficha é o briefing de implementação. A camada 7 é onde
entra o que a imagem não mostra — e onde a página ganha vida. Template em
`assets/camadas-template.md`, regras em `references/camadas.md`.

## Fase 3 — Implementação seção a seção

Duas regras que definem o estilo, ambas em `references/animacao.md`:

- **Interface quando a copy tem objeto reconhecível.** A pergunta não é "o
  produto tem software?", é **"a copy tem um objeto onde a promessa
  acontece?"** — um post, um perfil, uma planilha. Se tem, a interface desse
  objeto serve como prova, com **anatomia real e mock data plausível**; se não
  tem (emoção, decisão), diagrama conceitual. O limite do mockup é a
  **afirmação**, não o número: nada que se leia como prova de resultado, nenhum
  número sai da tela para o texto (`references/copy-contrato.md`). Mockup
  operável é componente acessível, não `aria-hidden`.
- **GSAP faz entrada, CSS faz loop.** Loops nascem pausados e ligam ao entrar
  em cena. Toda seção entrega **pelo menos um mecanismo vivo** ligado ao que a
  copy diz, com estado final definido antes de animar.

Orquestração (`references/orquestracao.md`): **janela de contexto é rainha.**
Átomos compartilhados criados e commitados **antes** de qualquer lote. Lotes de
3–4 seções em paralelo servem para construir do zero; **revisão é uma seção por
subagente, sequencial** — hand-back ≤ 25 linhas, `tsc`, print em 1440 e 390,
commit, próxima. O orquestrador nunca lê um componente inteiro. Prompt em
`assets/prompt-subagente-secao.md`.

Feedback do cliente em áudio: **transcrever antes de decidir**
(`references/revisao-por-audio.md`), traduzir em bloco por seção no briefing,
fazer o grill de perguntas, e **pedido que contraria regra escrita volta como
pergunta** — nunca se executa em silêncio, nunca se recusa.

## Fase 4 — Verificação

Nunca rodar build com o dev server aberto. A cada rodada: typecheck, lint,
testes de contrato, build do artefato, verificador de copy, auditoria de
viewports, **print por dobra sem reiniciar animação**
(`scripts/shoot-dobra.mjs`) e **prova de rolagem em carga fria com motion
ligado** — a suíte roda sob reduced-motion e não vê bug do motor. Detalhes em
`references/revisao-e-gates.md`.

Três contratos executáveis:

- `node scripts/verify-copy-contract.mjs <artefato> <contratos.json>` — frase
  sumiu ou contagem de CTA mudou.
- `node scripts/verify-fidelidade.mjs <url> <contrato.json>` — geometria
  divergiu do combinado (tolerância de `letterSpacing` separada e pequena).
- `node scripts/shoot-dobra.mjs <url> <seletor> [largura]` — print da dobra +
  overflow-x + `pageerror`, sem `fullPage`.

## Fase 5 — Registro e publicação

Três documentos, três perguntas: **checkpoint** (onde estamos),
**sessão** (o que se perde quando a conversa acaba — o aprendizado, não o
feito) e **prompt de retomada** (a ordem de leitura). Templates em `assets/`.
Toda rodada fecha com "para o cliente ver ao vivo" e "ideias anotadas".
Changelog no mesmo commit; decisão difícil de reverter vira registro datado
citando o pedido literal.

Publicação (`references/publicacao.md`): rastreável (repositório, branch,
SHA, comando); gate copiado do alvo anterior, nunca afrouxado; **localhost
mente** sobre `basePath`; a fonte de verdade de uma página publicada é o
artefato no ar, e antes de regerar compara-se com ele.

## Fase 6 — Fechamento e exportação

Toda peça termina num arquivo, e o arquivo tem formato. Esta fase nunca se
pula: o que muda é o entregável.

| formato | o entregável | o que verificar antes de entregar |
|---|---|---|
| página, landing | artefato estático publicado | contrato de copy contra o HTML servido, auditoria de larguras, `basePath` |
| deck | `.pptx` ou PDF | a copy de cada slide, fontes embutidas, o deck aberto na ferramenta de destino |
| carrossel | sequência de PNG na dimensão da plataforma | ordem dos arquivos, dimensão exata, texto dentro da área segura |
| criativo estático | PNG/JPG com orçamento de peso | dimensão, peso, a copy literal na peça |
| UI de produto | código ou handoff | estados cobertos, tokens no lugar de valor cru, o que ficou como slot |

Três regras que valem em qualquer um deles:

- **A regra da copy continua; o verificador muda.** `verify-copy-contract.mjs`
  lê HTML. Para peça exportada, a conferência é contra o texto da peça — e
  precisa existir, mesmo que como checklist.
- **O que sai é rastreável**: de que commit nasceu, com que comando, em que
  versão da direção. Arquivo entregue sem origem volta como pergunta daqui a
  três meses.
- **Nunca editar o artefato exportado à mão** sem registrar. A próxima geração
  apaga a edição em silêncio.

Para publicação web, os detalhes estão em `references/publicacao.md`.

## O dial de tempo

O método não tem versão curta: tem versão com menos versões. Sob prazo, corta-se
**quantidade, nunca fase**.

| escala com o tempo disponível | não comprime, porque custa quase nada |
|---|---|
| imagens-conceito por unidade | o contrato de copy (é script) |
| elaboração da apresentação de direção | a direção **com nome** |
| linhas de direção oferecidas (V1, V2…) | o conceito nomeável por unidade |
| rodadas de revisão | a ficha de camadas |

Cortar a Fase 0.5 para ganhar tempo é economia negativa: foi assim que uma V1
nasceu por inércia, saiu "com cara de IA" e custou exatamente a rodada que
tentava poupar.

## Checklist de execução

1. **Formato e unidade decididos**, com o eixo do tempo e os condicionais nomeados
2. Ficha preenchida, uma frase de propósito (e o objeto da peça, num conjunto)
3. **Modo identificado** — existe referência? tem número? é imagem-conceito? (refazer a cada entrega)
4. Copy congelada, `contratos.json` escrito, buracos encaminhados
5. Tokens escopados, ritmo de superfícies como string
6. **Direção visual escrita**, com nome e prefixo comum colável
7. `references/taste.md` lido antes do primeiro conceito — com os prefixos de escopo
8. Blocagem em tabela, conceito nomeado em cada dobra, sem dispositivo repetido em vizinhas
9. **Double-check das ideias** em subagentes de contexto limpo
10. **Imagens-conceito geradas e aprovadas** pelo cliente
11. **Fichas de 7 camadas** escritas, antes do código
12. Átomos compartilhados commitados; seções implementadas (lotes na construção, uma por vez na revisão), um commit cada
13. Gates verdes, prints por dobra em 1440/390 (e 320/375/768 na auditoria), prova de rolagem em carga fria
14. Rodada registrada: checkpoint, sessão, "para o cliente ver ao vivo", ideias anotadas
15. Publicação rastreável, comparada com o artefato no ar
16. **Fechamento no formato de arquivo do entregável**, com a copy conferida nele

## O que esta skill não faz

- Não escreve copy. A copy chega pronta e é inviolável.
- Não traduz um arquivo de Figma inteiro em tela, pixel a pixel. Reproduzir um
  golden master de uma unidade é o modo executor e está no escopo.
- Não decide oferta, preço ou posicionamento. Regra comercial de um projeto
  (`[projeto]` no `taste.md`) não se transporta: a copy do projeto vence.
- Não gera o asset final por IA. A imagem gerada é ideia; o que vai ao ar é HTML/CSS.

## Limitações conhecidas

- Em web, o método produz páginas **pesadas**: muitas unidades com mockup em
  HTML e SVG inline; WebGL entra só por decisão do cliente e com fallback.
  Medir cedo se o público for majoritariamente móvel.
- Fora da página, o pipeline está mapeado mas os gates não: o verificador de
  copy e a auditoria de larguras pressupõem artefato servido. Em peça
  exportada, a regra vale e o script precisa ser escrito.
- A geração de imagem foi executada como **ideação** (14 seções, 2026-09-21),
  manualmente no navegador do cliente. Geração por CLI depende de crédito e
  workspace; não prometer automação sem confirmar.
- A ficha de camadas tende a virar documentação a posteriori se o mesmo
  agente escreve ficha e código. Se a separação importa, exigir a ficha como
  primeira entrega.
- O gosto em `references/taste.md` é de um cliente específico, com prefixo de
  escopo por regra. Serve de ponto de partida e de exemplo de como capturar
  gosto — não de lei universal.
- O `try/catch` do motor de motion não tem teste automatizado; o teste que
  rola a página com motion ligado continua sendo pendência aberta.
