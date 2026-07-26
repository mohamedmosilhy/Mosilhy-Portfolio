# Tooling Foundation

## Supported runtime

The portfolio uses:

- Node.js 24.x;
- pnpm 11.x;
- the exact package-manager release declared in `package.json`.

`.nvmrc`, `package.json#engines`, and `package.json#packageManager` are the
authoritative version declarations. Install dependencies with:

```sh
pnpm install --frozen-lockfile
```

The lockfile is committed. Do not use npm or Yarn in this repository and do not
commit another package-manager lockfile.

`pnpm-workspace.yaml#overrides` temporarily lifts Next.js transitive `postcss`
and `sharp` packages to their patched releases. The overrides address
published security advisories while the compatible Next.js ranges lag those
releases. Keep them only until a verified Next.js update resolves to patched
versions without overrides.

## Quality commands

| Command                 | Responsibility                                              |
| ----------------------- | ----------------------------------------------------------- |
| `pnpm format`           | Format supported repository files and sort Tailwind classes |
| `pnpm format:check`     | Check formatting without writing                            |
| `pnpm typecheck`        | Run strict TypeScript checking without emitting files       |
| `pnpm lint`             | Run the Next.js ESLint configuration                        |
| `pnpm audit:prod`       | Check production packages against published advisories      |
| `pnpm validate:content` | Run the content-validation test target                      |
| `pnpm test:unit`        | Run Vitest unit and integration tests                       |
| `pnpm test:e2e`         | Run Playwright end-to-end tests                             |
| `pnpm test:coverage`    | Run Vitest with V8 coverage                                 |
| `pnpm build`            | Produce the optimized Next.js build                         |
| `pnpm check`            | Run formatting, types, lint, content, and test gates        |

The empty-suite allowance applied only during the tooling milestone.
`validate:content` now runs the schema-boundary and cross-record validation
tests introduced with the content model. Feature and end-to-end suites must
likewise become non-empty when their corresponding milestones introduce
behavior.

Playwright browser binaries are installed when the first end-to-end test is
introduced. The runner and project configuration are already present.

## shadcn/ui foundation

`components.json` configures shadcn/ui for:

- the existing root-level Next.js App Router;
- React Server Components and TypeScript;
- Tailwind CSS v4 through `app/globals.css`;
- CSS-variable theming;
- the `new-york` component style;
- Lucide icons;
- the repository's `@/*` aliases;
- generated primitives under `components/ui`;
- the owned `cn` utility at `lib/utils/cn.ts`.

Run `pnpm ui:check` to verify that the CLI resolves the framework, Tailwind
entry point, aliases, and component destination. No shadcn component is
installed in Milestone 1. Components are added only when their inventory item
is implemented, then restyled against the portfolio design system and recorded
in the provenance register.

## Dependency responsibilities

- `framer-motion` is the approved motion runtime and remains isolated behind
  the future motion layer.
- `lucide-react` supplies directly imported interface icons.
- `@mdx-js/mdx`, Unified/Remark utilities, and `gray-matter` support controlled
  project case-study parsing.
- `zod` validates authored runtime content.
- `class-variance-authority`, `clsx`, and `tailwind-merge` support locally owned
  shadcn-derived primitives without introducing another styling system.
- Vitest, Testing Library, jsdom, and V8 coverage support unit, integration,
  component, and content tests.
- Playwright supports end-to-end visitor journeys.
- Prettier and `prettier-plugin-tailwindcss` provide deterministic formatting
  and Tailwind v4 class ordering.

These packages establish capability only. They do not authorize UI,
design-token, content-schema, or feature work from later milestones.
