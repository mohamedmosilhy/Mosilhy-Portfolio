import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/ui/skip-link";
import { getHomePageModel } from "@/lib/content/site-content";

export default async function SiteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const model = await getHomePageModel();

  return (
    <>
      <SkipLink targetId="main-content" />
      <SiteHeader brand={model.metadata.shortName} items={model.navigation} />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter
        profile={model.profile}
        socialLinks={model.socialLinks}
        navigation={model.navigation}
        year={new Date().getFullYear()}
      />
    </>
  );
}
