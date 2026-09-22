# Template — prompt do subagente de UMA seção

<!-- Seis blocos, nenhum opcional. Contexto limpo; general-purpose. O orquestrador nunca lê o
     componente: lê este relatório, o tsc e os dois prints. Ver references/orquestracao.md. -->

```markdown
Repositório: <caminho> (<stack>). Projeto <nome> em `<pasta>`.
Você refaz o **mockup da seção NN** (`<Componente>`, <o que ela é>) e <o que muda em uma frase>.
Copy não muda. <O que mais não muda.>

## Leia antes (nesta ordem, nada além disso)
1. `<pasta>/sdd/briefing-secoes.md` — §<contrato técnico>, §<micro-interações>, §<revisão vigente>
   e **§<revisão> → bloco "NN · <Nome>"** (a direção do cliente, citada; **é o contrato**).
2. `<pasta>/components/sections/<Componente>.tsx` inteiro (o que existe; <o que sai>).
3. Blocos prontos em `<pasta>/components/ui/`: <lista com props relevantes>.
4. `<pasta>/sdd/camadas.md` — ficha "Seção NN" (você a reescreve, 7 camadas, ANTES do código).
5. `secoes/NN-slug/imagem-*.png` (abra com Read) + o `prompt-vK.md` que a gerou.
   A imagem vale como composição; se divergir da revisão escrita, **a revisão vence** — registre.
6. `<motor de motion>.ts`.

## O que fazer
- <instrução espacial concreta> — o cliente: *"<citação literal>"*.
- Mockup = <bloco novo ou composição>, anatomia: <lista exaustiva do que desenhar>.
  - estado ❌ / vazio: <…>   - estado ✅ / cheio: <…>
- **Sai:** <blocos locais mortos, imports, estado que não serve mais>.
- **Motion:** <padrão de entrada; o que é loop (pausado até entrar); o que é scrub (com estado final)>.
  Reduced-motion: tudo visível no estado final.
- Mock data genérica (<usuários>); nada com nome real, valor em moeda ou resultado.
- Ficha "Seção NN" em `camadas.md` reescrita, título "Revisão <data> (<origem>)".

## Regras duras (reprovam a rodada)
- Copy literal: <as frases desta seção> exatamente como estão. Não quebrar frase de contrato com `<span>`.
- Cores: <cor de ação> em no máximo <N> pontos (<quais>); <semânticos> só via <token> e só se <condição>.
  Sem <cores vetadas>.
- <Marcas de terceiro> não aparecem em texto renderizado nem em `aria-*`.
- Sem `transition` CSS em elemento animado por GSAP. Nada nasce `opacity: 0` em CSS.
- Comentário dentro de `<style>{...}</style>` é público: sem crase, sem nome.
- Mobile < 640 centralizado; sem overflow em 320/375/414/768; alvos ≥ 44 px; texto em mockup ≥ 12 px.
- Mockup interativo não é `aria-hidden`; controles reais são `<button>` com `aria-label`/`aria-pressed`.
- Não edite `<Landing>.tsx`, `config/`, testes, gate, folha global, motor de motion, nem blocos/seções
  existentes além de `<Componente>.tsx` (pode **criar** blocos). <Exceção nominal única, se houver.>
- `npx tsc --noEmit` verde no fim (rode).
- Há um `next dev` na porta <N> que você pode usar para olhar. Não rode build, testes nem outro dev.
- Confira o resultado: `node scripts/shoot-dobra.mjs <url> "#dobra-NN" 1440` e `… 390`; abra os PNG
  com Read, compare com a imagem-conceito e itere até ficar fiel.

## Entrega (≤ 25 linhas, sem código)
Arquivos criados/alterados; anatomia do mockup; como cada loop/entrada roda e quanto dura;
mock data usada; o que saiu; resultado do `tsc`; **dúvidas e ressalvas** (obrigatório).
```
