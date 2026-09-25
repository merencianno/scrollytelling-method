# Pipeline em issues — landing de scrollytelling

Vinte e uma issues, da chegada da copy até a publicação, prontas para colar
bloco a bloco num GitHub Projects, ClickUp ou similar. Trocar o que está
entre `<colchetes angulares>`: `<projeto>` (slug em minúsculas, ex. `minha-landing`),
`<rota>` (rota Next, ex. `/minha-pagina`), `<N>` (número de dobras da copy),
`<versao>` (`v1`, `v2`…). A coluna **Gate** é o comando ou a evidência que
autoriza fechar a issue — issue sem gate verde não fecha.

## Fase 0 — Entrada

### 1. Abrir a ficha do projeto
Registrar o pedido antes de escrever qualquer linha, no formato padrão do catálogo.
- [ ] `SOLICITACAO.md` criado a partir de `assets/ficha-template.md`, com link, quem pediu, data, para que serve (uma frase), público, status e responsável técnico
- [ ] Seção "O que não é óbvio" preenchida: destino dos CTAs, `basePath` obrigatório, dependências externas, se é `noindex`
- [ ] Seção "Histórico" aberta com a data de hoje
- **Gate:** ficha revisada por quem pediu; "para que serve" cabe em uma frase (duas frases = dois projetos).

### 2. Congelar a fonte canônica da copy
A copy vira arquivo versionado no repositório de código, com nome estável, e passa a ser a única referência.
- [ ] Arquivo em `copies/<nome>.md`, commitado sem edições de conteúdo
- [ ] Defeitos do export anotados: hierarquia inconsistente, marcadores de dobra, tabelas de Docs, repetições literais de CTA
- [ ] Contagem de dobras e de ocorrências do rótulo de CTA registrada
- **Gate:** `<N>` dobras e a contagem de CTAs conferidas à mão contra o arquivo.

### 3. Escrever o brief com a regra inviolável
O documento que todo implementador lê antes de abrir arquivo, com a fronteira do que pode mudar.
- [ ] Regra "a copy não muda uma vírgula" transcrita com a fonte deste projeto
- [ ] Lista explícita do que pode mudar (hierarquia, agrupamento, quebras, ênfase) e do que não pode
- [ ] Regra das mini-UIs abstratas e da marcação editorial permitida
- [ ] Conteúdo ausente listado como slot técnico pendente, com responsável
- **Gate:** brief lido e aceito por quem vai implementar.

## Fase 1 — Planejamento

### 4. Levantar a direção visual e os assets
Sem inventário, metade das dobras descobre na implementação que falta imagem.
- [ ] Deck, style guide e tipografia extraídos da fonte de design
- [ ] Inventário de assets com nome de arquivo, descrição real do conteúdo e uso sugerido
- [ ] Assets com nome enganoso e assets proibidos (recortes de sangria, imagens com texto de deck) marcados
- **Gate:** todo asset citado no inventário existe no caminho indicado.

### 5. Preencher a tabela de blocagem
Traduzir as `<N>` dobras em linhas antes de escrever componente (`references/blocagem.md`, template em `assets/blocagem-template.md`).
- [ ] Uma linha por dobra: função, conceito, componente, ato, blocagem, motion, assets
- [ ] Conceito de cada dobra nomeável em uma frase de cena
- [ ] Ritmo de superfícies lido de cima a baixo, sem três atos iguais em sequência
- [ ] Dobras que levam CTA listadas, fechando com a contagem da copy
- **Gate:** tabela revisada; nenhuma célula de blocagem genérica ("grid de cards").

### 6. Definir o contrato executável de copy
Uma âncora literal por dobra mais a contagem de CTAs (ver `references/copy-contrato.md`).
- [ ] Um trecho contíguo e característico escolhido por dobra, mais o rodapé
- [ ] Trechos escolhidos evitando palavras candidatas a ênfase por `<span>`
- [ ] Contagem esperada do rótulo de CTA e do atributo de CTA definida
- **Gate:** cada trecho localizado no arquivo de copy por busca literal.

## Fase 2 — Fundações

### 7. Criar a rota e o escopo da página
Rota isolada, sem herdar cabeçalho, rodapé ou preloads do site.
- [ ] `<rota>` criada com layout próprio e fontes locais
- [ ] Página marcada `noindex` enquanto não for pública
- [ ] Chrome do site ignorando `<rota>`; nenhum preload de outra página vazando
- **Gate:** `npm run typecheck` e lint verdes; nenhum 404 no console da rota.

### 8. Montar o arquivo de tokens escopado
Cor, tipografia, raios, sombras e semântica num só lugar, consumidos por classe de escopo.
- [ ] Tokens de marca, superfícies clara/escura/deep, tipografia e raios definidos
- [ ] Semântica de acento definida (positivo, negativo) e limitada a uso raro
- [ ] Nenhum hex cru de marca nos componentes; alpha sobre token escrito como rgba literal
- **Gate:** busca por hex de marca fora do arquivo de tokens retorna vazio.

### 9. Criar os primitivos e o hook de motion
O vocabulário compartilhado que impede `<N>` dialetos diferentes de animação.
- [ ] Primitivos de UI criados (botão, card, chip, seção, revelação)
- [ ] Hook de motion com contexto, `matchMedia` e limpeza no unmount
- [ ] Tudo visível e estático sob `prefers-reduced-motion`
- **Gate:** typecheck verde e uma seção piloto usando só primitivos.

### 10. Ligar o pipeline de build e o verificador
O gate que reprova o artefato precisa existir antes da primeira dobra pronta.
- [ ] Script de build do artefato estático com `basePath` por variável de ambiente
- [ ] Verificador com contrato de copy, contagem de CTAs, assets obrigatórios, prefixo de `basePath`, vazamento de escopo e placeholders (base em `scripts/verify-copy-contract.mjs`)
- [ ] Manifesto de deploy gerado com branch, SHA completo, `basePath` e data
- [ ] Scripts npm de preview e de catálogo registrados
- **Gate:** verificador roda e falha corretamente numa página ainda incompleta.

### 11. Escrever os testes de contrato
O que a revisão visual não pega (ver `references/revisao-e-gates.md`).
- [ ] `h1` único com a headline exata; `<N>` seções com id por dobra
- [ ] Contagem de CTAs, altura mínima de toque e posição dentro da viewport
- [ ] Sem overflow horizontal em 320/375/414/768
- [ ] Passada de `prefers-reduced-motion` exigindo opacidade cheia em seções, títulos e parágrafos
- **Gate:** suíte verde contra o dev server.

## Fase 3 — Implementação

### 12. Implementar as dobras em lotes
Uma tarefa por dobra, cada uma dona de um único arquivo, para evitar conflito.
- [ ] Briefing autocontido por dobra: copy da dobra, linha da blocagem, tokens, referência de vocabulário, proibições
- [ ] Um arquivo por dobra; sub-componentes criados dentro do próprio arquivo
- [ ] Um commit por dobra
- **Gate:** por dobra, `npx tsc --noEmit` e lint escopado verdes.

### 13. Implementar o rodapé e os destinos dos CTAs
O que fecha a página e o que ela faz quando alguém clica.
- [ ] Rodapé com a linha legal literal da copy
- [ ] Destino dos CTAs centralizado em configuração, com placeholder marcado se ainda indefinido
- [ ] Links legais sem URL renderizados como texto, não como âncora morta
- **Gate:** verificador acusa o placeholder como aviso no preview e como falha no catálogo.

### 14. Fechar a primeira passada e tirar os prints
Página inteira de pé, antes de qualquer refinamento.
- [ ] Todas as `<N>` dobras renderizando na ordem da copy
- [ ] Prints de todas as dobras em desktop e celular, com movimento reduzido, em pasta versionada
- **Gate:** suíte de contrato + build + verificador verdes.

## Fase 4 — Revisão

### 15. Revisar por largura, com o olho
Medição pega overflow; o resto só aparece no print (ver `references/revisao-e-gates.md`).
- [ ] Prints por dobra em 1440/1366/1280/1024/768 e em 390/320 (`scripts/audit-viewports.mjs`)
- [ ] Achados registrados com severidade e arquivo
- [ ] Separado o que foi corrigido do que depende de decisão de design
- **Gate:** overflow zero em todas as larguras e lista de achados fechada.

### 16. Auditar acessibilidade e movimento reduzido
O scrollytelling não pode esconder conteúdo de quem desliga animação.
- [ ] Nenhum bloco de copy preso em opacidade zero após rolagem real
- [ ] Alvos de toque com pelo menos 44 px e foco visível em interativos
- [ ] Contraste conferido nos textos pequenos das mini-UIs
- [ ] Imagens decorativas marcadas como tal
- **Gate:** teste de movimento reduzido verde; auditoria de acessibilidade sem falha bloqueante.

### 17. Medir performance no artefato de produção
Medição em dev não vale; buildar em cópia para não derrubar a sessão de revisão.
- [ ] Artefato servido localmente e medido em celular e desktop
- [ ] Elemento de maior pintura identificado e nunca nascendo transparente
- [ ] Imagens fora do topo em carregamento preguiçoso, com dimensões declaradas
- [ ] Resultado e próximos passos registrados
- **Gate:** deslocamento de layout zero e resultado registrado no checkpoint.

## Fase 5 — Rodadas com o cliente

### 18. Rodar uma rodada de feedback
Repetir esta issue por sessão de feedback, numerando a rodada.
- [ ] Pedidos da sessão listados como itens individuais antes de começar
- [ ] Cada pedido virando um commit identificável
- [ ] Prints da rodada em pasta própria
- [ ] Contrato de copy atualizado no mesmo commit, se a copy mudou
- **Gate:** gates fixos verdes e todos os pedidos da lista endereçados ou explicitamente adiados.

### 19. Congelar o que foi aprovado
Sem marcação de aprovação, a rodada seguinte atropela o que já estava bom.
- [ ] Dobras aprovadas marcadas com a convenção combinada, com a citação do cliente
- [ ] Pedidos abertos listados na mesma seção
- [ ] Status datado ao fim da seção, dizendo o que virou backlog
- **Gate:** checkpoint atualizado na mesma data.

## Fase 6 — Publicação

### 20. Resolver as pendências que dependem do cliente
O que o verificador segura de propósito até alguém de fora decidir.
- [ ] Destino real dos CTAs substituindo o placeholder
- [ ] URLs legais recebidas e aplicadas
- [ ] Branch de trabalho mesclada na principal, árvore limpa
- **Gate:** `verify` do alvo de catálogo verde, sem avisos de placeholder nem de árvore suja.

### 21. Publicar a versão e registrar a origem
Só o merge publica; o registro é o que liga o HTML no ar ao commit que o gerou.
- [ ] Artefato buildado com `basePath` igual ao caminho do catálogo (`/<projeto>/<versao>`)
- [ ] `NOTAS.md` da versão com repositório, branch, SHA completo, rota, `basePath`, artefato, comandos de build e verificação, o que mudou e como foi validado
- [ ] Ficha do projeto atualizada no histórico; link estável apontado para a versão certa
- [ ] Pull request aberto, preview conferido nas larguras de celular e tablet, CTAs e formulários testados
- **Gate:** build do catálogo aprovado na verificação de nomes e merge feito por quem administra o repositório de páginas.
