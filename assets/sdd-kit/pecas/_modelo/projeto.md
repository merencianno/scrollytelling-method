# <NOME-DA-PEÇA>

<!-- A ficha da peça: o primeiro arquivo que a skill lê, e o que decide a
     proporção da imagem, o que se confere e como a peça é exportada.
     Mesmo conteúdo de <caminho-da-skill>/assets/projeto-template.md.
     Esta pasta vira pecas/<peca>/ (cp -R pecas/_modelo pecas/<peca>).
     Nascem depois, a partir dos templates da skill:
       direcao-visual.md             ← assets/direcao-visual-template.md (Passo 0)
       blocagem.md                   ← assets/blocagem-template.md (Passo 1)
       subagentes/BRIEFING-IDEACAO.md ← assets/briefing-subagente-ideacao.md (Passo 2)
       secoes/NN-slug/camadas.md     ← assets/camadas-template.md (Passos 5–6)
     Já estão aqui: taste.md, subagentes/BRIEFING-IMPLEMENTACAO.md,
     subagentes/BRIEFING-REFINO.md, secoes/README.md e secoes/NN-slug/. -->

| | |
|---|---|
| Formato | landing · deck · carrossel · story/reels · criativo de feed · UI de produto |
| A unidade | dobra · slide · card · peça · tela/estado |
| Eixo do tempo | scroll · avanço · swipe · nenhum · interação |
| **Proporção da imagem-conceito** | 16:9 · 1:1 · 4:5 · 9:16 — herdada por todo prompt |
| Peça final | HTML/Next · `.pptx`/PDF · sequência de PNG · PNG · Figma pelo MCP · código |
| Quem aprova | <NOME OU PAPEL> |
| Prazo | <DATA — define o dial: enxuto ou elaborado> |
| Copy | `copy/copy.md` — congelada em <AAAA-MM-DD> |
| Direção visual | `direcao-visual.md` — linha V<K> |
| Modelo de imagem | <definido no bake-off; custo em `secoes/README.md`> |
| Spec | `docs/sdd/specs/<peca>.md` |
| Status | <rascunho · ideias · imagens · implementação · refino · pronta (declarada pelo dono) · entregue> |

## Para que serve, em uma frase

<Se precisar de duas frases, provavelmente são duas peças.>

## Público

<Quem chega nesta peça e de onde.>

## Condicionais que valem aqui

<!-- Marque só o que se aplica ao formato. O invariante — copy congelada,
     direção escrita, blocagem, ideias em texto, imagem-conceito, camadas,
     uma unidade por vez, revisão, fechamento — acontece sempre. -->

- [ ] ritmo de superfícies (a sequência é longa)
- [ ] motion (o formato tem eixo de tempo)
- [ ] responsividade (o viewport varia)
- [ ] performance (a peça carrega)

## O que não é óbvio

<Armadilhas para quem for mexer daqui a três meses: dimensão exigida pela
plataforma, fonte com licença, asset que vem de fora, data que trava tudo.>

- <ITEM>
