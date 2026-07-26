import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/ui/media-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Profile } from "@/types/content";

const aboutHeadingId = "about-heading";

export interface AboutSectionProps {
  readonly profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <Section
      id="about"
      ariaLabelledBy={aboutHeadingId}
      spacing="spacious"
      surface="canvas"
    >
      <Container size="wide">
        <Reveal className="grid gap-space-12 lg:grid-cols-12 lg:gap-space-8">
          <div className="lg:sticky lg:top-space-24 lg:col-span-4 lg:self-start">
            <div id={aboutHeadingId}>
              <SectionHeading title="About" />
            </div>
            {profile.location ? (
              <p className="mt-space-6 font-mono text-eyebrow font-medium text-accent uppercase">
                {profile.location}
              </p>
            ) : null}
            {profile.portrait ? (
              <div className="relative mt-space-8 max-w-narrow">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-space-3 translate-y-space-3 rounded-xl border border-accent/30 bg-accent-subtle/30"
                />
                <div className="relative">
                  <MediaFrame
                    asset={profile.portrait}
                    sizes="(min-width: 1280px) 23rem, (min-width: 1024px) 30vw, (min-width: 640px) 36rem, calc(100vw - 2rem)"
                    variant="surface"
                    radius="xl"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-space-8 text-pretty">
              {profile.biography.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "font-display text-heading-md font-medium text-text"
                      : "max-w-prose text-body-lg text-text-secondary"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {profile.experience.length > 0 ? (
              <div className="mt-space-12">
                <h3 className="text-heading-sm font-semibold text-text">
                  Experience
                </h3>
                <dl className="mt-space-6 grid gap-space-4 sm:grid-cols-2">
                  {profile.experience.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-border bg-surface p-space-6"
                    >
                      <dt className="text-body-sm text-text-muted">
                        {item.label}
                      </dt>
                      <dd className="mt-space-2 text-heading-md font-semibold text-text">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {profile.interests.length > 0 ? (
              <div className="mt-space-12">
                <h3 className="text-heading-sm font-semibold text-text">
                  Areas of interest
                </h3>
                <ul className="mt-space-6 grid gap-space-6 sm:grid-cols-2">
                  {profile.interests.map((interest) => (
                    <li
                      key={interest.id}
                      className="rounded-lg border border-border bg-surface p-space-5"
                    >
                      <h4 className="font-semibold text-text">
                        {interest.label}
                      </h4>
                      {interest.description ? (
                        <p className="mt-space-2 text-body-sm text-pretty text-text-muted">
                          {interest.description}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
