import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { ExternalHref } from "@/types/content";

const variants = {
  inline:
    "underline decoration-border-strong decoration-1 underline-offset-4 hover:text-accent-hover hover:decoration-accent-hover",
  standalone:
    "inline-flex min-h-11 items-center gap-space-2 font-medium text-accent hover:text-accent-hover",
  muted:
    "inline-flex min-h-11 items-center gap-space-2 text-text-muted underline decoration-border-strong underline-offset-4 hover:text-text-secondary hover:decoration-text-secondary",
} as const;

export interface ExternalLinkProps {
  readonly href: ExternalHref;
  readonly children: ReactNode;
  readonly variant?: keyof typeof variants;
  readonly newTab?: boolean;
  readonly showExternalIcon?: boolean;
  readonly accessibleLabel?: string;
}

export function ExternalLink({
  href,
  children,
  variant = "inline",
  newTab = false,
  showExternalIcon = false,
  accessibleLabel,
}: ExternalLinkProps) {
  const newTabDescription = newTab ? " (opens in a new tab)" : "";
  const resolvedAccessibleLabel =
    accessibleLabel ??
    (newTab && typeof children === "string"
      ? `${children}${newTabDescription}`
      : undefined);

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      aria-label={
        accessibleLabel
          ? `${accessibleLabel}${newTabDescription}`
          : resolvedAccessibleLabel
      }
      className={cn(
        "rounded-sm transition-[color,text-decoration-color] duration-[var(--motion-fast)] ease-[var(--ease-standard)] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none",
        variants[variant],
      )}
    >
      {children}
      {newTab && !resolvedAccessibleLabel ? (
        <span className="sr-only">{newTabDescription}</span>
      ) : null}
      {showExternalIcon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="inline size-4 shrink-0"
          strokeWidth={1.75}
        />
      ) : null}
    </a>
  );
}
