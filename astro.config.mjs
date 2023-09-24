import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";

import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

// https://astro.build/config
export default defineConfig({
  site: "https://gantoreno.com",
  output: "server",
  adapter: vercel({ edgeMiddleware: true }),
  integrations: [mdx(), tailwind(), sitemap(), astroImageTools],
  markdown: {
    remarkRehype: { footnoteLabel: "Reference" },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
});
