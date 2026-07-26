import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
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
      surface="subtle"
    >
      <Container size="wide">
        <div className="grid gap-space-10 lg:grid-cols-12 lg:items-end lg:gap-space-8">
          <div className="min-w-0 lg:col-span-7">
            <div id={contactHeadingId}>
              <SectionHeading title={heading} />
            </div>
            <p className="mt-space-8 max-w-prose font-display text-heading-lg font-medium break-words text-text">
              {emailLocalPart}
              <wbr />
              {emailDomain}
            </p>
          </div>

          <div className="border-t border-border pt-space-8 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-space-0 lg:pl-space-8">
            <Button href={email} size="lg">
              Send an email
            </Button>
            {supportingLinks.length > 0 ? (
              <div className="mt-space-6">
                <SocialLinks links={supportingLinks} variant="labelled" />
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
