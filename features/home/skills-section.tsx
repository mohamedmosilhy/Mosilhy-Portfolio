import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillGroup } from "@/features/home/skill-group";
import type { SkillGroup as SkillGroupContent } from "@/types/content";

export interface SkillsSectionProps {
  readonly groups: readonly SkillGroupContent[];
  readonly heading: string;
}

const skillsHeadingId = "skills-heading";

export function SkillsSection({ groups, heading }: SkillsSectionProps) {
  return (
    <Section
      id="skills"
      ariaLabelledBy={skillsHeadingId}
      spacing="spacious"
      surface="subtle"
    >
      <Container size="wide">
        <div id={skillsHeadingId}>
          <SectionHeading title={heading} />
        </div>

        <div className="mt-space-16 grid gap-space-12 md:grid-cols-2 lg:mt-space-20 lg:gap-x-space-16">
          {groups.map((group) => (
            <SkillGroup key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
