import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProjectArtwork } from "@/features/projects/components/project-artwork";
import { projectCategoryLabels } from "@/features/projects/project-categories";
import type { InternalHref, ProjectSummary } from "@/types/content";

export interface ProjectCardProps {
  readonly project: ProjectSummary;
  readonly ordinal?: number;
}

function projectPath(slug: string): InternalHref {
  return `/projects/${slug}`;
}

export function ProjectCard({ project, ordinal }: ProjectCardProps) {
  const headingId = `project-${project.slug}-heading`;

  return (
    <article
      aria-labelledby={headingId}
      data-slot="project-card"
      className="group relative isolate h-full min-h-72 overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-[border-color,box-shadow,transform] duration-[var(--motion-base)] ease-[var(--ease-standard)] focus-within:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-canvas hover:border-border-strong hover:shadow-xl motion-safe:hover:-translate-y-1 motion-reduce:transition-[border-color,box-shadow]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {project.cover ? (
          <div className="relative h-full overflow-hidden bg-canvas">
            <Image
              src={project.cover.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 66vw, (min-width: 640px) 50vw, calc(100vw - 2rem)"
              className="scale-110 object-cover opacity-45 blur-2xl"
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-space-3 sm:inset-space-5">
              <Image
                data-slot="project-card-cover"
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(min-width: 1024px) 60vw, (min-width: 640px) 46vw, calc(100vw - 3.5rem)"
                className="object-contain drop-shadow-2xl transition-transform duration-[var(--motion-base)] ease-[var(--ease-standard)] motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </div>
          </div>
        ) : (
          <ProjectArtwork
            title={project.title}
            category={project.category}
            className="h-full"
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,10,18,0.08)_8%,rgba(7,10,18,0.22)_48%,rgba(7,10,18,0.96)_100%)] transition-opacity duration-[var(--motion-base)] group-hover:opacity-90 motion-reduce:transition-none" />
      <Link
        href={projectPath(project.slug)}
        aria-label={`View ${project.title} case study`}
        className="flex h-full min-h-72 flex-col justify-between rounded-xl p-space-5 outline-none"
      >
        <div className="flex items-start justify-between gap-space-4">
          <span className="rounded-full border border-white/20 bg-black/30 px-space-3 py-space-1 font-sans text-eyebrow font-semibold tracking-wide text-white backdrop-blur-md">
            {projectCategoryLabels[project.category]}
          </span>
          {ordinal !== undefined ? (
            <span
              aria-hidden="true"
              className="font-sans text-eyebrow font-semibold text-white/70"
            >
              {String(ordinal).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        <div className="mt-space-12 flex items-end justify-between gap-space-4">
          <div className="min-w-0">
            <p className="mb-space-2 text-body-sm font-medium text-white/70">
              {project.role}
            </p>
            <h3
              id={headingId}
              className="max-w-[20ch] font-display text-heading-md font-semibold text-balance break-words text-white"
            >
              {project.title}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-[background-color,transform] duration-[var(--motion-fast)] group-hover:bg-white group-hover:text-canvas motion-safe:group-hover:rotate-6 motion-reduce:transition-colors"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
