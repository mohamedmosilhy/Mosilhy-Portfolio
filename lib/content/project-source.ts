import "server-only";

import { readFile, readdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

import {
  ContentValidationError,
  type ContentIssue,
  type SourcedProjectRecord,
} from "@/lib/content/content-validation";
import type { CompiledMdx } from "@/types/content";

const requiredSequence = [
  { type: "heading", name: "Overview" },
  { type: "block", name: "ProjectGallery" },
  { type: "heading", name: "Features" },
  { type: "heading", name: "Architecture" },
  { type: "block", name: "ProjectTechnologies" },
  { type: "heading", name: "Challenges" },
  { type: "heading", name: "Lessons learned" },
  { type: "block", name: "ProjectActions" },
] as const;

const allowedBlocks: ReadonlySet<string> = new Set(
  requiredSequence
    .filter((entry) => entry.type === "block")
    .map((entry) => entry.name),
);
const allowedHeadings: ReadonlySet<string> = new Set(
  requiredSequence
    .filter((entry) => entry.type === "heading")
    .map((entry) => entry.name),
);

interface SyntaxNode {
  readonly type: string;
  readonly depth?: number;
  readonly name?: string | null;
  readonly value?: string;
  readonly attributes?: readonly unknown[];
  readonly children?: readonly SyntaxNode[];
}

export interface ParsedProjectSource extends SourcedProjectRecord {
  readonly body: string;
}

export interface CompiledProjectSource extends ParsedProjectSource {
  readonly compiledBody: CompiledMdx;
}

function issue(
  source: string,
  message: string,
  expected: string,
  valueCategory = "MDX document",
): ContentIssue {
  return {
    code: "invalid-mdx",
    source,
    path: ["body"],
    valueCategory,
    expected,
    message,
  };
}

function nodeText(node: SyntaxNode): string {
  if (typeof node.value === "string") {
    return node.value;
  }

  return (node.children ?? []).map(nodeText).join("");
}

function walk(
  node: SyntaxNode,
  parent: SyntaxNode | undefined,
  visit: (node: SyntaxNode, parent: SyntaxNode | undefined) => void,
) {
  visit(node, parent);

  node.children?.forEach((child) => walk(child, node, visit));
}

function formatSequence(
  sequence: readonly { readonly type: string; readonly name: string }[],
) {
  return sequence
    .map((entry) =>
      entry.type === "heading" ? `## ${entry.name}` : `<${entry.name} />`,
    )
    .join(" → ");
}

export function validateProjectMdxStructure(body: string, source: string) {
  let tree: SyntaxNode;

  try {
    tree = unified().use(remarkParse).use(remarkMdx).parse(body) as SyntaxNode;
  } catch {
    throw new ContentValidationError([
      issue(
        source,
        "project body could not be parsed as MDX",
        "valid Markdown plus the three allowlisted project blocks",
        "unparseable MDX",
      ),
    ]);
  }

  const issues: ContentIssue[] = [];
  const actualSequence: { type: "heading" | "block"; name: string }[] = [];

  for (const child of tree.children ?? []) {
    if (child.type === "heading" && child.depth === 2) {
      const name = nodeText(child).trim();
      actualSequence.push({ type: "heading", name });

      if (!allowedHeadings.has(name)) {
        issues.push(
          issue(
            source,
            `level-two heading "${name}" is not part of the project template`,
            `one of: ${[...allowedHeadings].join(", ")}`,
            "unknown level-two heading",
          ),
        );
      }
    }

    if (child.type === "mdxJsxFlowElement" && child.name !== null) {
      actualSequence.push({ type: "block", name: child.name ?? "" });
    }
  }

  walk(tree, undefined, (node, parent) => {
    if (node.type === "html") {
      issues.push(
        issue(
          source,
          "arbitrary HTML is not allowed in project content",
          "Markdown and allowlisted project blocks only",
          "HTML node",
        ),
      );
    }

    if (
      node.type === "mdxjsEsm" ||
      node.type === "mdxFlowExpression" ||
      node.type === "mdxTextExpression"
    ) {
      issues.push(
        issue(
          source,
          "imports, exports, and executable expressions are not allowed",
          "static Markdown and allowlisted project blocks only",
          node.type,
        ),
      );
    }

    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return;
    }

    const name = node.name ?? "";

    if (
      node.type !== "mdxJsxFlowElement" ||
      !allowedBlocks.has(name) ||
      parent?.type !== "root"
    ) {
      issues.push(
        issue(
          source,
          `MDX element "${name || "<fragment>"}" is not an allowlisted top-level project block`,
          [...allowedBlocks].map((block) => `<${block} />`).join(", "),
          "unknown or nested MDX element",
        ),
      );
      return;
    }

    if ((node.attributes?.length ?? 0) > 0) {
      issues.push(
        issue(
          source,
          `project block "${name}" must not receive authored props`,
          `<${name} /> with no props`,
          "MDX block with props",
        ),
      );
    }

    if ((node.children?.length ?? 0) > 0) {
      issues.push(
        issue(
          source,
          `project block "${name}" must be self-closing`,
          `<${name} />`,
          "MDX block with children",
        ),
      );
    }
  });

  if (
    actualSequence.length !== requiredSequence.length ||
    actualSequence.some((entry, index) => {
      const expected = requiredSequence[index];

      return (
        expected === undefined ||
        entry.type !== expected.type ||
        entry.name !== expected.name
      );
    })
  ) {
    issues.push(
      issue(
        source,
        `project sections and blocks are missing, duplicated, or out of order; received ${formatSequence(actualSequence) || "<empty>"}`,
        formatSequence(requiredSequence),
        "invalid template sequence",
      ),
    );
  }

  if (issues.length > 0) {
    throw new ContentValidationError(issues);
  }
}

export async function compileProjectBody(
  body: string,
  source: string,
): Promise<CompiledMdx> {
  validateProjectMdxStructure(body, source);

  try {
    const result = await compile(body, {
      development: false,
      outputFormat: "function-body",
    });

    return Object.freeze({ code: String(result) });
  } catch {
    throw new ContentValidationError([
      issue(
        source,
        "validated project body could not be compiled",
        "MDX accepted by the configured compiler",
        "MDX compilation failure",
      ),
    ]);
  }
}

export async function discoverProjectSources(
  projectsDirectory: string,
): Promise<readonly ParsedProjectSource[]> {
  let entries;

  try {
    entries = await readdir(projectsDirectory, { withFileTypes: true });
  } catch {
    throw new ContentValidationError([
      {
        code: "invalid-record",
        source: projectsDirectory,
        path: [],
        valueCategory: "missing or unreadable directory",
        expected: "a readable content/projects directory",
        message: "project content directory could not be read",
      },
    ]);
  }

  const projectPaths = entries
    .filter((entry) => entry.isFile() && extname(entry.name) === ".mdx")
    .map((entry) => join(projectsDirectory, entry.name))
    .sort((left, right) => left.localeCompare(right, "en"));

  return Object.freeze(
    await Promise.all(
      projectPaths.map(async (path) => {
        const source = path;
        const filenameSlug = basename(path, ".mdx");
        let parsed;

        try {
          parsed = matter(await readFile(path, "utf8"));
        } catch {
          throw new ContentValidationError([
            {
              code: "invalid-record",
              source,
              path: ["frontmatter"],
              valueCategory: "unreadable or invalid frontmatter",
              expected: "readable YAML frontmatter",
              message: "project source could not be parsed",
            },
          ]);
        }

        return Object.freeze({
          source,
          filenameSlug,
          value: parsed.data,
          body: parsed.content,
        });
      }),
    ),
  );
}
