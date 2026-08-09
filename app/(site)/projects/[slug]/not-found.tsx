import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <section
      aria-labelledby="project-not-found-heading"
      className="grid min-h-[calc(100svh-var(--space-16))] items-center py-space-16"
    >
      <Container size="narrow">
        <p className="font-sans text-eyebrow font-semibold text-accent uppercase">
          404
        </p>
        <h1
          id="project-not-found-heading"
          className="mt-space-4 font-display text-heading-xl font-medium text-text"
        >
          Project not found
        </h1>
        <p className="mt-space-6 text-body-lg text-text-secondary">
          This case study is unavailable or has not been published.
        </p>
        <div className="mt-space-8 flex flex-wrap gap-space-3">
          <Button href="/#projects">View projects</Button>
          <Button href="/" variant="secondary">
            Return home
          </Button>
        </div>
      </Container>
    </section>
  );
}
