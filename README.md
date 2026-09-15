# scrollytelling-method

Uma skill do [Claude Code](https://claude.com/claude-code) que transforma copy de
página de vendas em landing com scrollytelling — o método, o gosto e as
armadilhas, destilados de duas páginas que existem em produção.

Não é um tema visual nem um pacote de componentes. É um processo com contratos
verificáveis: a copy vira contrato executável, cada seção ganha um conceito
nomeável, a animação segue quatro padrões conhecidos, e um script recusa o build
quando alguma frase da copy desaparece.

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

Basta pedir. A skill dispara sozinha em conversas como *"transforma essa copy em
página"*, *"reimagina essa landing"*, *"página de vendas com scrollytelling"*.

Para conduzir manualmente, o caminho é o do `SKILL.md`: ficha → contrato de copy
→ tokens → blocagem → direção visual → uma seção por vez → gates → publicação.

## O que tem dentro

| | |
|---|---|
| `SKILL.md` | o método em seis fases; ponto de entrada |
| `references/taste.md` | **template vazio** + as lições de ofício que se repetem em todo projeto (ver abaixo) |
| `references/mecanismos.md` | catálogo de problema narrativo → solução visual |
| `references/animacao.md` | os quatro padrões de movimento |
| `references/armadilhas.md` | o que custou tempo real, para não custar de novo |
| `references/copy-contrato.md` | como a copy vira contrato verificável |
| `references/direcao-visual.md` | extração do Figma, tokens, tipografia |
| `stacks/next-tailwind-gsap.md` | código colável para quem está nessa stack |
| `assets/pipeline-issues.md` | o projeto inteiro em issues prontas para colar |
| `scripts/` | auditoria por viewport e verificador de contrato de copy |

O método é agnóstico de framework; só o arquivo em `stacks/` assume uma stack
específica. Quem usa Astro, Vue, Svelte ou HTML puro aproveita todo o resto.

## Sobre o `taste.md` vazio

Na versão interna desta skill, `references/taste.md` é o arquivo mais valioso:
os vetos estéticos de um cliente real, cada um com a citação literal de quem
reprovou e o motivo. É o que nenhum modelo tem sozinho.

Aqui ele vem vazio **de propósito**. Gosto é de um cliente específico e não se
transporta; o que se transporta é a **estrutura de capturá-lo**, que está no
arquivo, junto de uma dúzia de lições de ofício que apareceram em todos os
projetos e podem ser adotadas antes da primeira conversa.

Preencher esse arquivo com o seu cliente é a parte que faz diferença. O resto do
método funciona sem ele; o resultado, não.

## Manual em página

`manual.html` abre no navegador e traz o método inteiro em formato de consulta:
as seis fases, o catálogo de mecanismos, a paleta e a escala tipográfica
renderizadas, e as 21 issues do pipeline com botão de copiar.

## Requisitos dos scripts

Os dois scripts em `scripts/` usam Node 18+. O `audit-viewports.mjs` precisa de
[Playwright](https://playwright.dev) instalado no projeto onde roda. O
`verify-copy-contract.mjs` não tem dependência.

## Linhagem

Quatro páginas de venda em produção, cada uma incorporando o que a anterior
aprendeu na prática. A última delas foi construída em seis rodadas num único
dia, e boa parte do que está escrito aqui existe porque alguma dessas rodadas
custou caro.

## Licença

MIT.
