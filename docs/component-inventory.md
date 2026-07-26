# Component Inventory

## Purpose

This is the closed component inventory for the first portfolio release. It
defines responsibility and public API before implementation so components are
not created ad hoc. A component may be added or split only when a real
implementation need is recorded here.

Types referenced below are defined in [`content-model.md`](./content-model.md).
Visual variants follow [`design-system.md`](./design-system.md), and motion
behavior follows [`animation-guidelines.md`](./animation-guidelines.md).

## Component rules

- Server Components are the default. A component is client-side only when it
  owns browser state, an event handler, an observer, or motion runtime.
- Feature components receive validated content through props; they do not read
  files or import raw content modules.
- Generic UI components do not know about projects, skills, or testimonials.
- Props are readonly and serializable across a server/client boundary.
- `className` is exposed only by layout and UI primitives that intentionally
  support composition. Feature sections do not expose arbitrary restyling.
- Native element props may be forwarded only after conflicting semantic props
  are omitted.
- Variants describe semantic emphasis, not a one-off page location.
- All interactive components include accessible names and complete keyboard
  behavior in their contract.

## Shared UI primitives

### `Button`

| Field          | Definition                                                                                                           |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| Responsibility | Render an action button or a link with consistent visual emphasis and states                                         |
| Variants       | `primary`, `secondary`, `ghost`, `danger`; sizes `sm`, `md`, `lg`, `icon`                                            |
| Props          | `variant`, `size`, `leadingIcon?`, `trailingIcon?`, `loading?`, `disabled?`, plus either button props or link `href` |
| Used by        | Hero, project actions, mobile navigation, gallery controls, contact                                                  |
| Rendering      | Server-compatible unless consumer behavior requires a client boundary                                                |

The API is a discriminated union: navigation uses an anchor/Next `Link`, while
actions use `button`. `loading` retains the accessible name, disables repeated
activation, and exposes busy state.

### `ExternalLink`

| Field          | Definition                                                             |
| -------------- | ---------------------------------------------------------------------- |
| Responsibility | Render a safe, consistently labelled external text link                |
| Variants       | `inline`, `standalone`, `muted`                                        |
| Props          | `href`, `children`, `newTab?`, `showExternalIcon?`, `accessibleLabel?` |
| Used by        | Prose, footer, project actions, contact                                |
| Rendering      | Server Component                                                       |

It validates the protocol through the content layer and adds safe `rel` values
when opening a new tab. Inline links retain a persistent underline.

### `IconLink`

| Field          | Definition                                                                   |
| -------------- | ---------------------------------------------------------------------------- |
| Responsibility | Render a compact icon-led navigation action with an explicit accessible name |
| Variants       | `default`, `quiet`, `bordered`; sizes `md`, `lg`                             |
| Props          | `href`, `label`, `icon`, `newTab?`, `showLabel?`                             |
| Used by        | Social links, project repositories, footer                                   |
| Rendering      | Server Component                                                             |

The icon is passed as a concrete Lucide or approved brand-mark element, never a
string that resolves against a global registry.

### `Tag`

| Field          | Definition                                              |
| -------------- | ------------------------------------------------------- |
| Responsibility | Display non-interactive taxonomy or technology metadata |
| Variants       | `neutral`, `accent`, `outline`; sizes `sm`, `md`        |
| Props          | `children`, `variant?`, `size?`                         |
| Used by        | Project cards, project hero, skills                     |
| Rendering      | Server Component                                        |

Tags are not buttons. A future filter chip must be a separate interactive
component with pressed/selected semantics.

### `SectionHeading`

| Field          | Definition                                                                |
| -------------- | ------------------------------------------------------------------------- |
| Responsibility | Provide consistent section eyebrow, title, description, and alignment     |
| Variants       | `default`, `centered`, `split`; sizes `lg`, `xl`                          |
| Props          | `title`, `eyebrow?`, `description?`, `headingLevel?`, `action?`, `align?` |
| Used by        | Projects, skills, testimonials, about, contact, case-study sections       |
| Rendering      | Server Component                                                          |

`headingLevel` preserves document hierarchy and is independent from visual
size. The optional action is composition, not raw action text.

### `Prose`

| Field          | Definition                                                   |
| -------------- | ------------------------------------------------------------ |
| Responsibility | Apply readable typography and spacing to trusted MDX content |
| Variants       | `default`, `compact`                                         |
| Props          | `children`, `variant?`, `className?`                         |
| Used by        | Project case studies, about narrative                        |
| Rendering      | Server Component                                             |

It styles semantic descendants but does not sanitize or compile content.

### `MediaFrame`

| Field          | Definition                                                      |
| -------------- | --------------------------------------------------------------- |
| Responsibility | Reserve aspect ratio and present image/video media with caption |
| Variants       | `plain`, `surface`, `browser`; radii `none`, `lg`, `xl`         |
| Props          | `asset`, `priority?`, `sizes`, `caption?`, `variant?`           |
| Used by        | Project cards, gallery, project hero                            |
| Rendering      | Server for images; may contain a client video control           |

The `browser` variant is a neutral frame, not a copied browser mockup. Intrinsic
dimensions are mandatory.

### `Divider`

| Field          | Definition                                                     |
| -------------- | -------------------------------------------------------------- |
| Responsibility | Mark a visual separation only where whitespace is insufficient |
| Variants       | `subtle`, `strong`, `accent`                                   |
| Props          | `orientation?`, `variant?`, `decorative?`                      |
| Used by        | Header boundary, editorial cards, case-study metadata          |
| Rendering      | Server Component                                               |

Decorative dividers are hidden from assistive technology.

### `SkipLink`

| Field          | Definition                                            |
| -------------- | ----------------------------------------------------- |
| Responsibility | Let keyboard users move directly to the main landmark |
| Variants       | none                                                  |
| Props          | `targetId`, `label?`                                  |
| Used by        | Root public-site layout                               |
| Rendering      | Server Component                                      |

It is visually hidden until focus and uses the highest documented interface
layer.

## Layout and site chrome

### `Container`

| Field          | Definition                                            |
| -------------- | ----------------------------------------------------- |
| Responsibility | Apply maximum width and responsive horizontal gutters |
| Variants       | `wide`, `content`, `prose`, `narrow`, `full`          |
| Props          | `as?`, `size?`, `children`, `className?`              |
| Used by        | Every page and section                                |
| Rendering      | Server Component                                      |

### `Section`

| Field          | Definition                                                                     |
| -------------- | ------------------------------------------------------------------------------ |
| Responsibility | Provide semantic section element, anchor offset, and vertical rhythm           |
| Variants       | spacing `compact`, `default`, `spacious`; surface `canvas`, `subtle`, `raised` |
| Props          | `id?`, `ariaLabelledBy?`, `as?`, `spacing?`, `surface?`, `children`            |
| Used by        | Every home and case-study section                                              |
| Rendering      | Server Component                                                               |

### `SiteHeader`

| Field          | Definition                                                                     |
| -------------- | ------------------------------------------------------------------------------ |
| Responsibility | Compose logo, desktop navigation, mobile navigation, and sticky state boundary |
| Variants       | `transparent`, `scrolled` is state-driven, not consumer-selected               |
| Props          | `brand`, `items`, `currentPath`                                                |
| Used by        | Public-site layout                                                             |
| Rendering      | Server shell with client navigation islands                                    |

The header starts visually quiet. A client observer may add the scrolled
surface/blur state without changing navigation semantics.

### `MainNavigation`

| Field          | Definition                                                      |
| -------------- | --------------------------------------------------------------- |
| Responsibility | Render desktop anchor navigation and current section indication |
| Variants       | `desktop`, `footer`                                             |
| Props          | `items`, `currentPath`, `observeSections?`                      |
| Used by        | Header, optionally footer                                       |
| Rendering      | Client only when active-section observation is enabled          |

### `MobileNavigation`

| Field          | Definition                                                                  |
| -------------- | --------------------------------------------------------------------------- |
| Responsibility | Manage small-screen menu disclosure, focus, escape, and close-on-navigation |
| Variants       | `disclosure`; modal behavior only if design requires it                     |
| Props          | `items`, `brandLabel`                                                       |
| Used by        | Header below `md`                                                           |
| Rendering      | Client Component                                                            |

### `SiteFooter`

| Field          | Definition                                                               |
| -------------- | ------------------------------------------------------------------------ |
| Responsibility | Close the page with identity, contact paths, social links, and copyright |
| Variants       | `default`                                                                |
| Props          | `profile`, `socialLinks`, `navigation`, `year`                           |
| Used by        | Public-site layout                                                       |
| Rendering      | Server Component                                                         |

## Motion primitives

### `MotionProvider`

| Field          | Definition                                                           |
| -------------- | -------------------------------------------------------------------- |
| Responsibility | Apply global Framer Motion reduced-motion configuration if required  |
| Variants       | none                                                                 |
| Props          | `children`                                                           |
| Used by        | Public-site layout only if library configuration cannot remain local |
| Rendering      | Client Component                                                     |

It is omitted if motion primitives can honor user preference without a global
provider.

### `Reveal`

| Field          | Definition                                                  |
| -------------- | ----------------------------------------------------------- |
| Responsibility | Reveal one region on initial render or first viewport entry |
| Variants       | `fade`, `rise`, `slide-inline`; distance `subtle`, `small`  |
| Props          | `children`, `variant?`, `delay?`, `as?`, `once?`            |
| Used by        | Hero groups, section headings, selected content groups      |
| Rendering      | Client Component accepting server-rendered children         |

Delay is capped by the animation guidelines. It does not accept arbitrary
duration or easing values.

### `Stagger`

| Field          | Definition                                      |
| -------------- | ----------------------------------------------- |
| Responsibility | Coordinate the entrance of a short related list |
| Variants       | `fast`, `default`                               |
| Props          | `children`, `variant?`, `as?`                   |
| Used by        | Project grid, skill groups, social links        |
| Rendering      | Client Component                                |

### `StaggerItem`

| Field          | Definition                                  |
| -------------- | ------------------------------------------- |
| Responsibility | Participate in the nearest stagger sequence |
| Variants       | `fade`, `rise`                              |
| Props          | `children`, `variant?`, `as?`               |
| Used by        | Direct children of `Stagger`                |
| Rendering      | Client Component                            |

### `PageEntrance`

| Field          | Definition                                                 |
| -------------- | ---------------------------------------------------------- |
| Responsibility | Apply a non-blocking entrance to project-page main content |
| Variants       | `project`                                                  |
| Props          | `children`                                                 |
| Used by        | Project detail route                                       |
| Rendering      | Client Component                                           |

It does not implement exit animation or delay route navigation.

## Home feature components

### `HeroSection`

| Field          | Definition                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| Responsibility | Communicate identity, role, proposition, primary actions, and social proof |
| Variants       | one canonical composition; responsive layout is internal                   |
| Props          | `profile`, `socialLinks`                                                   |
| Used by        | Home route                                                                 |
| Rendering      | Server Component with small motion wrappers                                |

### `SocialLinks`

| Field          | Definition                                           |
| -------------- | ---------------------------------------------------- |
| Responsibility | Render an ordered set of social/contact destinations |
| Variants       | `icons`, `labelled`, `compact`                       |
| Props          | `links`, `variant?`                                  |
| Used by        | Hero, contact, footer                                |
| Rendering      | Server Component                                     |

### `ProjectsSection`

| Field          | Definition                                              |
| -------------- | ------------------------------------------------------- |
| Responsibility | Introduce and render ordered featured project summaries |
| Variants       | `featured`                                              |
| Props          | `projects`, `heading`                                   |
| Used by        | Home route `#projects`                                  |
| Rendering      | Server Component                                        |

### `ProjectCard`

| Field          | Definition                                                                |
| -------------- | ------------------------------------------------------------------------- |
| Responsibility | Present a project's image, purpose, technologies, and actions             |
| Variants       | `featured`, `standard`; media position `start`, `end` at wide breakpoints |
| Props          | `project`, `priority?`, `mediaPosition?`, `headingLevel?`                 |
| Used by        | Projects section and future project index                                 |
| Rendering      | Server Component with CSS hover behavior                                  |

Its main case-study link may be stretched over the card, but repository and
live-demo links remain valid sibling links rather than nested interactive
elements.

### `SkillsSection`

| Field          | Definition                                        |
| -------------- | ------------------------------------------------- |
| Responsibility | Present skills in the required ordered categories |
| Variants       | `grouped`                                         |
| Props          | `groups`, `heading`                               |
| Used by        | Home route `#skills`                              |
| Rendering      | Server Component                                  |

### `SkillGroup`

| Field          | Definition                                         |
| -------------- | -------------------------------------------------- |
| Responsibility | Render one category heading and its ordered skills |
| Variants       | `list`, `tags`; initial release uses `list`        |
| Props          | `group`, `headingLevel?`                           |
| Used by        | Skills section                                     |
| Rendering      | Server Component                                   |

Skill levels and percentage meters are deliberately unsupported.

### `TestimonialsSection`

| Field          | Definition                                     |
| -------------- | ---------------------------------------------- |
| Responsibility | Introduce and display social proof             |
| Variants       | `grid`; carousel is not in the initial release |
| Props          | `testimonials`, `heading`                      |
| Used by        | Home route                                     |
| Rendering      | Server Component                               |

### `TestimonialCard`

| Field          | Definition                                               |
| -------------- | -------------------------------------------------------- |
| Responsibility | Present quote, attribution, position, company, and photo |
| Variants       | `surface`, `editorial`                                   |
| Props          | `testimonial`, `variant?`                                |
| Used by        | Testimonials section                                     |
| Rendering      | Server Component                                         |

Quote markup uses semantic `blockquote` and `cite`.

### `AboutSection`

| Field          | Definition                                           |
| -------------- | ---------------------------------------------------- |
| Responsibility | Present biography, experience summary, and interests |
| Variants       | canonical split/editorial composition                |
| Props          | `profile`                                            |
| Used by        | Home route `#about`                                  |
| Rendering      | Server Component                                     |

### `ContactSection`

| Field          | Definition                                       |
| -------------- | ------------------------------------------------ |
| Responsibility | Provide direct email, GitHub, and LinkedIn paths |
| Variants       | `direct-links`                                   |
| Props          | `heading`, `email`, `socialLinks`                |
| Used by        | Home route `#contact`                            |
| Rendering      | Server Component                                 |

No form props exist until a contact form becomes a requirement.

## Project case-study components

### `ProjectCaseStudy`

| Field          | Definition                                                                    |
| -------------- | ----------------------------------------------------------------------------- |
| Responsibility | Compose hero, validated MDX body, allowlisted blocks, and adjacent navigation |
| Variants       | none                                                                          |
| Props          | `project`, `previousProject`, `nextProject`, `allProjectsHref`                |
| Used by        | `/projects/[slug]`                                                            |
| Rendering      | Server Component                                                              |

### `ProjectHero`

| Field          | Definition                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| Responsibility | Present project title, summary, role, timeline, cover, and primary actions |
| Variants       | `default`, `media-led`; chosen from content needs, not authored styling    |
| Props          | `project`, `priority?`                                                     |
| Used by        | Project case study                                                         |
| Rendering      | Server Component                                                           |

### `ProjectGallery`

| Field          | Definition                                                          |
| -------------- | ------------------------------------------------------------------- |
| Responsibility | Present ordered project media with captions and accessible controls |
| Variants       | `stack`, `grid`, `carousel`; initial default is `stack`             |
| Props          | `items`, `projectTitle`, `variant?`                                 |
| Used by        | Allowlisted `<ProjectGallery />` MDX block                          |
| Rendering      | Server for stack/grid; client island only for carousel controls     |

The content model may request a permitted gallery presentation, but mobile and
reduced-motion behavior remain component-owned.

### `ProjectTechnologies`

| Field          | Definition                                           |
| -------------- | ---------------------------------------------------- |
| Responsibility | Resolve and display technologies used by the project |
| Variants       | `list`, `grouped`                                    |
| Props          | `skills`, `variant?`                                 |
| Used by        | Allowlisted `<ProjectTechnologies />` MDX block      |
| Rendering      | Server Component                                     |

### `ProjectActions`

| Field          | Definition                                          |
| -------------- | --------------------------------------------------- |
| Responsibility | Render GitHub and live-demo calls to action         |
| Variants       | `buttons`, `links`                                  |
| Props          | `links`, `projectTitle`, `variant?`                 |
| Used by        | Hero and allowlisted `<ProjectActions />` MDX block |
| Rendering      | Server Component                                    |

### `ProjectNavigation`

| Field          | Definition                                                                |
| -------------- | ------------------------------------------------------------------------- |
| Responsibility | Provide previous case study, all projects, and next case study navigation |
| Variants       | `adjacent`                                                                |
| Props          | `previousProject`, `nextProject`, `allProjectsHref`                       |
| Used by        | End of project case study                                                 |
| Rendering      | Server Component                                                          |

`All Projects` always links to `/#projects` until a dedicated project index
becomes a requirement. Previous and next links are omitted at their respective
catalog boundaries; navigation does not wrap. Accessible labels include the
destination project title, while the visible directional labels remain concise.

### `MdxComponents`

| Field          | Definition                                                             |
| -------------- | ---------------------------------------------------------------------- |
| Responsibility | Map approved MDX elements and blocks to portfolio components           |
| Variants       | none                                                                   |
| Props          | `project` is bound by `ProjectCaseStudy`; authors pass no project data |
| Used by        | MDX compilation/rendering                                              |
| Rendering      | Server registry; entries may contain isolated client components        |

The registry permits semantic prose elements, `Callout`, `Metric`,
`ProjectGallery`, `ProjectTechnologies`, and `ProjectActions`. Arbitrary content
imports are prohibited.

### `Callout`

| Field          | Definition                                                            |
| -------------- | --------------------------------------------------------------------- |
| Responsibility | Emphasize a concise decision, constraint, or note in case-study prose |
| Variants       | `note`, `decision`, `warning`                                         |
| Props          | `title?`, `variant?`, `children`                                      |
| Used by        | Optional allowlisted MDX                                              |
| Rendering      | Server Component                                                      |

### `Metric`

| Field          | Definition                                          |
| -------------- | --------------------------------------------------- |
| Responsibility | Present one verifiable project outcome with context |
| Variants       | `default`                                           |
| Props          | `value`, `label`, `detail?`                         |
| Used by        | Optional allowlisted MDX                            |
| Rendering      | Server Component                                    |

Metrics must be supportable and must not fabricate outcomes.

## Metadata components

### `StructuredData`

| Field          | Definition                                              |
| -------------- | ------------------------------------------------------- |
| Responsibility | Serialize already validated JSON-LD safely              |
| Variants       | `person`, `website`, `project` determined by data union |
| Props          | `data`                                                  |
| Used by        | Home and project routes                                 |
| Rendering      | Server Component                                        |

Metadata creation remains in `lib/metadata`; this component only emits the
serialized result and escapes unsafe characters.

## Deliberately excluded components

- theme switcher: dark-only is the current requirement;
- project carousel on home: a grid is more scannable and needs less client code;
- skill progress bar: proficiency is not a reliable percentage;
- testimonial carousel: content should remain visible and keyboard-simple;
- contact form: direct contact methods are the current requirement;
- cursor replacement, magnetic controls, and scroll-jacking: they reduce
  predictability and accessibility;
- generic `Card` abstraction: current cards have distinct semantic contracts;
- dynamic icon registry: direct icon imports preserve clarity and bundle size.
