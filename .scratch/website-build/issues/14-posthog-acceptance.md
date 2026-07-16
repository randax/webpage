# 14 — PostHog + acceptance sweep

**Blocked by:** 04, 05, 07, 08, 09, 10, 11, 12

**Status:** ready-for-agent

**What to build:** Production readiness. PostHog (EU cloud, cookieless persistence, DNT respected — no consent banner needed) wired site-wide except `/studio`. Then run the full acceptance checklist from `.scratch/webpage-spec/SPEC.md` end to end and fix what fails. HITL: create the PostHog project.

- [ ] PostHog events arrive from production; no cookies set; DNT honored
- [ ] Every SPEC.md acceptance check passes
- [ ] No consent banner anywhere
- [ ] `pnpm build` + full Playwright suite green
