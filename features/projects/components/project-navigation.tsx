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
  "group flex min-h-11 flex-col justify-center rounded-lg border border-border bg-surface p-space-6 outline-none transition-[background-color,border-color] duration-[var(--motion-fast)] hover:border-border-strong hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none";

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
        <div className="grid gap-space-4 md:grid-cols-3">
          {previousProject ? (
            <Link
              href={projectPath(previousProject.slug)}
              prefetch={false}
              aria-label={`Previous case study: ${previousProject.title}`}
              className={linkClasses}
            >
              <span className="font-mono text-eyebrow text-text-muted uppercase">
                ← Previous
              </span>
              <span className="mt-space-2 font-semibold text-text">
                {previousProject.title}
              </span>
            </Link>
          ) : null}

          <Link
            href={allProjectsHref}
            prefetch={false}
            className={cn(
              linkClasses,
              "text-center md:col-start-2 md:row-start-1",
            )}
          >
            <span className="font-semibold text-text">All projects</span>
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
              <span className="font-mono text-eyebrow text-text-muted uppercase">
                Next →
              </span>
              <span className="mt-space-2 font-semibold text-text">
                {nextProject.title}
              </span>
            </Link>
          ) : null}
        </div>
      </Container>
    </nav>
  );
}
