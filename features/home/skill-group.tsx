import type { ElementType } from "react";

import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils/cn";
import type { SkillGroup as SkillGroupContent } from "@/types/content";

type HeadingLevel = 3 | 4 | 5 | 6;

const headingElements: Record<HeadingLevel, ElementType> = {
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export interface SkillGroupProps {
  readonly group: SkillGroupContent;
  readonly variant?: "list" | "tags";
  readonly headingLevel?: HeadingLevel;
}

export function SkillGroup({
  group,
  variant = "list",
  headingLevel = 3,
}: SkillGroupProps) {
  const Heading = headingElements[headingLevel];

  return (
    <article
      aria-labelledby={`skill-group-${group.id}`}
      data-slot="skill-group"
      data-variant={variant}
      className={cn(
        "relative overflow-hidden border-t border-border pt-space-6",
        variant === "tags" &&
          "h-full rounded-xl border bg-canvas p-space-6 shadow-sm transition-[background-color,border-color,translate] duration-[var(--motion-fast)] ease-[var(--ease-standard)] before:absolute before:top-0 before:left-space-6 before:h-px before:w-space-12 before:bg-accent hover:border-border-strong hover:bg-surface-raised motion-safe:hover:translate-y-[var(--lift-button)] motion-reduce:translate-none motion-reduce:transition-[background-color,border-color] lg:p-space-8 lg:before:left-space-8",
      )}
    >
      <div className="flex items-start justify-between gap-space-6">
        <Heading
          id={`skill-group-${group.id}`}
          className="text-heading-md font-semibold text-text"
        >
          {group.label}
        </Heading>
        <span
          aria-hidden="true"
          className="font-sans text-eyebrow font-semibold text-text-muted"
        >
          {String(group.skills.length).padStart(2, "0")}
        </span>
      </div>
      {group.description ? (
        <p className="mt-space-3 max-w-prose text-body-sm text-pretty text-text-muted">
          {group.description}
        </p>
      ) : null}

      {variant === "list" ? (
        <ul className="mt-space-6 divide-y divide-border">
          {group.skills.map((skill) => (
            <li
              key={skill.id}
              className="flex min-h-11 items-center justify-between gap-space-4 py-space-2 text-body-md text-text-secondary"
            >
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-space-6 flex flex-wrap gap-space-2">
          {group.skills.map((skill) => (
            <li key={skill.id}>
              <Tag size="md" variant="outline">
                {skill.name}
              </Tag>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
