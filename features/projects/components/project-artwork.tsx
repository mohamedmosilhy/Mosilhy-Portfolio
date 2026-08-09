import { projectCategoryLabels } from "@/features/projects/project-categories";
import { cn } from "@/lib/utils/cn";
import type { ProjectCategory } from "@/types/content";

export interface ProjectArtworkProps {
  readonly title: string;
  readonly category: ProjectCategory;
  readonly className?: string;
  readonly framed?: boolean;
}

export function ProjectArtwork({
  title,
  category,
  className,
  framed = false,
}: ProjectArtworkProps) {
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toLocaleUpperCase();

  return (
    <figure
      role="img"
      aria-label={`${title} project artwork`}
      className={cn(
        "relative isolate h-full min-h-72 overflow-hidden bg-surface",
        framed && "rounded-xl border border-border shadow-sm",
        className,
      )}
    >
      {framed ? (
        <div
          aria-hidden="true"
          className="flex h-9 items-center gap-space-2 border-b border-border px-space-3"
        >
          <span className="size-2 rounded-full bg-text-muted" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border" />
        </div>
      ) : null}
      <div className="relative flex min-h-72 items-end overflow-hidden p-space-6 lg:min-h-[30rem] lg:p-space-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 size-72 rounded-full border border-accent/30 bg-accent-subtle/40 blur-sm lg:size-[28rem]"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 font-display text-[clamp(8rem,28vw,24rem)] leading-none font-semibold text-accent opacity-[0.08]"
        >
          {initials}
        </div>
        {framed ? (
          <div className="relative max-w-xl">
            <p className="text-eyebrow font-semibold tracking-widest text-accent uppercase">
              {projectCategoryLabels[category]}
            </p>
            <p className="mt-space-3 max-w-[18ch] font-display text-heading-lg font-semibold text-balance text-text">
              {title}
            </p>
          </div>
        ) : null}
      </div>
    </figure>
  );
}
