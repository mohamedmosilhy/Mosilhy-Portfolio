export type Slug = string;
export type ISODate = string;
export type AbsoluteUrl = `https://${string}`;
export type InternalHref = `/${string}`;
export type ExternalHref = `https://${string}` | `mailto:${string}`;

export interface ImageAsset {
  readonly kind: "image";
  readonly src: `/${string}`;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
  readonly decorative?: boolean;
}

export interface VideoAsset {
  readonly kind: "video";
  readonly src: `/${string}` | `https://${string}`;
  readonly poster: ImageAsset;
  readonly title: string;
  readonly caption?: string;
}

export type MediaAsset = ImageAsset | VideoAsset;

export type SocialPlatform = "github" | "linkedin" | "email" | "website";

export interface SocialLink {
  readonly id: Slug;
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly href: ExternalHref;
  readonly newTab: boolean;
  readonly order: number;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "mobile"
  | "ai-data"
  | "creative-coding"
  | "tools";
export type SkillId = Slug;

export interface Skill {
  readonly id: SkillId;
  readonly name: string;
  readonly category: SkillCategory;
  readonly description?: string;
  readonly featured: boolean;
  readonly order: number;
}

export interface SkillGroup {
  readonly id: SkillCategory;
  readonly label: string;
  readonly description?: string;
  readonly order: number;
  readonly skills: readonly Skill[];
}

export interface TestimonialPerson {
  readonly name: string;
  readonly position: string;
  readonly company: string;
  readonly photo: ImageAsset;
}

export interface Testimonial {
  readonly id: Slug;
  readonly quote: string;
  readonly person: TestimonialPerson;
  readonly projectSlug?: Slug;
  readonly featured: boolean;
  readonly order: number;
}

export interface ExperienceSummary {
  readonly id: Slug;
  readonly label: string;
  readonly value: string;
  readonly order: number;
}

export interface Interest {
  readonly id: Slug;
  readonly label: string;
  readonly description?: string;
  readonly order: number;
}

export interface JourneyChapter {
  readonly id: Slug;
  readonly period: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly evidence: readonly string[];
  readonly order: number;
}

export interface ProfileCta {
  readonly label: string;
  readonly href: InternalHref | ExternalHref;
}

export interface Profile {
  readonly greeting: string;
  readonly name: string;
  readonly role: string;
  readonly introduction: string;
  readonly biography: readonly string[];
  readonly journey: readonly JourneyChapter[];
  readonly experience: readonly ExperienceSummary[];
  readonly interests: readonly Interest[];
  readonly location?: string;
  readonly availability?: string;
  readonly portrait?: ImageAsset;
  readonly email: ExternalHref;
  readonly primaryCta: ProfileCta & {
    readonly href: InternalHref;
  };
  readonly secondaryCta: ProfileCta;
}

export interface ProjectLinks {
  readonly github: AbsoluteUrl;
  readonly live?: AbsoluteUrl;
  readonly video?: AbsoluteUrl;
  readonly paper?: AbsoluteUrl;
}

export interface ProjectTimeline {
  readonly startedAt: ISODate;
  readonly completedAt?: ISODate;
  readonly updatedAt: ISODate;
}

export interface SeoFields {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath?: InternalHref;
  readonly socialImage?: ImageAsset;
  readonly noIndex?: boolean;
}

export type ProjectStatus = "draft" | "published";
export type ProjectCategory =
  | "frontend-web"
  | "backend-full-stack"
  | "mobile-applications"
  | "ai-data-scientific"
  | "cs50-work";
export type GalleryLayout = "stack" | "grid" | "carousel";

export interface ProjectGallery {
  readonly layout: GalleryLayout;
  readonly items: readonly MediaAsset[];
}

export interface ProjectFrontmatter {
  readonly slug: Slug;
  readonly title: string;
  readonly summary: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly featured: boolean;
  readonly featuredOrder?: number;
  readonly projectOrder: number;
  readonly timeline: ProjectTimeline;
  readonly technologies: readonly SkillId[];
  readonly links: ProjectLinks;
  readonly cover?: ImageAsset;
  readonly gallery: ProjectGallery;
  readonly seo: SeoFields;
}

export type PageStatus = "draft" | "published";

/**
 * Metadata for a conventional content page whose body is authored separately
 * as constrained MDX. Stable IDs survive URL changes; `path` owns routing.
 */
export interface PageFrontmatter {
  readonly id: Slug;
  readonly path: InternalHref;
  readonly title: string;
  readonly summary: string;
  readonly status: PageStatus;
  readonly pageOrder?: number;
  readonly publishedAt?: ISODate;
  readonly updatedAt: ISODate;
  readonly seo: SeoFields;
}

export interface SiteMetadata {
  readonly siteName: string;
  readonly shortName: string;
  readonly titleTemplate: string;
  readonly defaultTitle: string;
  readonly description: string;
  readonly siteUrl: AbsoluteUrl;
  readonly locale: "en";
  readonly authorName: string;
  readonly keywords: readonly string[];
  readonly defaultSocialImage: ImageAsset;
  readonly socialLinks: readonly SocialLink[];
}

export interface ProjectSummary {
  readonly slug: Slug;
  readonly title: string;
  readonly summary: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly technologies: readonly Skill[];
  readonly links: ProjectLinks;
  readonly cover?: ImageAsset;
  readonly featured: boolean;
  readonly featuredOrder?: number;
  readonly projectOrder: number;
}

/**
 * Opaque server-only result produced after a project's constrained MDX body
 * passes structure validation and compilation.
 */
export interface CompiledMdx {
  readonly code: string;
}

export interface ProjectDetail<TBody = CompiledMdx> extends ProjectSummary {
  readonly timeline: ProjectTimeline;
  readonly gallery: ProjectGallery;
  readonly seo: SeoFields;
  readonly body: TBody;
}
