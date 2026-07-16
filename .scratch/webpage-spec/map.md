# Wayfinder map: Personal webpage build spec

Label: wayfinder:map

## Destination

A full build spec for Øyvind's personal site — every decision locked (design direction, Sanity schema for every element, blog content model, tech architecture) so an implementation agent can build it without further decisions.

## Notes

- **Tracker**: local markdown (`.scratch/webpage-spec/`), per `issue-tracker-local.md` conventions.
- **Stack (fixed by user)**: Next.js + Tailwind on Vercel, Sanity CMS for content, tRPC for dynamic endpoints, pnpm.
- **Skills to consult**: `/prototype` for design tickets (pair with `frontend-design`), `/research` for research tickets, `/grilling` + `/domain-modeling` for decision tickets.
- **Design source**: https://www.magicpatterns.com/c/8dqbu5z4wryxqavdniwbvg — "Marcus Devlin" developer portfolio, dark emerald/terminal aesthetic. As of 2026-07-16 this is the **visual target**, decided in the design-directions ticket (an earlier "unique experience" goal was explored across 9 alternatives and dropped by owner's choice).
- **Element inventory from the design**: nav (Timeline, Skills, Projects, Speaking, Blog, Contact CTA); hero (portrait, name, tagline, location, 4 stat tiles, CTA); guided career timeline with chapter selector + case-study links; skills & tooling (4 category cards, progress bars); open-source & projects (cards: description, tech tags, status badge, stars); public speaking list (type badge, event, city, year); certifications (issuer, year, ID); blog "Writing" listing (date, read time, tags, excerpt) + post pages (lede blockquote, prose, mermaid diagrams, code blocks with copy); footer (handle, socials).
- **Standing decisions from charter grilling**: audience is peers + recruiters, content must stay scannable (the original playful/experimental goal was superseded by the design decision above); all content + section toggle/order in Sanity, design system stays in code; Studio embedded at `/studio`; English only; blog supports Mermaid **and** D2/interactive diagrams, images, YouTube/Vimeo embeds; tRPC serves contact form + post reactions/view counts only — Sanity content is fetched statically.

## Decisions so far

<!-- one line per closed ticket -->

- [Design directions prototype](issues/01-design-directions-prototype.md) — direction locked: replicate the original MagicPatterns design (dark emerald developer portfolio) in Next.js/Tailwind, Sanity-driven; 9 explored alternatives rejected, preserved on `prototype/design-directions`.
- [Research: Mermaid + D2 diagram rendering in Next.js](issues/02-research-diagram-rendering.md) — Mermaid client-side (`mermaid@11`, dynamic import, `_key`-derived ids); D2 pre-rendered to static SVG server-side; zoom via react-zoom-pan-pinch.
- [Research: Sanity + Next.js integration patterns](issues/03-research-sanity-nextjs-integration.md) — embedded `/studio` + TypeGen from day one; custom Portable Text object types with one shared render map; skip visual editing v1; time-based ISR; singleton homepage doc with ordered `_type`-discriminated sections + hidden flag.
- [Research: datastore for post reactions + view counts](issues/04-research-reactions-datastore.md) — Upstash Redis via Vercel Marketplace; sets for like-dedup, TTL-guarded INCR for views, @upstash/ratelimit in tRPC.
- [Task: gather Øyvind's real content](issues/05-task-gather-real-content.md) — launch with clearly-fake seed content, replaced post-launch in Studio; real facts limited to name, location, contact email; seeding rules in `assets/content-placeholders.md`.
- [Grilling: per-section Sanity content model](issues/06-grilling-section-content-model.md) — full schema in `assets/section-content-model.md`; plain skill lists, caseStudy pages at `/work/[slug]`, plain-name nav mark, name+email+message contact form; singletons + entity docs + shared `richBody`.
- [Grilling: blog content model + authoring flow](issues/07-grilling-blog-schema.md) — full model in `assets/blog-content-model.md`; computed read time, required excerpt, tag docs + tag pages, live-Mermaid Studio preview, auto OG images, full-content RSS.
- [Grilling: architecture decisions](issues/08-grilling-architecture.md) — full architecture in `assets/architecture.md`; Resend contact delivery, honeypot + rate limit, PostHog (EU, cookieless); per-route ISR, tRPC v11 `contact`/`reactions` routers, app at repo root with embedded Studio.

## Not yet specified

_(empty — the fog is cleared; only the spec-assembly ticket remains)_

## Out of scope

- Implementation of the site itself — the destination is the spec; the build is a fresh effort executing it.
- Comments on blog posts — ruled out in charter grilling (reactions/views chosen instead; giscus can be revisited post-launch).
- Localization (Norwegian) — English only decided at charter.
- Theme tokens editable from Sanity (full page-builder) — ruled out; design lives in code.
