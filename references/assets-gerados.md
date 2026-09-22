# Assets gerados por IA

> **A geração de imagem entrou no método — como ferramenta de ideia, não de
> asset.** Em 2026-09-21 catorze seções de um funil foram geradas como
> imagens-conceito na proporção do formato, aprovadas antes do código
> (`imagem-conceito.md`).
> Nenhuma dessas imagens foi ao ar: o que resolve a página continua sendo o
> **mockup de interface construído em HTML/CSS**, e a copy só entra no código.
> Este arquivo cobre o que sobra — o asset gerado que de fato entra na página
> (cena fotográfica de respiro, composição que não cabe em HTML) — e as
> regras de ferramenta que valem para os dois usos.
>
> O que a primeira execução real ensinou sobre ferramenta: cole **só o bloco
> de prompt**, nunca o arquivo (o cabeçalho vira instrução); gere
> **individualmente** (modo lista piora); mude **uma variável por vez**;
> para interface, GPT Image 2.5 e Seedream 5 Pro (pelo Magnific) foram os
> melhores nos testes da casa, Nano Banana serviu, Mystic não; prompt
> longo faz o modelo ignorar proibições — aceitável na imagem-conceito,
> nunca copiado no código.

## Antes de gerar: o mockup em HTML/CSS resolve quase sempre

Quando o slot pede "uma tela", "um painel", "um app", "um card de notificação",
a primeira opção a considerar é construir aquilo em HTML/CSS dentro da moldura de
janela do próprio sistema — não a última, depois de a geração falhar.

As razões são práticas:

- **Peso.** Uma janela de CRM em HTML custa alguns kB de markup; a mesma cena em
  WebP 2× custa centenas.
- **Movimento.** O mockup anima: o card viaja entre colunas do pipeline, o chip
  vira "Concluída", a barra de progresso enche. Imagem gerada é estática, e
  transformá-la em vídeo custa outra ferramenta e outro ciclo de revisão.
- **Escala.** O mockup se reflui em qualquer largura, de 320 px ao desktop. A
  imagem gerada tem uma composição só e é cortada ou espremida nas outras.
- **Texto legível.** Geradores escrevem texto errado, e numa página onde a copy é
  contratual isso é risco direto. No HTML, o texto é o texto.

Na `/ref`, o hero, a seção de fluxo, o bento de soluções e a seção de
implementação são todos mockups em HTML dentro de uma primitiva de janela,
combinados com assets exportados do Figma (ícones de vidro, cards, app icon).

## O pipeline de geração, para quando for usado

### Direção comum, colável como prefixo

Todo prompt começa pela mesma direção — é ela que faz peças geradas em sessões
diferentes parecerem da mesma família. O texto usado na `/ref`
(`docs/projeto-ref/prompts-geracao.md`) era, com os hex da marca trocados
por marcadores:

> Premium, minimalist tech brand. Deep blue radial light (<MARCA-PROFUNDA>) over pure
> black (#000000), soft volumetric glow (<MARCA-NUCLEO>), frosted glass surfaces
> (white 10–18% + blur), glossy translucent blue glass 3D objects, four-point
> sparkle accent. No text, no watermark, no lens flare, no vignette. Studio
> product photography, 8k, clean edges, transparent or black background.

Ao adaptar para outra marca, trocar os hexadecimais e o objeto característico
(ali, o vidro azul e o brilho de quatro pontas) e manter a estrutura: material,
luz, fundo, proibições, acabamento.

### Consistência entre peças

- Repetir a direção comum inteira em **todos** os prompts, mesmo nos curtos. É
  tentador abreviar no terceiro; é aí que a família se desfaz.
- Fixar proporção e enquadramento por família de slot (todos os selos isolados e
  vistos de cima, todos os cards flutuando na mesma altura de câmera).
- Comparar cada peça com o moodboard — os PNGs renderizados do Figma — **antes**
  de aceitar. A pergunta é "isso caberia no deck?", não "isso ficou bonito?".
- Exportar em WebP q82, em 1× e 2×, guardando numa pasta separada dos assets
  exportados do Figma, para saber sempre o que é original e o que é gerado.

### Proibições que vêm do gosto do cliente

- **Nunca gerar texto legível dentro da imagem.** A copy é literal e vive no
  HTML; texto na imagem compete com ela, erra acentuação e não é revisável.
- **Nunca gerar rostos.** Quando a marca já tem pessoas fotografadas, use-as; um
  rosto sintético destoa e cria problema de direito de imagem sem necessidade.
- **Nunca entregar imagem com fade, blur de borda ou moldura embutida.** Na `/ref`
  o feedback ao vivo foi exatamente esse — "imagens com blur branco e cortadas".
  O respiro vem do espaço em volta da imagem, não de um degradê dentro dela.

### As ferramentas, e o que cada uma resolve

- **Figma Make** — gerar a peça já dentro do arquivo de direção, aproveitando a
  paleta e os componentes existentes. Bom para variações de algo que já existe.
- **Magnific** — upscale, relight e enriquecimento de textura. Não serve para
  criar do zero: serve para pegar um render simples, um PNG de totem ou um
  mockup exportado e dar-lhe acabamento fotográfico, inclusive por
  transferência de estilo a partir de uma referência da própria marca.
- **Higgsfield** — geração do zero e, principalmente, **image-to-video**: é a
  opção quando o slot pede movimento (um símbolo 3D respirando em loop de 6 s).
- **Geração de imagem por GPT** — rascunho rápido de composição e teste de ideia,
  antes de gastar ciclo nas ferramentas de acabamento.

Fluxo típico: compor ou rascunhar (GPT / Higgsfield) → refinar e subir resolução
(Magnific) → exportar em dois tamanhos.

## Cenas fotográficas como respiro entre dobras

Cenas conceituais — as que vêm do deck de direção — entram como fôlego entre
blocos de argumento, não como ilustração de parágrafo. O tratamento é fixo:

- **Enquadramento inteiro.** A cena aparece completa, na proporção original
  (16:9 no caso), dentro de um palco com fundo escuro e canto arredondado.
  Recorte agressivo só quando o container realmente manda na proporção.
- **Sem fade, sem gradiente por cima, sem moldura.** Só o raio do cartão.
- **Sempre decorativa** (`aria-hidden`, `alt` vazio): a cena não carrega
  informação que a copy precise.
- Entrada discreta ao chegar na viewport, e parallax apenas na variante recortada.

**A armadilha real:** cenas vindas de um deck frequentemente contêm **texto
renderizado** — o título do slide, um número de destaque. Esse texto é imagem de
marca, não copy da página, e vai competir com a headline ao lado ou, pior, ler
como afirmação da página. Antes de escolher a cena, abrir o PNG e olhar. Na
`/ref` havia uma cena inteira (`crm-perspective`) inutilizável como respiro por
conter o texto de um slide, e os nomes de arquivo do inventário estavam trocados
entre si por herança histórica — conferir o conteúdo, nunca o nome.
