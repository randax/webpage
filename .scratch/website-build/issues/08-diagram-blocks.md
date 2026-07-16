# 08 — Diagram blocks: Mermaid + D2

**Blocked by:** 06 — Blog listing + prose

**Status:** ready-for-agent

**What to build:** Diagrams from text. The `diagram` block (engine: mermaid | d2). Mermaid renders client-side with render ids derived from the block `_key` (the known collision bug), dynamic-imported with a skeleton fallback; D2 pre-renders to SVG server-side inside the ISR path per the research. Both wrapped in pan/zoom. Diagram theming pulls resolved hex tokens from the design.

- [ ] A post with two Mermaid diagrams renders both without id collisions
- [ ] A D2 block serves cached SVG with no client WASM
- [ ] Pan/zoom works; `prefers-reduced-motion` respected
- [ ] Playwright asserts both engines render in the sample post
