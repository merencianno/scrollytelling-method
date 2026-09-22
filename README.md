# scrollytelling-method

Uma skill do [Claude Code](https://claude.com/claude-code) que transforma copy de
página de vendas em landing com scrollytelling — o método, o gosto e as
armadilhas, destilados de quatro páginas que existem em produção.

Não é um tema visual nem um pacote de componentes. É um processo com contratos
verificáveis: a copy vira contrato executável, cada seção ganha um conceito
nomeável que é **aprovado como imagem antes de virar código**, a animação segue
cinco padrões conhecidos, e três scripts recusam o build quando uma frase da
copy desaparece, quando a geometria foge do combinado ou quando uma dobra
estoura a largura.

## Instalação

```bash
git clone https://github.com/merencianno/scrollytelling-method.git
cp -R scrollytelling-method ~/.claude/skills/
```

Ou, para acompanhar as atualizações do repositório:

```bash
git clone https://github.com/merencianno/scrollytelling-method.git ~/src/scrollytelling-method
ln -s ~/src/scrollytelling-method ~/.claude/skills/scrollytelling-method
```

Para instalar só num projeto, troque `~/.claude/skills/` por
`<projeto>/.claude/skills/`. Reinicie a sessão do Claude Code depois de copiar.

Funciona também em qualquer ferramenta que leia o formato: o conteúdo é markdown,
e `SKILL.md` é o ponto de entrada.

## Como usar

**Se você não programa e quer só aprovar as ideias das seções**, leia
[`GUIA-IMAGENS.md`](GUIA-IMAGENS.md): é o passo a passo de gerar as imagens
(à mão no navegador ou com o gerador que você tiver ligado ao Claude), salvar
na pasta certa, dar o veredito e pedir versões até ficar satisfeito.

Para o resto, basta pedir. A skill dispara sozinha em conversas como
*"transforma essa copy em página"*, *"reimagina essa landing"*, *"página de
vendas com scrollytelling"*.

Para conduzir manualmente, o caminho é o do `SKILL.md`: ficha → contrato de copy
→ tokens → direção visual escrita → blocagem → imagem-conceito por seção →
camadas → uma seção por vez → gates → publicação.

## O que tem dentro

| | |
|---|---|
| `SKILL.md` | o método em fases (0 · 0.5 · 1 · 1.5a · 1.5b · 3 · 4 · 5); ponto de entrada |
| `GUIA-IMAGENS.md` | o passo a passo de quem aprova as ideias e não programa |
| `references/taste.md` | **template vazio** + as lições de ofício que se repetem em todo projeto (ver abaixo) |
| `references/imagem-conceito.md` | a ideia antes do código: um prompt por seção, imagem 16:9 aprovada pelo cliente |
| `references/camadas.md` | a ficha de 7 camadas que faz a ponte entre imagem e código |
| `references/orquestracao.md` | uma seção por vez, átomos antes do loop, o template do subagente |
| `references/revisao-por-audio.md` | transcrever antes de decidir; o grill de perguntas |
| `references/medicao.md` | como medir protótipo, cor, tracejado e escala tipográfica antes de dizer que está pronto |
| `references/conceitos-por-dobra.md` | conceito por função narrativa; a árvore "qual tela o item pede" |
| `references/mecanismos.md` | catálogo de problema narrativo → solução visual |
| `references/animacao.md` | os cinco padrões de movimento e o limite de falha do motor |
| `references/armadilhas.md` | o que custou tempo real, para não custar de novo |
| `references/copy-contrato.md` | como a copy vira contrato verificável; o limite do mockup é a afirmação |
| `references/direcao-visual.md` | escrever a direção quando não existe; extrair quando existe |
| `references/blocagem.md` · `revisao-e-gates.md` · `assets-gerados.md` | planejar as dobras, fechar a rodada, gerar o asset que falta |
| `references/publicacao.md` | o que só o artefato de produção revela |
| `stacks/next-tailwind-gsap.md` | código colável para quem está nessa stack |
| `assets/` | templates de ficha, direção, blocagem, prompt de seção, briefing de ideação, camadas, prompt de subagente, checkpoint, sessão, contratos, tokens |
| `scripts/` | auditoria por viewport, contrato de copy, contrato de geometria e print por dobra |

O método é agnóstico de framework; só o arquivo em `stacks/` assume uma stack
específica. Quem usa Astro, Vue, Svelte ou HTML puro aproveita todo o resto.

## Sobre o `taste.md` vazio

Na versão interna desta skill, `references/taste.md` é o arquivo mais valioso:
os vetos estéticos de um cliente real, cada um com a citação literal de quem
reprovou e o motivo. É o que nenhum modelo tem sozinho.

Aqui as duas seções de projeto vêm vazias **de propósito**. Gosto é de um
cliente específico e não se transporta; o que se transporta é a **estrutura de
capturá-lo** — incluindo o sistema de prefixos de escopo, que é o que impede
tratar decisão de um projeto só como lei universal — e as lições de ofício que
apareceram em todos os projetos, que já vêm escritas.

Preencher esse arquivo com o seu cliente é a parte que faz diferença. O resto do
método funciona sem ele; o resultado, não.

## Manual em página

`manual.html` abre no navegador e traz o método na versão de seis fases, em
formato de consulta: as fases, o catálogo de mecanismos, a paleta e a escala
tipográfica renderizadas, e as 21 issues do pipeline com botão de copiar. As
fases 0.5 e 1.5, a orquestração e a publicação são posteriores a ele e vivem
só no `SKILL.md` e em `references/`.

## Requisitos dos scripts

Os scripts em `scripts/` usam Node 18+. `audit-viewports.mjs`,
`verify-fidelidade.mjs` e `shoot-dobra.mjs` precisam de
[Playwright](https://playwright.dev) instalado no projeto onde rodam (rode-os
de dentro do projeto). `verify-copy-contract.mjs` não tem dependência.

## Linhagem

Quatro páginas de venda em produção, cada uma incorporando o que a anterior
aprendeu na prática: uma VSL (`/ref-vsl`), uma página de produto de software
(`/ref`, seis versões num único dia), e dois funis de expert — o primeiro
trouxe a direção visual escrita antes da blocagem e as regras de publicação
(`/ref-funil-a`), o segundo trouxe a imagem-conceito por seção, a ficha de
camadas, a revisão por áudio e a orquestração "uma seção por vez"
(`/ref-funil-b`), em três sessões e quinze áudios de revisão.

Boa parte do que está escrito aqui existe porque alguma dessas rodadas custou
caro.

## Licença

MIT.
