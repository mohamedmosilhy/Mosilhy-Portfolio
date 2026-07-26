# Animation Guidelines

## Purpose

Motion should make the portfolio feel composed and responsive while preserving
the calm, editorial quality defined in
[`design-principles.md`](./design-principles.md). The smoothness of the
[Itsechi portfolio](https://itsechi.github.io/portfolio/) is a mood reference,
not an animation specification to reproduce.

Animation should enhance usability rather than distract. Content, navigation,
and actions must remain complete when motion is disabled or JavaScript does not
run.

## Motion hierarchy

Motion has four priority levels:

1. **Feedback:** confirm hover, press, focus, open, close, and selection.
2. **Continuity:** show how a menu, gallery item, or page region changes.
3. **Orientation:** establish reading order as content enters.
4. **Atmosphere:** provide subtle background life after all functional motion
   is correct.

Atmospheric motion is the first to be removed for performance or accessibility.
No animation exists solely because a source library offers it.

## Duration tokens

| Token        | Duration | Allowed use                                     |
| ------------ | -------- | ----------------------------------------------- |
| `instant`    | 0ms      | reduced motion, immediate state                 |
| `micro`      | 120ms    | press, icon response, color confirmation        |
| `fast`       | 180ms    | hover, focus, underline, small tooltip          |
| `base`       | 260ms    | menu, disclosure, gallery state                 |
| `slow`       | 420ms    | section reveal, page entrance                   |
| `deliberate` | 600ms    | hero sequence or subtle background introduction |

Rules:

- Routine interaction feedback must finish within 300ms.
- No individual entrance exceeds 600ms.
- No user-triggered action waits for a decorative animation.
- Exit motion is equal to or faster than the corresponding entrance.
- Durations are selected from tokens; arbitrary component durations are
  prohibited.

## Easing tokens

CSS cubic Bézier values and Framer Motion arrays use the same coordinates:

| Token             | Value                | Use                             |
| ----------------- | -------------------- | ------------------------------- |
| `ease-standard`   | `[0.2, 0, 0, 1]`     | position and size state changes |
| `ease-enter`      | `[0.16, 1, 0.3, 1]`  | entrances and reveals           |
| `ease-exit`       | `[0.4, 0, 1, 1]`     | exits                           |
| `ease-emphasized` | `[0.22, 1, 0.36, 1]` | hero and large media, sparingly |
| `ease-linear`     | `linear`             | progress only, not entrances    |

Spring presets:

| Token               | Stiffness | Damping | Mass | Use                             |
| ------------------- | --------- | ------- | ---- | ------------------------------- |
| `spring-responsive` | 420       | 32      | 0.8  | direct drag/press feedback      |
| `spring-gentle`     | 220       | 28      | 1    | optional gallery/media settling |

Springs must not visibly bounce text, navigation, or large page regions.

## Distance and scale tokens

| Token             | Value | Use                           |
| ----------------- | ----- | ----------------------------- |
| `distance-subtle` | 8px   | page or compact text entrance |
| `distance-small`  | 16px  | section/card entrance         |
| `distance-medium` | 24px  | mobile menu panel only        |
| `scale-hover`     | 1.02  | project media maximum         |
| `lift-hover`      | -4px  | interactive card maximum      |
| `lift-button`     | -1px  | primary button hover maximum  |

Large translations, 3D flips, elastic text, and perspective distortion are not
part of the initial motion language.

## Animation types

### Initial hero presentation

Purpose: establish reading order without delaying identity or LCP.

Sequence:

1. greeting/eyebrow;
2. name and role;
3. introduction;
4. actions and social links.

Specification:

- the initial hero uses no transform or opacity entrance animation;
- all groups are present and paintable in server-rendered HTML;
- interactive and decorative state changes may still use motion tokens after
  first paint;
- the introduction must remain eligible for the earliest possible LCP.

Do not split the name into character-by-character animation. It harms reading
and creates excessive delay.

### Section reveal

Purpose: gently mark progression through a long page.

- variant: paintable content with block-axis translation 16px→0;
- duration: `slow`;
- easing: `ease-enter`;
- trigger: first viewport entry;
- threshold: approximately 15% visible;
- root margin: `0px 0px -10% 0px`;
- repetition: once per page load.

Use one reveal per meaningful group, not one per paragraph. Long content should
not remain hidden while the observer waits.

### Staggered collections

Purpose: communicate that related items belong to one group.

- item motion: paintable content plus 8px rise;
- item duration: `base` or `slow`;
- gap: 50–70ms;
- maximum items animated individually: 6;
- items beyond 6 enter in small batches or as one group;
- total sequence should normally finish within 700ms.

Project cards and skill groups may stagger. Technology tags inside every card
must not each animate.

### Header surface transition

Purpose: distinguish sticky navigation from scrolled content.

- trigger: page scroll crosses a small sentinel below the header;
- background, border, and shadow transition over `fast`;
- backdrop blur may change over `base`;
- header height and link position do not animate;
- scrolling itself never runs React state on every frame.

Use `IntersectionObserver` or a CSS-capable solution rather than an unthrottled
scroll listener.

### Mobile menu

Purpose: explain the relationship between trigger and navigation panel.

- panel: opacity 0→1 and translate 16px→0 over `base`/`ease-enter`;
- close: opacity 1→0 and translate 0→8px over `fast`/`ease-exit`;
- optional backdrop: opacity only over `fast`;
- menu items may stagger by 40ms, capped at four items;
- focus is moved only according to the chosen disclosure/modal pattern, never
  as a visual flourish.

The control's `aria-expanded` state updates immediately.

### Project-card hover and focus

Purpose: confirm that the case study is interactive and emphasize its media.

On hover-capable pointers:

- card lifts at most 4px over `fast`/`ease-standard`;
- border/surface increases one semantic level;
- media scales at most to 1.02 over `base`/`ease-standard`;
- an arrow icon may translate at most 4px inline;
- shadow may transition from none/`shadow-sm` to `shadow-md`.

On keyboard focus:

- the focus ring is immediate and visible;
- surface/border emphasis matches hover;
- movement is optional and must not be the only cue.

No hidden description or action appears only on hover.

### Button and link feedback

- primary button hover: background token change plus 1px lift over `fast`;
- button active: return to rest position over `micro`;
- secondary/ghost hover: surface and border change over `fast`;
- icon translation: at most 3px and only when it reinforces direction;
- editorial link underline: expand over `fast`, fully visible on focus;
- visited inline prose links remain distinguishable where browser history is
  useful.

Buttons do not use magnetic cursor attraction, ripple effects, or pointer
tracking in the initial release.

### Gallery transitions

The default stack and grid galleries require no client animation. If the
content explicitly uses the permitted carousel:

- current media fades to the next over `base`;
- optional directional translation is limited to 16px;
- height changes are avoided by reserving the media ratio;
- captions update with the media and are not separately delayed;
- controls remain enabled and labelled during transition;
- rapid navigation resolves to the most recent user intent.

Autoplay is prohibited.

### Background atmosphere

Optional hero atmosphere may use one slowly drifting gradient or custom texture:

- transform/opacity only;
- cycle duration of at least 12 seconds;
- no abrupt loop;
- opacity low enough to preserve text contrast;
- pointer interaction is unnecessary;
- paused or removed when offscreen;
- disabled on reduced motion and when profiling shows meaningful paint cost.

Continuous moving noise, particle fields, cursor trails, and WebGL are outside
the initial release.

## Scroll behavior

### Anchor navigation

- Use native anchor navigation with root-qualified fragments.
- Apply CSS `scroll-behavior: smooth` only when the user has not requested
  reduced motion.
- Apply `scroll-margin-top` to target sections based on sticky header height
  plus one spacing token.
- Do not use JavaScript scroll hijacking or inertia libraries.
- Direct visits to a fragment land immediately; they do not replay a long
  scroll sequence.
- Focus does not automatically move on same-page anchor navigation unless a
  tested accessibility requirement calls for it.

### Viewport triggers

- Use `IntersectionObserver`, not continuous scroll progress, for reveals and
  active navigation.
- An element that is already visible on first render may animate immediately.
- Reveals run once; scrolling back does not repeatedly hide and show content.
- Server-rendered content remains visible if the observer does not initialize.

### Parallax

Parallax is not part of the initial release. If later proposed, it must be
limited to a decorative layer, use a maximum travel of 24px, be compositor-only,
be disabled below `lg` and under reduced motion, and pass a measured usability
and performance review.

## Page transitions

The initial release does not implement blocking cross-route exit transitions.
App Router links navigate immediately, preserving responsiveness and browser
behavior.

`PageEntrance` remains available for future non-critical regions, but the
initial project route does not wrap its article in an entrance animation. This
keeps the cover image eligible for LCP as soon as it loads.

Any later use must keep content at opacity 1, use at most translate 8px→0 with
`slow`/`ease-enter`, add no delay, and exclude route LCP candidates.

Back/forward navigation and restored scroll position must not be overridden.
Native View Transitions may be evaluated later only after route behavior,
reduced-motion support, and browser fallback are stable.

## Loading and skeleton motion

Local static content does not use artificial loading UI. If a future dynamic
feature needs a skeleton:

- match the final layout dimensions;
- use a static surface under reduced motion;
- use one low-contrast opacity pulse otherwise;
- never use a sweeping high-contrast shimmer across long text regions;
- stop animation as soon as real content is available.

## Reduced-motion fallback

Honor `prefers-reduced-motion: reduce` in CSS and Framer Motion. Reduced motion
means removing spatial and continuous motion, not simply shortening everything.

| Motion                | Standard                       | Reduced-motion fallback                                |
| --------------------- | ------------------------------ | ------------------------------------------------------ |
| Hero sequence         | grouped fade/rise with stagger | content visible immediately; optional 120ms group fade |
| Section reveal        | 16px rise and fade             | visible immediately                                    |
| Staggered list        | 50–70ms item stagger           | no stagger; visible immediately                        |
| Smooth anchor scroll  | native CSS smooth              | `scroll-behavior: auto`                                |
| Card hover            | lift plus media scale          | color/border/focus change only                         |
| Button hover          | 1px lift plus color            | color change only                                      |
| Mobile menu           | panel translate/fade           | immediate or 120ms fade                                |
| Gallery               | directional fade/slide         | immediate swap or 120ms fade                           |
| Page entrance         | 8px rise/fade                  | visible immediately                                    |
| Background atmosphere | slow drift                     | static background                                      |

The implementation must not flash hidden content while determining preference.
Motion primitives select visible initial states for reduced-motion users.

## Performance rules

- Animate `transform` and `opacity` for frequent motion.
- Avoid animating width, height, inset, margin, padding, filter blur, or
  box-shadow continuously.
- Use blur only for static/sticky surface state and test low-powered devices.
- Do not add `will-change` globally or leave it permanently on many items.
- Suspend continuous motion when the document is hidden.
- Keep Framer Motion inside reusable leaf-level client components.
- Prefer CSS for simple hover, focus, color, and underline transitions.
- Measure the client bundle and main-thread cost of every sourced animation.
- A motion effect is removed if it causes Core Web Vitals regression or visible
  input delay.

## Review checklist

- Does the motion explain hierarchy, state, or spatial continuity?
- Is the content complete at rest and without JavaScript?
- Are duration, easing, distance, and stagger documented tokens?
- Is interaction feedback faster than decorative entrance motion?
- Does keyboard focus receive an equivalent cue?
- Is reduced motion a true non-spatial fallback?
- Does the animation avoid layout shift and repeated scroll work?
- Is the effect original and adapted to the portfolio design system?
- Would removing it reduce usability? If not, is its atmospheric value strong
  enough to justify its cost?
