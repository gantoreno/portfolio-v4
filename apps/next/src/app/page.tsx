import type { Metadata } from "next";
import { getPosts, getWork } from "@/lib/content";
import { Heading, Paragraph, Link } from "@/components/mdx";
import { Entry, SectionDivider } from "@/components/entries";
import { CompanyLogo } from "@/components/CompanyLogo";
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: ["/assets/img/og.png"] },
};
export default async function Home() {
  const [posts, work] = await Promise.all([getPosts(), getWork()]);
  return (
    <main>
      <header className="my-[60px]">
        <Heading level={1}>Hey there! Gabriel here 👋🏻</Heading>
      </header>
      <Paragraph>
        Software engineer delivering exceptional digital experiences, creating
        scalable, secure &amp; performant solutions, exploring emerging
        technologies, and continuously striving to deliver excellence.
      </Paragraph>
      <Paragraph>
        Always evolving, learning and improving &ndash;{" "}
        <em className="font-serif italic">one day at a time</em>.
      </Paragraph>
      <SectionDivider
        className="mt-[60px]"
        title={<strong className="text-primary">Working at</strong>}
      >
        <Paragraph>
          <Link
            href="https://metabase.com"
            target="_blank"
            className="inline-flex items-center gap-1 align-text-bottom leading-[19.5px]"
          >
            <CompanyLogo /> Metabase
          </Link>
          , the open source Business Intelligence and Embedded Analytics tool
          that lets everyone work with data.
        </Paragraph>
      </SectionDivider>
      <SectionDivider
        title={<strong className="text-primary">Recently built</strong>}
      >
        {work.slice(0, 3).map((project) => (
          <Entry
            key={project.link}
            title={project.title}
            description={project.description}
            href={project.link}
            external
          />
        ))}
      </SectionDivider>
      <SectionDivider
        title={<strong className="text-primary">Writing about</strong>}
      >
        {posts.slice(0, 3).map((post) => (
          <Entry
            key={post.slug}
            title={post.shorthand}
            description={post.description}
            href={`/blog/${post.slug}`}
            date={post.date}
          />
        ))}
      </SectionDivider>
      <Heading linkable={false}>More about me</Heading>
      <Paragraph>
        Apart from my work, I'm all about sharing knowledge, fostering growth,
        and building strong developer communities &ndash;{" "}
        <em className="font-serif italic">especially through mentoring</em>.
      </Paragraph>
      <Paragraph>
        If you're interested in my work and/or skillsets, you can always get in
        touch at <Link href="https://twitter.com/gantoreno">@gantoreno</Link> or{" "}
        <Link href="mailto:gantoreno@gmail.com">gantoreno@gmail.com</Link>.
      </Paragraph>
    </main>
  );
}
