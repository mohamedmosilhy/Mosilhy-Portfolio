import { HeroSection } from "@/features/home/hero-section";
import { getHomePageModel } from "@/lib/content/site-content";

export default async function HomePage() {
  const model = await getHomePageModel();

  return (
    <HeroSection profile={model.profile} socialLinks={model.socialLinks} />
  );
}
