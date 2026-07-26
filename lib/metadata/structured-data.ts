import { absoluteUrl } from "@/lib/metadata/create-metadata";
import type { Profile, ProjectDetail, SiteMetadata } from "@/types/content";

type JsonPrimitive = string | number | boolean | null;
type JsonValue =
  | JsonPrimitive
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue | undefined };

export interface StructuredDataGraph {
  readonly "@context": "https://schema.org";
  readonly "@graph": readonly {
    readonly [key: string]: JsonValue | undefined;
  }[];
}

const personId = "#person";
const websiteId = "#website";

function publicProfileUrls(site: SiteMetadata) {
  return site.socialLinks
    .map((link) => link.href)
    .filter((href): href is `https://${string}` => href.startsWith("https://"));
}

function personNode(site: SiteMetadata, profile: Profile) {
  return {
    "@type": "Person",
    "@id": absoluteUrl(site.siteUrl, personId),
    name: profile.name,
    url: site.siteUrl,
    jobTitle: profile.role,
    description: profile.introduction,
    email: profile.email,
    image: profile.portrait
      ? absoluteUrl(site.siteUrl, profile.portrait.src)
      : undefined,
    homeLocation: profile.location,
    sameAs: publicProfileUrls(site),
  } as const;
}

export function createHomeStructuredData(
  site: SiteMetadata,
  profile: Profile,
): StructuredDataGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(site, profile),
      {
        "@type": "WebSite",
        "@id": absoluteUrl(site.siteUrl, websiteId),
        name: site.siteName,
        alternateName: site.shortName,
        url: site.siteUrl,
        description: site.description,
        inLanguage: site.locale,
        author: {
          "@id": absoluteUrl(site.siteUrl, personId),
        },
      },
    ],
  };
}

export function createProjectStructuredData(
  site: SiteMetadata,
  profile: Profile,
  project: ProjectDetail,
): StructuredDataGraph {
  const canonicalPath =
    project.seo.canonicalPath ?? (`/projects/${project.slug}` as const);

  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(site, profile),
      {
        "@type": "SoftwareSourceCode",
        "@id": absoluteUrl(site.siteUrl, `${canonicalPath}#project`),
        name: project.title,
        headline: project.seo.title,
        description: project.summary,
        url: absoluteUrl(site.siteUrl, canonicalPath),
        image: absoluteUrl(
          site.siteUrl,
          (project.seo.socialImage ?? project.cover).src,
        ),
        codeRepository: project.links.github,
        sameAs: project.links.live,
        dateCreated: project.timeline.startedAt,
        dateModified: project.timeline.updatedAt,
        keywords: project.technologies.map((technology) => technology.name),
        author: {
          "@id": absoluteUrl(site.siteUrl, personId),
        },
      },
    ],
  };
}
