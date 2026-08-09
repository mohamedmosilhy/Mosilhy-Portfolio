import { ExternalLink } from "@/components/ui/external-link";
import { Button } from "@/components/ui/button";
import type { ProjectLinks } from "@/types/content";

export interface ProjectActionsProps {
  readonly links: ProjectLinks;
  readonly projectTitle: string;
  readonly variant?: "buttons" | "links";
}

export function ProjectActions({
  links,
  projectTitle,
  variant = "buttons",
}: ProjectActionsProps) {
  const resources = [
    links.live
      ? {
          href: links.live,
          label: "Live demo",
          accessibleLabel: `Open ${projectTitle} live demo`,
        }
      : null,
    links.video
      ? {
          href: links.video,
          label: "Demo video",
          accessibleLabel: `Open ${projectTitle} demo video`,
        }
      : null,
    {
      href: links.github,
      label: "GitHub repository",
      accessibleLabel: `Open ${projectTitle} GitHub repository`,
    },
    links.paper
      ? {
          href: links.paper,
          label: "Research paper",
          accessibleLabel: `Open ${projectTitle} research paper`,
        }
      : null,
  ].filter((resource) => resource !== null);

  if (variant === "links") {
    return (
      <nav
        aria-label={`${projectTitle} supporting project links`}
        data-slot="project-actions"
        data-variant={variant}
        className="flex flex-wrap gap-x-space-6 gap-y-space-2"
      >
        {resources.map((resource) => (
          <ExternalLink
            key={resource.label}
            href={resource.href}
            variant="standalone"
            newTab
            showExternalIcon
            accessibleLabel={resource.accessibleLabel}
          >
            {resource.label}
          </ExternalLink>
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label={`${projectTitle} primary project links`}
      data-slot="project-actions"
      data-variant={variant}
      className="flex flex-wrap gap-space-3"
    >
      {resources.map((resource, index) => (
        <Button
          key={resource.label}
          href={resource.href}
          variant={index === 0 ? "primary" : "secondary"}
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${resource.accessibleLabel} (opens in a new tab)`}
        >
          {resource.label}
        </Button>
      ))}
    </nav>
  );
}
