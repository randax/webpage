# Research: datastore for post reactions + view counts on Vercel

Type: research
Status: resolved

## Question

What datastore should back tRPC procedures for blog post reactions ("like" counts) and view counters on a Vercel-hosted Next.js personal site? Compare current options (Vercel/Neon Postgres, Upstash Redis, Turso, Vercel Edge Config/KV successors) on: free-tier fit for personal-site traffic, latency from Vercel functions, abuse/dedup handling (anonymous likes, view dedup), and setup friction with tRPC + Drizzle/Prisma or raw clients. Recommend one.

## Answer

Full findings: `.scratch/webpage-spec/assets/research-reactions-datastore.md` on branch `research/reactions-datastore` (commit cf83a8d).

**Upstash Redis alone**, via the "Upstash for Vercel" Marketplace integration. Connectionless HTTP client (`@upstash/redis` 1.38.0), no migrations/ORM, free tier (256 MB, 500K commands/mo) dwarfs personal-site traffic.
- Likes: `SADD likes:{slug} {visitorHash}` + `SCARD` — dedup and count for free; visitor = salted hash of IP+UA or first-party cookie.
- Views: `SET viewed:{slug}:{hash} 1 EX 3600 NX` debounce, `INCR views:{slug}` on first set.
- Rate limiting: `@upstash/ratelimit` 2.0.8 sliding window inside the tRPC procedure.
- Landscape: Vercel Postgres/KV are sunset (migrated to Neon/Upstash); Turso mid-pivot, not recommended; Neon is the natural add-on if relational data ever appears.
