---
name: ctxt-full
description: Fechar a sessão para continuar em outro chat — registra no log os pedidos que faltam, atualiza changelog e gestão do projeto, escreve um checkpoint datado da peça em curso e um prompt de retomada pronto para colar, commita, e devolve o prompt. Use quando o dono pedir "/ctxt-full", "checkpoint", "prompt de retomada", "vou abrir outro chat", "o contexto tá acabando".
---

# /ctxt-full — fechar o contexto para o próximo chat

O objetivo é que o próximo chat retome **sem perder nada** e sem reler a
conversa: onde paramos, o que foi decidido, o que está rodando, o que falta e
o que o dono precisa decidir.

## 1. Antes de escrever: pare o que está em voo

- Liste os subagentes e as tarefas em background ainda rodando. Se algum
  estiver perto do fim, espere. Se não, anote no checkpoint o que ele estava
  fazendo, o que já escreveu em disco e como retomar (arquivo, briefing).
- `git status`: nada solto. O que está pronto e verificado, commite. O que
  está pela metade, **não** commite: descreva no checkpoint.

## 2. Registros (protocolo do SDD)

1. `docs/sdd/log-de-prompts.md`: todo pedido do dono desta sessão que ainda
   não está lá, **literal**, com "Entendido" e "Feito" honestos.
2. `docs/sdd/changelog.md`: uma entrada por mudança da sessão, **no topo**.
3. `docs/sdd/gestao-do-projeto.md`: o status de cada tarefa tocada. ✅ só com
   entregável verificado. "Pronta" só se o dono declarou. Decisões pendentes
   na lista única.
4. `pecas/<peca>/projeto.md` (linha Status) e `docs/sdd/README.md`: status da peça e o
   checkpoint novo na lista (mais recente no topo).

## 3. Checkpoint

Escreva `docs/sdd/CHECKPOINT-AAAA-MM-DD[-sufixo].md` seguindo as seções de
`docs/sdd/CHECKPOINT-modelo.md`:

1. Estado em uma frase.
2. Git: branch, último commit, o que está sem push, decisões antes do push,
   autor, ambiente de dev.
3. O que foi feito, por peça/unidade, com os commits.
4. O que está rodando ou pela metade, e como retomar.
5. Decisões do dono nesta sessão, com as palavras dele.
6. Decisões pendentes, numeradas, com recomendação.
7. Imagens à espera de veredito: caminho, o que propõe, recomendação.
8. Para o dono ver ao vivo.
9. Ideias anotadas (não executadas).
10. Próximos passos, em ordem.
11. Regras novas e lições para o método, e para onde foram.

## 4. Prompt de retomada

No topo de `docs/sdd/PROMPT-RETOMADA.md` (os blocos antigos ficam abaixo,
como histórico), um bloco pronto para colar, no esqueleto do próprio arquivo:

```text
Retomando <projeto/peça> em <caminho do projeto>, branch <branch>. Responda em <idioma>.

LEIA NESTA ORDEM, ANTES DE TOCAR EM QUALQUER COISA
1. docs/sdd/CHECKPOINT-<data>.md — estado, pendências, imagens à espera de veredito
2. docs/sdd/log-de-prompts.md (pedidos N–M). Continue registrando cada pedido meu, literal, com "entendido" e "feito".
3. docs/sdd/gestao-do-projeto.md — status por peça e o critério de pronto (só eu declaro pronto).
4. pecas/<peca>/ — projeto.md, direcao-visual.md, blocagem.md, taste.md e subagentes/ (briefings em curso)
5. CLAUDE.md e docs/sdd/contexto-do-projeto.md

ESTADO
- <3 a 6 linhas>

REGRAS DESTA SESSÃO
- <só o que é específico da sessão; o método está na skill>
- Para trocar de chat, rode /ctxt-full.

<comando para subir o ambiente, rotas/arquivos a conferir, o que me mostrar primeiro>
O que eu quero fazer agora:
```

## 5. Commit e resposta

- Conferir o autor (`git config user.name` e `user.email`) antes de
  commitar.
- Um commit `docs: checkpoint AAAA-MM-DD e prompt de retomada`, **sem push**
  (a não ser que o dono peça).
- Responder ao dono com: o caminho do checkpoint, o bloco do prompt de
  retomada **inteiro, pronto para colar**, e as decisões pendentes numa lista
  curta.

## Regras

- Não invente estado: tudo o que o checkpoint afirma tem de estar em disco ou
  no git. "Feito" sem verificação vira "pela metade".
- Não apague checkpoints nem prompts antigos. O novo entra no topo; os antigos
  ficam como histórico.
- Nada que nomeie pessoa, repositório ou branch em arquivo que vá para
  produção. Checkpoint e prompt ficam só no repositório de código.
