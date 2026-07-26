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
  readonly priority?: boolean;
  readonly mediaPosition?: MediaPosition;
  readonly headingLevel?: HeadingLevel;
}

function projectPath(slug: string): InternalHref {
  return `/projects/${slug}`;
}

export function ProjectCard({
  project,
  variant = "featured",
  priority = false,
  mediaPosition = "start",
  headingLevel = 3,
}: ProjectCardProps) {
  const Heading = headingElements[headingLevel];
  const headingId = `project-${project.slug}-heading`;
  const media = (
    <div
      className={cn(
        "overflow-hidden rounded-xl transition-transform duration-[var(--motion-base)] ease-[var(--ease-standard)] motion-safe:group-hover:scale-[var(--scale-hover)] motion-reduce:transition-none",
        variant === "featured" && "lg:col-span-7",
      )}
    >
      <MediaFrame
        asset={project.cover}
        priority={priority}
        sizes="(min-width: 1024px) 58vw, 100vw"
        variant="browser"
        radius="xl"
      />
    </div>
  );
  const content = (
    <div
      className={cn(
        "flex flex-col justify-center",
        variant === "featured" && "lg:col-span-5",
      )}
    >
      <p className="font-mono text-eyebrow font-medium text-accent uppercase">
        {project.role}
      </p>
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
          trailingIcon={<ArrowRight />}
          aria-label={`View ${project.title} case study`}
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
      className="group rounded-lg border border-border bg-surface p-space-6 transition-[transform,background-color,border-color,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-standard)] focus-within:border-border-strong focus-within:bg-surface-raised hover:border-border-strong hover:bg-surface-raised hover:shadow-md motion-safe:hover:translate-y-[var(--lift-hover)] motion-reduce:transform-none motion-reduce:transition-[background-color,border-color] lg:p-space-8"
    >
      <div className={cn("grid gap-space-8", cardVariants[variant])}>
        {mediaPosition === "start" ? (
          <>
            {media}
            {content}
          </>
        ) : (
          <>
            {content}
            {media}
          </>
        )}
      </div>
    </article>
  );
}
