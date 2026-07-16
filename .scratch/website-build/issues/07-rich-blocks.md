# 07 — Rich blocks: code, images, video

**Blocked by:** 06 — Blog listing + prose

**Status:** ready-for-agent

**What to build:** Technical writing becomes possible. `codeBlock` (language, optional filename bar, syntax highlighting, copy button), `captionedImage` (hotspot, required alt, caption, full-width option), and `videoEmbed` (YouTube/Vimeo as click-to-load facades, youtube-nocookie). The seed sample post (draft) grows to exercise every one of these blocks.

- [ ] Copy button copies the exact code; filename bar shows when set
- [ ] Images render via Sanity's pipeline with alt text enforced
- [ ] Video embeds load no third-party JS until clicked
- [ ] Playwright asserts all three block types render in the sample post
