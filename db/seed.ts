import { db, Analytics } from "astro:db";

import { getCollection } from "astro:content";

export default async function seed() {
  const analytics = (await getCollection("blog")).map((post) => ({
    slug: post.slug,
    views: 0,
  }));

  await db.insert(Analytics).values(analytics);
}
