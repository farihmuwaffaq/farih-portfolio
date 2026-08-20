# Portfolio Design System

Soft Structuralism with asymmetric editorial composition. Evidence remains primary; depth, motion, and hardware-like framing support legibility rather than decorate it.

## Principles

- Silver-white canvas, graphite ink, emerald signal.
- Geist Variable and Geist Mono, self-hosted through build dependencies.
- Massive restrained typography with short line lengths.
- Double-bezel framing for evidence, project cards, forms, and key metric surfaces.
- Asymmetric bento compositions on desktop; clean single-column flow below 768px.
- Floating island navigation, detached from viewport edges.
- CTA pills use nested circular icon islands.
- Confidentiality labels and evidence boundaries remain explicit.

## Motion

- Primary easing: `cubic-bezier(0.32, 0.72, 0, 1)`.
- Entry motion uses IntersectionObserver, transform, opacity, and light blur.
- No continuous scroll listeners or layout-property animation.
- Reduced-motion users receive static final states.
- Backdrop blur is restricted to fixed navigation and modal layers.

## Responsive

- Desktop compositions use 12-column asymmetry.
- Below 900px navigation becomes full-screen overlay.
- Below 768px grids collapse to one column, overlaps and rotations disappear, gutter becomes 16px, and CTAs become full width.
- Touch targets remain at least 44px.
