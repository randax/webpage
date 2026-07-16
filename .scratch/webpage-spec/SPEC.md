# Build spec — oyvind personal site (v1, 2026-07-16)

The destination artifact of the `webpage-spec` wayfinder map. Everything an
implementation agent needs; every decision below was resolved on the map —
zoom into the linked assets/tickets for detail and rationale. Nothing here is
still open.

## What is being built

Øyvind Randa's personal site: a developer portfolio + technical blog that
**replicates the MagicPatterns design**
(https://www.magicpatterns.com/c/8dqbu5z4wryxqavdniwbvg — dark emerald
"Marcus Devlin" portfolio) with every element editable in Sanity. Stack:
**Next.js (App Router) + Tailwind on Vercel, Sanity CMS, tRPC, pnpm,
TypeScript (no `any`)**.

## Canonical documents

| concern | document |
|---|---|
| Content schema (sections, entities, singletons) | `assets/section-content-model.md` |
| Blog model, richBody block set, Studio UX, OG/RSS | `assets/blog-content-model.md` |
| Architecture: routes, ISR, tRPC, services, env | `assets/architecture.md` |
| Placeholder/seeding policy | `assets/content-placeholders.md` |
| Sanity/Next integration facts | `assets/research-sanity-nextjs.md` (branch `research/sanity-nextjs`) |
| Diagram rendering facts | `assets/research-diagram-rendering.md` (branch `research/diagram-rendering`) |
| Datastore facts | `assets/research-reactions-datastore.md` (branch `research/reactions-datastore`) |
| Placeholder dataset shape | `prototype-app/data/profile.ts` (branch `prototype/design-directions`) |

## Design replication notes

- Visual target: the MagicPatterns page as browsed 2026-07-15 (homepage:
  nav, hero with portrait + stats, guided timeline with chapter selector,
  skills cards **without percentage bars** — plain lists per ticket 06,
  projects, speaking, certifications, footer; blog: "Writing" listing +
  post page with lede, code blocks, diagrams).
- MagicPatterns can export React/Tailwind source — use as visual reference
  only; rebuild typed and Sanity-driven.
- Deviations from the design, all owner-decided: no skill bars; nav mark is
  the plain name (not a handle); timeline "view case study" renders only when
  a `caseStudy` reference exists; stats hidden until real numbers entered.
- Standard tasteful transitions only; no experimental motion stack.

## Routes

`/` · `/blog` · `/blog/[slug]` · `/blog/tag/[slug]` · `/work/[slug]` ·
`/studio` · `/rss.xml` · `/api/og` · `/api/trpc/[trpc]` — rendering strategy
per route in `assets/architecture.md`.

## Build milestones (suggested order)

1. **Services** (HITL): create Sanity project, Upstash via Vercel
   Marketplace, Resend account, PostHog EU project; record env vars in
   Vercel + `.env.local`.
2. **Scaffold**: Next app at repo root on `main`, Tailwind, pnpm; embedded
   Studio; full schema from the two content-model docs; TypeGen wired
   (`sanity.cli.ts`); seed script writing the placeholder dataset
   (per `content-placeholders.md`, incl. the draft sample post exercising
   every richBody block).
3. **Homepage**: section registry (`_type` → component), all eight sections
   pixel-matched to the design, `enabled`/order honored, ISR.
4. **Blog**: listing, post page, richBody renderers (code w/ copy, Mermaid
   client-side w/ `_key` ids, D2 server-side SVG, image, lite video embed),
   tag pages, computed read time, RSS, `/api/og`.
5. **Case studies**: `/work/[slug]` reusing richBody renderers.
6. **tRPC**: `contact` (zod, honeypot, ratelimit, Resend) and `reactions`
   (Upstash sets/counters) routers; like button + view counter on posts.
7. **Polish & deploy**: PostHog provider (EU, cookieless), metadata/SEO,
   sitemap, 404, Vercel production deploy.
8. **Studio DX**: `DiagramInput` live Mermaid preview component (D2 shows
   code + draft-mode hint); singleton pinning in Studio structure.

## Acceptance checks

- `pnpm build` clean; TypeGen types committed and used (no `any`).
- Every visible string/image/entity on the site is editable in Studio;
  toggling a section off removes it and its nav anchor.
- Sample post renders all five block types correctly; copy button works;
  two Mermaid diagrams on one page don't collide.
- Contact form delivers to Gmail (reply-to = submitter), honeypot drops
  bots silently, 4th submission in an hour is rejected.
- Like/view counts survive reload, dedup per visitor, and don't run on
  `/studio`.
- No consent banner needed: PostHog cookieless, YouTube via nocookie facade.

## Out of scope (v1)

Comments, Norwegian localization, Sanity-editable theme tokens, visual
editing/Presentation, Sanity webhooks, callout/table blocks, custom domain
email sender verification (do when domain exists).
