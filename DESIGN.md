# Portfolio Design System

Soft Structuralism with asymmetric editorial composition. Evidence remains primary; depth, motion, and hardware-like framing support legibility rather than decoration.

## Principles

- Silver-white canvas, graphite ink, emerald signal.
- Geist Variable and Geist Mono, self-hosted through build dependencies.
- Massive restrained typography with deliberate line lengths and semantic wrapping.
- Double-bezel framing for evidence, project cards, forms, and key metric surfaces.
- Asymmetric compositions on desktop; responsive structure follows content type rather than shrinking desktop layouts.
- Floating island navigation remains detached from viewport edges in closed state.
- CTA pills use nested circular icon islands.
- Confidentiality labels and evidence boundaries remain explicit.

## Evidence

- Dashboard and document screenshots use `width: 100%`, `height: auto`, and `object-fit: contain` when full content must remain visible.
- Case-study evidence uses explicit `standard` and `featured` variants; layout must not depend on asset filename, position, or dimensions.
- Evidence stacks to one full-width item below 900px. Captions remain attached and readable.
- Lightbox affordances supplement readable inline evidence; they do not excuse illegible thumbnails.
- Code keeps readable typography and scrolls horizontally within its block on narrow screens.
- Tables become cards or use local horizontal scrolling; page-level horizontal overflow is prohibited.

## Navigation

- Desktop uses compact floating island navigation.
- Below 900px, navigation opens as an independent fixed fullscreen layer rendered outside the floating navbar.
- Mobile overlay contract: `position: fixed`, `inset: 0`, `width: 100%`, `height: 100dvh`, solid off-white background, and viewport-level stacking.
- Never place mobile overlay inside an ancestor with constrained width, border radius, clipping, `transform`, or `backdrop-filter`; those properties can create an incorrect containing block.
- Open state includes its own logo, Close control, numbered primary links, conversation CTA, and social links.
- `SQL_` trigger sits inside desktop navigation and mobile menu. The query console uses native `<dialog>`, one search field, bounded results, keyboard dismissal, backdrop dismissal, and focus restoration.
- Console opening state shows up to five tab-scoped query-history entries. `EXPLAIN <project>` renders Problem, System, Decision Use, and Evidence from validated build-time content; hidden exact-match Easter eggs remain absent from visible help.
- Slash shortcut ignores input, textarea, select, and contenteditable targets. Mobile console close restores focus to the visible menu toggle rather than a hidden menu trigger.
- Body scrolling locks while open. Escape closes it, focus enters the layer, Tab remains contained, and hidden controls leave tab order.
- Navigation and Close touch targets remain at least 44px.

## Responsive

- Desktop compositions use 12-column asymmetry.
- About hero uses three semantic headline lines on desktop with an approximately 57/43 text-to-portrait ratio. Mobile returns to natural wrapping and a shorter landscape portrait crop.
- Text-heavy capability cards stack to one column below 900px.
- Work Detail evidence stacks to one column below 900px; technical summaries use two columns on tablet and one on mobile.
- Work Detail credibility frame pairs dark assumptions/constraints with an editorial decision log, then collapses to one column below 900px. Evidence status stays adjacent to project metadata; optional metric dictionaries use native `<details>`.
- Approved client decks use a two-column editorial gallery of optimized local first-slide thumbnails. Each full card opens one native preview dialog; Google content loads only after click, source links stay hidden, trigger focus is restored, and the dialog becomes a near-full-viewport surface on mobile.
- Focused Interface Studies remain a compact two-column gallery below 768px because they support visual browsing rather than long-form reading.
- Work Detail section rhythm tightens below 768px without reducing body readability.
- Gutters become 16px below 768px. Overlaps and decorative rotations disappear. Primary CTAs may become full width where scanning benefits.

## Motion

- Primary easing: `cubic-bezier(0.32, 0.72, 0, 1)`.
- Entry motion uses IntersectionObserver, transform, opacity, and light blur.
- Homepage Operating Layer card uses a one-shot system boot sequence: header signal, chart draw, final point, hierarchical metric count-up, then stable status. Total duration stays near 2.5 seconds and never loops.
- First session entry may use a non-loading identity reveal: `FM/`, name, role, `Data / Systems / Decisions`, then `System ready`. It waits for explicit `Enter portfolio` confirmation before using a vertical curtain exit, and never repeats within the session after entry.
- Identity reveal is progressive enhancement: hidden by default, enabled before first paint only when session and motion preferences permit, and never waits for network completion. Background content remains inert while open, entry state persists only after button activation, and focus moves to the main landmark on completion.
- System metrics retain final values in HTML; JavaScript may initialize count-up only after motion support and viewport observation are confirmed.
- Post-sequence chart hover may brighten line and peak on fine pointers. No cursor-follow glow, fake tooltip data, card tilt, or live-data simulation.
- Operating Model embeds tool context inside `Ingest / Govern / Model / Decide`, rather than using a standalone logo marquee. Tool labels remain monochrome system evidence, reveal with stage progress, and clarify on stage hover or focus.
- Credentials remain supporting evidence: exactly four curated applied programs appear as editorial cards on About and a compact list on Resume. Certificate artwork stays behind explicit PDF links; Home has no credential showcase, while Excel and WebHozz remain additional training outside featured content.
- SQL-inspired interaction uses a dark graphite plane, emerald execution signals, mono query text, and line-number rhythm. It reads as an editorial data-system metaphor, not an imitation IDE.
- Eligible internal links receive a fullscreen SQL exit transition. Desktop duration is `950 ms`; mobile duration is `700 ms`. Query appears at `120/100 ms`, result state appears at `560/400 ms`, and navigation follows after a readable final beat.
- Transition is a single centered frame on desktop and a full-viewport plane on mobile. It contains route label, route-specific query, execution status, result count, and destination hint; no tabs, minimap, fake shell controls, or decorative terminal clutter.
- Query results use numbered semantic anchors with title, metadata, and directional affordance. They enter the same route-transition path as ordinary eligible internal links.
- Menu feedback begins within 250-350ms; no long reveal delays block navigation.
- No continuous scroll listeners or layout-property animation.
- Reduced-motion users receive static final states.
- Reduced-motion users bypass the SQL route transition entirely; query cursor animation is disabled.
- Backdrop blur is restricted to floating navigation and modal layers, never the fullscreen mobile-menu containing hierarchy.
