# 01 — Walking skeleton: scaffold + Vercel deploy

**Blocked by:** None — can start immediately

**Status:** in-progress

**What to build:** A deployed, empty-but-real site. Next.js App Router app at the repo root (pnpm, TypeScript strict, Tailwind), a placeholder homepage, and a Vercel production deployment from `main`. Playwright is set up with one smoke test hitting the homepage — this is the primary test seam every later ticket extends. HITL: connect the repo to a Vercel project.

- [ ] `pnpm build` and `pnpm test:e2e` pass locally
- [ ] Production URL serves the placeholder homepage
- [ ] Playwright smoke test runs against a local server
- [ ] No `any` in the codebase; strict TS
