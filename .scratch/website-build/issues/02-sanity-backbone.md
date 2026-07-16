# 02 — Sanity backbone: Studio + siteSettings end-to-end

**Blocked by:** 01 — Walking skeleton

**Status:** ready-for-agent

**What to build:** Content flows from Sanity to the page. Embedded Studio at `/studio`, `siteSettings` singleton (per `.scratch/webpage-spec/assets/section-content-model.md`), TypeGen wired with committed types, a seed script writing the placeholder `siteSettings`, and the homepage rendering name + tagline from Sanity via typed GROQ with ISR. HITL: create the Sanity project.

- [ ] Editing the name in Studio changes the homepage after revalidation
- [ ] `siteSettings` is a pinned singleton in the Studio structure (no create/delete)
- [ ] GROQ queries use `defineQuery` + generated types
- [ ] Seed script is idempotent
- [ ] Playwright asserts seeded name renders
