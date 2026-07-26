import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MainNavigation } from "@/components/layout/main-navigation";
import { ExternalLink } from "@/components/ui/external-link";
import type { Profile, SocialLink } from "@/types/content";
import type { NavigationItem } from "@/types/navigation";

export interface SiteFooterProps {
  readonly profile: Profile;
  readonly socialLinks: readonly SocialLink[];
  readonly navigation: readonly NavigationItem[];
  readonly year: number;
}

export function SiteFooter({
  profile,
  socialLinks,
  navigation,
  year,
}: SiteFooterProps) {
  return (
    <footer
      data-slot="site-footer"
      className="border-t border-border py-space-12"
    >
      <Container size="wide">
        <div className="grid gap-space-10 md:grid-cols-2 md:items-start lg:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div>
            <Link
              href="/"
              aria-label={`${profile.name}, home`}
              className="inline-flex min-h-11 items-center rounded-md font-display text-heading-md font-semibold text-text transition-colors duration-[var(--motion-fast)] outline-none hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none"
            >
              {profile.name}
            </Link>
            <p className="mt-space-2 max-w-narrow text-body-sm text-text-muted">
              {profile.role}
            </p>
          </div>

          <MainNavigation items={navigation} variant="footer" />

          <nav aria-label="Contact and social">
            <ul className="flex flex-wrap gap-x-space-4 gap-y-space-1 lg:max-w-narrow lg:justify-end">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <ExternalLink
                    href={link.href}
                    variant="muted"
                    newTab={link.newTab}
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-space-10 text-body-sm text-text-muted">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
