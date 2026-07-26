import { AboutSection } from "@/features/home/about-section";
import { ContactSection } from "@/features/home/contact-section";
import { HeroSection } from "@/features/home/hero-section";
import { SkillsSection } from "@/features/home/skills-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";
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
      <SkillsSection groups={model.skillGroups} heading="Skills" />
      {model.testimonials.length > 0 ? (
        <TestimonialsSection
          testimonials={model.testimonials}
          heading="Testimonials"
        />
      ) : null}
      <AboutSection profile={model.profile} />
      <ContactSection
        heading="Contact"
        email={model.profile.email}
        socialLinks={model.socialLinks}
      />
    </>
  );
}
