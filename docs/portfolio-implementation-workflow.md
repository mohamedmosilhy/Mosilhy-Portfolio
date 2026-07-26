# Portfolio Implementation Workflow

You are implementing this project incrementally.

The project already contains:

- Architecture documentation
- Design principles
- Design system
- Component inventory
- Content model
- Animation guidelines
- Component source policy
- Implementation roadmap
- Project audit

These documents are the source of truth.

Follow them exactly unless you find a contradiction. If you do, stop and explain the issue instead of making assumptions.

---

## Current Task

Implement **Milestone <N>** from `docs/implementation-roadmap.md`.

Only implement the work defined for this milestone.

Do NOT implement work from later milestones.

---

## Before Writing Code

1. Read the implementation roadmap.
2. Read every document referenced by this milestone.
3. Review the architecture decisions that affect this milestone.
4. Review the design system if UI or styling is involved.
5. Review the component inventory before creating any component.
6. Review the content model if data structures are involved.
7. Review the animation guidelines if motion is involved.
8. Review the component source policy before creating custom UI.

If documentation is unclear or contradictory, stop and explain the problem.

---

## Component Policy

Before creating any reusable component:

1. Check whether an equivalent already exists.

2. If not, check approved component sources:

- shadcn/ui
- Aceternity UI
- Magic UI
- Motion Primitives

3. If a suitable component exists:

- adapt it
- keep accessibility
- integrate it into our design system
- do not blindly copy styling

4. If no suitable component exists:

Create a custom component.

Never duplicate functionality.

---

## Architecture Rules

Respect the documented architecture.

Never:

- create unnecessary client components
- duplicate logic
- bypass validation
- hardcode content
- violate server/client boundaries
- introduce circular dependencies

---

## Code Quality Rules

Every implementation must be:

- strongly typed
- reusable
- modular
- production-ready
- accessible
- responsive
- documented where necessary

Avoid:

- dead code
- duplicated code
- unnecessary abstractions
- overengineering

---

## Scope Control

Do not perform work from future milestones.

If you notice improvements belonging to another milestone:

Document them as recommendations.

Do not implement them.

---

## Validation

Before finishing:

- build succeeds
- lint succeeds
- typecheck succeeds
- milestone validation requirements pass
- responsive behavior verified (if applicable)
- accessibility requirements satisfied
- no broken imports
- no console errors

---

## Final Report

When finished provide:

### Summary

Explain what was implemented.

### Files

List every modified file.

### Decisions

List every architectural or implementation decision.

### Validation

Show which validation steps passed.

### Assumptions

Document every assumption.

### Recommendations

List improvements that belong to later milestones without implementing them.

Finally, stop.

Do not continue to the next milestone.

### Engineering mindset:

Act like a senior software engineer working on a production codebase.

Prioritize correctness, maintainability, readability, accessibility, and long-term scalability over speed.

When multiple valid implementations exist, choose the one that best aligns with the documented architecture and design system, and briefly explain why.

Never continue past the requested milestone, even if additional work appears straightforward.
