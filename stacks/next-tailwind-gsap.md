# Stack: Next 15 + React 19 + Tailwind 3 + GSAP

Apêndice de implementação. Os princípios estão em `references/animacao.md` e
`references/armadilhas.md`; aqui está o código real da `/ref`, colável.

## Dependências

Preciso: `gsap` ^3.15 (core + ScrollTrigger, ambos gratuitos), `next` ^15.3
(App Router, `next/font/local`), `react` ^19.1, `tailwindcss` ^3.4 (utilitárias;
os tokens da página são CSS puro), `lucide-react` (ícones de linha dentro dos
mockups), `clsx` + `tailwind-merge` (o helper `cn`).

Explicitamente **não** usado, mesmo existindo no projeto:

- **Framer Motion** — nenhuma animação passa por ele. A divisão GSAP/CSS já
  cobre entradas, scrub e loops; um segundo motor duplicaria o runtime.
- **Plugins pagos do GSAP** (DrawSVG, SplitText, ScrollSmoother, MorphSVG) — o
  traço é `getTotalLength` + `strokeDasharray`, o sticky é CSS nativo.
- **shadcn/ui e Radix** — instalados para o resto da aplicação. A landing é
  HTML e Tailwind crus: os componentes dela são mockups de UI, não controles
  genéricos, e o peso de JS por componente não se paga.
- **Lenis** (smooth scroll) — presente no projeto, fora desta rota: com scrub e
  sticky, o scroll interpolado atrasa o que deveria acompanhar o dedo.

## O hook de motion (único ponto de contato com o GSAP)

`useOneMotion.ts`, 75 linhas cobrindo as 14 seções.

```ts
"use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// A rota é exportada estaticamente: registrar só no cliente.
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export interface OneMotionContext {
  scope: HTMLElement;   // a <section>; todo seletor sai daqui
  desktop: boolean;     // para o que não vale no celular (parallax)
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

export function useOneMotion(
  scopeRef: RefObject<HTMLElement | null>,
  build: (ctx: OneMotionContext) => void,
) {
  useEffect(() => {
    // O context grava o que o builder cria e permite revert em bloco.
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motionOK: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
        },
        (mmContext) => {
          const { motionOK, desktop } = mmContext.conditions as {
            motionOK: boolean; desktop: boolean;
          };
          if (!motionOK) return;           // camada 1 do reduced-motion: o
          const scope = scopeRef.current;  // builder nem roda, nada é escondido
          if (!scope) return;
          build({ scope, desktop, gsap, ScrollTrigger });
        },
      );

      // Os triggers se deslocam quando a fonte real substitui o fallback.
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    }, scopeRef);

    return () => ctx.revert();  // desfaz tweens, triggers e estilos inline
    // O builder é estável por seção (definido no módulo): fora das deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Prepara um traço SVG para ser "desenhado": dashoffset = comprimento. */
export function prepareDraw(path: SVGPathElement | SVGLineElement | SVGPolylineElement | null) {
  if (!path) return 0;
  const length = "getTotalLength" in path ? path.getTotalLength() : 0;
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  return length;
}
```

Quatro decisões embutidas: `gsap.context` escopado no ref (revert limpo no
unmount, indispensável com o remount do StrictMode em dev); as duas condições
no mesmo `matchMedia.add`, para que uma mudança de preferência ou de largura
reverta e reconstrua sozinha; `fonts.ready → refresh`; e `desktop` entregue ao
builder em vez de `window.innerWidth` lido na mão.

## O wrapper de seção

`OneSection.tsx` dá a cada dobra id, tom e ambiente — e é onde mora o
`overflow: clip`.

```tsx
interface OneSectionProps extends React.HTMLAttributes<HTMLElement> {
  dobra: string;                        // "03" → id="dobra-03"
  tone: "dark" | "light" | "deep";      // ritmo claro/escuro da narrativa
  radial?: "top" | "bottom" | "none";   // de onde vem o halo azul
  thread?: boolean;                     // fio de 2px entre blocos escuros
  sectionRef?: React.Ref<HTMLElement>;  // o scope do useOneMotion
  innerClassName?: string;
}

const isDark = tone !== "light";
<section
  ref={sectionRef}
  id={`dobra-${dobra}`}
  data-dobra={dobra}                    // âncoras, testes, verificador de copy
  className={cn(
    // `clip` e não `hidden`: corta igual, mas não cria scroll container,
    // então `position: sticky` funciona dentro da dobra.
    "relative isolate overflow-clip px-4 py-20 sm:px-6 sm:py-28 lg:py-32",
    tone === "dark" && "bg-[var(--brand-canvas)] text-white",
    tone === "deep" && "bg-[var(--brand-canvas-deep)] text-white",
    tone === "light" && "bg-[var(--brand-light-canvas)] text-[var(--brand-ink)]",
    className,
  )}
>
  {isDark && thread && <div className="brand-thread absolute inset-x-0 top-0" aria-hidden />}
  {isDark && radial !== "none" && (
    <div aria-hidden className="pointer-events-none absolute inset-0"
         style={{ background: radial === "top" ? "var(--brand-radial-top)" : "var(--brand-radial-deep)" }} />
  )}
  {isDark && <div className="brand-ambient" aria-hidden />}   {/* grid pontilhado */}
  <div className={cn("relative mx-auto w-full max-w-6xl", innerClassName)}>{children}</div>
</section>
```

O wrapper é Server Component: só as seções que animam levam `"use client"`.

## Esqueleto de uma seção com loops

```tsx
"use client";
const CYCLE = 12; // s — o ciclo inteiro da cena

// Keyframes calculados: uma estação por quarto do ciclo (padrão C).
function stageKeyframes() {
  let css = "";
  for (let i = 0; i < 4; i += 1) {
    const a = i * 25;
    css += `
@keyframes flow-act-${i} { 0%, ${a + 4}% { opacity: 0; transform: translateY(6px); }
  ${a + 8}%, ${a + 22}% { opacity: 1; transform: translateY(0); }
  ${a + 25}%, 100% { opacity: 0; transform: translateY(-4px); } }
#dobra-03 .flow-act-${i} { animation-name: flow-act-${i}; }`;
  }
  return css;
}

const FLOW_STYLE = `
/* Classe comum: timing + pausado. Cada elemento só acrescenta animation-name. */
#dobra-03 .flow-anim { animation-duration: ${CYCLE}s; animation-timing-function: ease-in-out;
  animation-iteration-count: infinite; animation-fill-mode: both; animation-play-state: paused; }
#dobra-03 .flow-live .flow-anim { animation-play-state: running; }
${stageKeyframes()}
/* Vence a global `p, li { text-wrap: pretty }` (1,1,0 contra 0,1,1). */
@media (min-width: 640px) { #dobra-03 .flow-bal { text-wrap: balance; } }
/* Camada 2 do reduced-motion. */
@media (prefers-reduced-motion: reduce) {
  #dobra-03 .flow-anim { animation: none; }
  #dobra-03 .flow-act { opacity: 1 !important; transform: none !important; }
}
`;

export function FlowSection() {
  const scopeRef = useRef<HTMLElement>(null);

  useOneMotion(scopeRef, ({ scope, gsap, ScrollTrigger }) => {
    gsap.from(scope.querySelectorAll("[data-brand-flow-copy] > *"), {
      opacity: 0, y: 26, duration: 0.8, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: scope, start: "top 70%" },
    });

    const stage = scope.querySelector("[data-brand-flow-stage]");
    if (!stage) return;
    // Liga os loops uma vez só, no container da cena: todas as micro-ações
    // partem juntas e o ciclo de 12 s fica em fase.
    ScrollTrigger.create({
      trigger: stage, start: "top 60%", once: true,
      toggleClass: { targets: stage, className: "flow-live" },
    });
  });

  return (
    <OneSection dobra="03" tone="dark" radial="top" thread sectionRef={scopeRef}>
      <style dangerouslySetInnerHTML={{ __html: FLOW_STYLE }} />
      {/* … cena: elementos com className="flow-anim flow-act flow-act-0" … */}
    </OneSection>
  );
}
```

O `<style>` fica dentro do JSX, então o React o serve no HTML do SSR: os loops
já estão descritos no primeiro paint, antes de qualquer hidratação, e nunca há
um frame com a cena sem estilo.

## Fontes por rota e a ponte para o Tailwind

O layout da rota carrega as fontes da marca **só ali**, sem poluir as outras
páginas do projeto:

```tsx
import localFont from "next/font/local";

const funnelDisplay = localFont({
  src: [  // um arquivo por peso estático
    { path: "./fonts/DisplayFont-Light.woff2",   weight: "300", style: "normal" },
    { path: "./fonts/DisplayFont-Regular.woff2", weight: "400", style: "normal" },
    // … Medium 500, SemiBold 600
  ],
  variable: "--font-funnel-display",
  display: "swap",
});

const googleSansFlex = localFont({
  src: "./fonts/GoogleSansFlex-latin.woff2",
  variable: "--font-google-sans-flex",
  weight: "100 1000",   // variável: um arquivo cobre todos os pesos
  display: "swap",
});

export default function BrandLayout({ children }: { children: ReactNode }) {
  return <div className={`${funnelDisplay.variable} ${googleSansFlex.variable}`}>{children}</div>;
}
```

A ponte tem três degraus. `next/font` publica `--font-funnel-display`; a folha
de tokens traduz para os nomes genéricos que o Tailwind espera:

```css
.brand-scope {
  --brand-font-display: var(--font-display-file), "<FONTE-DISPLAY>", -apple-system, sans-serif;
  --brand-font-body:    var(--font-body-file), "<FONTE-CORPO>", -apple-system, sans-serif;
  --font-display: var(--brand-font-display);   /* ponte para o tailwind.config */
  --font-body:    var(--brand-font-body);
}
```

```ts
// tailwind.config.ts
fontFamily: { display: "var(--font-display)", body: "var(--font-body)" }
```

Assim `font-display` e `font-body` funcionam como utilitárias em qualquer rota,
resolvendo para a fonte da marca dentro de `.brand-scope` e para a fonte padrão
fora dele. Nunca `@import` de fonte — é render-blocking.

Arquivos em WOFF2 (TTF chegou a custar cerca de 1 s de LCP no celular),
licenças guardadas junto deles, e o escopo `.brand-scope` aplicado no `<main>` da
landing: todos os tokens `--brand-*` vivem dentro dele e nada vaza.

## Revisão 2026-09-22 — limite de falha, `refresh` antes do builder, loops por IntersectionObserver

O hook acima ganhou três camadas depois de um bug que derrubava a página
inteira (raiz e diagnóstico em `references/animacao.md`). A versão de
produção (`useBrandMotion`) fica assim no miolo do
`mm.add`:

```ts
if (!motionOK) return;
const scope = scopeRef.current;
if (!scope) return;
try {
  // Raiz da corrida: triggers do lote inicial ainda sem `end` são forçados um a um
  // pelo `refresh` do primeiro `create` desta seção, e um `once` que se mata nesse
  // laço deixa a lista com um buraco. O refreshAll itera uma cópia e inicializa todos.
  if (ScrollTrigger.getAll().some((t) => t.end === undefined)) {
    ScrollTrigger.refresh();
  }
  build({ scope, desktop, gsap, ScrollTrigger });
} catch (erro) {
  // Limite de falha: animação que quebra degrada para conteúdo estático visível;
  // um throw dentro do useEffect desmontaria a árvore inteira.
  gsap.set(scope.querySelectorAll("[data-in], [data-hero-in]"), { clearProps: "all" });
  requestAnimationFrame(() => ScrollTrigger.refresh());
  if (process.env.NODE_ENV !== "production") {
    console.warn("[useBrandMotion] builder falhou; seção segue estática", scope.id, erro);
  }
}
```

E `ligarLoops` deixa de criar um `ScrollTrigger` standalone:

```ts
/** Liga os loops CSS de uma cena quando ela entra em quadro, uma vez só. */
export function ligarLoops(scope: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") {
    scope.classList.add("brand-live");
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      scope.classList.add("brand-live");
      observer.disconnect();
    },
    // equivale ao antigo start "top 85%"
    { rootMargin: "0px 0px -15% 0px", threshold: 0 },
  );
  observer.observe(scope);
}
```

Prova: duas rodadas de carga fria rolando a página com motion ligado. Antes
da raiz: 14 dobras, 0 erro, **1 aviso** dizendo qual seção estourava. Depois:
0 erro, 0 aviso. O `try/catch` continua lá sem cobertura de teste — um teste
que role a página inteira com motion permitido e exija N dobras e zero
`pageerror` é a pendência registrada.

## Print por dobra

`scripts/shoot-dobra.mjs <url> "#dobra-NN" 1440` (e `390`) — roda de dentro
do projeto, substitui qualquer captura com `fullPage` ou `locator.screenshot()`
de elemento mais alto que o viewport.
