# Briefing para o subagente — imagem-conceito por seção (<projeto>)

<!-- Autocontido: o subagente lê este arquivo inteiro antes de qualquer outro.
     O prompt de disparo é curto e aponta para cá. Um lote = 3 a 4 seções. -->

## 1. O que é a tarefa

Estamos entre a **blocagem** e o **código**. Cada seção vira primeiro **uma
imagem 16:9 de desktop**, gerada por IA a partir do seu prompt, que o cliente
aprova antes de qualquer wireframe. A imagem é **ferramenta de pensamento**,
não asset da página. O cliente gera no navegador colando o seu prompt — ele
precisa funcionar sozinho, em inglês, sem contexto.

## 2. A copy é inviolável

- Copy literal em `<caminho>`. Nenhuma palavra, número, emoji ou ordem muda.
  Você **cita** a copy no arquivo para o cliente ler junto, sempre literal.
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
| <cor de outro projeto> | <é de outro expert; nada a ver com este> |
| … | … |

## 5. Anatomia que você pode pedir

<Lista da anatomia real do vocabulário escolhido — o que existe em cada tela e em que proporção.
Sem esta lista o resultado sai em nível de wireframe.>

## 6. O double-check — o que você decide por seção

Antes de escrever o prompt, responda por escrito no próprio arquivo:
**(a)** a ideia sustenta a função narrativa desta seção? **(b)** cabe em uma
frase e não repete o dispositivo de outra seção? **(c)** dá para desenhar em
alta fidelidade sem inventar rosto, número ou depoimento? **(d)** existe ideia
mais forte? Se sim, proponha e use. Se não, **mantenha e diga por quê**.
Manter é resultado válido; trocar por trocar não é.

Considere a **vizinhança**: a tabela de blocagem (abaixo) traz ato e conceito
de todas as seções — use-a para não colidir.

<tabela de blocagem inteira, colada>

## 7. Formato exato do arquivo final

Grave em `<projeto>/dv/secoes/NN-slug/prompt-vK-NN.md`, na estrutura de
`assets/prompt-secao-template.md`.

## 8. Regras de coerência

- Cor de ação em **até três** pontos pequenos por imagem.
- Ato certo por seção, conforme a blocagem.
- Um único `h1` na página; as demais headlines são `h2`.
- Não repita o mesmo dispositivo em seções vizinhas.
- **Não leia `dv/historico/`** — o julgamento tem de ser limpo.
- Não toque em nada fora das pastas das suas seções.

## 9. O que devolver

Por seção: `NN — mantida` ou `NN — revista: <conceito novo>` + motivo em até
3 linhas. Mais: qualquer conflito ou buraco de copy que tenha notado (sem
corrigir a copy). Nada além disso.
