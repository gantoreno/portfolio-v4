import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import compress from "astro-compress";

import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

// https://astro.build/config
export default defineConfig({
  site: "https://gantoreno.com",
  output: "server",
  adapter: vercel({
    edgeMiddleware: true,
  }),
  integrations: [
    mdx(),
    sitemap(),
    compress({ SVG: false }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkRehype: {
      footnoteLabel: "Reference",
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
});
