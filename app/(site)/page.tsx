import type { Metadata } from "next";

import { StructuredData } from "@/components/metadata/structured-data";
import { AboutSection } from "@/features/home/about-section";
import { HeroSection } from "@/features/home/hero-section";
import { SkillsSection } from "@/features/home/skills-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { ProjectsSection } from "@/features/projects/projects-section";
import { getHomePageModel } from "@/lib/content/site-content";
import { createHomeMetadata } from "@/lib/metadata/create-metadata";
import { createHomeStructuredData } from "@/lib/metadata/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const model = await getHomePageModel();

  return createHomeMetadata(model.metadata, model.profile);
}

export default async function HomePage() {
  const model = await getHomePageModel();

  return (
    <>
      <StructuredData
        data={createHomeStructuredData(model.metadata, model.profile)}
      />
      <HeroSection profile={model.profile} socialLinks={model.socialLinks} />
      <ProjectsSection
        projects={model.featuredProjects}
        heading="Selected projects"
      />
      <SkillsSection groups={model.skillGroups} heading="Skills" />
      {model.testimonials.length > 0 ? (
        <TestimonialsSection
          testimonials={model.testimonials}
          heading="Testimonials"
        />
      ) : null}
      <AboutSection profile={model.profile} />
    </>
  );
}
