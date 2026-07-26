import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ProjectNotFound from "@/app/(site)/projects/[slug]/not-found";
import {
  dynamicParams,
  generateStaticParams,
} from "@/app/(site)/projects/[slug]/page";

afterEach(cleanup);

describe("project route generation", () => {
  it("generates only the published project slugs and rejects dynamic params", async () => {
    await expect(generateStaticParams()).resolves.toEqual([
      { slug: "nova-ecommerce" },
      { slug: "wheres-waldo" },
      { slug: "blacktape" },
      { slug: "iphone-15-pro" },
    ]);
    expect(dynamicParams).toBe(false);
  });

  it("provides a project-specific recovery experience", () => {
    render(<ProjectNotFound />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Project not found",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute(
      "href",
      "/#projects",
    );
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
