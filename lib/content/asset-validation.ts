import "server-only";

import { open, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";

import {
  ContentValidationError,
  type ContentIssue,
  type ContentCatalogSourceContext,
  type ValidatedContentCatalog,
} from "@/lib/content/content-validation";
import type { ImageAsset, MediaAsset, VideoAsset } from "@/types/content";

const imageExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);
const videoExtensions = new Set([".mp4", ".ogg", ".webm"]);

interface AssetReference {
  readonly asset: ImageAsset | VideoAsset;
  readonly source: string;
  readonly path: readonly PropertyKey[];
}

async function detectAssetKind(
  filePath: string,
): Promise<"image" | "video" | "unknown"> {
  const file = await open(/* turbopackIgnore: true */ filePath, "r");
  const bytes = Buffer.alloc(512);

  try {
    const { bytesRead } = await file.read(bytes, 0, bytes.length, 0);
    const header = bytes.subarray(0, bytesRead);
    const ascii = header.toString("ascii");
    const text = header.toString("utf8").trimStart();

    if (
      header
        .subarray(0, 8)
        .equals(
          Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        ) ||
      header.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])) ||
      ascii.startsWith("GIF87a") ||
      ascii.startsWith("GIF89a") ||
      (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") ||
      (ascii.slice(4, 8) === "ftyp" &&
        /\bavi[fs]\b/.test(ascii.slice(8, 40))) ||
      text.startsWith("<svg") ||
      (text.startsWith("<?xml") && text.includes("<svg"))
    ) {
      return "image";
    }

    if (
      header.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])) ||
      ascii.startsWith("OggS") ||
      ascii.slice(4, 8) === "ftyp"
    ) {
      return "video";
    }

    return "unknown";
  } finally {
    await file.close();
  }
}

function addMediaReference(
  references: AssetReference[],
  asset: MediaAsset,
  source: string,
  path: readonly PropertyKey[],
) {
  references.push({ asset, source, path });
}

function collectAssetReferences(
  catalog: ValidatedContentCatalog,
  sources: ContentCatalogSourceContext,
) {
  const references: AssetReference[] = [];

  if (catalog.profile.portrait !== undefined) {
    references.push({
      asset: catalog.profile.portrait,
      source: sources.profile,
      path: ["portrait"],
    });
  }

  references.push({
    asset: catalog.siteMetadata.defaultSocialImage,
    source: sources.siteMetadata,
    path: ["defaultSocialImage"],
  });

  catalog.testimonials.forEach((testimonial, index) => {
    references.push({
      asset: testimonial.person.photo,
      source: sources.testimonials,
      path: [index, "person", "photo"],
    });
  });

  catalog.pages.forEach((page, index) => {
    if (page.seo.socialImage !== undefined) {
      references.push({
        asset: page.seo.socialImage,
        source: sources.pages[index]?.source ?? "<pages>",
        path: ["seo", "socialImage"],
      });
    }
  });

  catalog.projects.forEach((project, projectIndex) => {
    const source = sources.projects[projectIndex]?.source ?? "<projects>";
    if (project.cover !== undefined) {
      references.push({ asset: project.cover, source, path: ["cover"] });
    }

    project.gallery.items.forEach((asset, assetIndex) => {
      addMediaReference(references, asset, source, [
        "gallery",
        "items",
        assetIndex,
      ]);
    });

    if (project.seo.socialImage !== undefined) {
      references.push({
        asset: project.seo.socialImage,
        source,
        path: ["seo", "socialImage"],
      });
    }
  });

  return references;
}

function localPaths(reference: AssetReference): readonly {
  readonly src: `/${string}`;
  readonly kind: "image" | "video";
  readonly path: readonly PropertyKey[];
}[] {
  if (reference.asset.kind === "image") {
    return [
      {
        src: reference.asset.src,
        kind: "image" as const,
        path: reference.path,
      },
    ];
  }

  const paths: {
    readonly src: `/${string}`;
    readonly kind: "image" | "video";
    readonly path: readonly PropertyKey[];
  }[] = [
    {
      src: reference.asset.poster.src,
      kind: "image" as const,
      path: [...reference.path, "poster"],
    },
  ];

  if (reference.asset.src.startsWith("/")) {
    paths.push({
      src: reference.asset.src as `/${string}`,
      kind: "video" as const,
      path: [...reference.path, "src"],
    });
  }

  return paths;
}

export async function validateAssetReferences(
  catalog: ValidatedContentCatalog,
  sources: ContentCatalogSourceContext,
  publicDirectory: string,
) {
  const issues: ContentIssue[] = [];
  const references = collectAssetReferences(catalog, sources);

  await Promise.all(
    references.flatMap((reference) =>
      localPaths(reference).map(async ({ src, kind, path }) => {
        const extension = extname(src).toLocaleLowerCase("en");
        const expectedExtensions =
          kind === "image" ? imageExtensions : videoExtensions;

        if (!expectedExtensions.has(extension)) {
          issues.push({
            code: "asset-kind-mismatch",
            source: reference.source,
            path,
            valueCategory: `${extension || "extensionless"} asset path`,
            expected: `a local ${kind} path with a supported ${kind} extension`,
            message: `asset path does not match its declared ${kind} kind`,
          });
          return;
        }

        const filePath = resolve(publicDirectory, `.${src}`);

        try {
          const file = await stat(/* turbopackIgnore: true */ filePath);

          if (!file.isFile()) {
            throw new Error("not a file");
          }

          const detectedKind = await detectAssetKind(filePath);

          if (detectedKind !== kind) {
            issues.push({
              code: "asset-kind-mismatch",
              source: reference.source,
              path,
              valueCategory: `${detectedKind} file`,
              expected: `a file whose contents match the declared ${kind} kind`,
              message: `asset file "${src}" does not match its declared ${kind} kind`,
            });
          }
        } catch {
          issues.push({
            code: "missing-asset",
            source: reference.source,
            path,
            valueCategory: "unresolved local asset path",
            expected: `an existing file at ${filePath}`,
            message: `referenced local asset "${src}" does not exist`,
          });
        }
      }),
    ),
  );

  if (issues.length > 0) {
    throw new ContentValidationError(issues);
  }
}
