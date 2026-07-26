import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/features/home/social-links";
import type { ExternalHref, SocialLink } from "@/types/content";

export interface ContactSectionProps {
  readonly heading: string;
  readonly email: ExternalHref;
  readonly socialLinks: readonly SocialLink[];
}

const contactHeadingId = "contact-heading";

function emailAddress(email: ExternalHref) {
  return email.startsWith("mailto:") ? email.slice("mailto:".length) : email;
}

function emailDisplayParts(email: ExternalHref) {
  const address = emailAddress(email);
  const separatorIndex = address.indexOf("@");

  return separatorIndex === -1
    ? ([address, ""] as const)
    : ([
        address.slice(0, separatorIndex),
        address.slice(separatorIndex),
      ] as const);
}

export function ContactSection({
  heading,
  email,
  socialLinks,
}: ContactSectionProps) {
  const [emailLocalPart, emailDomain] = emailDisplayParts(email);
  const supportingLinks = socialLinks.filter(
    (link) => link.platform !== "email",
  );

  return (
    <Section
      id="contact"
      ariaLabelledBy={contactHeadingId}
      spacing="spacious"
      surface="canvas"
    >
      <Container size="wide">
        <Reveal className="relative isolate overflow-hidden rounded-xl border border-border bg-surface p-space-6 shadow-lg sm:p-space-8 lg:grid lg:grid-cols-12 lg:items-end lg:gap-space-8 lg:p-space-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-32 -z-10 size-[32rem] rounded-full bg-[radial-gradient(circle,var(--color-accent-subtle),transparent_68%)]"
          />
          <div className="min-w-0 lg:col-span-7">
            <div id={contactHeadingId}>
              <SectionHeading title={heading} />
            </div>
            <a
              href={email}
              className="mt-space-8 inline-block max-w-full rounded-sm font-display text-heading-lg font-medium break-words text-text underline decoration-border-strong decoration-1 underline-offset-8 transition-[color,text-decoration-color] duration-[var(--motion-fast)] outline-none hover:text-accent-hover hover:decoration-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface motion-reduce:transition-none"
            >
              {emailLocalPart}
              <wbr />
              {emailDomain}
            </a>
          </div>

          <div className="mt-space-10 border-t border-border pt-space-8 lg:col-span-4 lg:col-start-9 lg:mt-space-0 lg:border-t-0 lg:border-l lg:pt-space-0 lg:pl-space-8">
            <Button href={email} size="lg">
              Send an email
            </Button>
            {supportingLinks.length > 0 ? (
              <div className="mt-space-6">
                <SocialLinks links={supportingLinks} variant="labelled" />
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
