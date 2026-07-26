import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { StaggerItem } from "@/components/motion/stagger-item";
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
        <Reveal>
          <div id={projectsHeadingId}>
            <SectionHeading title={heading} />
          </div>
        </Reveal>

        <Stagger
          className="mt-space-16 grid gap-space-16 lg:mt-space-20 lg:gap-space-20"
          variant="default"
        >
          {projects.map((project, index) => (
            <StaggerItem key={project.slug}>
              <ProjectCard
                project={project}
                variant="featured"
                ordinal={index + 1}
                mediaPosition={index % 2 === 0 ? "start" : "end"}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
