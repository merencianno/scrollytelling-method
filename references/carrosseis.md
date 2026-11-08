# Carrosséis: o post de vários slides (1:1 e 4:5)

Abrir quando o formato do Passo 0 for **carrossel de social**. O resto do método (direção visual, ideias em ASCII,
níveis, portões) vale igual; a **capa** segue `estaticos.md`, porque é um estático que promete continuação. Aqui está o
que só a sequência pede: capa, ritmo, card de imagem, fundo no meio, moldura, transição, arraste e fecho.

A régua foi medida nas camadas (não em prints) de **63 slides em 7 carrosséis aprovados** de um estúdio, em cinco
clientes (35 slides 1:1, 28 slides 4:5). **Não é regra absoluta**: é ponto de partida. Cor e fonte de cada cliente não
entram; o que transfere é proporção, espaço, hierarquia e ritmo. Sair da faixa pede um motivo escrito na ficha.

## O princípio

1. **A capa é um estático que promete.** A imagem mais forte do carrossel (foto sangrando ou o maior card), o título
   maior e pouquíssimo texto. Termina numa deixa de arraste que é promessa ("…e saiba qual").
2. **O miolo é clean e em card.** Fundo chapado, título à esquerda ou centrado, imagem de apoio num card com raio na
   metade de baixo. A imagem do miolo **explica** (o objeto do item); a da capa **para o scroll**.
3. **Fundo no meio, com motivo.** 2 a 4 slides trocam a chave de fundo na virada do argumento: a comparação, a
   definição, a prova. A troca só funciona porque a base é estável.
4. **A moldura não se mexe.** Logo/handle e a deixa de arraste no mesmo lugar em todos os slides. É o que costura a
   sequência.
5. **O fecho fala com a pessoa.** Centrado, quase sempre escuro, com uma ação de plataforma (comentar, salvar, mandar
   mensagem, palavra-chave no direct), em pílula ou em linha com ícone.
6. **A transição pode ser desenhada.** Um objeto da capa que cruza a borda para o slide 2, ou uma fila de cards cortada
   nas laterais. Sem isso, a continuidade vem da moldura fixa e da deixa que vira pergunta.

## O roteiro

| bloco | slides | o que faz |
|---|---|---|
| capa | 1 | promete; ≤ 21 palavras; a imagem mais forte |
| gancho | 2 | muda a chave de fundo e abre o problema |
| situação / definição | 3 | "imagine…", "o que é?", com rótulo pequeno em caixa alta |
| série | 4 → N−2 | um item por slide, mesmo esqueleto, rótulo numerado ("Erro 01", "1. …") |
| virada / prova | N−2, N−1 | fundo trocado ou foto sangrando; o dado que fecha o raciocínio |
| fecho | N | centrado, escuro, ação de plataforma |

**7–10 slides** (mediana 10). Toda capa escura vira claro no slide 2; o fecho volta ao escuro (6 de 7).

## A régua (mediana e faixa; px em quadro de 1080 de largura)

| medida | capa | interno | fecho |
|---|---|---|---|
| corpo do título | **79 px** (68–106) | **63 px** (36–92); 1:1 72, 4:5 56 | 68 px (64–100) |
| título : sub-headline | **2,2×** (1,9–3,0) | **1,8×** (1,2–2,6) | 2,0× |
| palavras no slide | **9** (6–21) | **28** (10–56) | 18 (8–32) |
| alinhamento do título | centrado (6 de 7) | à esquerda com corpo/lista; centrado sobre foto | centrado (7 de 7) |

| medida | valor |
|---|---|
| título : corpo (miolo) | **1,5×** (0,9–3,0); carrossel editorial ~2,6×, denso ~1,2× |
| tamanhos de texto por slide | **3** (1–7; a UI de um card conta à parte) |
| entrelinha · tracking do título | **1,09×** · **0** (−0,01 a +0,03 em) |
| largura da mancha de texto | **63 % de W** (~680 px) |
| margem lateral do texto de leitura | **~146 px** (82–285; 13,5 % de W) |
| moldura (logo, handle, arraste) | **75–82 px** das bordas; a deixa a **~70 px** da base |
| deixa de arraste | **28 px** (16–32); em todas as capas, em 2/3 do miolo; cor do texto secundário, com › |
| card de imagem | **~73 % de W** (~790 px), **raio 24 px** (20–34), centro a **70 % da altura**; 15 de 32 encostam numa borda (13 na base) |
| foto sangrando | 15 slides: capa, viradas do miolo e fecho; **texto sempre centrado** (15 de 15) |
| trocas de fundo | **2–4 por carrossel** |
| destaque no título | 45 de 63; **um tipo por título** (cor, marca-texto, sublinhado, peso), o mesmo na série |
| numeração | por rótulo ("Erro 01", "Característica 03"), nunca "1/10" no canto |
| acabamento | ruído + papel por cima de 62 de 63 slides |

## Os tipos de slide

```
CAPA COM FOTO            CAPA COM CARD            CARD COM APOIO           FUNDO NO MEIO
┌────────────────┐       ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
│logo            │       │✦               │       │◆               │       │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  FOTO SANGRA   │       │  Título 79 px  │       │⚠ Rótulo 01     │       │▓ ┌──────────┐ ▓│
│  uma luz       │       │  centrado, 2–3 │       │Título à esq.   │       │▓ │ card claro│ ▓│
│░░ degradê ░░░░░│       │  sub curto     │       │corpo 28–42 px  │       │▓ │ (o dado) │ ▓│
│ Título 84 px   │       │╭──────────────╮│       │╭──────────────╮│       │▓ └──────────┘ ▓│
│ centrado       │       ││ card r34     ││       ││ imagem r20–34││       │  ou foto sangra │
│ sub · Arrasta >│       │╰──────────────╯│       │╰──────────────╯│       │  texto centrado │
│                │       │(◉)@   ARRASTA >│       │Arrasta pro … > │       │   ARRASTA >     │
└────────────────┘       └────────────────┘       └────────────────┘       └────────────────┘

LISTA                    GALERIA                  FRASE DESTAQUE           FECHO
┌────────────────┐       ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
│2. RÓTULO       │       │Título          │       │                │       │     ◆ logo     │
│• O que é? …    │       │corpo           │       │ ┊Uma expressão┊│       │  Deixe um 💡   │
│• Quanto? …     │       │╭───╮╭───╮╭───╮ │       │  marcada e o   │       │ nos comentários│
│• Dica …        │       ││   ││   ││   │ │       │  resto 80 px   │       │  sub 36 px     │
│╭──────────────╮│       │╰───╯╰───╯╰───╯ │       │                │       │ ╭────────────╮ │
│╰──────────────╯│       │ (cortada nas   │       │                │       │ │ 💬 Ação    │ │
└────────────────┘       │  bordas = tem  │       └────────────────┘       │ ╰────────────╯ │
                         │  mais ao lado) │                                └────────────────┘
                         └────────────────┘
```

Variantes de identidade que existem no repertório, mas não são padrão: moldura de **app de notas** (barra de app no
topo, marca-texto com cursor), **card de tweet** e **ingresso** (card de bilhete com código de barras para comparar
dois números).

## A transição desenhada

- **Um objeto por transição**, nas primeiras viradas (1→2, 2→3), onde se decide continuar.
- **O objeto é da capa** (o símbolo dela): entra no slide 2 por cima do texto, não no lugar dele.
- **Casa ao pixel**: em frames soltos, o objeto é duplicado nos dois frames deslocado exatamente 1080 px; desenhando em
  panorâmica (N × 1080 num frame só), basta pôr o objeto sobre a costura e ver o ritmo inteiro de uma vez.
- **Cortar na borda também puxa**: um card ou uma fila de cards cortados pela lateral funcionam como seta.
- **Par gêmeo**: dois slides com o mesmo layout e números diferentes leem-se como um gesto só (a comparação).

## A deixa de arraste

| jeito | exemplo | quando |
|---|---|---|
| instrução | "Arrasta pro lado ›" | miolo, sempre igual |
| promessa | "Arrasta pro lado e saiba qual ›" | capa |
| pergunta-gancho | "Quem tomou a melhor decisão? Arrasta pra descobrir ›" | fim de bloco |
| o que vem | "Arrasta pro checklist ›", "Próxima competência ›" | miolo em série |

## Checklist antes de entregar

- [ ] Capa · desenvolvimento · fecho; 7–10 slides; uma ideia por slide.
- [ ] A capa tem a imagem mais forte e ≤ 21 palavras; o conteúdo começa no slide 2.
- [ ] Capa 68–106 px; miolo 56–72 px; o miolo nunca maior que a capa.
- [ ] Título : sub ≈ 1,8–2,6×; no máximo 3 tamanhos por slide; ≤ 56 palavras por slide interno.
- [ ] Mancha ~63 % de W; texto a ~146 px das laterais; moldura fixa a 75–82 px, deixa a ~70 px da base.
- [ ] Card de imagem ~73 % de W, raio 20–34 px, na metade de baixo.
- [ ] 2 a 4 trocas de fundo, cada uma numa virada; foto sangrando com texto centrado.
- [ ] Um destaque por título, do mesmo tipo e cor na série.
- [ ] Fecho centrado com ação de plataforma.
- [ ] Ruído + papel; 4:5 conferido no recorte 1:1; copy literal conferida.

## Princípios que vêm das landings do mesmo estúdio

Coluna estreita no canvas largo; o salto entre título e corpo (2,4–3,1×) dá a hierarquia, não o tamanho absoluto;
rótulo em pílula sobre o título de seção; informação dividida em cards iguais; seções que alternam a chave; um CTA
por bloco, centrado, depois do conteúdo. O que era fraco ali (12–14 tamanhos de texto por página, H2 maior que o H1)
não entra.
