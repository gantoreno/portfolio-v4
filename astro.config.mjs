import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { defineConfig } from "astro/config";
import rehypeMathjax from "rehype-mathjax";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import { rehypeArticle } from "./plugins/rehype-article.mjs";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

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
  image: {
    responsiveStyles: true,
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkReadingTime],
      rehypePlugins: [rehypeSlug, rehypeMathjax, rehypeArticle],
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
