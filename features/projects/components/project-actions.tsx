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
  if (variant === "links") {
    return (
      <nav
        aria-label={`${projectTitle} supporting project links`}
        data-slot="project-actions"
        data-variant={variant}
        className="flex flex-wrap gap-x-space-6 gap-y-space-2"
      >
        <ExternalLink
          href={links.github}
          variant="standalone"
          newTab
          showExternalIcon
          accessibleLabel={`Open ${projectTitle} GitHub repository`}
        >
          GitHub repository
        </ExternalLink>
        <ExternalLink
          href={links.live}
          variant="standalone"
          newTab
          showExternalIcon
          accessibleLabel={`Open ${projectTitle} live demo`}
        >
          Live demo
        </ExternalLink>
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
      <Button
        href={links.live}
        size="lg"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${projectTitle} live demo (opens in a new tab)`}
      >
        Open live demo
      </Button>
      <Button
        href={links.github}
        variant="secondary"
        size="lg"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${projectTitle} GitHub repository (opens in a new tab)`}
      >
        View GitHub
      </Button>
    </nav>
  );
}
