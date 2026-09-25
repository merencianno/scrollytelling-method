# Blocagem: a tabela antes do código

Entre receber a copy e abrir o primeiro arquivo de componente existe uma
etapa de papel: transformar as dobras cruas numa tabela onde cada linha é
uma seção e cada coluna é uma decisão já tomada. No projeto de referência isso é o
`docs/projeto-ref/blocagem-copy.md` — 14 linhas mais o rodapé, escrito antes de
qualquer `.tsx`. O template em branco está em `assets/blocagem-template.md`.

## Por que antes

Escrever componente sem blocagem significa decidir componente, superfície,
conceito, motion e asset ao mesmo tempo, dobra a dobra, sem ver a página
inteira. Três efeitos previsíveis:

- **Ritmo acidental.** Três dobras escuras seguidas, ou a página inteira
  clara, só aparecem quando já existe código para jogar fora.
- **Assets descobertos tarde.** A dobra 9 precisa do logo oficial do
  a ferramenta parceira; a 6 precisa do logo 3D. Listar isso na tabela revela o que
  falta enquanto ainda dá tempo de exportar, gerar ou pedir.
- **Retrabalho de escopo.** Sem a coluna de componente decidida, dois
  agentes (ou duas sessões) mexem no mesmo arquivo.

A tabela custa uma hora e economiza rodadas inteiras. Ela também é o
briefing que se entrega a quem for implementar: cada linha é autocontida o
bastante para virar a tarefa de uma pessoa ou de um subagente.

## Antes da tabela: a leitura estrutural

Uma linha por dobra **do documento da copy** dizendo o que ela traz, e as
observações que decidem a blocagem: qual dobra carrega quatro coisas e vira
três seções; onde o export do editor quebrou (tabela, negrito, aspas); que
headings estão por tamanho e não por hierarquia; onde o preço se repete; o
que a copy não tem (barra de navegação, título de uma dobra). A blocagem
vira consequência dessa leitura, não invenção — e os buracos vão para a
tabela de encaminhamento (`copy-contrato.md`).

## As colunas

| Coluna | O que registra | Critério |
|---|---|---|
| **#** | O número da dobra na copy | A ordem da copy não se altera |
| **Função narrativa** | O papel da dobra em uma palavra | Promessa, Dor, Mecanismo, Diagnóstico, Armadilha, Virada, Oferta, Produto, Serviço, Ancoragem, Qualificação, Garantia, Decisão |
| **Conceito** | A cena, nomeada numa frase | Ver o critério do conceito nomeável, abaixo |
| **Componente** | O nome do arquivo que vai existir | Um arquivo por dobra, nome derivado da função (`TrapSection`, `CostSection`), nunca do número |
| **Ato** | A superfície: claro, escuro ou "deep" | Ver o ritmo, abaixo |
| **Blocagem** | O layout em uma frase densa: o que ocupa a tela e em que arranjo | Precisa citar os elementos da copy daquela dobra, não um layout genérico |
| **Motion** | O gesto, não a implementação | "trilho que preenche", "faturas empilhando", "anel que desenha" |
| **Assets** | Os arquivos concretos que a dobra consome — e, quando o método usa imagem-conceito, a marca **IC** | Caminho ou nome real; vazio quando a dobra é só tipografia e CSS. "IC" diz que a seção passa pelas ideias em texto e pela imagem-conceito (Passos 2–4) antes do código |

Uma linha do projeto de referência, para calibrar a densidade esperada (lá o conceito
morava dentro da célula de blocagem; o template o separa em coluna própria,
o que torna mais difícil deixar uma dobra sem cena):

> `| 11 | Ancoragem | CostSection | escuro | H2 + parágrafo · ledger 6
> linhas com barras proporcionais → "R$ 200 mil" · bloco R$ 24 mil em mint
> · parágrafo · bold · CTA | rows, bars scaleX, total, side | — |`

Abaixo da tabela, duas notas curtas que valem para a página inteira: o que
**não** existe na copy e portanto não é renderizado (no projeto de referência, a barra
de navegação), e a lista das dobras que levam CTA — no projeto de referência, 1, 7, 9,
11, 13 e 14, o que fecha com a contagem de seis do contrato de copy.

## O ritmo das superfícies

Superfície é decisão narrativa, não estética. Escuro nos picos emocionais
— problema, armadilha, oferta, garantia, fechamento; claro nos respiros —
explicação, listas, currículo de entregáveis, qualificação. O contraste
entre seções é parte do efeito: uma página toda escura cansa e uma página
toda clara não tem clímax.

O ritmo aprovado do projeto de referência, para ler como exemplo de alternância e não
como fórmula: `1 D · 2 L · 3 D · 4 L · 5 D · 6 deep · 7 D · 8 L · 9 D ·
10 L · 11 D · 12 L · 13 D · 14 deep`. O "deep" é uma terceira superfície,
mais escura que o escuro padrão, reservada para dois momentos — a virada e
a decisão final —, o que dá à página dois picos em vez de um platô.

Vale conferir o ritmo lendo só a coluna **Ato** de cima a baixo, antes de
seguir: se houver três iguais em sequência, alguma dobra está no ato
errado ou duas dobras vizinhas estão contando a mesma coisa.

## O conceito precisa ser nomeável

A coluna de blocagem só está pronta quando o conceito da dobra cabe numa
frase que descreve uma cena: "o placar dos dois caminhos", "o cofre
aberto", "a bifurcação final", "a janela da ferramenta parceira instalando na sua
conta". Se a frase que sai for "grid de cards com ícones", ainda é
repaginação — troca de cor e fonte sobre uma estrutura qualquer — e vai
ser rejeitada na primeira revisão com o cliente.

O teste prático: perguntar o que a dobra **afirma** e desenhar a cena que
prova a afirmação antes da leitura linha a linha. A dobra que diz que o
custo se acumula ganha faturas empilhando; a que diz que cinco áreas
dependem umas das outras ganha um trilho que apaga a quinta estação. O
motion sai da mesma pergunta: riscar nega, desenhar constrói, empilhar
acumula, acender conquista.

## Quando a blocagem muda

Ela muda — o projeto de referência reimaginou da dobra 9 para baixo na segunda passada.
O que não muda é a ordem das dobras nem a copy. Atualizar a tabela junto
com o código mantém o documento utilizável como mapa por quem chegar
depois; blocagem desatualizada é pior que blocagem inexistente, porque
manda a pessoa para o arquivo errado.

Vale também para a direção visual: quando ela muda (V1 → V2), **a blocagem
é reescrita no mesmo commit** — os atos, as cores citadas na coluna de
blocagem, os assets. Dois documentos de verdade divergentes fizeram três
subagentes reportar o mesmo conflito numa rodada só.

## Vizinhança

Seções vizinhas não usam o mesmo dispositivo (dois perfis seguidos, dois
Reels seguidos, duas janelas de app iguais). Ler a coluna **Conceito** de
cima a baixo, como se lê a coluna Ato: repetição só vale como **eco
declarado** — o mesmo objeto com um elemento trocado, lido como resposta da
seção anterior, escrito como decisão. Colisão é acidente, e é o que o
double-check em contexto limpo mais encontra.
