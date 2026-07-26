# Accessibility Review

## Scope and standard

This review covers the homepage, all four published project case studies, the
explicit not-found recovery route, and the open mobile-navigation state. The
implementation target is WCAG 2.2 AA, no automated axe violations, and a
Lighthouse accessibility score of 100.

Automated checks cannot prove complete accessibility. The results below combine
axe, Lighthouse, browser accessibility-tree inspection, real keyboard events,
responsive and forced-colors emulation, semantic source review, and the
existing component test suite.

Review date: 2026-07-26.

## Automated results

`pnpm test:a11y` runs 17 Playwright checks:

- full-document axe scans on `/`, every published `/projects/[slug]` route, and
  `/projects/not-found`;
- a second axe scan with the 320px mobile disclosure open;
- one banner, one main, one footer, one `h1`, and non-skipping heading order on
  every key route;
- keyboard completion of home → Nova case study → all projects;
- reflow without horizontal document overflow at 320 and 640 CSS pixels;
- focus visibility and content preservation with forced colors active.

Result after remediation: zero axe violations, including zero critical or
serious findings. Lighthouse CI separately enforces an accessibility score of
100 on the homepage and the media-heavy Nova project route.

## Findings and remediation

### Duplicate navigation landmark names

Initial axe scans found repeated navigation landmarks with identical accessible
names:

- the hero and contact social-link groups both used “Social and contact links”;
- the project hero actions and case-study footer actions both used
  “{Project} external links”.

The underlying links were correctly named, but screen-reader landmark lists
could not distinguish the groups. The social-link component now assigns a
variant-specific landmark name, and project actions distinguish primary from
supporting project links. No landmark is suppressed or converted to a generic
container.

### LCP-gated entrance motion

The earlier performance review found that route-level and hero entrance
transforms delayed meaningful paint. Removing those transforms also improves
accessibility: identity, actions, and project content are stable immediately
and never depend on hydration or motion preference. Below-the-fold reveal,
hover, and disclosure motion still honor `prefers-reduced-motion`.

## Keyboard and focus-order review

The review used Tab, Shift+Tab, Enter, Space, and Escape paths at desktop and
320px mobile widths.

| Journey          | Expected order and behavior                                          | Result |
| ---------------- | -------------------------------------------------------------------- | ------ |
| Page entry       | Skip link is first; Enter moves focus to `main`                      | Pass   |
| Desktop header   | Brand, primary navigation, then page content                         | Pass   |
| Hero             | Project action, contact action, then social/contact links            | Pass   |
| Project cards    | Case study, GitHub, and live demo remain separate siblings           | Pass   |
| Project page     | Live demo, GitHub, narrative links, previous/all/next navigation     | Pass   |
| Mobile menu      | Toggle exposes labelled navigation; Escape closes and restores focus | Pass   |
| Route navigation | Case study opens and All projects returns to `/#projects`            | Pass   |

Focus indicators use both a global two-pixel outline and component-level focus
rings. The global outline remains visible in forced-colors mode as
`CanvasText`, so color token remapping does not erase keyboard location.

## Screen-reader smoke notes

Browser accessibility-tree and role-based inspection confirmed:

- `banner`, uniquely named navigation landmarks, `main`, labelled regions, and
  `contentinfo` are exposed in reading order;
- every route exposes exactly one descriptive `h1`;
- homepage section headings and project narrative headings do not skip levels;
- project and social links include their destination purpose, and intentional
  new-tab links announce “opens in a new tab”;
- meaningful images expose content-authored alternative text and decorative
  layers are hidden;
- the mobile disclosure communicates its expanded state, labels its controlled
  panel, makes the closed panel inert, and supports Escape with focus return;
- project media captions and native video controls remain in document order.

This is a smoke test of semantics and the browser accessibility tree, not a
claim of exhaustive assistive-technology usability. A short human pass with
VoiceOver/Safari and NVDA/Firefox remains a worthwhile pre-publication check,
especially for pronunciation, verbosity, and link-list experience.

## Zoom and reflow

A 640 CSS-pixel viewport represents the layout width available to a 1280px
desktop viewport at 200% browser zoom. Both the homepage and a representative
project route retain all content and controls without horizontal document
scrolling at that width.

The same routes also pass at 320 CSS pixels, the WCAG reflow reference width.
Long email text wraps, project actions wrap, navigation switches to the mobile
disclosure, and media remains constrained to its container. Intentionally
scrollable gallery viewports are component-scoped and do not create page-level
overflow.

## Color and forced-colors review

- Existing token contrast tests verify normal text against every documented
  dark surface at or above 4.5:1.
- Axe and Lighthouse test rendered contrast on representative routes.
- Forced-colors emulation preserves headings, links, buttons, media boundaries,
  and the open mobile menu.
- Focus uses a system color under forced colors rather than relying on indigo.
- Information is not conveyed by color alone: active links use an underline,
  external destinations include text/icon cues, and focus uses an outline.

## Reduced motion

End-to-end tests create a context with `reducedMotion: "reduce"` and verify:

- observed regions resolve to their immediate visible state;
- spatial transforms and stagger delays are removed;
- smooth anchor scrolling becomes automatic;
- the mobile menu opens and closes without transition duration;
- card hover translation and media scale are removed;
- project content remains fully visible without a route entrance wrapper.

## Release gate

The accessibility gate is:

```text
pnpm test:a11y
pnpm audit:lighthouse
```

Both commands must pass alongside the full repository check. Any future
interactive component must add a state-specific axe scan and a keyboard
journey; a default-page scan alone does not cover hidden or revealed UI.
