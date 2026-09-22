# scrollytelling-method

Skill do [Claude Code](https://claude.com/claude-code) que transforma uma copy
aprovada em **telas**. Da copy à peça final.

**A tese.** Toda narrativa comercial é uma sequência de unidades. Cada unidade
carrega **um conceito nomeável em uma frase**. O conceito é aprovado **como
imagem antes de virar execução**. A copy é inviolável. Quem segue essa ordem
entrega narrativa; quem pula entrega repaginação com cor nova.

Não é tema visual nem biblioteca de componentes. É o processo.

## O formato decide três coisas

A unidade, o eixo do tempo e a proporção da imagem. O resto do método não muda.

| formato | a unidade | o eixo do tempo | proporção | a peça final |
|---|---|---|---|---|
| landing, página de vendas | a dobra | o scroll | 16:9 (+ 9:16 no mobile) | HTML/CSS, Next |
| deck, apresentação | o slide | o avanço | 16:9 | `.pptx`, PDF, HTML/Next, Figma pelo MCP |
| carrossel de social | o card | o swipe | 1:1 ou 4:5 | PNG em sequência |
| story, reels estático | a peça | — | 9:16 | PNG |
| criativo de feed | a peça | — | 1:1 ou 4:5 | PNG (CSS → export) ou Figma pelo MCP |
| UI de produto | a tela ou o estado | a interação | a do dispositivo | código ou Figma pelo MCP |

## Você prepara duas coisas

```text
meu-projeto/
├─ projeto.md              formato, unidade, proporção, arquivo final, prazo
├─ copy/copy.md            a copy aprovada, um título por bloco
├─ direcao-visual.md       a direção a seguir — ou a matéria-prima dela
└─ referencias/            imagens, prints, pesquisa, moodboard
```

A direção visual chega **na fidelidade que você tiver**: texto, imagens,
pesquisa, um Figma, ou nada. A skill converte qualquer uma dessas entradas no
mesmo documento escrito — com nome, paleta em hex, o que não entra e o prefixo
de prompt colável — e devolve como apresentação, enxuta ou elaborada conforme
o prazo.

Aí é só pedir: *"roda a skill nesse projeto"*.

## O fluxo

| passo | o que produz | quem faz |
|---|---|---|
| **0 · Direção** | `direcao-visual.md` com nome e prefixo comum | você prepara, a skill reescreve |
| **1 · Blocagem** | `blocagem.md` — texto **e** composição, juntos | a skill |
| **2 · Prompts** | um prompt de imagem por unidade, na proporção do formato | a skill |
| **3 · Imagens e veredito** | as imagens e o `veredito.md` de cada unidade | **você** |
| **4 · Wireframe** | camadas 1–3: fundo, estrutura, texto no lugar | a skill |
| **5 · Layout** | camadas 4–7: estilo, cor, mockup, movimento | a skill |
| **6 · Peça final** | a exportação no formato do `projeto.md` | a skill |

E a skill cria, por unidade:

```text
secoes/01-<slug>/
├─ prompt-v1.md            versão nova nasce ao lado, nunca por cima
├─ imagem-v1-<modelo>.png  ← você gera e salva aqui
├─ veredito.md             aprovada | refazer: … | usar parte: …
└─ camadas.md              wireframe (1–3) e layout (4–7)
```

Dois cortes fazem o método funcionar. **A imagem decide composição e
dispositivo; o código decide texto, token, semântica e movimento** — pensar os
dois juntos produz wireframe com cor. E **a blocagem nunca trata a unidade
como só texto**: copy densa tenta você a resolver a disposição e encaixar
imagem depois, e o resultado é uma peça que já nasceu sem lugar para a cena.

## As regras que definem o estilo

- **Conceito nomeável por unidade.** Se não dá para nomear a cena, ela não foi
  pensada. Se não dá para desenhar, não dá para implementar.
- **Interface quando a copy tem objeto reconhecível.** A pergunta não é "o
  produto tem software?", é "a copy tem um lugar onde a promessa acontece?".
  Se tem, esse objeto vira mockup com anatomia real e **mock data plausível**.
  Se não tem, diagrama conceitual.
- **O limite do mockup é a afirmação, não o número.** Nada que se leia como
  prova de resultado; nenhum número sai da tela para o texto.
- **Quando há movimento:** a biblioteca faz entrada e scrub, o CSS faz os
  loops — pausados até a unidade entrar em cena, com estado final definido
  antes de animar.
- **A copy não muda uma palavra.** Mudam hierarquia, agrupamento e ênfase.
- **Token-first.** Cor, tipo, raio, easing e duração saem de tokens escopados.

## Como instalar

```bash
git clone https://github.com/merencianno/scrollytelling-method.git ~/src/scrollytelling-method
ln -s ~/src/scrollytelling-method ~/.claude/skills/scrollytelling-method
```

Para um projeto só, troque `~/.claude/skills/` por `<projeto>/.claude/skills/`.
Reinicie a sessão depois de instalar. Funciona em qualquer ferramenta que leia
o formato: é markdown, e `SKILL.md` é o ponto de entrada.

**Se você não programa e só vai aprovar as ideias**, o seu arquivo é
[`GUIA-IMAGENS.md`](GUIA-IMAGENS.md): como gerar a imagem de cada unidade, onde
salvar, como dar o veredito e como pedir versões até ficar satisfeito.

## O que tem dentro

| | |
|---|---|
| `SKILL.md` | o método em seis passos; ponto de entrada |
| `GUIA-IMAGENS.md` | o passo a passo de quem aprova as ideias |
| `references/imagem-conceito.md` | o prompt por unidade, o double-check e o veredito |
| `references/camadas.md` | a ficha de 7 camadas: wireframe e layout |
| `references/direcao-visual.md` | escrever a direção quando não existe; extrair quando existe |
| `references/blocagem.md` · `conceitos-por-dobra.md` · `mecanismos.md` | planejar as unidades e escolher o conceito de cada uma |
| `references/animacao.md` | os cinco padrões de movimento |
| `references/copy-contrato.md` | como congelar a copy e o que o mockup não pode afirmar |
| `references/orquestracao.md` | uma unidade por vez, átomos antes do lote, o prompt do subagente |
| `references/revisao-por-audio.md` | transcrever antes de decidir; o grill de perguntas |
| `references/medicao.md` | medir protótipo, cor, tracejado e escala tipográfica |
| `references/armadilhas.md` | o que custou tempo real, para não custar de novo |
| `references/taste.md` | template do gosto do seu cliente + as lições que se repetem |
| `stacks/next-tailwind-gsap.md` | o único arquivo que assume uma stack: código colável |
| `assets/` | os templates: `projeto-template.md`, direção, blocagem, prompt de unidade, camadas, subagente, tokens |

## O que fica fora

A skill vai da copy à peça final. Build, teste automatizado, gate de
publicação e deploy não são assunto dela.

Para quem leva uma peça **web** a produção, os arquivos continuam aqui:
`references/revisao-e-gates.md`, `references/publicacao.md` e os quatro
scripts em `scripts/` (contrato de copy, contrato de geometria, print por
unidade, auditoria de larguras). Para carrossel, criativo ou deck, nada disso
se aplica.

## Licença

MIT.
