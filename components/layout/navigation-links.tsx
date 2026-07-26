import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import type { NavigationItem } from "@/types/navigation";

const listVariants = {
  desktop: "flex items-center gap-space-1",
  footer: "flex flex-wrap gap-x-space-2 gap-y-space-1",
} as const;

const linkVariants = {
  desktop:
    "relative inline-flex min-h-11 items-center rounded-md px-space-3 text-label font-medium text-text-muted outline-none transition-colors duration-[var(--motion-fast)] ease-[var(--ease-standard)] after:absolute after:inset-x-space-3 after:bottom-space-2 after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-[var(--motion-fast)] hover:text-text hover:after:scale-x-100 focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:after:scale-x-100 aria-[current=location]:text-text aria-[current=location]:after:scale-x-100 aria-[current=page]:text-text aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none motion-reduce:transition-none",
  footer:
    "inline-flex min-h-11 items-center rounded-md px-space-2 text-body-sm text-text-muted outline-none transition-colors duration-[var(--motion-fast)] hover:text-text focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas aria-[current=page]:text-text motion-reduce:transition-none",
} as const;

export interface NavigationLinksProps {
  readonly items: readonly NavigationItem[];
  readonly variant: keyof typeof listVariants;
  readonly currentPath?: string;
  readonly activeSectionId?: string | null;
}

export function NavigationLinks({
  items,
  variant,
  currentPath,
  activeSectionId,
}: NavigationLinksProps) {
  const visibleItems = items.filter((item) =>
    variant === "desktop" ? item.showInHeader : item.showInFooter,
  );

  return (
    <nav
      aria-label={variant === "desktop" ? "Primary" : "Footer"}
      data-slot="main-navigation"
      data-variant={variant}
    >
      <ul className={listVariants[variant]}>
        {visibleItems.map((item) => {
          const isActiveSection =
            item.sectionId !== undefined && item.sectionId === activeSectionId;
          const hrefPath = item.href.split("#", 1)[0] || "/";
          const isCurrentPage =
            item.sectionId === undefined && currentPath === hrefPath;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={
                  isActiveSection
                    ? "location"
                    : isCurrentPage
                      ? "page"
                      : undefined
                }
                className={cn(linkVariants[variant])}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
