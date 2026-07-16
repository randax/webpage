# 03 — Section engine + hero + design foundation

**Blocked by:** 02 — Sanity backbone

**Status:** ready-for-agent

**What to build:** The homepage becomes the design. Establish the dark-emerald design tokens and fonts from the MagicPatterns target (see SPEC.md design notes), the `homePage` singleton with its ordered `sections` array and `enabled` toggles, a `_type` → component registry, and the hero section fully: kicker, headline, optional portrait (must look right absent), stat tiles behind `showStats` (default off), CTA. Nav renders anchors only for enabled sections.

- [ ] Reordering sections in Studio reorders the page; disabling removes section + nav anchor
- [ ] Hero matches the design with and without a portrait
- [ ] Stats hidden by default per placeholder policy; toggling on shows the tiles
- [ ] Playwright covers enable/disable/reorder via a test dataset mutation or seeded variants
