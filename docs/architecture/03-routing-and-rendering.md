# Routing and Rendering

## Route map

| URL                  | App Router file                       | Rendering              | Purpose                   |
| -------------------- | ------------------------------------- | ---------------------- | ------------------------- |
| `/`                  | `app/(site)/page.tsx`                 | Static                 | Full home narrative       |
| `/projects/[slug]`   | `app/(site)/projects/[slug]/page.tsx` | Static per project     | Detailed case study       |
| unknown route        | `app/not-found.tsx`                   | Static                 | Branded recovery path     |
| unknown project slug | project `not-found.tsx`               | Static                 | Project-specific recovery |
| `/sitemap.xml`       | `app/sitemap.ts`                      | Generated from content | Search discovery          |
| `/robots.txt`        | `app/robots.ts`                       | Static/generated       | Crawler policy            |

Only `/` and `/projects/[slug]` are product routes in the current
requirements. Separate `/about`, `/skills`, or `/contact` pages would duplicate
the home experience and are intentionally not planned.

## Home section navigation

The home sections use stable IDs:

```text
#projects
#skills
#about
#contact
```

The logo links to `/`. Navigation links use root-qualified fragments such as
`/#projects`, not only `#projects`, so the same header works from project pages.
The hero has no navigation ID requirement.

Smooth scrolling is CSS progressive enhancement. Active-section highlighting
uses a small client component with `IntersectionObserver`. The semantic links
remain normal anchors and work before hydration.

When navigating from a project page to a home fragment, the browser should land
on the target without route-specific imperative scrolling code. A sticky
header offset is handled with `scroll-margin-top` on sections.

## Project routing

`[slug]` is the canonical identifier from the project filename and validated
frontmatter. During the build:

1. The content catalog discovers and validates every project source.
2. `getProjectSlugs()` supplies every published slug to
   `generateStaticParams()`.
3. `dynamicParams = false` rejects slugs not known at build time.
4. The page calls `getProjectPageModel(slug)`.
5. A missing or unpublished project resolves through `notFound()`.

Static generation is appropriate because the project catalog is local and
changes only with a deployment. It also ensures a broken project fails CI
rather than failing for a visitor.

Slugs are permanent public IDs. If a slug must change after publication, add a
permanent redirect in `next.config.ts` to preserve external links and search
equity.

## Route responsibility

The home page should conceptually remain this small:

```tsx
export default async function HomePage() {
  const model = await getHomePageModel();

  return (
    <>
      <HeroSection profile={model.profile} socialLinks={model.socialLinks} />
      <ProjectsSection
        projects={model.featuredProjects}
        heading="Selected projects"
      />
      <SkillsSection groups={model.skillGroups} heading="Skills" />
      {model.testimonials.length > 0 ? (
        <TestimonialsSection
          testimonials={model.testimonials}
          heading="Testimonials"
        />
      ) : null}
      <AboutSection profile={model.profile} />
      <ContactSection
        heading="Contact"
        email={model.profile.email}
        socialLinks={model.socialLinks}
      />
    </>
  );
}
```

This is illustrative architecture, not UI implementation. The route owns
page-level fetching and order; feature modules own rendering.

The project page follows the same rule: resolve the project plus its previous
and next published neighbors, produce structured data, then pass the page model
into `ProjectCaseStudy`. The component also receives the stable all-projects
destination `/#projects`.

## Metadata

The root layout supplies title template, site description, metadata base,
icons, and default social-card settings. Routes override only route-specific
fields.

- Home metadata describes the developer and primary proposition.
- `generateMetadata` on the project route derives title, summary, canonical
  URL, social image, and publication/updated data from the same project model.
- JSON-LD uses `Person`/`WebSite` on home and `CreativeWork` or
  `SoftwareSourceCode` for case studies.
- JSON-LD serialization must escape unsafe characters and be emitted by a
  focused metadata helper, not assembled ad hoc in components.

Metadata must never require a separate content source; visible content and SEO
content would otherwise drift.

## Layouts and boundaries

The root layout contains:

- `<html lang="en">`;
- zero-request system font stacks defined in global styles;
- global styles;
- site-wide metadata defaults;
- only providers that every route genuinely needs.

The `(site)` layout contains header, main landmark, and footer. Keeping public
chrome out of the root leaves room for a future visual preview or special route
that should not inherit it.

Add route `loading.tsx` only if data becomes slow enough for streaming to be
visible. Local static content should not show an artificial loading state.
Add `error.tsx` only around a recoverable runtime boundary; build-time content
errors should fail the build.

## Future routes

- A project index at `/projects` should be added only when the catalog becomes
  too large for the home selection.
- Project filters belong in URL search parameters when they become shareable
  state.
- A contact route handler belongs at `/api/contact` only if the design later
  includes a form. Direct contact links require no API.
- Draft preview routes require explicit authentication and dynamic rendering;
  they must not change public route caching.
