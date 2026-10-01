# Seção em vídeo → frames → scroll (nível N5)

> **Mapeado, não testado (2026-10-01).** O procedimento abaixo junta peças que
> a skill já usa (scrub, sticky, reduced-motion, orçamento de peso) com geração
> de vídeo; nenhuma peça o aplicou ainda. A primeira aplicação deve fechar com
> estudo de caso e corrigir este arquivo.

O efeito: o leitor rola e um movimento filmado avança quadro a quadro — a
câmera entra no notebook, o produto se monta, a sala acende. É o **padrão D
(scrub)** de `animacao.md` aplicado a uma sequência de imagens em vez de a um
elemento do DOM.

## Quando usar

- **Uma seção-pico por peça**, no máximo duas. É o recurso mais caro da página
  em peso e em revisão.
- O movimento **diz a copy** (a frase da seção fica óbvia pelo movimento); se
  é só bonito, é loop ou entrada, não N5.
- Exige N4 na mesma seção (o primeiro e o último quadro são assets aprovados).

## O pipeline

1. **Roteiro do movimento** no `ideias.md`: quadro inicial, quadro final, o que
   a câmera faz entre eles, em ASCII de três quadros.
2. **Prompt do vídeo**: 3–6 s, câmera e luz só, **sem texto, sem corte, sem
   pessoa entrando**, primeiro e último quadro descritos. Partir de imagem
   aprovada (image-to-video) mantém a família.
3. **Gerar** o vídeo (o dono à mão ou por MCP, como na imagem-conceito).
   Portão: o dono aprova o vídeo inteiro e os dois quadros-limite.
4. **Extrair frames**: 60–120 quadros (`ffmpeg -i v.mp4 -vf fps=24 f-%03d.png`
   ou a ferramenta de extração do gerador), convertidos em WebP, em dois
   tamanhos (desktop e celular). Nomes sequenciais com zero à esquerda.
5. **Implementar**: um `<canvas>` dentro de um painel `position: sticky`
   (nunca pin — `animacao.md`), altura da seção = duração do scrub. O
   scroll mapeia para o índice do frame (`ease: "none"`), e o desenho acontece
   em `requestAnimationFrame` só quando o índice muda.
6. **Carregar em ordem**: primeiro e último quadro já no HTML; os demais em
   lote, do início para o fim, depois do LCP. Se o quadro pedido ainda não
   chegou, desenha o mais próximo carregado.

## Regras

- **Reduced-motion:** sem canvas; mostra o quadro final como imagem estática.
- **Sem JS:** o mesmo `<img>` do quadro final; o HTML servido já é o estado
  final.
- **Orçamento:** ≤ 2–3 MB somando todos os quadros no desktop, metade no
  celular; menos quadros antes de baixar a qualidade.
- **Texto nunca dentro do vídeo.** A copy fica em HTML por cima ou ao lado.
- **Celular:** menos quadros e resolução menor; se o peso não fecha, o
  celular recebe só a entrada (padrão A) com o quadro final.

## Gates

Prova de rolagem em carga fria com motion ligado, print do primeiro, do meio e
do último quadro (`scripts/shoot-dobra.mjs`), peso medido na rede, e a seção
conferida sob reduced-motion.
