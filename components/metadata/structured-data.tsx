import type { StructuredDataGraph } from "@/lib/metadata/structured-data";

export interface StructuredDataProps {
  readonly data: StructuredDataGraph;
}

export function serializeStructuredData(data: StructuredDataGraph) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
    />
  );
}
