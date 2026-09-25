# scrollytelling-method

Skill do [Claude Code](https://claude.com/claude-code) que transforma uma copy
aprovada em **telas**. Da copy à peça final.

**A tese.** Toda narrativa comercial é uma sequência de unidades. Cada unidade
carrega **um conceito nomeável em uma frase**. O conceito é escolhido **em
texto, com esboço ASCII**, e aprovado **como imagem antes de virar
execução**. A copy é inviolável. Quem segue essa ordem
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
└─ pecas/<peça>/
   ├─ projeto.md           formato, unidade, proporção, arquivo final, prazo
   ├─ copy/copy.md         a copy aprovada, um título por bloco
   ├─ direcao-visual.md    a direção a seguir — ou a matéria-prima dela
   └─ referencias/         imagens, prints, pesquisa, moodboard
```

Uma pasta por peça. É a mesma árvore do kit de projeto novo
(`assets/sdd-kit/`), que acrescenta em volta a camada do projeto: `CLAUDE.md`,
`docs/sdd/` (log de pedidos, gestão, specs, checkpoints), `briefing/` e
`marca/`.

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
| **2 · Ideias em texto** | 3–5 ideias por unidade com esboço ASCII e uma recomendação | a skill propõe, **você escolhe** (portão 1) |
| **3 · Prompts** | um prompt de imagem por ideia escolhida, na proporção do formato | a skill |
| **4 · Imagens e veredito** | as imagens e o `veredito.md` de cada unidade | **você** (ou o agente, por MCP) gera; **você aprova** (portão 2) |
| **5 · Wireframe** | camadas 1–3: fundo, estrutura, texto no lugar | a skill |
| **6 · Layout** | camadas 4–7: estilo, cor, mockup, movimento | a skill |
| **7 · Refinamento e revisão** | a peça fiel à imagem, a copy conferida, as aprovações congeladas | a skill refina, **você revisa** |
| **8 · Peça final** | a exportação no formato do `projeto.md` | a skill, **quando você declara pronto** (portão 3) |

**Três portões, todos seus: qual ideia, qual imagem, está pronta.** O resto é
trabalho da máquina. Imagem só das ideias escolhidas, no máximo duas gerações
por ideia; recusada duas vezes, volta ao texto.

**Nada se exporta antes do passo 7** — depois dele o custo de mudar multiplica.
São dois loops: o refinamento é você conferindo o próprio resultado (print ao
lado da imagem-conceito, copy literal, medida em vez de estimativa); a revisão
é quem aprova vendo a peça ao vivo, uma unidade por vez. É na revisão que o
`taste.md` da peça se preenche, e é o que faz a próxima peça começar melhor.

E a skill cria, por unidade:

```text
pecas/<peça>/secoes/01-<slug>/
├─ ideias.md                       3–5 ideias em texto com esboço ASCII; levas datadas
├─ prompt-v1.md                    versão nova nasce ao lado, nunca por cima
├─ ideia-v1-<modelo>.png           ← gerada pelo prompt 1 e salva aqui
├─ ideia-v1-aprovada-<modelo>.png  a escolhida, renomeada; as outras ficam ao lado
├─ veredito.md                     log datado: escolha da ideia, veredito da imagem
└─ camadas.md                      wireframe (1–3) e layout (4–7)
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

O repositório é público; basta `git`:

```bash
git clone https://github.com/merencianno/scrollytelling-method.git ~/.claude/skills/scrollytelling-method
```

- **Atualizar:** `git -C ~/.claude/skills/scrollytelling-method pull`.
- **Descoberta:** a sessão do Claude Code só enxerga skill nova ao reiniciar
  (sessão nova ou `claude --continue`). Sem reiniciar, peça ao agente que leia
  `SKILL.md` e os arquivos citados direto do disco.
- **Só num projeto:** troque `~/.claude/skills/` por `<projeto>/.claude/skills/`.
- **Imagens-conceito versionadas:** `git lfs install` antes de clonar o projeto.

Funciona em qualquer ferramenta que leia o formato: é markdown, e `SKILL.md` é
o ponto de entrada.

**Se você não programa e só vai aprovar as ideias**, o seu arquivo é
[`GUIA-IMAGENS.md`](GUIA-IMAGENS.md): como escolher entre as ideias em texto,
gerar a imagem de cada unidade, onde salvar, como dar o veredito e como pedir
versões até ficar satisfeito.

## Projeto novo

**O jeito mais curto:** copie [`INICIAR-PROJETO.md`](INICIAR-PROJETO.md) para
a pasta do projeto novo, abra o Claude Code nela e diga *"leia
INICIAR-PROJETO.md e comece"*. Ele instala a skill, monta a estrutura, pede
a copy, os formatos, o briefing e a direção visual, **um de cada vez**, e
depois conduz ideias em ASCII → prompts de imagem → veredito → peça final.

Alternativa: abra o Claude Code na pasta do projeto e cole o bloco de
[`assets/prompt-novo-projeto.md`](assets/prompt-novo-projeto.md), com as seis
linhas do fim preenchidas. O agente instala a skill, segue
[`references/bootstrap.md`](references/bootstrap.md) (intake de uma vez, grill
numa leva só), copia [`assets/sdd-kit/`](assets/sdd-kit/) para montar o
projeto e conduz os três portões. Nas sessões seguintes, cola-se o bloco mais
recente de `docs/sdd/PROMPT-RETOMADA.md` do projeto; para trocar de chat, o
kit traz a skill de projeto `/ctxt-full`.

## Skills companheiras

Nenhuma é obrigatória; a skill diz quais faltam sem travar.

| skill | o que a scrollytelling espera dela | onde instalar | obrigatória? |
|---|---|---|---|
| `tangibilizacao-css` | mini-UIs 100% CSS quando a copy tem objeto reconhecível | viaja em `companions/`; `ln -s ~/.claude/skills/scrollytelling-method/companions/tangibilizacao-css ~/.claude/skills/` | não |
| `impeccable` | auditoria e polish de UI no refinamento | upstream `pbakaus/impeccable` (Apache 2.0, versão testada 4.1.1), conforme o README dele; não vendorizada | não — sem ela, `taste.md` e o refinamento cobrem o piso |
| MCP de geração de imagem (Magnific, Higgsfield…) | o agente gera as imagens-conceito | configuração do Claude Code | não — sem ele, o dono gera no navegador |
| `git lfs` | versionar as imagens-conceito | sistema | só se versionar imagens |

Detalhe em [`companions/README.md`](companions/README.md).

## O que tem dentro

| | |
|---|---|
| `SKILL.md` | o método em nove passos e três portões; ponto de entrada |
| `GUIA-IMAGENS.md` | o passo a passo de quem aprova as ideias: escolher, gerar, salvar, veredito |
| `references/principios-de-trabalho.md` | a conduta do agente em qualquer cliente: portões, log literal, decidir o óbvio, anotar não é fazer |
| `references/bootstrap.md` | projeto novo, máquina nova: instalação, intake, grill, estrutura, o que registrar onde |
| `references/ideias-ascii.md` | 3–5 ideias em texto com esboço ASCII por unidade, antes de qualquer imagem |
| `references/imagem-conceito.md` | o prompt só das ideias escolhidas, o double-check, o bake-off de modelos e o veredito datado |
| `references/camadas.md` | a ficha de 7 camadas: wireframe e layout |
| `references/direcao-visual.md` | escrever a direção quando não existe; extrair quando existe |
| `references/blocagem.md` · `conceitos-por-dobra.md` · `mecanismos.md` | planejar as unidades e escolher o conceito de cada uma |
| `references/animacao.md` | os cinco padrões de movimento |
| `references/copy-contrato.md` | como congelar a copy e o que o mockup não pode afirmar |
| `references/orquestracao.md` | uma unidade por vez, átomos antes do lote, o prompt do subagente |
| `references/revisao-por-audio.md` | transcrever antes de decidir; o grill de perguntas |
| `references/medicao.md` | medir protótipo, cor, tracejado e escala tipográfica antes de dizer que está pronto |
| `references/armadilhas.md` | o que custou tempo real, para não custar de novo |
| `references/taste.md` | o sistema de escopo, as lições de ofício que se repetem e como capturar o gosto do seu cliente |
| `stacks/next-tailwind-gsap.md` | o único arquivo que assume uma stack: código colável |
| `assets/` | os templates: `projeto-template.md`, direção, blocagem, prompt de unidade, briefing de ideação, camadas, subagente, checkpoint, tokens |
| `assets/sdd-kit/` | o esqueleto do projeto novo: `CLAUDE.md`, `docs/sdd/` (log, changelog, gestão, specs, checkpoint, retomada), `pecas/_modelo/`, `/ctxt-full` |
| `INICIAR-PROJETO.md` | a ordem de serviço do projeto novo: copiar para a pasta e mandar ler |
| `assets/prompt-novo-projeto.md` | o prompt colável que instala a skill e conduz o projeto novo |
| `companions/` | skills companheiras que viajam junto (`tangibilizacao-css`) |

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
