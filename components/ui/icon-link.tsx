import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { ExternalHref, InternalHref } from "@/types/content";

const variants = {
  default:
    "bg-surface-raised text-text-secondary hover:bg-surface-hover hover:text-text",
  quiet:
    "bg-transparent text-text-muted hover:bg-surface-hover hover:text-text",
  bordered:
    "border-border-strong bg-transparent text-text-secondary hover:border-text-muted hover:bg-surface-raised hover:text-text",
} as const;

const sizes = {
  md: "h-11 min-w-11 gap-space-2 px-space-3 text-label [&_[data-icon]]:size-5",
  lg: "h-[3.25rem] min-w-[3.25rem] gap-space-3 px-space-4 text-body-md [&_[data-icon]]:size-6",
} as const;

export interface IconLinkProps {
  readonly href: InternalHref | ExternalHref;
  readonly label: string;
  readonly icon: ReactNode;
  readonly variant?: keyof typeof variants;
  readonly size?: keyof typeof sizes;
  readonly newTab?: boolean;
  readonly showLabel?: boolean;
}

export function IconLink({
  href,
  label,
  icon,
  variant = "default",
  size = "md",
  newTab = false,
  showLabel = false,
}: IconLinkProps) {
  const accessibleLabel = `${label}${newTab ? " (opens in a new tab)" : ""}`;
  const className = cn(
    "inline-flex shrink-0 items-center justify-center rounded-md border border-transparent font-medium outline-none transition-[color,background-color,border-color] duration-[var(--motion-fast)] ease-[var(--ease-standard)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none",
    variants[variant],
    sizes[size],
    !showLabel && size === "md" && "w-11 px-0",
    !showLabel && size === "lg" && "w-[3.25rem] px-0",
  );
  const contents = (
    <>
      <span
        data-icon
        aria-hidden="true"
        className="inline-flex shrink-0 items-center justify-center [&>svg]:size-full [&>svg]:stroke-[1.75]"
      >
        {icon}
      </span>
      {showLabel ? <span>{label}</span> : null}
    </>
  );
  const sharedProps = {
    "aria-label": accessibleLabel,
    className,
    rel: newTab ? "noopener noreferrer" : undefined,
    target: newTab ? "_blank" : undefined,
  } as const;

  return href.startsWith("/") ? (
    <Link href={href} {...sharedProps}>
      {contents}
    </Link>
  ) : (
    <a href={href} {...sharedProps}>
      {contents}
    </a>
  );
}
