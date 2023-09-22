import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import rehypeBuildAnimations from "./plugins/rehype-build-animations.mjs";
import rehypeConvertFigures from "./plugins/rehype-convert-figures.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://gantoreno.com",
  output: "server",
  adapter: vercel({ edgeMiddleware: true }),
  integrations: [mdx(), tailwind(), sitemap()],
  markdown: {
    remarkRehype: { footnoteLabel: "Reference" },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax, rehypeConvertFigures, rehypeBuildAnimations],
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
});
