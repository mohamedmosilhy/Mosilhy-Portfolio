import { expect, test } from "@playwright/test";

const projects: readonly {
  readonly slug: string;
  readonly title: string;
  readonly coverAlt?: string;
}[] = [
  {
    slug: "nova-ecommerce",
    title: "Nova E-commerce Platform",
    coverAlt: "Arabic Nova storefront home page with product collections",
  },
  {
    slug: "wheres-waldo",
    title: "Where’s Waldo",
    coverAlt:
      "Where’s Waldo home page with an illustrated scene and start control",
  },
  {
    slug: "blacktape",
    title: "Blacktape Website",
    coverAlt:
      "Blacktape website hero with the brand wordmark and dark visual treatment",
  },
  {
    slug: "iphone-15-pro",
    title: "iPhone 15 Pro Website Recreation",
    coverAlt: "iPhone 15 Pro recreation hero with a titanium phone image",
  },
  {
    slug: "multi-source-attribute-extraction",
    title:
      "Multi-Source Attribute Extraction for E-commerce Products (Graduation Project)",
    coverAlt:
      "First page of the graduation research paper showing the multimodal product attribute extraction problem",
  },
  {
    slug: "fighter-planes-game",
    title: "Fighter Planes",
    coverAlt:
      "Fighter Planes gameplay showing the player aircraft, an enemy, score, and level",
  },
];

const requiredHeadings = [
  "Overview",
  "Features",
  "Architecture",
  "Challenges",
  "Lessons learned",
] as const;

for (const project of projects) {
  test(`renders the generated ${project.title} case study`, async ({
    page,
  }) => {
    const response = await page.goto(`/projects/${project.slug}`);

    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: project.title }),
    ).toBeVisible();

    const caseStudy = page.getByRole("region", {
      name: `${project.title} case study`,
    });

    await expect(
      caseStudy.getByRole("heading", { level: 2 }).allTextContents(),
    ).resolves.toEqual(requiredHeadings);
    if ("coverAlt" in project) {
      await expect(
        page.getByRole("img", { name: project.coverAlt }).first(),
      ).toHaveAttribute("width", /\d+/);
    } else {
      await expect(
        page
          .getByRole("img", { name: `${project.title} project artwork` })
          .first(),
      ).toBeVisible();
    }
    await expect(
      caseStudy.getByRole("heading", { level: 3, name: "Technologies" }),
    ).toBeVisible();
    await expect(
      caseStudy.getByRole("link", { name: /GitHub repository/ }),
    ).toHaveAttribute("target", "_blank");
  });
}

test("preserves non-wrapping previous, all, and next project order", async ({
  page,
}) => {
  await page.goto("/projects/nova-ecommerce");

  let navigation = page.getByRole("navigation", {
    name: "Project case studies",
  });

  await expect(
    navigation.getByRole("link", { name: /Previous case study:/ }),
  ).toHaveCount(0);
  await expect(
    navigation.getByRole("link", {
      name: "Next case study: Relay Messaging App",
    }),
  ).toHaveAttribute("href", "/projects/messaging-app");

  await page.goto("/projects/wheres-waldo");
  navigation = page.getByRole("navigation", { name: "Project case studies" });

  await expect(
    navigation.getByRole("link", {
      name: "Previous case study: Blog API Platform",
    }),
  ).toHaveAttribute("href", "/projects/blog-api");
  await expect(
    navigation.getByRole("link", {
      name: "Next case study: Blacktape Website",
    }),
  ).toHaveAttribute("href", "/projects/blacktape");

  await page.goto("/projects/fighter-planes-game");
  navigation = page.getByRole("navigation", { name: "Project case studies" });

  await expect(
    navigation.getByRole("link", {
      name: "Previous case study: CS50 Problem Sets",
    }),
  ).toHaveAttribute("href", "/projects/cs50-problem-sets");
  await expect(
    navigation.getByRole("link", { name: /Next case study:/ }),
  ).toHaveCount(0);
});

test("returns to the home project section by keyboard", async ({ page }) => {
  await page.goto("/projects/wheres-waldo");

  const allProjects = page
    .getByRole("navigation", { name: "Project case studies" })
    .getByRole("link", { name: "All projects" });

  await allProjects.focus();
  await expect(allProjects).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/\/#projects$/);
  await expect(
    page.getByRole("region", { name: "Project gallery" }),
  ).toBeInViewport();
});

test("opens a featured case study from the home page by keyboard", async ({
  page,
}) => {
  await page.goto("/");

  const caseStudy = page.getByRole("link", {
    name: "View Nova E-commerce Platform case study",
  });

  await caseStudy.focus();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/\/projects\/nova-ecommerce$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Nova E-commerce Platform",
    }),
  ).toBeVisible();
});

test("returns a project-specific 404 for an unknown slug", async ({ page }) => {
  const response = await page.goto("/projects/unknown-project");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Project not found" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View projects" }),
  ).toHaveAttribute("href", "/#projects");
});

test("keeps case-study content available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 720 },
  });
  const page = await context.newPage();

  await page.goto("/projects/wheres-waldo");

  await expect(
    page.getByRole("heading", { level: 1, name: "Where’s Waldo" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Lessons learned" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Project case studies" }),
  ).toBeVisible();

  await context.close();
});

test("keeps the unanimated project page stable for reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 320, height: 720 },
  });
  const page = await context.newPage();

  await page.goto("/projects/wheres-waldo");

  await expect(page.locator('[data-motion="page-entrance"]')).toHaveCount(0);
  await expect(
    page.getByRole("heading", { level: 1, name: "Where’s Waldo" }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: /Where’s Waldo home page/,
    }),
  ).toBeVisible();

  await context.close();
});
