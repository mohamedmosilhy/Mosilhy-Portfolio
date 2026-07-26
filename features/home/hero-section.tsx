import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/features/home/social-links";
import type { Profile, SocialLink } from "@/types/content";

export interface HeroSectionProps {
  readonly profile: Profile;
  readonly socialLinks: readonly SocialLink[];
}

const heroHeadingId = "hero-heading";

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  return (
    <section
      aria-labelledby={heroHeadingId}
      data-slot="hero-section"
      className="bg-canvas"
    >
      <Container
        size="wide"
        className="grid min-h-[calc(100svh-var(--space-16))] items-center py-space-6 sm:py-space-12 lg:py-space-20"
      >
        <div className="grid lg:grid-cols-12 lg:items-end lg:gap-space-8">
          <div className="lg:col-span-8">
            <Reveal variant="rise" distance="subtle">
              <p className="font-mono text-eyebrow font-medium text-accent uppercase">
                {profile.greeting}
              </p>
            </Reveal>
            <Reveal
              variant="rise"
              distance="small"
              delay={70}
              className="mt-space-3"
            >
              <h1
                id={heroHeadingId}
                className="font-display text-display-xl font-medium text-balance text-text"
              >
                {profile.name}
              </h1>
              <p className="mt-space-3 flex items-center gap-space-3 text-heading-sm font-medium text-text-secondary">
                <span
                  aria-hidden="true"
                  className="h-px w-space-8 shrink-0 bg-accent"
                />
                {profile.role}
              </p>
            </Reveal>
          </div>

          <div className="mt-space-4 border-t border-border pt-space-4 sm:mt-space-6 sm:pt-space-6 lg:col-span-4 lg:mt-space-0 lg:border-t-0 lg:border-l lg:py-space-4 lg:pt-space-4 lg:pl-space-8">
            <Reveal variant="rise" distance="subtle" delay={140}>
              <p className="max-w-prose text-body-md text-text-secondary sm:text-body-lg">
                {profile.introduction}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={210} className="mt-space-6">
              <div className="flex flex-wrap gap-space-3">
                <Button href={profile.primaryCta.href}>
                  {profile.primaryCta.label}
                </Button>
                <Button href={profile.secondaryCta.href} variant="secondary">
                  {profile.secondaryCta.label}
                </Button>
              </div>

              <div className="mt-space-3">
                <SocialLinks links={socialLinks} variant="compact" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
