# Components and Data Flow

## Component layers

Components are divided by what they know:

| Layer | Knows about | Examples |
| --- | --- | --- |
| UI primitive | semantics and visual variants | `Button`, `ExternalLink`, `Prose` |
| Layout | site chrome and spatial composition | `Header`, `Container`, `Section` |
| Motion primitive | animation behavior | `Reveal`, `Stagger` |
| Feature component | portfolio domain data | `ProjectCard`, `SkillsSection` |
| Route composition | page order and route data | home page, project page |

This hierarchy is more scalable than organizing components by HTML element or
putting every component in a single folder.

## Server and client boundary

Server Components are used for:

- page and section composition;
- reading content;
- rendering project prose;
- static navigation and links;
- metadata and structured data;
- images that do not need browser-controlled state.

Client Components are limited to:

- mobile navigation open/close state;
- active-section observation;
- Framer Motion wrappers;
- interactive gallery controls;
- optional copy-to-clipboard or form behavior.

A client component receives serializable props and renders as low in the tree
as possible. Passing a Server Component as `children` to a client motion shell
is preferred to marking the entire feature as client-rendered.

## Data flow

Data flows in one direction:

```text
content files
  → parser and schema validation
  → immutable domain models
  → page-level query/selectors
  → route
  → feature components
  → UI and motion primitives
```

Components do not read files, query a CMS, or import raw project MDX directly.
They receive the minimum model required through props.

### Home flow

`getHomePageModel()` reads:

- profile and contact content;
- grouped skills;
- published testimonials;
- published projects marked `featured`.

It sorts featured projects using an explicit `featuredOrder`, not filesystem
order. The route receives a complete model and passes slices to sections.

### Project flow

`getProjectPageModel(slug)` returns:

- validated project metadata;
- compiled case-study body;
- gallery and external links;
- previous/next published projects derived from explicit project order.

The adjacency rule is centralized in the selector and does not wrap. The first
published project receives `previousProject: null`; the last receives
`nextProject: null`. The component does not calculate ordering. A stable
`/#projects` link provides the middle `All Projects` destination.

`ProjectCaseStudy` binds the validated project gallery, technologies, and links
to the allowlisted MDX blocks. The content controls where those blocks appear
within the required narrative sequence, but cannot replace their implementation
or provide unvalidated props.

## State strategy

No global client-state library is needed. Current interactive state is local
and ephemeral:

- menu open state stays in the mobile navigation;
- gallery index stays in the gallery;
- active home section stays in the navigation observer;
- reduced-motion preference is read through the motion layer.

Content is server data, not client state. Theme switching is not required; the
dark primary theme is applied at the document level. If theme switching is
added, a narrowly scoped theme provider may be introduced without becoming an
application-wide state store.

Use URL state only for future user choices that should survive reloads or be
shareable, such as project filters. Do not mirror URL state into a second
global store.

## Prop and API design

- Pass domain objects or purposeful view models, not unstructured bags of
  strings.
- Keep raw validation types inside the content layer; expose normalized
  `ProjectSummary` and `ProjectDetail` types.
- Use discriminated unions for content that has multiple variants, such as a
  gallery item being an image or video.
- External-link components require an accessible label and enforce safe
  `target`/`rel` behavior.
- Components accept `className` only when consumer layout customization is a
  supported responsibility.
- Prefer composition through `children` over many booleans.

## Section contracts

Every home section owns:

- its semantic heading hierarchy;
- its stable section ID when it is a navigation target;
- its responsive internal layout;
- its empty-state decision;
- the animation orchestration of its own children.

The page owns section order. Shared layout primitives own width and vertical
rhythm. This allows a section to be moved without copying wrapper markup.

## Error handling

Authored content errors are developer errors and should fail development or
build with a message naming the file and invalid field. They must not silently
hide a project.

Visitor-facing errors use App Router boundaries:

- unknown project: `notFound()`;
- unknown site route: global not-found page;
- external image failure: meaningful fallback/alt strategy determined during
  design implementation;
- future contact submission: inline recoverable status plus route-handler
  logging.

Do not use broad `try/catch` blocks in components to convert all failures into
empty UI.
