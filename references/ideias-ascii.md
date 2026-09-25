# Ideias em texto com esboço ASCII (Passo 2)

> O esboço decide o **conceito**; a imagem decide só composição e acabamento.
> Imagem recusada custa crédito e não diz por que falhou; texto recusado custa
> um minuto e diz.

Entre a blocagem (Passo 1) e o prompt de imagem (Passo 3), cada unidade da
peça (seção, slide, card, tela) ganha **3 a 5 ideias em texto**, cada uma
com um esboço em ASCII, e uma recomendação. O dono escolhe uma ou duas, e só
essas viram imagem.

A etapa nasceu de uma rodada real: numa mesma seção, quatro imagens foram
recusadas seguidas, sempre pelo mesmo motivo (bonito, mas sem
tangibilizar a mensagem), e gastaram milhares de créditos. Depois de
oito ideias em texto, três imagens bastaram. Quem aprovava pediu o formato
de volta já na primeira leva ("gostei desse formato de me trazer ideias,
traga mais cinco assim").

## Onde entra

```text
Passo 1   Blocagem
Passo 2   ► IDEIAS EM TEXTO: 3–5 por unidade + recomendação
            ↳ PORTÃO 1 — o dono escolhe 1–2 por unidade (ideias.md / veredito.md)
Passo 3   Prompt SÓ das escolhidas; o ASCII entra no LAYOUT. do prompt
Passo 4   Imagem → veredito
            ↳ máx. 2 gerações por ideia; recusada 2× → volta ao Passo 2, não a outra imagem
            ↳ PORTÃO 2 — o dono aprova a imagem
Passos 5–7 Wireframe, layout, refinamento e revisão (+ check final da copy)
Passo 8   Peça final
            ↳ PORTÃO 3 — o dono declara pronto
```

## Os três portões do dono

O dono decide três coisas por unidade: **qual ideia**, **qual imagem** e **se
está pronta**. Todo o resto (prompt, geração dentro dos limites, camadas,
código, refino, conferência da copy) é trabalho da máquina, conduzido com
autonomia entre um portão e o próximo.

"Pronto" é da peça, não de cada unidade: uma peça pode ser declarada pronta
com uma seção ainda aberta, e a ressalva fica registrada na gestão do
projeto.

## O formato, por ideia

Nesta ordem, sempre:

1. **Nome curto** — 2 a 5 palavras. Repete-se no prompt, no nome do arquivo e
   no commit; é por ele que o dono se refere à ideia.
2. **Leitura da copy** — qual frase da copy o objeto torna óbvia e por que
   alguém entende sem legenda, em 1–2 frases. É o teste "tangibiliza?":
   "bonito" não aprova, e um "ok" morno é recusa.
3. **Mecanismo vivo** — uma linha: o que se move e quando (rolagem, entrada,
   clique). Em formato sem eixo de tempo (deck exportado, carrossel,
   criativo), "estático" ou a transição entre unidades.
4. **Esboço ASCII** — na dimensão da proporção da unidade (tabela abaixo);
   só o objeto e onde a copy mora nele. A frase real da copy (ou `<frase N>`)
   vai onde a imagem poria texto falso. Sem estilo, sem cor, sem sombra. Só
   ASCII e box-drawing (`┌ ─ │ ├ └`, setas `↓ →`); **sem emoji**, que ocupa
   duas colunas e quebra o alinhamento.
5. **Blocos de origem** — quando existe biblioteca: "bloco A" é a peça-mãe do
   mesmo cliente (a página ou peça de referência), "bloco B" é a biblioteca da
   marca (Figma, site, design system). A invenção fica no **arranjo**; o
   vocabulário (espaçamento, escala, fonte, cor, box de oferta) é
   reaproveitado — montar um quebra-cabeça combinando blocos.
6. **Restrições atendidas** (opcional) — como a ideia respeita as restrições
   que o dono nomeou naquela rodada ("sem celular", "com o produto na tela").

No fim da leva: **uma recomendação**, com o porquê em duas ou três linhas.
Recomendar não é escolher; o portão continua sendo do dono.

### Dimensão do esboço por proporção

A caixa do esboço imita a proporção da imagem-conceito (caractere de
terminal é cerca de duas vezes mais alto que largo):

| Proporção da unidade | Esboço (colunas × linhas) |
|---|---|
| 16:9 (seção de página, slide) | ~36 × 10–12 |
| 1:1 (post, card quadrado) | ~28 × 14 |
| 4:5 (post vertical, carrossel) | ~28 × 18 |
| 9:16 (story, tela de celular) | ~22 × 20 |

## Exemplo completo

*Exemplo, não é copy de ninguém.* Produto fictício: um app de reserva de
quadra esportiva. Copy inventada para o exemplo, unidade 03 (16:9):

> **Você chega na quadra e ela já está ocupada.**
> Horário marcado por mensagem, reserva que ninguém anotou, time esperando no portão.

**A grade que se preenche sozinha.**

- **Leitura da copy:** "já está ocupada" vira a grade de horários da noite
  cujos vãos livres vão sendo tomados e cujo contador de vagas fica em "?";
  quem olha entende o conflito antes de ler a frase.
- **Mecanismo vivo:** com a rolagem, os horários livres se ocupam um a um e o
  contador pisca "?" em vez de baixar.
- **Esboço:**

```text
┌ Quadra 2 · hoje à noite ───────────┐
│  18h [ocup.] 19h [ocup.] 20h [   ] │
│  21h [     ] 22h [ocup.] 23h [   ] │
├────────────────────────────────────┤
│  vagas: ?          reservas: ?     │
├────────────────────────────────────┤
│ Horário marcado por mensagem,      │
│ reserva que ninguém anotou,        │
│ time esperando no portão.          │
└────────────────────────────────────┘
  ↓ rolagem: um horário se ocupa por vez
```

- **Blocos de origem:** bloco A, o cabeçalho de janela da peça-mãe; bloco B,
  os chips de contador do design system da marca.
- **Restrições atendidas:** sem celular (o dono pediu variar de aparelho);
  objeto único, sem "antes × depois".

**Recomendação:** esta, porque a frase-título vira o estado do objeto (o "?")
e o movimento é o próprio conflito; as outras duas da leva dependiam de
legenda.

## O cabeçalho da leva (`ideias.md`)

Um arquivo por unidade, em `pecas/<peça>/secoes/NN-slug/ideias.md` (modelo
em `assets/sdd-kit/pecas/_modelo/secoes/NN-slug/ideias.md`), com uma seção
datada por leva (`## Leva 1 — AAAA-MM-DD`, `## Leva 2 — …`); nada de
`ideias-vN.md` solto na raiz da peça. Antes das ideias:

- a **copy literal da unidade** em blockquote;
- o **pedido do dono**, citado, se houver;
- a **tabela de dispositivos já usados na peça inteira** (seção → dispositivo
  → versão vista pelo dono), para a leva não repetir o que já existe.

No fim, `### Recomendação` e `### Escolha do dono` (data e citação literal).

## Regras de conceito

- **Objeto único que se transforma; sem comparativo lado a lado como
  padrão.** No máximo um par por peça, e só onde a copy é literalmente um par
  (tabela ❌/✅, "duas escolhas"). Motivo: comparativo vira tique e foi vetado
  ("pare de ficar repetindo comparativos"); o único par aceito numa peça
  aprovada foi o de posts reais onde a copy era par.
- **Um dispositivo por seção, sem repetir na peça inteira**, não só entre
  vizinhas; o maior aparelho vai onde o conteúdo pede escala. Motivo: "tem
  muito mockup de celular… pode ser tablet".
- **Formato nativo da plataforma = frase da copy.** Procurar o formato em que
  o número ou a estrutura da copy cabe literal: duas escolhas → enquete; 7
  dias → story de 7 segmentos; autoridade → perfil com carrossel. Motivo: as
  seções aprovadas de primeira numa rodada real foram todas assim.
- **Timeline ou fluxograma de nós rotulados não é tangibilização**; vira
  cards revelados ou o objeto mudando de estado. Motivo: "essa timeline…
  ficou feia".
- **Quando a oferta é um produto com interface, o produto aparece**, com a
  tela real, não diagrama; reler o que **esta** peça vende antes de herdar
  regra de outra peça. Motivo: "as cenas viraram diagramas" foi o diagnóstico
  da peça fraca.
- **Bloco de oferta é convenção, não palco**: preço centralizado num card,
  hierarquia parcela > de > à vista > botão > pagamento seguro; a ideia
  criativa vai para o stack ao lado, e a descartada fica guardada em arquivo.
  Motivo: oferta alinhada à esquerda foi recusada de saída.
- **Nada de número, logotipo de terceiro ou prova inventada, nem no
  esboço.** Motivo: o que entra no esboço tende a sobreviver até a peça
  (`copy-contrato.md`).
- **Ideia cujo valor é o movimento é hipótese até rodar**: dizer isso na
  recomendação e mostrar o movimento cedo. Motivo: um letreiro aprovado em
  imagem foi implementado e descartado ao ser visto andando.

## Limites de geração (os Passos 3 e 4 herdam daqui)

- Imagem **só das ideias escolhidas**: 1–2 por unidade.
- **No máximo duas gerações por ideia.** A segunda só se o essencial saiu
  errado (dispositivo trocado, comparativo, cor proibida), não por gosto de
  acabamento.
- **Recusada duas vezes → volta ao texto**, com nova leva de ideias; nunca
  uma terceira imagem da mesma ideia.
- **Anunciar a última leva** ("a última; depois o veredito e implementamos")
  dá ao dono uma escolha finita.
- **Quando o dono descreve a solução**, gerar a dele **e** pelo menos uma sem
  viés — na rodada em que isso foi feito, a escolhida foi uma sem viés.
- **Toda unidade da leva aparece no checklist**; se alguma não foi gerada,
  dizer "não gerei porque X" antes de o dono perguntar.
- **O ASCII escolhido vai colado no `LAYOUT.` do prompt** como descrição de
  layout. Quando a seção **não** mostra o produto, dizer isso no LAYOUT: o
  prefixo de direção puxa o produto sozinho.
- **O esboço leva a frase real; o prompt nunca.** Aqui, em `ideias.md`, o
  esboço traz a frase da copy para o dono ler. Ao colar no `LAYOUT.`, cada
  frase vira marcador de lugar e peso — `<headline, 2 linhas>`,
  `<lista de 3 itens>`, `<CTA>` —, porque o gerador escreve na imagem o que
  lê no prompt.

## Registro

A escolha do dono entra em `veredito.md` da seção, como entrada datada com a
citação literal (portão 1). O nome da ideia escolhida vira o cabeçalho do
prompt (`prompt-vK.md`, linha "Ideia: <nome>") e acompanha os arquivos de
imagem que ela gerar (`ideia-vK-<modelo>.png`, ver `imagem-conceito.md`).

## Double-check sobre o texto

A leva em texto é escrita pelo **agente principal**; subagente de ideação é
opcional, só para peça longa (`assets/briefing-subagente-ideacao.md`). O
double-check (a–d) do `imagem-conceito.md`, por subagente de contexto limpo,
roda **depois da escolha do dono** (portão 1) e **antes de gerar imagem**
(Passo 3), só sobre as ideias escolhidas: conferir contra a copy, os vetos
com motivo, a tabela de dispositivos e a direção custa muito menos num
esboço de 12 linhas do que numa imagem gerada.

Buracos da copy que o esboço revelar voltam ao dono pela lista única de
decisões, não viram invenção.
