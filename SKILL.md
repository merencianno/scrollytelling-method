---
name: scrollytelling-method
description: Transformar uma copy de página de vendas em landing com scrollytelling — reimaginação seção a seção com conceito nomeável, mockup de interface no lugar de screenshot, loops em CSS pausados até entrar em cena, identidade token-first e copy inviolável verificada por script. Use sempre que o usuário pedir "página de vendas", "landing com scrollytelling", "transformar essa copy em página", "reimaginar a landing", "estilo da /ref", "tangibilizar a copy", ou quando existir um arquivo de copy dividido em dobras esperando virar página. Cobre o pipeline inteiro, da ficha do projeto à publicação. A skill irmã slides-scrollytelling faz a variante em deck; esta faz páginas.
license: MIT
---

# scrollytelling-method

Método para transformar copy comercial em página que se conta sozinha durante o
scroll. Destilado de duas páginas reais — `/vsl-pmv-bio` (2026-09-01) e `/ref`
(2026-09-10, seis versões em doze horas) — e das armadilhas que ambas custaram.

Não é um tema visual: é um processo com contratos verificáveis. Trocar cor e
fonte numa estrutura existente é maquiagem, e vai ser rejeitado na primeira
revisão.

## Arquivos de apoio

Abrir conforme a fase — nenhum precisa ser lido de antemão, e ler todos de uma
vez desperdiça contexto.

| Arquivo | Quando abrir |
|---|---|
| `references/taste.md` | **Antes de propor qualquer conceito.** O que é vetado e o que já foi aprovado. É o que separa este estilo do visual genérico de IA |
| `references/copy-contrato.md` | Ao receber a copy, antes de escrever a primeira seção |
| `references/blocagem.md` | Na hora de planejar as dobras, antes de codar |
| `references/direcao-visual.md` | Ao montar tokens, extrair do Figma ou definir tipografia |
| `references/conceitos-por-dobra.md` | Ao inventar o conceito de cada seção |
| `references/mecanismos.md` | Quando souber o que a seção precisa dizer mas não como mostrar |
| `references/animacao.md` | **Antes de escrever a primeira linha de animação.** Os quatro padrões |
| `references/armadilhas.md` | Antes de depurar qualquer coisa que "deveria funcionar" |
| `references/assets-gerados.md` | Só quando faltar imagem que não dá para resolver em HTML |
| `references/revisao-e-gates.md` | Ao fechar cada rodada |
| `stacks/next-tailwind-gsap.md` | Se o projeto for Next + Tailwind + GSAP: o código colável |
| `assets/pipeline-issues.md` | Para abrir as tarefas do projeto num board |

## A regra de ouro

Cada seção precisa de um **conceito nomeável em uma frase**. "O placar dos dois
caminhos", "a pilha que pousa", "a janela que troca de ferramenta sozinha". Se
não dá para nomear a cena, ainda é repaginação disfarçada — e o cliente vai
perceber antes de você.

## Fase 0 — Fundações

Antes de qualquer pixel:

1. **Ficha do projeto.** Quem pediu, para que serve em uma frase, qual o público,
   e o que não é óbvio (armadilhas de quem for mexer depois). Se "para que serve"
   precisa de duas frases, provavelmente são dois projetos. Template em
   `assets/ficha-template.md`.
2. **Contrato de copy.** Identificar a fonte canônica e congelá-la. Nenhuma
   palavra, acento, número, caixa ou ordem muda — nem para melhorar. Hierarquia,
   agrupamento e ênfase visual, sim. Ver `references/copy-contrato.md`.
3. **Tokens antes de componentes.** Uma cor de marca e seus derivados, superfícies
   claras e escuras, semânticos escassos, raios, sombras, easings — tudo num
   arquivo escopado por classe, para não vazar para o resto do projeto. Partir de
   `assets/tokens-template.css`.
4. **Ritmo de superfícies.** Mapear as dobras na jornada emocional e atribuir tom:
   escuro nos picos (problema, armadilha, oferta, fechamento), claro nos respiros
   (mecanismo, prova, qualificação, garantia). O contraste entre seções é parte da
   sensação de progresso.

## Fase 1 — Blocagem

Traduzir a copy crua numa tabela antes de escrever componente: dobra → função
narrativa → componente → ato claro/escuro → blocagem do layout → motion → assets.
Uma linha por dobra, o conceito nomeado em cada uma.

É a fase mais barata de errar e a que mais economiza rodada. Template em
`assets/blocagem-template.md`, critérios em `references/blocagem.md`.

## Fase 2 — Direção visual

Se houver Figma, **classificar o papel dele antes de extrair**: página desenhada
pede tradução de layout; direção visual (paleta, marca, ícones, sem página) pede
só três coisas — paleta exata, assets exportáveis e frames renderizados como
moodboard. Extrair a árvore de nós de um arquivo de direção visual é trabalho
jogado fora. Ver `references/direcao-visual.md`.

Se não houver Figma, a direção nasce de referências coletadas e vira token do
mesmo jeito. O que não pode é nascer no meio da implementação, seção a seção.

## Fase 3 — Reimaginação seção a seção

Uma seção por vez, cada uma com seu conceito nomeado. Consultar
`references/conceitos-por-dobra.md` para o tipo de conceito que serve a cada
função narrativa, e `references/mecanismos.md` para o catálogo de soluções já
aprovadas.

Duas regras que definem o estilo, ambas em `references/animacao.md`:

- **Interface no lugar de imagem.** Produto se mostra como janela de app com barra
  de título e conteúdo abstrato — skeleton bars, chips, avatares. Nunca screenshot
  recortado, nunca número ou microcopy inventada dentro do mockup.
- **GSAP faz entrada, CSS faz loop.** Loops nascem pausados e só ligam quando a
  seção entra em cena, uma vez. Custo zero fora da viewport e fallback estático
  trivial.

Escalar com subagentes quando houver mais de seis seções: um agente por arquivo,
briefing autocontido (copy canônica, duas seções aprovadas como referência de
vocabulário, tokens, conceito, tom, regras técnicas), um commit por seção. Sem
interseção de arquivos, não há conflito.

## Fase 4 — Verificação

Nunca rodar build com o dev server aberto. Fora isso, a cada rodada:
typecheck, lint, testes de contrato, build do artefato, verificador de copy, e
**olhar os prints** em várias larguras — medição não substitui ver a página.
`node scripts/audit-viewports.mjs <url>` produz os dois: relatório de overflow e
um print por seção. Detalhes em `references/revisao-e-gates.md`.

Contrato executável: `node scripts/verify-copy-contract.mjs <artefato> <contratos.json>`
falha o build se uma frase da copy sumir ou se a contagem de CTAs mudar.

## Fase 5 — Registro e publicação

Changelog no mesmo commit, com as regras novas que a rodada descobriu. Decisão
difícil de reverter vira registro de decisão datado, citando o pedido literal.
Publicação com rastreabilidade: repositório, branch, SHA, comando de build — o
artefato publicado nunca é editado à mão, porque a próxima geração apaga a edição
sem avisar.

## Checklist de execução

1. Ficha preenchida, uma frase de propósito
2. Copy congelada e contratos escolhidos (uma frase literal por dobra)
3. Tokens escopados, ritmo de superfícies definido
4. Blocagem em tabela, conceito nomeado em cada dobra
5. Direção visual extraída e moodboard à mão
6. `references/taste.md` lido antes do primeiro conceito
7. Seções implementadas, um commit cada
8. Gates verdes e prints revisados em 320 / 375 / 768 / 1280
9. Rodada de feedback registrada, aprovações congeladas
10. Publicação rastreável

## O que esta skill não faz

- Não escreve copy. A copy chega pronta e é inviolável.
- Não faz deck de slides — isso é `slides-scrollytelling`.
- Não traduz layout do Figma pixel a pixel — isso é `figma-translate`.
- Não decide oferta, preço ou posicionamento.

## Limitações conhecidas

- O método produz páginas **pesadas**: muitas seções com mockup em HTML e SVG
  inline. A `/ref` ficou em 93 de performance no desktop e 54 no mobile sem
  compressão. Tangibilização custa peso — é uma troca consciente, e vale medir
  cedo se o público for majoritariamente móvel.
- O pipeline de geração de imagem descrito em `references/assets-gerados.md`
  nunca foi executado num projeto real. O caminho comprovado é mockup em HTML.
- O gosto registrado em `references/taste.md` é de um cliente específico. Serve
  de ponto de partida e de exemplo de como capturar gosto — não de lei universal.
