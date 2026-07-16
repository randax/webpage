# Research: Sanity + Next.js integration patterns (current best practice)

Type: research
Status: resolved

## Question

What is the current (2026) best-practice setup for Sanity + Next.js App Router on Vercel? Cover: `next-sanity` embedded Studio at `/studio`; typed content (sanity-typegen/GROQ vs zod); Portable Text with custom block types (code with syntax highlighting + copy, mermaid/D2 source blocks, YouTube/Vimeo embed blocks, images with hotspot); visual editing / live preview / draft mode; ISR vs webhook on-demand revalidation trade-offs for a personal site; and a section toggle/ordering pattern (singleton page document with ordered section references). Give a recommendation per topic.

## Answer

Full findings: `.scratch/webpage-spec/assets/research-sanity-nextjs.md` on branch `research/sanity-nextjs` (commit 3a10b2e). Versions at research time: next-sanity 13.1.3, sanity 6.5.0, next 16.2.10, @portabletext/react 6.2.0.

- **Embedded Studio at `/studio`**: fine to start — `app/studio/[[...tool]]/page.tsx` + `force-static`; Sanity's own guidance now slightly favors a standalone studio app (faster builds), migration is cheap if the embed bites.
- **TypeGen from day one**: GA since Studio v5.10; `typegen` block in `sanity.cli.ts`, `defineQuery`, commit `sanity.types.ts`.
- **Portable Text custom blocks** (code+filename+copy, diagram source, video embed, image with hotspot+required alt): plain object types in the body array, one shared `components.types` map in @portabletext/react; schema stores raw text, all rendering client-side React.
- **Visual editing: skip for v1** — solo author previews via Studio + local dev; `defineLive` is the on-ramp later.
- **Revalidation**: plain time-based ISR (`revalidate: 60` posts); add a single tag-based Sanity webhook (`next-sanity/webhook` + `revalidateTag`) only if publish latency annoys.
- **Homepage singleton**: standard singleton recipe holding an ordered array of `_type`-discriminated section objects + DIY `hidden` boolean; render via `_type → component` lookup.
