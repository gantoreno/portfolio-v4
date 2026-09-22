import { describe, expect, test } from "bun:test";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dir, "..");
const read = (file: string) => readFile(path.join(root, file), "utf8");
const files = (await readdir(path.join(root, "src/content/blog"))).filter(
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

describe("Astro production output (run bun run build first)", () => {
  for (const file of files) {
    test(file, async () => {
      const source = await read(`src/content/blog/${file}`);
      const slug = source.match(/^slug: (.+)$/m)![1];
      const html = await read(`dist/client/blog/${slug}/index.html`);
      expect(await elements(html, "h1")).toHaveLength(1);
      expect(await elements(html, 'link[rel="canonical"]', "href")).toEqual([
        `https://gantoreno.com/blog/${slug}/`,
      ]);
      expect(html).not.toContain("data-loaded=");
      expect(html).not.toMatch(/<p\b[^>]*>\s*<figure/);
      expect(html).not.toContain("#undefined");
      const ids = await elements(
        html,
        ".article-content h2:not(.sr-only)",
        "id",
      );
      expect(ids.every(Boolean)).toBe(true);
      expect(new Set(ids).size).toBe(ids.length);
      expect(
        await elements(
          html,
          ".article-content h2:not(.sr-only) .heading-anchor",
          "href",
        ),
      ).toEqual(ids.map((id) => `#${id}`));
      const images = await elements(html, ".article-content figure img", "src");
      expect(images.length).toBeGreaterThan(0);
      for (const image of images) expect(image).toMatch(/^\/_astro\//);
      expect(
        await elements(html, 'meta[property="og:type"]', "content"),
      ).toContain("article");
    });
  }
  test("blog index links to all articles", async () => {
    const links = await elements(
      await read("dist/client/blog/index.html"),
      "main a",
      "href",
    );
    const slugs = await Promise.all(
      files.map(
        async (file) =>
          (await read(`src/content/blog/${file}`)).match(/^slug: (.+)$/m)![1],
      ),
    );
    expect(links.filter((link) => link.startsWith("/blog/")).sort()).toEqual(
      slugs.map((slug) => `/blog/${slug}`).sort(),
    );
  });
  test("rich article preserves demos, math, and syntax highlighting", async () => {
    const html = await read(
      "dist/client/blog/the-thousand-dollar-query-a-story-about-effective-code-optimization/index.html",
    );
    expect(await elements(html, ".data-point")).toHaveLength(30);
    expect(
      await elements(html, '[data-theme-directive="light-mode-only"]'),
    ).toHaveLength(3);
    expect(
      await elements(html, '[data-theme-directive="dark-mode-only"]'),
    ).toHaveLength(3);
    expect(await elements(html, "pre code")).toHaveLength(2);
    expect(await elements(html, "mjx-container")).toHaveLength(16);
    expect(await elements(html, "pre .line.highlighted")).not.toHaveLength(0);
  });
});
