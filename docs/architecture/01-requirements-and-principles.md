# Requirements and Principles

## Requirements analysis

The requirements describe two distinct experiences:

1. A single-page home experience that quickly communicates identity, proof of
   work, skills, social proof, background, and contact options.
2. Deep project case studies that explain process and engineering decisions,
   not only screenshots.

The audiences have different reading patterns. Recruiters and hiring managers
need rapid scanning and direct contact paths; clients need outcomes and trust;
developers may explore implementation detail. The architecture therefore must
support both concise project summaries and long-form case-study content without
duplicating project metadata.

## Requirement-to-architecture mapping

| Requirement                   | Architectural response                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| Home sections                 | One `/` route composed from isolated home feature sections             |
| Dynamic project pages         | Static dynamic segment at `/projects/[slug]`                           |
| Easy to add projects          | One validated MDX file per project; route code stays unchanged         |
| Detailed case studies         | Structured frontmatter plus long-form MDX body                         |
| Reusable components           | Three levels: generic UI, shared layout, feature sections              |
| Type-safe                     | Strict TypeScript plus runtime validation at the content boundary      |
| No duplicated code            | Project metadata has one canonical source and shared selectors         |
| SEO optimized                 | Static rendering, route metadata, sitemap, robots, and structured data |
| Fast loading / 95+ Lighthouse | Server Components, optimized assets, small client islands, budgets     |
| Accessible / 95+              | Semantic landmarks, keyboard support, focus management, reduced motion |
| Smooth animations             | Central motion tokens and client-only motion wrappers                  |
| Dark primary theme            | Design tokens applied at the root; theme behavior remains independent  |
| Responsive / mobile-first     | Layout primitives and component-owned responsive behavior              |

## Architectural principles

### 1. Server first

Every route and component is a Server Component unless it needs browser state,
an event handler, or a browser API. This minimizes JavaScript sent to visitors
and supports the loading and Lighthouse goals.

`"use client"` is a leaf-level decision, not a page-level default. A server
section may render a small client component such as a mobile menu, active
section observer, gallery controller, or animated reveal.

### 2. Static by default

Portfolio content changes at deployment time, not per request. Home and project
routes should therefore be pre-rendered. Static output improves reliability,
SEO, and response time while avoiding a runtime database or CMS dependency.

Dynamic rendering must be introduced only for a feature that truly needs
request-time data, such as a protected preview or server-backed contact form.

### 3. Content is data, not markup embedded in routes

Routes should not contain names, skills, project arrays, links, or case-study
copy. Content lives in `/content` and is accessed through `/lib/content`. This
keeps the UI replaceable and makes completeness validation possible.

### 4. Features own domain-specific composition

A `ProjectCard` understands the project domain and belongs to the projects
feature. A `Button` does not understand projects and belongs to generic UI.
This distinction prevents a flat, ambiguous component directory.

### 5. Progressive enhancement

Core reading, navigation, external links, and case-study content must work
without animation or client hydration. Motion and enhanced navigation decorate
an already functional document.

### 6. Validate at boundaries

TypeScript cannot prove that authored frontmatter, environment variables, or
external data is valid at runtime. Those inputs are parsed once at their
boundary. Components receive normalized, trustworthy domain objects and should
not repeatedly guard against malformed content.

### 7. Optimize for the next likely change

The expected growth areas are new projects, new case-study media, section
reordering, and richer animations. The architecture makes those inexpensive.
It does not introduce a CMS, global state library, monorepo, or API layer before
a concrete requirement justifies them.

## Explicit non-goals

This architecture document does not itself define visual values; those now live
in [`../design-principles.md`](../design-principles.md) and
[`../design-system.md`](../design-system.md). This documentation phase does not
implement:

- components or page UI;
- a contact submission backend;
- analytics;
- authentication;
- preview tooling;
- a CMS;
- theme switching.

The architecture leaves extension points for those features without treating
them as current requirements.
