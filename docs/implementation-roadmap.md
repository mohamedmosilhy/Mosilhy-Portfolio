# Implementation Roadmap

## Delivery rules

The implementation is divided into small, sequential milestones. Every
milestone:

- has one coherent purpose;
- leaves the application buildable;
- includes its own tests or validation;
- updates documentation when a contract changes;
- can be reviewed, reverted, and committed independently;
- does not include opportunistic work from later milestones.

Milestones describe future work only. This document does not implement code.

## Milestone review gate

Complete this review after every milestone and before starting the next one:

- [ ] The documented architecture and dependency direction are respected.
- [ ] No component, content value, token, or utility is duplicated.
- [ ] The milestone stays within its stated responsibility.
- [ ] Responsive behavior is verified at mobile, tablet, and desktop sizes.
- [ ] The result looks intentional on mobile, not merely compressed.
- [ ] Keyboard navigation, focus order, names, and states work.
- [ ] Animations are smooth, purposeful, and reduced-motion safe when motion is
  part of the milestone.
- [ ] Content remains usable without animation and unnecessary client code.
- [ ] Relevant automated tests pass.
- [ ] Type checking passes.
- [ ] Lint passes.
- [ ] Formatting checks pass.
- [ ] The production build passes.
- [ ] Documentation and the provenance register are updated when applicable.
- [ ] Review findings are resolved or explicitly moved to a tracked later
  milestone.
- [ ] The milestone is committed with one clear, scoped commit.

A milestone is not complete merely because its deliverables exist. It is
complete only after this gate passes and the commit is created.

## Milestone 0 — Documentation baseline

**Goal:** Agree on requirements, architecture, design, content, motion, and
source policies before UI work.

**Deliverables:**

- requirements and architecture documents;
- design principles and design system;
- component inventory;
- content model;
- animation guidelines;
- component-source policy;
- this roadmap.

**Validation:**

- documents have no broken local links;
- terms and tokens agree across documents;
- no application files are changed.

**Suggested commit:** `docs: define portfolio architecture and design system`

## Milestone 1 — Tooling and quality gates

**Goal:** Establish the minimum implementation toolchain without building UI.

**Deliverables:**

- install and initialize shadcn/ui as the owned UI foundation;
- create and validate `components.json`;
- configure shadcn aliases to match the repository's `@/*` architecture;
- verify the shadcn CLI can resolve the configuration without adding feature
  components;
- install requirements-approved Lucide and Framer Motion dependencies;
- add the chosen MDX and runtime-schema dependencies;
- add unit and end-to-end test runners;
- add Prettier and `prettier-plugin-tailwindcss`;
- add format and format-check scripts;
- add scripts for type checking, content validation, tests, and production
  build;
- document supported Node and package-manager versions.

**Validation:**

- untouched starter application builds;
- `components.json` matches the design-system conventions and configured
  aliases resolve correctly;
- the shadcn CLI recognizes the project configuration;
- Prettier formats supported files and sorts Tailwind classes consistently;
- the format check passes without modifying files;
- type check, lint, and empty test suites run successfully;
- dependency audit shows no unexplained UI framework or formatting tool.

**Suggested commit:** `chore: establish portfolio quality tooling`

## Milestone 2 — Design tokens and document foundation

**Goal:** Encode the design system without implementing portfolio sections.

**Deliverables:**

- semantic color, typography, spacing, radius, shadow, container, breakpoint,
  and motion tokens;
- Newsreader, Geist, and Geist Mono loading with only documented weights;
- global canvas, selection, focus, reduced-motion, and base document rules;
- development-only token preview route or test fixture if useful.

**Validation:**

- token names and values match `design-system.md`;
- font loading creates no unexpected layout shift;
- contrast targets pass for base text, surfaces, accent, and focus;
- production build passes.

**Suggested commit:** `feat: add design tokens and typography foundation`

## Milestone 3 — Content types and validation

**Goal:** Implement the content model independently from pages.

**Deliverables:**

- shared content types;
- runtime schemas for assets, profile, navigation, social links, skills,
  testimonials, project frontmatter, and site metadata;
- cross-record validation helpers;
- fixtures for valid and invalid records;
- actionable validation errors.

**Validation:**

- unit tests cover schema boundaries and cross-record failures;
- inferred schema types agree with public normalized interfaces;
- no React component imports the raw schemas.

**Suggested commit:** `feat: define and validate portfolio content`

## Milestone 4 — Repository content and server loaders

**Goal:** Make local TypeScript/MDX content available through the server-only
access API.

**Deliverables:**

- typed profile, navigation, social-link, skill, and testimonial modules;
- initial project MDX fixtures/content;
- server-only project discovery and parsing;
- selectors for featured, ordered, previous, and next projects;
- home and project page-model builders;
- asset-reference and MDX structure validation.

**Validation:**

- published projects resolve by slug;
- drafts remain outside public selectors;
- project technology IDs resolve to skills;
- ordering plus non-wrapping previous/next boundary tests pass;
- invalid content fails with a source path and field.

**Suggested commit:** `feat: add validated portfolio content pipeline`

## Milestone 5 — Generic UI primitives

**Goal:** Implement reusable semantic primitives before feature styling.

**Deliverables:**

- `Button`, `ExternalLink`, `IconLink`, `Tag`, `SectionHeading`, `Prose`,
  `MediaFrame`, `Divider`, and `SkipLink`;
- only the variants listed in the component inventory;
- focused component tests or a local review surface;
- initial provenance-register entries for any sourced primitive.

**Validation:**

- all states work by keyboard;
- accessible names and element semantics are correct;
- variants use only design tokens;
- no unnecessary client boundary is introduced;
- visual checks pass at base, `md`, and `xl`.

**Suggested commit:** `feat: build accessible UI primitives`

## Milestone 6 — Layout primitives and site shell

**Goal:** Establish responsive page structure and navigation.

**Deliverables:**

- `Container`, `Section`, `SiteHeader`, desktop navigation,
  `MobileNavigation`, and `SiteFooter`;
- root-qualified home anchors;
- sticky header and active-section observation;
- mobile disclosure/menu keyboard behavior;
- main landmark and skip-link target.

**Validation:**

- navigation works from home and project paths;
- keyboard focus, Escape, and focus return are correct;
- section targets are not hidden behind the sticky header;
- no continuous scroll-state rendering;
- production build and navigation end-to-end tests pass.

**Suggested commit:** `feat: add responsive site shell and navigation`

## Milestone 7A — Hero prototype

**Goal:** Resolve the highest-risk visual area independently and establish the
home page's tone without final Framer Motion choreography.

**Deliverables:**

- `HeroSection` and `SocialLinks`;
- greeting, name, role, introduction, primary and secondary actions;
- original responsive composition informed by the design principles;
- static background treatment and media, if the approved hero requires them;
- one approved hero direction after focused visual iteration.

**Validation:**

- identity, role, proof direction, and contact/project paths are clear in the
  initial viewport;
- content is complete with JavaScript and animation disabled;
- heading hierarchy and CTA semantics are correct;
- narrow mobile, short mobile, tablet, desktop, and large desktop compositions
  are intentionally reviewed;
- project and contact actions work by keyboard;
- the hero uses only documented tokens and original assets/treatments.

**Suggested commit:** `feat: build responsive portfolio hero`

## Milestone 7B — Featured projects

**Goal:** Build the home project's proof-of-work experience independently from
the remaining supporting sections.

**Deliverables:**

- featured projects and project cards;
- responsive editorial grid/list behavior;
- cover media, summary, technologies, GitHub, live-demo, and case-study actions;
- static hover and focus states without final motion choreography.

**Validation:**

- project order comes from the content model;
- cards have valid, non-nested links;
- card reading order and DOM order remain logical at every breakpoint;
- informative media has correct alt text and stable dimensions;
- the section works without hover and JavaScript;
- mobile, tablet, and desktop visual checks pass.

**Suggested commit:** `feat: add featured project showcase`

## Milestone 7C — Supporting home sections

**Goal:** Complete the home narrative and footer content without final Framer
Motion choreography.

**Deliverables:**

- grouped skills;
- testimonials;
- about;
- direct-link contact section;
- final footer identity, navigation, contact, and social content integration;
- responsive section composition and real content;
- complete home-page section ordering.

**Validation:**

- page is complete with JavaScript disabled;
- section order and content match requirements;
- empty testimonials omit gracefully;
- mobile, tablet, and desktop visual checks pass;
- keyboard and automated accessibility tests pass.

**Suggested commit:** `feat: complete portfolio home sections`

## Milestone 8 — Project case-study routing

**Goal:** Generate detailed project pages from validated content.

**Deliverables:**

- `/projects/[slug]` route;
- static params and rejected unknown dynamic params;
- project hero, gallery, technologies, actions, prose blocks, callout, metric,
  and project navigation;
- project navigation with previous case study, `All Projects`, and next case
  study destinations;
- allowlisted MDX component registry;
- project-specific not-found experience.

**Validation:**

- every published project builds;
- drafts and unknown slugs return not found;
- required case-study order is preserved;
- MDX cannot import arbitrary components or scripts;
- gallery is accessible and has stable dimensions;
- previous/next ordering and boundary behavior pass tests;
- `All Projects` returns to the home projects section at `/#projects`;
- project navigation has logical reading order and accessible link labels.

**Suggested commit:** `feat: add generated project case studies`

## Milestone 9 — Motion primitives

**Goal:** Add reusable motion behavior without changing content or route APIs.

**Deliverables:**

- `Reveal`, `Stagger`, `StaggerItem`, and `PageEntrance`;
- shared duration, easing, distance, and spring tokens;
- reduced-motion selection;
- client boundaries limited to the motion layer;
- motion provenance records for any adapted source.

**Validation:**

- motion matches `animation-guidelines.md`;
- server-rendered content is visible before enhancement;
- reduced motion removes translation, continuous movement, and stagger;
- client bundle impact is reviewed;
- no layout shift or scroll handler is introduced.

**Suggested commit:** `feat: add accessible motion primitives`

## Milestone 10 — Feature choreography and interaction polish

**Goal:** Apply restrained motion to completed features.

**Deliverables:**

- hero group sequence;
- section and project-grid reveal;
- header surface transition;
- mobile-menu transition;
- project-card, button, and link state motion;
- optional low-cost custom hero atmosphere only if performance allows.

**Validation:**

- no interaction waits for decoration;
- hover has focus and touch-safe behavior;
- total stagger and durations stay within budgets;
- reduced-motion matrix is manually verified;
- mobile performance remains within target.

**Suggested commit:** `feat: choreograph portfolio interactions`

## Milestone 11 — Metadata and discovery

**Goal:** Complete route-level SEO and sharing without changing visible
content.

**Deliverables:**

- metadata base and title template;
- home metadata;
- generated project metadata;
- canonical URLs and social images;
- person, website, and project structured data;
- sitemap and robots output.

**Validation:**

- metadata uses the canonical content model;
- drafts do not appear in routes or sitemap;
- structured data matches visible content;
- social image paths resolve;
- metadata integration tests pass.

**Suggested commit:** `feat: add portfolio metadata and discovery`

## Milestone 12 — Responsive media and performance pass

**Goal:** Optimize real assets and enforce measurable budgets.

**Deliverables:**

- properly sized AVIF/WebP project media;
- accurate `sizes` and intrinsic dimensions;
- priority limited to the likely LCP image;
- below-the-fold media loading strategy;
- bundle analysis and removal of unused client code;
- Lighthouse CI or equivalent production audit configuration.

**Validation:**

- no material image-driven layout shift;
- representative mobile Lighthouse performance exceeds 95;
- Core Web Vitals are in the current good range;
- no unexpected large dependency enters shared client chunks.

**Suggested commit:** `perf: optimize portfolio media and bundles`

## Milestone 13 — Accessibility hardening

**Goal:** Verify the complete experience beyond component-level checks.

**Deliverables:**

- automated axe coverage for key routes;
- manual keyboard and focus-order review;
- screen-reader smoke test notes;
- 200% zoom and 320px reflow review;
- forced-colors and contrast review;
- reduced-motion end-to-end coverage;
- resolved findings.

**Validation:**

- Lighthouse accessibility exceeds 95, with 100 as the implementation target;
- no critical or serious automated accessibility findings;
- every page has correct landmarks and heading order;
- all primary journeys complete by keyboard.

**Suggested commit:** `fix: harden portfolio accessibility`

## Milestone 14 — Release verification

**Goal:** Produce a deployable first release with documentation synchronized.

**Deliverables:**

- production build verification;
- end-to-end tests for home navigation, projects, external actions,
  previous/all/next project navigation, and not-found behavior;
- broken-link and local-asset checks;
- final copy and content review;
- updated README and architecture decision log;
- deployment checklist.

**Validation:**

- lint, type check, content validation, tests, and build pass from a clean
  install;
- performance and accessibility budgets pass against the production build;
- all documented components and routes are accounted for;
- no placeholder content, links, images, or metadata remain.

**Suggested commit:** `chore: prepare portfolio for release`

## Commit discipline

- Do not combine dependency setup, content modeling, and feature UI in one
  commit.
- Do not leave a milestone with disabled tests or knowingly broken responsive
  states.
- Use follow-up commits only for review findings within the same milestone;
  squash them into the milestone commit when appropriate.
- Record architecture or design deviations in the same commit that introduces
  them.
- A later milestone may refine earlier work but must not silently change its
  public contracts.
