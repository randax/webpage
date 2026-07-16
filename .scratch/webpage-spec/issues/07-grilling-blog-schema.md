# Grilling: blog content model + authoring flow

Type: grilling
Status: resolved
Blocked by: 02, 03

## Question

The blog post schema and authoring experience: Portable Text block set (prose marks, code block with language + filename + copy, mermaid block, D2/interactive block, image with caption/alt, YouTube/Vimeo embed), post metadata (slug, date, tags, excerpt/lede, read time — computed or manual?), listing page model, and the Studio input experience for each custom block (preview in Studio or not). Informed by the diagram-rendering and Sanity-integration research answers. Also settle SEO/OG images and RSS here or spawn follow-ups. Note from ticket 06: the post body must be a shared `richBody` type — `caseStudy.body` reuses it verbatim, so design the block set once for both.

## Answer (2026-07-16)

Full model: `.scratch/webpage-spec/assets/blog-content-model.md`. Grilled decisions: read time computed at render; excerpt is a required manual field (listing + meta description + lede); tags are documents with `/blog/tag/[slug]` pages; the diagram block gets a custom Studio input with live Mermaid preview (D2 preview infeasible in-Studio — code field + draft-mode hint); OG images auto-generated via `/api/og` with per-post override; full-content RSS at `/rss.xml` (diagram/video blocks degrade to post links). `richBody` block set (prose, codeBlock, diagram, captionedImage, videoEmbed) locked and shared with `caseStudy.body`; no callout/table blocks v1.
