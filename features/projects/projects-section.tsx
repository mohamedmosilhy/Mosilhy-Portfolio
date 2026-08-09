import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FilterableProjectGallery } from "@/features/projects/components/filterable-project-gallery";
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
          <SectionHeading
            id={projectsHeadingId}
            title={heading}
            eyebrow="01 / Project archive"
            description="Browse the work by discipline or search by technology. Each tile opens a focused case study with the decisions, process, and result."
          />
        </Reveal>

        <FilterableProjectGallery projects={projects} />
      </Container>
    </Section>
  );
}
