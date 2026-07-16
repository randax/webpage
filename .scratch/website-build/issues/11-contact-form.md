# 11 — Contact form

**Blocked by:** 10 — Reactions (tRPC infra)

**Status:** ready-for-agent

**What to build:** Visitors can reach Øyvind. Contact section form (name, email, message) submitting through `contact.submit`: zod validation, hidden honeypot field that silently drops bots, 3/hour/IP rate limit reusing the ticket-10 limiter, delivery via Resend to `siteSettings.contactEmail` with reply-to set to the submitter. HITL: create the Resend account/key.

- [ ] Valid submission arrives in Gmail with working reply-to
- [ ] Filled honeypot returns success but sends nothing
- [ ] 4th submission within an hour is rejected with a friendly message
- [ ] Caller tests cover honeypot/limit/validation with a stubbed transport
