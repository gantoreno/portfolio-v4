import { getDefaultDate } from "@/utils/date";
import { slugify } from "@/utils/slug";
import { render } from "@/utils/template";
import { checkbox, input } from "@inquirer/prompts";
import chalk from "chalk";
import { spawn } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { cwd, exit } from "process";

const config = {
  target: "./src/content/blog",
  tags: [
    "Leadership",
    "Teamwork",
    "Growth",
    "Engineering",
    "Learning",
    "Interviews",
    "Tech",
    "Programming",
    "Advice",
    "Career",
    "Experiences",
  ],
  template: `---
slug: {{ slug }}
title: "{{ title }}"
shorthand: "{{ shorthand }}"
description: "{{ description }}"
author: {{ author }}
date: {{ date }}
tags: {{ tags }}
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
};

const title = await input({
  message: "Title",
});
const slug = await input({
  message: "Slug",
  default: slugify(title),
  validate: (value) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      return "Use lowercase letters, numbers, and hyphens.";
    }
    return (
      !existsSync(join(cwd(), config.target, value)) ||
      "An article with this slug already exists."
    );
  },
});
const shorthand = await input({
  message: "Shorthand title",
});
const description = await input({
  message: "Description",
});
const author = await input({
  message: "Author",
  default: "Gabriel Moreno",
});
const date = await input({
  message: "Date",
  default: getDefaultDate(),
});
const tags = (
  await checkbox({
    message: "Tags",
    choices: config.tags.map((tag) => ({
      name: tag,
      value: `
  - ${tag}`,
    })),
  })
).join("");

const directory = join(cwd(), config.target, slug);
const content = render(config.template, {
  slug,
  title,
  shorthand,
  description,
  author,
  date,
  tags,
});

console.log(`
Preview:

${chalk.gray(content)}`);

const create = await input({
  message: "Create? (Y/n)",
  default: "Y",
});

if (create.toLowerCase() !== "y") {
  console.log(`
Aborting...
`);

  exit(1);
}

mkdirSync(directory);
mkdirSync(join(directory, "assets"));
writeFileSync(join(directory, "index.mdx"), content, { flag: "wx" });

spawn("open", [`http://localhost:4321/blog/${slug}`]);

console.log(`
Successfully created ${chalk.green("index.mdx")} under ${chalk.cyan(directory)}
`);
