# Research: Mermaid + D2 diagram rendering in Next.js

Type: research
Status: resolved

## Question

How should Mermaid and D2 (or comparable interactive) diagrams authored as text in Sanity Portable Text blocks be rendered on a Next.js App Router site? Cover: client vs server/build-time rendering options for each; D2's JS/WASM story (@terrastruct packages, maturity, bundle cost); theming diagrams to match a custom design; SSR/hydration pitfalls; reduced-motion/accessibility; and a recommendation.

## Answer

Full findings: `.scratch/webpage-spec/assets/research-diagram-rendering.md` on branch `research/diagram-rendering` (commit 7998630).

Hybrid, per diagram type:
- **Mermaid → client-side only.** Pin `mermaid@11.16.0`; no viable SSR path (mermaid-cli needs Puppeteer). Render in a `'use client'` component via `next/dynamic({ ssr: false })` — the dynamic import must live in a client wrapper (Server Components forbid `ssr: false`). Suspense/skeleton fallback against layout shift. Always derive a unique render id from the Portable Text `_key` (Mermaid has long-standing ID-collision bugs with multiple diagrams per page).
- **D2 → pre-render to static SVG** at build/webhook time via `@terrastruct/d2@0.1.33` (WASM Go, runs in Node but immature; ~60 MB keeps it off the request path). Serve cached SVG.
- **Theming:** `mermaid.initialize({theme:'base', themeVariables})` takes hex only — resolve design tokens before passing. Gate animated CSS behind `prefers-reduced-motion`; use `accTitle`/`accDescr` for ARIA.
- **Interactivity:** wrap SVGs in `react-zoom-pan-pinch@4.0.3` (not stale `svg-pan-zoom`).
