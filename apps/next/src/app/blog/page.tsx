import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { Heading } from "@/components/mdx";
import { Entry, SectionDivider } from "@/components/entries";
export const metadata: Metadata = {
  title: "Blog",
  description: "Experiences, lessons & more",
  keywords: ["Blog", "Writing", "Learning"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog",
    description: "Experiences, lessons & more",
    url: "/blog",
    images: ["/assets/img/og.png"],
  },
};
export default async function Blog() {
  const posts = await getPosts();
  const years = [...new Set(posts.map((post) => post.date.getUTCFullYear()))];
  return (
    <main>
      <header className="my-[60px]">
        <Heading level={1}>Experiences, lessons &amp; more 📖</Heading>
      </header>
      <div className="mt-[60px]">
        {years.map((year) => (
          <SectionDivider
            key={year}
            title={<span className="text-disabled">{year}</span>}
          >
            {posts
              .filter((post) => post.date.getUTCFullYear() === year)
              .map((post) => (
                <Entry
                  key={post.slug}
                  title={post.shorthand}
                  description={post.description}
                  href={`/blog/${post.slug}`}
                  date={post.date}
                  showDate
                />
              ))}
          </SectionDivider>
        ))}
      </div>
    </main>
  );
}
