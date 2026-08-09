import type { z } from "zod";

import {
  navigationSchema,
  profileSchema,
  siteMetadataSchema,
  skillGroupsSchema,
  socialLinksSchema,
  testimonialsSchema,
} from "@/lib/content/content-schemas";
import { pageFrontmatterSchema } from "@/lib/content/page-schema";
import { projectFrontmatterSchema } from "@/lib/content/project-schema";
import type {
  PageFrontmatter,
  Profile,
  ProjectFrontmatter,
  SiteMetadata,
  SkillGroup,
  SocialLink,
  Testimonial,
} from "@/types/content";
import type { NavigationItem } from "@/types/navigation";

export type ContentIssueCode =
  | "invalid-record"
  | "invalid-mdx"
  | "missing-asset"
  | "asset-kind-mismatch"
  | "duplicate-value"
  | "unresolved-reference"
  | "source-mismatch"
  | "missing-required-record"
  | "inconsistent-record"
  | "placeholder-value"
  | "invalid-order";

export interface ContentIssue {
  readonly code: ContentIssueCode;
  readonly source: string;
  readonly path: readonly PropertyKey[];
  readonly valueCategory: string;
  readonly expected: string;
  readonly message: string;
}

export interface SourcedRecord {
  readonly source: string;
  readonly value: unknown;
}

export interface SourcedProjectRecord extends SourcedRecord {
  readonly filenameSlug: string;
}

export interface SourcedPageRecord extends SourcedRecord {
  readonly filenameId: string;
}

export interface ContentCatalogInput {
  readonly profile: SourcedRecord;
  readonly navigation: SourcedRecord;
  readonly socialLinks: SourcedRecord;
  readonly skillGroups: SourcedRecord;
  readonly testimonials: SourcedRecord;
  readonly siteMetadata: SourcedRecord;
  readonly pages: readonly SourcedPageRecord[];
  readonly projects: readonly SourcedProjectRecord[];
}

export interface ValidatedContentCatalog {
  readonly profile: Profile;
  readonly navigation: readonly NavigationItem[];
  readonly socialLinks: readonly SocialLink[];
  readonly skillGroups: readonly SkillGroup[];
  readonly testimonials: readonly Testimonial[];
  readonly siteMetadata: SiteMetadata;
  readonly pages: readonly PageFrontmatter[];
  readonly projects: readonly ProjectFrontmatter[];
}

export interface ContentCatalogSourceContext {
  readonly profile: string;
  readonly navigation: string;
  readonly socialLinks: string;
  readonly skillGroups: string;
  readonly testimonials: string;
  readonly siteMetadata: string;
  readonly pages: readonly {
    readonly source: string;
    readonly filenameId: string;
  }[];
  readonly projects: readonly {
    readonly source: string;
    readonly filenameSlug: string;
  }[];
}

function getValueAtPath(value: unknown, path: readonly PropertyKey[]) {
  return path.reduce<unknown>((current, segment) => {
    if (
      current === null ||
      current === undefined ||
      (typeof current !== "object" && !Array.isArray(current))
    ) {
      return undefined;
    }

    return Reflect.get(current, segment);
  }, value);
}

function describeValue(value: unknown) {
  if (value === undefined) {
    return "missing value";
  }

  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return `array (${value.length} items)`;
  }

  if (typeof value === "string") {
    return value.length === 0
      ? "empty string"
      : `string (${value.length} characters)`;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? "number" : "non-finite number";
  }

  if (typeof value === "object") {
    return "object";
  }

  return typeof value;
}

function formatPath(path: readonly PropertyKey[]) {
  if (path.length === 0) {
    return "<root>";
  }

  return path.reduce<string>((formatted, segment) => {
    if (typeof segment === "number") {
      return `${formatted}[${segment}]`;
    }

    const value = String(segment);

    return formatted.length === 0 ? value : `${formatted}.${value}`;
  }, "");
}

export function formatContentIssue(issue: ContentIssue) {
  return `${issue.source}:${formatPath(issue.path)} — ${issue.message} (received ${issue.valueCategory}; expected ${issue.expected})`;
}

export class ContentValidationError extends Error {
  readonly issues: readonly ContentIssue[];

  constructor(issues: readonly ContentIssue[]) {
    super(
      `Content validation failed with ${issues.length} ${issues.length === 1 ? "issue" : "issues"}:\n${issues
        .map((issue) => `- ${formatContentIssue(issue)}`)
        .join("\n")}`,
    );
    this.name = "ContentValidationError";
    this.issues = Object.freeze([...issues]);
  }
}

function toSchemaIssues(
  source: string,
  value: unknown,
  error: z.ZodError,
): readonly ContentIssue[] {
  return error.issues.map((issue) => ({
    code: "invalid-record",
    source,
    path: issue.path,
    valueCategory: describeValue(getValueAtPath(value, issue.path)),
    expected: issue.message,
    message: "record does not satisfy its content schema",
  }));
}

export function validateContentRecord<T>(
  schema: z.ZodType<T>,
  record: SourcedRecord,
): T {
  const result = schema.safeParse(record.value);

  if (!result.success) {
    throw new ContentValidationError(
      toSchemaIssues(record.source, record.value, result.error),
    );
  }

  return result.data;
}

function createIssue({
  code,
  source,
  path,
  value,
  expected,
  message,
}: Omit<ContentIssue, "valueCategory"> & { readonly value: unknown }) {
  return {
    code,
    source,
    path,
    valueCategory: describeValue(value),
    expected,
    message,
  } satisfies ContentIssue;
}

function collectDuplicates<T>(
  values: readonly T[],
  getValue: (value: T) => unknown,
  getSource: (index: number, value: T) => string,
  getPath: (index: number, value: T) => readonly PropertyKey[],
  expected: string,
) {
  const issues: ContentIssue[] = [];
  const firstIndexes = new Map<unknown, number>();

  values.forEach((value, index) => {
    const candidate = getValue(value);
    const firstIndex = firstIndexes.get(candidate);

    if (firstIndex === undefined) {
      firstIndexes.set(candidate, index);
      return;
    }

    issues.push(
      createIssue({
        code: "duplicate-value",
        source: getSource(index, value),
        path: getPath(index, value),
        value: candidate,
        expected,
        message: `duplicates the value declared at ${getSource(firstIndex, values[firstIndex]!)}:${formatPath(getPath(firstIndex, values[firstIndex]!))}`,
      }),
    );
  });

  return issues;
}

function isPlaceholderUrl(value: string) {
  const hostname = new URL(value).hostname.toLocaleLowerCase("en");

  return (
    hostname === "example.com" ||
    hostname === "example.org" ||
    hostname === "example.net" ||
    hostname === "localhost" ||
    hostname.endsWith(".invalid") ||
    hostname.endsWith(".test")
  );
}

function socialLinksAgree(
  canonicalLinks: readonly SocialLink[],
  metadataLinks: readonly SocialLink[],
) {
  if (canonicalLinks.length !== metadataLinks.length) {
    return false;
  }

  return canonicalLinks.every((link, index) => {
    const metadataLink = metadataLinks[index];

    return (
      metadataLink !== undefined &&
      link.id === metadataLink.id &&
      link.platform === metadataLink.platform &&
      link.label === metadataLink.label &&
      link.href === metadataLink.href &&
      link.newTab === metadataLink.newTab &&
      link.order === metadataLink.order
    );
  });
}

export function collectCrossRecordIssues(
  catalog: ValidatedContentCatalog,
  sources: ContentCatalogSourceContext,
) {
  const issues: ContentIssue[] = [];

  issues.push(
    ...collectDuplicates(
      catalog.projects,
      (project) => project.slug,
      (index) => sources.projects[index]?.source ?? "<projects>",
      () => ["slug"],
      "a unique project slug",
    ),
    ...collectDuplicates(
      catalog.projects,
      (project) => project.projectOrder,
      (index) => sources.projects[index]?.source ?? "<projects>",
      () => ["projectOrder"],
      "a unique project order",
    ),
  );

  const featuredProjects = catalog.projects
    .map((project, projectIndex) => ({ project, projectIndex }))
    .filter(
      (
        value,
      ): value is {
        project: ProjectFrontmatter & { featuredOrder: number };
        projectIndex: number;
      } => value.project.featured && value.project.featuredOrder !== undefined,
    );

  issues.push(
    ...collectDuplicates(
      featuredProjects,
      ({ project }) => project.featuredOrder,
      (_index, { projectIndex }) =>
        sources.projects[projectIndex]?.source ?? "<projects>",
      () => ["featuredOrder"],
      "a unique featured-project order",
    ),
  );

  const skillEntries = catalog.skillGroups.flatMap((group, groupIndex) =>
    group.skills.map((skill, skillIndex) => ({
      group,
      groupIndex,
      skill,
      skillIndex,
    })),
  );

  issues.push(
    ...collectDuplicates(
      skillEntries,
      ({ skill }) => skill.id,
      () => sources.skillGroups,
      (_index, { groupIndex, skillIndex }) => [
        groupIndex,
        "skills",
        skillIndex,
        "id",
      ],
      "a globally unique skill ID",
    ),
  );

  const expectedCategoryOrder = {
    frontend: 1,
    backend: 2,
    database: 3,
    mobile: 4,
    "ai-data": 5,
    "creative-coding": 6,
    tools: 7,
  } as const;

  catalog.skillGroups.forEach((group, groupIndex) => {
    if (group.order !== expectedCategoryOrder[group.id]) {
      issues.push(
        createIssue({
          code: "invalid-order",
          source: sources.skillGroups,
          path: [groupIndex, "order"],
          value: group.order,
          expected: `${group.id} category order ${expectedCategoryOrder[group.id]}`,
          message: "skill-group order does not match the canonical sequence",
        }),
      );
    }
  });

  const skillIds = new Set(skillEntries.map(({ skill }) => skill.id));
  const publishedProjectSlugs = new Set(
    catalog.projects
      .filter((project) => project.status === "published")
      .map((project) => project.slug),
  );

  catalog.projects.forEach((project, projectIndex) => {
    const projectSource =
      sources.projects[projectIndex]?.source ?? "<projects>";
    const filenameSlug = sources.projects[projectIndex]?.filenameSlug;

    if (filenameSlug !== project.slug) {
      issues.push(
        createIssue({
          code: "source-mismatch",
          source: projectSource,
          path: ["slug"],
          value: project.slug,
          expected: `frontmatter slug matching filename "${filenameSlug}"`,
          message: "project slug does not match its source filename",
        }),
      );
    }

    project.technologies.forEach((skillId, technologyIndex) => {
      if (!skillIds.has(skillId)) {
        issues.push(
          createIssue({
            code: "unresolved-reference",
            source: projectSource,
            path: ["technologies", technologyIndex],
            value: skillId,
            expected: "an existing skill ID",
            message: "project technology reference cannot be resolved",
          }),
        );
      }
    });

    if (project.status === "published") {
      for (const linkName of ["github", "live"] as const) {
        const link = project.links[linkName];

        if (isPlaceholderUrl(link)) {
          issues.push(
            createIssue({
              code: "placeholder-value",
              source: projectSource,
              path: ["links", linkName],
              value: link,
              expected: "a real public project destination",
              message: "published project link is a known placeholder URL",
            }),
          );
        }
      }
    }
  });

  issues.push(
    ...collectDuplicates(
      catalog.testimonials,
      (testimonial) => testimonial.id,
      () => sources.testimonials,
      (index) => [index, "id"],
      "a unique testimonial ID",
    ),
    ...collectDuplicates(
      catalog.testimonials,
      (testimonial) => testimonial.order,
      () => sources.testimonials,
      (index) => [index, "order"],
      "a unique testimonial order",
    ),
  );

  catalog.testimonials.forEach((testimonial, index) => {
    if (
      testimonial.projectSlug !== undefined &&
      !publishedProjectSlugs.has(testimonial.projectSlug)
    ) {
      issues.push(
        createIssue({
          code: "unresolved-reference",
          source: sources.testimonials,
          path: [index, "projectSlug"],
          value: testimonial.projectSlug,
          expected: "the slug of a published project",
          message: "testimonial project reference cannot be resolved",
        }),
      );
    }
  });

  const requiredPlatforms = ["email", "github", "linkedin"] as const;

  requiredPlatforms.forEach((platform) => {
    if (!catalog.socialLinks.some((link) => link.platform === platform)) {
      issues.push(
        createIssue({
          code: "missing-required-record",
          source: sources.socialLinks,
          path: [],
          value: undefined,
          expected: `at least one ${platform} social link`,
          message: `required ${platform} contact destination is missing`,
        }),
      );
    }
  });

  const profileEmail = catalog.socialLinks.find(
    (link) => link.platform === "email" && link.href === catalog.profile.email,
  );

  if (profileEmail === undefined) {
    issues.push(
      createIssue({
        code: "unresolved-reference",
        source: sources.profile,
        path: ["email"],
        value: catalog.profile.email,
        expected: "an email href present in the canonical social-link catalog",
        message: "profile email does not resolve to a social link",
      }),
    );
  }

  if (
    !socialLinksAgree(catalog.socialLinks, catalog.siteMetadata.socialLinks)
  ) {
    issues.push(
      createIssue({
        code: "inconsistent-record",
        source: sources.siteMetadata,
        path: ["socialLinks"],
        value: catalog.siteMetadata.socialLinks,
        expected:
          "the canonical social-link catalog in the same order and with identical fields",
        message:
          "site metadata social links have drifted from canonical content",
      }),
    );
  }

  issues.push(
    ...collectDuplicates(
      catalog.pages,
      (page) => page.id,
      (index) => sources.pages[index]?.source ?? "<pages>",
      () => ["id"],
      "a unique page ID",
    ),
    ...collectDuplicates(
      catalog.pages,
      (page) => page.path,
      (index) => sources.pages[index]?.source ?? "<pages>",
      () => ["path"],
      "a unique page path",
    ),
  );

  const orderedPages = catalog.pages
    .map((page, pageIndex) => ({ page, pageIndex }))
    .filter(
      (
        value,
      ): value is {
        page: PageFrontmatter & { pageOrder: number };
        pageIndex: number;
      } => value.page.pageOrder !== undefined,
    );

  issues.push(
    ...collectDuplicates(
      orderedPages,
      ({ page }) => page.pageOrder,
      (_index, { pageIndex }) => sources.pages[pageIndex]?.source ?? "<pages>",
      () => ["pageOrder"],
      "a unique page order when an order is authored",
    ),
  );

  catalog.pages.forEach((page, pageIndex) => {
    const source = sources.pages[pageIndex];

    if (source?.filenameId !== page.id) {
      issues.push(
        createIssue({
          code: "source-mismatch",
          source: source?.source ?? "<pages>",
          path: ["id"],
          value: page.id,
          expected: `page ID matching filename "${source?.filenameId}"`,
          message: "page ID does not match its source filename",
        }),
      );
    }
  });

  const headerSectionOrder = catalog.navigation
    .filter(
      (
        item,
      ): item is NavigationItem & {
        sectionId: NonNullable<NavigationItem["sectionId"]>;
      } => item.showInHeader && item.sectionId !== undefined,
    )
    .sort((left, right) => left.order - right.order);
  const expectedHeaderSections = [
    "projects",
    "skills",
    "about",
    "contact",
  ] as const;
  let previousExpectedIndex = -1;

  headerSectionOrder.forEach((item) => {
    const expectedIndex = expectedHeaderSections.indexOf(item.sectionId);

    if (expectedIndex < previousExpectedIndex) {
      const itemIndex = catalog.navigation.indexOf(item);

      issues.push(
        createIssue({
          code: "invalid-order",
          source: sources.navigation,
          path: [itemIndex, "order"],
          value: item.order,
          expected: "Projects, Skills, About, Contact relative ordering",
          message: "home-section header navigation is out of canonical order",
        }),
      );
    }

    previousExpectedIndex = Math.max(previousExpectedIndex, expectedIndex);
  });

  return Object.freeze(issues);
}

function parseRecord<T>(
  schema: z.ZodType<T>,
  record: SourcedRecord,
  issues: ContentIssue[],
) {
  const result = schema.safeParse(record.value);

  if (!result.success) {
    issues.push(...toSchemaIssues(record.source, record.value, result.error));
    return undefined;
  }

  return result.data;
}

export function validateContentCatalog(
  input: ContentCatalogInput,
): ValidatedContentCatalog {
  const schemaIssues: ContentIssue[] = [];
  const profile = parseRecord(profileSchema, input.profile, schemaIssues);
  const navigation = parseRecord(
    navigationSchema,
    input.navigation,
    schemaIssues,
  );
  const socialLinks = parseRecord(
    socialLinksSchema,
    input.socialLinks,
    schemaIssues,
  );
  const skillGroups = parseRecord(
    skillGroupsSchema,
    input.skillGroups,
    schemaIssues,
  );
  const testimonials = parseRecord(
    testimonialsSchema,
    input.testimonials,
    schemaIssues,
  );
  const siteMetadata = parseRecord(
    siteMetadataSchema,
    input.siteMetadata,
    schemaIssues,
  );
  const pages = input.pages.map((page) =>
    parseRecord(pageFrontmatterSchema, page, schemaIssues),
  );
  const projects = input.projects.map((project) =>
    parseRecord(projectFrontmatterSchema, project, schemaIssues),
  );

  if (
    schemaIssues.length > 0 ||
    profile === undefined ||
    navigation === undefined ||
    socialLinks === undefined ||
    skillGroups === undefined ||
    testimonials === undefined ||
    siteMetadata === undefined ||
    pages.some((page) => page === undefined) ||
    projects.some((project) => project === undefined)
  ) {
    throw new ContentValidationError(schemaIssues);
  }

  const catalog: ValidatedContentCatalog = Object.freeze({
    profile,
    navigation,
    socialLinks,
    skillGroups,
    testimonials,
    siteMetadata,
    pages: Object.freeze(pages as PageFrontmatter[]),
    projects: Object.freeze(projects as ProjectFrontmatter[]),
  });
  const sources: ContentCatalogSourceContext = {
    profile: input.profile.source,
    navigation: input.navigation.source,
    socialLinks: input.socialLinks.source,
    skillGroups: input.skillGroups.source,
    testimonials: input.testimonials.source,
    siteMetadata: input.siteMetadata.source,
    pages: input.pages.map(({ source, filenameId }) => ({
      source,
      filenameId,
    })),
    projects: input.projects.map(({ source, filenameSlug }) => ({
      source,
      filenameSlug,
    })),
  };
  const crossRecordIssues = collectCrossRecordIssues(catalog, sources);

  if (crossRecordIssues.length > 0) {
    throw new ContentValidationError(crossRecordIssues);
  }

  return catalog;
}
