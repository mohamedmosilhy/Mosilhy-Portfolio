import { expect, test, type Page } from "@playwright/test";

const publicRoutes = [
  "/",
  "/projects/nova-ecommerce",
  "/projects/wheres-waldo",
  "/projects/blacktape",
  "/projects/iphone-15-pro",
] as const;

async function expectInternalDestination(page: Page, href: string) {
  const destination = new URL(href, page.url());
  const response = await page.request.get(destination.pathname);

  expect(
    response.status(),
    `${destination.pathname} linked from ${page.url()}`,
  ).toBeLessThan(400);

  if (destination.hash) {
    await page.goto(`${destination.pathname}${destination.hash}`);
    await expect(page.locator(destination.hash)).toHaveCount(1);
  }
}

for (const route of publicRoutes) {
  test(`${route} has no broken internal links or rendered local media`, async ({
    page,
  }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).href),
      );

    for (const href of new Set(hrefs)) {
      const destination = new URL(href);

      if (destination.origin === new URL(page.url()).origin) {
        await expectInternalDestination(page, href);
      } else {
        expect(["https:", "mailto:"]).toContain(destination.protocol);
      }
    }

    await page.goto(route);

    const localMedia = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .map((image) => (image as HTMLImageElement).currentSrc)
          .filter(
            (src) =>
              src.length > 0 && new URL(src).origin === window.location.origin,
          ),
      );

    for (const src of new Set(localMedia)) {
      const mediaResponse = await page.request.get(src);
      expect(mediaResponse.status(), src).toBeLessThan(400);
      expect(mediaResponse.headers()["content-type"]).toMatch(/^image\//);
    }
  });
}

test("publishes discovery endpoints and a branded not-found response", async ({
  page,
}) => {
  for (const path of ["/robots.txt", "/sitemap.xml"]) {
    const response = await page.request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/text|xml/);
  }

  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Project not found" }),
  ).toBeVisible();
});

test("external actions use approved protocols and safe new-tab behavior", async ({
  page,
}) => {
  for (const route of publicRoutes) {
    await page.goto(route);

    const externalLinks = page.locator(
      'a[href^="https://"], a[href^="mailto:"]',
    );

    for (let index = 0; index < (await externalLinks.count()); index += 1) {
      const link = externalLinks.nth(index);
      const href = await link.getAttribute("href");

      expect(href).not.toBeNull();
      expect(new URL(href!).protocol).toMatch(/^(https:|mailto:)$/);

      if ((await link.getAttribute("target")) === "_blank") {
        const rel = (await link.getAttribute("rel"))?.split(/\s+/) ?? [];
        expect(rel).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
      }
    }
  }
});
