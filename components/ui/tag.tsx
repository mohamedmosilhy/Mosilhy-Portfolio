import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const tagVariants = cva(
  "inline-flex w-fit items-center rounded-full border font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-surface-raised text-text-secondary",
        accent: "border-accent/30 bg-accent-subtle text-accent-hover",
        outline: "border-border-strong bg-transparent text-text-secondary",
      },
      size: {
        sm: "min-h-6 px-space-2 py-space-1 text-eyebrow",
        md: "min-h-8 px-space-3 py-space-1 text-body-sm",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "sm",
    },
  },
);

export interface TagProps extends VariantProps<typeof tagVariants> {
  readonly children: ReactNode;
}

export function Tag({ children, variant, size }: TagProps) {
  return (
    <span
      data-slot="tag"
      data-size={size ?? "sm"}
      data-variant={variant ?? "neutral"}
      className={cn(tagVariants({ variant, size }))}
    >
      {children}
    </span>
  );
}
