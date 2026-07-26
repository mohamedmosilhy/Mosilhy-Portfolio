import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const buildDirectory = join(process.cwd(), ".next");
const chunkDirectory = join(buildDirectory, "static", "chunks");
const manifestPath = join(buildDirectory, "build-manifest.json");

const budgets = Object.freeze({
  largestChunkGzipBytes: 75_000,
  rootMainGzipBytes: 145_000,
  allRouteChunksGzipBytes: 260_000,
});

async function gzipSize(path) {
  return gzipSync(await readFile(path), { level: 9 }).byteLength;
}

async function main() {
  let chunkNames;
  let manifest;

  try {
    [chunkNames, manifest] = await Promise.all([
      readdir(chunkDirectory),
      readFile(manifestPath, "utf8").then(JSON.parse),
    ]);
  } catch {
    throw new Error(
      "No production build was found. Run `pnpm build` before checking bundle budgets.",
    );
  }

  const chunkEntries = await Promise.all(
    chunkNames
      .filter((name) => name.endsWith(".js"))
      .map(async (name) => ({
        name,
        gzipBytes: await gzipSize(join(chunkDirectory, name)),
      })),
  );
  const chunkSizes = new Map(
    chunkEntries.map(({ name, gzipBytes }) => [name, gzipBytes]),
  );
  const rootMainGzipBytes = manifest.rootMainFiles.reduce(
    (total, path) => total + (chunkSizes.get(path.split("/").at(-1)) ?? 0),
    0,
  );
  const allRouteChunksGzipBytes = chunkEntries.reduce(
    (total, chunk) => total + chunk.gzipBytes,
    0,
  );
  const largestChunk = chunkEntries.toSorted(
    (left, right) => right.gzipBytes - left.gzipBytes,
  )[0];

  const measurements = {
    largestChunkGzipBytes: largestChunk?.gzipBytes ?? 0,
    rootMainGzipBytes,
    allRouteChunksGzipBytes,
  };
  const failures = Object.entries(budgets).filter(
    ([key, budget]) => measurements[key] > budget,
  );

  console.table({
    "largest client chunk": {
      gzipBytes: measurements.largestChunkGzipBytes,
      budgetBytes: budgets.largestChunkGzipBytes,
      detail: largestChunk?.name ?? "none",
    },
    "shared root chunks": {
      gzipBytes: rootMainGzipBytes,
      budgetBytes: budgets.rootMainGzipBytes,
      detail: `${manifest.rootMainFiles.length} chunks`,
    },
    "all route chunks": {
      gzipBytes: allRouteChunksGzipBytes,
      budgetBytes: budgets.allRouteChunksGzipBytes,
      detail: `${chunkEntries.length} chunks`,
    },
  });

  if (failures.length > 0) {
    const summary = failures
      .map(
        ([key, budget]) =>
          `${key}: ${measurements[key]} bytes exceeds ${budget} bytes`,
      )
      .join("; ");

    throw new Error(`Client bundle budget exceeded: ${summary}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
