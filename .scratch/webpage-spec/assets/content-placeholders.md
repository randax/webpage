# Seed content — ALL PLACEHOLDER (2026-07-16)

Øyvind chose to launch with clearly-fake seed content and replace it himself in
Sanity Studio. Nothing in this file is a real fact about Øyvind Randa except
his name, email (oyvind.randa@gmail.com, for contact-form delivery only), and
location (Norway). The canonical placeholder dataset lives in
`prototype-app/data/profile.ts` on branch `prototype/design-directions` —
reuse its shape and values when seeding Sanity.

Rules for the build spec:
- Seed documents must be visibly fake: keep invented org names (Fjordworks,
  Nordlys Labs, Brimstone, Kystnett) — no real-company lookalikes.
- Hero stat tiles and any skill percentages ship **hidden by default**
  (section/field toggle off) so no invented number is publicly visible until
  Øyvind enters real ones.
- Portrait: schema field optional; hero must render well with no image.
- Socials: seed with GitHub/LinkedIn/RSS entries whose URLs are empty; empty
  URL ⇒ link not rendered.
- Blog: seed one sample post exercising every custom block (code, mermaid,
  D2, image, YouTube embed) as a living test page, marked draft.

Remaining content decisions pushed into the per-section schema ticket (06):
- Skill bars with percentages vs plain skill lists (placeholder answer: plain
  lists, bars toggleable).
- Handle format in the nav (e.g. `@oyr` vs `oyr.no` vs none).
