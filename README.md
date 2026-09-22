<p align="center">
  <img src=".github/logo.png" height="150">
</p>

# Portfolio

Two implementations of the same personal website, in a Bun workspace:

- `apps/astro`: the original Astro site and its Vercel adapter.
- `apps/next`: Next.js App Router, React Server Components, and static article routes.
- `packages/content`: shared MDX articles, article images, work, and projects.
- `packages/assets/public`: shared fonts and public assets, linked into both apps.

Use Node.js 24 and Bun 1.3.10 (see `.nvmrc` and `packageManager`). Install from the repository root:

```sh
bun install
bun run dev
```

`dev` starts both apps. Next.js defaults to http://localhost:3000 and Astro to http://localhost:4321; check the command output if a port is occupied.

| Command                                      | Action                                                   |
| -------------------------------------------- | -------------------------------------------------------- |
| `bun run dev:astro`                          | Develop Astro only                                       |
| `bun run dev:next`                           | Develop Next.js only                                     |
| `bun run build`                              | Build both apps                                          |
| `bun run build:astro` / `bun run build:next` | Build one app                                            |
| `bun run preview:astro`                      | Run Astro's adapter-dependent preview command            |
| `bun run preview:next`                       | Serve the Next.js production build                       |
| `bun run check`                              | Generate Next.js route types and run TypeScript          |
| `bun run test`                               | Check production content parity after building both apps |
| `bun run create:article`                     | Create a shared article using the existing prompts       |

## Content and MDX

Edit articles in `packages/content/blog`. Both implementations use the existing frontmatter `slug`, so public URLs are preserved. Next.js validates metadata during the build and rejects duplicate slugs. Restart Next.js development after adding a new article if its import context has not refreshed.

Shared articles import custom components from `@portfolio/mdx`. Each app resolves that alias to its own adapter: `apps/astro/src/mdx.ts` or `apps/next/src/components/mdx.tsx`. Add a custom article component to both adapters when needed. Local image imports and ordinary Markdown images work in both apps.

Next.js uses one `Heading` component with a `level` prop, and inline callbacks in the MDX map. Simple formatting tags no longer need separate wrapper files. The article demos remain server-rendered SVG/CSS; the chart does not load a charting library. Standalone Markdown images are lifted out of paragraph tags before rendering figures to keep the HTML valid.

## Next.js performance

- Home, blog index, all article routes, and sitemaps are generated at build time. Unknown article slugs return 404. Publishing content requires a rebuild; dates such as the “new” badge and footer year reflect build time.
- MDX, syntax highlighting, and MathJax run at build time, outside the browser bundle.
- `next/image` supplies responsive image sizes, intrinsic dimensions, lazy loading, local blur placeholders, and AVIF/WebP negotiation. Image variants are generated on demand and cached by the Next.js image optimizer or deployment platform.
- `next/font/local` self-hosts the existing font subsets with `display: swap`; only the primary font is preloaded.
- App-owned client components are limited to active navigation and the Alt-click reading-focus interaction. Next.js Link and Image also include their framework runtime.
- Webpack is selected explicitly so the MDX pipeline can use Shiki transformer functions. This choice affects compilation, not whether pages are statically served.

For a fair speed comparison, use production builds, identical routes/devices, and the same hosting region. Astro was already prerendering the main pages; Next.js adds a React runtime, so this migration does not itself establish that Next.js is faster. Lighthouse and real-user measurements should determine that.

## Deployment

Create separate Vercel projects with root directories `apps/astro` and `apps/next`, selecting their respective framework presets. Enable access to files outside each root directory so the shared workspace content and assets are included. Install with `bun install` from the workspace root and build the selected app. Both versions preserve production canonical URLs at `https://gantoreno.com`; use preview deployments for comparison before switching the production domain.

Next.js uses its server/image optimizer (`next start` or the Vercel Next.js preset), rather than a static export. Its sitemap index preserves the URL referenced by the shared `robots.txt`.
