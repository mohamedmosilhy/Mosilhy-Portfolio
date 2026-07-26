import { Briefcase, Code2, Globe2, Mail } from "lucide-react";
import type { ReactNode } from "react";

import { ExternalLink } from "@/components/ui/external-link";
import { IconLink } from "@/components/ui/icon-link";
import type { SocialLink, SocialPlatform } from "@/types/content";

export interface SocialLinksProps {
  readonly links: readonly SocialLink[];
  readonly variant?: "icons" | "labelled" | "compact";
}

function platformIcon(platform: SocialPlatform): ReactNode {
  switch (platform) {
    case "email":
      return <Mail />;
    case "github":
      return <Code2 />;
    case "linkedin":
      return <Briefcase />;
    case "website":
      return <Globe2 />;
  }
}

export function SocialLinks({ links, variant = "icons" }: SocialLinksProps) {
  return (
    <nav
      aria-label="Social and contact links"
      data-slot="social-links"
      data-variant={variant}
    >
      <ul className="flex flex-wrap items-center gap-x-space-4 gap-y-space-1">
        {links.map((link) => (
          <li key={link.id}>
            {variant === "compact" ? (
              <ExternalLink
                href={link.href}
                variant="muted"
                newTab={link.newTab}
                accessibleLabel={link.label}
              >
                {link.label}
              </ExternalLink>
            ) : (
              <IconLink
                href={link.href}
                label={link.label}
                icon={platformIcon(link.platform)}
                variant={variant === "labelled" ? "bordered" : "quiet"}
                newTab={link.newTab}
                showLabel={variant === "labelled"}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
