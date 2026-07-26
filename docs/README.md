# Portfolio Documentation

## Source documents

- [Portfolio requirements](./portfolio-requirements.md) defines the product
  goals, audiences, pages, sections, behavior, and quality targets.
- [Architecture](./architecture/README.md) translates those requirements into
  module boundaries, routing, data flow, content authoring, motion, and quality
  decisions.
- [Design principles](./design-principles.md) defines the intended feeling,
  visual philosophy, inspiration translation, UX goals, and guardrails.
- [Design system](./design-system.md) is the visual token and component-styling
  contract.
- [Component inventory](./component-inventory.md) defines every planned
  reusable component and its public responsibility.
- [Content model](./content-model.md) defines authored types, schemas,
  relationships, and normalized page data.
- [Animation guidelines](./animation-guidelines.md) defines precise motion and
  reduced-motion behavior.
- [Component sources](./component-sources.md) governs external inspiration,
  adaptation, licensing review, and provenance.
- [Implementation roadmap](./implementation-roadmap.md) divides future work
  into independently committable milestones.
- [Tooling foundation](./tooling.md) records supported runtime versions,
  quality commands, dependency responsibilities, and shadcn configuration.

## Document order

Requirements are the product source of truth. Architecture explains how the
requirements will be implemented. Design principles and the design system define
the experience and visual contract. The component and content documents define
implementation-facing APIs, while the roadmap defines delivery order.

When a requirement changes, update the requirements first and then review the
architecture for affected decisions. When an architectural constraint changes
without changing product behavior, record it in the architecture decision log.
When a visual token, component contract, or content field changes, update its
authoritative document in the same change.
