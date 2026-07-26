# Quality Architecture

## Performance

The Lighthouse goal above 95 is treated as a release constraint, while
recognizing that Lighthouse results vary by environment. The architecture
protects the score through:

- static generation for all current pages;
- Server Components by default;
- leaf-level client islands;
- `next/image` with correct `sizes`, dimensions, and priority only for the
  route's likely largest-contentful image;
- `next/font` or self-hosted fonts with controlled weights;
- no runtime API request for local content;
- no global state or animation library imports in server modules;
- deferred loading for below-the-fold video and interactive galleries;
- bundle inspection when a client dependency is introduced.

Initial implementation budgets:

| Metric                   | Target                                                   |
| ------------------------ | -------------------------------------------------------- |
| Lighthouse performance   | > 95 on representative mobile run                        |
| Lighthouse accessibility | > 95, with 100 as the implementation goal                |
| Core Web Vitals          | Pass current "good" thresholds                           |
| Cumulative layout shift  | Near zero; all media dimensions reserved                 |
| Client JavaScript        | Reviewed per interactive island, not accepted by default |

Exact byte budgets should be baselined after the first real design is built;
inventing a bundle number before typography, imagery, and animation exist would
not be meaningful.

## Accessibility

Accessibility responsibilities are assigned:

- root layout: language and document defaults;
- site layout: header, navigation, main, and footer landmarks;
- sections: heading hierarchy and labelled region where useful;
- UI primitives: focus visibility, disabled states, target size, and semantic
  element choice;
- navigation: keyboard-operable menu, focus return, and current-location state;
- gallery: buttons, labels, announcements only when necessary, and no
  swipe-only controls;
- content: alt text and link labels;
- motion layer: reduced-motion behavior.

Use native HTML before ARIA. The mobile menu should use a disclosure pattern
unless it becomes a true modal; if modal, it must trap focus, close on Escape,
and restore focus. Active section highlighting uses `aria-current` only when
its meaning accurately represents the current location.

Color contrast, typography, and focus styling are completed in the design
system but verified automatically and manually during implementation.

## SEO and sharing

- Every route has a unique title, description, canonical URL, and social image.
- Sitemap project entries derive from published content.
- Draft projects never enter routes, metadata, or sitemap output.
- Project headings retain a logical single-`h1` hierarchy.
- Structured data matches visible content and contains no fabricated reviews or
  claims.
- External links clearly communicate destination and use safe new-tab
  behavior when a new tab is intentional.

## Testing strategy

### Static checks

- TypeScript strict checking;
- ESLint including Next.js accessibility and performance guidance;
- content schema and asset-reference validation;
- production build, which proves static params and metadata can resolve.

### Unit tests

Cover pure, high-value logic:

- project schema;
- sorting and featured selection;
- adjacent-project calculation;
- slug and URL normalization;
- metadata helper output.

### Integration tests

Render representative routes with fixture content and verify:

- every published project resolves;
- unpublished projects do not resolve;
- required project sections are present;
- metadata and visible project data agree;
- home sections receive the intended selection.

### End-to-end tests

Test visitor journeys at mobile and desktop widths:

- home navigation reaches every section;
- keyboard navigation and mobile menu work;
- a featured project opens its case study;
- GitHub and live-demo links have correct destinations;
- previous and next project navigation respects catalog boundaries;
- all-projects navigation returns to `/#projects`;
- unknown project routes show recovery UI;
- reduced-motion mode avoids motion-dependent visibility.

### Automated audits

Run Lighthouse CI or an equivalent budget check against a production build.
Run an accessibility engine such as axe in end-to-end tests, but retain manual
keyboard, screen-reader smoke, zoom, and reduced-motion checks. Automated
accessibility checks do not prove the experience is accessible.

## Security and privacy

The current static site has a small attack surface. Maintain it by:

- avoiding unsafe arbitrary HTML in MDX;
- using an explicit MDX component allowlist;
- validating external URLs and applying safe `rel` values;
- keeping secrets out of `NEXT_PUBLIC_*` environment variables;
- adding security headers in `next.config.ts` after checking hosting needs;
- collecting no visitor data until analytics or a form has a documented
  purpose and privacy treatment.

If a contact form is added, validate on the server, rate-limit submissions,
include spam controls, bound field sizes, avoid exposing provider keys, and
provide accessible success/error states.

## Observability

A static portfolio does not need an application logging platform initially.
Hosting analytics and Web Vitals monitoring may be introduced to detect real
performance regressions. Any analytics must be lightweight, privacy-aware, and
loaded without blocking rendering.

Build failures from content validation are the primary operational signal.
External GitHub/live-demo links may be checked periodically in CI, but transient
third-party failures should not necessarily block every deployment.

## Definition of done for implementation

A feature is complete only when:

- its content is not embedded in route code;
- the server/client boundary is minimal and intentional;
- keyboard, focus, screen-reader naming, and reduced motion are considered;
- responsive behavior is tested at representative widths;
- no unexpected layout shift is introduced;
- types, lint, build, and relevant tests pass;
- route metadata remains correct;
- architecture documentation is updated if a boundary changed.
