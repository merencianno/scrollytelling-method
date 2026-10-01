# Níveis de visualização — quanto a ideia se materializa antes do código

> **O núcleo não muda com o nível.** Blocagem + copy + ideia visual decididas
> juntas, na mesma linha — se a unidade é uma seção ou três, uma coluna ou
> duas, um H1 com a coluna embaixo ou uma imagem ao lado, e que cena sustenta
> o que está escrito — é o trabalho humano que a skill transfere. O nível só
> decide **quanto essa ideia vira coisa vista** antes do código: um esboço, uma
> descrição, uma imagem, os assets, um vídeo.

Escolhe-se o nível **no Passo 0, antes das ideias**, porque ele muda como a
ideia é escrita: quem sabe que vai gerar assets pode deixar a imagem da seção
mais rascunho e gastar a precisão no prompt de cada asset.

## Os cinco níveis

| nível | o que entrega por unidade | arquivo | exige | o portão 2 recai sobre |
|---|---|---|---|---|
| **N1** — ASCII | `ideias.md`: 3–5 ideias com nome, leitura da copy, mecanismo vivo e esboço ASCII | `secoes/NN-slug/ideias.md` | nada | não existe: o portão 1 aprova a ideia e o código parte dela |
| **N2** — + prompt descritivo · **piso em modo autor** | N1 + um prompt de imagem-conceito **extremamente descritivo** por ideia escolhida, com ASCII do movimento, double-check e critério de aceite, **gerado ou não** | `prompt-vK.md` | nada | o **prompt**: o dono aprova a descrição |
| **N3** — + imagem gerada | N2 + a imagem-conceito (≤ 2 gerações por ideia) | `ideia-vK-<modelo>.png` | gerador de imagem (pago, à mão ou por MCP) | a imagem |
| **N4** — + assets por seção | N3 (ou N2) + um prompt **por asset** que compõe a seção e, havendo ferramenta, o asset gerado | `assets/asset-<nome>-vK.md` (+ `.png`/`.webp`) | gerador + acabamento (upscale, relight, recorte) | a imagem da seção e cada asset |
| **N5** — + seção em vídeo | N4 + uma seção-pico animada por **vídeo gerado → frames → scroll** | `video/` na pasta da seção | gerador de vídeo + extração de frames | o vídeo (e o primeiro e o último frame) |

**O piso depende do modo** (`SKILL.md` › os quatro modos):

- **Em modo autor, N2 é o piso.** A unidade nasce de ideia nova, sem
  referência visual fora do pipeline; escrever o prompt descritivo, mesmo sem
  gerar a imagem, já é a maior parte do caminho: obriga a decidir o que está
  no centro, de onde vem a luz, o que fica limpo para o texto, como a câmera
  anda — tudo o que, sem ele, seria decidido implementando. **Sem gerador, o
  prompt aprovado basta para implementar; prompt não aprovado é unidade
  parada, e o `secoes/README.md` diz isso.**
- **Com referência existente, N1 basta** (modos executor, intenção e
  fidelidade): a tela real do produto, um golden master, um componente que o
  dono indicou. O prompt descreveria o que já está desenhado. **Registre o
  porquê** no `projeto.md` e na coluna `Nível`.

**O que não se pula em modo nenhum é o N1**: blocagem, ideia e esboço são o
núcleo humano, e o nível só começa a contar a partir dele.

## Como escolher — três perguntas

1. **Há gerador de imagem com crédito?** Não → N2. Sim → N3.
2. **Há ferramenta de acabamento (upscale, relight, recorte, remoção de
   fundo) e tempo para uma rodada por asset?** Sim → N4 nas seções que pedem
   foto, objeto ou device; o resto continua N3 ou N2.
3. **A peça tem eixo de tempo e uma seção-pico que mereça movimento filmado**
   (a câmera entra no objeto, o produto se monta, a cena muda de estado)? Sim,
   e há gerador de vídeo → N5 **nessa seção só**.

O nível é **da peça, ajustável por seção**: baixa-se numa seção sem pedir;
sobe-se só com o dono. Registre no `projeto.md` (`Nível de visualização`), na direção
visual (ferramentas disponíveis) e na coluna `Nível` do `secoes/README.md`.

## O que muda na escrita da ideia, por nível

- **N1–N3:** a ideia carrega a cena inteira; a imagem da seção é a
  composição completa.
- **N4:** a ideia da seção pode ser **rascunho de composição** (onde o texto
  mora, o que ocupa o centro, que objeto entra) e termina com a lista
  **"assets que esta ideia pede"** — uma linha por asset, com o tipo do
  `assets/prompt-asset-template.md`. A precisão vai para o prompt de cada
  asset; o resto (moldura, texto, interface, ícone) vem de HTML/CSS/SVG.
- **N5:** além disso, a seção-pico ganha o roteiro do movimento — quadro
  inicial, quadro final, o que a câmera faz entre os dois — e segue
  `references/video-frames-scroll.md`.

## Fora da página

A lógica é a mesma em deck, carrossel e criativo: muda a unidade e a
proporção, não os níveis. N5 só existe onde há eixo de tempo (página, deck
navegável); em peça estática o teto é N4.

## Dial de tempo

Sob prazo, **baixa-se o nível, nunca se pula o N1 — e, em modo autor, nunca
se pula o N2.** Ideia sem esboço e
sem descrição é ideia decidida implementando — e é aí que a rodada se perde.
