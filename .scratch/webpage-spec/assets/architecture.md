# Architecture decisions (resolved 2026-07-16)

Grilled decisions: **Resend** for contact-form delivery · **honeypot +
@upstash/ratelimit** for spam (no CAPTCHA) · **PostHog** for analytics.
Everything else fixed by prior research/decisions.

## Repo layout

Single Next.js App Router app at the **repo root** of `randax/webpage` on
`main` (the `prototype-app/` on `prototype/design-directions` stays archived
on its branch). pnpm. Sanity Studio embedded at `/studio`
(`app/studio/[[...tool]]/page.tsx`, `force-static`); schema in `sanity/`
alongside `sanity.config.ts` / `sanity.cli.ts` with the TypeGen block;
`sanity.types.ts` committed.

## Rendering & revalidation

| route | strategy |
|---|---|
| `/` (homepage) | static + ISR `revalidate: 300` |
| `/blog` and `/blog/tag/[slug]` | static + ISR `revalidate: 60` |
| `/blog/[slug]`, `/work/[slug]` | `generateStaticParams` + ISR `revalidate: 60` |
| `/rss.xml`, `/api/og` | route handlers, cached |
| `/studio` | client-only, force-static shell |
| `/api/trpc/[trpc]` | dynamic (Node runtime) |

No Sanity webhook v1 (research: add tag-based `revalidateTag` only if publish
latency annoys). No visual editing v1. D2 pre-rendering runs inside the ISR
render path (Node runtime page) with the SVG cached in the ISR payload —
acceptable because D2 blocks are rare; revisit with a webhook pipeline if
render times grow.

## tRPC

`@trpc/server` v11 mounted at `app/api/trpc/[trpc]/route.ts` (fetch adapter),
React Query client. Routers:

- `contact.submit({name, email, message, website})` — `website` is the
  honeypot (must be empty); zod-validated; rate-limited 3/hour/IP
  (@upstash/ratelimit sliding window); delivers via Resend to
  `siteSettings.contactEmail`, `replyTo` = submitter.
- `reactions.like({slug})` — `SADD likes:{slug} {visitorHash}` → returns
  `SCARD`; visitorHash = SHA-256(ip + ua + LIKE_SALT); rate-limited.
- `reactions.view({slug})` — `SET viewed:{slug}:{hash} 1 EX 3600 NX`, `INCR
  views:{slug}` on first set; fired from a client effect on post pages.
- `reactions.get({slug})` — like + view counts for hydration.

Sanity content is **never** fetched through tRPC — server components query
GROQ directly via `next-sanity` + TypeGen types.

## Services & env

| service | purpose | env |
|---|---|---|
| Sanity | content | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` (draft mode) |
| Upstash Redis (Vercel Marketplace) | reactions/views + rate limits | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| Resend | contact email | `RESEND_API_KEY` |
| PostHog | analytics | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` |
| — | like/view hashing | `LIKE_SALT` |

PostHog notes: `posthog-js` via a client provider component; use the **EU
cloud** host (Norwegian owner, EEA visitors) and cookieless/memory persistence
so no consent banner is required; respect Do Not Track. Post view *counts*
remain Upstash's job (rendered on the page); PostHog is for traffic insight
only. Vercel deploy: production = `main`, previews = PRs.

## Implementation-time signups (carry into the build effort's first steps)

Sanity project · Upstash via Vercel Marketplace · Resend (+ domain sender
verification once a custom domain exists) · PostHog (EU). None block the
spec; all block first deploy.
