# Revisão e gates: como uma rodada fecha

Uma rodada é o intervalo entre duas sessões de feedback do dono: começa
com uma lista de pedidos, termina com gates verdes e um registro do que foi
aprovado. O projeto de referência fez seis rodadas em cerca de doze horas — o que
sustentou esse ritmo não foi velocidade de implementação, foi o fechamento
ser sempre o mesmo e sempre barato.

## Os gates fixos

Nesta ordem, sem pular etapa, antes de qualquer commit de fim de rodada:

```bash
npm run typecheck
npm run lint
PLAYWRIGHT_BASE_URL=http://localhost:3000 PLAYWRIGHT_SKIP_WEBSERVER=1 \
  npx playwright test tests/<projeto>.spec.ts
npm run build:preview:<projeto> && npm run verify:preview:<projeto>
```

1. **Typecheck e lint** rodam também dentro de cada tarefa de seção, não
   só no fim — um agente que entrega uma seção roda `npx tsc --noEmit` e o
   lint escopado no diretório das seções antes de devolver o arquivo.
2. **Testes de contrato** cobrem o que a revisão visual não pega: um único
   `h1` com a headline exata, as 14 seções presentes com `id="dobra-NN"`,
   a contagem de CTAs com altura ≥ 44 px e todos dentro da viewport,
   ausência de overflow horizontal em 320/375/414/768, foco devolvido ao
   botão que abriu o diálogo, e — o mais importante para scrollytelling —
   uma passada com `prefers-reduced-motion` que rola a página até o fim e
   exige opacidade ≥ 0,99 em toda seção, todo `h2` e todo `p`. É o teste
   que impede copy presa em `opacity: 0` por uma animação que nunca
   disparou.
3. **Build do artefato + verificador** fecham o contrato de copy, a
   contagem de CTAs, os assets obrigatórios, o prefixo de `basePath`, o
   vazamento de escopo e o manifesto (ver `copy-contrato.md`).

Avisos esperados são parte do gate, não falha: placeholder de contato
ainda não definido e árvore Git suja passam como aviso no preview local e
viram falha no alvo de catálogo.

## Build e dev server não convivem

Rodar `next build` com o `next dev` aberto corrompe o `.next` e a página
quebra inteira, com chunks em 404 — e o sintoma parece bug de código, o
que custa uma hora de investigação na direção errada. Duas saídas: fechar
o dev server antes do build, ou buildar numa cópia do projeto no
scratchpad (`rsync` do projeto + symlink do `node_modules`), que foi como
o projeto de referência mediu Lighthouse sem derrubar a sessão de revisão ao vivo.

## Revisão visual por largura

Os testes medem; os prints mostram. Um script de screenshots percorre a
página em várias larguras com `reducedMotion: "reduce"`, rola de ponta a
ponta para disparar o conteúdo, reporta overflow por largura e salva uma
imagem por dobra (`.export-shots/shoot-widths.mjs <dir> <larguras>
[dobras]`). As larguras que pegaram problemas reais no projeto de referência:
1440 / 1366 / 1280 / 1024 / 768, mais 390 e 320 no celular.

**Largura não basta: a janela tem altura.** Audite numa matriz de janelas
reais, largura × altura:

| faixa | janelas |
|---|---|
| notebook | 1280×720 · 1366×768 · 1440×900 · 1536×864 |
| tablet | 768×1024 · 820×1180 · 1024×768 · 1024×1366 |
| celular | 320×568 · 360×740 · 375×667 · 390×844 · 414×896 |

Todo `sticky` cabe em `innerHeight` ou deixa de grudar abaixo de ~700 px de
altura; um palco grudado mais alto que a janela esconde a própria copy.

**Correção responsiva só em `@media`, com diff medido.** Ajuste de celular
vive em `@media (max-width: …)`; nunca se move um utilitário com breakpoint
para a regra base. Meça os elementos tocados em todos os tamanhos **antes e
depois** e compare o diff — uma largura corrigida para o celular vazou para
o desktop e só a medição mostrou.

**Medição não substitui olhar o print.** O que só apareceu no olho, numa
revisão de 70 imagens: grade de quatro colunas colapsando em 2×2 no
tablet, fecho quebrando no hífen ("fazê-/las"), janelas com faixa morta
embaixo por conteúdo centrado verticalmente, títulos de duas colunas
desalinhados, cards com 50–70 px de vazio entre ícone e frase, CTA
quebrando em duas linhas num box estreito. Nenhum desses falha um teste.

Dividir a revisão entre dois revisores por faixa de dobras (01–07 e 08–14)
escala bem, desde que cada um devolva os achados com severidade e arquivo.
E vale separar, no relatório, o que foi corrigido do que depende de decisão
de design, para que não vire surpresa depois.

Ao fotografar animações, três cuidados que custaram uma hora inteira numa
rodada: `locator.screenshot()` de um elemento mais alto que a viewport
reinicia animações que dependem de media query; `animation.currentTime`
(seek via WAAPI) dessincroniza o pintado do estilo computado; várias
páginas em paralelo no mesmo browser também. Regra: uma página por vez,
viewport maior que a seção, relógio real, nada de seek. Se o
`getComputedStyle` está certo, o CSS está certo — o print é que mente.

## O ciclo com o dono

- **Uma rodada por sessão de feedback.** Acumular pedidos de duas sessões
  numa entrega só faz perder a rastreabilidade de qual pedido gerou qual
  mudança, e o dono revisa como se fosse página nova.
- **O feedback vira commit.** Cada pedido é uma mudança identificável,
  idealmente um commit por seção, para que o rollback seja cirúrgico
  quando o dono voltar atrás — e ele volta: no projeto de referência um preço à vista
  foi cogitado e revogado na mesma hora.
- **Marcar o que foi aprovado, para congelar.** A convenção do projeto de referência é
  uma seção de aprovações no checkpoint, com `**!**` = gostou, manter:
  "**!** Dobra 8 — bento das 10 soluções ('você matou, ficou muito boa,
  mantém')". Dobra marcada com `!` não é tocada nas rodadas seguintes sem
  pedido explícito. Sem isso, uma reimaginação de baixo para cima
  atropela o que já estava aprovado e a rodada seguinte volta atrás.
- **Pedidos abertos ficam listados junto**, na mesma seção, e a rodada
  seguinte começa por eles. O checkpoint termina com um status datado
  dizendo quais foram entregues e quais viraram backlog do dono.
- **Checklist vivo da rodada.** Uma linha por unidade com a recomendação
  (aprovar / composição / refazer / voltar às ideias), o problema, as
  decisões que só o dono toma e os ajustes empilhados por pedido
  (⬜ 🟨 ✅ + commit). O dono dita solto; o orquestrador empilha e não
  executa até ele liberar. Decisões só-do-dono vão
  numa **lista única no fim**, com recomendação em cada uma.
- **Pronto é o dono quem diz.** Gates verdes, commit, "ficou ótimo" ou
  "manter por ora" não são aprovação de peça. A lista das peças declaradas
  prontas, com ressalvas, vive na gestão do projeto; pronto não exige toda
  unidade resolvida.

## Fecho de uma rodada de revisão por seção

Quando a rodada foi "uma seção por vez" com o dev server aberto para o
dono (ver `orquestracao.md`), a verificação de integração fica toda para
o fecho, com o dev **fechado**. Nesta ordem, nada pulado:

1. Suíte de contrato do alvo.
2. `build` + `verify` de **cada** alvo (a rota com trava e a liberada).
3. Contrato de copy contra o artefato da rota **sem trava** (a travada
   esconde as dobras do HTML).
4. **Prova de rolagem em carga fria**: dev derrubado, subido limpo, rolar a
   página inteira com motion ligado, contar as dobras e capturar `pageerror`
   **e** `console.warn` — duas vezes. É o único teste que vê bug do motor de
   motion (ver `armadilhas.md`).
5. SDD: ficha de cada seção, checkpoint novo, registro de sessão, estado no
   README do projeto, prompt de retomada, changelog **com os números da
   verificação**.
6. A branch fica local até o dono aprovar ao vivo. Diga as duas opções
   (push da branch / fast-forward) e espere.

Gate de alvo novo: **copiar** o verificador do alvo anterior e trocar só a
tabela de contratos. As regras do que nunca chega ao ar se herdam inteiras
(`publicacao.md`). Rodar o `verify` **cedo**, na primeira seção pronta, não
só no fecho: defeitos pré-existentes ficam invisíveis até o alvo passar pelo
gate uma vez.

## Checkpoint × sessão × retomada

Dois documentos obrigatórios e um opcional. O fechamento inteiro (log,
changelog, gestão, checkpoint, prompt de retomada, commit) é executado pela
skill de projeto `/ctxt-full` do kit (`assets/sdd-kit/.claude/skills/`).

- **Checkpoint** (`assets/checkpoint-template.md`, template único) responde
  *"onde estamos"*: estado em uma frase, git, o que foi feito por unidade
  com commits, o que está pela metade e como retomar, decisões do dono com
  as palavras dele, decisões pendentes com recomendação, imagens à espera
  de veredito, **"para o dono ver ao vivo"**, ideias anotadas, próximos
  passos, lições para o método.
- **Sessão** (`assets/sessao-template.md`, **opcional**) responde *"o que se perde quando
  a conversa acaba"*: a frase que organizou a rodada, a fonte do briefing,
  o bug que ninguém via, o print que mentiu, vetos com escopo. É o registro
  do que a sessão **aprendeu**, não do que ela fez. Misturar os dois faz o
  segundo desaparecer.
- **Prompt de retomada**: bloco colável para a sessão seguinte, com a
  **ordem de leitura** em links. Quem chega amanhã não escolhe por onde
  começar. Documento superado leva aviso no topo dizendo o que vale no lugar
  — não se ajusta um documento vetado.

Duas listas curtas fecham toda rodada e evitam a reclamação seguinte:
**"para o dono ver ao vivo"** — escolhas de execução que só se julgam na
tela (vão vazio num card, tamanho relativo de dois assets, sobreposição
intencional); não são bugs, não conserte por conta própria — e **"ideias
anotadas"** — o que o dono narrou como "guarda essa ideia", com motivo e
dependência, nunca executado "de bônus" nem esquecido.

Aprovação e crítica são **granulares**: registre no nível do componente,
não do asset. *"Gostei muito do asset que você criou, mas só do botão dele —
o resto pode jogar fora."* A peça elogiada dentro de um asset reprovado vai
para estoque nomeado e reservado.

## Registro e rastreabilidade

Uma rodada só está fechada quando alguém que chegar amanhã consegue
retomar sem perguntar nada. Três artefatos:

1. **Checkpoint da data** — um arquivo por dia de trabalho intenso, com
   uma seção por rodada: o que foi construído, o que mudou por dobra com o
   arquivo correspondente, os gates rodados, as armadilhas descobertas, as
   pendências que dependem do dono e as aprovações. É o documento que
   se lê primeiro ao continuar em outro chat.
2. **Prints por rodada**, **fora da pasta de ideias** — em
   `arquivo-local/prints-teste/<peça>/<seção>/`, ignorado pelo git, com uma
   subpasta por rodada (`review-v1/` … `review-v5/`) para comparar antes e
   depois sem reconstruir a página. A pasta da seção é do dono: só
   `ideias.md`, prompts, imagens-conceito, `veredito.md` e `camadas.md`.
3. **Bloco de origem na publicação** — no repositório de páginas, cada
   versão leva um `NOTAS.md` com repositório, branch, SHA completo, rota,
   `basePath`, artefato, comandos de build e verificação, mais o que mudou
   e como foi validado. É o que liga o HTML publicado ao commit que o
   gerou; o mesmo par branch/SHA é conferido pelo verificador contra o
   `deploy-manifest.json` do artefato, então divergência reprova antes da
   publicação.
