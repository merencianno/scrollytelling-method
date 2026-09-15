# A copy como contrato

A copy comercial é a fonte de verdade da página: tudo o que a interface faz
serve um texto já aprovado por quem vende. Esta referência define a
fronteira entre o que a implementação pode mexer e o que não pode, e como
transformar essa fronteira em algo que um script consegue reprovar.

## A regra, literal

Escrita assim no brief da segunda passada do projeto de referência
(`docs/projeto-ref/brief-v2-reimaginacao.md`):

> **A copy não muda uma vírgula.** Fonte: `copies/<ARQUIVO-DA-COPY>.md`.
> Pode mudar: distribuição, hierarquia (h2/h3/p/strong),
> agrupamento, quebras controladas, ênfase por cor/peso dentro da frase,
> ordem visual dos blocos dentro da dobra desde que a leitura linear
> continue a mesma. Não pode: reescrever, resumir, trocar
> acento/pontuação/caixa, inventar rótulos, números, métricas, depoimentos,
> microcopy. Mini-UIs são abstratas (skeleton bars, ícones, chips com
> rótulos oficiais dos assets: "Lead captado", "Call agendada", "Call
> realizada", "Fechado"). Numerais "01–14" são marcação editorial permitida.

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
- **CTA repetido literal**, seis vezes, sempre `QUERO CONHECER O o projeto de referência`.
  Essa repetição é intencional e define quantos botões a página tem.
- **Números escritos de duas formas** no mesmo documento ("o valor anual ao
  ano" e "o valor anual"). Ambas são copy; a página renderiza cada uma
  onde ela aparece, sem uniformizar.

## Conteúdo ausente

O que a copy não menciona não entra por inferência: vira **slot técnico**,
um valor de configuração explicitamente marcado como pendente, que falha
no gate de publicação até alguém de fora decidir. Na o projeto de referência o número
comercial ficou como `TODO-PENDENTE` em `src/config/projeto-ref.ts`, e o verificador
trata isso como aviso no preview local e como falha no alvo de catálogo —
a página existe, roda e é revisável, mas não sobe com o placeholder. Links
legais sem URL renderizam como texto, não como âncora morta. O oposto —
inventar um telefone plausível, um título para uma seção sem título, um
depoimento — passa despercebido na revisão visual e só aparece quando o
cliente lê.

## Mini-UIs são abstratas

Uma landing de scrollytelling vive de tangibilizar o que a copy afirma:
janelas de produto, kanbans, ledgers, checklists animados. Toda essa
camada é ilustração, e ilustração não inventa texto. Skeleton bars,
ícones, formas e rótulos oficiais dos assets, sim; números, métricas,
percentuais e microcopy inventada, não. Número só aparece numa mini-UI se
já existir na copy — o "48K" do card do hero do projeto de referência veio do asset de
marca dos totens, e as cenas do deck que trazem texto renderizado entram
como `aria-hidden`, decorativas, nunca posicionadas de modo a ler como
afirmação da página.

## Da regra ao contrato executável

Regra escrita em brief não impede regressão: uma refatoração de seção
apaga uma frase e ninguém percebe até o print. O que impede é um script
que reprova o artefato — no projeto de referência o `scripts/verify-projeto-ref-preview.mjs`,
generalizado nesta skill em `scripts/verify-copy-contract.mjs`. Dois
mecanismos simples, ambos aplicados ao HTML pré-renderizado:

1. **Uma frase literal e contígua por dobra.** Uma lista de pares
   `[rótulo, trecho]` — `["3ª dobra", "Marketing, vendas e operação
   conectados do início ao fim."]`, `["13ª dobra", "devolvemos todo o seu
   dinheiro."]`, `["rodapé", "© 2026 O Novo Mercado"]` — e um
   `index.includes(contract)` para cada. Quinze contratos cobrem as 14
   dobras e o rodapé. Não é verificação de copy inteira: é uma âncora por
   dobra, escolhida no trecho mais característico, o suficiente para que
   nenhuma dobra suma ou seja reescrita em silêncio.
2. **A contagem exata de CTAs.** O rótulo `QUERO CONHECER O o projeto de referência`
   precisa aparecer pelo menos 6 vezes e o atributo `data-brand-cta`
   exatamente 6 — o rótulo com piso porque pode ser citado noutro lugar, o
   atributo com igualdade porque é o botão de verdade. Quando a rodada 5
   moveu o CTA do rodapé para dentro do box de oferta, o total continuou 6
   e o gate seguiu verde sem ajuste.

Quando o cliente muda a copy — e ele muda —, o contrato muda junto, no
mesmo commit. Na rodada 5 do projeto de referência a ênfase de preço passou de "o valor anual" para "12x R$ X /mês" e o contrato da 7ª dobra virou `"R$ X"`.
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
