import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const sizes = {
  wide: "max-w-wide",
  content: "max-w-content",
  prose: "max-w-prose",
  narrow: "max-w-narrow",
  full: "max-w-none",
} as const;

export interface ContainerProps {
  readonly as?: ElementType;
  readonly size?: keyof typeof sizes;
  readonly children: ReactNode;
  readonly className?: string;
}

export function Container({
  as: Component = "div",
  size = "content",
  children,
  className,
}: ContainerProps) {
  return (
    <Component
      data-slot="container"
      data-size={size}
      className={cn(
        "mx-auto w-full px-space-4 sm:px-space-6 lg:px-space-8",
        sizes[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
