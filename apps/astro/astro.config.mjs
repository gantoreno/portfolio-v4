import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";

import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

import {
  transformerNotationHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@portfolio/mdx": new URL("./src/mdx.ts", import.meta.url).pathname,
      },
    },
  },
  site: "https://gantoreno.com",
  output: "server",
  adapter: vercel({
    edgeMiddleware: true,
    webAnalytics: {
      enabled: true,
    },
  }),
  image: {
    responsiveStyles: true,
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkReadingTime],
      rehypePlugins: [rehypeMathjax],
      remarkRehype: {
        footnoteLabel: "Reference",
      },
    }),
    syntaxHighlight: "shiki",
    shikiConfig: {
      wrap: false,
      themes: {
        dark: "dark-plus",
        light: "light-plus",
      },
      transformers: [transformerNotationHighlight(), transformerNotationDiff()],
    },
  },
  prefetch: true,
});
