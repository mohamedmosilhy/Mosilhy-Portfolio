import type {
  Profile,
  ProjectDetail,
  ProjectSummary,
  SiteMetadata,
  SkillGroup,
  SocialLink,
  Testimonial,
} from "@/types/content";
import type { NavigationItem } from "@/types/navigation";

export interface HomePageModel {
  readonly profile: Profile;
  readonly navigation: readonly NavigationItem[];
  readonly socialLinks: readonly SocialLink[];
  readonly featuredProjects: readonly ProjectSummary[];
  readonly skillGroups: readonly SkillGroup[];
  readonly testimonials: readonly Testimonial[];
  readonly metadata: SiteMetadata;
}

export interface ProjectPageModel<TBody> {
  readonly project: ProjectDetail<TBody>;
  readonly previousProject: ProjectSummary | null;
  readonly nextProject: ProjectSummary | null;
  readonly navigation: readonly NavigationItem[];
  readonly metadata: SiteMetadata;
}
