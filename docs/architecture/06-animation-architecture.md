# Animation Architecture

## Goals

Motion should make hierarchy and transitions easier to understand, reinforce a
premium feel, and never block access to content. It must not force entire pages
into client rendering or undermine the performance and accessibility targets.

Framer Motion, named in the requirements, should be installed when animation
implementation begins. It is isolated behind the motion layer rather than
imported throughout route and content code.

## Layered organization

### Motion tokens

Durations, easings, distances, and spring presets are centralized in a
framework-neutral token module:

```text
duration: motion-instant, motion-micro, motion-fast, motion-base, motion-slow, motion-deliberate
easing: ease-standard, ease-enter, ease-exit, ease-emphasized, ease-linear
distance: distance-subtle, distance-small, distance-medium
scale/lift: scale-hover, lift-hover, lift-button
spring: spring-responsive, spring-gentle
```

Token values are defined by the design system. Feature code references semantic
tokens rather than hard-coded values. The selected values and complete behavior
matrix are authoritative in
[`../animation-guidelines.md`](../animation-guidelines.md).

### Motion primitives

`components/motion` exposes small client components:

- `Reveal`: one entrance triggered by visibility;
- `Stagger` and `StaggerItem`: coordinated lists;
- `PageEntrance`: an optional non-blocking project-page entrance;
- `MotionProvider`: reduced-motion configuration if a provider is actually
  required;
- reduced-motion utilities for variants that need explicit alternatives.

Primitives accept server-rendered children and own the Framer Motion imports.
They should render semantic-neutral wrappers or support `asChild`-style
composition so motion does not damage document structure.

### Feature choreography

Features decide what moves and in what order. Examples:

- hero coordinates greeting, name, introduction, actions, and social links;
- project grid staggers cards as a group;
- gallery controls transitions between media;
- page sections use a consistent reveal pattern.

Features consume shared tokens and primitives. They may define local variants
when the sequence is unique, but may not establish a second timing system.

## Animation inventory

| Requirement | Owner | Trigger | Reduced-motion behavior |
| --- | --- | --- | --- |
| Hero text reveal | Hero feature | Initial page render | Immediate content, optional opacity only |
| Hero background motion | Hero feature client island | Time/pointer if justified | Static background |
| Section entrance | `Reveal` | First viewport entry | Immediate content |
| Project card hover | Project card/CSS | Hover-capable pointer | No transform required |
| Mobile menu | Navigation client island | User action | Immediate open/close |
| Gallery transition | Gallery client island | User action | Instant media change |
| Smooth anchor scroll | Global CSS | Anchor navigation | Browser default/instant |

Hover effects must also have a keyboard-focus equivalent when they communicate
meaning. Content may not exist only in an animated state.

## Reduced motion

Honor `prefers-reduced-motion` in both CSS and Framer Motion. Reduced motion is
not simply a faster animation:

- remove large translations, parallax, continuous background movement, and
  stagger delays;
- keep content visible from the first meaningful render;
- use no transition or a short opacity change only when it aids continuity;
- use `scroll-behavior: auto` for reduced-motion users.

The reduced-motion decision is centralized so each feature does not interpret
the preference differently.

## Performance constraints

- Animate `transform` and `opacity`; avoid layout-triggering properties.
- Do not animate large blurred layers continuously on mobile.
- Pause or do not start offscreen continuous animation.
- Avoid JavaScript-driven smooth scrolling.
- Lazy-load heavy interactive media.
- Do not apply `will-change` globally; use it briefly and only where measured.
- Keep route content as Server Components even when wrapped by a client motion
  primitive.
- Measure bundle impact before adding specialized animation libraries in
  addition to Framer Motion.

## Ownership rules

- `app` files never define animation variants.
- content never contains timings, variants, or animation component imports.
- UI primitives may include small CSS state transitions but not
  page-specific entrance choreography.
- motion primitives do not know about projects, skills, or other domain data.
- animations are tested with reduced motion enabled and disabled.

These boundaries let the animation system be tuned or replaced without
rewriting content and routing.
