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

A landing é o caso provado, não o limite: o método organiza **qualquer
narrativa quebrada em unidades** — deck, carrossel, criativo, tela de produto.
Ver [Serve para qualquer coisa com narrativa](#serve-para-qualquer-coisa-com-narrativa).

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

## Serve para qualquer coisa com narrativa

O método foi destilado de páginas de venda e é nelas que está provado. Mas o
que ele organiza não é scroll — é **uma narrativa quebrada em unidades, cada
unidade com um conceito nomeável, aprovada como imagem antes de virar
execução**. A página é um caso; o eixo do tempo é que muda.

> **Honestidade sobre o que está testado:** as quatro páginas da linhagem são
> web. Os outros formatos abaixo são extensão raciocinada, não executada. O
> mapeamento é direto e a estrutura aguenta, mas trate como plano e não como
> caminho batido — e, se rodar, o que aprender vira regra nova.

| formato | a unidade | o eixo do tempo | o que muda |
|---|---|---|---|
| **página de vendas / landing** | a dobra | o scroll | — é o caso provado |
| **apresentação / deck** | o slide | o avanço (seta, clique) | o scrub (padrão D) vira transição entre slides; o ritmo claro/escuro passa a marcar os atos do deck |
| **carrossel de social** | o card | o swipe | quase não há motion: a "animação" é a diferença entre um card e o próximo, e o peso todo cai no card 1 |
| **criativo estático** | a peça | não existe | tudo se resolve em composição — a imagem-conceito deixa de ser etapa e vira quase o entregável |
| **UI de produto** | a tela ou o estado | a interação de quem usa | o ritmo de superfícies some; o mock data vira dado real; a copy vem do produto, não da oferta |

### O que transfere inteiro

Nada disto depende do formato:

- **a copy como contrato inviolável**, com verificador que reprova o build;
- **um conceito nomeável por unidade** — se não dá para nomear a cena, ainda é
  repaginação disfarçada;
- **a direção visual escrita antes de tudo**, com nome e prefixo de prompt colável;
- **a imagem-conceito aprovada antes da execução** — é o que mais transfere,
  porque não presume nem scroll nem código;
- **a ficha de 7 camadas** como briefing (a camada 7 muda de conteúdo, não de papel);
- **o `taste.md` com prefixos de escopo** — gosto de cliente não tem formato;
- **o double-check em contexto limpo** e a orquestração "uma unidade por vez";
- **a revisão por áudio** e o grill de perguntas antes de implementar;
- **a medição** antes de dizer que está pronto;
- **mock data plausível, nunca prova.**

### O que não transfere e precisa ser trocado

- **O padrão D (scrub).** Ele existe porque o leitor controla o tempo com o
  dedo. Sem scroll, não há scrub — em deck vira transição, em UI vira estado.
- **O ritmo de superfícies** (escuro nos picos, claro nos respiros) é uma
  ferramenta de página longa. Num criativo isolado não se aplica; numa UI de
  produto, a consistência vale mais que o contraste.
- **Os gates de web.** Auditoria de viewport e contrato de copy contra o HTML
  pressupõem artefato servido. Para peça exportada (PNG, PDF), o contrato de
  copy precisa de outro verificador — a regra continua, o script não.
- **`stacks/next-tailwind-gsap.md`** é o único arquivo que assume uma stack, e
  é o primeiro a cair fora quando o formato muda.

O `SKILL.md` já aponta uma skill irmã para a variante em deck. Este repositório
é a variante em página — e a fonte do método, que é o que vale levar para os
outros formatos.

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
