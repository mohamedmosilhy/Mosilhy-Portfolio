import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/ui/media-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { TracingBeam } from "@/components/ui/tracing-beam";
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
              <p className="mt-space-6 font-sans text-eyebrow font-semibold text-accent uppercase">
                {profile.location}
              </p>
            ) : null}
            <p className="mt-space-5 max-w-[31rem] text-body-md text-pretty text-text-muted">
              A non-linear route through computer science, engineering,
              self-directed study, and client work—each chapter changed how I
              build the next one.
            </p>
            {profile.portrait ? (
              <div className="relative mt-space-8 max-w-narrow">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-space-3 translate-y-space-3 rounded-xl border border-accent/30 bg-accent-subtle/30"
                />
                <div className="relative">
                  <MediaFrame
                    asset={profile.portrait}
                    highPriority
                    sizes="(min-width: 1280px) 23rem, (min-width: 1024px) 30vw, (min-width: 640px) 36rem, calc(100vw - 2rem)"
                    variant="surface"
                    radius="xl"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-8 lg:col-start-5 lg:pl-space-8">
            <p className="font-sans text-eyebrow font-semibold tracking-widest text-accent uppercase">
              The long way around became the useful way in
            </p>
            <h3 className="mt-space-4 max-w-[19ch] font-display text-heading-xl font-medium text-balance text-text">
              From a first line of C to products built for real people.
            </h3>

            <TracingBeam className="mt-space-12 mb-space-3 md:ml-space-10">
              <ol className="text-pretty">
                {profile.journey.map((chapter, index) => (
                  <li
                    key={chapter.id}
                    className="grid gap-space-5 border-b border-border py-space-10 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-space-8"
                  >
                    <div className="md:sticky md:top-space-24 md:self-start">
                      <span
                        aria-hidden="true"
                        className="block font-display text-heading-lg font-medium text-text-muted"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-body-xs mt-space-2 font-semibold tracking-wide text-text-muted uppercase">
                        {chapter.period}
                      </p>
                    </div>

                    <article>
                      <p className="text-eyebrow font-semibold tracking-widest text-accent uppercase">
                        {chapter.eyebrow}
                      </p>
                      <h4 className="mt-space-3 max-w-[24ch] font-display text-heading-md font-semibold text-balance text-text">
                        {chapter.title}
                      </h4>
                      <p
                        className={
                          index === 0
                            ? "mt-space-5 max-w-prose text-body-lg font-medium text-text"
                            : "mt-space-5 max-w-prose text-body-md text-text-secondary"
                        }
                      >
                        {chapter.description}
                      </p>
                      <ul
                        aria-label={`What I learned during ${chapter.eyebrow}`}
                        className="mt-space-6 flex flex-wrap gap-space-2"
                      >
                        {chapter.evidence.map((item) => (
                          <li
                            key={item}
                            className="text-body-xs rounded-full border border-border bg-surface px-space-3 py-space-1 font-medium text-text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                ))}
              </ol>
            </TracingBeam>

            {profile.experience.length > 0 ? (
              <div className="mt-space-14 border-y border-border py-space-6">
                <dl className="grid gap-space-6 sm:grid-cols-2">
                  {profile.experience.map((item) => (
                    <div key={item.id}>
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
              <div className="mt-space-14 border-t border-border pt-space-8">
                <h3 className="font-display text-heading-sm font-semibold text-text">
                  What the journey shaped
                </h3>
                <ul className="mt-space-6 grid gap-space-6 sm:grid-cols-3">
                  {profile.interests.map((interest) => (
                    <li key={interest.id}>
                      <h4 className="text-body-sm font-semibold text-text">
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
