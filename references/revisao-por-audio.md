# Revisão por áudio: transcrever antes de decidir

O dono grava áudios revisando a página, seção por seção. A regra que
organiza tudo: **nenhuma decisão de código antes de a transcrição literal
existir.** A transcrição é a fonte; o briefing aponta e traduz.

Por que literal: duas coisas só apareceram porque nada foi resumido — a regra
fina (*"sua mensagem mais longa, deixa só o começo dela, tipo 'nossa…'"*, que
impede mock data virar depoimento) e o **pedido que contrariava uma regra
dura** (*"tira esse emoji azul que você copiou da copy, nada a ver"*). Um
resumo teria engolido os dois.

## Transcrever

- Ferramenta **local** (faster-whisper, modelo `medium`, `language="pt"`, VAD
  ligado, `beam_size=5`). Roda offline; não depende de conta autenticada.
- Custo medido: **2,5–3,4 s de CPU por segundo de áudio, por worker.** Rode N
  workers em paralelo (4 numa máquina de 16 threads); 40 min de áudio levam
  ~25 min de relógio. Um processo só demora quatro vezes mais e mede errado.
- Meça a duração antes e dê a estimativa ao dono com o ritmo medido.
- Trocar para modelo menor acelera três vezes e erra mais em palavra solta —
  é decisão do dono, não do executor.

## Montar o documento

- Parágrafo quebrado **pela pausa real da fala** (gap ≥ 0,8 s entre
  segmentos), programaticamente. É a única formatação permitida — assim
  "formatar minimamente" não vira edição.
- Não resuma, não limpe, não corrija, não reordene. Devaneio e repetição ficam.
- Um título por áudio com a duração, e um índice com o tema de cada um. Diga
  no cabeçalho que o índice é a única prosa sua.

## O arquivo anotado

Transcrição automática erra nome próprio e termo técnico ("Pils" = pills,
"no mar que" = no marquee, "Duro Verde" = doodle verde, "Lucy de Icons" =
Lucide, "sessão" = seção, dezenove vezes). Sem correção, a rodada
implementaria "um divisor da sessão" em vez de "no marquee".

- Liste os erros que notou e **pergunte** antes de marcar.
- Autorizado, gere um **segundo arquivo**: a correção entra **ao lado** do
  trecho, `…mudar essas Pils [→ pills]`, nunca substituindo. Termo repetido
  anotado só na primeira ocorrência, com "vale para as demais". Correção
  incerta leva `?`.
- **Prove**: removendo todas as anotações, o texto tem de bater caractere a
  caractere com o original. Rode a checagem e diga o resultado.

## Da transcrição ao briefing

- Escreva uma **seção nova no briefing existente**, datada, "vale daqui em
  diante" — não um documento novo, não um plano de tarefas.
- Formato por seção: **citação literal do dono** (recortada da
  transcrição, com as correções de reconhecimento aplicadas dentro da
  citação) → 3–6 bullets do que muda, sempre dizendo o que **sai**.
- Declare no topo as regras de tradução:
  - componente citado **com link e a palavra "exato"** (ou equivalente) é
    portado: o código do link, com o cabeçalho de licença; componente citado
    **de memória ou por nome de site, sem link** (21st, React Bits,
    Aceternity…) entra como **implementação nossa** da mecânica, em
    CSS/SVG/GLSL. Código atrás de login vira standby rotulado. Em qualquer
    caso, nenhuma dependência nova de runtime sem decisão explícita do
    dono;
  - rede social citada pela marca vira tela **genérica**; o nome não aparece
    no texto renderizado nem em `aria-*` (o dono nomeia apps para se fazer
    entender, a página não);
  - número dentro de mockup é UI ilustrativa, nunca prova.
- Um parágrafo **"Exceções decididas nesta rodada"** e um bloco final
  **"Ideias anotadas (não executar agora)"** para o que o dono narrou como
  "vamos guardar essa ideia" / "não é a ideia principal".
- Cada subagente lê o bloco da sua seção como **item 1** da lista de leitura,
  rotulado "é o contrato". Ele lê a fala do dono, não a paráfrase do
  orquestrador.

## Quando o áudio contraria uma regra dura

Um pedido pode contrariar a copy literal, um veto de cor ou a estrutura. Não
execute e não ignore. Nesta ordem:

1. **Meça o risco**: `grep` a coisa nos contratos de copy, nos testes e nos
   gates. Diga se sair ou entrar quebra algo.
2. **Pergunte**, declarando o conflito em uma frase: o que ele pediu, qual
   regra isso contraria, o que quebra (ou não), e se a exceção vale só para
   esta seção ou muda a regra da página.
3. Confirmado, **escreva a exceção como exceção**: no briefing, na ficha da
   seção e no registro da sessão, delimitando o que continua valendo — e
   atualize o verificador no mesmo commit, se ele reprovaria.

O caso precedente: o 🔷 saiu de duas seções porque é bullet decorativo; os
❌/✅ ficaram porque codificam polaridade. O critério que separa os dois está
em `taste.md`.

## O que o áudio descreve mal

- **Composição espacial** ("duas para cima e duas para baixo", "à direita
  inferior", "num cantinho") — a fala não resolve; o print resolve. Prever
  uma iteração de print para cada instrução espacial.
- **Números** — o dono hesita ("36… 43… 47… um número mais baixo ainda").
  Cravar o valor é pergunta, não escolha.
- **Qualidade de movimento** ("mais tech") — sem definição de easing. Perguntar.
- **Ordem interna** (mockup acima ou abaixo da lista) — foi corrigido depois
  de implementado; perguntar antes economiza a rodada.
- **Diagnóstico × sugestão.** O incômodo concreto ("achatado", "não
  centralizado") é ordem; a solução dita com "não sei, talvez" é hipótese —
  aplique a menor correção que resolve o incômodo e mostre a hipótese como
  opção. Uma sugestão executada ao pé da letra voltou com "prefiro que volte
  do jeito que tava… era só pra deixar mais largo".

## Veredito de imagem por áudio

Quando o veredito de uma imagem-conceito chega por áudio, transcreva o
trecho e registre-o **literal e datado** no `veredito.md` da seção, com o
nome do arquivo escolhido. Troca posterior é **entrada nova**; a anterior
fica. O estado (aprovada / composição / refazer / voltar às ideias) vai
dentro da entrada — ver `imagem-conceito.md` §Aprovação.

## Grill de perguntas antes de implementar

Quinze perguntas objetivas, cada uma nascida de uma ambiguidade real. Fazer
as que se aplicam **antes** de disparar o primeiro subagente:

**Layout e ordem**
1. O mockup fica acima ou abaixo da lista, nesta seção?
2. Os cards alinham pela base ou pelo centro? Qual "sobressai" e por quê?
3. "Num cantinho da seção" é qual canto? Sobreposto ao conteúdo ou fora dele?
4. No mobile, os dois lados empilham nesta ordem (❌ depois ✅) ou o positivo vem primeiro?
5. Duas peças de tamanhos diferentes na mesma linha: igualo as alturas ou mantenho e alinho pelo centro?

**Números e conteúdo**
6. O número sobe até quanto, exatamente?
7. Esse número que sobe é um resultado que a oferta pode prometer? Se não, o que sobe no lugar dele?
8. O texto dentro do mockup é ilustrativo definitivo ou placeholder até você mandar o real?
9. Esse rótulo interno ("entregue", "interesses") é copy ou é UI? Precisa bater com alguma palavra da copy?

**Motion**
10. Loop ou uma vez? Se loop, quanto tempo o estado aberto fica parado para dar tempo de ler?
11. Qual é o estado final da cena — onde ela para e o que fica na tela depois?
12. "Mais tech" é rápido e seco, ou elástico com overshoot?
13. A animação dispara ao entrar em cena ou está amarrada ao scroll? Se amarrada, pode ser desfeita rolando de volta?

**Escopo e conflito**
14. Este pedido contraria uma regra escrita (copy literal / paleta / prova). É exceção desta seção ou muda a regra da página?
15. Você citou um componente de biblioteca: tem o link e quer **exatamente** aquele (porto o código com a licença), ou é a mecânica que eu reimplemento? Posso trazer dependência nova, ou só CSS/SVG?

**Para fechar a rodada**
16. Dessa peça que você elogiou, o elogio é do asset inteiro ou de um pedaço? (Uma vez era só o botão.)
17. Isto é ideia anotada para depois, ou é para executar agora?

## O que o áudio nunca menciona — e a rodada tem de checar sozinha

Em quarenta minutos de áudio não apareceu uma vez: acessibilidade, teclado,
contraste, reduced-motion, performance, breakpoint, publicação. É
responsabilidade silenciosa da implementação. Depois de uma rodada assim:

- todo controle que virou clicável é `<button>` com `aria-label` e
  `aria-pressed`; mockup interativo **não** é `aria-hidden`, decorativo **é**;
- emoji decorativo fora do heading, `aria-hidden`;
- alvos ≥ 44 px (inclusive corações pequenos); foco visível; ordem de tabulação
  sã numa seção com oito telas;
- vermelho/verde nunca como único portador de significado;
- sob reduced-motion, tudo legível e nada nasce `opacity: 0`; marquee
  contínuo para; WebGL nem carrega;
- cena por scrub com estado final não se desfaz rolando de volta;
- sem overflow em 320/375/414/768 (marquee full-bleed e bento são os
  candidatos); mobile centralizado;
- comentário em `<style>` sem nome e sem crase, em cada bloco novo;
- **prova de rolagem em carga fria com motion ligado** — a suíte roda sob
  reduced-motion e não vê bug do motor de animação (ver `armadilhas.md`).
