# DESIGN.md — Farih Muwaffaq Portfolio

World: **Technical-Editorial** — the portfolio reads as a numbered index of analytical
artifacts, not a marketing brochure. Evidence and decisions lead; decoration follows
structure. Every page is a document with a register line, mono metadata, and hairline
architecture.

## Locked decisions (brief-confirmed 2026-05-02)

- **Tone** Evidence & decision-first. Systems voice.
- **Visual theme** Technical-editorial; artifact-first. Zero gradients, zero glassmorphism,
  zero heavy shadows. Texture comes from rules, numbering, and mono type.
- **Structure** Register/index patterns: numbered rows, spec tables, definition lists.
- **Visual signal** One strict signal color (forest green) + ink + paper; amber reserved
  exclusively for confidentiality flags.
- **Depth** Hairlines and borders only. `border-radius: 2px`. No drop shadows.
- **Layout anchor** Left-aligned content, wide whitespace, max 72rem column.
- **Typography** Inter (headings/body) + IBM Plex Mono (metadata, labels, numbers).
  Mono carries uppercase, letter-spaced metadata — the system's signature voice.
- **Art direction** Placeholder figure SVGs labeled as figures (FIG. 01). Confidential
  work flagged with amber chips. No fake dashboards, no fabricated evidence.
- **Interaction** Restrained: underline/fade/translate-X on hover; single `rise` entrance;
  `prefers-reduced-motion` honored globally.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--paper` | `#fafaf7` | Page background |
| `--paper-raised` | `#ffffff` | Cards, spec tables |
| `--ink` | `#101312` | Headings, primary buttons |
| `--ink-soft` | `#2c3431` | Body prose |
| `--muted` | `#535d58` | Metadata, captions |
| `--signal` / `--signal-deep` | `#0e6b3c` / `#0a522e` | Links, focus, hovers, accents |
| `--amber` | `#8a5a12` | Confidentiality only |
| `--line` / `--line-strong` | ink 14% / 38% | Hairlines, rules |
| `--radius` | `2px` | All radii |

Contrast: ink/paper 16.9:1 · ink-soft/paper 11.4:1 · muted/paper 6.9:1 ·
signal/paper 5.5:1 · signal/paper-white 5.4:1 (AA pass on all text pairs).

## Component contracts

- **Header** sticky, blurred paper, mono nav with superscript numbers, current page in signal.
- **Register row** (home): `num / title+summary+tags / org·timeline·type / arrow`.
- **Spec table** (case study + contact): dt mono-uppercase / dd value rows.
- **Status chip**: green dot = evidence type; amber = confidential. Never mix.
- **Buttons**: ink fill primary, ghost secondary, `→` nudges on hover. Disabled state honest (`aria-disabled`).
- **Card**: white, hairline border, no shadow; project cards carry head row (number + status).
- **Filters**: pill toggles; active = ink fill.
- **Lightbox**: `<dialog>`, blurred dark backdrop, mono caption.
- **Footer**: oversized email CTA + mono meta row.

## Accessibility floor

Skip link, `:focus-visible` signal outline, aria-live filter status, `aria-pressed`
filters, labeled honeypot, keyboard-safe dialog, reduced-motion collapse, 44px touch targets.

## SEO / data

Site-origin, OG/Twitter meta, JSON-LD (WebSite, Person, BreadcrumbList, CreativeWork,
ProfilePage), sitemap, robots, webmanifest preserved from incumbent build.

## Surface briefs

- **Home** (`/`) — hero = name at display scale + role + lede + tri-CTA + meta strip;
  numbered sections 01–04 (Work register, Capabilities, Focus, Contact).
- **Work** (`/work`) — filterable card index + Dashboard Lab (placeholder figures, honest framing).
- **Case study** (`/work/:slug`) — spec header (organization/role/timeline/tools),
  FIG. 01 cover, validated-outcomes panel, auto-numbered prose sections, related evidence.
- **About / Resume** — selective timeline via `resume-item` rows; Selasar Kampus claim
  kept intentionally unverified (incumbent constraint).
- **Contact** — spec contact list + honest form (endpoint disclosure retained).
- **404** — hero-scale error, "outside the model".
