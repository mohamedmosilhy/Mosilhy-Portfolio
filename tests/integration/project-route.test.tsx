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
      { slug: "messaging-app" },
      { slug: "blog-api" },
      { slug: "wheres-waldo" },
      { slug: "blacktape" },
      { slug: "teo" },
      { slug: "iphone-15-pro" },
      { slug: "multi-source-attribute-extraction" },
      { slug: "stroke-clot-classification" },
      { slug: "signal-equalizer" },
      { slug: "flutter-blog-app" },
      { slug: "spotify-flutter" },
      { slug: "cs50-problem-sets" },
      { slug: "fighter-planes-game" },
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
