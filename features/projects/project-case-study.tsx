import { Container } from "@/components/layout/container";
import { renderProjectMdx } from "@/features/projects/components/mdx-components";
import { ProjectHero } from "@/features/projects/components/project-hero";
import { ProjectNavigation } from "@/features/projects/components/project-navigation";
import type {
  InternalHref,
  ProjectDetail,
  ProjectSummary,
} from "@/types/content";

export interface ProjectCaseStudyProps {
  readonly project: ProjectDetail;
  readonly previousProject: ProjectSummary | null;
  readonly nextProject: ProjectSummary | null;
  readonly allProjectsHref: InternalHref;
}

export async function ProjectCaseStudy({
  project,
  previousProject,
  nextProject,
  allProjectsHref,
}: ProjectCaseStudyProps) {
  const body = await renderProjectMdx(project);

  return (
    <article data-slot="project-case-study">
      <ProjectHero project={project} priority />

      <section
        aria-label={`${project.title} case study`}
        className="border-t border-border py-space-16 lg:py-space-24"
      >
        <Container size="prose">{body}</Container>
      </section>

      <ProjectNavigation
        previousProject={previousProject}
        nextProject={nextProject}
        allProjectsHref={allProjectsHref}
      />
    </article>
  );
}
