# Content Strategy

## Authoring model

Content is repository-managed and reviewed with code. This is the simplest
operational model for a developer portfolio: it has no service dependency,
versioning comes from Git, and all pages can be statically generated.

Use two content formats:

- TypeScript modules for short, highly structured content such as profile,
  skills, contact methods, and testimonials.
- MDX for projects, because case studies combine validated metadata with
  long-form prose and controlled rich media.

The split is based on content shape, not convenience. Writing multi-section
case studies as large TypeScript string fields would be hard to edit, while
putting small skill arrays in MDX would weaken type safety.

Future conventional content pages may reuse the validated frontmatter plus MDX
pattern under `content/pages`. They expose stable IDs, canonical paths,
lifecycle dates, and SEO fields, but do not choose templates or arbitrary
components. This keeps additions such as a Uses or Colophon page data-driven
without turning content into executable UI configuration.

Short-form modules have focused contracts:

- `profile.ts` is the canonical source for name, greeting, role statement,
  introduction, biography, experience, interests, email, and calls to action.
  Hero, about, contact, footer, and person metadata select from this shared
  source instead of copying values.
- `social-links.ts` is the canonical ordered set of public contact and social
  destinations used by the hero, contact section, footer, and site metadata.
- `skills.ts` exports ordered groups restricted to `frontend`, `backend`,
  `database`, and `tools`, with each skill represented once.
- `testimonials.ts` exports ordered entries containing quote, person, position,
  company, and a typed image asset.

These modules use `satisfies` against their content contracts so authors keep
literal inference while receiving compile-time feedback. The content loader
still performs cross-record rules, such as unique IDs and valid asset paths.

## Project file contract

Each `content/projects/<slug>.mdx` file contains frontmatter and a case-study
body. A representative contract is:

```yaml
---
title: Messaging App
slug: messaging-app
summary: Concise card and metadata description.
role: Full-stack developer
status: published
featured: true
featuredOrder: 1
projectOrder: 1
timeline:
  startedAt: "2025-01"
  completedAt: "2025-03"
  updatedAt: "2025-03-20"
technologies:
  - next-js
  - postgresql
links:
  github: https://github.com/example/repository
  live: https://example.com
cover:
  kind: image
  src: /images/projects/messaging-app/cover.webp
  alt: Messaging application inbox view
  width: 1600
  height: 1000
gallery:
  layout: stack
  items:
    - kind: image
      src: /images/projects/messaging-app/inbox.webp
      alt: Inbox with conversation list
      width: 1600
      height: 1000
seo:
  title: Messaging App Case Study
  description: A focused search description.
---
```

The body uses a required heading and block contract:

```md
## Overview

Overview narrative.

<ProjectGallery />

## Features

Feature narrative.

## Architecture

Architecture narrative.

<ProjectTechnologies />

## Challenges

Challenge narrative.

## Lessons learned

Lessons narrative.

<ProjectActions />
```

`ProjectGallery`, `ProjectTechnologies`, and `ProjectActions` are allowlisted
MDX blocks supplied by the case-study renderer. They take their data from
validated frontmatter and accept no author-defined project data. Authors do not
import these components. The blocks make the required interleaving explicit
without splitting one case study across many files or parsing rendered HTML.

The route-level case-study composition renders `ProjectHero`, then the validated
MDX document, then previous/all/next project navigation. The MDX body owns
narrative copy and the positions of the three controlled data blocks.

The resulting case-study composition preserves the required order:

```text
ProjectHero
Overview (MDX)
Gallery
Features (MDX)
Architecture (MDX)
Technologies
Challenges (MDX)
Lessons learned (MDX)
External actions: GitHub and Live Demo
Project navigation: Previous / All Projects / Next
```

Validation inspects the Markdown syntax tree before compilation and requires
these headings and blocks exactly once in the documented order. Authors do not
control the surrounding page shell, block implementation, or project
navigation.

If a future case study needs a special rich block, expose a small MDX component
allowlist such as `Callout` or `Metric`. Arbitrary imports from content are not
allowed because they couple writing to implementation and enlarge the client
bundle unpredictably.

## Validation and normalization

A runtime schema validates every content source during development and build.
Zod is the recommended schema library when implementation begins; it is not
currently installed and should be added only with the content layer.

Validation rules include:

- slug matches the filename and `^[a-z0-9]+(?:-[a-z0-9]+)*$`;
- title, summary, alt text, and SEO description are non-empty and length-bound;
- project and featured ordering values are unique where applicable;
- URLs use approved protocols;
- published projects include a GitHub destination, while live demos, videos,
  and papers are optional evidence;
- supplied cover and gallery dimensions are positive;
- published projects include the required case-study headings;
- published project slugs are unique;
- featured projects are also published;
- referenced local asset paths exist;
- dates are valid and completion is not earlier than start.

The loader normalizes data into:

```ts
type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  technologies: readonly Skill[];
  cover: ImageAsset;
  links: ProjectLinks;
};

type ProjectDetail = ProjectSummary & {
  role: string;
  gallery: ProjectGallery;
  body: CompiledMdx;
  seo: SeoFields;
  timeline: ProjectTimeline;
};
```

Exact implementation types may evolve, but summary and detail models should
remain separate so the home page never receives compiled case-study bodies.
The complete authoritative interfaces and validation relationships live in
[`../content-model.md`](../content-model.md).

## Content access API

Only `lib/content` reads the content directory. Its intended public API is:

```ts
getHomePageModel(): Promise<HomePageModel>
getProjectPageModel(slug: string): Promise<ProjectPageModel | null>
getAllProjectSummaries(): Promise<readonly ProjectSummary[]>
getFeaturedProjects(): Promise<readonly ProjectSummary[]>
getProjectBySlug(slug: string): Promise<ProjectDetail | null>
getProjectSlugs(): Promise<readonly string[]>
getAdjacentProjects(slug: string): Promise<{
  previous: ProjectSummary | null;
  next: ProjectSummary | null;
}>
```

These functions are server-only, cache deterministic work, return immutable
models, and use one internal parsed catalog per build where possible. Callers
do not know whether the future backend is files or a CMS.

Adjacency follows `projectOrder` without wrapping. The first and last project
therefore have one missing neighbor. `All Projects` is not returned by the
content layer because its destination is the stable route `/#projects`.

## Publishing workflow

To add a project:

1. Create `content/projects/<slug>.mdx`.
2. Add optimized images under `public/images/projects/<slug>/`.
3. Fill all required frontmatter and narrative sections.
4. Use `status: draft` while incomplete.
5. Run content validation and the production build.
6. Change to `status: published`.

No route, navigation, sitemap, or component edit should be necessary. Published
projects automatically enter static params and the sitemap. Featured projects
enter the home selector according to `featuredOrder`.

## Media strategy

- Use stable, descriptive file names and keep project assets grouped by slug.
- Store intrinsic width and height in content to prevent layout shift.
- Require meaningful alt text for informative media; explicitly empty alt text
  is allowed only for decorative media.
- Prefer AVIF or WebP for screenshots after checking visual quality.
- Use `next/image` for responsive sizing and optimization.
- Do not use unbounded remote image hosts. A future CMS must add explicit
  `remotePatterns` and preserve the same `ImageAsset` contract.
- Videos should use poster images, avoid autoplay with sound, and load only
  when they are near the viewport or deliberately opened.

## Future CMS migration

A CMS is justified when a non-developer must publish, preview workflows become
important, or content updates must be independent of deployment. Migration
changes the implementation inside `lib/content`, not component props or route
shape.

The CMS adapter must map its response into the existing domain models and run
the same runtime validation. Preview/draft queries remain separate from public,
cached queries.
