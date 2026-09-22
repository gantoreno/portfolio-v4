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

Each article lives in `src/content/blog/<slug>/index.mdx`, with its images in an adjacent `assets/` folder:

```text
src/content/blog/
  the-thousand-dollar-query-a-story-about-effective-code-optimization/
    index.mdx
    assets/
      billing.webp
      satellite.webp
    components/
      SavingsChart/
        SavingsChart.astro
      WalkingMeter/
        WalkingMeter.astro
        WalkingMeter.scss
```

Article-specific demos live in `components/ComponentName/ComponentName.astro` inside the article folder, with any stylesheet alongside the component. Import them with relative paths such as `./components/SavingsChart/SavingsChart.astro`. Reusable components remain in `src/components`.

Reference article images with `./assets/image.webp`. Shared images belong in `src/images`. Run `bun run create:article` to scaffold an article folder and its assets directory; no sequence number is needed. Optional social thumbnails live at `public/assets/img/blog/<slug>.png`, referenced as `/assets/img/blog/<slug>.png` in the `thumbnail` frontmatter field. The original `001.png`–`005.png` files remain available for cached social previews and previously shared image URLs; keep these compatibility copies when updating assets.

Frontmatter `slug` values determine public URLs. Home, the blog index, and articles are prerendered, so publishing content requires a rebuild.

## Deployment

Use the repository root as the Vercel project root and select the Astro framework preset. Install with `bun install` and build with `bun run build`. The existing Astro Vercel adapter handles deployment. Canonical URLs use `https://gantoreno.com`.
