# First Release Review

## Scope

The first release was reviewed against Milestone 14 of the implementation
roadmap. The review covers public routes, reusable components, content, links,
assets, metadata, accessibility, performance, and deployment readiness.

## Route accounting

| Route                      | Source                     | Content source              | Status   |
| -------------------------- | -------------------------- | --------------------------- | -------- |
| `/`                        | `app/(site)/page.tsx`      | Home page model             | Included |
| `/projects/nova-ecommerce` | Generated project route    | Nova MDX                    | Included |
| `/projects/wheres-waldo`   | Generated project route    | Where’s Waldo MDX           | Included |
| `/projects/blacktape`      | Generated project route    | Blacktape MDX               | Included |
| `/projects/iphone-15-pro`  | Generated project route    | iPhone MDX                  | Included |
| `/projects/[unknown]`      | Project not-found boundary | Shared not-found copy       | Included |
| `/robots.txt`              | `app/robots.ts`            | Site metadata               | Included |
| `/sitemap.xml`             | `app/sitemap.ts`           | Published project selectors | Included |

Project detail routes are generated only for published records. The dedicated
`/projects/not-found` route exists solely as the fallback destination required
to preserve a real 404 response for unknown static parameters.

## Component accounting

Every implemented component in the closed first-release inventory has a source
under `components/` or `features/` and is exercised through component,
integration, or end-to-end coverage. `MotionProvider` remains intentionally
omitted under its documented contract because local motion primitives already
honor reduced-motion preferences without a global provider. Optional content
renders conditionally: the testimonial section is absent because the validated
testimonial collection is empty.

No component imports raw portfolio records. Routes obtain validated page models
from `lib/content`, and feature components receive those models through props.

## Content and copy review

- Four audited projects are published and use one shared case-study template.
- Project claims, technologies, links, and engineering details remain limited
  to evidence from the completed repository audit.
- Sections without audit evidence state that limitation instead of inventing a
  retrospective.
- The user-confirmed Nova live demo is retained at `https://kenzkids.com/`.
- Nova's repository and live demo were both rechecked after the repository was
  made public.
- Testimonials remain empty rather than publishing invented endorsements.
- Navigation, social links, contact information, site metadata, canonical
  paths, and media are supplied by the validated content layer.
- No starter copy, placeholder image, placeholder URL, or placeholder metadata
  is part of the production experience.

## Verification coverage

The release suite verifies home navigation, all published project pages,
external-action attributes, previous/all/next navigation, branded not-found
behavior, discovery endpoints, rendered local media, and internal link
destinations. The static link checker additionally validates local Markdown
targets and local asset references before the application starts.

Performance budgets, current Lighthouse results, and client-bundle limits are
recorded in `performance-budget.md`. Accessibility routes, keyboard journeys,
reflow, forced colors, reduced motion, and remaining manual recommendations are
recorded in `accessibility-review.md`.

## Verified release results

The 2026-07-26 clean-install release gate produced:

- 114 passing unit, integration, content, and component tests;
- 57 passing Playwright tests, including seven release-verification checks;
- 100 Lighthouse scores for performance, accessibility, best practices, and
  SEO across both runs of the homepage and Nova case study;
- LCP between 1.364 and 1.559 seconds, CLS of 0, and TBT between 3 and 11
  milliseconds;
- 70,803-byte largest, 132,076-byte shared-root, and 245,668-byte aggregate
  gzip client bundles, all within their budgets;
- successful checks for 75 documentation files, 16 local asset references, and
  11 authored external URLs.

LinkedIn returned its known bot-blocking status rather than a missing-resource
status; the browser-facing profile URL remains valid. Every project repository
and live demo, including the newly public Nova repository, returned HTTP 200
during the release check.

The Vercel source boundary excludes the local `PortfolioProjects` audit
repositories, installed dependencies, generated reports, documentation, and
tests. Those files remain local or in Git as appropriate and are not part of
the production upload.
