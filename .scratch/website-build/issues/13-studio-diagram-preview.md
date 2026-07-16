# 13 — Studio DX: live Mermaid preview input

**Blocked by:** 08 — Diagram blocks

**Status:** ready-for-agent

**What to build:** Writing diagrams feels good. The custom `DiagramInput` Studio component: for Mermaid, a debounced live preview beside the code field with syntax errors surfaced inline; for D2, the code field plus a "preview via draft mode" hint (in-Studio D2 render is infeasible per research).

- [ ] Typing Mermaid in Studio updates the preview without saving
- [ ] Broken Mermaid shows the error, not a blank
- [ ] D2 blocks show the hint and stay editable
