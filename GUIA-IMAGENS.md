# Guia para quem vai aprovar as ideias — imagens-conceito por seção

Este guia é para quem **não programa**: o dono do projeto, o designer, quem
aprova. O Claude cuida do resto. Você faz três coisas: gera imagens, salva na
pasta certa e diz o que achou.

## O que é isso

Antes de existir qualquer código, cada seção da página vira **uma imagem de
imagem na proporção da sua peça**, gerada por IA a partir de um texto (o
"prompt")
que o Claude escreve. A imagem é uma **ideia**, não a seção final: ela mostra
o arranjo, qual tela ou objeto aparece, onde fica o destaque de cor. Texto,
números e detalhes dentro dela são enfeite do gerador — a página de verdade
usa a sua copy, letra por letra.

Você só aprova o código depois de aprovar as ideias. Isso evita refazer
seção pronta.

## Passo 1 — Pedir os prompts

Peça ao Claude: *"gera os prompts de imagem-conceito das seções"*. Ele cria
uma pasta por seção:

```text
meu-projeto/secoes/01-promessa/prompt-v1.md
meu-projeto/secoes/02-dor/prompt-v1.md
…
```

Cada arquivo tem, além do prompt, a copy daquela seção (para você conferir se
a ideia sustenta o texto) e um critério do que a imagem precisa mostrar.

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
  antes que há crédito.

**O que rendeu melhor nos nossos testes:** GPT Image 2.5 e Seedream 5 Pro
(pelo Magnific). Nano Banana (Gemini) serviu. Mystic não serve para telas de
app. Fique à vontade para testar outros — só anote qual usou.

Não estranhe se a imagem vier com um logotipo, uma moldura de celular ou uma
cor que o prompt proibia: é o gerador ignorando instrução em texto longo.
Isso **não vai para o código**. Julgue a ideia, não o acabamento.

## Passo 3 — Salvar na pasta da seção

Salve a imagem dentro da pasta da seção, com a versão e o modelo no nome:

```text
meu-projeto/secoes/03-desejo/imagem-v1-gpt25.png
meu-projeto/secoes/03-desejo/imagem-v1-seedream.png
```

Pode gerar a mesma seção em dois modelos e guardar as duas.

## Passo 4 — Dar o veredito

Na mesma pasta, crie `veredito.md` com uma linha (ou diga no chat, que o
Claude registra):

```text
aprovada
refazer: o celular está grande demais; quero a lista de mensagens, não o perfil
usar parte: a coluna da esquerda vale; a direita troca por uma notificação
```

## Passo 5 — Pedir versões até ficar satisfeito

Você não precisa aceitar a primeira ideia. Peça variações: *"me dá outra
ideia para a seção 05, menos literal"*, *"e se a 08 fosse um papel amassando?"*.
O Claude escreve `prompt-v2.md` **ao lado** do v1 (nunca por cima), você
gera, compara, anota no veredito o que cada versão acertou. Tudo fica
guardado em `historico/`; nada se apaga.

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
- Duas seções vizinhas com o mesmo tipo de tela: mantém como eco ou troca uma?
- Essa foto/print vai existir de verdade? Se não, entra um espaço reservado.

## O que nunca entra na imagem nem na página

Rosto de pessoa real, número que pareça prova de resultado, depoimento
inventado, nome de cliente, logotipo de outra empresa. Se a imagem gerou
algum desses, ela ainda serve como ideia — mas avise no veredito para não ir
para o código.
