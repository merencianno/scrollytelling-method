# Catálogo: problema narrativo → mecanismo visual

Não é lista de componentes: cada entrada parte de um problema real ("como
mostro isso?") e dá o mecanismo aprovado, construção suficiente para
reimplementar em qualquer stack, e o limite de uso. Todos vêm da página de referência.

Duas convenções valem para todas as entradas e por isso não se repetem:
**loops de ambiente nascem pausados** e só rodam quando o bloco entra na
viewport (classe `-live` ligada uma única vez) — poupa CPU fora da tela e faz
o ciclo começar do primeiro quadro; e **sob movimento reduzido nada fica
escondido** — o estado base do CSS já é a cena completa e legível.

## Mostrar o produto sem screenshot feio

- **Problema.** Screenshot real fica ilegível reduzido, envelhece a cada
  release e obriga a inventar dados; ilustração abstrata não prova que o
  produto existe.
- **Mecanismo.** Uma janela de app: barra de título com ícone do produto, nome
  curto e três pontos à direita; corpo com a "tela" construída em HTML.
- **Construção.** Raio ~18 px, borda de 1 px, sombra baixa e larga; três tons
  (escuro #1B1B1B com borda de vidro, branco no ato claro, vidro para bloco
  flutuante) e opção sem padding para telas que sangram. Conteúdo é UI abstrata
  — barras skeleton, ícones, chips com rótulos oficiais ("Lead captado",
  "Fechado"); a barra de título leva nome de produto, nunca copy.
- **Quando não usar.** Sem produto de software a mostrar, ou com duas janelas
  grandes competindo lado a lado — quatro janelas só convivem quando são
  pequenas e ligadas por um conector.

## Mostrar quatro produtos no espaço de um

- **Problema.** O hero precisa provar "tudo em um só lugar" sem virar galeria
  de prints nem ocupar quatro seções.
- **Mecanismo.** Uma janela só, ferramentas alternando como abas: a barra de
  título troca ícone e nome, o item da barra lateral acende, a tela faz
  cross-fade, e cada tela tem a sua micro-ação concreta em loop.
- **Construção.** Ciclo único em CSS (4 × 8 s = 32 s), keyframes gerados por
  índice — cada ferramenta ocupa 25%, entra em ~1,5% e sai em ~1,5%; dentro
  dela, loop de 8 s com uma ação reconhecível (lead arrastado pelo cursor,
  tarefas marcadas, resposta digitada, roteiro escrito). Estado base = primeira
  ferramenta visível, que serve também sob movimento reduzido; roda desde a
  carga, sem esperar hidratação nem scroll.
- **Quando não usar.** Abaixo da dobra, onde ninguém espera 32 s por um ciclo
  que não viu começar; ou com mais de quatro ou cinco telas, quando deixa de
  ser percebido como um app só.

## Dar peso a uma oferta

- **Problema.** Treze itens em lista lêem como lista; a oferta precisa parecer
  acumulação, não inventário.
- **Mecanismo.** Box empilhado que pousa placa a placa: wordmark no topo, cada
  item (ícone + nome + check) caindo de cima e assentando ao entrar na
  viewport; divisor; "tudo isso por" + preço; parágrafo e CTA dentro do box.
- **Construção.** Entrada por lotes conforme o scroll (batch, intervalo
  ~0,08 s, disparo único) em vez de um gatilho por linha; estado inicial com Y
  negativo (~−22 px) e escala 0,985, para cair; check em pop curto (`back.out`)
  ~0,18 s depois. O fecho é cena à parte: divisor se desenhando, preço pousando
  com peso, CTA por último.
- **Quando não usar.** Com menos de ~6 itens não há acumulação a sentir; e
  evitar quando o CTA principal está a menos de uma tela de distância.

## Ancorar o preço contra um custo maior

- **Problema.** Preço só é barato ao lado de outra conta — e a outra conta some
  da tela justamente quando a oferta aparece.
- **Mecanismo.** Ledger à esquerda (linhas rótulo/valor com barra proporcional
  que preenche conforme o scroll, total grande em vermelho contido) e oferta
  empilhada à direita; a coluna do custo fica fixa enquanto a oferta cresce.
- **Construção.** Barras proporcionais ao maior valor, animadas de `scaleX: 0`
  com origem à esquerda e `scrub` ~0,6; total entrando perto do fim da
  timeline. O fixo é `position: sticky` em CSS (`top` ~96 px) e só a partir de
  1280 px: em 1024 o box perde largura e o CTA quebra em duas linhas.
  **Armadilha:** `overflow: hidden` em qualquer ancestral cria scroll container
  e anula o sticky em silêncio — `overflow: clip` corta igual sem criar um.
- **Quando não usar.** No celular, onde tudo empilha e centraliza (rótulo em
  cima, valor embaixo); e com qualquer número que não exista na copy canônica.

## Qualificar o público

- **Problema.** "O que você recebe" e "para quem é" viram duas colunas de
  checks e o leitor não lê nenhuma das duas.
- **Mecanismo.** Spec sheet de uma folha: um cartão branco só, linhas separadas
  por fios de 1 px, cada linha com tile quadrado de ícone e texto em corpo de
  leitura; abaixo, a qualificação em grade 2×2 de cards curtos com um ícone
  diferente por item.
- **Construção.** Hierarquia por peso e preenchimento, não por carimbo: a linha
  principal sobe de peso e o tile vira cor cheia. Sem checks repetidos (o check
  perde valor quando aparece em toda linha), sem numeração; hover eleva 3 px
  apenas onde existe mouse.
- **Quando não usar.** Com itens de comprimento muito desigual, que abrem
  buracos no cartão, e acima de ~6 linhas, quando a folha vira tabela.

## Garantir

- **Problema.** A garantia precisa de um objeto reconhecível na hora, e o
  vocabulário pronto (rosácea, escudo, fita) lê como diploma ou selo de plugin.
- **Mecanismo.** Medalha circular em metal da cor da marca: anel em gradiente
  cônico com reflexos frios, serrilha de moeda na borda, bisel interno girando
  ao contrário, face escura com filete duplo, número grande no centro e duas
  palavras curtas em tracking largo.
- **Construção.** Tudo em CSS: `conic-gradient` mascarado por
  `radial-gradient(circle closest-side, transparent 71%, #000 71.5%)` vira
  anel; `repeating-conic-gradient` fino faz a escovação e grosso faz a
  serrilha. O metal gira devagar (60 s e 80 s, linear, em sentidos opostos); a
  entrada é escala 0,7 com rotação de −14° em `back.out` curto.
- **Quando não usar.** Metal fora da cor da marca — ouro numa página azul foi
  reprovado; e um selo por página, porque dois carimbos se anulam.

## Apresentar um catálogo de itens

- **Problema.** Dez itens iguais numa grade 5×2 lêem como tabela de preços.
- **Mecanismo.** Bento com uma janela de app por item: nome na barra de título,
  mockup próprio em loop no corpo, descrição literal no rodapé, tamanhos
  desiguais (o item principal ocupa o dobro).
- **Construção.** Grid de 6 colunas com span declarado item a item, nunca
  automático, para a composição ser desenhada e não sorteada; entrada
  individual por peça (gatilho no próprio tile) para o grid não estourar de uma
  vez, e um gatilho só ligando todos os loops. Descrição em 17–18 px: foi o
  corpo pequeno que reprovou a versão anterior.
- **Quando não usar.** Com itens sem UI própria — a janela vazia denuncia — e
  acima de ~12 itens, quando o bento vira scroll infinito.

## Sugerir abundância

- **Problema.** Dizer "são muitas" sem listar todas nem repetir o catálogo.
- **Mecanismo.** Marquee duplo: duas faixas de pills rolando em direções
  opostas, em velocidades diferentes, com as pontas apagadas.
- **Construção.** Cada trilho duplica o conteúdo e anda de 0 a −50% em `linear`
  infinito; a segunda faixa parte de −50% e volta. Durações desiguais (48 s e
  56 s) evitam o efeito de espelho; `mask-image` horizontal (transparente →
  opaco em 12% → opaco em 88% → transparente) dissolve as bordas. É ambiente:
  `aria-hidden` e parado sob movimento reduzido.
- **Quando não usar.** Como substituto do catálogo — é atmosfera, não
  informação — e mais de uma vez na mesma página.

## Superfície de vidro premium

- **Problema.** Um bloco precisa parecer material caro sem ganhar cor própria
  nem roubar a semântica das cores de sinal.
- **Mecanismo.** Liquid Glass: material translúcido neutro, blur forte com
  saturação, fio especular na borda superior e anel de refração em volta.
- **Construção.** `backdrop-filter: blur(28px) saturate(170%)`; fundo em
  gradiente branco de 13% a 5%; `inset 0 1px 0 rgba(255,255,255,0.42)` como fio
  de luz; pseudo-elemento com gradiente a 135° recortado por
  `mask-composite: xor` formando o anel de ~1,5 px; sombra baixa e larga.
  **Precisa de luz atrás para existir**: sobre preto chapado o vidro
  desaparece — pôr orbes desfocados ou uma cena atrás.
- **Quando não usar.** Sobre fundo claro; como fundo de bloco que já carrega
  cor semântica (o gradiente verde do preço foi reprovado por isso); e onde
  houver texto pequeno que precise de contraste garantido.

## Respiro entre dobras

- **Problema.** Argumento longo sem pausa cansa, e imagem usada como textura de
  fundo vira sujeira.
- **Mecanismo.** A cena inteira, em proporção fixa, sobre um palco da cor do
  próprio ato: sem recorte, sem gradiente por cima, sem moldura, sem legenda.
- **Construção.** Contêiner 16:9 com a imagem em `object-contain` e fundo igual
  ao canvas da dobra; `width` e `height` declarados (CLS zero), carga
  preguiçosa fora do hero, entrada única de opacidade mais ~30 px de subida,
  sem parallax. `aria-hidden`, porque o respiro não substitui copy — e cena com
  texto renderizado não pode ficar posicionada de modo a ser lida como
  afirmação da página.
- **Quando não usar.** Mais de uma por dobra; e nunca para preencher seção que
  ainda não tem conceito — respiro entre argumentos é pausa, entre vazios é
  enchimento.

## Encenar um produto que o público já usa (anatomia real)

- **Problema.** O produto da copy não é software, mas a promessa acontece
  dentro de um app que o lead abre todo dia (rede social, agenda, planilha).
  Wireframe genérico não convence; screenshot real não pode (marca, dado).
- **Mecanismo.** Uma família de blocos que reproduz a **anatomia real** do
  app — post, perfil/bio, grade, insights, notificação, barra inferior com
  badges, DM, composer, notas, busca, anel de story — com mock data plausível
  e sem nome, logotipo ou cor de marca do app. Cada bloco existe em dois
  estados: **vazio** (cinza, sem foto, zero interação) e **com vida** (sinal
  de terceiro reagindo).
- **Construção.** Átomos compartilhados criados antes de tudo (barra
  skeleton, traço, avatar circular, tela). Mockup comprimido: topo +
  conteúdo + ações + barra inferior — corta-se o meio, nunca as
  extremidades. Moldura de dispositivo (celular com ilha, laptop) em CSS,
  quando a direção pedir. Controles reais são `<button>` acessíveis; o
  bloco decorativo é `aria-hidden`. Texto interno ≥ 12 px. Cor de estado
  (vermelho/verde) só como leitura — badge, doodle, "concluído" — com token
  próprio e lista fechada de usos.
- **Quando não usar.** Quando a copy não tem objeto reconhecível onde a
  promessa acontece — aí é diagrama conceitual, não interface. E nunca como
  prova: nenhum número do mockup vira argumento da página.

## Mostrar "guardar", "perder" e "entregar" sem escrever

- **Problema.** Verbos abstratos da copy (acervo, desperdício, entrega) sem
  objeto visual.
- **Mecanismo.** Contêiner em loop: uma pasta que **abre, mostra os rótulos,
  fecha e reabre** diz acervo; uma caixa que **engole rótulos** um a um diz
  desperdício; um **papel que amassa** no scroll até virar bola e
  estacionar diz "começar do zero"; uma **stack de notificações-checklist**
  que abre e muda para "concluído" em verde diz entrega.
- **Construção.** Loops em CSS pausados até entrar (padrão B), com pausa
  legível no estado aberto; o papel é scrub com estado final estável
  (WebGL com fallback em HTML/SVG — dependência pesada é decisão do revisor,
  proposta com o fallback junto). Rótulos internos são UI ilustrativa, não
  copy.
- **Quando não usar.** Dois contêineres na mesma seção competem; um por
  seção, e o emoji decorativo que o acompanha fica fora do heading.

## Apontar o que importa: o doodle e a assinatura

- **Problema.** Chamar o olho para **um** número dentro de uma tela cheia, ou
  dar peso a uma palavra que a copy chama de "assinatura".
- **Mecanismo.** Traço à mão em SVG desenhado na entrada
  (`stroke-dashoffset` → 0): a **elipse** que circula um número, o **traço
  manuscrito** sobre uma linha. O cérebro associa linha + rabisco a
  assinatura sem que ninguém escreva a palavra.
- **Construção.** `preserveAspectRatio="none"` + `vector-effect:
  non-scaling-stroke` para o traço sobreviver ao reflow; cor de estado só
  aqui (vermelho no que está errado, verde no que está certo).
- **Quando não usar.** Circular dois números destrói a leitura; circular o
  número que a oferta não promete (seguidores) vira promessa implícita —
  *"o doodle no número de posts também, porque a gente não quer dar a
  entender que a gente vai prometer seguidores"*.
