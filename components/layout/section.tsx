import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const spacings = {
  compact: "py-space-12",
  default: "py-space-16 lg:py-space-20",
  spacious: "py-space-20 lg:py-space-32",
} as const;

const surfaces = {
  canvas: "bg-canvas",
  subtle: "bg-surface",
  raised: "bg-surface-raised",
} as const;

export interface SectionProps {
  readonly id?: string;
  readonly ariaLabelledBy?: string;
  readonly as?: ElementType;
  readonly spacing?: keyof typeof spacings;
  readonly surface?: keyof typeof surfaces;
  readonly children: ReactNode;
}

export function Section({
  id,
  ariaLabelledBy,
  as: Component = "section",
  spacing = "default",
  surface = "canvas",
  children,
}: SectionProps) {
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledBy}
      data-slot="section"
      data-spacing={spacing}
      data-surface={surface}
      className={cn("scroll-mt-space-20", spacings[spacing], surfaces[surface])}
    >
      {children}
    </Component>
  );
}
