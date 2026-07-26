import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = process.cwd();
const textExtensions = new Set([".md", ".mdx", ".ts", ".tsx"]);
const documentationRoots = ["README.md", "docs"];
const assetRoots = ["app", "components", "content", "features"];
const localAssetPattern =
  /["'(](\/[^"'()\s]+\.(?:avif|gif|ico|jpe?g|png|svg|webp))["')]/gi;
const markdownLinkPattern = /!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const externalUrlPattern = /https?:\/\/[^\s"'<>`)]+/g;

async function collectFiles(entry) {
  const absoluteEntry = path.join(repositoryRoot, entry);
  const entryStats = await stat(absoluteEntry);

  if (entryStats.isFile()) {
    return [entry];
  }

  const files = [];
  const children = await readdir(absoluteEntry, { withFileTypes: true });

  for (const child of children) {
    const relativeChild = path.join(entry, child.name);

    if (child.isDirectory()) {
      files.push(...(await collectFiles(relativeChild)));
    } else if (textExtensions.has(path.extname(child.name))) {
      files.push(relativeChild);
    }
  }

  return files;
}

function withoutFragmentOrQuery(value) {
  return decodeURIComponent(value.split("#", 1)[0].split("?", 1)[0]);
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function checkDocumentationLinks() {
  const files = (
    await Promise.all(documentationRoots.map((entry) => collectFiles(entry)))
  ).flat();
  const failures = [];

  for (const file of files) {
    const source = await readFile(path.join(repositoryRoot, file), "utf8");

    for (const match of source.matchAll(markdownLinkPattern)) {
      const href = match[1];

      if (
        href.startsWith("#") ||
        href.startsWith("/") ||
        /^[a-z][a-z\d+.-]*:/i.test(href)
      ) {
        continue;
      }

      const target = path.resolve(
        repositoryRoot,
        path.dirname(file),
        withoutFragmentOrQuery(href),
      );

      if (!(await exists(target))) {
        failures.push(`${file}: missing documentation target ${href}`);
      }
    }
  }

  return { checked: files.length, failures };
}

async function checkLocalAssets() {
  const files = (
    await Promise.all(assetRoots.map((entry) => collectFiles(entry)))
  ).flat();
  const assets = new Map();

  for (const file of files) {
    const source = await readFile(path.join(repositoryRoot, file), "utf8");

    for (const match of source.matchAll(localAssetPattern)) {
      const asset = match[1];
      const sources = assets.get(asset) ?? [];
      sources.push(file);
      assets.set(asset, sources);
    }
  }

  const failures = [];

  for (const [asset, sources] of assets) {
    const target = path.join(repositoryRoot, "public", asset.slice(1));

    if (!(await exists(target))) {
      failures.push(`${sources.join(", ")}: missing local asset ${asset}`);
    }
  }

  return { checked: assets.size, failures };
}

async function collectExternalUrls() {
  const files = (
    await Promise.all(assetRoots.map((entry) => collectFiles(entry)))
  ).flat();
  const urls = new Set();

  for (const file of files) {
    const source = await readFile(path.join(repositoryRoot, file), "utf8");

    for (const match of source.matchAll(externalUrlPattern)) {
      urls.add(match[0].replace(/[.,;:]$/, ""));
    }
  }

  return [...urls].sort();
}

async function checkExternalUrls() {
  const urls = await collectExternalUrls();
  const failures = [];

  for (const url of urls) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      let response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: controller.signal,
      });

      if (response.status === 405 || response.status === 501) {
        response = await fetch(url, {
          method: "GET",
          redirect: "follow",
          signal: controller.signal,
        });
      }

      if (response.status === 404 || response.status === 410) {
        failures.push(`${url}: returned ${response.status}`);
      } else {
        console.log(`reachable ${response.status}: ${url}`);
      }
    } catch (error) {
      failures.push(
        `${url}: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  return { checked: urls.length, failures };
}

const documentation = await checkDocumentationLinks();
const assets = await checkLocalAssets();
const external = process.argv.includes("--external")
  ? await checkExternalUrls()
  : { checked: 0, failures: [] };
const failures = [
  ...documentation.failures,
  ...assets.failures,
  ...external.failures,
];

console.log(
  `Checked ${documentation.checked} documentation files, ${assets.checked} local asset references, and ${external.checked} external URLs.`,
);

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
