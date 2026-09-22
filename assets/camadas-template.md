# Camadas — fichas das seções (<projeto>)

<!-- Uma ficha por seção, 7 camadas, escrita ANTES do código. Método: references/camadas.md.
     Em lotes: cada lote escreve camadas-lote-<x>.md; o orquestrador funde aqui e arquiva os originais. -->

## Blocos de UI compartilhados (`components/ui/`)

| Bloco | Quem criou | Função | Props | Ganchos `data-*` |
|---|---|---|---|---|
| … | … | … | … | … |

## Locais a unificar numa rodada futura

- <BlocoLocal em SeçãoX> ↔ <BlocoCompartilhado> — <por quê ficou local>

---

## NN — <Função> · "<conceito nomeável>" · `<Componente>.tsx`

**Revisão <data> (origem: <áudio NN / pedido / imagem-conceito vK>)** — <o que mudou e por quê,
com a fala do cliente citada. A versão anterior está no histórico do git.>

| Camada | Decisão |
|---|---|
| 1. Fundo da página | <ato; ambiente; grão> |
| 2. Fundo da seção | <tone do container; glow; forma> |
| 3. Textos | <copy literal na hierarquia h2/h3/p/li, na ordem>. **Mock data dentro dos mockups (não é copy, não é prova):** <lista curta>. Nenhum número no texto da página; nenhuma marca de terceiro em texto ou `aria-*`. |
| 4. Estilo dos textos | <degrau da escala; acento; eyebrow; medida; alinhamento por breakpoint; texto em mockup ≥ 12 px> |
| 5. Cores | <tokens; cor de ação em N pontos (quais); semânticos liberados e onde; o que está proibido> |
| 6. Imagens/mockups | <bloco por bloco: anatomia, props usadas, estado vazio × cheio, slot de foto e fallback, o que saiu> |
| 7. Animações | <padrão por elemento (A/B/C/D/E), gatilho, duração, stagger; loops pausados até entrar; scrub com estado final; sem `transition` em elemento do GSAP; reduced-motion: tudo visível no estado final> |

---

## Slots e pendências para o orquestrador

- …

## Dúvidas de copy encontradas (não corrigidas)

- …
