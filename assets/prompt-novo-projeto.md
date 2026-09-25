# Prompt de projeto novo

Cole o bloco abaixo na primeira sessão do Claude Code, aberta na pasta do
projeto novo (vazia ou só com as copies), numa máquina com `git` instalado.
Preencha as seis linhas do fim antes de colar; o que não souber, deixe `<…>`.
No intake o agente confirma o que veio preenchido e só pergunta o que falta.
O roteiro completo está em `references/bootstrap.md`; nas sessões seguintes,
cole o bloco mais recente de `docs/sdd/PROMPT-RETOMADA.md`.

```text
Responda em pt-BR. Vamos abrir um projeto novo com a skill scrollytelling-method.

1. INSTALE A SKILL (você mesmo, pelo terminal):
   - Se ~/.claude/skills/scrollytelling-method não existe:
     `git clone https://github.com/merencianno/scrollytelling-method.git ~/.claude/skills/scrollytelling-method`
     Se existe: `git -C ~/.claude/skills/scrollytelling-method pull`.
   - Opcional: `ln -s ~/.claude/skills/scrollytelling-method/companions/tangibilizacao-css ~/.claude/skills/`
     (se ainda não existir) e as companheiras do README da skill; diga quais faltam, sem travar.
   - Esta sessão não enxerga skill nova sem reiniciar: leia os arquivos direto do disco.
2. LEIA agora só references/principios-de-trabalho.md e references/bootstrap.md (em
   ~/.claude/skills/scrollytelling-method/). SKILL.md, references/ideias-ascii.md,
   references/taste.md e as demais referências se abrem na etapa que as pede: cada
   etapa do bootstrap diz qual arquivo abrir.
3. Do gosto, só as "Lições de ofício" de references/taste.md valem aqui, lidas antes do
   primeiro conceito; o gosto deste cliente nasce vazio, no taste.md da peça. Nunca cite
   outro cliente ou projeto, nem na conversa nem na peça.
4. CONDUZA o bootstrap.md, com os três portões meus (qual ideia, qual imagem, está pronta):
   a. Intake: confirme comigo o que já veio nas linhas do fim, peça de uma vez só o que falta
      (copies, formatos e proporções, briefing, marca e assets, referências, prazo, quem gera
      imagem, stack e destino) e ESPERE eu mandar.
   b. Grill inicial numa leva só, só com o que o intake não respondeu.
   c. Monte a estrutura copiando assets/sdd-kit/ para cá (e apague o KIT-LEIAME.md que vem
      junto), uma pasta pecas/<peça>/ por peça, preencha e commite.
   d. Fundações e direção (Etapas 4–5 do bootstrap): projeto.md da peça, copy congelada;
      direção visual escrita, obrigatória, com nome e prefixo comum; blocagem.
   e. Por seção: 3–5 ideias em texto com esboço ASCII e uma recomendação → eu escolho.
   f. Prompts de imagem só das escolhidas, depois do double-check em contexto limpo (ASCII no
      LAYOUT.; no máximo 2 gerações por ideia; recusei 2 vezes, volte ao texto) → meu
      veredito, datado, em veredito.md.
   g. Finalização seção a seção: camadas (wireframe, depois layout), refinamento, revisão
      comigo, check final da copy, um commit por seção → eu declaro pronto → peça final
      em saida/, no formato do projeto.md.
5. EM TODA A SESSÃO: registre cada pedido meu literal em docs/sdd/log-de-prompts.md, com
   entendido e feito; spec por peça em docs/sdd/specs/; tarefa só com entregável e status em
   docs/sdd/gestao-do-projeto.md; changelog no mesmo commit; checkpoint datado ao fechar;
   prints de teste fora da pasta de ideias; decida o óbvio e, quando perguntar, me mostre a
   imagem. Para trocar de chat: /ctxt-full.

Cliente: <…>
Peças e formatos: <…>
Copies em: <…>
Quem gera imagem: <…>
Prazo: <…>
Stack e destino: <…>
```
