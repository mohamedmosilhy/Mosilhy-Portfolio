# Decision Log and Evolution

## Accepted decisions

### ADR-001: Keep the root-level `app` directory

**Decision:** Retain the existing root-level App Router structure instead of
moving code into `src`.

**Reason:** Both layouts are supported, and a move provides no architectural
benefit. The existing `@/*` alias already supports clear absolute imports.

**Revisit when:** The repository becomes a monorepo or contains substantial
non-application packages that make a `src` boundary useful.

### ADR-002: Use a feature-first component architecture

**Decision:** Keep domain-specific components in `features`, generic primitives
in `components/ui`, and site chrome in `components/layout`.

**Reason:** The portfolio has a small number of clear domains but many possible
sections. Feature ownership keeps related summary and detail behavior together
without turning all components into false globals.

**Revisit when:** A feature becomes large enough to extract as a package, or a
shared primitive proves to be domain-specific.

### ADR-003: Use local TypeScript and MDX content

**Decision:** Store structured short content in TypeScript and project case
studies in MDX, accessed only through a content service.

**Reason:** It provides type safety, readable long-form authoring, static
generation, Git history, and no runtime service dependency.

**Alternatives rejected now:**

- hard-coded page content, because it duplicates metadata and couples writing
  to layout;
- JSON for all content, because long-form case studies become unreadable;
- a CMS, because current authorship and deployment needs do not justify its
  operational cost.

**Revisit when:** Non-developers need to publish, drafts require hosted preview,
or content must change independently of deployments.

### ADR-004: Validate authored content at runtime

**Decision:** Parse content through a runtime schema in addition to TypeScript.

**Reason:** MDX frontmatter and filesystem assets are runtime input. Failing the
build with precise errors is safer than allowing partially broken pages.

**Revisit when:** Never remove boundary validation; only replace the schema
tool if ecosystem or bundle constraints justify it.

### ADR-005: Statically generate project routes

**Decision:** Use `generateStaticParams` and reject unknown dynamic params.

**Reason:** The project catalog is finite and deployment-controlled. Static
pages give predictable SEO, speed, and build-time failure for bad content.

**Revisit when:** Public content becomes personalized, changes more frequently
than deployments, or catalog size makes full static generation impractical.
Incremental revalidation would be the next step, not request-time rendering by
default.

### ADR-006: Avoid global client state

**Decision:** Keep menu, gallery, and active-section state local.

**Reason:** These interactions do not share durable application data. A store
would increase client JavaScript and indirection without solving a current
problem.

**Revisit when:** Multiple distant client islands must edit the same durable
state and URL or server state is not a better owner.

### ADR-007: Isolate Framer Motion

**Decision:** Feature code consumes motion primitives and tokens; route and
content modules do not import Framer Motion.

**Reason:** Animation is client-side and can spread hydration boundaries
quickly. Isolation keeps bundle cost visible, behavior consistent, and reduced
motion enforceable.

**Revisit when:** Native CSS covers all motion needs or another engine provides
a measured improvement. The feature API should survive the replacement.

### ADR-008: One home route plus project detail routes

**Decision:** Keep about, skills, and contact as anchored home sections.

**Reason:** This directly matches the requirements and supports fast scanning.
Separate pages would fragment a modest amount of content and add duplicate
navigation and metadata work.

**Revisit when:** A section gains enough unique depth and search intent to
justify a page, such as writing, a full project archive, or a detailed résumé.

### ADR-009: No artificial loading UI for local content

**Decision:** Do not add route loading boundaries initially.

**Reason:** Static local content resolves during build. A loading skeleton would
add complexity and can create more visual instability than it solves.

**Revisit when:** A route gains meaningful streamed or request-time data.

### ADR-010: Use Tailwind with semantic design tokens

**Decision:** Use the existing Tailwind CSS setup for composition while keeping
brand decisions in semantic CSS custom properties.

**Reason:** Utilities make responsive component styling local and predictable;
tokens prevent raw visual values from being repeated across features and give
the [design system](../design-system.md) a stable implementation target.

**Revisit when:** Measured maintainability problems show that a different
styling mechanism would improve the codebase. Do not change styling technology
only to accommodate a single unusual component.

### ADR-011: Import Lucide icons directly

**Decision:** Use named Lucide React imports at their call sites and avoid a
dynamic, string-keyed icon registry.

**Reason:** Direct imports are explicit and tree-shakeable. A generic runtime
registry can pull many unused icons into the client bundle and hides
accessibility intent.

**Revisit when:** Authored content genuinely needs to select icons by identifier;
in that case, use a small explicit allowlist rather than the entire package.

### ADR-012: Use bounded local media and system font stacks

**Decision:** Serve bounded AVIF display media through `next/image`, retain
high-resolution PNGs only for social sharing, and use native system font stacks
for the first release.

**Reason:** Repository screenshots were much larger than their rendered
dimensions, and external or bundled web fonts provided less value than the
measured loading cost. Bounded display assets, accurate responsive `sizes`, and
system fonts keep the visual presentation while producing predictable static
loads and avoiding font-related layout or network delay.

**Revisit when:** A font or media change has a defined visual purpose and passes
the documented Lighthouse, layout-shift, and client-bundle budgets.

### ADR-013: Make accessibility and performance executable release contracts

**Decision:** Enforce route-level axe checks, keyboard journeys, reflow and
reduced-motion behavior, client JavaScript limits, and Lighthouse budgets in
repeatable test commands.

**Reason:** Design and architecture documentation alone cannot prevent
regressions. Executable budgets make the intended experience reviewable and
fail the release when measurable guarantees are lost.

**Revisit when:** Routes or interaction patterns expand. Extend the covered
representative pages and journeys before relaxing a threshold.

### ADR-014: Deploy one verified static release to Vercel

**Decision:** Use Vercel as the production host, keep
`https://portfolio-omega-six-23.vercel.app` as the canonical origin, and deploy
only after the clean-install release gate passes.

**Reason:** The Next.js application and local content pipeline require no
runtime data service. Vercel provides an appropriate build and immutable
deployment history, while one stable origin prevents duplicate canonical,
sitemap, Open Graph, and structured-data URLs.

**Revisit when:** A custom domain is approved, hosting constraints change, or
the portfolio gains runtime services. Update site metadata and verify redirects
before promoting a new canonical origin.

## Change rules

Architecture is meant to evolve, but changes should be intentional:

1. Describe the new requirement or measured problem.
2. Identify the current boundary that cannot support it.
3. Record the chosen change, rejected alternatives, and migration impact here.
4. Update folder, data-flow, routing, or quality documents in the same change.
5. Avoid compatibility abstractions for hypothetical future systems.

## Likely evolution path

```text
local static portfolio
  ├─► more projects ──► /projects index and URL-based filters
  ├─► nontechnical publishing ──► CMS adapter behind lib/content
  ├─► contact form ──► validated route handler + abuse protection
  ├─► writing ──► /writing and /writing/[slug] using the same content pattern
  └─► richer media ──► lazy media components with retained server-first pages
```

Each branch is independent. Adding one does not justify adopting all of the
others.
