import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { StaggerItem } from "@/components/motion/stagger-item";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/features/home/testimonial-card";
import type { Testimonial } from "@/types/content";

export interface TestimonialsSectionProps {
  readonly testimonials: readonly Testimonial[];
  readonly heading: string;
}

const testimonialsHeadingId = "testimonials-heading";

export function TestimonialsSection({
  testimonials,
  heading,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section
      ariaLabelledBy={testimonialsHeadingId}
      spacing="spacious"
      surface="canvas"
    >
      <Container size="wide">
        <Reveal>
          <div id={testimonialsHeadingId}>
            <SectionHeading title={heading} />
          </div>
        </Reveal>

        <Stagger
          className="mt-space-16 grid gap-space-6 md:grid-cols-2 lg:mt-space-20"
          variant="fast"
        >
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
