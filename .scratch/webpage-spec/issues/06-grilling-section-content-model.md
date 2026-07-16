# Grilling: per-section Sanity content model

Type: grilling
Status: resolved
Blocked by: 01, 05

## Question

Field-by-field Sanity schema for every homepage section (hero, timeline, skills, projects, speaking, certifications, footer/socials, contact) plus the section toggle/order mechanism. The locked design direction decides which design elements exist to model (e.g. do stat tiles survive? do skill bars stay percentages or become something else?); the real content decides cardinality and required fields. Also resolve: do timeline case studies become their own pages or get dropped?

## Answer (2026-07-16)

Full field-by-field model: `.scratch/webpage-spec/assets/section-content-model.md`.
Grilled decisions: plain skill lists (no percentage bars); case studies become their own `caseStudy` document + `/work/[slug]` route (timeline links render only when the reference is set); nav mark is the plain name; contact form collects name + email + message. Structure: `siteSettings` + `homePage` singletons (ordered array of `_type`-discriminated section objects with `enabled` toggles), entity documents (`timelineEntry`, `caseStudy`, `skillCategory`, `project`, `talk`, `certification`), and a shared `richBody` Portable Text type whose block-level spec is owned by the blog ticket (07) and reused by case studies.
