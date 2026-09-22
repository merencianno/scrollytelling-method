---
name: scrollytelling-method
description: Transformar uma copy aprovada em telas — landing com scrollytelling, deck de slides, carrossel, criativo de social ou UI de produto. Cobre a parte criativa, da copy à peça final: blocagem que trata texto e composição juntos, prompt de imagem-conceito por unidade na proporção do formato, veredito de quem aprova antes de qualquer código, wireframe e layout em ficha de 7 camadas, mockup de interface com mock data (nunca prova), loops pausados até entrar em cena e copy inviolável. Use sempre que o usuário pedir "página de vendas", "landing com scrollytelling", "transformar essa copy em página", "reimaginar a landing", "transformar essa copy em slides", "deck", "apresentação", "carrossel", "criativo", "tela de produto", "tangibilizar a copy", "imagem-conceito por seção", ou quando existir uma copy dividida em blocos esperando virar tela. Não cobre build, teste, deploy nem gate de publicação.
license: MIT
---

# scrollytelling-method

Método para transformar uma copy aprovada em **telas**. Cobre a parte criativa
inteira: da copy à peça final exportada.

Não é um tema visual: é um processo. Trocar cor e fonte numa estrutura
existente é maquiagem, e vai ser rejeitado na primeira revisão.

O que vem depois da peça pronta — build, teste, deploy, gate de publicação —
está fora do escopo. Ver "O que fica fora", no fim.

## O formato decide três coisas

A unidade, o eixo do tempo e **a proporção da imagem**. O resto do método não
muda.

| formato | a unidade | o eixo do tempo | proporção | a peça final |
|---|---|---|---|---|
| landing, página de vendas | a dobra | o scroll | 16:9, mais 9:16 quando o mobile muda a cena | HTML/CSS, Next |
| deck, apresentação | o slide | o avanço | 16:9 | `.pptx`, PDF, HTML/Next, ou Figma pelo MCP |
| carrossel de social | o card | o swipe | 1:1 ou 4:5 | PNG em sequência, na ordem |
| story, reels estático | a peça | — | 9:16 | PNG |
| criativo de feed | a peça | — | 1:1 ou 4:5 | PNG (CSS → export) ou Figma pelo MCP |
| UI de produto | a tela ou o estado | a interação | a do dispositivo | código ou Figma pelo MCP |

**A proporção é parâmetro, não constante.** Decida no Passo 0, escreva no
`projeto.md`, e todo prompt de imagem herda dela.

Leia "dobra" e "seção", no resto destes arquivos, como **a unidade do seu
formato** — o vocabulário vem do caso de origem, que é a página.

## A regra de ouro

Cada seção precisa de um **conceito nomeável em uma frase**. "O placar dos dois
caminhos", "a pilha que pousa", "a publicação que não vira presença". Se não dá
para nomear a cena, ainda é repaginação disfarçada — e o cliente vai perceber
antes de você. E a cena precisa **caber numa imagem que o cliente aprove antes
do código**: se não dá para desenhar, não dá para implementar.

## Em que modo você está

A regra de ouro vale no modo **autor** — e autor é um dos quatro. Antes de
desenhar qualquer coisa, responder:

> **Existe referência? Ela tem número?**

| resposta | modo | o que fazer |
|---|---|---|
| referência **com medida** | **executor** | medir e copiar; nada que a referência não tenha |
| referência **sem medida** | **intenção** | ler o que ela quer dizer, não o que ela mostra |
| referência **de composição** (a imagem-conceito aprovada) | **fidelidade** | reproduzir arranjo, dispositivo e lugar do acento; texto, cor exata e movimento vêm do código |
| não existe referência | **autor** | aí sim conceito nomeável e reimaginação |

O quarto modo é novo: a referência é **criada pelo próprio pipeline** (Fase
1.5a) e obriga fidelidade de arranjo sem obrigar fidelidade de pixel. Se a
imagem divergir de uma revisão escrita posterior, a revisão vence.

**Quando a casa tem designer própria, o modo executor é o caso comum, não a
exceção** — a referência chega como print de Figma com medida. **O modo
muda no meio do projeto, seção a seção** — a pergunta se refaz a cada entrega.

### Executor — existe medida

Reproduzir. O erro característico é **melhorar o que já estava especificado**:
acrescentar sombra e borda ao card porque o componente da casa tem as duas;
escolher proporção de coluna quando o desenho tinha quatro larguras próprias;
inclinar as pills porque ficou bonito. Em modo autor isso é o trabalho. Em modo
executor é desobediência. **Nada de cromo que a referência não tem. Medir, não
estimar** (`references/medicao.md`).

### Intenção — existe rascunho, sem medida

Ler o que a referência quer dizer. Alinhamento, espaçamento e quebra de linha
num protótipo rudimentar são acidente do desenho rápido, não instrução. O mesmo
cliente disse "quero idêntico, pixel perfect" e "é óbvio que é pra centralizar,
estava assim no protótipo porque era rudimentar" — **o que separa os dois casos
é a presença de medida.** Na dúvida, perguntar.

### Fidelidade — existe imagem-conceito aprovada

Implementar com a imagem **aberta ao lado**; refazer com a imagem **e o print
atual** lado a lado, iterando. A composição da imagem vale mais do que a
leitura livre dela. O que a imagem carrega: arranjo, dispositivo, hierarquia,
lugar do acento de cor. O que ela **não** carrega e é lixo do gerador: texto,
número, logotipo, cor que escapou da proibição.

### Autor — não existe direção

Vale o método inteiro: direção escrita, conceito nomeável por seção,
imagem-conceito, camadas, tangibilização.

## O que você prepara antes de chamar a skill

Duas coisas: **a copy** e **a direção visual**. O resto a skill cria.

```text
meu-projeto/
├─ projeto.md              formato, unidade, proporção, prazo — dez linhas
├─ copy/
│  └─ copy.md              a copy aprovada, um título por bloco. É inviolável.
├─ direcao-visual.md       a direção a ser seguida — ou a matéria-prima dela
└─ referencias/            imagens, prints, pesquisa, moodboard que você trouxe
```

**`projeto.md`** — formato e unidade, a proporção da imagem, o formato do
arquivo final, quem aprova, o prazo, e quais condicionais valem (ritmo de
superfícies, motion, responsividade, performance). Dez linhas resolvem, é o
primeiro arquivo que a skill lê, e o template está em
`assets/projeto-template.md`.

**`copy/copy.md`** — a copy aprovada, dividida em blocos, com um título por
bloco. Nenhuma palavra, acento, número, caixa, emoji ou ordem muda depois.
Mudam hierarquia, agrupamento e ênfase.

**`direcao-visual.md`** — chega na fidelidade que você tiver. A skill converte
qualquer uma destas entradas no mesmo documento escrito:

| o que você tem | o que a skill faz com isso |
|---|---|
| nada | escreve do zero, a partir da leitura da copy e de referência real |
| texto solto, briefing falado | lê **intenção**, não instrução; o que for medida, pergunta |
| imagens, moodboard | extrai paleta e vocabulário — **nunca layout** |
| pesquisa + imagens + texto | vira direção escrita, não cópia |
| Figma de direção (paleta, marca, ícones) | extrai três coisas: paleta exata, assets exportáveis, frames como moodboard |
| Figma de página, com medida | **modo executor**: mede e copia, sem cromo a mais |

Aí é só pedir: *"roda a skill nesse projeto"*.

## O que a skill cria

```text
meu-projeto/
├─ direcao-visual.md       ← reescrito: com nome, paleta em hex, o que não entra,
│                             e o PREFIXO COMUM dos prompts, colável
├─ blocagem.md             ← uma linha por unidade
├─ secoes/
│  ├─ 01-<slug>/
│  │  ├─ prompt-v1.md         o prompt da unidade 01, versão 1
│  │  ├─ prompt-v2.md         versão nova nasce AO LADO, nunca por cima
│  │  ├─ imagem-v1-<modelo>.png   ← você gera e salva aqui
│  │  ├─ imagem-v2-<modelo>.png
│  │  ├─ veredito.md             ← aprovada | refazer: … | usar parte: …
│  │  └─ camadas.md              ← wireframe (1–3) e layout (4–7)
│  ├─ 02-<slug>/
│  └─ …
├─ saida/                  a peça final, no formato do projeto.md
└─ historico/              nada se apaga: versão substituída vive aqui
```

Uma pasta por unidade, e o nome do arquivo carrega a versão e o modelo. É o
que permite empilhar tentativas sem perder nenhuma.

## O fluxo, em oito passos

| passo | o que produz | quem faz |
|---|---|---|
| **0 · Pasta e direção** | `projeto.md`, `direcao-visual.md` reescrito com nome e prefixo | você prepara, a skill reescreve |
| **1 · Blocagem** | `blocagem.md` — texto **e** composição, juntos | a skill |
| **2 · Prompts** | `secoes/NN-slug/prompt-v1.md`, um por unidade | a skill |
| **3 · Imagens e veredito** | as imagens e o `veredito.md` de cada unidade | **você** |
| **4 · Wireframe** | camadas 1–3: fundo, estrutura, texto no lugar | a skill |
| **5 · Layout** | camadas 4–7: estilo, cor, mockup, movimento | a skill |
| **6 · Refinamento e revisão** | a peça fiel à imagem, e as aprovações congeladas | a skill refina, **você aprova** |
| **7 · Peça final** | `saida/`, no formato do `projeto.md` | a skill |

**Nada se exporta antes do passo 6.** Depois da exportação o custo de mudar
multiplica: são N PNGs para regerar, um `.pptx` para refazer, uma página para
republicar. O passo 6 é o último lugar barato.

### Passo 0 — A direção, escrita e apresentada

A direção visual é **obrigatória e escrita**, exista Figma ou não. Ela vem
antes de qualquer prompt. Saída: nome em uma frase, a leitura da copy que a
sustenta, a tabela elemento → o que diz na copy → onde entra, paleta com hex,
o que não entra, e o **prefixo comum dos prompts**, colável. Template em
`assets/direcao-visual-template.md`; regras em `references/direcao-visual.md`.

Ela é **entregável**, não documento interno — é a primeira coisa que quem
aprova vê. Enxuta ou elaborada conforme o prazo; a versão elaborada traz duas
linhas alternativas e **uma imagem-conceito de amostra** de uma unidade-chave.
Direção lida como texto é aprovada por educação; direção com uma unidade já
desenhada é aprovada ou vetada de verdade.

A direção **carrega assets** (marcas, ícones, fotos, texturas) e nasce de
referência real, **nunca por inércia do projeto anterior**.

### Passo 1 — Blocagem é diagramação E composição

Uma linha por unidade: função narrativa → conceito nomeável → ato claro/escuro
→ disposição → motion → assets. Template em `assets/blocagem-template.md`,
critérios em `references/blocagem.md`.

**A regra que organiza esta fase: nunca trate a unidade como só texto.** Copy
densa tenta você a resolver primeiro a disposição do texto e encaixar imagem
depois — e o resultado é uma peça que já nasceu sem lugar para a cena. A
blocagem decide, na mesma linha, **onde o texto fica e o que mais está ali**.

A ordem padrão é blocagem antes dos prompts, porque a disposição precisa estar
decidida antes de descrever a cena. A ordem inversa — gerar imagem primeiro e
blocar depois — é legítima e vale testar em copy curta; o que não se faz é
blocar como se fosse só texto.

### Passo 2 — Um prompt de imagem por unidade

Cada unidade vira **uma imagem na proporção do formato**, que quem aprova vê
antes de existir qualquer código. Estrutura do arquivo em
`assets/prompt-secao-template.md`: prefixo comum inalterado + `LAYOUT.` + a
cena, com o double-check (a–d) respondido antes de gerar.

A cena descreve **lugar e peso** do texto, nunca a frase — o gerador escreve
errado, e a copy só existe na peça final. Um dispositivo por unidade, nunca o
mesmo em vizinhas. Cor de ação em até três pontos.

Regras completas em `references/imagem-conceito.md`; o passo a passo de quem
só aprova, em `GUIA-IMAGENS.md`.

### Passo 3 — Gerar, comparar, aprovar

Você gera (no navegador ou por um gerador ligado ao Claude), salva na pasta da
unidade com versão e modelo no nome, e escreve uma linha no `veredito.md`:
`aprovada`, `refazer: <o quê>` ou `usar parte: <qual>`.

**O gate é a sua satisfação com as ideias, não a primeira imagem.** Peça
variações, empilhe `prompt-v2`, `prompt-v3` ao lado do v1, teste modelos. Só
se avança quando você estiver satisfeito com a ideia de cada unidade **e com a
distribuição da copy entre elas** — mover uma frase de unidade custa barato
aqui e custa uma rodada depois.

No fim, **uma ideia por unidade**, com o histórico inteiro preservado.

### Passos 4 e 5 — Wireframe, depois layout

A imagem aprovada é composição, não peça. Ela vira estrutura em duas etapas,
escritas na ficha de **sete camadas** da unidade (`references/camadas.md`,
template em `assets/camadas-template.md`):

| etapa | camadas | o que decide |
|---|---|---|
| **wireframe** | 1 fundo da página · 2 fundo da seção · 3 textos | o esqueleto: o que é bloco de texto, onde o mockup entra, que espaço ele ocupa |
| **layout** | 4 estilo · 5 cores · 6 mockups · 7 animações | o acabamento: escala tipográfica, onde cai a cor de ação, a anatomia de cada mockup, e o que se move |

A camada 7 é onde entra tudo o que a imagem não mostra — e é obrigatória:
**unidade sem mecanismo vivo ligado ao que a copy diz está incompleta**, mesmo
com a composição aprovada.

Implemente com a imagem **aberta ao lado**; ao refazer, com a imagem **e o
print atual** lado a lado.

### Passo 6 — Refinamento e revisão

São **dois loops diferentes**, nesta ordem, e pular o primeiro faz o segundo
gastar o tempo de quem aprova com coisa que você mesmo pegaria.

**Refinamento — você conferindo o próprio resultado.** Print de cada unidade
ao lado da imagem-conceito aprovada, iterando até ficar fiel; print também na
largura real do mockup, não só da unidade. Copy literal conferida na peça
renderizada, palavra por palavra. Medir em vez de estimar: vãos, escala
tipográfica, cor e tracejado em `references/medicao.md`. E os condicionais do
`projeto.md` — responsividade e performance, se o formato os tiver.

**Revisão — quem aprova vendo a peça.** Ao vivo, com a peça aberta ao lado:
quase todo feedback que muda uma peça vem de sessão ao vivo, não de print
enviado. **Uma unidade por vez** — cada uma vira asset novo e precisa ser vista
antes da próxima. Feedback em áudio: **transcrever antes de decidir**
(`references/revisao-por-audio.md`) e fazer o grill de perguntas antes de
implementar. **Pedido que contraria regra escrita volta como pergunta** — nunca
se executa em silêncio, nunca se recusa.

**É aqui que o `taste.md` se preenche**, e é o que faz a próxima peça começar
melhor: cada veto guardado **com o motivo ao lado**, cada aprovação com a
citação literal de quem aprovou. Marcar o aprovado e congelar — o que está
congelado vira vocabulário de referência para as unidades seguintes.

**O que a revisão nunca menciona e você tem de checar sozinho:**
acessibilidade, teclado, contraste, `prefers-reduced-motion`, breakpoints. Em
quarenta minutos de áudio de revisão nenhuma dessas palavras apareceu uma vez.

Sai do passo 6 quando as aprovações estão congeladas e a lista de pedidos
abertos está vazia — ou escrita, se alguma ficou para depois.

### Passo 7 — A peça final

| formato | o que sai | o que conferir antes de entregar |
|---|---|---|
| landing | HTML/CSS ou Next | a copy literal na página renderizada; sem overflow em 320/375/414/768 |
| deck | `.pptx`, PDF, HTML/Next ou Figma pelo MCP | a copy de cada slide; fontes embutidas; o deck aberto na ferramenta de destino |
| carrossel | PNG em sequência | ordem dos arquivos, dimensão exata, texto dentro da área segura |
| criativo | PNG exportado do CSS, ou Figma pelo MCP | dimensão, peso, a copy literal na peça |
| UI de produto | código ou Figma pelo MCP | estados cobertos, tokens no lugar de valor cru, o que ficou como slot |

Duas regras em qualquer um deles: **o que sai é rastreável** (de que versão da
direção e de que prompt nasceu) e **artefato exportado não se edita à mão** sem
registrar — a próxima geração apaga a edição em silêncio.

## As regras que definem o estilo

- **Interface quando a copy tem objeto reconhecível.** A pergunta não é "o
  produto tem software?", é **"a copy tem um objeto onde a promessa
  acontece?"** — um post, um perfil, uma planilha. Se tem, a interface desse
  objeto entra com **anatomia real e mock data plausível**; se não tem (emoção,
  decisão), diagrama conceitual.
- **O limite do mockup é a afirmação, não o número.** Nada que se leia como
  prova de resultado; nenhum número sai da tela para o texto da peça.
- **Quando há movimento: a biblioteca faz entrada e scrub, o CSS faz os
  loops** — pausados até a unidade entrar em cena. Estado final definido antes
  de animar. Os cinco padrões estão em `references/animacao.md`.
- **A copy não muda uma palavra.** Mudam hierarquia, agrupamento e ênfase.
- **Token-first.** Cor, tipo, raio, easing e duração saem de tokens escopados
  (`assets/tokens-template.css`).
- **Antes do primeiro conceito, ler `references/taste.md`** — com os prefixos
  de escopo. É o que separa este estilo do visual genérico de IA.

## Uma unidade por vez

Janela de contexto é rainha. Na construção do zero, lotes de 3–4 unidades em
paralelo funcionam — desde que os blocos compartilhados existam **antes** do
primeiro lote. **Na revisão, é uma unidade por vez**: cada uma vira asset novo
e precisa ser vista antes da próxima. Regras e o prompt do subagente em
`references/orquestracao.md` e `assets/prompt-subagente-secao.md`.

## O dial de tempo

O método não tem versão curta: tem versão com menos versões. Sob prazo, corta-se
**quantidade, nunca fase**.

| escala com o tempo disponível | não comprime, porque custa quase nada |
|---|---|
| imagens-conceito por unidade | o contrato de copy (é script) |
| elaboração da apresentação de direção | a direção **com nome** |
| linhas de direção oferecidas (V1, V2…) | o conceito nomeável por unidade |
| rodadas de revisão | a ficha de camadas |

Cortar a Fase 0.5 para ganhar tempo é economia negativa: foi assim que uma V1
nasceu por inércia, saiu "com cara de IA" e custou exatamente a rodada que
tentava poupar.

## Checklist

1. `projeto.md` escrito: formato, unidade, **proporção**, arquivo final, prazo
2. Copy dividida em blocos e congelada
3. **Direção visual escrita**, com nome e prefixo comum colável — e apresentada
4. `references/taste.md` lido antes do primeiro conceito
5. **Modo identificado** — existe referência? tem medida? é imagem-conceito? (refazer a cada entrega)
6. Blocagem em tabela, conceito nomeado em cada unidade, **texto e composição juntos**, sem dispositivo repetido em vizinhas
7. Prompts escritos, um por unidade, na proporção do formato
8. Imagens geradas, comparadas e **aprovadas por quem decide**, com a distribuição da copy conferida
9. Fichas de camadas: wireframe (1–3), depois layout (4–7)
10. Unidades implementadas, uma por vez na revisão
11. **Refinamento**: prints comparados com as imagens-conceito, copy literal
    conferida na peça, medidas conferidas em vez de estimadas
12. **Revisão ao vivo**, uma unidade por vez; áudio transcrito antes de decidir
13. Aprovações congeladas e vetos registrados no `taste.md`, com o motivo
14. Peça final exportada no formato do `projeto.md`, rastreável

## O que fica fora deste escopo

Esta skill vai da copy à peça final. O que vem depois — build, teste
automatizado, gate de publicação, deploy, rastreabilidade de release — não é
assunto dela.

Os arquivos continuam no repositório para quem leva uma peça **web** a
produção, e só nesse caso:

- `references/revisao-e-gates.md` — fechar rodada num projeto de código
- `references/publicacao.md` — o que só o artefato de produção revela
- `scripts/` — contrato de copy, contrato de geometria, print por unidade,
  auditoria de larguras

Para carrossel, criativo ou deck, nada disso se aplica: a conferência da copy
é contra o texto da peça, e a "auditoria de larguras" é a dimensão exigida
pela plataforma.

## O que esta skill não faz

- Não escreve copy. A copy chega pronta e é inviolável.
- Não traduz um arquivo de Figma inteiro em tela, pixel a pixel. Reproduzir um
  golden master de uma unidade é o modo executor e está no escopo.
- Não decide oferta, preço ou posicionamento. Regra comercial de um projeto
  (`[projeto]` no `taste.md`) não se transporta: a copy do projeto vence.
- Não gera o asset final por IA. A imagem gerada é ideia; o que vai na peça
  nasce em HTML/CSS, ou no Figma.

## Limitações conhecidas

- O que está executado em produção são **páginas**. Deck, carrossel, criativo
  e UI de produto seguem o mesmo pipeline com a proporção e a exportação
  trocadas, mas ainda não passaram por uma rodada real.
- Em web, o método produz páginas **pesadas**: muitas unidades com mockup em
  HTML e SVG inline. Medir cedo se o público for majoritariamente móvel.
- A ficha de camadas tende a virar documentação a posteriori se o mesmo agente
  escreve ficha e código. Se a separação importa, exija a ficha como primeira
  entrega.
- O gosto em `references/taste.md` é de um cliente específico, com prefixo de
  escopo por regra. Ponto de partida, não lei universal.
