# Content Model

## Purpose

This document is the authoritative content contract for the initial portfolio.
It defines authored data, runtime validation, relationships, and normalized
page models. It does not implement schemas or loaders.

Short structured content is authored in TypeScript with `satisfies`. Project
frontmatter and MDX syntax are runtime input and must be validated during
development and build. Zod is the planned validation library.

## Modeling rules

- All authored collections are readonly and explicitly ordered.
- Stable IDs use lower-case kebab-case and are not presentation labels.
- Dates use ISO-compatible strings and are normalized by the content layer.
- URLs are absolute except for internal route and local asset paths.
- Components receive normalized models; they do not receive raw frontmatter.
- Schema-derived types are preferred for runtime-authored values to prevent a
  TypeScript interface and validator from drifting.
- Text intended for metadata has explicit length constraints.
- Content models contain facts and presentation hints only where a real content
  need exists. They do not contain Tailwind classes, colors, animation values,
  or arbitrary component names.

## Shared types

```ts
type Slug = string;
type ISODate = string;
type AbsoluteUrl = string;
type InternalHref = `/${string}` | `/#${string}`;
type ExternalHref = `https://${string}` | `mailto:${string}`;

interface ImageAsset {
  readonly kind: "image";
  readonly src: `/${string}`;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
  readonly decorative?: boolean;
}

interface VideoAsset {
  readonly kind: "video";
  readonly src: `/${string}` | `https://${string}`;
  readonly poster: ImageAsset;
  readonly title: string;
  readonly caption?: string;
}

type MediaAsset = ImageAsset | VideoAsset;
```

`alt: ""` is permitted only when `decorative: true`; informative assets require
non-empty alt text. Project covers, gallery screenshots, profile images, and
testimonial photos are informative by default.

## Social links

```ts
type SocialPlatform = "github" | "linkedin" | "email" | "website";

interface SocialLink {
  readonly id: Slug;
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly href: ExternalHref;
  readonly newTab: boolean;
  readonly order: number;
}
```

Rules:

- `email` uses `mailto:` and does not open a new tab.
- GitHub and LinkedIn use HTTPS.
- IDs and order values are unique.
- The icon is resolved from a small application-owned mapping; content does not
  name arbitrary icon components.
- The required contact set includes email, GitHub, and LinkedIn.

## Navigation

```ts
type NavigationSectionId = "projects" | "skills" | "about" | "contact";

interface NavigationItem {
  readonly id: Slug;
  readonly label: string;
  readonly href: InternalHref;
  readonly sectionId?: NavigationSectionId;
  readonly order: number;
  readonly showInHeader: boolean;
  readonly showInFooter: boolean;
}
```

Rules:

- Home-section links use root-qualified fragments such as `/#projects`.
- `sectionId` must match the fragment for observable home sections.
- Labels are concise and unique within a navigation region.
- Header ordering is explicit and follows Projects, Skills, About, Contact
  unless product requirements change.

## Skills

```ts
type SkillCategory = "frontend" | "backend" | "database" | "tools";

type SkillId = Slug;

interface Skill {
  readonly id: SkillId;
  readonly name: string;
  readonly category: SkillCategory;
  readonly description?: string;
  readonly featured: boolean;
  readonly order: number;
}

interface SkillGroup {
  readonly id: SkillCategory;
  readonly label: string;
  readonly description?: string;
  readonly order: number;
  readonly skills: readonly Skill[];
}
```

Rules:

- A skill ID appears once in the global catalog.
- A project references skill IDs instead of repeating display names.
- Skills do not include percentage, star rating, years, or self-assigned level.
- Category order is frontend, backend, database, tools.
- Icons are optional implementation detail and are not stored in content.

## Testimonials

```ts
interface Testimonial {
  readonly id: Slug;
  readonly quote: string;
  readonly person: {
    readonly name: string;
    readonly position: string;
    readonly company: string;
    readonly photo: ImageAsset;
  };
  readonly projectSlug?: Slug;
  readonly featured: boolean;
  readonly order: number;
}
```

Rules:

- Quotes are stored verbatim with permission and are not embellished.
- Name, position, company, and informative photo alt text are required.
- `projectSlug`, when present, must resolve to a published project.
- IDs and order values are unique.
- Empty testimonial collections are allowed during development; the home
  composition omits the section rather than rendering invented social proof.

## Profile and about content

```ts
interface ExperienceSummary {
  readonly id: Slug;
  readonly label: string;
  readonly value: string;
  readonly order: number;
}

interface Interest {
  readonly id: Slug;
  readonly label: string;
  readonly description?: string;
  readonly order: number;
}

interface Profile {
  readonly greeting: string;
  readonly name: string;
  readonly role: string;
  readonly introduction: string;
  readonly biography: readonly string[];
  readonly experience: readonly ExperienceSummary[];
  readonly interests: readonly Interest[];
  readonly location?: string;
  readonly availability?: string;
  readonly portrait?: ImageAsset;
  readonly email: ExternalHref;
  readonly primaryCta: {
    readonly label: string;
    readonly href: InternalHref;
  };
  readonly secondaryCta: {
    readonly label: string;
    readonly href: InternalHref | ExternalHref;
  };
}
```

The profile is the canonical source for hero, about, contact, footer, and person
metadata. Consumers select fields; they do not copy strings into local modules.

## Project links and timeline

```ts
interface ProjectLinks {
  readonly github: AbsoluteUrl;
  readonly live: AbsoluteUrl;
}

interface ProjectTimeline {
  readonly startedAt: ISODate;
  readonly completedAt?: ISODate;
  readonly updatedAt: ISODate;
}
```

Published projects require both GitHub and live-demo links under the current
requirements. If a real project cannot expose one, revise the requirement and
schema explicitly rather than inserting a fake or empty URL.

## SEO fields

```ts
interface SeoFields {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath?: InternalHref;
  readonly socialImage?: ImageAsset;
  readonly noIndex?: boolean;
}
```

`noIndex` is permitted for drafts/previews only. Published public projects
cannot opt out of indexing without an explicit product decision.

## Conventional page content

Future content-led routes use a conventional page record instead of adding
page-specific fields to React components:

```ts
type PageStatus = "draft" | "published";

interface PageFrontmatter {
  readonly id: Slug;
  readonly path: InternalHref;
  readonly title: string;
  readonly summary: string;
  readonly status: PageStatus;
  readonly pageOrder?: number;
  readonly publishedAt?: ISODate;
  readonly updatedAt: ISODate;
  readonly seo: SeoFields;
}
```

The stable `id` is independent from the routable `path`, allowing a page to
move without changing references. A page body is authored separately as
constrained MDX and rendered through the standard prose surface. Content does
not select a React component, template name, Tailwind class, color, or motion
behavior.

This contract supports conventional pages such as Uses, Writing, Colophon, or
legal information without adding a one-off schema. A future page that requires
new application behavior is a product feature and still requires an explicit
architecture decision; arbitrary executable behavior is not modeled as
content.

Rules:

- IDs, paths, and authored `pageOrder` values are unique.
- Paths are root-relative canonical routes without query strings, fragments,
  or a trailing slash (except `/`).
- Published pages require `publishedAt` and cannot set `noIndex: true`.
- `updatedAt` is not earlier than `publishedAt`.
- `seo.canonicalPath`, when present, matches `path`.
- The record ID matches the source filename.

## Project content

```ts
type ProjectStatus = "draft" | "published";
type ProjectCategory =
  | "full-stack"
  | "frontend"
  | "backend"
  | "mobile"
  | "ai-data"
  | "creative-coding";
type GalleryLayout = "stack" | "grid" | "carousel";

interface ProjectFrontmatter {
  readonly slug: Slug;
  readonly title: string;
  readonly summary: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly featured: boolean;
  readonly featuredOrder?: number;
  readonly projectOrder: number;
  readonly timeline: ProjectTimeline;
  readonly technologies: readonly SkillId[];
  readonly links: ProjectLinks;
  readonly cover: ImageAsset;
  readonly gallery: {
    readonly layout: GalleryLayout;
    readonly items: readonly MediaAsset[];
  };
  readonly seo: SeoFields;
}

interface ProjectSummary {
  readonly slug: Slug;
  readonly title: string;
  readonly summary: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly technologies: readonly Skill[];
  readonly links: ProjectLinks;
  readonly cover: ImageAsset;
  readonly featured: boolean;
  readonly featuredOrder?: number;
  readonly projectOrder: number;
}

interface ProjectDetail extends ProjectSummary {
  readonly timeline: ProjectTimeline;
  readonly gallery: {
    readonly layout: GalleryLayout;
    readonly items: readonly MediaAsset[];
  };
  readonly seo: SeoFields;
  readonly body: CompiledMdx;
}
```

`CompiledMdx` is an internal server-only output type, not authored content and
not passed through a client boundary.

### MDX body contract

The Markdown syntax tree must contain this sequence exactly once:

```md
## Overview

<ProjectGallery />

## Features

## Architecture

<ProjectTechnologies />

## Challenges

## Lessons learned

<ProjectActions />
```

Narrative content appears below each heading. The allowlisted project blocks
receive their data from validated frontmatter and accept no author-supplied
project props. Imports, exports, scripts, arbitrary HTML, and unknown JSX
elements are rejected.

## Site metadata

```ts
interface SiteMetadata {
  readonly siteName: string;
  readonly shortName: string;
  readonly titleTemplate: string;
  readonly defaultTitle: string;
  readonly description: string;
  readonly siteUrl: AbsoluteUrl;
  readonly locale: "en";
  readonly authorName: string;
  readonly keywords: readonly string[];
  readonly defaultSocialImage: ImageAsset;
  readonly socialLinks: readonly SocialLink[];
}
```

Rules:

- `siteUrl` has no trailing slash and represents the production origin.
- `titleTemplate` contains one `%s` placeholder.
- Default title and description match visible home content.
- Social image uses an absolute URL after metadata normalization.
- Keywords are concise and truthful; they are not a substitute for useful copy.

## Composite page models

```ts
interface HomePageModel {
  readonly profile: Profile;
  readonly navigation: readonly NavigationItem[];
  readonly socialLinks: readonly SocialLink[];
  readonly projects: readonly ProjectSummary[];
  readonly skillGroups: readonly SkillGroup[];
  readonly testimonials: readonly Testimonial[];
  readonly metadata: SiteMetadata;
}

interface ProjectPageModel {
  readonly project: ProjectDetail;
  readonly previousProject: ProjectSummary | null;
  readonly nextProject: ProjectSummary | null;
  readonly navigation: readonly NavigationItem[];
  readonly metadata: SiteMetadata;
}
```

The home model excludes compiled case-study bodies. The project model resolves
technology references and both adjacency directions before rendering. Adjacency
does not wrap: the first project has no previous project, and the last project
has no next project. `All Projects` is a route constant (`/#projects`), not
authored project content.

## Runtime schema shape

The actual Zod implementation should use schema inference as the source for
runtime-authored types:

```ts
const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const absoluteUrlSchema = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"));

const imageAssetSchema = z
  .object({
    kind: z.literal("image"),
    src: z.string().startsWith("/"),
    alt: z.string(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    caption: z.string().trim().min(1).optional(),
    decorative: z.boolean().optional(),
  })
  .superRefine((asset, context) => {
    // Require empty alt only for decorative images and non-empty alt otherwise.
  });

const projectFrontmatterSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(80),
  summary: z.string().trim().min(40).max(180),
  role: z.string().trim().min(2).max(80),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  featuredOrder: z.number().int().positive().optional(),
  projectOrder: z.number().int().positive(),
  timeline: projectTimelineSchema,
  technologies: z.array(slugSchema).min(1),
  links: projectLinksSchema,
  cover: imageAssetSchema,
  gallery: projectGallerySchema,
  seo: seoFieldsSchema,
});

type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
```

The omitted referenced schemas follow the interfaces in this document. The
example is a contract, not implementation code.

`PageFrontmatter` follows the same strict-object, bounded-text, ISO-date, SEO,
and lifecycle validation conventions. Runtime objects reject unknown fields so
schema changes remain deliberate and versionable.

## Cross-record validation

Individual schema success is insufficient. The catalog validator also checks:

- all IDs, slugs, project orders, and relevant featured orders are unique;
- all conventional page IDs, paths, and authored page orders are unique;
- conventional page IDs match their source filenames;
- project frontmatter slug equals its filename;
- every project technology resolves to one skill;
- every testimonial project reference resolves;
- every published project contains required MDX headings and blocks in order;
- every referenced local media file exists and matches the declared kind;
- featured projects are published and have `featuredOrder`;
- non-featured projects omit `featuredOrder`;
- published project links use HTTPS and are not placeholders;
- completion date is not earlier than start date;
- updated date is not earlier than completion date;
- navigation fragments correspond to known section IDs;
- email, GitHub, and LinkedIn contact destinations exist.

Failures name the source file, field path, invalid value category, and expected
rule. Invalid published content fails the build; it is never silently omitted.
