# Gosto — o que é vetado, o que foi aprovado

Este é o arquivo mais importante da skill e, nesta versão pública, é o mais
vazio nas duas seções que importam. Não é descuido: **gosto é de um cliente
específico**, e o gosto de um cliente não se transporta para outro.

O que se transporta são três coisas, e elas estão aqui inteiras:

1. o **sistema de escopo** que impede tratar decisão de um projeto como lei;
2. as **lições de ofício** que se repetiram em todos os projetos até aqui;
3. o **método de capturar** o gosto de um cliente novo.

Preencha as seções "deste projeto" com o seu — num projeto montado com o kit
(`assets/sdd-kit/`), elas vivem no `taste.md` da peça
(`pecas/<peça>/taste.md`), que nasce vazio e herda daqui só as lições de
ofício. Comece lendo o escopo.

---

## Escopo: de onde a regra veio

**Toda regra deste arquivo começa com um prefixo de escopo.** Ele não é
decoração: é o que impede de herdar como lei o que era decisão de um projeto só.

| prefixo | alcance | ao começar página nova |
|---|---|---|
| `[ofício]` | qualquer página, qualquer cliente, qualquer marca | **transporta** |
| `[casa]` | a agência ou marca guarda-chuva — vale entre projetos dela | transporta **dentro da casa** |
| `[projeto]` | uma página só | **nunca** transporta sem perguntar |
| `[gosto]` | preferência de quem aprova; pode mudar amanhã | **nunca** transporta; não se discute por argumento |

O `⚠` marca as regras que **parecem de ofício e não são**. São as que já
causaram erro ou estão a um passo de causar.

### Por que isto existe

O mesmo erro — ler regra de escopo estreito como princípio universal —
aconteceu quatro vezes em quatro projetos:

1. **"Preço sempre parcelado, nunca o valor cheio"** era decisão comercial de
   um produto e foi aplicada a outro, cuja copy trazia os dois valores. A copy
   venceu.
2. **"Interface no lugar de imagem"** foi destilada de duas páginas de produto
   digital e aplicada a um produto sobre comportamento. Os mockups saíram como
   wireframe e foram recusados como preguiçosos.
3. **"Verde e vermelho não existem nesta marca"** fez converter os ❌ e ✅
   **literais da copy** em anéis neutros. O cliente reverteu — os glifos estão
   escritos no documento, e a regra vale para superfície e composição, não para
   glifo que a copy escreve.
4. **Generalizar uma cor de apoio** para todo cinza estrutural da página foi
   recusado: o pedido tinha lugar certo e só valia ali. Extrapolar um pedido pontual para regra geral é decidir no lugar de
   quem aprova.

Nos quatro casos a regra estava escrita corretamente. O que faltava era **dizer
de onde ela veio**.

### Ao trazer uma regra de outro projeto

Antes de aplicar: ler o prefixo. Se for `[projeto]` ou `[gosto]`, perguntar. Se
for `[casa]`, confirmar que o cliente é a mesma casa. Se não houver prefixo, a
regra é nova e precisa de um antes de virar critério.

---

## Vetos deste projeto

> Um por bloco, com **o motivo ao lado** e o prefixo de escopo na frente. Veto
> sem motivo vira superstição, e alguém o reintroduz na rodada seguinte por
> outro caminho.

_(a preencher)_

## Aprovados deste projeto

> Com a citação literal de quem aprovou. "Horrível", "você matou", "está
> perfeita" carregam a intensidade do julgamento; a paráfrase perde a força e a
> rodada seguinte volta a errar.

_(a preencher)_

---

# Lições de ofício

Estas não são gosto de ninguém — apareceram em todos os projetos e podem ser
adotadas antes da primeira conversa. Todas são `[ofício]`.

## Imagem e composição

**Imagem com fade, blur ou recorte panorâmico não integra, denuncia.** O
gradiente posto sobre a foto para "fundir com o fundo" lê como defeito de
renderização, e o corte panorâmico decapita a cena. Quem segura a imagem é o
palco da própria cor atrás dela.

**Moldura em volta de imagem é remendo.** Se a imagem precisa de moldura para
não flutuar, o problema é o fundo, não a falta de borda.

**Imagem recortada onde cabe interface construída.** Um card recortado de um
screenshot fica errado em toda largura que não seja a original. Reconstruído em
HTML com unidades de container, funciona de 320 a 1440.

**Marcador numérico de dobra ("01", "02"…) denuncia a página.** Explicita que
aquilo é um esquema de N partes, e o leitor começa a contar quanto falta em vez
de ler.

**Metáfora que precisa ser decodificada falhou.** Um selo de garantia tem que
ser reconhecido no instante em que aparece. Se o leitor precisa entender a
charada, ele já passou. Corolário: **o veto costuma ser à metáfora, não ao
objeto** — um relógio é péssimo como selo de garantia (12 meses = 12 horas
exige decodificar) e ótimo quando o assunto *é* tempo.

**Gravidade vira tamanho.** Entre itens paralelos, o mais grave ganha altura e
todos alinham pela base. Grade igual só quando os itens têm o mesmo peso.

**A imagem antes da lista.** Em coluna comparativa o mockup fica **acima** dos
argumentos, para que a pessoa veja primeiro o que aquele caminho traz. Foi corrigido depois de implementado embaixo.

**Memorável em um segundo, no mobile, item por item.** A dualidade que o desktop
mostra lado a lado tem de existir dentro de cada card isolado — no mobile a
leitura é vertical e cada card chega sozinho.

**Grade de colunas iguais não reproduz layout desenhado à mão.** Num bloco real,
quatro cards tinham 366, 270, 292 e 312 px — e era isso que produzia as quebras
de linha. Duas rodadas se perderam tentando chegar lá por proporção de coluna.
Se o protótipo tem medida, a medida é o contrato (ver `medicao.md`).

**Card de protótipo não ganha sombra nem borda por padrão.** Quando o desenho
não tem, a cópia fiel é fundo, raio e nada mais. Acrescentar cromo "porque o
design system tem" é o que faz o resultado não parecer o protótipo.

## Mockups

**O limite do mockup é a afirmação, não o número.** Mock data plausível dentro
da tela, sim — fotos, contadores, notificações, telas operáveis. Prova de
resultado, nunca; e **nenhum número sai do mockup para o texto da página**. A
regra anterior ("mini-UI abstrata, nenhum número") produzia mockups mortos.

**Mock data é cenografia dramaturgicamente correta.** *"Informações que, apesar
de não serem reais, são factíveis, críveis, relacionáveis pelo lead."* A curva
diz o que a copy diz: barras baixas e oscilantes quando a copy fala de meses sem
resultado. O realismo vem da imperfeição, não da abundância.

**O destaque não cai sobre o que a oferta não promete.** Número alto pode ser
cenário; nunca é o alvo do círculo, nem a variável que o contador faz crescer.

**Alta fidelidade não é mais detalhe, é o patamar.** Barras cinzas de skeleton
representam *um mockup*, não a ferramenta. O mockup precisa dizer **qual** app
é, com o mobiliário da categoria: faixa de semana, campo de envio, player com
progresso.

**Produto sem interface pede esquema vetorial, não janela de app.** "Interface
no lugar de imagem" é a resposta da classe *produto com software*. Para produto
sobre emoção, comportamento ou decisão, a resposta é o **diagrama conceitual**:
formas, linhas, arcos, com o texto dentro da composição.

**A tela que o item pede, nunca o chassi repetido.** Oito itens paralelos pedem
oito telas. Isto refina a regra de que asset repetido com um elemento trocado
vale mais que asset novo: **repetição é boa quando é eco** (o mesmo desenho
reaparece seções depois como resposta) e ruim quando é preguiça (o mesmo
desenho para itens distintos na mesma seção). O que separa as duas é a
distância narrativa.

**"Com vida" = sinal de terceiro.** Todo asset positivo tem alguém reagindo;
todo asset negativo é o **mesmo componente esvaziado**. Um par de estados do
mesmo bloco vale mais que dois blocos diferentes.

**Interface encurtada: corta-se o meio, nunca as extremidades.** Topo com o
usuário, o conteúdo, a barra de ações, e já o rodapé da interface. Quando a
mensagem é só o resultado, a barra inferior sozinha basta.

**Vocabulário de plataforma sim, marca não — nem quando o cliente a cita.**
Anatomia, ícones e proporções reais entram; nome, logotipo e wordmark não
aparecem no texto renderizado nem em `aria-*`. Quem revisa nomeia apps o tempo
todo para se fazer entender; a página não. Ponha isso num teste, não só numa
regra.

**Componente citado por site (bibliotecas de efeitos prontos) é referência de
comportamento: reimplementa-se.** Sem dependência nova, sem código copiado.
Dependência pesada de runtime é **decisão de quem aprova**, proposta com o
fallback junto. **A exceção é o link com a palavra "exato"**: componente
citado com o link e "quero exatamente esse" é portado — o código do link, com
o cabeçalho de licença. O pedido, nesse caso, é a ideia original, não uma
versão estilizada dela. Sem link, reimplementa-se a mecânica; código atrás de login
vira standby rotulado.

**Mock data de plataforma encenada é conteúdo real por link de quem aprova.**
Tile de cor com frase no lugar da mídia foi recusado; perfil adivinhado
custou uma rodada. Sem link, o genérico de `copy-contrato.md`; terceiros
nunca.

**Não envolver em card o que já é card.** Nada de anel ou borda em volta de
thumbnail real, nem card em volta de post. A borda extra foi vetada.

**Anatomia do objeto encenado é constante numérica** — post 4:5 ou 1:1,
story 9:16, laptop 16:10, celular 9:19,5 —, com largura mínima legível.
Post retangular num feed quadrado é apontado na hora. Quando quem aprova diz o
número errado e descreve o objeto certo, vale o objeto.

**Dispositivo tem proporção fixa.** A tela entra no tamanho nativo, reduzida
por `scale()` medido, e o excesso é cortado pela borda — nunca esticada.
Notebook esticado foi recusado.

**Quando a oferta é produto com interface, o produto aparece**, com a tela
real, não diagrama. *"As cenas viraram diagramas"* foi o diagnóstico da
página fraca. Releia o que **esta** peça vende antes de herdar regra de outra
peça.

## Conceito e aprovação

**"Bonito" não aprova.** Bonito sem tangibilizar a mensagem volta. A
pergunta é se o objeto torna óbvia a frase da copy, sem legenda. Um "ok"
morno, sem entusiasmo, é recusa, não aprovação.

**Sem comparativo como padrão.** Objeto único que se transforma; no máximo um
par por peça, e só onde a copy é literalmente um par. A repetição de
comparativos foi apontada como vício. Comparativo vira tique antes de virar
estilo.

**Um dispositivo por seção, sem repetir na peça inteira** — não só entre
vizinhas; o maior aparelho vai onde o conteúdo pede escala. Celulares
demais na mesma página levaram à troca de um deles por tablet.

**Formato nativo da plataforma = frase da copy.** Duas escolhas → enquete;
sete dias → story de sete segmentos. As seções aprovadas de primeira foram as
que acharam o formato em que a copy cabia literal.

**Timeline ou fluxograma de nós rotulados não tangibiliza.** A timeline foi
recusada. Vira cards revelados ou o objeto mudando de estado.

**Bloco de oferta é convenção, não palco.** Preço centralizado num card —
oferta alinhada à esquerda é recusada de saída —, hierarquia parcela > de >
à vista > botão > pagamento seguro; a ideia criativa vai para o lado.

**Aprovação de ideia cujo valor é o movimento é hipótese até rodar.** Um
letreiro aprovado em imagem foi implementado, visto animado e descartado.
Mostre o movimento cedo.

**Entredobra tipográfica com conteúdo real serve de respiro** entre
argumentos densos. Foi aprovada justamente como respiro.

## Cor e glifo

**Cor fora da paleta cansa antes de convencer.** Um tom trazido "só nesta seção"
é o começo do fim da identidade.

**Num par comparativo, a polaridade visual tem que bater com a semântica.** Um
vermelho aplicado ao lado do desejo sinaliza alarme onde a copy promete alívio.

**O contraste se faz por forma, não por hue.** Nos bons pares, os dois lados são
quase da mesma cor e o acento cai **só na palavra da virada**. Isso resolve a
polaridade sem gastar uma segunda cor.

**Cor de apoio se coloca onde o cliente pediu, não onde o sistema caberia.**

**Glifo da copy que codifica polaridade fica; glifo que é só marcador de lista
pode sair** — com autorização do dono da copy, registrada, e o verificador
atualizado no mesmo commit. Os ❌/✅ da copy renderizam como emoji: a convenção
é decodificada sem pensar.

**Citação literal de UI de terceiro é confinada ao elemento citado.** Um
gradiente que não está na paleta pode entrar como citação de uma interface real
— num anel, num botão — e não vaza para token, fundo, texto ou CTA. E vem com o
movimento que a UI real tem: meia-citação (forma sem movimento) lê como cópia
malfeita.

## Tipografia

**Corpo de texto abaixo de 17 px em card é decorativo.** Se o texto importa, ele
tem tamanho de leitura; se não importa, ele sai.

**Sem palavras órfãs.** `text-wrap: balance` em h1–h3 e `pretty` em parágrafos e
itens, como regra global do escopo. A regra global (especificidade 0,1,1) vence
a utilitária do framework (0,1,0), então `balance` aplicado direto num `<p>` é
ignorado **em silêncio** — para forçar, criar classe da própria seção. No
desktop, `balance` em frase curta quebra em quatro linhas com respiro
exagerado: a partir de `xl`, voltar para `pretty`.

**Uma escala de títulos para a página inteira.** Quinze headlines em nove
tamanhos, com dois sistemas de tracking convivendo, é o que faz um cliente dizer
que o design system parece bagunçado — e ele tem razão antes de qualquer
medição. A causa é sempre a mesma: página construída em ondas, as dobras
refeitas ganham a escala nova e as intocadas ficam com a antiga. Quatro degraus
resolvem: display / seção / par / card. Rodar a auditoria de escala ao fim de
**cada** rodada (`medicao.md` §4).

**Classe de tipografia precisa de escopo duplo.** Uma regra global
`.escopo h1, h2, h3` vence qualquer utilitária do framework, e `leading`/
`tracking` aplicados por utilitária são descartados em silêncio.

**Serif itálica dentro de título sans ganha +1–2 px** para parecer do mesmo
tamanho. Título em desktop e tablet em até 3 linhas; no celular, em até 4.

**Quebra de linha se fixa com `white-space: nowrap` num trecho, nunca editando o
texto.** Entre o protótipo e o navegador há pixels de diferença de métrica, o
bastante para uma palavra mudar de linha.

## Motion

**Cena com desfecho se conta sozinha ao entrar em quadro, uma vez.** Um mesmo
asset passou por três motions até acertar: loop em CSS (no meio do ciclo metade
dos passos some), scrub (a cena tem um fim, e amarrá-la ao dedo do leitor faz
dela um controle deslizante) e, enfim, timeline disparada por
IntersectionObserver. Scrub continua certo para medidor e contador, onde o
leitor **é** a variável.

**`ScrollTrigger` com `once: true` não é o mesmo que "ao entrar na seção".** Ele
dispara ao **cruzar** uma linha; quem chega por âncora, recarrega a página já
rolada ou salta pelo teclado pode nunca cruzar, e a cena fica parada.

**Timeline encadeada mente sobre a própria duração.** Encadeando por `"<"`, a
duração de cada tween empurra o seguinte e uma cena de seis passos passa de sete
segundos. Posição explícita fecha a mesma cena em 2,6 s.

**Numa cena sequencial, o elemento precisa piscar ao pousar.** Sem o pisco, a
cena lê como uma lista que some e volta, não como algo acontecendo.

**Defina o estado final antes de animar.** Cena de fracasso termina no impasse;
cena de conquista termina no entregável. Animação sem estado final é decoração.

**Loop tem que dar tempo de leitura.** Abre, pausa legível, fecha, repete. O que
divide duas seções (um marquee de tags) se move devagar e **não muda de cor** —
loop que pisca ou cicla cor cansa e foi vetado.

**Quando a copy nomeia um objeto, desenhe o objeto.** O passo se chama
"assinatura" → uma assinatura sendo desenhada. A metáfora é a própria palavra; a
âncora contextual (a linha embaixo) é o que faz o símbolo funcionar.

## Processo

**Um pedido do cliente é hipótese a testar, não especificação a cumprir.** Já
aconteceu de um item ser pedido explicitamente, executado ao pé da letra e
rejeitado ao ser visto — porque o pedido descrevia a intenção, não a solução.

**Protótipo com número é medida; protótipo rascunhado é intenção.** O mesmo
cliente pediu fidelidade total a um protótipo e, dois pedidos depois, tratou
outro como rascunho óbvio a corrigir (centralizar). O que separa
os dois casos é a presença de medida explícita. Na dúvida, perguntar.

**Elogio e veto são granulares.** Um asset inteiro pode ser recusado e só o
botão dele, aprovado. Registrar no nível do componente; a peça boa vai para estoque.

**Diagnóstico é ordem; sugestão com "não sei" é hipótese.** O incômodo
concreto ("achatado", "não centralizado") se resolve; a solução dita com
"talvez" vira opção mostrada, não execução. Um pedido de "mais largo" que virou redesenho teve de voltar ao
que era. Aplique a menor correção que resolve o
incômodo.

**Nenhuma frase para o lead fora da copy, nem em estado de interação** —
feedback de clique, toast, vazio, sucesso. String nativa do app pode
("Seguir", "curtiu"). Não se pergunta: omite-se. Frase inventada fora da
copy foi recusada com dureza.

**Página de venda sem cursor custom e sem loader de entrada.**

**Cuidado com o que a documentação do projeto afirma sobre gosto.** Uma
avaliação sua ("foi o que ficou melhor na página") registrada como se fosse do
cliente vira premissa de outras decisões. Marque quem disse o quê.

---

## Regras duras que costumam valer

**Mobile abaixo de 640 px sem alinhamento à esquerda.** Texto, ícones, listas e
cards centralizados; o alinhamento à esquerda entra a partir de `sm`.

**Semântica de cor com teto.** A cor da marca é estrutura, luz e CTA. As cores
semânticas (ganho, custo) somadas ficam abaixo de ~10% da tela — acima disso
deixam de ser sinal e viram decoração, e a cena perde a leitura.

**Verde e vermelho entram como leitura de estado, com token próprio e lista
fechada de usos** — um medidor, um selo ✗/✓, um doodle. Nunca superfície nem
tema; fora da lista é decisão nova. A escala precisa ser esticada sobre a faixa
que a animação percorre: mapear as paradas em 0–100% quando o medidor só vai
até 16% faz o vermelho nunca aparecer.

**`border-dashed` não reproduz tracejado de referência.** O navegador reparte os
traços sozinho. Medir no golden master e desenhar com
`repeating-linear-gradient` (ver `medicao.md` §3).

> Sobre preço: a política de exibição (parcelado, à vista, ou os dois) é
> **decisão comercial do cliente**, não regra de ofício, e muda de projeto para
> projeto. Registre a do seu aqui, e não a carregue para o próximo.

---

## Como capturar o gosto de um cliente novo

**Mostrar cedo e ao vivo.** Quase todo feedback que muda uma página vem de
sessão com o servidor de desenvolvimento aberto ao lado, não de screenshot
enviado.

**Transcrever literal.** A intensidade do julgamento está nas palavras exatas.
Quando o feedback vem em áudio, a transcrição literal vem antes de qualquer
decisão de código — ver `revisao-por-audio.md`.

**Marcar aprovação com `!`** no documento da rodada. O que tem `!` fica
intocável e vira vocabulário de referência para as seções novas. Fechar a
rodada com um commit só de aprovações, seguido da lista de pedidos abertos — a
rodada seguinte começa por essa lista.

**Procurar o padrão atrás do elogio, não o item elogiado.** Um `!` num
componente pode virar o vocabulário de cinco seções.

**Guardar cada veto com o motivo ao lado.** É o que impede que ele volte.

**Separar "em avaliação" de "aprovado".** O que o cliente narrou como ideia solta
("estou só jogando ideias") não é decisão — vai para uma seção
própria e não se implementa sem confirmar.

---

## O vocabulário de quem revisa

Monte esta tabela no seu projeto, na primeira rodada de revisão. Ela é o que
permite ler um áudio ou um print sem adivinhar, e o que faz um subagente de
contexto limpo entender o pedido. O exemplo abaixo é real, de um projeto cujo
vocabulário girava em torno de redes sociais — o seu vai ser outro.

| Ele diz | Quer dizer | Em código |
|---|---|---|
| pill | tag arredondada de apoio, reta | chip `border-radius: 999px` |
| marquee | faixa horizontal em loop lento, full-bleed | trilha duplicada `aria-hidden` |
| mockup ("mocap") | mini-UI de alta fidelidade em HTML/CSS | nunca wireframe |
| bottom da interface | barra de abas inferior do app, com badges | componente de tab bar |
| pop-up / balãozinho / bolinha vermelha | badge numérico sobre o ícone | badge absoluto com contador |
| push / notificação | toast que desce com texto do app | componente de push |
| stack de notificação | cascata de cima para baixo, deixando ver que há mais | stagger com offset residual |
| doodle / scribble | traço à mão circulando algo | SVG `stroke-dashoffset` |
| bento | cards de larguras desiguais e altura igual | grid assimétrico, `align-items: stretch` |
| tela xoxa / perfil xoxo | sem foto, cinza, zero interação | estado vazio do mesmo bloco |
| com vida | muitas reações, avatar colorido | estado cheio do mesmo bloco |
| IA slop | títulos intercambiáveis, genéricos | sinal de que a seção não tem conceito |
| papel amassado / caixa / pastinha | contêiner que amassa, engole, abre-fecha | loop B; scrub D com estado final |
| selo | ícone central com texto circular | `textPath` |
| composição (no veredito) | a ideia e o arranjo valem; refaz-se o acabamento | nova geração da mesma ideia, mesmo `LAYOUT.` |
| voltar às ideias | a seção volta ao Passo 2 | nova leva em `ideias.md`, sem imagem |
| "exato" + link do componente | a ideia original, não uma estilização | portar o código com cabeçalho de licença |
| componente citado sem link | referência de comportamento | reimplementar a mecânica |
| esdrúxulo | fora de proporção | refazer convencional, proporção nativa do objeto |
| "ok" morno, sem entusiasmo | recusa morna | ideia nova, não ajuste |
| alinhados em bottom | bases na mesma linha, alturas diferentes | `align-items: flex-end` |
| "mais tech" | precisão mecânica, sem easing definido | **perguntar** |
| "sessão" | seção (falha recorrente de transcrição) | — |

As três últimas linhas são o padrão que importa: **termo sem definição técnica
vira pergunta, não escolha**, e erro recorrente de transcrição entra na tabela
para não virar implementação errada.
