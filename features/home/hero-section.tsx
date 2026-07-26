import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/features/home/social-links";
import type { Profile, SocialLink } from "@/types/content";

export interface HeroSectionProps {
  readonly profile: Profile;
  readonly socialLinks: readonly SocialLink[];
}

const heroHeadingId = "hero-heading";

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  const nameParts = profile.name.trim().split(/\s+/);
  const familyName = nameParts.pop() ?? profile.name;
  const givenNames = nameParts.join(" ");

  return (
    <section
      aria-labelledby={heroHeadingId}
      data-slot="hero-section"
      className="relative isolate overflow-hidden border-b border-border bg-canvas"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_88%)] bg-[size:4rem_4rem] opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[18%] left-[58%] -z-10 hidden size-[34rem] rounded-full border border-accent/15 shadow-accent lg:block"
      >
        <span className="absolute inset-[18%] rounded-full border border-border" />
        <span className="absolute inset-[38%] rounded-full border border-accent/20 bg-accent-subtle/30" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[12%] -z-10 hidden h-full w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent lg:block"
      />

      <Container
        size="wide"
        className="relative grid min-h-[calc(100svh-var(--space-16))] items-center py-space-6 sm:py-space-12 lg:py-space-20"
      >
        <div className="grid lg:grid-cols-12 lg:items-center lg:gap-space-12">
          <div className="lg:col-span-7">
            <div data-hero-group="eyebrow">
              <div className="flex flex-wrap items-center gap-x-space-6 gap-y-space-2">
                <p className="font-mono text-eyebrow font-medium text-accent uppercase">
                  {profile.greeting}
                </p>
                {profile.location ? (
                  <p className="flex items-center gap-space-2 font-mono text-eyebrow text-text-muted uppercase">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-accent"
                    />
                    {profile.location}
                  </p>
                ) : null}
              </div>
            </div>
            <div data-hero-group="identity" className="mt-space-3">
              <h1
                id={heroHeadingId}
                aria-label={profile.name}
                className="font-display text-display-xl font-medium text-balance text-text"
              >
                <span aria-hidden="true">
                  {givenNames ? (
                    <>
                      <span className="block">{givenNames}</span>{" "}
                    </>
                  ) : null}
                  <span className="block text-text-secondary italic">
                    {familyName}
                  </span>
                </span>
              </h1>
              <p className="mt-space-5 flex items-center gap-space-3 text-heading-sm font-medium text-text-secondary">
                <span
                  aria-hidden="true"
                  className="h-px w-space-12 shrink-0 bg-accent"
                />
                {profile.role}
              </p>
            </div>
          </div>

          <div className="relative mt-space-4 border-t border-border pt-space-4 sm:mt-space-6 sm:pt-space-6 lg:col-span-5 lg:mt-space-0 lg:rounded-xl lg:border lg:bg-surface/75 lg:p-space-8 lg:shadow-lg">
            <span
              aria-hidden="true"
              className="absolute top-0 left-space-8 hidden h-px w-space-20 bg-accent lg:block"
            />
            <div data-hero-group="introduction">
              <p className="max-w-prose text-body-md text-text-secondary sm:text-body-lg">
                {profile.introduction}
              </p>
            </div>

            <div data-hero-group="actions" className="mt-space-6">
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
              {profile.availability ? (
                <p className="mt-space-5 border-t border-border pt-space-4 text-body-sm text-text-muted">
                  {profile.availability}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
