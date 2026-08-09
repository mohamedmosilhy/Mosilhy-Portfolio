import type { Metadata } from "next";

import type {
  ImageAsset,
  Profile,
  ProjectDetail,
  SiteMetadata,
} from "@/types/content";

export function absoluteUrl(siteUrl: string, path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

function socialImage(site: SiteMetadata, image: ImageAsset) {
  return {
    url: absoluteUrl(site.siteUrl, image.src),
    width: image.width,
    height: image.height,
    alt: image.alt,
  };
}

export function createRootMetadata(site: SiteMetadata): Metadata {
  const defaultImage = socialImage(site, site.defaultSocialImage);

  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: site.defaultTitle,
      template: site.titleTemplate,
    },
    description: site.description,
    applicationName: site.siteName,
    authors: [{ name: site.authorName, url: site.siteUrl }],
    creator: site.authorName,
    publisher: site.authorName,
    keywords: [...site.keywords],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.siteName,
      title: site.defaultTitle,
      description: site.description,
      url: site.siteUrl,
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: site.defaultTitle,
      description: site.description,
      images: [defaultImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function createHomeMetadata(
  site: SiteMetadata,
  profile: Profile,
): Metadata {
  const defaultImage = socialImage(site, site.defaultSocialImage);

  return {
    title: { absolute: site.defaultTitle },
    description: site.description,
    alternates: {
      canonical: site.siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.siteName,
      title: site.defaultTitle,
      description: site.description,
      url: site.siteUrl,
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: site.defaultTitle,
      description: profile.introduction,
      images: [defaultImage.url],
    },
  };
}

export function createProjectMetadata(
  site: SiteMetadata,
  project: ProjectDetail,
): Metadata {
  const canonicalPath =
    project.seo.canonicalPath ?? (`/projects/${project.slug}` as const);
  const canonicalUrl = absoluteUrl(site.siteUrl, canonicalPath);
  const projectImage = socialImage(
    site,
    project.seo.socialImage ?? project.cover ?? site.defaultSocialImage,
  );

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: site.siteName,
      title: project.seo.title,
      description: project.seo.description,
      url: canonicalUrl,
      modifiedTime: project.timeline.updatedAt,
      images: [projectImage],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [projectImage.url],
    },
    robots: {
      index: !project.seo.noIndex,
      follow: !project.seo.noIndex,
    },
  };
}
