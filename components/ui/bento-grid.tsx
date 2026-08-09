import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export function BentoGrid<TElement extends ElementType = "div">({
  as,
  className,
  children,
}: {
  readonly as?: TElement;
  readonly className?: string;
  readonly children?: ReactNode;
}) {
  const Component = as ?? "div";

  return (
    <Component
      data-slot="bento-grid"
      className={cn(
        "grid grid-cols-1 gap-space-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-6",
        className,
      )}
    >
      {children}
    </Component>
  );
}
