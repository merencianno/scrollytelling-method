# Publicação: o que só o artefato de produção revela

A Fase 5 do método tinha quatro linhas até que uma sessão inteira de
publicação (uma sequência de quatro páginas) produziu quinze regras que
não tinham casa. Todas nascem do mesmo fato: **localhost mente**. O que
funciona no dev server pode quebrar sob o `basePath` real, e o defeito só
aparece no artefato servido.

## Os quatro defeitos que só o artefato mostra

1. **Asset com caminho cru.** `/assets/…` funciona em localhost porque lá o
   `basePath` é vazio, e dá 404 no ar. Todo caminho de asset passa pelo
   helper de `basePath` — inclusive dentro de blocos de UI que montam `src`
   por string. Custou uma sequência inteira de páginas sem imagem em produção; o gate
   herdado pegou a repetição na sequência seguinte.
2. **Chrome do site vazando para a página de venda.** Header e rodapé do
   repositório entraram em três páginas porque a lista de rotas "sem chrome"
   era enumerada rota a rota. Excluir **por prefixo**, para que rota nova
   nasça certa. Sintoma quando falha: dois `<footer>` e teste com "strict
   mode violation".
3. **Nome do repositório na aba.** Sem `title: { absolute: … }`, o template
   do layout raiz manda o sufixo do projeto para a aba e para o preview de
   link de toda página publicada.
4. **Nome de pessoa dentro de `<style>`.** Comentário dentro de
   `<style>{…}</style>` vive numa string, o minificador não remove, e vai ao
   ar. Descreva a animação, nunca quem pediu. (E crase ali fecha o template
   literal e derruba a página em 500 — mesma família.)

## A barra dupla

`dominio.com//rota/` → o Next lê `//rota` como URL protocol-relative, tenta
`replaceState` para o host `rota`, o navegador bloqueia por origem cruzada e a
hidratação morre. **Toda camada tolera a barra dupla menos a última** — por
isso a página pinta e só depois some. Nasce de concatenação (base terminada
em `/` + caminho iniciado em `/`), não de digitação: planilha, automação,
encurtador.

Correção: script inline **síncrono** no layout, antes de qualquer bundle —
`useEffect` chega tarde. Validar **contra o artefato de produção servido sob
o basePath real**, não contra o dev. O diagnóstico perdeu quinze minutos
testando navegador e extensão; o que resolveu foi o console colado pelo
cliente.

## O gate

- **Alvo novo copia o verificador do alvo anterior** e troca só a tabela de
  contratos. As regras do que nunca chega ao ar (nome de pessoa, máquina,
  branch ou repositório no HTML; comentário e crase em `<style>`; `title`
  absoluto; asset sem `basePath`; arquivo não publicável dentro de `public/`)
  se herdam inteiras. Copie o gate, não afrouxe.
- **Dois níveis**: reprova o que aparece no HTML servido; **reporta** o que
  só existe em chunk que a rota nunca renderiza. *Gate que reprova conteúdo
  legítimo é gate que alguém desliga.*
- **Pendência aprovada não reprova** — é aviso do verificador e linha no
  `NOTAS.md`. Publicar com pendência escrita é decisão; sem escrever é descuido.
  Placeholder vira **marcador no DOM** (`data-…-slot-vazio`,
  `data-…-copy-suspeita`), não comentário: o verificador lê o DOM.
- **Mensagem de gate que mente é pior que gate ausente**: ela ensina a
  desligar o gate. Um `.trim()` na saída de `git status --porcelain` comeu o
  espaço inicial e deslocou o caminho em um caractere. Teste a mensagem de
  reprovação.
- O minificador escapa não-ASCII como `\xNN`, não `\uNNNN`. Contrato de copy
  que procura só a forma literal reprova artefato são — varrer HTML e JS nas
  três formas.
- **Rode o `verify` cedo**, não só no fecho. Dois defeitos pré-existentes
  ficaram invisíveis por meses porque o alvo nunca tinha passado pelo gate.

## Antes de republicar o que já está no ar

**A fonte de verdade de uma página publicada é o artefato no ar, não o
código.** Ele acumula edições manuais feitas por outras pessoas; um rebuild
limpo apaga essas edições em silêncio e o diff parece inofensivo porque o
arquivo inteiro é regerado. Já mordeu duas vezes.

- Antes de regerar, **compare com o artefato do catálogo** e leia o flag
  `dirty` do manifesto.
- Mudança pequena em página publicada: editar o artefato direto, marcar
  `dirty: true`, descrever o patch, registrar. Regerar só quando o objetivo
  for republicar a página inteira.
- Artefato de React tem **dois** arquivos com o texto (`index.html` e o
  payload `index.txt`). Trocar só um deixa a página inconsistente.

## Um comando

Publicação é **um comando**: build, verify, branch no catálogo, cópia,
validação, commit, PR e o comando de merge impresso. Nasceu de *"precisamos
criar um padrão que coloque tudo no ar sem essa conversa toda"*. Se ele
reprova por tocar arquivo fora do alvo, está certo.

No PR em repositório de terceiros vai só o artefato e uma ficha enxuta — sem
nome, branch ou repositório de origem — e a prova, no corpo, de que nada
existente foi tocado. **Cheque a permissão real antes de citar a regra
escrita**: uma regra herdada ("o merge é do administrador") custou três
rodadas; a chamada de API que mostrava `push: true` custou dez segundos.

## Duas rotas, uma trava

Padrão de sequência de páginas que se repetiu em três projetos seguidos: a
mesma página publicada em duas rotas — uma com trava de revelação (o fecho
aparece depois de N minutos de vídeo) e uma **liberada** para link de bio.
Consequências operacionais:

- crie a rota liberada **antes** de qualquer verificação: testes, contrato de
  copy, prints e auditoria rodam nela (a travada esconde as dobras do HTML);
- rota nova exige três lugares na mesma rodada: rota fina, alvos de
  `build`/`verify` no `package.json` (é de lá que o comando de deploy descobre
  alvos) e a lista de rotas sem chrome;
- o gate da rota liberada tem a **asserção inversa**: ela *precisa* conter o
  fecho.

## Backlog técnico

O que não se corrige agora vai para um backlog **ordenado por dor**, cada
entrada com o motivo de ter ficado aberta, o custo de resolver e **o efeito
colateral previsto** ("o próximo PR terá diff grande; não é engano").
Critério: corrigir agora se a página é sua e o gate pega; registrar se a
correção toca artefato de terceiro ou artefato `dirty`. Não publique correção
em página que não é sua sem avisar quem cuida dela.

## O que o agente alcança

O repositório próprio. O que não alcança: merge em produção, as próprias
permissões, as próprias instruções. Ao esbarrar, entregue a linha pronta para
o cliente colar — não tente por outro caminho. Ao afirmar que algo está no
ar, meça (`curl` do status). Ao afirmar que outra página tem o mesmo defeito,
reproduza antes.
