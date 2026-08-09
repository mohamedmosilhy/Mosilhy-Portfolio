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
            <SectionHeading
              id={aboutHeadingId}
              title="About"
              eyebrow="03 / My journey"
            />
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
            <h3 className="max-w-[18ch] font-display text-heading-lg font-semibold text-balance text-text">
              From engineering problems to products people can use.
            </h3>
            <ol className="relative mt-space-10 border-l border-border pl-space-8 text-pretty sm:pl-space-10">
              {profile.biography.map((paragraph, index) => (
                <li key={paragraph} className="relative pb-space-10 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.45rem] -left-[calc(var(--space-8)+0.3125rem)] size-2.5 rounded-full border-2 border-surface bg-accent shadow-[0_0_0_4px_var(--color-accent-subtle)] sm:-left-[calc(var(--space-10)+0.3125rem)]"
                  />
                  <p className="font-mono text-eyebrow font-medium text-accent uppercase">
                    Chapter {String(index + 1).padStart(2, "0")}
                  </p>
                  <p
                    className={
                      index === 0
                        ? "mt-space-3 max-w-prose text-body-lg font-semibold text-text"
                        : "mt-space-3 max-w-prose text-body-lg text-text-secondary"
                    }
                  >
                    {paragraph}
                  </p>
                </li>
              ))}
            </ol>

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
