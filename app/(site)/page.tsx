import { HeroSection } from "@/features/home/hero-section";
import { ProjectsSection } from "@/features/projects/projects-section";
import { getHomePageModel } from "@/lib/content/site-content";

export default async function HomePage() {
  const model = await getHomePageModel();

  return (
    <>
      <HeroSection profile={model.profile} socialLinks={model.socialLinks} />
      <ProjectsSection
        projects={model.featuredProjects}
        heading="Selected projects"
      />
    </>
  );
}
