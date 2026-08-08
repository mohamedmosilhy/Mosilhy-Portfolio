import Link from "next/link";

import { NavigationIcon } from "@/components/layout/navigation-icon";
import { cn } from "@/lib/utils/cn";
import type { NavigationItem } from "@/types/navigation";

const listVariants = {
  desktop: "flex items-center gap-space-1",
  footer: "flex flex-wrap gap-x-space-2 gap-y-space-1",
} as const;

const linkVariants = {
  desktop:
    "group/link inline-flex min-h-10 items-center gap-space-2 rounded-md px-space-3 text-label font-medium text-text-muted outline-none transition-[color,background-color,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover hover:text-text focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas aria-[current=location]:bg-accent-subtle aria-[current=location]:text-text aria-[current=page]:bg-accent-subtle aria-[current=page]:text-text motion-reduce:transition-none [&_[data-navigation-icon]]:size-4 [&_[data-navigation-icon]]:stroke-[1.75] [&_[data-navigation-icon]]:transition-colors hover:[&_[data-navigation-icon]]:text-accent aria-[current=location]:[&_[data-navigation-icon]]:text-accent aria-[current=page]:[&_[data-navigation-icon]]:text-accent",
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
                prefetch={false}
                aria-current={
                  isActiveSection
                    ? "location"
                    : isCurrentPage
                      ? "page"
                      : undefined
                }
                className={cn(
                  linkVariants[variant],
                  variant === "desktop" &&
                    item.id === "contact" &&
                    "bg-accent text-canvas hover:bg-accent-hover hover:text-canvas [&_[data-navigation-icon]]:text-canvas hover:[&_[data-navigation-icon]]:text-canvas",
                )}
              >
                {variant === "desktop" ? (
                  <NavigationIcon itemId={item.id} />
                ) : null}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
