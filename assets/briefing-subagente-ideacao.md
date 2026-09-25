# Briefing para o subagente — ideias em texto e imagem-conceito por seção (<projeto>)

<!-- Autocontido: o subagente lê este arquivo inteiro antes de qualquer outro.
     O prompt de disparo é curto e aponta para cá. Um lote = 3 a 4 seções.
     No projeto, este arquivo vive em pecas/<peça>/subagentes/BRIEFING-IDEACAO.md. -->

## 1. O que é a tarefa

Estamos entre a **blocagem** e o **código**. O seu entregável primeiro é
**a leva em texto**: para cada seção do lote, `ideias.md` com 3–5 ideias no
formato de `references/ideias-ascii.md` (nome curto, leitura da copy,
mecanismo vivo, esboço ASCII, blocos de origem) e uma recomendação com o
porquê. **Não escreva prompt de imagem nesta etapa.** O dono escolhe 1–2
ideias por seção (portão 1).

Só depois da escolha, e só para as escolhidas, cada ideia vira **uma imagem
na proporção declarada no `projeto.md`**, gerada por IA a partir de um
prompt, que o dono aprova antes de qualquer wireframe (portão 2). A imagem é
**ferramenta de pensamento**, não asset da página. Quem gera cola o seu
prompt no gerador — ele precisa funcionar sozinho, em inglês, sem contexto.

## 2. A copy é inviolável

- Copy literal em `<caminho>`. Nenhuma palavra, número, emoji ou ordem muda.
  Você **cita** a copy no arquivo para o dono ler junto, sempre literal.
- **Nada é inventado**: sem depoimento, número que se leia como prova, print
  de resultado, nome de cliente, rosto.
- **O texto dentro da imagem é ilustrativo.** O prompt descreve lugar e peso
  dos textos, nunca a frase.

## 3. A direção visual — "<nome>", linha V<K>

<Resumo da direção: produto, quem é o cliente, qual vocabulário identifica o projeto.
Paleta estrita com hex. Tipografia. "Cara de screenshot, não de ilustração de IA".>

### Prefixo comum (cole no início de TODO prompt, sem alterar)

```text
<prefixo>
```

Depois do prefixo, uma linha em branco e `LAYOUT.` seguido da cena.

## 4. Vetos herdados (com o motivo, para não virar superstição)

| Veto | Por quê |
|---|---|
| <fade, blur de borda, moldura> | <"blur branco"; reprovado em todo projeto da casa> |
| <marcador numérico de dobra> | <vira ornamento> |
| <rosto real ou gerado> | <prova inventada; onde há foto, é slot> |
| <mockup em nível de wireframe> | <"assets preguiçosos, extremamente toscos"> |
| <cor de outro projeto> | <é de outro projeto; nada a ver com este> |
| … | … |

## 4b. Dispositivos já usados e vistos pelo dono

Na peça inteira, não só nas vizinhas. Não repita nenhum sem eco declarado.

| Seção | Dispositivo | Versão vista pelo dono |
|---|---|---|
| <NN> | <perfil / story / enquete / laptop / …> | <v1, v2 aprovada…> |

## 5. Anatomia que você pode pedir

<Lista da anatomia real do vocabulário escolhido — o que existe em cada tela e em que proporção.
Sem esta lista o resultado sai em nível de wireframe.>

## 6. O double-check — o que você decide por seção

Roda **sobre a leva em texto**, antes de o dono escolher. Para cada ideia,
responda por escrito no próprio `ideias.md`:
**(a)** a ideia sustenta a função narrativa desta seção? **(b)** cabe em uma
frase e não repete o dispositivo de outra seção? **(c)** dá para desenhar em
alta fidelidade sem inventar rosto, número ou depoimento? **(d)** existe ideia
mais forte? Se sim, proponha e use. Se não, **mantenha e diga por quê**.
Manter é resultado válido; trocar por trocar não é.

Considere a **vizinhança**: a tabela de blocagem (abaixo) traz ato e conceito
de todas as seções — use-a para não colidir.

<tabela de blocagem inteira, colada>

## 7. Formato exato do arquivo final

- **Leva de ideias:** `pecas/<peça>/secoes/NN-slug/ideias.md`, uma seção
  datada por leva (`## Leva N — AAAA-MM-DD`), no formato de
  `references/ideias-ascii.md`.
- **Prompt (só depois da escolha):** `pecas/<peça>/secoes/NN-slug/prompt-vK.md`,
  na estrutura de `assets/prompt-secao-template.md`, com a linha
  `**Ideia:** <nome>` e o esboço ASCII escolhido colado no `LAYOUT.`.

## 8. Regras de coerência

- Cor de ação em **até três** pontos pequenos por imagem.
- Ato certo por seção, conforme a blocagem.
- Um único `h1` na página; as demais headlines são `h2`.
- **Um dispositivo por seção na peça toda** — não só entre vizinhas (tabela
  4b).
- **No máximo um par por peça**, e só onde a copy é literalmente um par;
  nada de A × B como padrão — objeto único que se transforma.
- **Não leia vereditos de outras seções antes de escrever a sua** — o
  julgamento tem de ser limpo.
- Não toque em nada fora das pastas das suas seções.

## 9. O que devolver

Por seção: `NN — leva com N ideias, recomendação: <nome>` + motivo em até
3 linhas. Na etapa de prompt (depois da escolha): `NN — mantida` ou
`NN — revista: <conceito novo>` + motivo. Mais: qualquer conflito ou buraco de copy que tenha notado (sem
corrigir a copy). Nada além disso.
