import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import compress from "astro-compress";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

// https://astro.build/config
export default defineConfig({
  site: "https://gantoreno.com",
  output: "server",
  adapter: vercel({
    edgeMiddleware: true,
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    mdx(),
    sitemap(),
    compress({
      SVG: false,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  markdown: {
    syntaxHighlight: "prism",
    remarkRehype: {
      footnoteLabel: "Reference",
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
    shikiConfig: {
      theme: "css-variables",
      langs: ["diff"],
      wrap: false,
    },
  },
});
