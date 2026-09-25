# A copy como contrato

A copy comercial é a fonte de verdade da página: tudo o que a interface faz
serve um texto já aprovado por quem vende. Esta referência define a
fronteira entre o que a implementação pode mexer e o que não pode, e como
transformar essa fronteira em algo que um script consegue reprovar.

## A regra, literal

Na forma genérica, para colar no brief de cada peça:

> **A copy não muda uma vírgula.** Fonte: `copy/copy.md`. Pode mudar:
> distribuição, hierarquia (h2/h3/p/strong), agrupamento, quebras
> controladas, ênfase por cor/peso dentro da frase, ordem visual dos blocos
> dentro da dobra desde que a leitura linear — **a ordem no DOM** — continue
> a mesma. Não pode: reescrever, resumir, trocar acento/pontuação/caixa,
> inventar rótulos, números, métricas, depoimentos, microcopy. Chips e
> rótulos de mini-UI usam os **rótulos oficiais dos assets do cliente**.
> Numerais de seção ("01–14") são marcação editorial permitida.

A regra nasceu no brief da segunda passada do projeto de referência (a versão
original ainda dizia "mini-UIs são abstratas" — revogado abaixo, em
"Mini-UIs").

Vale a pena copiar essa regra para o brief de cada projeto novo, com a
fonte trocada. Ela resolve sozinha a maior parte das discussões de rodada.

## Como a copy costuma chegar

Quase sempre como export de Google Docs para Markdown. O arquivo do projeto de referência
tem 229 linhas e concentra os defeitos típicos do formato:

- **Hierarquia inconsistente.** O mesmo papel semântico aparece em níveis
  diferentes: a headline da dobra 1 é `#`, a da dobra 2 é `##`, a da 5 é
  `###`; os quatro bullets da dobra 2 são `###` com marcador de lista. Os
  níveis do Docs refletem o tamanho da fonte que o copywriter usou, não a
  estrutura. Reatribuir hierarquia é justamente o que a regra permite —
  um `h2` por dobra, `h3` para subtítulo, `p`/`li` para corpo, `strong`
  para os fechos que vinham em negrito.
- **Dobras marcadas com colchete escapado**: `## **\[1ª DOBRA\]**`. É o
  índice de corte da página, não conteúdo renderizável.
- **Tabelas em sintaxe de Docs** (dobra 5 e rodapé), com `| :---- |` e
  células que carregam três frases coladas. O conteúdo é copy; o formato
  de tabela é acidente do export e pode virar dois cards.
- **CTA repetido literal**, seis vezes, sempre `QUERO CONHECER O PRODUTO`.
  Essa repetição é intencional e define quantos botões a página tem.
- **Números escritos de duas formas** no mesmo documento ("o valor anual ao
  ano" e "o valor anual"). Ambas são copy; a página renderiza cada uma
  onde ela aparece, sem uniformizar.

## Conteúdo ausente

Conteúdo que falta tem **dois tratamentos, não um**: o **slot técnico**
(marcado, contado pelo gate, avisa ou bloqueia a publicação) para o que é
obrigatório — a foto do autor, o número de contato —, e o **fallback
silencioso** (tenta o arquivo, cai para um tile de cor com frase curta) para
o resto — as fotos ilustrativas dos mockups. Um slot marcado por página; o
resto cai. **Falta de foto nunca bloqueia a seção.** O tile de cor é
fallback de carregamento, não mídia de mockup: onde o dono indicou material
real, ele entra (ver "Mini-UIs").

**Asset que falta vira placeholder visível e rotulado, mais um pedido ao
dono** na lista única de decisões pendentes — nunca um asset inventado que
passe por real.

O que a copy não menciona não entra por inferência: vira **slot técnico**,
um valor de configuração explicitamente marcado como pendente, que falha
no gate de publicação até alguém de fora decidir. No projeto de referência o número
comercial ficou como `TODO-PENDENTE` num arquivo de configuração, e o verificador
trata isso como aviso no preview local e como falha no alvo de catálogo —
a página existe, roda e é revisável, mas não sobe com o placeholder. Links
legais sem URL renderizam como texto, não como âncora morta. O oposto —
inventar um telefone plausível, um título para uma seção sem título, um
depoimento — passa despercebido na revisão visual e só aparece quando o
cliente lê.

## Mini-UIs: o limite é a afirmação, não o número

Uma landing de scrollytelling vive de tangibilizar o que a copy afirma:
janelas de produto, kanbans, ledgers, telas de app. Essa camada é
ilustração — e a regra antiga desta seção dizia que ilustração não escreve
nada: skeleton bars no lugar de texto, traço no lugar de número. **A regra
estava errada de categoria.** Aplicada à risca produziu mockups que o
cliente recusou como preguiçosos e, num segundo projeto, foi revogada por
pedido explícito: mock data com fotos, números e notificações, em telas reais
e interagíveis.

O que ela protegia continua valendo, com a fronteira no lugar certo:

- **Real por link, genérico sem link, nunca adivinhado.** Quando o dono
  indica perfis, páginas ou acervos (link ou arquivo), a mídia do mockup é o
  conteúdo real deles, com curadoria registrada em `marca/README.md` ou
  `pecas/<peça>/referencias/README.md` (o que foi excluído e por quê: post político,
  criança, o que contradiz a copy). Sem indicação, usuário genérico
  (`seuusuario`) e avatar neutro. Terceiros nunca. O lado negativo também é
  real, ou gerado como amador de verdade — nunca tile de cor com frase:
  tile foi reprovado como "feio, quero coisas reais" e perfil adivinhado
  custou rodada.
- **Mock data plausível dentro do mockup, sim.** Números específicos e
  imperfeitos ("2,4 mil curtidas", "36 novos seguidores"), o usuário da
  regra acima ou o oficial da marca, legendas curtas, o texto real que o
  app mostra ("curtiu sua publicação"), datas, horários. Skeleton só onde o
  app real mostraria placeholder. A curva do dado tem de **dizer o que a
  copy diz** — barras crescentes contradizem "meses sem resultado".
- **Mock data usa a taxonomia real do produto** quando ela existe:
  categorias, fileiras e títulos conferidos contra a imagem do produto, não
  inventados (fileiras com títulos inventados voltaram com "pode
  fazer algo melhor").
- **Nenhuma frase para o lead fora da copy, nem em estado de interação** —
  feedback de clique, toast, vazio, sucesso. String nativa do app pode
  ("Seguir", "curtiu"). Não perguntar: omitir (frase inventada
  fora da copy foi recusada com dureza).
- **Nada que se leia como prova de resultado, nunca.** Sem depoimento, sem
  "fulano faturou X", sem nome real, sem valor em moeda, sem rosto. Mensagem
  longa entra truncada com reticências para não virar depoimento.
- **Número é UI dentro da tela, nunca argumento da página.** Nenhum número
  do mockup migra para o texto; na ficha de camadas, copy e mock data ficam
  em linhas separadas, o mock data rotulado "não é copy, não é prova".
- **O destaque visual não cai sobre o que a oferta não promete.** Um
  contador subindo é promessa implícita: se for preciso mostrar crescimento,
  cresce o que o produto entrega (posts publicados, ideias), não o que ele
  não garante (seguidores). O traço de destaque foi para o número de posts
  justamente para não sugerir promessa de seguidores.
- **Dado que o cliente ainda vai mandar** entra fictício e **rotulado** no
  código (`// TODO(cliente): dados reais` + um atributo que o gate reporta
  como aviso, `data-…-copy-suspeita`), nunca apresentado como definitivo.
- **Mockup operável deixa de ser decorativo.** Enquanto é ilustração, é
  `aria-hidden`; quando ganha botão de curtir, seguir, trocar aba ou
  digitar, vira componente acessível: `<button>`, `aria-label`,
  `aria-pressed`, teclado, foco visível, alvo ≥ 44 px.

Emoji decorativo (que não é da copy) vive **fora** do elemento que carrega a
frase-contrato, `aria-hidden` — dentro, ele parte a string contígua.

## Da regra ao contrato executável

Regra escrita em brief não impede regressão: uma refatoração de seção
apaga uma frase e ninguém percebe até o print. O que impede é um script
que reprova o artefato — no projeto de referência era um verificador de
preview escrito sob medida, generalizado nesta skill em
`scripts/verify-copy-contract.mjs`. Dois
mecanismos simples, ambos aplicados ao HTML pré-renderizado:

1. **Uma frase literal e contígua por dobra.** Uma lista de pares
   `[rótulo, trecho]` — `["3ª dobra", "Marketing, vendas e operação
   conectados do início ao fim."]`, `["13ª dobra", "devolvemos todo o seu
   dinheiro."]`, `["rodapé", "© 2026 <Marca>"]` — e um
   `index.includes(contract)` para cada. Quinze contratos cobrem as 14
   dobras e o rodapé. Não é verificação de copy inteira: é uma âncora por
   dobra, escolhida no trecho mais característico, o suficiente para que
   nenhuma dobra suma ou seja reescrita em silêncio.
2. **A contagem exata de CTAs.** O rótulo `QUERO CONHECER O PRODUTO`
   precisa aparecer pelo menos 6 vezes e o atributo `data-projeto-cta`
   exatamente 6 — o rótulo com piso porque pode ser citado noutro lugar, o
   atributo com igualdade porque é o botão de verdade. Quando a rodada 5
   moveu o CTA do rodapé para dentro do box de oferta, o total continuou 6
   e o gate seguiu verde sem ajuste.

Quando o cliente muda a copy — e ele muda —, o contrato muda junto, no
mesmo commit. Na rodada 5 do projeto de referência a ênfase de preço passou do valor anual
para o valor parcelado, e o contrato da 7ª dobra mudou junto.
Contrato que não acompanha a copy vira ruído e acaba sendo desligado.

## A armadilha do `<span>`

O contrato é uma string **contígua** no HTML. Colorir uma palavra no meio
da frase — para marcar "falha" em vermelho, "recupera" em verde — insere
`</span>` no meio do trecho e o `includes` falha, mesmo com a copy
intacta. Registrado assim nas armadilhas do projeto de referência:

> Contratos do verificador são strings contíguas no HTML: ao colorir uma
> palavra com `<span>`, escolha outro trecho da frase como contrato.

Ou seja: a ênfase por cor continua permitida, o contrato é que se muda de
lugar. Escolher de saída um trecho que ninguém vai querer colorir — o
começo da frase, um nome próprio, um valor — evita a ida e volta.

Vale lembrar o limite do mecanismo: ele garante presença, não fidelidade
palavra a palavra. Onde o risco de reescrita for alto, um teste de copy
literal por AST do Markdown (via `remark`) cobre a fidelidade, e as
âncoras por dobra continuam cobrindo a estrutura.

## O arquivo de contratos

O contrato vive num `contratos.json` versionado ao lado da blocagem (modelo
em `assets/contratos-exemplo.json`), com um comentário de cabeçalho dizendo
a fonte, o comando de execução e a data do estado. Rótulo = `NN <seção>`.
Escolha a frase **sem ênfase no meio** — e quando o contrato impedir o
acento numa headline, isso é informação de design: registre na ficha de
camadas da seção, para o subagente não descobrir sozinho.

Quando o cliente pede para tirar algo que **está** na copy (um glifo, uma
palavra), o pedido não se executa em silêncio nem se recusa: volta como
pergunta, com o risco medido nos contratos e testes, e a exceção fica
escrita com escopo — ver `revisao-por-audio.md`. Precedente: o 🔷 saiu de
duas seções por ser bullet decorativo; os ❌/✅ ficam porque codificam
polaridade.

## Buracos da copy: encaminhar, nunca corrigir

Ao blocar, liste os buracos numa tabela **buraco → encaminhamento**: dobra
sem headline, bônus sem autor, garantia sem canal de contato. Cada um recebe
um destino — nada inventado / slot técnico / literal mesmo quebrado /
pendência do cliente. Erro de export (negrito partido, tabela quebrada,
aspas tipográficas, hífen escapado) é **leitura estrutural**, não licença
para editar: o verificador compara o caractere exato. O double-check em
contexto limpo (ver `imagem-conceito.md`) costuma achar buracos que a sessão
longa não viu — peça a lista. O double-check da leva de ideias em texto
(Fase 1.2, `ideias-ascii.md`) também devolve buracos, mais cedo e mais
barato.
