# Design Principles

## Purpose

The portfolio should feel like the work of a full-stack developer who treats
engineering quality and user experience as one discipline. Its design must
create confidence quickly, reward deeper exploration, and keep the projects—not
visual effects—as the center of attention.

The desired impression is:

- **assured**, without feeling self-important;
- **technical**, without resembling a developer tool dashboard;
- **premium**, without relying on ornamental excess;
- **human**, through direct writing, considered pacing, and personal detail;
- **memorable**, through a coherent visual voice rather than novelty;
- **calm**, even when motion and rich project imagery are present.

## Visual philosophy

### Editorial clarity with technical precision

The visual structure should borrow the legibility and pacing of an editorial
case study: strong hierarchy, generous negative space, measured line lengths,
and imagery with room to breathe. Technical precision appears through a
consistent grid, disciplined alignment, compact metadata, and occasional
monospace details.

The interface must never look like a generic admin dashboard. Cards, borders,
and badges are used only when they communicate grouping or interactivity.

### Dark, layered, and restrained

Dark is the primary theme. Depth comes from subtle surface changes, hairline
borders, controlled highlights, and local shadows—not from many competing
gradients. The canvas should feel deep rather than pure black, allowing project
images and primary text to carry contrast.

One cool primary accent identifies interactive elements and focus. A secondary
teal accent may identify technical detail or success, but accents are not
decoration to scatter across every section.

### Projects are the strongest visual material

Project images, outcomes, and explanations should dominate the visual story.
Supporting interface elements remain quiet. A project card may use motion and
layering to invite interaction, but it must communicate title, purpose, and
technology before the visitor interacts.

### Motion has a job

Animation should enhance usability rather than distract. It may:

- establish reading order;
- explain a state change;
- connect an action to its result;
- reveal spatial relationships;
- add a restrained sense of craft.

It must not delay reading, compete with case-study media, or become required to
understand or navigate the site.

## Inspiration sources

Inspiration is taken from principles, not copied compositions:

| Source category                                                                                                                           | What to study                                                                                                             | What not to copy                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Itsechi portfolio](https://itsechi.github.io/portfolio/)                                                                                 | monochrome restraint, editorial scale contrast, generous negative space, asymmetric project rhythm, and quiet transitions | its font pairing, grain treatment, exact section geometry, staggered project composition, or wording |
| Editorial portfolios and case studies                                                                                                     | pacing, hierarchy, image sequencing                                                                                       | complete page structures or recognizable compositions                                                |
| High-quality product sites                                                                                                                | concise value propositions, clear actions, trust signals                                                                  | marketing copy patterns unrelated to a personal portfolio                                            |
| Developer tools                                                                                                                           | precision, compact technical metadata, dark-surface discipline                                                            | dense dashboard styling                                                                              |
| [shadcn/ui](https://ui.shadcn.com/)                                                                                                       | accessible primitive structure and state coverage                                                                         | its default appearance as the final brand                                                            |
| [React Bits](https://reactbits.dev/)                                                                                                      | isolated interaction ideas and implementation techniques                                                                  | effects that reduce legibility or dominate the page                                                  |
| [Aceternity UI](https://ui.aceternity.com/), [Magic UI](https://magicui.design/), and [Motion Primitives](https://motion-primitives.com/) | motion mechanics and focused visual treatments                                                                            | entire sections, pages, or combined demo aesthetics                                                  |

Every borrowed idea must be translated through
[`design-system.md`](./design-system.md) and evaluated under
[`component-sources.md`](./component-sources.md).

### Translating the Itsechi influence

The reference is an influence on mood, not a template. This portfolio translates
its elegance and smoothness in original ways:

- its stark black-and-white restraint becomes a deep ink system with pearl text
  and one controlled indigo accent;
- its serif/sans contrast becomes a different editorial serif paired with
  Geist;
- its expansive spacing becomes a documented responsive spacing and container
  system;
- its asymmetric project flow becomes varied media emphasis inside a stable,
  accessible grid;
- its subtle text-link behavior becomes explicit button, link, focus, and
  reduced-motion states;
- its atmospheric surface treatment is replaced by minimal, optional
  code-generated texture that never reduces contrast.

No screenshots, source code, assets, copy, exact measurements, or recognizable
page sections from the reference may be reused.

## UX goals

### Communicate identity in one viewport

The initial viewport should answer:

1. Who is this?
2. What kind of work do they do?
3. Why should I continue?
4. Where can I see proof or make contact?

The hero should not require animation to reveal those answers.

### Support scanning and depth

Recruiters should be able to identify role, skills, strongest projects, and
contact paths quickly. Hiring managers, clients, and developers should be able
to continue into detailed case studies without encountering a separate visual
language.

Each section begins with a clear heading and concise orientation. Long prose is
reserved for project pages and constrained to readable line lengths.

### Keep navigation predictable

- Primary navigation uses familiar labels: Projects, Skills, About, Contact.
- The sticky header remains quiet until needed and never obscures a target.
- Active-section treatment is supportive, not the only location cue.
- Project pages retain clear access back to the home narrative.
- External GitHub and live-demo actions clearly communicate their destination.

### Make interaction confidence visible

Interactive elements have recognizable default, hover, focus-visible, active,
and disabled states. Hover-only information is prohibited. Focus states are
deliberately designed rather than left as an afterthought.

### Respect attention and preferences

The experience remains complete with reduced motion, without hover, at 200%
zoom, on a narrow viewport, and with keyboard navigation. Continuous decorative
movement pauses offscreen and disappears under reduced motion.

## Content and tone

Writing should be direct, specific, and evidence-led:

- prefer outcomes and decisions over adjectives;
- describe personal contribution separately from team outcomes;
- explain tradeoffs, constraints, and lessons honestly;
- use short summaries on home and detailed reasoning in case studies;
- avoid skill percentages, inflated claims, and vague superlatives;
- use sentence case for headings, buttons, and labels.

Calls to action use explicit verbs such as “View case study,” “Open live demo,”
or “Email Mohamed,” not ambiguous labels such as “Click here.”

## Composition principles

- Use one clear focal point per section.
- Prefer asymmetry only when it strengthens hierarchy and remains stable across
  breakpoints.
- Align content to a consistent container and grid.
- Preserve generous section spacing; do not compensate for weak hierarchy with
  more borders.
- Use a maximum of two prominent action styles in one region.
- Keep decorative layers behind content and non-interactive.
- Let case-study layouts alternate only when the content benefits; consistency
  is more valuable than forced variety.

## Guardrails

- Never copy an entire page.
- Never ship a sourced component without adapting it to the design system.
- Never trade semantic HTML or keyboard access for a visual treatment.
- Never hide required content until JavaScript runs.
- Never use animation to compensate for unclear hierarchy.
- Never introduce an additional accent, typeface, radius, or shadow for one
  isolated component.
- Never make a project image decorative when it conveys product information.
- Never present a technology logo as evidence of proficiency without supporting
  project context.

## Review questions

Before approving a design, ask:

1. Does the page communicate the developer’s role and strongest proof quickly?
2. Is the hierarchy clear without color or motion?
3. Does every visual treatment belong to the documented system?
4. Are project outcomes more prominent than interface ornament?
5. Does every interactive state work with keyboard and reduced motion?
6. Can any element be removed without losing meaning? If yes, remove it.
