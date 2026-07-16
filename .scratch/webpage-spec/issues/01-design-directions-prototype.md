# Design directions prototype

Type: prototype
Status: resolved

## Question

Which concrete design concept makes this site unique? Generate 3–4 radically different playful/experimental directions (via `/prototype` + `frontend-design`, or `/design-an-interface`) from the same element inventory (see map Notes), for Øyvind to react to. Constraint: a recruiter in a hurry must still find CV facts in seconds — experimental interactions layer over scannable content. Resolve by locking one direction (possibly a hybrid) as the design language: aesthetic, typography, motion vocabulary, and how each homepage section expresses it.

## Round 1 feedback (2026-07-16)

Øyvind rejected all four round-1 variants: still AI-generated feeling, concepts gimmicky (themes slapped on sections), execution cheap. Taste anchors he supplied: metajive.com (interaction/animation quality), 10years.pixelmatters.com (clean flow, dark elegant scrollytelling), nikolaradeski.com (unique design + animation, light personal), jeanrottner.com (visual, duotone portrait + type transitions). Extracted DNA: real art-directed photography, one confident accent on a neutral canvas, oversized display type, scroll-driven motion/transitions as the core experience, generous space. Consequence for the spec: motion stack is load-bearing (Motion + Lenis in round 2), and Øyvind's portrait becomes a required design asset (feeds ticket 05).

Round 2 built: **E — Atelier** (light canvas, giant name flanking portrait, floating dock nav, orange accent, spring reveals) and **F — Decade** (dark cinematic, duotone portrait arch under overlapping display type, self-drawing timeline spine, Lenis smooth scroll, brass accent). Awaiting reaction.

## Round 2 feedback (2026-07-16)

E and F also rejected ("not what I'm looking for as well"); forced-choice localization: **none** of the six variants is in the right territory, and the missing quality is **immersive/3D depth — a scene, not a page**. Scene concept chosen from options: **Nordic terrain** (fjord flyover, career chapters as places, aurora accent) over "the machine" and "abstract matter". Spec consequence: the site's spine is a WebGL scene (React Three Fiber); performance budget + non-WebGL/reduced-motion fallback become first-class spec sections.

Round 3 built: **G — Fjord** (commit 743b5f4, default variant): procedural low-poly fjord terrain, scroll-driven camera flight along the valley (drei ScrollControls), career waypoint beacons in-scene, aurora ribbons, glassy DOM panels synced to scroll. Awaiting reaction.

## Round 3 feedback (2026-07-16)

G (Fjord) rejected — "that was a mistake, I hate it". Øyvind regrets the immersive-3D/Nordic-terrain choice itself, not just the execution. Pattern after 3 rounds / 7 variants: reacting to agent-generated options is not converging; forced-choice answers (immersive 3D, terrain concept) did not predict actual reaction to the artifact.

## Round 4 (2026-07-16) — process shift

Full-page building paused. Variant H (commit 5b026f6, now default) is a **moodboard of 12 static aesthetic probes**: 1 ultra-minimal light · 2 swiss grid · 3 warm editorial serif · 4 stealth dark hairline · 5 gradient glass · 6 photo-forward knockout · 7 retro computing · 8 soft neo-brutalism · 9 data-ink annotations · 10 kinetic type specimen · 11 scandi pastel · 12 didone editorial. Øyvind marks each alive/dead; only circled territory gets built next.

## Round 4 feedback (2026-07-16)

Moodboard survivors: **2 (swiss grid) · 8 (soft neo-brutalism) · 12 (didone editorial)** — a coherent print-on-paper cluster: light canvas, black ink, visible structure (grids/rules/borders), flat color, hard edges; no gradients/dark/glass/photo/3D. Round 5 built **I — Broadsheet** (commit 5e85a3d, default): warm paper, exposed 12-col grid, black 2px rules, Playfair display headlines with red accents, figure-numbered career ledger, neo-brutalist chips/CTAs (offset shadows), blog as front-page essays. Awaiting reaction.

## Assets

Prototype built on branch `prototype/design-directions` (commit 8c69deb), app in `prototype-app/`. Run `pnpm dev` there and open `http://localhost:3777/?variant=A`. Variants: **A — Blueprint** (portfolio as system architecture diagram, navy grid, mono labels, index rail), **B — Field Notes** (warm paper editorial, Fraunces serif, margin notes, sticker tags, blog-forward), **C — Poster** (brutalist gig poster, Anton acid-on-black, skills marquee, career as tour dates), **D — Aurora Journey** (scrollytelling chapters, aurora gradients, fjord contours, chapter rail). Switch with the floating bar or ←/→ keys. Round 2 added **E — Atelier** and **F — Decade** (commit f711561, default variant now E). Awaiting Øyvind's reaction to lock a direction.

## Answer (2026-07-16)

**Direction locked: replicate the original MagicPatterns design** (https://www.magicpatterns.com/c/8dqbu5z4wryxqavdniwbvg) — the dark emerald/terminal developer portfolio — rebuilt in Next.js/Tailwind with all content served from Sanity. Øyvind decided this after five prototype rounds (9 alternatives: A Blueprint, B Field Notes, C Poster, D Aurora Journey, E Atelier, F Decade, G Fjord 3D, H moodboard, I Broadsheet) all failed to beat the original for him.

Implications for the spec:
- Visual target = the MagicPatterns design as browsed (element inventory in map Notes; screenshots taken 2026-07-15). MagicPatterns can export its React/Tailwind source — use it as reference material, but rebuild properly (typed, Sanity-driven, App Router) rather than pasting.
- The "uniqueness" concern is closed by owner's choice; no experimental motion stack required. Standard tasteful transitions only — which simplifies the performance/fallback story to nothing special.
- Round-1-5 exploration preserved on branch `prototype/design-directions` (final commit 5e85a3d) as primary source; no variant graduates.
