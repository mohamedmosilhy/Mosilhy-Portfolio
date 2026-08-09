import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/layout/container";
import { MainNavigation } from "@/components/layout/main-navigation";
import { ExternalLink } from "@/components/ui/external-link";
import { Spotlight } from "@/components/ui/spotlight";
import type { Profile, SocialLink } from "@/types/content";
import type { NavigationItem } from "@/types/navigation";

export interface SiteFooterProps {
  readonly profile: Profile;
  readonly socialLinks: readonly SocialLink[];
  readonly navigation: readonly NavigationItem[];
  readonly year: number;
}

function emailAddress(email: Profile["email"]) {
  return email.startsWith("mailto:") ? email.slice("mailto:".length) : email;
}

export function SiteFooter({
  profile,
  socialLinks,
  navigation,
  year,
}: SiteFooterProps) {
  const supportingLinks = socialLinks.filter(
    (link) => link.platform !== "email",
  );
  const footerNavigation = navigation.filter((item) => item.id !== "contact");

  return (
    <footer
      id="contact"
      aria-label="Contact"
      data-slot="site-footer"
      className="relative isolate scroll-mt-space-20 overflow-hidden border-t border-border bg-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_76%)] bg-[size:4rem_4rem] opacity-15"
      />
      <Spotlight
        filterId="footer-spotlight-filter"
        className="-top-[32rem] -right-[42rem] left-auto hidden rotate-180 text-accent sm:block lg:-top-[26rem] lg:-right-[20rem]"
      />
      <Container size="wide">
        <div className="relative z-10">
          <div className="grid gap-space-10 py-space-20 lg:grid-cols-12 lg:items-end lg:gap-space-12 lg:py-space-24">
            <div className="lg:col-span-8">
              <p className="font-sans text-eyebrow font-semibold text-accent uppercase">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="mt-space-4 max-w-[14ch] font-display text-heading-xl font-medium text-balance text-text"
              >
                Let’s build something thoughtful.
              </h2>
              <p className="mt-space-5 max-w-prose text-body-lg text-pretty text-text-secondary">
                Have a product, interface, or ambitious idea in mind? Tell me
                where you want to take it.
              </p>

              <a
                href={profile.email}
                className="group/email mt-space-8 inline-flex max-w-full items-center gap-space-3 rounded-md font-sans text-heading-sm font-semibold break-all text-text underline decoration-border-strong decoration-1 underline-offset-8 transition-[color,text-decoration-color] duration-[var(--motion-fast)] outline-none hover:text-accent-hover hover:decoration-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface motion-reduce:transition-none sm:text-heading-md"
              >
                {emailAddress(profile.email)}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-[var(--motion-fast)] motion-safe:group-hover/email:translate-x-[2px] motion-safe:group-hover/email:-translate-y-[2px] motion-reduce:transition-none sm:size-6"
                  strokeWidth={1.75}
                />
              </a>
            </div>

            {supportingLinks.length > 0 ? (
              <nav
                aria-label="Social profiles"
                className="border-t border-border pt-space-6 lg:col-span-3 lg:col-start-10 lg:border-t-0 lg:border-l lg:pt-space-0 lg:pl-space-8"
              >
                <p className="font-sans text-eyebrow font-semibold text-text-muted uppercase">
                  Elsewhere
                </p>
                <ul className="mt-space-3 grid gap-space-1">
                  {supportingLinks.map((link) => (
                    <li key={link.id}>
                      <ExternalLink
                        href={link.href}
                        variant="standalone"
                        newTab={link.newTab}
                        showExternalIcon
                      >
                        {link.label}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          <div className="grid gap-space-6 border-t border-border py-space-5 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
            <Link
              href="/"
              prefetch={false}
              aria-label={`${profile.name}, home`}
              className="inline-flex min-h-11 w-fit items-center gap-space-3 rounded-md pr-space-2 font-display text-heading-sm font-semibold text-text transition-colors duration-[var(--motion-fast)] outline-none hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
            >
              <BrandMark className="size-9 shadow-none" />
              {profile.name}
            </Link>

            <MainNavigation items={footerNavigation} variant="footer" />

            <p className="text-body-sm text-text-muted lg:text-right">
              © {year}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
