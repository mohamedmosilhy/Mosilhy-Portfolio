import { expect, test } from "@playwright/test";

const projectTitles = [
  "Blacktape Website",
  "TEO Architecture Portfolio",
  "iPhone 15 Pro Website Recreation",
] as const;

test("renders an ordered, minimal project gallery", async ({ page }) => {
  await page.goto("/");

  const section = page.getByRole("region", { name: "Project gallery" });
  const cards = section.getByRole("article");

  await expect(cards).toHaveCount(projectTitles.length);
  await expect(
    cards.getByRole("heading", { level: 3 }).allTextContents(),
  ).resolves.toEqual(projectTitles);
  await expect(
    section.getByText("Showing 3 Frontend Web projects"),
  ).toBeVisible();
  await expect(section.getByRole("button", { name: "All" })).toHaveCount(0);

  const blacktape = cards.first();

  await expect(
    blacktape.locator(
      'img[alt="Blacktape website hero with the brand wordmark and dark visual treatment"]',
    ),
  ).toBeVisible();
  await expect(blacktape.getByRole("link")).toHaveCount(1);
  await expect(
    blacktape.getByRole("link", {
      name: "View Blacktape Website case study",
    }),
  ).toHaveAttribute("href", "/projects/blacktape");
  await expect(blacktape).not.toContainText("React");
});

test("filters by discipline and searches across project tools", async ({
  page,
}) => {
  await page.goto("/");

  const section = page.getByRole("region", { name: "Project gallery" });

  await section.getByRole("button", { name: "Frontend Web" }).click();
  await expect(section.getByRole("article")).toHaveCount(3);
  await expect(section.getByText("Blacktape Website")).toBeVisible();
  await expect(
    section.getByText("iPhone 15 Pro Website Recreation"),
  ).toBeVisible();
  await expect(section.getByText("TEO Architecture Portfolio")).toBeVisible();

  await section.getByRole("button", { name: "Backend & Full-stack" }).click();
  await section
    .getByRole("searchbox", { name: "Search projects" })
    .fill("Waldo");
  await expect(section.getByRole("article")).toHaveCount(1);
  await expect(section.getByText("Where’s Waldo")).toBeVisible();
  await expect(
    section.getByText("Showing 1 Backend & Full-stack project"),
  ).toBeVisible();

  await section.getByRole("button", { name: "Clear search" }).click();
  await expect(section.getByRole("article")).toHaveCount(4);
});

test("keeps every project available without JavaScript or hover", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 720 },
  });
  const page = await context.newPage();

  await page.goto("/");

  const section = page.getByRole("region", { name: "Project gallery" });
  const cards = section.getByRole("article");

  await expect(cards).toHaveCount(3);
  await expect(
    cards.first().getByRole("heading", {
      level: 3,
      name: projectTitles[0],
    }),
  ).toBeVisible();
  await expect(
    cards.first().getByRole("link", {
      name: `View ${projectTitles[0]} case study`,
    }),
  ).toBeVisible();

  await context.close();
});
