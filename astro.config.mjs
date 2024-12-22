import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

import {
  transformerNotationHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

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
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      wrap: false,
      themes: {
        dark: "dark-plus",
        light: "light-plus",
      },
      transformers: [transformerNotationHighlight(), transformerNotationDiff()],
    },
    remarkRehype: {
      footnoteLabel: "Reference",
    },
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [rehypeMathjax],
  },
  prefetch: true,
});
