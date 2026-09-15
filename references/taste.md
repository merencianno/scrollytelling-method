# Gosto — o que é vetado, o que foi aprovado

Este é o arquivo mais importante da skill e, nesta versão pública, é o mais
vazio. Não é descuido: **gosto é de um cliente específico**, e o gosto de um
cliente não se transporta para outro. O que se transporta é a *estrutura* de
capturá-lo, mais um punhado de lições de ofício que se repetiram em todos os
projetos até aqui.

Preencha as duas primeiras seções com o seu cliente. Comece pela terceira, que
já vem escrita.

---

## Vetos deste projeto

> Um por bloco, com **o motivo ao lado**. Veto sem motivo vira superstição, e
> alguém o reintroduz na rodada seguinte por outro caminho.

_(a preencher)_

## Aprovados deste projeto

> Com a citação literal de quem aprovou. "Horrível", "você matou", "está
> perfeita" carregam a intensidade do julgamento; a paráfrase perde a força e a
> rodada seguinte volta a errar.

_(a preencher)_

---

## Lições de ofício

Estas não são gosto de ninguém — apareceram em todos os projetos e podem ser
adotadas antes da primeira conversa.

**Imagem com fade, blur ou recorte panorâmico não integra, denuncia.** O
gradiente posto sobre a foto para "fundir com o fundo" lê como defeito de
renderização, e o corte panorâmico decapita a cena. Quem segura a imagem é o
palco da própria cor atrás dela.

**Moldura em volta de imagem é remendo.** Se a imagem precisa de moldura para
não flutuar, o problema é o fundo, não a falta de borda.

**Imagem recortada onde cabe interface construída.** Um card de produto
recortado de um screenshot fica errado em toda largura que não seja a original.
Reconstruído em HTML com unidades de container, funciona de 320 a 1440.

**Marcador numérico de dobra ("01", "02"…) denuncia a página.** Explicita que
aquilo é um esquema de N partes, e o leitor começa a contar quanto falta em vez
de ler.

**Corpo de texto abaixo de 17px em card é decorativo.** Se o texto importa, ele
tem tamanho de leitura; se não importa, ele sai.

**Cor fora da paleta cansa antes de convencer.** Um tom trazido "só nesta
seção" é o começo do fim da identidade.

**Metáfora que precisa ser decodificada falhou.** Um selo de garantia tem que
ser reconhecido no instante em que aparece. Se o leitor precisa entender a
charada, ele já passou.

**Um pedido do cliente é hipótese a testar, não especificação a cumprir.** Já
aconteceu de um item ser pedido explicitamente, executado ao pé da letra e
rejeitado ao ser visto — porque o pedido descrevia a intenção, não a solução.

## Regras duras que costumam valer

**Mobile abaixo de 640px sem alinhamento à esquerda.** Texto, ícones, listas e
cards centralizados; o alinhamento à esquerda entra a partir de `sm`.

**Sem palavras órfãs.** `text-wrap: balance` em h1–h3 e `pretty` em parágrafos e
itens, como regra global do escopo. A regra global (especificidade 0,1,1) vence
a utilitária do framework (0,1,0), então `balance` aplicado direto num `<p>` é
ignorado **em silêncio** — para forçar, criar classe da própria seção. No
desktop, `balance` em frase curta quebra em quatro linhas com respiro
exagerado: a partir de `xl`, voltar para `pretty`.

**Semântica de cor com teto.** A cor da marca é estrutura, luz e CTA. As cores
semânticas (ganho, custo) somadas ficam abaixo de ~10% da tela — acima disso
deixam de ser sinal e viram decoração, e a cena perde a leitura.

> Sobre preço: a política de exibição (parcelado, à vista, ou os dois) é
> **decisão comercial do cliente**, não regra de ofício, e muda de projeto para
> projeto. Registre a do seu aqui, e não a carregue para o próximo.

---

## Como capturar o gosto de um cliente novo

**Mostrar cedo e ao vivo.** Quase todo feedback que muda uma página vem de
sessão com o servidor de desenvolvimento aberto ao lado, não de screenshot
enviado.

**Transcrever literal.** A intensidade do julgamento está nas palavras exatas.

**Marcar aprovação com `!`** no documento da rodada. O que tem `!` fica
intocável e vira vocabulário de referência para as seções novas. Fechar a
rodada com um commit só de aprovações, seguido da lista de pedidos abertos — a
rodada seguinte começa por essa lista.

**Procurar o padrão atrás do elogio, não o item elogiado.** Um `!` num
componente pode virar o vocabulário de cinco seções.

**Guardar cada veto com o motivo ao lado.** É o que impede que ele volte.
