import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { Spotlight } from "@/components/ui/spotlight";
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
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_82%)] bg-[size:4rem_4rem] opacity-20"
      />
      <Spotlight
        filterId="hero-spotlight-filter"
        className="-top-[38rem] -left-[42rem] hidden sm:block lg:-top-[34rem] lg:-left-[24rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-space-24 right-[-10rem] -z-10 size-[38rem] rounded-full bg-accent/10 blur-[120px]"
      />

      <Container
        size="wide"
        className="relative grid min-h-[calc(100svh-var(--space-16))] items-center py-space-6 sm:py-space-12 lg:py-space-16"
      >
        <div className="grid items-center lg:grid-cols-12 lg:gap-space-12 xl:gap-space-20">
          <div className="relative z-10 lg:col-span-7">
            <div data-hero-group="eyebrow">
              <p className="flex items-center gap-space-2 font-mono text-eyebrow font-medium text-accent uppercase">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full rounded-full bg-success opacity-40 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                {profile.greeting}
              </p>
            </div>

            <div data-hero-group="identity" className="mt-space-3">
              <h1
                id={heroHeadingId}
                aria-label={profile.name}
                className="font-display text-display-xl font-semibold text-balance text-text"
              >
                <span aria-hidden="true">
                  {givenNames ? (
                    <>
                      <span className="block">{givenNames}</span>{" "}
                    </>
                  ) : null}
                  <span className="block text-text-secondary">
                    {familyName}
                    <span className="text-accent">.</span>
                  </span>
                </span>
              </h1>
              <div className="mt-space-5 flex items-center gap-space-3">
                <span
                  aria-hidden="true"
                  className="h-px w-space-12 shrink-0 bg-accent"
                />
                <p className="text-heading-sm font-medium text-text-secondary">
                  {profile.role}
                </p>
              </div>
            </div>

            <div
              data-hero-group="introduction"
              className="mt-space-5 sm:mt-space-6"
            >
              <p className="max-w-[42rem] text-body-md text-pretty text-text-secondary sm:text-body-lg">
                {profile.introduction}
              </p>
            </div>

            <div data-hero-group="actions" className="mt-space-6 sm:mt-space-8">
              <div className="flex flex-wrap gap-space-3">
                <Button
                  href={profile.primaryCta.href}
                  size="lg"
                  trailingIcon={<ArrowDownRight />}
                >
                  {profile.primaryCta.label}
                </Button>
                <Button
                  href={profile.secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  trailingIcon={<ArrowUpRight />}
                >
                  {profile.secondaryCta.label}
                </Button>
              </div>

              <div className="mt-space-3 flex flex-wrap items-center gap-x-space-5 gap-y-space-2">
                <SocialLinks links={socialLinks} variant="compact" />
                {profile.location ? (
                  <p className="flex items-center gap-space-2 text-body-sm text-text-muted">
                    <MapPin aria-hidden="true" className="size-4" />
                    Based in {profile.location}
                  </p>
                ) : null}
                {profile.availability ? (
                  <p className="text-body-sm text-text-muted">
                    {profile.availability}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {profile.portrait ? (
            <div
              className="relative z-10 hidden lg:col-span-5 lg:block"
              aria-hidden="true"
            >
              <div className="relative ml-auto max-w-[24rem]">
                <div className="absolute -top-space-5 -right-space-5 h-space-20 w-space-20 border-t border-r border-accent/60" />
                <div className="absolute -bottom-space-5 -left-space-5 h-space-20 w-space-20 border-b border-l border-accent/60" />

                <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-space-2 shadow-lg">
                  <MediaFrame
                    asset={profile.portrait}
                    highPriority
                    sizes="(min-width: 1280px) 384px, (min-width: 1024px) 32vw, 0px"
                    radius="lg"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div
          aria-hidden="true"
          className="absolute right-space-8 bottom-space-4 hidden items-center gap-space-3 font-mono text-eyebrow text-text-muted uppercase xl:flex"
        >
          <span>Scroll to explore</span>
          <span className="h-px w-space-12 bg-border-strong" />
          <ArrowDownRight className="size-3.5 text-accent" />
        </div>
      </Container>
    </section>
  );
}
