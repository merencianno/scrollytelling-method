# Seções — <peca>

<!-- Estado de cada seção, modelo e custo, dispositivos usados. Atualizar a
     cada leva e a cada veredito. -->

## Estado por seção

| # | Seção | Conceito por versão | Modelo | Estado |
|---|---|---|---|---|
| 01 | <slug> | v1 <nome da ideia> · v2 <…> | <sufixo> | <ideias · aguardando escolha · imagem · aprovada · implementada · congelada> |

## Modelo de imagem

- **Padrão do projeto:** <modelo> (decidido no bake-off das seções <NN, NN, NN>, <AAAA-MM-DD>).
- **Custo observado por imagem:** <modelo A: N créditos · modelo B: N créditos>.
- Parâmetros: <proporção do `projeto.md`, resolução, qualidade>.

## Dispositivos já usados e vistos pelo dono

<!-- Um dispositivo por seção, sem repetir na peça inteira. Consultar antes
     de cada leva de ideias. -->

| Seção | Dispositivo | Versão vista pelo dono |
|---|---|---|

## Nomes de arquivo

Cada seção em `secoes/NN-slug/`:

- `ideias.md` — levas de ideias em texto (uma seção datada por leva);
- `prompt-vK.md` — K = número do prompt (a pasta dá a seção); variação nomeada:
  `prompt-vK-<nome>.md`;
- `ideia-vK-<modelo>.png` — K = número do prompt que a gerou; variação:
  `ideia-vK-<nome>-<modelo>.png`;
- escolhida → `ideia-vK-aprovada-<modelo>.png`;
- `veredito.md` — log datado, append-only; existe mesmo pendente.

As versões ficam lado a lado na pasta; nada vai para pasta escondida. Prints
de teste não entram aqui (vão para `arquivo-local/prints-teste/`).

| Sufixo | Modelo |
|---|---|
| `gpt25` | GPT Image 2.5 |
| `seedream5pro` | Seedream 5 Pro |
| `nanobanana` | Nano Banana |
| `mystic` | Mystic |
| `flux` | Flux |
| `outro-<nome>` | qualquer outro |
