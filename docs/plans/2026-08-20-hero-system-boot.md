# Hero System Boot Sequence

## Goal

Animate homepage Operating Layer card as a one-shot system boot sequence. Motion clarifies hierarchy: signal appears, chart resolves, metrics become legible, and pipeline reports stable. It must never imply live data.

## Approved Behavior

- Card uses existing page reveal, then starts internal sequence once at approximately 45% viewport visibility.
- Header resolves first and availability dot pulses once.
- SVG line draws left to right over approximately 1.2 seconds; area fill follows gradually.
- Final chart point scales in after line completion and pulses once.
- Metrics count in sequence: `1,567%`, `10+`, then zero-padded `04`.
- Pipeline status resolves last; status dot pulses once and stops.
- Total sequence lasts approximately 2.5 seconds and never loops.
- Desktop post-sequence interaction only brightens chart line and final point on hover.
- No cursor-follow glow, tooltip, fake values, card tilt, floating, blinking loop, or mobile hover behavior.

## Accessibility And Resilience

- Text content and final values remain present in HTML; animation is progressive enhancement.
- `prefers-reduced-motion: reduce` renders final state immediately and skips count-up.
- Missing IntersectionObserver renders final state immediately.
- Sequence starts once and observer unobserves card after activation.
- Decorative SVG remains `aria-hidden`; meaningful labels stay static.

## Implementation

- `src/pages/index.astro`: add stable hooks and numeric formatting metadata.
- `src/styles/global.css`: staged states, path drawing, one-shot pulses, hover, and reduced-motion final state.
- `public/js/animations.js`: one-shot observer and requestAnimationFrame count-up.
- `scripts/test-hero-boot.mjs`: static contract regression assertions.
