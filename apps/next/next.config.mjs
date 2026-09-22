import remarkFigure from "./plugins/remark-figure.mjs";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxImages from "remark-mdx-images";
import rehypeSlug from "rehype-slug";
import rehypeMathjax from "rehype-mathjax";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      remarkMath,
      remarkMdxImages,
      remarkFigure,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeMathjax,
      [
        rehypeShiki,
        {
          themes: { light: "light-plus", dark: "dark-plus" },
          transformers: [
            transformerNotationHighlight(),
            transformerNotationDiff(),
          ],
        },
      ],
    ],
    remarkRehypeOptions: { footnoteLabel: "Reference" },
  },
});

export default withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: new URL("../../", import.meta.url).pathname,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  webpack(config) {
    config.resolve.alias["@portfolio/mdx"] = new URL(
      "./src/components/mdx.tsx",
      import.meta.url,
    ).pathname;
    return config;
  },
});
