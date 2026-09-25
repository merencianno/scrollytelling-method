# companions/

Skills autorais que viajam com a `scrollytelling-method`. Cada subpasta é uma
skill completa; subpasta não é descoberta sozinha, então instale por symlink:

```bash
ln -s ~/.claude/skills/scrollytelling-method/companions/tangibilizacao-css ~/.claude/skills/
```

(ou em `<projeto>/.claude/skills/` para instalar só no projeto).

- **`tangibilizacao-css/`** — mini-UIs 100% CSS no lugar de imagem, quando a
  copy tem um objeto reconhecível; opcional.

**`impeccable` é dependência opcional, não vendorizada**: vem do upstream
`pbakaus/impeccable` (terceiro, licença Apache 2.0; versão testada 4.1.1).
Instale conforme o README do upstream. O que esta skill espera dela:
auditoria e polish de UI no refinamento (Passo 7). Sem ela, o
`references/taste.md` e a conferência do refinamento cobrem o piso de
qualidade.

**MCP de geração de imagem** (Magnific, Higgsfield ou outro) também é
opcional: com ele, o agente gera as imagens-conceito seguindo
`GUIA-IMAGENS.md`, "Pelo agente (MCP)"; sem ele, o dono gera no navegador e
salva na pasta da seção.
