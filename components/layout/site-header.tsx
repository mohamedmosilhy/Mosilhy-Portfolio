import Link from "next/link";

import { Container } from "@/components/layout/container";
import { HeaderScrollObserver } from "@/components/layout/header-scroll-observer";
import { MainNavigation } from "@/components/layout/main-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import type { NavigationItem } from "@/types/navigation";

const siteHeaderId = "site-header";

export interface SiteHeaderProps {
  readonly brand: string;
  readonly items: readonly NavigationItem[];
  readonly currentPath?: string;
}

export function SiteHeader({ brand, items, currentPath }: SiteHeaderProps) {
  return (
    <>
      <HeaderScrollObserver headerId={siteHeaderId} />
      <header
        id={siteHeaderId}
        data-slot="site-header"
        data-scrolled="false"
        className="sticky top-0 z-[var(--layer-sticky)] border-b border-transparent bg-transparent transition-[background-color,border-color,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-standard)] data-[scrolled=true]:border-border data-[scrolled=true]:bg-canvas data-[scrolled=true]:shadow-sm motion-reduce:transition-none"
      >
        <Container
          size="wide"
          className="flex min-h-16 items-center justify-between gap-space-6"
        >
          <Link
            href="/"
            aria-label={`${brand}, home`}
            className="inline-flex min-h-11 items-center rounded-md font-display text-heading-sm font-semibold text-text transition-colors duration-[var(--motion-fast)] outline-none hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none"
          >
            {brand}
          </Link>

          <div className="hidden md:block">
            <MainNavigation
              items={items}
              currentPath={currentPath}
              observeSections
            />
          </div>

          <MobileNavigation items={items} brandLabel={brand} />
        </Container>
      </header>
    </>
  );
}
