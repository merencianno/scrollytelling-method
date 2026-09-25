# Guia para quem vai aprovar as ideias — imagens-conceito por seção

Este guia é para quem **não programa**: o dono do projeto, o designer, quem
aprova. O Claude cuida do resto. Você faz **quatro** coisas: escolhe entre
as ideias em texto, gera (ou manda gerar) as imagens, salva na pasta certa e
diz o que achou.

## O que é isso

Antes de existir qualquer código, cada seção da página vira **uma imagem na
proporção da sua peça**, gerada por IA a partir de um texto (o "prompt") que
o Claude escreve. A imagem é uma **ideia**, não a seção final: ela mostra
o arranjo, qual tela ou objeto aparece, onde fica o destaque de cor. Texto,
números e detalhes dentro dela são enfeite do gerador — a página de verdade
usa a sua copy, letra por letra.

Você só aprova o código depois de aprovar as ideias. Isso evita refazer
seção pronta.

## Passo 0 — Escolher entre as ideias em texto

Antes de qualquer imagem, o Claude traz, para cada seção, um arquivo
`ideias.md` com 3 a 5 ideias escritas. Cada ideia tem um nome curto, qual
frase da copy ela torna óbvia, o que se move, e um **esboço em caracteres**
(ASCII) mostrando onde fica o objeto e onde a copy mora nele — sem cor, sem
estilo, só o arranjo. No fim vem a recomendação dele, com o porquê.

Leia o esboço como um rascunho de guardanapo: a pergunta é se a ideia
**explica** a frase da copy, não se ficou bonita. **Escolha uma ou duas por
seção; só essas viram imagem.** Se não gostar de nenhuma, peça outra leva em
texto — não outra imagem. Texto não gasta crédito.

## Passo 1 — Pedir os prompts

Depois da escolha, o Claude escreve um prompt por ideia escolhida, na pasta
da seção:

```text
pecas/<peça>/secoes/01-promessa/prompt-v1.md
pecas/<peça>/secoes/02-dor/prompt-v1.md
…
```

Cada prompt diz, logo no topo, **qual ideia ele desenha**. Além do prompt, o
arquivo tem a copy daquela seção (para você conferir se a ideia sustenta o
texto) e um critério do que a imagem precisa mostrar.

## Passo 2 — Gerar a imagem

Abra o arquivo e copie **só o que está dentro do bloco de código** (entre as
três crases, começa com "Photorealistic screenshot…"). Não copie o arquivo
inteiro: tudo o que estiver fora do bloco vira instrução para o gerador — já
saiu uma imagem com o nome de outro projeto por causa do cabeçalho.

Cole no gerador que você tiver:

- **No navegador, à mão** (ChatGPT, Gemini, Magnific, Higgsfield…). Formato
  na proporção do seu projeto, **uma imagem por vez** — o modo "lista" ou
  "lote" piora o resultado.
- **Pelo Claude**, se você tiver um gerador ligado a ele (MCP do Higgsfield,
  do Magnific…): peça *"gera a imagem da seção 03 com o prompt v1"*. Confirme
  antes que há crédito. Detalhes em "Pelo agente (MCP)", abaixo.

**Qual modelo:** teste dois modelos nas três primeiras seções com o mesmo
prompt. O que vencer vira o padrão do projeto — pode ser o mais caro, se for
o que você prefere. Anote o custo de cada um.

### Pelo agente (MCP)

Quando o Claude gera por você, ele segue sempre o mesmo roteiro:

1. gera com o gerador ligado, na proporção do `projeto.md`, com a resolução e a
   qualidade combinadas, **uma imagem por chamada**;
2. espera concluir, baixa e confere que o arquivo é mesmo um PNG;
3. **olha a imagem antes de te mostrar** — se o essencial saiu errado
   (dispositivo trocado, comparativo, cor proibida), diz isso junto;
4. salva na pasta da seção com o nome da convenção (Passo 3) e diz quanto
   custou.

Regras: **no máximo duas gerações por ideia**; imagens de referência (logo,
telas reais, fotos) são enviadas uma vez e reaproveitadas; catálogos grandes
(uma fileira de capas, por exemplo) vão como uma folha de contato só, não
uma imagem por item.

Não estranhe se a imagem vier com um logotipo, uma moldura de celular ou uma
cor que o prompt proibia: é o gerador ignorando instrução em texto longo.
Isso **não vai para o código**. Julgue a ideia, não o acabamento.

## Passo 3 — Salvar na pasta da seção

Salve a imagem dentro da pasta da seção, com o número do prompt e o modelo
no nome — **K é o número do prompt que gerou a imagem; o modelo vai no
fim**:

```text
pecas/<peça>/secoes/03-desejo/ideia-v1-gpt25.png
pecas/<peça>/secoes/03-desejo/ideia-v1-seedream5pro.png
```

Pode gerar a mesma ideia em dois modelos e guardar as duas. A escolhida é
renomeada para `ideia-v1-aprovada-gpt25.png`; **as outras ficam ao lado**,
na mesma pasta — nada vai para pasta escondida. Sufixos: `gpt25`,
`seedream5pro`, `nanobanana`, `mystic`, `flux`, `outro-<nome>`.

## Passo 4 — Dar o veredito

Diga o que achou com as suas palavras — no chat ou por áudio (o Claude
transcreve). Ele registra no `veredito.md` da seção uma **entrada datada**,
com a sua fala literal e o arquivo escolhido; opinião nova é entrada nova,
nunca por cima da anterior. Os estados possíveis:

```text
aprovada
composição vale, refaz o acabamento: a ideia e o arranjo estão certos, o resto não
refazer: o celular está grande demais; quero a lista de mensagens, não o perfil
usar parte: a coluna da esquerda vale; a direita troca por uma notificação
voltar às ideias: essa ideia não explica a frase; quero outras em texto
```

## Passo 5 — Pedir versões até ficar satisfeito

Você não precisa aceitar a primeira ideia. Peça variações: *"me dá outra
ideia para a seção 05, menos literal"*, *"e se a 08 fosse um papel amassando?"*.
O Claude escreve `prompt-v2.md` **ao lado** do v1 (nunca por cima), você
gera, compara, e o veredito registra o que cada versão acertou. Tudo fica na
pasta da seção; nada se apaga.

**Recusou a mesma ideia duas vezes?** O Claude volta com ideias em texto,
não com outra imagem — o problema é o conceito, não o acabamento. E quando
você pedir *"a última leva"*, ele fecha a exploração: depois dela vem o
veredito e a implementação.

Enquanto olha as imagens, confira também **a distribuição da copy**: aquela
frase está na seção certa? Duas seções estão dizendo a mesma coisa? Esta é a
hora barata de mover texto entre seções — depois, no código, custa uma rodada.

**O sinal para o Claude seguir:** *"estou satisfeito com as ideias e com a
distribuição da copy"*. A partir daí ele destrincha cada imagem aprovada em
camadas (fundo, textos, cores, mockups, animações) e só então escreve código.
No fim, **uma ideia por seção**, com o histórico inteiro preservado.

## Perguntas que o Claude vai te fazer (e vale responder antes)

- Onde fica o destaque de cor nesta seção — um ponto só?
- Esta seção é clara ou escura?
- Duas seções da página com o mesmo tipo de tela: mantém como eco ou troca uma?
- Essa foto/print vai existir de verdade? Se não, entra um espaço reservado.

## O que nunca entra na imagem nem na página

Rosto de pessoa real, número que pareça prova de resultado, depoimento
inventado, nome de cliente, logotipo de outra empresa. Se a imagem gerou
algum desses, ela ainda serve como ideia — mas avise no veredito para não ir
para o código. Fotos e posts reais entram só dos perfis que você indicou por
link.
