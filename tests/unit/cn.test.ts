import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils/cn";

describe("cn", () => {
  it("keeps semantic typography and color utilities together", () => {
    expect(cn("text-heading-xl", "text-text")).toBe(
      "text-heading-xl text-text",
    );
    expect(cn("text-label", "text-canvas")).toBe("text-label text-canvas");
  });

  it("still resolves conflicts within each semantic token group", () => {
    expect(
      cn("text-heading-xl", "text-heading-lg", "text-text", "text-muted"),
    ).toBe("text-heading-lg text-muted");
  });
});
