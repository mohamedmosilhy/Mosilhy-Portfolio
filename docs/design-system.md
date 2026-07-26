# Design System

## Status and scope

This is the visual contract for implementation. Values are initial decisions,
not suggestions to improvise around. They should be implemented as semantic CSS
custom properties and exposed through Tailwind utilities. If visual testing
shows a token is inadequate, change the token here before adding an isolated
value in a component.

The system is dark-first. A theme switcher and a complete light theme are not
part of the current requirements.

## Reference translation

The system is inspired by the elegance and smoothness of the
[Itsechi portfolio](https://itsechi.github.io/portfolio/) without copying it.
A visual review identified high-level qualities worth carrying forward:

- a restrained dark canvas;
- dramatic editorial type scale;
- ample negative space;
- quiet navigation and actions;
- project imagery as the primary visual material;
- gentle entrance and hover behavior.

Those ideas are translated into original tokens and components. This system
uses a different palette, font pairing, content hierarchy, grid, card
structure, interaction model, and motion specification. It does not reproduce
the reference's exact layout, typography, grain, imagery treatment, source
code, or section sequence.

## Color

### Primitive palette

| Token         | Value     | Intended role                      |
| ------------- | --------- | ---------------------------------- |
| `neutral-950` | `#080A0F` | deepest canvas                     |
| `neutral-900` | `#0E1118` | primary surface                    |
| `neutral-850` | `#141925` | raised surface                     |
| `neutral-800` | `#1C2330` | interactive surface                |
| `neutral-700` | `#2A3444` | strong border                      |
| `neutral-500` | `#687386` | disabled and quiet detail          |
| `neutral-400` | `#929CAE` | muted text                         |
| `neutral-200` | `#D8DEE8` | secondary text                     |
| `neutral-50`  | `#F7F9FC` | primary text                       |
| `indigo-400`  | `#8B9CFF` | primary accent                     |
| `indigo-300`  | `#A8B4FF` | primary hover/highlight            |
| `indigo-950`  | `#141936` | subtle accent surface              |
| `teal-400`    | `#5EEAD4` | secondary technical accent/success |
| `amber-400`   | `#F8C56A` | warning                            |
| `rose-400`    | `#FF8096` | destructive/error                  |

Primitive colors are not used directly in feature components. Components use
semantic tokens.

### Semantic tokens

| Token                  | Primitive                | Usage                              |
| ---------------------- | ------------------------ | ---------------------------------- |
| `color-canvas`         | `neutral-950`            | page background                    |
| `color-surface`        | `neutral-900`            | cards and navigation               |
| `color-surface-raised` | `neutral-850`            | elevated/interactive regions       |
| `color-surface-hover`  | `neutral-800`            | hover and pressed surfaces         |
| `color-border`         | white at 10% over canvas | default separators                 |
| `color-border-strong`  | `neutral-700`            | selected and emphasized boundaries |
| `color-text`           | `neutral-50`             | headings and primary copy          |
| `color-text-secondary` | `neutral-200`            | body copy                          |
| `color-text-muted`     | `neutral-400`            | metadata and helper text           |
| `color-text-disabled`  | `neutral-500`            | disabled text only                 |
| `color-accent`         | `indigo-400`             | links, focus, primary action       |
| `color-accent-hover`   | `indigo-300`             | primary hover state                |
| `color-accent-subtle`  | `indigo-950`             | selected/technical background      |
| `color-success`        | `teal-400`               | verified success state             |
| `color-warning`        | `amber-400`              | warning state                      |
| `color-danger`         | `rose-400`               | destructive/error state            |

### Color rules

- Primary text and controls must meet WCAG AA contrast against their actual
  background; body text targets at least 4.5:1.
- Muted text is not used for essential instructions or small interactive labels
  unless contrast is verified.
- Color is never the only way to communicate selection, status, or error.
- The primary accent is reserved for actions, links, focus, and small moments
  of emphasis. Large accent-filled regions require design review.
- Gradients may combine nearby canvas/surface values or accent transparencies.
  Rainbow and multi-accent gradients are outside the visual language.
- Project screenshots retain their natural color and should not be forced
  through a brand color overlay.

## Typography

### Font families

| Role    | Family     | Fallback                                            |
| ------- | ---------- | --------------------------------------------------- |
| Display | Newsreader | `Georgia, "Times New Roman", serif`                 |
| Sans    | Geist      | `Inter, ui-sans-serif, system-ui, sans-serif`       |
| Mono    | Geist Mono | `ui-monospace, SFMono-Regular, Consolas, monospace` |

Newsreader is used for display headings and rare editorial emphasis. Geist Sans
is used for body, navigation, labels, controls, card titles, and dense case-study
headings. Geist Mono is limited to compact technical metadata, small eyebrow
labels, code, and optional project numbering. Do not use serif or monospace for
long technical explanations.

Use only the weights actually loaded:

- Newsreader 500 and 600 for display headings, plus 500 italic for rare
  editorial emphasis;
- Geist 400 for body;
- Geist 500 for labels and controls;
- Geist 600 for sans headings;
- Geist Mono 400 and 500 for technical labels.

The serif/sans pairing creates the editorial/technical contrast. Do not emulate
the reference by using Playfair Display or Fira Sans.

### Type scale

| Token        | Size                            | Line height | Tracking   | Usage                             |
| ------------ | ------------------------------- | ----------- | ---------- | --------------------------------- |
| `display-xl` | `clamp(3.5rem, 9vw, 7rem)`      | `0.92`      | `-0.045em` | home hero name, Newsreader        |
| `display-lg` | `clamp(2.75rem, 7vw, 5rem)`     | `0.98`      | `-0.04em`  | project hero title, Newsreader    |
| `heading-xl` | `clamp(2.25rem, 5vw, 4rem)`     | `1.02`      | `-0.035em` | major section heading, Newsreader |
| `heading-lg` | `clamp(1.625rem, 3vw, 2.25rem)` | `1.15`      | `-0.025em` | case-study section                |
| `heading-md` | `1.5rem`                        | `1.25`      | `-0.02em`  | card/group heading                |
| `heading-sm` | `1.125rem`                      | `1.35`      | `-0.01em`  | minor heading                     |
| `body-lg`    | `1.125rem`                      | `1.7`       | `0`        | introductory copy                 |
| `body-md`    | `1rem`                          | `1.7`       | `0`        | default body                      |
| `body-sm`    | `0.875rem`                      | `1.6`       | `0`        | supporting copy                   |
| `label`      | `0.875rem`                      | `1.25`      | `0.01em`   | buttons and controls              |
| `eyebrow`    | `0.75rem`                       | `1.3`       | `0.1em`    | uppercase metadata                |

Long-form prose is limited to approximately 65–72 characters per line.
Heading hierarchy follows document meaning; visual size does not determine the
HTML heading level.

Italic display text is an accent, not a default link style. Uppercase is
restricted to short eyebrow labels and must retain readable tracking.

## Spacing

Use a 4px base scale:

| Token      | Value            | Common use                     |
| ---------- | ---------------- | ------------------------------ |
| `space-0`  | `0`              | reset                          |
| `space-1`  | `0.25rem` / 4px  | tight icon adjustment          |
| `space-2`  | `0.5rem` / 8px   | compact inline gap             |
| `space-3`  | `0.75rem` / 12px | control internals              |
| `space-4`  | `1rem` / 16px    | default element gap            |
| `space-5`  | `1.25rem` / 20px | card internals                 |
| `space-6`  | `1.5rem` / 24px  | grouped content                |
| `space-8`  | `2rem` / 32px    | card padding/section subgroups |
| `space-10` | `2.5rem` / 40px  | major local separation         |
| `space-12` | `3rem` / 48px    | compact section spacing        |
| `space-16` | `4rem` / 64px    | mobile section spacing         |
| `space-20` | `5rem` / 80px    | standard section spacing       |
| `space-24` | `6rem` / 96px    | desktop section spacing        |
| `space-32` | `8rem` / 128px   | major desktop separation       |

Do not introduce intermediate values until repeated use proves the scale cannot
express a layout. Optical one- or two-pixel adjustments may be local when
required for icons or borders.

## Radii

| Token         | Value             | Usage                              |
| ------------- | ----------------- | ---------------------------------- |
| `radius-sm`   | `0.375rem` / 6px  | compact tags and code              |
| `radius-md`   | `0.625rem` / 10px | controls                           |
| `radius-lg`   | `1rem` / 16px     | cards                              |
| `radius-xl`   | `1.5rem` / 24px   | project media and feature surfaces |
| `radius-full` | `9999px`          | circular controls and pills        |

Nested elements use a radius equal to or smaller than their container. Pills
are reserved for tags, status, and compact actions—not every rectangular
surface.

## Shadows and depth

| Token           | Value                              | Usage                       |
| --------------- | ---------------------------------- | --------------------------- |
| `shadow-none`   | `none`                             | default flat content        |
| `shadow-sm`     | `0 1px 2px rgb(0 0 0 / 0.24)`      | sticky/control separation   |
| `shadow-md`     | `0 12px 32px rgb(0 0 0 / 0.28)`    | hover or raised card        |
| `shadow-lg`     | `0 24px 64px rgb(0 0 0 / 0.36)`    | mobile menu/gallery overlay |
| `shadow-accent` | `0 0 40px rgb(139 156 255 / 0.14)` | rare focused accent glow    |

Depth order is expressed first through surface color and border, then shadow.
Only one dominant shadow should appear in a local composition. Accent glow is
decorative and must not replace a focus ring.

## Iconography

- Use Lucide React exclusively for interface icons.
- Import icons directly by name; never create a registry of the entire package.
- Default stroke width is `1.75`; use `2` for small controls when necessary.
- Standard sizes are 16px, 20px, and 24px.
- Icons align optically with text and do not change the control hit target.
- Decorative icons use `aria-hidden="true"`.
- Icon-only buttons require an accessible name and tooltip where the action is
  not universally understood.
- Brand marks such as GitHub and LinkedIn may use official marks when licensing
  permits; do not approximate brand marks with Lucide.
- Do not mix filled, duotone, and outline interface icon families.

## Interface layers

| Token             | Value | Usage                                      |
| ----------------- | ----- | ------------------------------------------ |
| `layer-base`      | `0`   | normal document content                    |
| `layer-sticky`    | `20`  | sticky site chrome                         |
| `layer-overlay`   | `40`  | menus, dialogs, and gallery overlays       |
| `layer-skip-link` | `60`  | visible-on-focus skip navigation above all |

Components use these semantic layers rather than introducing local z-index
values. A new layer requires a documented stacking relationship.

## Motion principles

Motion tokens are shared with
[`animation-guidelines.md`](./animation-guidelines.md):

| Token               | Value   | Purpose                    |
| ------------------- | ------- | -------------------------- |
| `motion-instant`    | `0ms`   | reduced-motion/state reset |
| `motion-micro`      | `120ms` | press and color response   |
| `motion-fast`       | `180ms` | hover and focus            |
| `motion-base`       | `260ms` | menus and local state      |
| `motion-slow`       | `420ms` | section reveal             |
| `motion-deliberate` | `600ms` | hero/background only       |

Only `transform` and `opacity` are used for frequent animated transitions.
Motion cannot delay navigation or keep content invisible when JavaScript fails.

## Containers and grid

| Container           | Maximum width    | Use                                    |
| ------------------- | ---------------- | -------------------------------------- |
| `container-wide`    | `80rem` / 1280px | navigation, project grids, large media |
| `container-content` | `65rem` / 1040px | standard home sections                 |
| `container-prose`   | `45rem` / 720px  | case-study narrative                   |
| `container-narrow`  | `36rem` / 576px  | compact statements/forms               |

Horizontal gutters:

- under 640px: 16px;
- 640–1023px: 24px;
- 1024px and above: 32px.

The desktop grid uses 12 columns with 24px gaps. Tablet commonly uses 8
columns, and mobile uses 4 columns with 16px gaps. Components should use CSS
Grid or Flexbox based on content behavior, not reproduce a fixed design-canvas
coordinate system.

## Breakpoints

Use Tailwind's mobile-first defaults:

| Name  | Minimum width    | Intended change                            |
| ----- | ---------------- | ------------------------------------------ |
| base  | `0`              | single-column, touch-first default         |
| `sm`  | `40rem` / 640px  | wider gutters and compact two-column cases |
| `md`  | `48rem` / 768px  | navigation/layout restructuring            |
| `lg`  | `64rem` / 1024px | desktop project grid and larger typography |
| `xl`  | `80rem` / 1280px | full container and generous section rhythm |
| `2xl` | `96rem` / 1536px | breathing room, not uncontrolled scaling   |

Breakpoints respond to content failure, not device names. Avoid hiding
meaningful content merely to make a breakpoint look cleaner.

## Component styling rules

### General

- Components use semantic color and motion tokens, never raw hex values.
- Spacing comes from the documented scale.
- Interactive targets are at least 44×44 CSS pixels where practical.
- All interactive components define default, hover, focus-visible, active, and
  disabled states.
- Hover styling is wrapped in hover-capable media behavior and has a
  focus-visible equivalent where it conveys meaning.
- Borders are normally one pixel and subtle. Multiple nested borders require a
  clear structural reason.
- `className` escape hatches do not permit consumers to replace a component's
  semantics or accessibility state.

### Buttons and links

- Primary actions use the accent fill with dark text.
- Secondary actions use a quiet surface and visible border.
- Ghost actions use no permanent fill and are reserved for low-emphasis
  contexts.
- Text links use color plus underline or a similarly persistent non-color cue
  in prose.
- Buttons perform actions; links navigate. Styling must not reverse semantics.
- A region should normally contain one primary action.

Button geometry:

| Size   | Height  | Horizontal padding | Text/icon            |
| ------ | ------- | ------------------ | -------------------- |
| `sm`   | 36px    | 14px               | 14px text, 16px icon |
| `md`   | 44px    | 18px               | 14px text, 18px icon |
| `lg`   | 52px    | 24px               | 16px text, 20px icon |
| `icon` | 44×44px | none               | 20px icon            |

All buttons use `radius-md`, a 1px transparent border to prevent size changes
between variants, and `motion-fast` state transitions. Primary hover uses
`color-accent-hover` and translates at most 1px upward. Active returns to the
rest position. Disabled buttons do not move and use the native disabled
attribute.

Standalone editorial links may use an animated underline that grows from 0% to
100% over `motion-fast`. The underline is fully present on keyboard focus and
is static under reduced motion.

### Cards

- Cards group content; they are not the default wrapper for every section.
- A fully clickable card uses one stretched primary link while preserving
  separately focusable GitHub/live-demo actions without nested links.
- Card hover may raise by no more than 4px and scale media by no more than 1.02.
- Card content remains complete at rest.

Card variants:

| Variant       | Surface                                  | Boundary                  | Usage                                                        |
| ------------- | ---------------------------------------- | ------------------------- | ------------------------------------------------------------ |
| `editorial`   | transparent                              | optional top divider      | project summaries where media and whitespace define grouping |
| `surface`     | `color-surface`                          | `color-border`            | testimonials and grouped information                         |
| `interactive` | `color-surface` → `color-surface-raised` | stronger on focus         | explicitly clickable feature card                            |
| `media`       | canvas behind image                      | no redundant outer border | gallery media and large project covers                       |

All cards use `radius-lg` for the outer surface and `space-6` or `space-8`
padding when a surface exists. Cards do not receive shadows at rest unless
overlap requires depth. Project-card layouts may vary image span to create
editorial rhythm, but DOM order, reading order, and tab order remain linear.

### Forms and controls

- Labels remain visible and are not replaced by placeholders.
- Error text appears near the relevant field and is programmatically
  associated.
- Focus uses a two-pixel accent ring with sufficient offset from the surface.
- Disabled states reduce emphasis but retain readable contrast.

### Images and media

- Media uses an explicit aspect ratio and reserved intrinsic dimensions.
- Project screenshots use `radius-xl` only when the image itself is not already
  framed by a device/browser treatment.
- Captions use `body-sm` and muted text but remain readable.
- Decorative gradients and texture layers cannot intercept pointer events.

### Surface texture

A subtle noise or paper-like texture may be used to prevent large dark regions
from feeling digitally flat. It must be custom-generated, opacity-limited to
approximately 1–2%, fixed behind all content, and disabled when it causes
banding or performance issues. It must not be copied from the reference site
and must not reduce text contrast.

## Accessibility rules

- All normal text meets WCAG 2.2 AA contrast: at least 4.5:1, or 3:1 for large
  text. Interface boundaries and focus indicators target at least 3:1 against
  adjacent colors.
- Every route has one logical `h1`; headings do not skip levels for visual size.
- Regions use semantic landmarks, and a visible-on-focus skip link targets the
  main content.
- Keyboard focus uses a 2px `color-accent` ring with at least 2px offset. Focus
  is never removed without an equal or stronger replacement.
- DOM order matches reading and visual order. Responsive asymmetry may not use
  CSS ordering that changes meaning.
- Interactive targets are at least 44×44px where practical and never smaller
  than 24×24px under WCAG 2.2 target-size exceptions.
- Hover interactions have focus-visible equivalents and cannot contain unique
  information.
- Body text remains usable at 200% browser zoom and the layout reflows without
  two-dimensional scrolling at 320 CSS pixels except for intrinsically
  two-dimensional content.
- Informative images require concise alt text. Decorative images use empty alt
  text. Detailed architecture diagrams also receive a nearby text explanation.
- Animations follow `prefers-reduced-motion`; content and navigation never
  depend on an entrance animation completing.
- Color never acts as the only state indicator. Selected, active, success, and
  error states include text, shape, icon, or programmatic state.
- Native semantics are preferred over ARIA. Icon-only controls have accessible
  names, and external-link behavior is communicated consistently.
- Forced-colors mode must retain visible text, links, controls, and focus
  indicators; decorative texture and gradients may disappear.
- Touch, keyboard, screen-reader, zoom, contrast, and reduced-motion checks are
  required before a component is considered complete.

## Token governance

1. Search for an existing semantic token before adding one.
2. Add a token only when at least two uses or a clear system role exists.
3. Document its role, not only its visual value.
4. Check contrast and reduced-motion implications.
5. Update component examples and visual regression coverage when the token
   changes.
