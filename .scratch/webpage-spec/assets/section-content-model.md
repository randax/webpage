# Per-section Sanity content model (resolved 2026-07-16)

Decisions from grilling: **plain skill lists** (no percentages/bars) · **case
studies get their own page type** (`/work/[slug]`) · **nav mark = plain name**
· **contact form = name + email + message**. Everything else derives from the
locked design (MagicPatterns original) and the Sanity research
(`research-sanity-nextjs.md`): singleton page-builder pattern, TypeGen,
custom object types.

## Singletons

### `siteSettings`
| field | type | notes |
|---|---|---|
| name | string | "Øyvind Randa" — also the nav mark |
| tagline | text | hero fallback + meta description default |
| location | string | |
| contactEmail | string | delivery target for contact form (server-only usage) |
| socials | array of `{platform: string, url: url}` | empty url ⇒ not rendered |
| footerText | string | |
| seo | `{title, description, ogImage?}` | site defaults |

### `homePage`
| field | type | notes |
|---|---|---|
| sections | array of inline section objects | order = render order |

Each section object: `{_type, enabled: boolean, heading: string, intro?: text}`
plus type-specific fields. `enabled: false` ⇒ section (and its nav anchor)
not rendered. Types: `heroSection`, `timelineSection`, `skillsSection`,
`projectsSection`, `speakingSection`, `certsSection`, `writingSection`,
`contactSection`.

- `heroSection` extra: `kicker?`, `headlineOverride?`, `portrait?` (image,
  hotspot, alt — optional; hero must render without it), `stats` (array of
  `{value: string, label: string}`, max 4) + `showStats: boolean`
  (default **false** per placeholder policy), `ctaLabel`, `ctaTarget`.
- `writingSection` extra: `postCount` (default 4).
- `contactSection` extra: `blurb?`.
- All other sections: no extras — they pull their documents.

## Document types

### `timelineEntry`
`role`, `org`, `startYear`, `endYear?` (empty = present), `summary` (text),
`tags` (string[]), `caseStudy?` (reference → caseStudy), `order`.

### `caseStudy`
`title`, `slug`, `org`, `period`, `lede` (text), `body` (**richBody** — the
shared Portable Text type owned by the blog ticket), `seo?`. Route:
`/work/[slug]`. Timeline's "view case study" renders only when the reference
is set.

### `skillCategory`
`title`, `skills` (string[]), `order`. No proficiency numbers — plain lists.

### `project`
`name`, `description` (text), `repoUrl?`, `liveUrl?`, `status` (enum:
active | maintained | archived), `tags` (string[]), `stars?` (string, manual,
optional — omit ⇒ not rendered), `order`.

### `talk`
`title`, `type` (enum: keynote | talk | workshop), `event`, `city`, `year`,
`url?`. Sorted year desc.

### `certification`
`name`, `issuer`, `year`, `credentialId?`, `url?`.

### `post`
Owned by the blog-content-model ticket (07); listed here only as the target
of `writingSection`.

## Shared

- **richBody**: Portable Text array with custom blocks (code, mermaid, d2,
  image, video embed) — field-level spec owned by ticket 07; used by both
  `post.body` and `caseStudy.body`.
- **Contact form** (not CMS content): tRPC `contact.submit({name, email,
  message})` → delivers to `siteSettings.contactEmail`. Detail owned by the
  architecture ticket (08).
