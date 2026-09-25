# Checkpoint — <projeto / peça> — <AAAA-MM-DD> (<tema da rodada>)

<!-- O checkpoint guarda o ESTADO da rodada: o que o próximo chat precisa para
     retomar sem reler a conversa. Tudo o que ele afirma tem de estar em disco
     ou no git; "feito" sem verificação vira "pela metade".
     O aprendizado longo da sessão, se valer, vai em assets/sessao-template.md
     (opcional). Sessão nova lê este arquivo e depois o PROMPT-RETOMADA.md.
     Nome: docs/sdd/CHECKPOINT-AAAA-MM-DD[-sufixo].md. Nunca apagar os antigos. -->

Cobre os pedidos <N>–<M> do [`log-de-prompts.md`](log-de-prompts.md).
Checkpoint anterior: <caminho ou "nenhum">.

## 1. Estado em uma frase

<Onde paramos, em uma frase que o dono entenda sem contexto.>

## 2. Git

- Branch **`<branch>`**. Último commit: `<hash>` (<assunto>).
- Sem push: <n commits desde `<hash>`> | tudo enviado.
- Decisões antes do push: <lista ou "nenhuma">.
- Autor conferido: `<user.name>` / `<user.email>`.
- Ambiente de dev: <comando para subir, porta, um processo por vez>.

## 3. O que foi feito

<!-- Por peça e por unidade (seção, slide, card), com os commits. -->

### <peça>

- <unidade> — <o que entrou> (`<hash>`)

## 4. O que está rodando ou pela metade

<!-- Subagentes, tarefas em background, trabalho não commitado. Para cada um:
     o que fazia, o que já está em disco, como retomar (arquivo, briefing). -->

- …

## 5. Decisões do dono nesta sessão

<!-- Com as palavras dele, entre aspas, e o número do pedido no log. -->

- "<citação>" (pedido <N>) → <o que isso decidiu>

## 6. Decisões pendentes

<!-- Numeradas, objetivas, cada uma com recomendação. Espelham a lista única
     da gestão do projeto. -->

1. <decisão> — recomendação: <…>

## 7. Imagens à espera de veredito

| Caminho | O que propõe | Recomendação |
|---|---|---|
| `pecas/<peça>/secoes/NN-slug/ideia-vK-<modelo>.png` | … | … |

## 8. Para o dono ver ao vivo

<!-- Escolhas de execução que só se julgam na tela (movimento, ritmo, escala).
     Não são bugs; não consertar por conta própria. -->

- …

## 9. Ideias anotadas (não executadas)

<!-- Com o motivo e a dependência de cada uma. Anotar não é fazer. -->

- …

## 10. Próximos passos, em ordem

1. …

## 11. Regras novas e lições para o método

<!-- Uma linha por regra/lição, com a evidência (pedido do log). Dizer para
     onde foi: pecas/<peça>/taste.md, CLAUDE.md do projeto ou proposta
     para a skill. -->

- <regra> — evidência: pedido <N> — registrada em: <arquivo | ainda não>
