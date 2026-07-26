import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
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
        <div id={testimonialsHeadingId}>
          <SectionHeading title={heading} />
        </div>

        <div className="mt-space-16 grid gap-space-6 md:grid-cols-2 lg:mt-space-20">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
