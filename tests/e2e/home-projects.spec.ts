import { expect, test } from "@playwright/test";

const projectTitles = [
  "Nova E-commerce Platform",
  "Where’s Waldo",
  "Blacktape Website",
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
  await expect(section.getByText("Showing 4 of 4 projects")).toBeVisible();

  const nova = cards.first();

  await expect(
    nova.getByRole("img", {
      name: "Arabic Nova storefront home page with product collections",
    }),
  ).toBeVisible();
  await expect(nova.getByRole("link")).toHaveCount(1);
  await expect(
    nova.getByRole("link", {
      name: "View Nova E-commerce Platform case study",
    }),
  ).toHaveAttribute("href", "/projects/nova-ecommerce");
  await expect(nova).not.toContainText("Next.js");
});

test("filters by discipline and searches across project tools", async ({
  page,
}) => {
  await page.goto("/");

  const section = page.getByRole("region", { name: "Project gallery" });

  await section.getByRole("button", { name: "Frontend" }).click();
  await expect(section.getByRole("article")).toHaveCount(2);
  await expect(section.getByText("Blacktape Website")).toBeVisible();
  await expect(
    section.getByText("iPhone 15 Pro Website Recreation"),
  ).toBeVisible();

  await section.getByRole("button", { name: "All", exact: true }).click();
  await section
    .getByRole("searchbox", { name: "Search projects" })
    .fill("Waldo");
  await expect(section.getByRole("article")).toHaveCount(1);
  await expect(section.getByText("Where’s Waldo")).toBeVisible();
  await expect(section.getByText("Showing 1 of 4 projects")).toBeVisible();

  await section.getByRole("button", { name: "Reset filters" }).click();
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

  await expect(cards).toHaveCount(projectTitles.length);
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
