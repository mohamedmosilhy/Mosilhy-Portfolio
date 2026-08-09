# Component Sources

## Purpose

External component collections are references and starting points, not the
portfolio's design language. The repository owns every component it ships and
must be able to explain its structure, accessibility, dependencies, and visual
fit.

Never copy an entire page. Components must match our design system. Animation
should enhance usability rather than distract.

## Foundation

### [shadcn/ui](https://ui.shadcn.com/)

Use for:

- studying accessible primitive composition;
- focused foundations such as button, disclosure, dialog, or tooltip when a
  real inventory component needs one;
- implementation patterns that can be owned locally.

Rules:

- copy only the smallest required primitive through its documented workflow;
- remove unused variants and dependencies;
- replace default colors, radii, spacing, typography, and motion with portfolio
  tokens;
- verify keyboard and screen-reader behavior independently;
- do not make the site look like a default shadcn application.

### [React Bits](https://reactbits.dev/)

Use for:

- studying isolated interaction techniques;
- prototyping a narrow hero or text treatment;
- learning how an effect is composed.

Rules:

- treat examples as experiments, not ready-made sections;
- do not use effects that distort, scramble, delay, or obscure required text;
- rewrite styling against semantic tokens;
- inspect bundle, hydration, and reduced-motion impact;
- prefer the simpler local implementation when it meets the same goal.

## Animation

### [Aceternity UI](https://ui.aceternity.com/)

Use for:

- studying layered backgrounds, hover relationships, and reveal mechanics;
- understanding how a polished effect is decomposed.

Do not use:

- full page or hero copies;
- cursor-following effects that compete with reading;
- heavy canvas/WebGL treatments in the initial release;
- components whose accessibility depends on hover.

### [Magic UI](https://magicui.design/)

Use for:

- small decorative ideas and contained interaction patterns;
- implementation references for effects that have an explicit purpose.

Every adopted pattern must use the motion durations, easing, distances, and
reduced-motion fallbacks in
[`animation-guidelines.md`](./animation-guidelines.md).

### [Motion Primitives](https://motion-primitives.com/)

Use for:

- focused transition and presence patterns;
- studying composable Framer Motion boundaries;
- accessible state animation.

Prefer adapting primitive mechanics over importing a visually branded example.
The portfolio's `Reveal`, `Stagger`, and `PageEntrance` remain its stable public
motion API.

### Framer Motion

Framer Motion is the requirements-approved animation runtime. It is imported
only inside `components/motion` or a documented interactive feature island.
Simple hover, focus, underline, and color transitions remain CSS.

## Icons

### Lucide

Use Lucide React for interface icons:

- import each icon directly by name;
- use the standard 16px, 20px, and 24px sizes;
- follow the design-system stroke-width rules;
- mark decorative icons as hidden from assistive technology;
- give icon-only controls an accessible name;
- do not create a dynamic registry containing the full icon package.

Official GitHub and LinkedIn marks may be stored as vetted local SVG assets when
brand recognition matters. They must retain correct accessible labeling and
follow the relevant brand usage terms.

## Illustrations

### Custom only

Illustrations, diagrams, background line work, and decorative graphics are
custom to this portfolio.

- Do not use stock illustration packs.
- Do not trace or recolor artwork from inspiration sites.
- Architecture diagrams prioritize comprehension over decoration and include a
  text explanation.
- Decorative SVGs use `aria-hidden="true"` and cannot carry required meaning.
- Complex decorative assets must be optimized and measured before inclusion.

## Images

### Optimized with Next/Image

- Use `next/image` for local raster project covers, gallery screenshots,
  portraits, and testimonial photos.
- Declare intrinsic width and height and an accurate responsive `sizes` value.
- Use eager, high-priority loading only for the likely route LCP image.
- Prefer AVIF or WebP after checking screenshot readability.
- Keep originals outside the served path if they are retained for future
  editing.
- Store project media under `public/images/projects/<slug>/`.
- Require meaningful alt text for informative media and empty alt text only for
  deliberately decorative media.
- Do not apply a global monochrome filter to project screenshots.
- Remote sources require explicit `next.config` allowlisting and the same media
  schema as local assets.

SVG interface artwork may be rendered directly when it is trusted and
optimized; `next/image` is not mandatory for every SVG.

## Inspiration-only references

The [Itsechi portfolio](https://itsechi.github.io/portfolio/) is an
inspiration-only reference for restraint, editorial hierarchy, negative space,
and smooth pacing.

Do not copy its:

- source code or compiled styles;
- fonts or exact type scale;
- background texture;
- navigation or hero geometry;
- staggered project layout;
- images, text, or brand elements;
- animation timings or sequences.

Its influence must be visible only as a high-level quality translated through
this portfolio's original design system.

## Adoption workflow

For every sourced or adapted component:

1. **Identify the inventory need.** Name the component from
   [`component-inventory.md`](./component-inventory.md) and the user problem it
   solves.
2. **Choose the smallest source.** Use one primitive or technique, never a page
   or unrelated component bundle.
3. **Review provenance and license.** Check the source's current license and
   attribution requirements at adoption time. Do not assume every gallery
   example has the same license.
4. **Read the implementation.** Understand dependencies, DOM structure, client
   boundary, event handling, and failure behavior.
5. **Adapt the semantics.** Start from the required native element and keyboard
   interaction, not the demo markup.
6. **Apply portfolio tokens.** Replace all raw colors, fonts, spacing, radii,
   shadows, breakpoints, and motion values.
7. **Reduce the code.** Remove unused variants, effects, packages, and
   configuration.
8. **Add fallbacks.** Define reduced motion, no-hover, no-JavaScript, and
   responsive behavior.
9. **Validate.** Run types, lint, relevant tests, accessibility checks, and a
   production build. Inspect bundle impact for client components.
10. **Record the result.** Add the adopted component to the provenance register,
    including why it was chosen and every design, accessibility, and animation
    change.

## Provenance register

Maintain this table when implementation begins:

| Local component | Source        | Original URL                                                                                                | Why chosen                                                                                                 | Version/date reviewed                           | License checked                                                                          | Changes made                                                                                                                                                                      | Accessibility changes                                                                                                                                                  | Animation changes                                                                                                          | Reviewer |
| --------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| `Button`        | shadcn/ui     | [Radix Button source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/radix/ui/button.tsx) | Reuse its small CVA-based variant composition pattern while implementing the inventory's link/button union | CLI 4.14.1; upstream `main` reviewed 2026-07-26 | MIT; upstream notice required for substantial copies; no substantial source was retained | Removed Slot and `asChild`; replaced all variants, sizes, DOM branching, and styling with the portfolio contract and tokens                                                       | Native button and link semantics; explicit icon-size accessible-name type; loading busy/disabled state; safe new-tab relationship; tokenized focus and disabled states | Replaced generic transitions with documented CSS tokens; capped lift at 1px; removed spatial feedback under reduced motion | Codex    |
| `BentoGrid`     | Aceternity UI | [Bento grid blocks](https://ui.aceternity.com/blocks/bento-grids)                                           | Provide a small semantic grid primitive for a portfolio gallery that can scale to many projects            | Registry reviewed 2026-08-10                    | MIT; registry source reviewed                                                            | Removed the demo item, raw neutral palette, fixed three-column proportions, and demo content; retained only a tokenized six-column layout primitive                               | Supports `ul` output so project tiles retain list semantics; all interactive behavior belongs to the card and filter controls                                          | No runtime animation retained; grid reflow is layout-only                                                                  | Codex    |
| `TracingBeam`   | Aceternity UI | [Tracing Beam](https://ui.aceternity.com/components/tracing-beam)                                           | Give long case studies a subtle visual reading path without hiding or reordering authored content          | Registry reviewed 2026-08-10                    | MIT; registry source reviewed                                                            | Replaced raw colors, dimensions, and the additional `motion` package with portfolio tokens and the existing Framer Motion runtime; added resize tracking and a unique gradient ID | Beam is decorative and hidden from assistive technology; content remains server-rendered and complete without JavaScript                                               | Retuned springs; removed entry shadow animation; disables the animated gradient for reduced-motion users                   | Codex    |
| `Spotlight`     | Aceternity UI | [Spotlight](https://ui.aceternity.com/components/spotlight)                                                 | Add a contained ambient emphasis behind hero and footer content                                            | Registry reviewed 2026-08-10                    | MIT; registry source reviewed                                                            | Replaced raw fill, sizing, timing, and placement with reusable props and semantic tokens                                                                                          | Decorative SVG is hidden from assistive technology and cannot cover interactive content                                                                                | Runs once with project motion tokens; reduced-motion fallback is static                                                    | Codex    |

Field rules:

- **Source** names the library or original author.
- **Original URL** links to the exact component/example, not only the source
  homepage.
- **Why chosen** records the local inventory need and why this source was a
  better starting point than building from a native primitive.
- **Version/date reviewed** makes later re-audits possible even when the source
  has no package version.
- **License checked** names the license and records whether attribution or other
  obligations apply.
- **Changes made** summarizes structural, styling, dependency, and design-system
  adaptation.
- **Accessibility changes** records semantic, keyboard, focus, labelling,
  screen-reader, contrast, or touch-target work.
- **Animation changes** records token substitution, removed effects,
  performance changes, and reduced-motion behavior.
- **Reviewer** identifies the person who confirmed the adaptation rather than
  the person who merely copied it.

The register documents influence and due diligence. It is not permission to
retain code that fails local quality standards.

## Rejection criteria

Reject a sourced component when it:

- requires copying an entire page or section to work;
- cannot match semantic design tokens without a rewrite;
- introduces a second styling or animation system;
- requires broad `"use client"` boundaries;
- has unclear licensing;
- is inaccessible by keyboard or screen reader and cannot be corrected simply;
- depends on continuous pointer or scroll tracking without functional value;
- obscures content during loading or reduced motion;
- adds disproportionate bundle or rendering cost;
- is recognizable primarily as another site's signature component.
