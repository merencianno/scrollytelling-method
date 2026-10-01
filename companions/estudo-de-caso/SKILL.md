---
name: scrollytelling-estudo-de-caso
description: Fechar uma aplicação da skill scrollytelling com um estudo de caso — linha do tempo, aprovações e vetos literais, o que custou rodada, o que foi NOVO no método, regras candidatas e o diff proposto para a skill — e registrar o que for de método como mudança proposta. Use ao terminar uma página, deck, carrossel ou criativo feito com a skill, quando pedirem "estudo de caso", "debrief da página", "o que aprendemos com esse projeto", "documenta esse projeto para o próximo", ou para documentar um projeto antigo ou de terceiros que usou a skill.
license: MIT
---

# Estudo de caso — a skill aprende com cada peça

Toda aplicação da skill termina com um relatório que serve **ao próximo
projeto**, não a este. Ele responde três perguntas, nesta ordem: o que
aconteceu (com fonte), o que foi novo no método, e o que a skill deve mudar
por causa disso. Sem a terceira, é ata; com ela, a skill melhora a cada uso.

## Quando roda

- **Ao fechar uma aplicação** — no Passo 8 da skill, depois do portão 3 (o
  dono declarou pronto), ou quando o dono encerra a rodada mesmo sem "pronto".
- **Retroativo** — peça antiga nunca documentada. Mesmo modelo; a linha do
  tempo sai do log de pedidos, dos commits e das tarefas.
- **De terceiros** — alguém usou a skill de outro jeito. Modo **externo**: sem
  log, a seção 1 vira "o que se sabe" e cada linha diz de onde veio (relato,
  repositório, print). O que não tem fonte não entra.

## O procedimento

1. **Delimitar o projeto.** Faixa de pedidos do log (§N–§M), tarefas, datas,
   arquivos da peça, e o nível de visualização usado
   (`references/niveis-de-visualizacao.md`). Se não houver log, escrever isso.
2. **Coletar em contexto limpo.** Um subagente por projeto, **um por vez**.
   Recebe só a lista de fontes — log de pedidos (faixa), tarefas da gestão,
   `ideias.md` / `prompt-v*.md` / `veredito.md` da peça, changelog, contexto
   do projeto, `git log` da peça — e devolve **fatos com fonte** (§ ou linha
   do log, SHA, arquivo) nas seções 0–4 do modelo, sem interpretação.
   Citação literal do dono entre aspas, nunca parafraseada.
3. **Sintetizar.** O agente principal (ou um subagente de síntese, também de
   contexto limpo) escreve as seções 5–7: o que foi novo, regras candidatas
   com escopo, diff proposto. Onde é leitura, escrever "leitura".
4. **Comparar com a skill.** Para cada regra candidata, abrir o arquivo da
   skill que trataria dela e marcar: **Nova** (não existe), **Parcial**
   (existe incompleta), **Diverge** (a skill diz outra coisa), ou "já está e
   se confirmou" (citar o arquivo).
5. **Registrar como mudança proposta.** Cada regra `[método]` Nova ou Diverge
   vira uma mudança proposta para a skill — uma issue no repositório da skill,
   ou uma entrada num `BACKLOG.md` que você mantenha —, com **a fala literal
   do dono primeiro**, a interpretação depois, e o diff proposto (arquivo →
   trecho). O dono decide o que entra; o que entra vai para a skill num
   release, e o `CHANGELOG.md` registra.
6. **Salvar.** `estudos-de-caso/AAAA-MM-DD-<slug>.md` no modelo
   `estudos-de-caso/_modelo.md`, e uma linha no `estudos-de-caso/README.md`.

## Regras

- **Nada sem fonte.** O valor do estudo é ser evidência, não opinião. Fato sem
  § do log, SHA ou arquivo fica fora ou é marcado "leitura".
- **A citação vem antes da leitura.** A perda de detalhe acontece no resumo.
- **Escopo em toda regra:** `[método]` porta para qualquer cliente; `[casa]`
  é gosto da marca ou do cliente; `[projeto]` só vale nesta peça. Só
  `[método]` muda o método.
- **A seção 5 é obrigatória.** "Nada de novo" é resposta válida, mas tem de
  ser escrita — e é rara: toda peça tem pelo menos uma primeira vez.
- **Nunca nomear cliente, pessoa ou repositório** em estudo que vá para uma
  cópia pública da skill. Na pública, o que chega é a regra, sem o caso.
- Não é retrospectiva de sentimento. Veto entra com o motivo e o princípio
  que ele revela; elogio entra com o que exatamente foi aprovado.
