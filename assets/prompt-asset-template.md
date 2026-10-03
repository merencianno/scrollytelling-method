# Asset · <NN-slug> · <nome do asset> · v<K>

Nível N4 (`references/niveis-de-visualizacao.md`). Um arquivo por asset. O
asset **serve à ideia aprovada da seção, não a substitui**: se ele muda a
composição, volta ao Passo 2.

| campo | valor |
|---|---|
| seção e ideia aprovada | `secoes/NN-slug/` · nome da ideia |
| papel na composição | o que este asset faz na cena (objeto central, respiro, prova visual de contexto…) |
| tipo | png-recortado · mockup-device · foto-expert · persona-em-ação · cena-com-ícones |
| proporção e fundo | ex.: 4:5, fundo transparente |
| tamanho final e peso | ex.: 1200 px de largura, ≤ 180 kB em WebP |
| onde entra | camada 6 do `camadas.md`; o que fica por cima em HTML/CSS |
| ferramenta | gerador → acabamento (upscale, relight, recorte) |

## Prompt

```text
<prefixo comum da direção visual, inalterado>

<o asset: assunto, material, luz coerente com a cena da seção, enquadramento,
câmera, fundo, o que fica vazio para o HTML>

No text, no numbers, no logos, no watermark.
```

## Tipos, e o que cada um exige

- **png-recortado** — objeto isolado (produto, embalagem, objeto da marca),
  fundo transparente, luz vinda do mesmo lado da cena da seção. Recorte por
  remoção de fundo, borda limpa, sem sombra embutida (a sombra é CSS).
- **mockup-device** — notebook, celular, tablet com tela. **A tela é HTML real
  por cima**; a imagem só dá o corpo do aparelho, a luz e a perspectiva. Tela
  de frente ou com perspectiva medida, para o HTML encaixar.
- **foto-expert** — **só a partir de foto real fornecida** (retoque, relight,
  upscale, troca de fundo). Nunca rosto sintético de pessoa que existe.
- **persona-em-ação** — pessoa genérica fazendo a ação que a copy descreve (a
  influencer aplicando o produto, o médico atendendo, a aluna estudando). Pessoa
  fictícia, sem semelhança com alguém real; direito de uso confirmado.
- **cena-com-ícones** — a cena gerada sem os ícones; **ícones em SVG por cima**,
  no código, para animar e manter traço e cor da marca.

## Double-check do asset

- (a) Serve à ideia aprovada e cabe na composição sem mudá-la?
- (b) Nada de texto legível, número, logotipo ou marca d'água?
- (c) Direito de imagem: pessoa real só com foto fornecida; persona é fictícia?
- (d) Peso e tamanho dentro do orçamento, nos dois tamanhos de exportação?

## Arquivos

`asset-<nome>-vK.md` (este prompt) e `asset-<nome>-vK-<modelo>.png`; o escolhido
renomeado `asset-<nome>-vK-aprovado-<modelo>.png`; exportação final em WebP
1× e 2× na pasta de assets públicos, separada dos assets exportados do design.
