import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { StaggerItem } from "@/components/motion/stagger-item";
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
        <Reveal>
          <SectionHeading
            id={skillsHeadingId}
            title={heading}
            eyebrow="02 / Capabilities"
            description="A focused toolkit shaped by 49 web, mobile, backend, scientific, machine-learning, and creative-coding projects."
          />
        </Reveal>

        <Stagger
          className="mt-space-16 grid gap-space-6 md:grid-cols-2 lg:mt-space-20 lg:gap-space-8"
          variant="default"
        >
          {groups.map((group, index) => (
            <StaggerItem
              key={group.id}
              className={
                index === groups.length - 1 ? "md:col-span-2" : undefined
              }
            >
              <SkillGroup group={group} variant="tags" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
