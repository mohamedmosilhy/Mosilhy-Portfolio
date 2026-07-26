import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const variants = {
  note: "border-border-strong bg-surface text-text-secondary",
  decision: "border-accent bg-accent-subtle text-text-secondary",
  warning: "border-warning bg-surface text-text-secondary",
} as const;

export interface CalloutProps {
  readonly title?: string;
  readonly variant?: keyof typeof variants;
  readonly children: ReactNode;
}

export function Callout({ title, variant = "note", children }: CalloutProps) {
  return (
    <aside
      data-slot="callout"
      data-variant={variant}
      className={cn(
        "rounded-lg border-s-2 p-space-6 [&>*+*]:mt-space-4",
        variants[variant],
      )}
    >
      {title ? <p className="font-semibold text-text">{title}</p> : null}
      {children}
    </aside>
  );
}
