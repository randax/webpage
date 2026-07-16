# 10 — Reactions: likes + views via tRPC

**Blocked by:** 06 — Blog listing + prose

**Status:** ready-for-agent

**What to build:** Posts come alive. tRPC v11 mounted (fetch adapter), `reactions` router per `.scratch/webpage-spec/assets/architecture.md`: like (set-based dedup by salted visitor hash), view (TTL-debounced counter fired from post pages), get. Like button + view count in the post UI. Rate limiting via @upstash/ratelimit. HITL: provision Upstash via the Vercel Marketplace. Secondary test seam starts here: router caller tests with a fake Redis.

- [ ] Liking twice from one visitor counts once; count survives reload
- [ ] Views increment once per visitor-hour
- [ ] Rate limiter rejects hammering; caller tests cover dedup/debounce/limit with fake Redis
- [ ] Nothing fires on `/studio`
