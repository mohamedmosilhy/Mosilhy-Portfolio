import { expect, test } from "@playwright/test";

const projectTitles = [
  "Nova E-commerce Platform",
  "Where’s Waldo",
  "Blacktape Website",
  "iPhone 15 Pro Website Recreation",
] as const;

test("renders ordered featured project evidence and actions", async ({
  page,
}) => {
  await page.goto("/");

  const section = page.getByRole("region", { name: "Selected projects" });
  const cards = section.getByRole("article");

  await expect(cards).toHaveCount(projectTitles.length);
  await expect(
    cards.getByRole("heading", { level: 3 }).allTextContents(),
  ).resolves.toEqual(projectTitles);

  const nova = cards.first();

  await expect(
    nova.getByRole("img", {
      name: "Arabic Nova storefront home page with product collections",
    }),
  ).toBeVisible();
  await expect(
    nova.getByRole("link", {
      name: "View Nova E-commerce Platform case study",
    }),
  ).toHaveAttribute("href", "/projects/nova-ecommerce");
  await expect(
    nova.getByRole("link", {
      name: /Open Nova E-commerce Platform GitHub repository/,
    }),
  ).toHaveAttribute("href", "https://github.com/mohamedmosilhy/e-commerce-app");
  await expect(
    nova.getByRole("link", {
      name: /Open Nova E-commerce Platform live demo/,
    }),
  ).toHaveAttribute("href", "https://kenzkids.com/");
});

test("keeps project content available without JavaScript or hover", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 720 },
  });
  const page = await context.newPage();

  await page.goto("/");

  const firstProject = page
    .getByRole("region", { name: "Selected projects" })
    .getByRole("article")
    .first();

  await expect(
    firstProject.getByRole("heading", {
      level: 3,
      name: projectTitles[0],
    }),
  ).toBeVisible();
  await expect(
    firstProject.getByText("Next.js", { exact: true }),
  ).toBeVisible();
  await expect(
    firstProject.getByRole("link", {
      name: `View ${projectTitles[0]} case study`,
    }),
  ).toBeVisible();
  await expect(
    firstProject.getByRole("link", { name: /live demo/ }),
  ).toBeVisible();

  await context.close();
});
