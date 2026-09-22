import { cache } from "react";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { parse } from "yaml";
import { z } from "zod";
import readingTime from "reading-time";

const root = path.resolve(process.cwd(), "../../packages/content");
const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  shorthand: z.string(),
  description: z.string(),
  author: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()),
  thumbnail: z.string().default("/assets/img/og.png"),
});
const workSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  link: z.url(),
  enabled: z.boolean().default(true),
});

export const getPosts = cache(async () => {
  const files = (await readdir(path.join(root, "blog"))).filter((file) =>
    /\.mdx$/.test(file),
  );
  const posts = await Promise.all(
    files.map(async (file) => {
      const { data, content } = matter(
        await readFile(path.join(root, "blog", file), "utf8"),
      );
      return {
        ...postSchema.parse(data),
        file,
        readingTime: readingTime(content.replace(/^import .*;$/gm, "")).text,
      };
    }),
  );
  if (new Set(posts.map((post) => post.slug)).size !== posts.length)
    throw new Error("Duplicate article slugs");
  return posts.sort((a, b) => b.date.valueOf() - a.date.valueOf());
});

export const getWork = cache(async () => {
  const files = (await readdir(path.join(root, "work"))).filter((file) =>
    /\.ya?ml$/.test(file),
  );
  return (
    await Promise.all(
      files.map(async (file) =>
        workSchema.parse(
          parse(await readFile(path.join(root, "work", file), "utf8")),
        ),
      ),
    )
  )
    .filter((project) => project.enabled)
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
});

export const isNew = (date: Date) =>
  Date.now() >= +date && Date.now() - +date < 7 * 86400000;
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
