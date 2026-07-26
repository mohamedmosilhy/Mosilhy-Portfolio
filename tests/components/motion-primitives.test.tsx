import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { PageEntrance } from "@/components/motion/page-entrance";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { StaggerItem } from "@/components/motion/stagger-item";
import {
  createRevealVariants,
  createStaggerItemVariants,
  createStaggerVariants,
  pageEntranceVariants,
} from "@/components/motion/motion-variants";

let prefersReducedMotion = false;
const mediaQueryListeners = new Set<(event: MediaQueryListEvent) => void>();
let observers: MockIntersectionObserver[] = [];

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0.15];
  private readonly elements = new Set<Element>();

  constructor(
    private readonly callback: IntersectionObserverCallback,
    readonly options?: IntersectionObserverInit,
  ) {
    observers.push(this);
  }

  disconnect() {
    this.elements.clear();
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  takeRecords() {
    return [];
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  trigger(isIntersecting: boolean) {
    const entries = [...this.elements].map(
      (target) =>
        ({
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting,
          rootBounds: null,
          target,
          time: performance.now(),
        }) satisfies IntersectionObserverEntry,
    );

    this.callback(entries, this);
  }
}

function setReducedMotion(matches: boolean) {
  prefersReducedMotion = matches;
  const event = { matches } as MediaQueryListEvent;

  for (const listener of mediaQueryListeners) {
    listener(event);
  }
}

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string): MediaQueryList => ({
      matches: query.includes("prefers-reduced-motion")
        ? prefersReducedMotion
        : false,
      media: query,
      onchange: null,
      addEventListener: (
        _type: string,
        listener: EventListenerOrEventListenerObject,
      ) => {
        mediaQueryListeners.add(
          listener as (event: MediaQueryListEvent) => void,
        );
      },
      removeEventListener: (
        _type: string,
        listener: EventListenerOrEventListenerObject,
      ) => {
        mediaQueryListeners.delete(
          listener as (event: MediaQueryListEvent) => void,
        );
      },
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

beforeEach(() => {
  observers = [];
  setReducedMotion(false);
});

afterEach(() => {
  cleanup();
  mediaQueryListeners.clear();
});

describe("motion primitives", () => {
  it("keeps server-rendered content visible before enhancement", () => {
    const html = renderToStaticMarkup(
      <>
        <Reveal>
          <p>Server reveal</p>
        </Reveal>
        <Stagger>
          <StaggerItem>Server stagger item</StaggerItem>
        </Stagger>
        <PageEntrance>
          <p>Server page</p>
        </PageEntrance>
      </>,
    );

    expect(html).toContain("Server reveal");
    expect(html).toContain("Server stagger item");
    expect(html).toContain("Server page");
    expect(html).not.toMatch(/opacity:\s*0/);
    expect(html).not.toMatch(/translate[XY]?\(/);
  });

  it("reveals once when the region reaches the documented viewport threshold", () => {
    render(
      <Reveal as="section" variant="rise">
        <p>Observed content</p>
      </Reveal>,
    );

    const reveal = screen.getByText("Observed content").closest("section");

    expect(reveal).toHaveAttribute("data-motion", "reveal");
    expect(reveal).toHaveAttribute("data-motion-state", "hidden");
    expect(observers[0]?.options).toMatchObject({
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.15,
    });

    act(() => observers[0]!.trigger(true));

    expect(reveal).toHaveAttribute("data-motion-state", "visible");

    act(() => observers[0]!.trigger(false));

    expect(reveal).toHaveAttribute("data-motion-state", "visible");
  });

  it("selects immediate visible states and removes stagger for reduced motion", () => {
    setReducedMotion(true);

    render(
      <Stagger as="ul">
        <StaggerItem as="li">First item</StaggerItem>
        <StaggerItem as="li">Second item</StaggerItem>
      </Stagger>,
    );

    const stagger = screen.getByRole("list");

    expect(stagger).toHaveAttribute("data-motion-state", "reduced");
    expect(stagger).toHaveAttribute("data-motion-stagger", "0");
    expect(stagger.children).toHaveLength(2);
    expect([...stagger.children].every((child) => child.tagName === "LI")).toBe(
      true,
    );
  });

  it("animates no more than six collection items individually", () => {
    const items = Array.from({ length: 7 }, (_, index) => (
      <StaggerItem key={index}>{index + 1}</StaggerItem>
    ));

    render(<Stagger>{items}</Stagger>);

    const stagger = screen.getByText("1").parentElement;

    expect(stagger).toHaveAttribute("data-motion-item-count", "7");
    expect(stagger).toHaveAttribute("data-motion-stagger", "0");
  });
});

describe("motion specifications", () => {
  it("uses only the documented reveal values and caps authored delay", () => {
    const variants = createRevealVariants("rise", 10_000);
    const subtleVariants = createRevealVariants("rise", 0, "subtle");

    expect(variants.hidden).toMatchObject({ opacity: 0, x: 0, y: 16 });
    expect(subtleVariants.hidden).toMatchObject({
      opacity: 0,
      x: 0,
      y: 8,
    });
    expect(variants.visible).toMatchObject({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: 0.21,
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1],
      },
    });
    expect(variants.reduced).toMatchObject({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0 },
    });
  });

  it("keeps collection and page entrances within their motion budgets", () => {
    expect(createStaggerVariants("default", 6).visible).toMatchObject({
      transition: { delayChildren: 0, staggerChildren: 0.07 },
    });
    expect(createStaggerVariants("default", 7).visible).toMatchObject({
      transition: { delayChildren: 0, staggerChildren: 0 },
    });
    expect(createStaggerItemVariants("rise").visible).toMatchObject({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.26,
        ease: [0.16, 1, 0.3, 1],
      },
    });
    expect(pageEntranceVariants).toMatchObject({
      hidden: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.42,
          ease: [0.16, 1, 0.3, 1],
        },
      },
      reduced: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0 },
      },
    });
  });
});

describe("motion architecture guardrails", () => {
  it("contains runtime imports and client boundaries inside the motion layer", () => {
    const root = process.cwd();
    const projectRoute = readFileSync(
      resolve(root, "app/(site)/projects/[slug]/page.tsx"),
      "utf8",
    );
    const choreographedFeatures = [
      "features/home/about-section.tsx",
      "features/home/contact-section.tsx",
      "features/home/hero-section.tsx",
      "features/home/skills-section.tsx",
      "features/home/testimonials-section.tsx",
      "features/projects/projects-section.tsx",
    ].map((file) => readFileSync(resolve(root, file), "utf8"));
    const motionSources = [
      "motion-boundary.tsx",
      "motion-element.tsx",
      "page-entrance.tsx",
      "reduced-motion.ts",
      "reveal.tsx",
      "stagger-item.tsx",
      "stagger.tsx",
      "use-viewport-motion.ts",
    ].map((file) =>
      readFileSync(resolve(root, "components/motion", file), "utf8"),
    );

    expect(projectRoute).not.toContain("framer-motion");

    for (const source of choreographedFeatures) {
      expect(source).not.toContain("framer-motion");
      expect(source).not.toMatch(/^["']use client["'];?/m);
    }

    for (const source of motionSources) {
      expect(source).toMatch(/^["']use client["'];/);
      expect(source).not.toMatch(
        /addEventListener\(\s*["']scroll["']|useScroll\(/,
      );
    }
  });
});
