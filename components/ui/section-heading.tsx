import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

const headingElements: Record<HeadingLevel, ElementType> = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const sizes = {
  lg: "text-heading-lg",
  xl: "font-display text-heading-xl font-medium text-text",
} as const;

export interface SectionHeadingProps {
  readonly id?: string;
  readonly title: ReactNode;
  readonly eyebrow?: ReactNode;
  readonly description?: ReactNode;
  readonly headingLevel?: HeadingLevel;
  readonly action?: ReactNode;
  readonly variant?: "default" | "centered" | "split";
  readonly size?: keyof typeof sizes;
  readonly align?: "start" | "center";
}

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  headingLevel = 2,
  action,
  variant = "default",
  size = "xl",
  align,
}: SectionHeadingProps) {
  const Heading = headingElements[headingLevel];
  const centered =
    align === "center" || (align === undefined && variant === "centered");
  const content = (
    <div className={cn("max-w-prose", centered && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-space-3 font-mono text-eyebrow font-medium tracking-[var(--eyebrow-tracking)] text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "font-semibold text-balance text-text",
          sizes[size],
          size === "lg" && "font-sans",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <div className="mt-space-4 max-w-prose text-body-lg text-pretty text-text-secondary">
          {description}
        </div>
      ) : null}
    </div>
  );

  if (variant === "split") {
    return (
      <div
        data-slot="section-heading"
        data-variant={variant}
        className="flex flex-col gap-space-6 md:flex-row md:items-end md:justify-between"
      >
        {content}
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    );
  }

  return (
    <div
      data-slot="section-heading"
      data-variant={variant}
      className={cn(centered && "text-center")}
    >
      {content}
      {action ? (
        <div className={cn("mt-space-6", centered && "flex justify-center")}>
          {action}
        </div>
      ) : null}
    </div>
  );
}
