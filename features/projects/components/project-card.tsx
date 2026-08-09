import { ArrowRight } from "lucide-react";
import type { ElementType } from "react";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils/cn";
import type { InternalHref, ProjectSummary } from "@/types/content";

type ProjectCardVariant = "featured" | "standard";
type MediaPosition = "start" | "end";
type HeadingLevel = 2 | 3 | 4 | 5 | 6;

const headingElements: Record<HeadingLevel, ElementType> = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const cardVariants: Record<ProjectCardVariant, string> = {
  featured: "lg:grid-cols-12 lg:gap-space-10",
  standard: "lg:grid-cols-2 lg:gap-space-8",
};

export interface ProjectCardProps {
  readonly project: ProjectSummary;
  readonly variant?: ProjectCardVariant;
  readonly mediaPosition?: MediaPosition;
  readonly headingLevel?: HeadingLevel;
  readonly ordinal?: number;
}

function projectPath(slug: string): InternalHref {
  return `/projects/${slug}`;
}

export function ProjectCard({
  project,
  variant = "featured",
  mediaPosition = "start",
  headingLevel = 3,
  ordinal,
}: ProjectCardProps) {
  const Heading = headingElements[headingLevel];
  const headingId = `project-${project.slug}-heading`;
  const media = (
    <div
      className={cn(
        "relative z-10 overflow-hidden rounded-xl shadow-lg transition-transform duration-[var(--motion-base)] ease-[var(--ease-standard)] motion-safe:group-hover:scale-[var(--scale-hover)] motion-reduce:transition-none",
        variant === "featured" && "lg:col-span-7",
        variant === "featured" && mediaPosition === "end" && "lg:order-2",
      )}
    >
      <MediaFrame
        asset={project.cover}
        sizes="(min-width: 1280px) 43rem, (min-width: 1024px) 55vw, calc(100vw - 2rem)"
        variant="browser"
        radius="xl"
      />
    </div>
  );
  const content = (
    <div
      className={cn(
        "relative z-10 flex flex-col justify-center",
        variant === "featured" && "lg:col-span-5",
        variant === "featured" && mediaPosition === "end" && "lg:order-1",
      )}
    >
      <div className="flex items-center gap-space-4">
        {ordinal !== undefined ? (
          <span
            aria-hidden="true"
            className="font-mono text-eyebrow text-text-muted"
          >
            {String(ordinal).padStart(2, "0")}
          </span>
        ) : null}
        <span aria-hidden="true" className="h-px w-space-6 bg-border-strong" />
        <p className="font-mono text-eyebrow font-medium text-accent uppercase">
          {project.role}
        </p>
      </div>
      <Heading
        id={headingId}
        className="mt-space-3 font-display text-heading-lg font-medium text-text"
      >
        {project.title}
      </Heading>
      <p className="mt-space-4 max-w-prose text-body-md text-pretty text-text-secondary">
        {project.summary}
      </p>

      <ul
        aria-label={`${project.title} technologies`}
        className="mt-space-6 flex flex-wrap gap-space-2"
      >
        {project.technologies.map((technology) => (
          <li key={technology.id}>
            <Tag variant="outline">{technology.name}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-space-8 flex flex-wrap items-center gap-x-space-5 gap-y-space-2">
        <Button
          href={projectPath(project.slug)}
          trailingIcon={
            <ArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-standard)] motion-safe:group-hover/case-study:translate-x-[3px] motion-safe:group-focus-visible/case-study:translate-x-[3px] motion-reduce:transition-none" />
          }
          aria-label={`View ${project.title} case study`}
          className="group/case-study"
        >
          View case study
        </Button>
        <ExternalLink
          href={project.links.github}
          variant="standalone"
          newTab
          showExternalIcon
          accessibleLabel={`Open ${project.title} GitHub repository`}
        >
          GitHub
        </ExternalLink>
        <ExternalLink
          href={project.links.live}
          variant="standalone"
          newTab
          showExternalIcon
          accessibleLabel={`Open ${project.title} live demo`}
        >
          Live demo
        </ExternalLink>
      </div>
    </div>
  );

  return (
    <article
      aria-labelledby={headingId}
      data-slot="project-card"
      data-variant={variant}
      data-media-position={mediaPosition}
      className="group relative isolate overflow-hidden rounded-xl border border-border bg-surface p-space-5 transition-[translate,background-color,border-color,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-standard)] before:pointer-events-none before:absolute before:-top-32 before:-right-32 before:-z-10 before:size-80 before:rounded-full before:bg-[radial-gradient(circle,var(--color-accent-subtle),transparent_68%)] before:opacity-0 before:transition-opacity before:duration-[var(--motion-base)] focus-within:border-border-strong focus-within:bg-surface-raised focus-within:before:opacity-100 hover:border-border-strong hover:bg-surface-raised hover:shadow-md hover:before:opacity-100 motion-safe:hover:translate-y-[var(--lift-hover)] motion-reduce:translate-none motion-reduce:transition-[background-color,border-color] sm:p-space-6 lg:p-space-10"
    >
      {ordinal !== undefined ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-space-3 right-space-5 -z-10 font-display text-[clamp(5rem,12vw,10rem)] leading-none font-semibold text-accent opacity-[0.035] transition-opacity duration-[var(--motion-base)] group-hover:opacity-[0.075] motion-reduce:transition-none"
        >
          {String(ordinal).padStart(2, "0")}
        </span>
      ) : null}
      <div className={cn("grid gap-space-8", cardVariants[variant])}>
        {media}
        {content}
      </div>
    </article>
  );
}
