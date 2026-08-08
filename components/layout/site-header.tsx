import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
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
        className="group/header sticky top-0 z-[var(--layer-sticky)] bg-transparent py-space-2 transition-[padding] duration-[var(--motion-fast)] ease-[var(--ease-standard)] data-[scrolled=true]:py-space-1 motion-reduce:transition-none"
      >
        <Container
          size="wide"
          className="group/nav-shell relative isolate flex min-h-14 items-center justify-between gap-space-6 overflow-hidden rounded-xl border border-border bg-canvas/75 pr-space-2 pl-space-3 shadow-sm backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-[var(--motion-fast)] group-data-[scrolled=true]/header:border-border-strong group-data-[scrolled=true]/header:bg-canvas/95 group-data-[scrolled=true]/header:shadow-md motion-reduce:transition-none sm:pr-space-3"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-[6%] z-0 h-space-20 w-[32rem] -translate-y-1/2 scale-75 rounded-full bg-accent/15 opacity-0 blur-2xl transition-[opacity,transform] duration-[var(--motion-slow)] ease-[var(--ease-enter)] group-focus-within/nav-shell:scale-100 group-focus-within/nav-shell:opacity-100 group-hover/nav-shell:scale-100 group-hover/nav-shell:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-space-16 bottom-0 z-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent/70 to-transparent transition-transform duration-[var(--motion-slow)] ease-[var(--ease-enter)] group-focus-within/nav-shell:scale-x-100 group-hover/nav-shell:scale-x-100 motion-reduce:transition-none"
          />
          <Link
            href="/"
            prefetch={false}
            aria-label={`${brand}, home`}
            className="group/brand relative z-10 inline-flex min-h-11 items-center gap-space-3 rounded-md pr-space-2 text-text transition-colors duration-[var(--motion-fast)] outline-none hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none"
          >
            <BrandMark className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-standard)] group-hover/brand:scale-105 group-hover/brand:-rotate-3 motion-reduce:transition-none" />
            <span className="font-display text-heading-sm leading-none font-semibold">
              {brand}
            </span>
          </Link>

          <div className="relative z-10 hidden md:block">
            <MainNavigation
              items={items}
              currentPath={currentPath}
              observeSections
            />
          </div>

          <div className="relative z-10 md:hidden">
            <MobileNavigation items={items} brandLabel={brand} />
          </div>
        </Container>
      </header>
    </>
  );
}
