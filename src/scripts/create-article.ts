import chalk from "chalk";
import { join } from "path";
import { spawn } from "child_process";
import { cwd, exit } from "process";
import { writeFileSync, mkdirSync, readdirSync } from "fs";

import { input, checkbox } from "@inquirer/prompts";

import { render } from "@/utils/template";
import { slugify } from "@/utils/slug";
import { getDefaultDate } from "@/utils/date";

const config = {
  target: "src/content/blog",
  ignore: ["100-test.mdx", "assets"],
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
thumbnail: /assets/img/blog/{{ id }}.png
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

const id = (
  readdirSync(join(cwd(), config.target)).filter(
    (child) => !config.ignore.includes(child)
  ).length + 1
)
  .toString()
  .padStart(3, "0");
const title = await input({
  message: "Title",
});
const slug = await input({
  message: "Slug",
  default: slugify(title),
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

const filename = `${id}-${slug}.mdx`;
const content = render(config.template, {
  id,
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

writeFileSync(join(cwd(), config.target, filename), content);
mkdirSync(join(cwd(), config.target, "assets", id));

spawn("open", [`http://localhost:4321/blog/${slug}`]);

console.log(`
Successfully created ${chalk.green(filename)} under ${chalk.cyan(join(cwd(), config.target))}
`);
