# Blog content model + authoring flow (resolved 2026-07-16)

Grilled decisions: **computed read time** · **required manual excerpt** ·
**tag documents with filter pages** · **live diagram preview in Studio** ·
**auto-generated OG images (with per-post override)** · **full-content RSS**.
Mechanics per the diagram-rendering and Sanity research
(`research-diagram-rendering.md`, `research-sanity-nextjs.md`).

## `post` document

| field | type | notes |
|---|---|---|
| title | string, required | |
| slug | slug from title, required | route `/blog/[slug]` |
| publishedAt | datetime, required | listing sort desc |
| excerpt | text, required | listing card + meta description + lede blockquote |
| tags | array of reference → `tag` | |
| body | `richBody` | shared with `caseStudy.body` |
| ogImage | image, optional | overrides the generated OG card |

Read time: computed at render from body word count (~200 wpm), no field.
Drafts: Sanity's native draft/publish; no custom workflow.

## `tag` document

`title`, `slug`. Filter pages at `/blog/tag/[slug]`. Post chips link there.

## `richBody` (shared Portable Text type)

1. **block** (prose): styles normal / h2 / h3 / blockquote; marks strong, em,
   inline code, external+internal link; bullet & numbered lists.
2. **codeBlock**: `{language, filename?, code, highlightLines?}` — rendered
   with syntax highlighting, filename bar, copy button.
3. **diagram**: `{engine: 'mermaid' | 'd2', code, caption?}` — site render:
   Mermaid client-side (unique id from `_key`), D2 pre-rendered to SVG
   server-side; both wrapped in pan/zoom (react-zoom-pan-pinch).
4. **captionedImage**: `{image (hotspot), alt (required), caption?,
   fullWidth?}`.
5. **videoEmbed**: `{url (YouTube/Vimeo, provider derived), caption?}` —
   rendered as facade/lite embed (no third-party JS until click),
   youtube-nocookie for YouTube.

Deliberately no callout/table blocks in v1 — trivially added later as new
object types without migration.

## Studio authoring UX

- **diagram block gets a custom input with live preview**: Mermaid renders
  in-Studio as you type (client-side, same library as the site).
  **D2 caveat**: the D2 WASM renderer is Node-targeted; in-Studio preview is
  not feasible v1 — D2 blocks show the code field plus a "preview via draft
  mode" hint. Scoped build item: one custom Studio component
  (`DiagramInput`), debounced render, error surface for syntax mistakes.
- codeBlock uses a standard code-input plugin (language dropdown, monospace
  editing).
- Everything else: stock Studio inputs.

## Listing, SEO, feed

- `/blog`: all posts date-desc, design's "Writing" layout (date, read time,
  title, excerpt, tag chips).
- OG: `/api/og` route via `@vercel/og` renders title + tags + name in the
  site's dark-emerald style; `post.ogImage` overrides.
- RSS: `/rss.xml`, full content. richBody → HTML: prose, code (pre/code),
  images render fully; diagram and video blocks degrade to a placeholder
  linking to the post (feed readers can't run Mermaid).
