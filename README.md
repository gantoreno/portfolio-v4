<p align="center">
  <img src=".github/logo.png" height="150">
</p>

# Portfolio

My personal portfolio, built with Astro and deployed with Vercel.

Use Node.js 24 and Bun 1.3.10. Install and run from the repository root:

```sh
bun install
bun run dev
```

| Command                  | Action                                        |
| ------------------------ | --------------------------------------------- |
| `bun run dev`            | Start the Astro development server            |
| `bun run build`          | Build the site for Vercel                     |
| `bun run preview`        | Run Astro's adapter-dependent preview command |
| `bun run test`           | Check production output after building        |
| `bun run create:article` | Create an article using the authoring prompts |

## Structure

- `src/pages`: home, blog index, article routes, and 404 page.
- `src/content`: MDX articles and their images, work, and projects.
- `src/components`: `ComponentName/ComponentName.astro`, with styles alongside components where applicable.
- `public`: fonts and other public assets.
- `plugins`: build-time reading-time metadata and article HTML processing.

## Components and articles

`Heading` accepts a `level` prop. Ordinary page copy uses native paragraphs and emphasis. `ArticleContent/ArticleContent.css` styles semantic Markdown tags, and `rehype-article.mjs` adds heading anchors and reading-focus attributes at build time. Embedded demos opt out of prose styling through `data-prose-exclude`.

The Markdown component map only replaces images with `Figure`. Articles use native `<u>` and `<abbr>` tags and import richer Astro components directly. Figures retain small background placeholders beneath responsive images, without requiring JavaScript to remove a blur filter.

Edit articles in `src/content/blog`; frontmatter `slug` values determine public URLs. Home, the blog index, and articles are prerendered, so publishing content requires a rebuild.

## Deployment

Use the repository root as the Vercel project root and select the Astro framework preset. Install with `bun install` and build with `bun run build`. The existing Astro Vercel adapter handles deployment. Canonical URLs use `https://gantoreno.com`.
