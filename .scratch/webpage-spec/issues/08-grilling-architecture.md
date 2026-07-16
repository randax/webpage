# Grilling: architecture decisions

Type: grilling
Status: resolved
Blocked by: 03, 04

## Question

Lock the technical architecture: rendering strategy per route (static/ISR/dynamic) and revalidation mechanism (webhook vs time-based); tRPC router shape + where it mounts (route handler) and the contact form + reactions/views procedures (validation, spam protection, dedup); chosen datastore + schema/client; env/config layout; repo structure for app + studio + schema packages. Informed by the Sanity-integration and datastore research answers.

## Answer (2026-07-16)

Full architecture: `.scratch/webpage-spec/assets/architecture.md`. Grilled decisions: contact delivery via **Resend**; spam handled with **honeypot + @upstash/ratelimit** (no CAPTCHA); analytics via **PostHog** (EU cloud, cookieless, DNT respected). Fixed by prior research: single app at repo root, embedded Studio + TypeGen, per-route ISR (no webhook v1), tRPC v11 fetch adapter with `contact` and `reactions` routers (Sanity content never goes through tRPC), Upstash Redis keys/hashing per the datastore research, D2 pre-rendered inside the ISR path. Service signups (Sanity, Upstash, Resend, PostHog) listed as first steps of the build effort.
