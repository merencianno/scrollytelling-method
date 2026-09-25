# Princípios de trabalho do agente

> Ler antes de tudo, em qualquer cliente. O método diz **o que** produzir; estes
> princípios dizem **como se conduzir** enquanto se produz.

Conduta genérica, destilada das rodadas em que o método foi usado de ponta a
ponta. Um bloco por princípio: a regra em 1–3 linhas e, quando ajuda, o que
aconteceu para ela existir. "O dono" é quem aprova; "o cliente" é a empresa
ou marca da peça.

## Contexto e ritmo

**1. Contexto é rainha.** Uma unidade por vez no orquestrador; hand-back de
subagente em até 25 linhas; o orquestrador nunca lê componente inteiro.
Análise de material grande: subagentes reúnem, o orquestrador só sintetiza.

**2. Grill antes de implementar.** Perguntas objetivas antes do primeiro
subagente (qual peça, direção herdada ou nova, quem gera imagem, o que está
no ar); depois, execução autônoma até o próximo portão. O grill inicial do
projeto está em `bootstrap.md`; o grill de feedback por áudio, em
`revisao-por-audio.md`.

**3. Decidir o óbvio; perguntar com imagem.** Ajuste de ofício (título em 7
linhas no celular, grade apertada, fonte fora da escala) se aplica e se
relata, não se pergunta. Pergunta-se só conceito, copy, preço, publicação e
gosto entre alternativas equivalentes — e sempre com print ou imagem, nunca
por descrição: quem aprova não consegue visualizar por texto.

**4. Pronto é o dono quem diz.** Gates verdes, commit, "ficou ótimo" ou
"manter por ora" não são aprovação. A lista viva das peças declaradas
prontas, com ressalvas, fica em `docs/sdd/gestao-do-projeto.md`.

## Registro

**5. Log literal de cada pedido.** Todo pedido substantivo do dono entra em
`docs/sdd/log-de-prompts.md` literal (com os erros de digitação), numerado,
com "Entendido" e "Feito" honestos, registrado junto com o trabalho.

**6. Anotar não é fazer.** Tarefa só existe com entregável conferível; ✅ só
com o entregável existente e verificado; pedido "só anota" → nada se executa.

**7. Dois trilhos, ditos em voz alta.** Correção com referência que o dono deu
(componente, link, número) segue sem imagem; ideia ou seção nova espera
imagem aprovada. Cada job diz em qual trilho está; nada se implementa "sem
avisar".

**8. Diagnóstico × sugestão.** O incômodo concreto ("achatado", "não
centralizado") é ordem; a solução dita com "não sei / talvez" é hipótese —
aplicar a menor correção e mostrar a hipótese como opção.

**9. Checklist vivo da rodada.** Uma linha por unidade com recomendação
(aprovar / composição / refazer / voltar às ideias), o problema, as decisões
que só o dono toma e os ajustes empilhados por pedido (⬜ 🟨 ✅ + commit). O
dono dita solto; o orquestrador empilha e não executa até ele liberar.

**10. Decisões só-do-dono numa lista única no fim**, com recomendação em cada
uma; nada de perguntas espalhadas pelo relatório.

## Versões e aprovado

**11. V2 em rota ou arquivo paralelo.** Mudança de muitas unidades nasce ao
lado da versão atual (`-v2`), com escopo próprio; a atual fica intacta até o
dono comparar e escolher; na troca, a V2 assume e a referência da V1 vai para
o log.

**12. Congelar o aprovado.** Unidade que o dono chamou de "perfeita" não se
toca sem pedido explícito; fica marcada no checkpoint (`revisao-e-gates.md`).

## Copy e cliente

**13. Nunca citar outro cliente ou projeto** — nem como explicação técnica,
nem na conversa, nem na peça.

**14. Nenhuma frase para o lead fora da copy**, nem em estado de interação
(feedback, toast, vazio, sucesso). String nativa do app pode ("Seguir",
"curtiu"). Não perguntar: omitir.

**15. Ordem da copy vale no DOM**, não só na leitura visual.

## Pastas e arquivos

**16. Prints de teste fora da pasta de ideias.** A pasta da seção é do dono:
só `ideias.md`, prompts, imagens-conceito, `veredito.md` e `camadas.md`.
Prints e quadros vão para `arquivo-local/prints-teste/<peça>/<seção>/`,
ignorado pelo git.

**17. Imagens visíveis no editor**, na pasta da seção; nunca cópia de
conveniência em pasta ignorada; `veredito.md` existe mesmo pendente.

## Medida e verificação

**18. Responsivo só em `@media` e medido.** Correção de celular vive em
`@media (max-width…)`; nunca mover utilitário com breakpoint para a regra
base; medir os elementos tocados em todos os tamanhos antes e depois e
comparar o diff. Numa rodada real, uma largura corrigida para o celular vazou
para o desktop e só a medição mostrou.

**19. Altura real de janela.** Todo `sticky` cabe em `innerHeight` ou deixa de
grudar abaixo de ~700 px. Matriz de tamanhos:

| Classe | Tamanhos |
|---|---|
| Notebook | 1280×720, 1366×768, 1440×900, 1536×864 |
| Tablet | 768×1024, 820×1180, 1024×768, 1024×1366 |
| Celular | 320×568, 360×740, 375×667, 390×844, 414×896 |

**20. Anatomia do objeto encenado é constante numérica** (post 4:5 ou 1:1,
story 9:16, laptop 16:10, celular 9:19,5), com largura mínima legível;
interface no tamanho nativo reduzida por `scale()` medido, excesso cortado
pela borda. Quando o dono diz o número errado e descreve o objeto certo, vale
o objeto.

**21. Animação se confere filmada** (10–12 quadros a ~90 ms numa folha);
troca de estado em dois tempos; nenhum texto da copy coberto em nenhuma
largura; CTA "numa linha" conta linhas de texto, não a altura do botão.

## Comunicação e segurança

**22. Relatório na língua do dono, sem jargão interno.**

**23. Credencial colada no chat nunca é gravada**; avisar para revogar.

**24. Pedido que contraria regra escrita volta como pergunta** — nunca se
executa em silêncio, nunca se recusa (`revisao-por-audio.md`).

**25. Autor do commit conferido** antes do primeiro commit da sessão
(`git config user.name/email`), separado de quem empurra (`orquestracao.md`,
"Ambiente").

**26. Subagente deixa o parcial em disco**; interrupção não perde trabalho; a
retomada lê o parcial.

## Gosto de ofício

**27. Página de venda sem cursor custom e sem loader de entrada.**

**28. Sem cromo em volta do que já é peça**: nada de card em volta de card,
nem anel em volta de thumbnail real.

---

Estes princípios valem em qualquer formato da tabela "O formato decide três
coisas" do `SKILL.md` — página, deck, carrossel, criativo, UI — trocando
"seção" pela unidade do formato. O `bootstrap.md` instala as oito regras mais
críticas no `CLAUDE.md` do projeto novo, uma linha cada; o restante fica aqui
como referência de conduta.
