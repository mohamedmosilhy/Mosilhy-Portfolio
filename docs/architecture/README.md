# Portfolio Architecture

## Status

This document defines the intended architecture before UI implementation. The
current starter files are not the target structure, and this documentation does
not authorize visual or feature implementation by itself.

The requirements in [`../portfolio-requirements.md`](../portfolio-requirements.md)
are the product source of truth. This architecture translates them into
technical boundaries that can grow without turning the portfolio into a large
application prematurely.

## Architecture at a glance

The portfolio will be a server-first, statically generated Next.js App Router
application:

```text
repository content
       │
       ▼
server-only content loaders ──► validated domain models
       │                              │
       ├────────► home page model ────┤
       │                              ├──► Server Components
       └────────► project page model ─┘          │
                                                ▼
                                      small interactive islands
```

The important choices are:

- Use the App Router and React Server Components by default.
- Generate every project detail page from local, validated content.
- Keep route files thin; route files compose feature sections and own
  route-specific metadata.
- Organize business-facing UI by feature and generic visual primitives by
  reuse level.
- Isolate Framer Motion behind reusable motion primitives and client
  boundaries.
- Treat accessibility, reduced motion, metadata, image optimization, and
  performance budgets as architecture, not cleanup work.
- Start with local Git-managed content and leave a single content access
  boundary that can later be backed by a CMS.

## Documentation map

| Document                                                             | Question it answers                                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [Requirements and principles](./01-requirements-and-principles.md)   | What are we optimizing for?                                        |
| [Folder and module boundaries](./02-folder-and-module-boundaries.md) | Where does each kind of code belong?                               |
| [Routing and rendering](./03-routing-and-rendering.md)               | What routes exist, and how are they rendered?                      |
| [Components and data flow](./04-components-and-data-flow.md)         | How do content and behavior reach the UI?                          |
| [Content strategy](./05-content-strategy.md)                         | How are portfolio details authored and validated?                  |
| [Animation architecture](./06-animation-architecture.md)             | How is motion added without spreading client code?                 |
| [Quality architecture](./07-quality-architecture.md)                 | How will the 95+ performance and accessibility goals be protected? |
| [Decision log and evolution](./08-decision-log-and-evolution.md)     | Why these choices, and when should they change?                    |

## Companion design and delivery documents

| Document                                               | Responsibility                                              |
| ------------------------------------------------------ | ----------------------------------------------------------- |
| [Design principles](../design-principles.md)           | Visual philosophy, UX goals, inspiration, and guardrails    |
| [Design system](../design-system.md)                   | Visual tokens, responsive layout, states, and accessibility |
| [Component inventory](../component-inventory.md)       | Planned components, props, variants, and usage              |
| [Content model](../content-model.md)                   | TypeScript contracts and runtime content schema             |
| [Animation guidelines](../animation-guidelines.md)     | Exact motion behavior and reduced-motion fallbacks          |
| [Component sources](../component-sources.md)           | External source and adaptation policy                       |
| [Implementation roadmap](../implementation-roadmap.md) | Independently committable delivery milestones               |

## Dependency direction

Dependencies point inward toward stable domain types and content contracts:

```text
app routes
  └─► features
       ├─► components/ui
       ├─► components/motion
       ├─► lib
       └─► types

lib/content
  ├─► content
  └─► types
```

The inverse directions are forbidden. In particular:

- `components/ui` must not import from a feature or route.
- `content` must not import React components.
- feature modules must not import route files.
- browser-only modules must not be imported into server-only content loaders.
- one feature should not reach into another feature's private components.

These rules prevent circular dependencies and make it possible to change a
page, content backend, or animation implementation independently.
