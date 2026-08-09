import { ArrowLeft, ArrowRight, Grid2X2 } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils/cn";
import type { InternalHref, ProjectSummary, Slug } from "@/types/content";

export interface ProjectNavigationProps {
  readonly previousProject: ProjectSummary | null;
  readonly nextProject: ProjectSummary | null;
  readonly allProjectsHref: InternalHref;
}

function projectPath(slug: Slug): InternalHref {
  return `/projects/${slug}`;
}

const linkClasses =
  "group flex min-h-36 flex-col justify-between rounded-xl border border-border bg-surface p-space-6 outline-none transition-[background-color,border-color,transform,box-shadow] duration-[var(--motion-base)] hover:border-border-strong hover:bg-surface-raised hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-safe:hover:-translate-y-1 motion-reduce:transition-[background-color,border-color]";

export function ProjectNavigation({
  previousProject,
  nextProject,
  allProjectsHref,
}: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Project case studies"
      data-slot="project-navigation"
      className="border-t border-border py-space-16 lg:py-space-20"
    >
      <Container size="wide">
        <div className="mb-space-8 flex items-end justify-between gap-space-5">
          <div>
            <p className="font-sans text-eyebrow font-semibold text-accent uppercase">
              Keep exploring
            </p>
            <h2 className="mt-space-2 font-display text-heading-lg font-semibold text-text">
              More project stories
            </h2>
          </div>
        </div>
        <div className="grid gap-space-4 md:grid-cols-3">
          {previousProject ? (
            <Link
              href={projectPath(previousProject.slug)}
              prefetch={false}
              aria-label={`Previous case study: ${previousProject.title}`}
              className={linkClasses}
            >
              <span className="flex items-center gap-space-2 font-sans text-eyebrow font-semibold text-text-muted uppercase">
                <ArrowLeft
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
                />
                Previous
              </span>
              <span className="mt-space-4 font-display text-heading-sm font-semibold text-text">
                {previousProject.title}
              </span>
            </Link>
          ) : null}

          <Link
            href={allProjectsHref}
            prefetch={false}
            className={cn(
              linkClasses,
              "items-center text-center md:col-start-2 md:row-start-1",
            )}
          >
            <Grid2X2 aria-hidden="true" className="size-5 text-accent" />
            <span className="font-display text-heading-sm font-semibold text-text">
              All projects
            </span>
          </Link>

          {nextProject ? (
            <Link
              href={projectPath(nextProject.slug)}
              prefetch={false}
              aria-label={`Next case study: ${nextProject.title}`}
              className={cn(
                linkClasses,
                "text-end md:col-start-3 md:row-start-1",
              )}
            >
              <span className="flex items-center justify-end gap-space-2 font-sans text-eyebrow font-semibold text-text-muted uppercase">
                Next
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
              <span className="mt-space-4 font-display text-heading-sm font-semibold text-text">
                {nextProject.title}
              </span>
            </Link>
          ) : null}
        </div>
      </Container>
    </nav>
  );
}
