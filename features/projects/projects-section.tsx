import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/features/projects/components/project-card";
import type { ProjectSummary } from "@/types/content";

export interface ProjectsSectionProps {
  readonly projects: readonly ProjectSummary[];
  readonly heading: string;
}

const projectsHeadingId = "projects-heading";

export function ProjectsSection({ projects, heading }: ProjectsSectionProps) {
  return (
    <Section
      id="projects"
      ariaLabelledBy={projectsHeadingId}
      spacing="spacious"
      surface="canvas"
    >
      <Container size="wide">
        <div id={projectsHeadingId}>
          <SectionHeading title={heading} />
        </div>

        <div className="mt-space-16 grid gap-space-16 lg:mt-space-20 lg:gap-space-20">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              variant="featured"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
