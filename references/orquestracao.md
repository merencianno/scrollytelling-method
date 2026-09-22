# Orquestração: janela de contexto é rainha

> "Lembre-se: janela de contexto é rainha → faça uma seção por vez."

O recurso escasso do orquestrador não é tempo, é contexto. Toda regra deste
arquivo existe para que o orquestrador **nunca leia um componente inteiro**:
ele lê relatórios curtos, prints e o resultado do `tsc`. Foi isso que deixou
espaço, na mesma sessão, para achar e corrigir um bug fora do plano.

## Construção × revisão: dois regimes

| | Construção do zero | Revisão com o cliente |
|---|---|---|
| unidade | lote de 3–4 seções por subagente, em paralelo | **uma seção por subagente, sequencial** |
| quando | as seções ainda não existem; arquivos disjuntos por natureza | cada seção vira asset novo e precisa ser vista antes da próxima |
| risco | colisão em arquivo compartilhado | volume de mudança que o cliente não consegue revisar |
| commit | por lote, antes do build | **por seção, antes de lançar a próxima** |

O cliente interrompeu um "três agentes em paralelo" e repetiu duas vezes
*"uma por vez"*. A leitura: lotes paralelos servem para construir; revisão
pede unidade fechada. Paralelismo em revisão só quando os conjuntos de
arquivos são **disjuntos** — e mesmo assim lançando a N+1 enquanto se olha o
print da N, não três de uma vez.

## O ciclo de uma seção (invariante)

```text
lançar subagente (contexto limpo)
   ↓  6–19 min
hand-back ≤ 25 linhas, sem código
   ↓
tsc --noEmit → 0 · lint → limpo · grep de marca de terceiro nos arquivos tocados
print da dobra em 1440 e em 390 (scripts/shoot-dobra.mjs) → olhar os dois
   ↓
git add <só os arquivos daquela seção> && git commit
   ↓
próxima
```

- Um conserto de uma linha (um `flex-shrink`, um tipo alargado) o orquestrador
  faz sozinho — não vale um subagente.
- O único arquivo compartilhado entre seções é o de fichas (`camadas.md`), e
  cada agente reescreve só a sua. Commit antes de lançar a próxima é o que
  impede colisão ali.

## Antes de disparar qualquer lote: os átomos

**Nunca dispare lotes paralelos sem criar antes, você mesmo:**

- a folha de estilo do projeto (tokens locais);
- o CTA com o atributo que o gate conta;
- o **arquivo de átomos compartilhados** (primitives: barra skeleton, traço,
  avatar, tela) — mesmo que vazio, com a API declarada;
- o esqueleto do arquivo de fichas;
- o mapa copy → seção, resolvido linha a linha.

Dois lotes que precisam do mesmo átomo vão criá-lo ao mesmo tempo e o último
a gravar vence em silêncio. Aconteceu: dois lotes criaram o mesmo
`Primitives.tsx` com APIs diferentes. Se ainda assim colidir, **reescreva o
arquivo como superconjunto das duas APIs**, não escolha uma.

## Contrato de fronteira entre agentes

Em cada prompt, as três fronteiras, escritas:

1. **"Você é dono destes nomes"** — a lista de blocos que só ele cria.
2. **"Se precisar de um bloco de outro lote, faça-o local no seu arquivo; o
   orquestrador unifica depois."**
3. **"Não edite: a landing, a config, os testes, os scripts, as rotas, a folha
   global, o motor de motion, nem seções fora das suas. Não delete nada. Não
   commite."** Quando um bloco compartilhado precisa mudar, abra **uma
   exceção nominal e única**: "é o único bloco existente que você pode editar".

Quando dois agentes rodam ao mesmo tempo, diga a **cada um** quais arquivos o
outro está mexendo. Sem o aviso simétrico o relatório volta com "há arquivos
modificados — não fui eu".

## O prompt do subagente de seção

Template completo em `assets/prompt-subagente-secao.md`. Seis blocos, nenhum
opcional:

1. **Escopo em uma frase** — o que muda e, explicitamente, o que **não** muda
   ("Copy não muda").
2. **"Leia antes (nesta ordem, nada além disso)"** — 4 a 6 arquivos, cada um
   com o que extrair dele. O briefing da rodada é o item 1 e leva o rótulo
   **"é o contrato"**. Quando há imagem-conceito, ela entra aberta com `Read`,
   junto com o prompt que a gerou; quando há revisão escrita posterior, **a
   revisão vence a imagem** e o agente registra a divergência.
3. **"O que fazer"** — instrução espacial concreta, com a **citação do
   cliente embutida** onde ela justifica a escolha. Nomeie **o que sai**
   (blocos locais mortos, imports), não só o que entra.
4. **Motion** — padrão de entrada, o que é loop, o que é scrub, e o estado sob
   reduced-motion (sempre: tudo visível, no estado final).
5. **"Regras duras (reprovam a rodada)"** — copy literal; teto de pontos de
   cor de ação; marca de terceiro fora do texto; nada nasce `opacity: 0`;
   sem `transition` em elemento do GSAP; comentário em `<style>` público e
   sem crase; responsivo em 320/375/414/768; alvos ≥ 44 px; a **lista nominal
   de arquivos proibidos**; `tsc` verde rodado por ele; e, quando há dev
   server aberto para o cliente, "não rode build, teste nem outro dev".
6. **"Entrega (≤ 25 linhas, sem código)"** — arquivos criados/alterados,
   anatomia do mockup, mecanismo e duração de cada loop, mock data usada, o
   que removeu, resultado do `tsc`, **e dúvidas**.

O bloco de dúvidas é obrigatório e é o mais valioso: foi lá que apareceram o
bug do motor de motion, um cast de tipo indevido e uma falha de gate.
Quando um subagente reporta *"a regra X me impediu de fazer Y que o briefing
cita"*, isso é **defeito do contrato**, não dúvida de implementação — três
subagentes reportaram o mesmo conflito e ninguém tratou até o cliente reprovar.

### Loop de auto-verificação visual

Dê ao subagente o comando exato para fotografar a própria seção e mande abrir
o PNG com `Read`, comparar com a referência (imagem-conceito e print anterior)
e **iterar até ficar fiel**. Um subagente que nunca vê o próprio resultado
entrega o que um print revela em segundos: sublinhado quebrado num título de
duas linhas, rótulos sobrepostos num mockup de 300 px. E quem faz o mockup
confere o print **na largura real do mockup**, não só da seção.

## O relatório de lote (construção)

Peça explicitamente: (1) tabela seção × arquivo × tone × mecanismo vivo;
(2) tabela dos blocos criados com props e ganchos `data-*`; (3) o que ficou
**local para o orquestrador unificar**; (4) decisões e dúvidas de copy,
numeradas; (5) slots de asset esperados. Fechar com `tsc`/`lint` e "sem
commits". É esse relatório que permite fundir as fichas e montar a página
sem reler código.

## Quando o cliente inverte uma regra no meio da rodada

Antes de tocar em código: **escreva a mudança no briefing**, numa seção nova
e datada, dizendo em voz alta **o que ela revoga**, com as palavras do cliente
citadas, o limite que continua valendo, a ordem de execução pedida e o que
ficou como backlog. Guarde a referência visual em `referencias/` com data
no nome. Só então dispare os agentes — e mande cada um ler a seção nova
**primeiro**, com a frase "ela REVOGA as regras de …".

## Ordem de fechamento da rodada

`tsc` → `lint` → montar a landing → suíte → **commitar** → `build` + `verify`
de cada alvo → contrato de copy contra o artefato → auditoria de viewports →
prints por dobra → **prova de rolagem em carga fria** → fundir fichas →
SDD (checkpoint, sessão, changelog) → push só com aprovação.

O gate recusa artefato de **árvore suja**: commitar vem antes de buildar.
**Um processo Next por vez** — se o dev está aberto para o cliente revisar,
não rode build nem teste; anote a dívida e abra o prompt de retomada com ela.

## Ambiente

- `gh auth switch` troca quem **empurra**; quem **assina** o commit é
  `git config user.name/user.email`. Confira antes do primeiro commit da
  sessão. Autor fora do time bloqueou todos os deploys de uma plataforma e o
  conserto foi reescrever 40 commits.
- Não mate processos por `pkill -f <nome>`: o padrão casa com o próprio shell
  da ferramenta e derruba a sessão (saída 144). Dev server em background,
  parada pelo id da tarefa.
- Scripts ad-hoc que usam dependências do projeto (Playwright) rodam **de
  dentro do repositório**, não do scratchpad — lá `node_modules` não resolve.
