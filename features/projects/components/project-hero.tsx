import { Container } from "@/components/layout/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { ProjectActions } from "@/features/projects/components/project-actions";
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
      className="py-space-16 lg:py-space-24"
    >
      <Container size="wide">
        <div className="grid gap-space-10 lg:grid-cols-12 lg:items-end lg:gap-space-8">
          <div className="lg:col-span-8">
            <p className="font-mono text-eyebrow font-medium text-accent uppercase">
              {project.role}
            </p>
            <h1 className="mt-space-4 max-w-content font-display text-display-lg font-medium text-balance text-text">
              {project.title}
            </h1>
            <p className="mt-space-6 max-w-prose text-body-lg text-pretty text-text-secondary">
              {project.summary}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-space-4 border-t border-border pt-space-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-space-0 lg:pl-space-8">
            <div>
              <dt className="font-mono text-eyebrow text-text-muted uppercase">
                Started
              </dt>
              <dd className="mt-space-2 text-body-sm text-text-secondary">
                {formatProjectDate(project.timeline.startedAt)}
              </dd>
            </div>
            {project.timeline.completedAt ? (
              <div>
                <dt className="font-mono text-eyebrow text-text-muted uppercase">
                  Completed
                </dt>
                <dd className="mt-space-2 text-body-sm text-text-secondary">
                  {formatProjectDate(project.timeline.completedAt)}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-mono text-eyebrow text-text-muted uppercase">
                Updated
              </dt>
              <dd className="mt-space-2 text-body-sm text-text-secondary">
                {formatProjectDate(project.timeline.updatedAt)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-space-10">
          <ProjectActions links={project.links} projectTitle={project.title} />
        </div>

        <div className="mt-space-12 lg:mt-space-16">
          <MediaFrame
            asset={project.cover}
            highPriority={highPriority}
            sizes="(min-width: 1280px) 76rem, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
            variant="browser"
            radius="xl"
          />
        </div>
      </Container>
    </header>
  );
}
