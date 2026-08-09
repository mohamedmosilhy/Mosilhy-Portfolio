import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { Spotlight } from "@/components/ui/spotlight";
import { ProjectActions } from "@/features/projects/components/project-actions";
import { ProjectArtwork } from "@/features/projects/components/project-artwork";
import { projectCategoryLabels } from "@/features/projects/project-categories";
import type { ISODate, ProjectDetail } from "@/types/content";

export interface ProjectHeroProps {
  readonly project: ProjectDetail;
  readonly highPriority?: boolean;
}

function formatProjectDate(value: ISODate) {
  const [year, month = "01", day] = value.split("-");
  const date = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day ?? "01")),
  );

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    ...(day ? { day: "numeric" as const } : {}),
    timeZone: "UTC",
  }).format(date);
}

export function ProjectHero({
  project,
  highPriority = true,
}: ProjectHeroProps) {
  return (
    <header
      data-slot="project-hero"
      data-variant="media-led"
      className="relative isolate overflow-hidden border-b border-border py-space-12 lg:py-space-20"
    >
      <Spotlight
        filterId="project-hero-spotlight"
        className="-top-[80%] -left-[35%] opacity-25 lg:-top-[110%] lg:-left-[20%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_72%)] bg-[size:4rem_4rem] opacity-20"
      />

      <Container size="wide" className="relative z-10">
        <Link
          href="/#projects"
          className="group inline-flex min-h-10 items-center gap-space-2 rounded-md font-sans text-body-sm font-medium text-text-muted outline-none hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
          />
          Project archive
        </Link>

        <div className="mt-space-10 grid gap-space-10 lg:grid-cols-12 lg:items-end lg:gap-space-12">
          <div className="lg:col-span-8">
            <p className="font-sans text-eyebrow font-semibold tracking-[var(--eyebrow-tracking)] text-accent uppercase">
              Case study&nbsp; / &nbsp;
              {projectCategoryLabels[project.category]}
            </p>
            <h1 className="mt-space-4 max-w-content font-display text-heading-xl font-medium text-balance text-text sm:text-display-lg">
              {project.title}
            </h1>
            <p className="mt-space-6 max-w-prose text-body-lg text-pretty text-text-secondary">
              {project.summary}
            </p>
            <div className="mt-space-8">
              <ProjectActions
                links={project.links}
                projectTitle={project.title}
              />
            </div>
          </div>

          <dl className="gap-y-space-7 grid grid-cols-2 gap-x-space-6 border-t border-border pt-space-6 lg:col-span-4 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-space-0 lg:pl-space-8">
            <div>
              <dt className="font-sans text-eyebrow font-semibold text-text-muted uppercase">
                Role
              </dt>
              <dd className="mt-space-2 text-body-sm font-medium text-text">
                {project.role}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-eyebrow font-semibold text-text-muted uppercase">
                Timeline
              </dt>
              <dd className="mt-space-2 text-body-sm text-text-secondary">
                {formatProjectDate(project.timeline.startedAt)}
                {project.timeline.completedAt === project.timeline.startedAt
                  ? null
                  : project.timeline.completedAt
                    ? ` — ${formatProjectDate(project.timeline.completedAt)}`
                    : " — Ongoing"}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-eyebrow font-semibold text-text-muted uppercase">
                Toolkit
              </dt>
              <dd className="mt-space-2 text-body-sm text-text-secondary">
                {project.technologies.length} technologies
              </dd>
            </div>
            <div>
              <dt className="font-sans text-eyebrow font-semibold text-text-muted uppercase">
                Last refined
              </dt>
              <dd className="mt-space-2 text-body-sm text-text-secondary">
                {formatProjectDate(project.timeline.updatedAt)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mt-space-12 lg:mt-space-16">
          <div
            aria-hidden="true"
            className="absolute -inset-space-4 -z-10 rounded-xl bg-accent opacity-[0.06] blur-3xl"
          />
          {project.cover ? (
            <MediaFrame
              asset={project.cover}
              highPriority={highPriority}
              sizes="(min-width: 1280px) 76rem, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
              variant="browser"
              radius="xl"
            />
          ) : (
            <ProjectArtwork
              title={project.title}
              category={project.category}
              framed
            />
          )}
        </div>
      </Container>
    </header>
  );
}
