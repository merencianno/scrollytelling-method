# Direção visual: escrever ou extrair, sempre antes da blocagem produzir imagem

A direção visual é **obrigatória e escrita**, exista Figma ou não. Ela vem
antes de qualquer prompt de imagem-conceito e de qualquer `.tsx` — é a Fase
0.5 do método, e foi o buraco número um da skill até 2026-09-21 (a Fase 2
antiga era condicional e retroativa: "se houver Figma"). Dois ramos:

- **já existe direção** (Figma, style guide, páginas no ar) → **extrair**
  (§1–§4 abaixo);
- **não existe** → **escrever** (§0), com referências reais.

## 0. Escrever a direção quando ela não existe

Template em `assets/direcao-visual-template.md`. O documento precisa de:

1. **Um nome** em uma frase — "o feed da rede social", "o traço e a régua". Direção
   sem nome não se cobra em revisão.
2. **A leitura da copy que a sustenta**: o que a copy fala o tempo todo, e a
   tabela **elemento visual → o que ele diz na copy → em que seções entra**.
   Elemento que não preenche a coluna do meio não entra. É o que impede a
   direção de virar coleção de enfeites.
3. **A tradução para a marca**: paleta com hex exatos, tipografia, forma,
   ícones, base de componentes existente, movimento.
4. **O que não entra**, com o motivo de cada item.
5. **O prefixo comum dos prompts**, colável, em inglês (ver
   `imagem-conceito.md`).
6. **Referências de código já existentes na casa** que o projeto deve ler
   antes de criar bloco novo.

Regras que a primeira execução ensinou:

- **Direção nasce de referência real, não de neutralidade.** A V1 de um
  funil saiu "com cara de IA" porque pedia "vocabulário de rede social
  genérico"; a V2, aprovada, pedia a anatomia real do app que o público usa.
  Específico vence neutro.
- **Nunca por inércia do projeto anterior.** A mesma V1 trouxe a cor auxiliar de
  outro expert porque ele estava na folha de estilo da marca mãe como se
  fosse estrutura. Antes de herdar uma cor, um efeito ou uma regra, ler o
  prefixo de escopo no `taste.md`: `[projeto]` não se transporta.
- **Sem Figma, extraia dos artefatos que existem**: `curl` na página de
  referência do cliente para pegar os hex reais; ler o CSS publicado. Não
  invente cor.
- **Quando o público conhece o produto que a página encena** (um app, uma
  ferramenta), escreva **a anatomia dele** na direção — o que existe em cada
  tela e em que proporção. Sem essa lista o resultado sai em nível de
  wireframe.
- **Numere as versões** (V1, V2…) e guarde a anterior ao lado, com a fala
  literal que a substituiu. Quando a direção mudar, a blocagem é reescrita no
  mesmo commit.
- A diferenciação entre projetos irmãos da mesma casa é **por expert**: a
  casa dá a base (paleta, tipografia), e o vocabulário do nicho do expert é o
  que identifica a página. Cor auxiliar de um expert é dele.

## 1. Já existe Figma: antes de extrair, classificar o papel dele

A decisão que mais economiza tempo é descobrir, logo no primeiro olhar, **o que o
arquivo do Figma é**:

- **Página desenhada (layout).** Existem frames que correspondem a seções reais,
  com hierarquia, larguras e espaçamentos pensados para virar tela. Aí o dump
  completo de nós vale cada linha: posições, autolayout, tamanhos de fonte,
  constraints. Esse caso tem skill dedicada — `figma-translate` traduz o dump em
  código pixel-perfect, e `figma-dump` cuida da extração.
- **Direção visual (paleta, marca, ícones, sem página).** O arquivo é um deck ou
  um style guide: slides conceituais, uma prancha de paleta, o símbolo em
  variações, a família de ícones. Nada ali é layout de página — é vocabulário.

No caso da `/ref`, o arquivo era o segundo tipo, e o dump de propriedades
(`docs/projeto-ref/figma-dump/nodes-key-summary.txt`) ficou com 334 linhas de
tipografia por nó, fills ordenados por frequência, raios com sete casas decimais
e efeitos `GLASS`. Dessas 334 linhas, praticamente nada virou código: a página
não tem nenhum frame do Figma como referência de layout. O que sustenta a página
inteira são **26 assets exportados** (6 SVGs de marca, 10 pílulas, 10 ícones em
WebP) e **a paleta com os valores exatos**.

Quando o Figma for direção visual, extrair só três coisas:

1. **A paleta, com os hexadecimais exatos** e os gradientes com seus stops. O
   gradiente da marca da `/ref` aparece repetido em quase todos os frames —
   `<MARCA-PROFUNDA> 0% → <MARCA-MEDIA> 47% → #FFFFFF 100%` — e essa repetição é justamente o
   sinal de que ele é canônico. Fills que aparecem uma vez só são acidente de
   slide, não sistema.
2. **Os assets exportáveis**, em vetor quando houver (logos, wordmark, símbolo,
   sparkle) e em imagem quando for peça rasterizada (ícones de vidro, pílulas de
   produto, cenas conceituais). Exportar em dois tamanhos e converter para WebP.
3. **Os frames renderizados em PNG**, todos, como moodboard de consulta. Custam
   pouco e respondem "o gosto é esse?" mais rápido que qualquer tabela de
   propriedades. Na `/ref` foram 31 slides do deck e 19 pranchas do style guide.

O dump de nós, nesse cenário, serve como confirmação e não como fonte: dezenas de
efeitos `GLASS` confirmam que vidro é vocabulário central; cinco `DROP_SHADOW`
empilhados no mesmo frame confirmam que profundidade ali é feita em camadas. Ler
para calibrar, não para transcrever.

## 2. Quando o caminho padrão de acesso falha

O servidor MCP de Dev Mode do Figma recusa a conexão sem o seat pago de Dev Mode
— e a recusa não é óbvia, parece erro de configuração. O caminho que funciona é a
**REST API com Personal Access Token**, enviado no cabeçalho `X-Figma-Token`,
chamando `/v1/files/<key>/nodes` para propriedades e `/v1/images/<key>` para
renderizar frames em PNG ou exportar em SVG.

Tratar o token como efêmero: gerar para a extração, usar, e **revogar depois**.
Nunca deixá-lo em arquivo versionado nem em documentação do projeto.

## 3. O sistema de tokens

O esqueleto está em `assets/tokens-template.css`, pronto para copiar. As decisões
por trás dele:

**Uma cor de marca única, com derivados nomeados por função.** Não uma escala
100–900. A `/ref` tem um azul-profundo, um azul-núcleo, um azul-brilhante e
variações claras (mid, glow, ice, pale) — cada um existe porque tem trabalho
próprio: o profundo é fundo de gradiente, o núcleo é glow, o brilhante é CTA, os
claros são texto em gradiente e borda de vidro. Nomear pelo papel evita o hábito
de escolher "o 600" por hábito.

**Superfícies claras e escuras como pares.** Canvas escuro, canvas mais profundo
(para o fecho), canvas claro e duas superfícies elevadas de cada lado. A página
alterna dobras escuras e claras num ritmo deliberado — essa alternância é o
respiro de uma página longa, e precisa de token, não de improviso por seção.

**Semânticos escassos, com teto de uso explícito.** Verde-água para preço,
economia e positivos; vermelho contido para custo, perda e negativos. Cada um com
cinco derivados (base, forte, suave, glow, tinta). O teto é a regra que preserva
a identidade: **azul é a marca, verde e vermelho são acentos raros — menos de 10%
da tela**. Sem esse teto, uma página de vendas vira semáforo.

**Hierarquia de raios, não escala.** Quatro degraus com papéis fixos — cartão
grande, cartão, ladrilho, controle — mais a pílula. Manter os degraus do template
mesmo trocando a marca: é a hierarquia, e não o valor absoluto, que faz duas
páginas parecerem do mesmo sistema.

**Sombras em camadas.** Cartão claro leva duas camadas (uma difusa larga, uma
curta e fechada); cartão escuro leva uma camada longa e muito espalhada, com
offset negativo; o glow de ícone é sombra colorida com spread grande. O dump do
Figma mostrava cinco `DROP_SHADOW` no mesmo frame de app icon — a lição não é
copiar as cinco, é entender que profundidade vem de camadas com raios diferentes.

**Easings nomeados, três.** Padrão, suave e assentamento. Todos são curvas de
saída (out) — a entrada rápida e a chegada lenta são o que faz movimento parecer
caro. Nada de `ease-in-out` genérico, nada de overshoot forte.

### Por que não existem tokens de espaçamento

Espaçamento fica nos utilitários do framework (Tailwind, no caso). Criar
`--x-space-4` e amigos duplica uma escala que o framework já tem, obriga a
traduzir mentalmente entre dois vocabulários e, pior, some com a responsividade:
o valor do token é fixo, enquanto `px-6 md:px-10` é uma decisão por breakpoint.
Tokens existem para o que é **da marca** — cor, tipo, raio, sombra, curva. Ritmo
vertical e horizontal é **layout**, e layout se resolve onde o layout é escrito.

### Tipografia

Duas famílias por rota: uma de display (títulos, rótulos, chips) e uma de corpo
(parágrafos e números). Carregar localmente e escopar na rota, para não pesar
outras páginas do mesmo projeto. Números ganham classe própria com
`font-variant-numeric: tabular-nums` e tracking negativo — números de página de
vendas são grandes e animam, e sem tabular eles tremem ao contar.

A escala não vira token: usar `clamp()` direto na classe da seção.
`clamp(2rem, 6vw, 4.5rem)` numa headline resolve 320 a 1440 px numa linha, onde
um `--x-size-h1` fixo exigiria três media queries. O token trava o valor; o
`clamp()` descreve a intenção.

Duas regras globais de quebra fecham o assunto das palavras órfãs: `balance` em
`h1`–`h3` e `pretty` em `p` e `li`. **Advertência de especificidade:** a regra de
parágrafo tem especificidade 0,1,1 e vence a utilitária de um framework (0,1,0) —
ou seja, aplicar uma classe `text-wrap: balance` num `<p>` falha em silêncio.
Para forçar `balance` num parágrafo, criar uma regra com seletor de id da seção
(1,1,0), de preferência dentro de uma media query de desktop, porque o layout de
celular normalmente já foi aprovado com `pretty`.

## 4. Escopo por classe

Todo o sistema vive dentro de um seletor de escopo — `.brand-scope` na `/ref` — e
nada fica em `:root`. Cada regra utilitária também é escrita escopada
(`.brand-scope .brand-glass`, e não `.brand-glass`). A razão é concreta: o mesmo
projeto hospeda outras páginas com outra identidade, e um token global vaza para
todas elas. O escopo também torna a identidade descartável — remover a classe do
wrapper devolve a página ao design system neutro, sem caçar overrides.
