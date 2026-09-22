# scrollytelling-method

Skill do [Claude Code](https://claude.com/claude-code) que transforma uma copy
aprovada em interface que se conta sozinha.

**A tese.** Toda narrativa comercial é uma sequência de unidades. Cada unidade
carrega **um conceito nomeável em uma frase**. O conceito é aprovado **como
imagem antes de virar execução**. A copy é contrato congelado, verificado por
script. Quem segue essa ordem entrega narrativa; quem pula entrega repaginação
com cor nova.

Não é tema visual nem biblioteca de componentes. É o processo, com contratos
que o build reprova.

## O que dá para construir

O eixo do tempo muda; o método não.

| o que | a unidade | o eixo do tempo |
|---|---|---|
| página de vendas, landing | a dobra | o scroll |
| apresentação, deck | o slide | o avanço |
| carrossel de social | o card | o swipe |
| criativo estático | a peça | não existe: resolve-se em composição |
| UI de produto | a tela ou o estado | a interação de quem usa |

Páginas de venda são o caso de origem e o que está executado em produção; os
demais formatos seguem o mesmo mapeamento.

## O método

| fase | o que produz |
|---|---|
| **0 · Fundações** | ficha do projeto; copy congelada em `contratos.json`; tokens escopados; ritmo de superfícies como string |
| **0.5 · Direção visual** | direção **escrita**, com nome, paleta em hex, o que não entra e o prefixo de prompt colável |
| **1 · Blocagem** | uma linha por unidade: função narrativa → conceito → componente → ato → layout → motion → assets |
| **1.5a · Imagem-conceito** | uma imagem 16:9 por unidade, gerada por prompt, com veredito do cliente antes de qualquer código |
| **1.5b · Camadas** | ficha de 7 camadas por unidade aprovada: fundo → seção → textos → estilo → cores → mockups → animações |
| **3 · Implementação** | uma unidade por vez, em subagente de contexto limpo, um commit cada |
| **4 · Verificação** | typecheck, contratos, print por unidade, auditoria de larguras, prova de carga fria |
| **5 · Registro e publicação** | artefato rastreável, gate herdado, comparação com o que já está no ar |
| **6 · Fechamento** | exportação no formato do entregável: artefato web, `.pptx`/PDF, sequência de PNG, arquivo de imagem ou handoff |

O projeto entra na Fase 0.5 como **copy + direção visual livre** — texto,
imagens, pesquisa, um Figma ou nada. A fase converte qualquer uma dessas
entradas no mesmo documento escrito, e o devolve como apresentação: enxuta ou
elaborada, conforme o prazo. Sob prazo curto cortam-se **versões, nunca
fases**.

Entre 1.5a e 1.5b está o corte que faz o método funcionar: **a imagem decide
composição e dispositivo; o código decide texto, token, semântica e
movimento.** Pensar os dois juntos produz wireframe com cor.

## As regras que definem o estilo

- **Conceito nomeável por unidade.** Se não dá para nomear a cena, ela não foi
  pensada. Se não dá para desenhar, não dá para implementar.
- **Interface quando a copy tem objeto reconhecível.** A pergunta não é "o
  produto tem software?", é "a copy tem um lugar onde a promessa acontece?".
  Se tem, esse objeto vira mockup com anatomia real e **mock data plausível**.
  Se não tem, diagrama conceitual.
- **O limite do mockup é a afirmação, não o número.** Nada que se leia como
  prova de resultado; nenhum número sai da tela para o texto.
- **A biblioteca de animação faz entrada e scrub; o CSS faz todos os loops** —
  pausados até a unidade entrar em cena. Fora da viewport, custo zero.
- **Cada unidade entrega um mecanismo vivo** ligado ao que a copy diz, com
  estado final definido antes de animar.
- **A copy não muda uma palavra.** Mudam hierarquia, agrupamento e ênfase.
- **Token-first.** Cor, tipo, raio, easing e duração saem de tokens escopados.

## Os contratos executáveis

| comando | reprova quando |
|---|---|
| `verify-copy-contract.mjs <artefato> <contratos.json>` | uma frase da copy sumiu, ou a contagem de CTAs mudou |
| `verify-fidelidade.mjs <url> <contrato.json>` | a geometria divergiu do combinado (largura, altura, escala tipográfica, folga) |
| `audit-viewports.mjs <url>` | há overflow horizontal em 320 / 375 / 768 / 1280 |
| `shoot-dobra.mjs <url> <seletor> [largura]` | print da unidade sem reiniciar a animação, com `pageerror` junto |

## Como usar

```bash
git clone https://github.com/merencianno/scrollytelling-method.git ~/src/scrollytelling-method
ln -s ~/src/scrollytelling-method ~/.claude/skills/scrollytelling-method
```

Para um projeto só, troque `~/.claude/skills/` por `<projeto>/.claude/skills/`.
Reinicie a sessão depois de instalar. Funciona em qualquer ferramenta que leia
o formato: é markdown, e `SKILL.md` é o ponto de entrada.

A skill dispara sozinha em pedidos como *"transforma essa copy em página"*,
*"reimagina essa landing"*, *"tangibiliza essa copy"*.

**Se você não programa e só vai aprovar as ideias**, o seu arquivo é
[`GUIA-IMAGENS.md`](GUIA-IMAGENS.md): como gerar a imagem de cada unidade,
onde salvar, como dar o veredito e como pedir versões até ficar satisfeito.

## O que tem dentro

| | |
|---|---|
| `SKILL.md` | o método em fases; ponto de entrada |
| `GUIA-IMAGENS.md` | o passo a passo de quem aprova as ideias |
| `references/imagem-conceito.md` | o prompt por unidade, o double-check e o veredito |
| `references/camadas.md` | a ficha de 7 camadas, da imagem ao código |
| `references/direcao-visual.md` | escrever a direção quando não existe; extrair quando existe |
| `references/blocagem.md` · `conceitos-por-dobra.md` · `mecanismos.md` | planejar as unidades e escolher o conceito de cada uma |
| `references/animacao.md` | os cinco padrões de movimento e o limite de falha do motor |
| `references/copy-contrato.md` | como a copy vira contrato verificável |
| `references/orquestracao.md` | uma unidade por vez, átomos antes do lote, o prompt do subagente |
| `references/revisao-por-audio.md` | transcrever antes de decidir; o grill de perguntas |
| `references/medicao.md` | medir protótipo, cor, tracejado e escala tipográfica |
| `references/armadilhas.md` · `revisao-e-gates.md` · `publicacao.md` | depurar, fechar a rodada, publicar |
| `references/taste.md` | template do gosto do seu cliente + as lições que se repetem em todo projeto |
| `stacks/next-tailwind-gsap.md` | o único arquivo que assume uma stack: código colável |
| `assets/` | doze templates: ficha, direção, blocagem, prompt de unidade, camadas, subagente, checkpoint, contratos, tokens |
| `scripts/` | os quatro contratos executáveis (Node 18+; três pedem Playwright no projeto) |
| `manual.html` | o método em página de consulta, na versão de seis fases |

## Licença

MIT.
