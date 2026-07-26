# Performance Budget

## Purpose

Milestone 12 establishes repeatable media, JavaScript, and lab-performance
budgets. The budgets are regression guards, not substitutes for production
field data.

## Media policy

- UI media uses `next/image` with authored intrinsic dimensions and
  layout-specific `sizes`.
- Project display images use AVIF and are bounded to 1600 pixels on their
  longest edge. Smaller source captures are not upscaled.
- PNG project covers are retained only as explicit social-sharing images,
  where crawler format support is broader than AVIF support.
- Only the project-detail cover uses eager, high-priority loading because it is
  the likely image LCP on that route. It uses synchronous decode after its
  high-priority fetch so the already-small responsive image is presented
  without idle scheduling.
- Homepage project covers, the profile portrait, testimonials, and project
  galleries use native lazy loading.
- Videos preload metadata only.
- Motion-enhanced regions remain paintable while viewport choreography
  initializes; movement must never hide or delay an LCP candidate.
- Hero groups and the project article intentionally avoid entrance transforms
  because LCP waits for a candidate's transform animation to settle.
- Typography uses system-resident serif, sans, and mono stacks. The route sends
  no font requests, leaving first-visit bandwidth and render time for content
  and the likely project LCP image.
- Links opt out of automatic viewport prefetching. This small static portfolio
  does not spend first-load bandwidth on speculative RSC requests; navigation
  remains client-side when a visitor actually activates a link.

The project display assets total approximately 824 KB in source control,
reduced from approximately 12 MB of PNG source media. Next.js still performs
request-specific sizing and format negotiation at delivery time.

## JavaScript budgets

`pnpm check:bundle` evaluates gzip-compressed production chunks after
`pnpm build`.

| Measurement                           | Budget |
| ------------------------------------- | -----: |
| Largest individual client chunk       |  75 KB |
| Shared root client chunks             | 145 KB |
| All generated route chunks, aggregate | 260 KB |

The aggregate is intentionally stricter than treating every route separately;
it catches an unexpected dependency even when route splitting hides its impact
from a single-page measurement. Hashes are not used as identifiers, so the
check remains stable across builds.

For visual module tracing, run `pnpm analyze:bundle`. It uses the Turbopack
analyzer built into Next.js and writes its ignored report under
`.next/diagnostics/analyze`.

## Lighthouse and Core Web Vitals

Run a production build, then `pnpm audit:lighthouse`. The configuration checks
the homepage and the media-heavy Nova case study with a representative mobile
viewport and simulated mobile throttling.

The lab network profile models a mid-tier 4G connection at 100 ms RTT and
4 Mbps throughput with a 4× CPU slowdown. These values are committed alongside
the thresholds so future runs compare the same environment rather than an
unstated machine default.

The runner reuses Playwright's pinned Chromium binary, which keeps local and CI
browser versions aligned without requiring an unrelated system Chrome install.

Required lab thresholds:

- Lighthouse performance: at least 95;
- Largest Contentful Paint: at most 2.5 seconds;
- Cumulative Layout Shift: at most 0.1;
- Total Blocking Time: at most 200 milliseconds.

LCP and CLS use the current “good” Core Web Vitals thresholds. Total Blocking
Time is the available lab proxy for interaction responsiveness; field INP
cannot be proven by a local Lighthouse run and should be monitored after real
traffic exists.

## Build tracing

Content discovery stays scoped to `content/projects`. Asset validation resolves
only content-referenced paths under `public`, and its known-safe filesystem
reads are excluded from Turbopack's static tracing. This prevents the production
trace from pulling the entire repository into route output while keeping
content validation active during the build.
