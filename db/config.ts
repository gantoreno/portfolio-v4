import { defineDb, defineTable, column } from "astro:db";

const Analytics = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    views: column.number({ default: 0 }),
  },
});

export default defineDb({
  tables: { Analytics },
});
