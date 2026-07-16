# 06 — Blog: listing, prose posts, tag pages

**Blocked by:** 03 — Section engine + hero

**Status:** ready-for-agent

**What to build:** The Writing surface. `post` and `tag` documents (per `.scratch/webpage-spec/assets/blog-content-model.md`), `/blog` listing in the design's layout (date, computed read time, title, required excerpt, tag chips), post pages rendering prose-only `richBody` (styles, marks, lists, lede blockquote from excerpt), and `/blog/tag/[slug]` filter pages. The homepage writing section shows the latest posts.

- [ ] Publishing a post in Studio makes it appear on `/blog` and the homepage section
- [ ] Read time computed from body length; excerpt required by schema validation
- [ ] Tag chips link to working tag pages
- [ ] Playwright covers listing, post page, and tag filtering
