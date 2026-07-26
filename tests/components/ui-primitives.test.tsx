import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArrowRight, Code2, Mail } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { ExternalLink } from "@/components/ui/external-link";
import { IconLink } from "@/components/ui/icon-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { Prose } from "@/components/ui/prose";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkipLink } from "@/components/ui/skip-link";
import { Tag } from "@/components/ui/tag";
import type { ImageAsset, VideoAsset } from "@/types/content";

afterEach(cleanup);

const image = {
  kind: "image",
  src: "/images/projects/nova-ecommerce/storefront.png",
  alt: "Storefront product collections",
  width: 1_440,
  height: 900,
  caption: "Storefront overview",
} as const satisfies ImageAsset;

const video = {
  kind: "video",
  src: "/videos/project-demo.webm",
  poster: image,
  title: "Project workflow demonstration",
  caption: "Workflow demonstration",
} as const satisfies VideoAsset;

describe("Button", () => {
  it("uses native keyboard button behavior and defaults to a safe button type", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button onClick={onClick} leadingIcon={<Mail />}>
        Send message
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Send message" });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-variant", "primary");
    expect(button).toHaveAttribute("data-size", "md");

    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("retains its accessible name and blocks activation while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button onClick={onClick} loading>
        Save changes
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save changes" });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders internal and external navigation with link semantics", () => {
    render(
      <>
        <Button href="/projects/example" variant="secondary">
          View case study
        </Button>
        <Button
          href="https://example.dev/project"
          target="_blank"
          trailingIcon={<ArrowRight />}
        >
          Open demo
        </Button>
      </>,
    );

    expect(
      screen.getByRole("link", { name: "View case study" }),
    ).toHaveAttribute("href", "/projects/example");
    expect(screen.getByRole("link", { name: "Open demo" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("removes disabled links from activation while preserving their role", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button href="/projects/example" disabled onClick={onClick}>
        Unavailable case study
      </Button>,
    );

    const link = screen.getByRole("link", {
      name: "Unavailable case study",
    });

    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("tabindex", "-1");
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("requires and exposes an accessible name for icon-sized controls", () => {
    render(
      <Button size="icon" aria-label="Continue">
        <ArrowRight aria-hidden="true" />
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute(
      "data-size",
      "icon",
    );
  });
});

describe("link and metadata primitives", () => {
  it("labels new-tab links and applies safe relationship values", async () => {
    const user = userEvent.setup();

    render(
      <ExternalLink href="https://example.dev" newTab showExternalIcon>
        External documentation
      </ExternalLink>,
    );

    const link = screen.getByRole("link", {
      name: "External documentation (opens in a new tab)",
    });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await user.tab();
    expect(link).toHaveFocus();
  });

  it("gives icon links explicit names without exposing decorative icons", () => {
    render(
      <IconLink
        href="https://github.com/example"
        label="Source repository"
        icon={<Code2 />}
        newTab
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "Source repository (opens in a new tab)",
      }),
    ).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps tags non-interactive", () => {
    render(
      <Tag variant="accent" size="md">
        TypeScript
      </Tag>,
    );

    const tag = screen.getByText("TypeScript");

    expect(tag.tagName).toBe("SPAN");
    expect(tag).not.toHaveAttribute("role");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("content and structural primitives", () => {
  it("keeps heading semantics independent from visual size", () => {
    render(
      <SectionHeading
        eyebrow="Selected work"
        title="Section title"
        description="Section orientation."
        headingLevel={3}
        size="xl"
        variant="split"
        action={<a href="/all">View all</a>}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Section title" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all" })).toBeInTheDocument();
  });

  it("styles trusted semantic prose without changing its descendants", () => {
    render(
      <Prose variant="compact" data-testid="prose">
        <h2>Architecture</h2>
        <p>
          Read the <a href="/details">details</a>.
        </p>
      </Prose>,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Architecture",
    );
    expect(screen.getByRole("link", { name: "details" })).toHaveAttribute(
      "href",
      "/details",
    );
    expect(screen.getByTestId("prose")).toHaveAttribute(
      "data-variant",
      "compact",
    );
  });

  it("distinguishes decorative and semantic dividers", () => {
    const { rerender } = render(<Divider />);

    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    expect(document.querySelector('[data-slot="divider"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    rerender(<Divider decorative={false} orientation="vertical" />);

    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("reveals the skip destination as a keyboard-focusable link", async () => {
    const user = userEvent.setup();

    render(<SkipLink targetId="main-content" />);

    const link = screen.getByRole("link", { name: "Skip to main content" });

    expect(link).toHaveAttribute("href", "#main-content");
    await user.tab();
    expect(link).toHaveFocus();
  });
});

describe("MediaFrame", () => {
  it("renders intrinsic image data and its authored caption", () => {
    render(
      <MediaFrame
        asset={image}
        sizes="(min-width: 80rem) 70rem, 100vw"
        variant="browser"
      />,
    );

    const renderedImage = screen.getByRole("img", {
      name: "Storefront product collections",
    });

    expect(renderedImage).toHaveAttribute("width", "1440");
    expect(renderedImage).toHaveAttribute("height", "900");
    expect(screen.getByText("Storefront overview").tagName).toBe("FIGCAPTION");
  });

  it("uses native labelled controls for video media", () => {
    render(
      <MediaFrame asset={video} sizes="(min-width: 48rem) 45rem, 100vw" />,
    );

    const renderedVideo = screen.getByLabelText(
      "Project workflow demonstration",
    );

    expect(renderedVideo.tagName).toBe("VIDEO");
    expect(renderedVideo).toHaveAttribute("controls");
    expect(renderedVideo).toHaveAttribute("preload", "metadata");
    expect(screen.getByText("Workflow demonstration")).toBeInTheDocument();
  });
});

describe("primitive architecture guardrails", () => {
  const componentDirectory = resolve(process.cwd(), "components/ui");
  const sources = readdirSync(componentDirectory)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => ({
      file,
      source: readFileSync(join(componentDirectory, file), "utf8"),
    }));

  it("keeps every primitive server-compatible", () => {
    for (const { file, source } of sources) {
      expect(source, file).not.toMatch(/^["']use client["'];?/m);
    }
  });

  it("does not read raw content or hardcode portfolio records", () => {
    for (const { file, source } of sources) {
      expect(source, file).not.toContain("@/content/");
      expect(source, file).not.toContain("@/lib/content/");
      expect(source, file).not.toMatch(
        /Mohamed Mosilhy|Nova E-commerce|Where’s Waldo|Blacktape/,
      );
    }
  });

  it("uses semantic tokens instead of raw color literals", () => {
    for (const { file, source } of sources) {
      expect(source, file).not.toMatch(/#[\da-f]{3,8}\b/i);
      expect(source, file).not.toMatch(
        /\b(?:bg|text|border)-(?:zinc|slate|gray|neutral|indigo|rose|teal|amber)-\d+/,
      );
    }
  });
});
