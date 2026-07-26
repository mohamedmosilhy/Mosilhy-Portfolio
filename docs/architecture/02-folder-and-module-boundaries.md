# Folder and Module Boundaries

## Proposed target structure

The repository already uses a root-level `app` directory. Keeping that
convention avoids a low-value move to `src` and preserves simple absolute
imports through the existing `@/*` alias.

```text
.
├── app/
│   ├── (site)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── projects/
│   │       └── [slug]/
│   │           ├── page.tsx
│   │           ├── loading.tsx            # only if streaming later adds value
│   │           └── not-found.tsx
│   ├── api/
│   │   └── contact/route.ts                # reserved; add only with a contact form
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── container.tsx
│   │   ├── main-navigation.tsx
│   │   ├── mobile-navigation.tsx
│   │   ├── site-footer.tsx
│   │   ├── section.tsx
│   │   └── site-header.tsx
│   ├── motion/
│   │   ├── motion-provider.tsx
│   │   ├── page-entrance.tsx
│   │   ├── reveal.tsx
│   │   ├── stagger.tsx
│   │   ├── stagger-item.tsx
│   │   └── reduced-motion.ts
│   └── ui/
│       ├── button.tsx
│       ├── divider.tsx
│       ├── external-link.tsx
│       ├── icon-link.tsx
│       ├── media-frame.tsx
│       ├── prose.tsx
│       ├── section-heading.tsx
│       ├── skip-link.tsx
│       └── tag.tsx
├── content/
│   ├── projects/
│   │   ├── messaging-app.mdx
│   │   ├── restaurant.mdx
│   │   └── blog-api.mdx
│   ├── navigation.ts
│   ├── profile.ts
│   ├── site-metadata.ts
│   ├── skills.ts
│   ├── social-links.ts
│   └── testimonials.ts
├── features/
│   ├── home/
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── skill-group.tsx
│   │   ├── skills-section.tsx
│   │   ├── social-links.tsx
│   │   ├── testimonial-card.tsx
│   │   └── testimonials-section.tsx
│   └── projects/
│       ├── components/
│       │   ├── callout.tsx
│       │   ├── metric.tsx
│       │   ├── mdx-components.tsx
│       │   ├── project-actions.tsx
│       │   ├── project-card.tsx
│       │   ├── project-gallery.tsx
│       │   ├── project-hero.tsx
│       │   ├── project-navigation.tsx
│       │   └── project-technologies.tsx
│       ├── project-case-study.tsx
│       └── projects-section.tsx
├── lib/
│   ├── content/
│   │   ├── content-schemas.ts
│   │   ├── content-validation.ts
│   │   ├── project-schema.ts
│   │   ├── projects.ts
│   │   └── site-content.ts
│   ├── metadata/
│   │   ├── create-metadata.ts
│   │   ├── structured-data-component.tsx
│   │   └── structured-data.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   └── urls.ts
│   └── env.ts
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/<slug>/
│   │   └── testimonials/
│   ├── resume/
│   └── social/
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── unit/
├── types/
│   ├── content.ts
│   └── navigation.ts
└── docs/
```

This is a target map, not a request to create empty placeholder files. Files
and directories should be introduced as their features are implemented.

## Directory responsibilities

### `app`

Owns URL structure and framework conventions: layouts, pages, metadata files,
error boundaries, and route handlers. Page files fetch page-level data and
compose feature modules. They should not contain reusable section
implementations or raw content.

The `(site)` route group provides a shared public-site shell without adding a
URL segment. The root layout remains responsible for the document, fonts,
global metadata defaults, and root providers. The site layout owns header,
main, and footer composition.

### `features`

Owns components and behavior that use portfolio domain language. Features may
compose generic components and may have private subcomponents. A feature should
expose a small public surface, normally its route-level section or case-study
composition.

Home-only sections live under `features/home`. Project summaries and detail
views share the project domain, so they live together under
`features/projects`.

### `components/ui`

Owns reusable, domain-agnostic primitives. These components expose semantic,
accessible APIs and design variants. They cannot fetch content or know about a
specific page section.

Lucide icons should be imported by name in the component that uses them rather
than selected from a runtime icon map. Direct imports preserve tree-shaking.
Decorative icons are hidden from assistive technology; meaningful icon-only
controls receive their accessible name from the owning component.

### `components/layout`

Owns stable site chrome and layout primitives. Header and footer are shared
composition, while `Container` and `Section` express layout constraints that
will later be backed by design-system tokens.

### `components/motion`

Owns all reusable client-side motion boundaries. Feature components consume
meaningful abstractions such as `Reveal` or `Stagger`; they should not invent
timings and easing on every use.

### `content`

Owns author-written facts and prose. It contains no loaders, validation logic,
or rendering logic. Media paths referenced by content resolve to stable assets
under `public/images`.

### `lib`

Owns non-visual application services and focused utilities. The content layer
reads and validates authored content. Metadata helpers produce consistent SEO
objects. Generic helpers should remain small; a catch-all `helpers.ts` is not
allowed.

### `types`

Owns types shared across multiple architectural layers. Types private to one
module stay next to that module. This prevents `types` from becoming a dumping
ground.

### `tests`

Mirrors testing scope rather than production folder structure. Unit tests
cover pure schemas and selectors, integration tests cover content-to-page
contracts, and end-to-end tests cover visitor journeys.

## Styling boundary

Tailwind CSS is the styling mechanism already present in the repository. The
[design system](../design-system.md) defines semantic CSS custom properties for
color, type, spacing, radii, shadows, and motion; Tailwind utilities will
consume those tokens.

`app/globals.css` is limited to Tailwind imports, token definitions, reset/base
rules, document defaults, reduced-motion defaults, and genuinely global
utilities. Feature-specific styles stay with their components. Repeated class
sets become component variants or layout primitives, not a growing collection
of global class names.

Dark is the primary theme, so default tokens represent the dark experience.
Do not initially add theme-switching scripts or duplicate light-theme tokens
that the requirements do not call for.

## Naming and export rules

- Use kebab-case filenames and PascalCase component names.
- Give section components a `Section` suffix and route compositions a clear
  domain name such as `ProjectCaseStudy`.
- Prefer named exports for reusable modules. Next.js framework entry points use
  the required default exports.
- Avoid global barrel files. A feature may expose a local `index.ts` only when
  it is intentionally defining a small public API.
- Use `@/` absolute imports across top-level directories and relative imports
  within a small local component group.
- Add `"server-only"` to filesystem content loaders so accidental client
  imports fail early.
