import { describe, expect, test } from "bun:test";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dir, "..");
const read = (file: string) => readFile(path.join(root, file), "utf8");
const files = (await readdir(path.join(root, "packages/content/blog"))).filter(
  (file) => file.endsWith(".mdx"),
);

async function elements(html: string, selector: string, attribute?: string) {
  const result: string[] = [];
  await new HTMLRewriter()
    .on(selector, {
      element(element) {
        result.push(
          attribute ? (element.getAttribute(attribute) ?? "") : element.tagName,
        );
      },
    })
    .transform(new Response(html))
    .text();
  return result;
}

describe("production content parity (run bun run build first)", () => {
  for (const file of files) {
    test(file, async () => {
      const source = await read(`packages/content/blog/${file}`);
      const slug = source.match(/^slug: (.+)$/m)![1];
      const [astro, next] = await Promise.all([
        read(`apps/astro/dist/client/blog/${slug}/index.html`),
        read(`apps/next/.next/server/app/blog/${slug}.html`),
      ]);
      expect(await elements(next, "h1")).toHaveLength(1);
      expect(await elements(next, 'link[rel="canonical"]', "href")).toEqual([
        `https://gantoreno.com/blog/${slug}`,
      ]);
      expect(await elements(next, "figure")).toHaveLength(
        (await elements(astro, "figure")).length,
      );
      expect(await elements(next, "pre code")).toHaveLength(
        (await elements(astro, "pre code")).length,
      );
      expect(await elements(next, "mjx-container")).toHaveLength(
        (await elements(astro, "mjx-container")).length,
      );
      expect(astro).not.toContain("data-loaded=");
      expect(astro).not.toMatch(/<p\b[^>]*>\s*<figure/);
      expect(astro).not.toContain("#undefined");
      const astroHeadingIds = await elements(
        astro,
        ".article-content h2:not(.sr-only)",
        "id",
      );
      const astroAnchors = await elements(
        astro,
        ".article-content h2:not(.sr-only) .heading-anchor",
        "href",
      );
      expect(astroAnchors).toEqual(astroHeadingIds.map((id) => `#${id}`));
      expect(next).not.toMatch(/<p\b[^>]*>\s*<figure/);
      expect(next).not.toContain("#undefined");
      expect(
        await elements(next, "#blur-container figure img", "src"),
      ).not.toContain("[object Object]");
      const headingIds = await elements(next, "#blur-container h2", "id");
      expect(headingIds.every(Boolean)).toBe(true);
      expect(new Set(headingIds).size).toBe(headingIds.length);
      expect(
        await elements(next, 'meta[property="og:type"]', "content"),
      ).toEqual(["article"]);
    });
  }
  test("all articles are linked and statically prerendered", async () => {
    const manifest = JSON.parse(
      await read("apps/next/.next/prerender-manifest.json"),
    );
    const index = await read("apps/next/.next/server/app/blog.html");
    const links = await elements(index, "main a", "href");
    expect(
      Object.keys(manifest.routes).filter((route) =>
        route.startsWith("/blog/"),
      ),
    ).toHaveLength(files.length);
    expect(links.filter((link) => link.startsWith("/blog/"))).toHaveLength(
      files.length,
    );
    expect(manifest.routes["/"]).toBeDefined();
    expect(manifest.routes["/blog"]).toBeDefined();
  });
  test("rich article retains all chart points and theme-specific figures", async () => {
    const html = await read(
      "apps/next/.next/server/app/blog/the-thousand-dollar-query-a-story-about-effective-code-optimization.html",
    );
    expect(await elements(html, ".data-point")).toHaveLength(30);
    expect(
      await elements(html, '[data-theme-directive="light-mode-only"]'),
    ).toHaveLength(3);
    expect(
      await elements(html, '[data-theme-directive="dark-mode-only"]'),
    ).toHaveLength(3);
    expect(await elements(html, "pre .line.highlighted")).not.toHaveLength(0);
  });
});
