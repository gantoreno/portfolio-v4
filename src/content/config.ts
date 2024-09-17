import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    link: z.string(),
    thumbnail: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    thumbnail: z.string().optional(),
    title: z.string(),
    shorthand: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  work,
  projects,
  blog,
};
