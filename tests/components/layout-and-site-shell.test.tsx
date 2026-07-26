import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Container } from "@/components/layout/container";
import { MainNavigation } from "@/components/layout/main-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  validNavigation,
  validProfile,
  validSocialLinks,
} from "@/tests/fixtures/content-records";

const navigationState = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}));

interface ObserverRecord {
  readonly callback: IntersectionObserverCallback;
  readonly targets: Element[];
  readonly observer: IntersectionObserver;
}

const observerRecords: ObserverRecord[] = [];

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin: string;
  readonly thresholds: readonly number[];
  readonly callback: IntersectionObserverCallback;
  readonly targets: Element[] = [];

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {},
  ) {
    this.callback = callback;
    this.rootMargin = options.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold ?? 0];
    observerRecords.push({
      callback,
      targets: this.targets,
      observer: this,
    });
  }

  observe(target: Element) {
    this.targets.push(target);
  }

  unobserve(target: Element) {
    const targetIndex = this.targets.indexOf(target);
    if (targetIndex >= 0) {
      this.targets.splice(targetIndex, 1);
    }
  }

  disconnect() {
    this.targets.splice(0);
  }

  takeRecords() {
    return [];
  }
}

function intersectionEntry(
  target: Element,
  intersectionRatio: number,
  isIntersecting = true,
) {
  return {
    target,
    intersectionRatio,
    isIntersecting,
  } as IntersectionObserverEntry;
}

beforeEach(() => {
  navigationState.pathname = "/";
  observerRecords.splice(0);
  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("layout primitives", () => {
  it("applies responsive gutters and the requested intrinsic container", () => {
    render(
      <Container as="article" size="wide" className="relative">
        Layout content
      </Container>,
    );

    const container = screen.getByText("Layout content");

    expect(container.tagName).toBe("ARTICLE");
    expect(container).toHaveAttribute("data-size", "wide");
    expect(container).toHaveClass(
      "max-w-wide",
      "px-space-4",
      "sm:px-space-6",
      "lg:px-space-8",
      "relative",
    );
  });

  it("renders labelled sections with tokenized rhythm and sticky offsets", () => {
    render(
      <Section
        id="projects"
        ariaLabelledBy="projects-heading"
        spacing="spacious"
        surface="subtle"
      >
        <h2 id="projects-heading">Projects</h2>
      </Section>,
    );

    const section = screen.getByRole("region", { name: "Projects" });

    expect(section).toHaveAttribute("id", "projects");
    expect(section).toHaveClass(
      "scroll-mt-space-20",
      "py-space-20",
      "lg:py-space-32",
      "bg-surface",
    );
  });
});

describe("site navigation", () => {
  it("keeps home anchors root-qualified from non-home paths", () => {
    render(
      <MainNavigation
        items={validNavigation}
        currentPath="/projects/example"
      />,
    );

    const navigation = screen.getByRole("navigation", { name: "Primary" });

    expect(
      within(navigation).getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("href", "/#projects");
    expect(
      within(navigation).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/#contact");
    expect(
      within(navigation).queryByRole("link", { name: "Uses" }),
    ).not.toBeInTheDocument();
  });

  it("exposes the observed home section as the current location", () => {
    render(
      <>
        <section id="projects" />
        <section id="skills" />
        <MainNavigation
          items={validNavigation}
          currentPath="/"
          observeSections
        />
      </>,
    );

    const projects = document.getElementById("projects")!;
    const activeObserver = observerRecords.find((record) =>
      record.targets.includes(projects),
    );

    expect(activeObserver).toBeDefined();

    act(() => {
      activeObserver!.callback(
        [intersectionEntry(projects, 0.75)],
        activeObserver!.observer,
      );
    });

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Skills" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("uses disclosure keyboard behavior and returns focus on Escape", async () => {
    const user = userEvent.setup();

    render(<MobileNavigation items={validNavigation} brandLabel="Portfolio" />);

    const trigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const navigation = screen.getByRole("navigation", {
      name: "Portfolio mobile",
    });
    const projectsLink = within(navigation).getByRole("link", {
      name: "Projects",
    });

    await user.tab();
    expect(projectsLink).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(navigation.parentElement).toHaveAttribute("hidden");
  });

  it("closes the disclosure when a navigation link is activated", async () => {
    const user = userEvent.setup();

    render(<MobileNavigation items={validNavigation} brandLabel="Portfolio" />);

    const trigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    await user.click(trigger);
    await user.click(screen.getByRole("link", { name: "Contact" }));

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("does not preserve an open disclosure across route changes", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <MobileNavigation items={validNavigation} brandLabel="Portfolio" />,
    );

    const trigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    navigationState.pathname = "/projects/example";
    rerender(
      <MobileNavigation items={validNavigation} brandLabel="Portfolio" />,
    );

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

describe("site chrome", () => {
  it("changes the sticky header surface only when its sentinel leaves view", () => {
    render(
      <SiteHeader
        brand="Portfolio"
        items={validNavigation}
        currentPath="/projects/example"
      />,
    );

    const header = document.getElementById("site-header")!;
    const sentinel = document.querySelector(
      '[data-slot="header-scroll-sentinel"]',
    )!;
    const headerObserver = observerRecords.find((record) =>
      record.targets.includes(sentinel),
    );

    expect(header).toHaveAttribute("data-scrolled", "false");
    expect(headerObserver).toBeDefined();

    act(() => {
      headerObserver!.callback(
        [intersectionEntry(sentinel, 0, false)],
        headerObserver!.observer,
      );
    });

    expect(header).toHaveAttribute("data-scrolled", "true");
  });

  it("renders model-provided footer identity, navigation, and destinations", () => {
    render(
      <SiteFooter
        profile={validProfile}
        socialLinks={validSocialLinks}
        navigation={validNavigation}
        year={2026}
      />,
    );

    const footer = screen.getByRole("contentinfo");

    expect(
      within(footer).getByRole("link", {
        name: `${validProfile.name}, home`,
      }),
    ).toHaveAttribute("href", "/");
    expect(
      within(footer).getByRole("navigation", { name: "Footer" }),
    ).toBeInTheDocument();
    expect(
      within(footer).getByRole("link", {
        name: "GitHub (opens in a new tab)",
      }),
    ).toHaveAttribute("href", validSocialLinks[1].href);
    expect(footer).toHaveTextContent(`© 2026 ${validProfile.name}`);
  });
});

describe("layout architecture guardrails", () => {
  const layoutDirectory = resolve(process.cwd(), "components/layout");
  const sources = readdirSync(layoutDirectory)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => ({
      file,
      source: readFileSync(join(layoutDirectory, file), "utf8"),
    }));
  const permittedClientIslands = new Set([
    "header-scroll-observer.tsx",
    "mobile-navigation.tsx",
    "observed-navigation.tsx",
  ]);

  it("limits client boundaries to interaction and observation islands", () => {
    for (const { file, source } of sources) {
      const isClientComponent = /^["']use client["'];?/m.test(source);
      expect(isClientComponent, file).toBe(permittedClientIslands.has(file));
    }
  });

  it("does not bypass page models or embed portfolio records", () => {
    for (const { file, source } of sources) {
      expect(source, file).not.toContain("@/content/");
      expect(source, file).not.toContain("@/lib/content/");
      expect(source, file).not.toMatch(
        /Mohamed Mosilhy|Nova E-commerce|Where’s Waldo|Blacktape/,
      );
    }
  });

  it("uses observers rather than continuous scroll handlers", () => {
    for (const { file, source } of sources) {
      expect(source, file).not.toMatch(/addEventListener\(["']scroll["']/);
      expect(source, file).not.toMatch(/\bonScroll\s*=/);
    }
  });

  it("uses semantic tokens instead of raw palette values", () => {
    for (const { file, source } of sources) {
      expect(source, file).not.toMatch(/#[\da-f]{3,8}\b/i);
      expect(source, file).not.toMatch(
        /\b(?:bg|text|border)-(?:zinc|slate|gray|neutral|indigo|rose|teal|amber)-\d+/,
      );
    }
  });
});
