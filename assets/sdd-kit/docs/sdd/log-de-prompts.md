# Log de pedidos do dono

Registro dos pedidos feitos ao agente, em ordem, para lembrar o que foi
conversado em cada sessão. Os pedidos ficam **literais** (como foram
escritos, com os erros de digitação); ao lado, o que foi entendido e o que
foi feito. Numeração contínua entre sessões. A mais recente fica embaixo.

Formato: `## AAAA-MM-DD — tema da sessão` (+ `Branch:` opcional) →
`### N. título curto` → blockquote literal (áudio transcrito entra inteiro;
corte marcado com […]) → **Entendido:** → **Feito:** (com hash de commit).
Pedidos consecutivos sem resposta própria podem dividir um Entendido/Feito.
Respostas de grill entram como bullet "Respostas do grill".
Regra: a cada pedido substantivo, anexar e commitar junto com o trabalho.

---

## <AAAA-MM-DD> — <tema da sessão>

Branch: `<branch>`

### 1. <título>

> <pedido literal do dono>

- **Entendido:** <…>
- **Feito:** <…> (`<hash>`)
