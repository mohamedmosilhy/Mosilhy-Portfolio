# Mohamed Mosilhy Portfolio

A content-driven portfolio for Mohamed Mosilhy, built with the Next.js App
Router. The site presents selected full-stack and frontend projects as
statically generated case studies, alongside skills, background, and contact
information.

Production: <https://portfolio-omega-six-23.vercel.app>

## Architecture

The application keeps presentation and authored content separate:

- `app/` owns routing, metadata, and the public layout;
- `components/` contains generic UI, layout, motion, and metadata primitives;
- `features/` contains home and project presentation components;
- `content/` stores structured TypeScript records and project MDX;
- `lib/content/` validates content and builds page models for the UI;
- `lib/metadata/` derives metadata and structured data from those models;
- `types/` defines normalized public content contracts;
- `tests/` covers schemas, components, routes, accessibility, and visitor
  journeys.

Server Components are the default. Client boundaries are limited to navigation
state, viewport observation, galleries, and motion. Portfolio copy is consumed
through validated page models rather than hardcoded in components.

See [the architecture documentation](docs/architecture/README.md) and
[decision log](docs/architecture/08-decision-log-and-evolution.md) for the
complete rationale.

## Requirements

- Node.js 24.x
- pnpm 11.x

The exact package manager is declared in `package.json`. Install dependencies
with:

```sh
pnpm install --frozen-lockfile
```

## Local development

```sh
pnpm dev
```

Open <http://localhost:3000>.

## Content

Short structured content lives in TypeScript modules under `content/`. Each
project case study is an MDX file under `content/projects/` with validated
frontmatter and an approved set of MDX components.

Before publishing content changes, run:

```sh
pnpm validate:content
pnpm check:links
```

The content pipeline rejects invalid relationships, duplicate identifiers,
unknown technologies, unpublished references, unsafe URLs, missing local
assets, and unsupported MDX structure.

## Quality gates

| Command                 | Purpose                                               |
| ----------------------- | ----------------------------------------------------- |
| `pnpm format:check`     | Verify formatting and Tailwind class order            |
| `pnpm typecheck`        | Run strict TypeScript checks                          |
| `pnpm lint`             | Run ESLint                                            |
| `pnpm validate:content` | Validate authored content and project sources         |
| `pnpm check:links`      | Verify local documentation links and asset references |
| `pnpm test:unit`        | Run unit, integration, and component tests            |
| `pnpm test:e2e`         | Run Playwright visitor journeys                       |
| `pnpm test:a11y`        | Run route-level axe and accessibility checks          |
| `pnpm build`            | Create the optimized production build                 |
| `pnpm check:bundle`     | Enforce client JavaScript budgets                     |
| `pnpm audit:lighthouse` | Enforce performance and accessibility budgets         |
| `pnpm check`            | Run the standard local quality suite                  |

Performance targets and test conditions are documented in
[the performance budget](docs/performance-budget.md). Accessibility review
results are recorded in [the accessibility review](docs/accessibility-review.md).

## Deployment

The production site is hosted on Vercel. Releases are built from the committed
lockfile and must pass the full release gate before deployment. Follow
[the deployment checklist](docs/deployment-checklist.md) for preflight,
production verification, and rollback steps.

## Documentation

Start at [the documentation index](docs/README.md). It links the product,
architecture, design system, content model, animation policy, component
inventory, implementation roadmap, audit, performance, accessibility, and
release records.
