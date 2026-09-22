import { Navbar } from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPosts, formatDate } from "@/lib/content";
import { Heading } from "@/components/Heading/Heading";
import { Paragraph } from "@/components/Paragraph/Paragraph";
import { Link } from "@/components/Link/Link";
import { Entry } from "@/components/Entry/Entry";
import { ReadingFocus } from "@/components/ReadingFocus/ReadingFocus";
import avatar from "../../../../../../packages/content/blog/assets/general/avatar.webp";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}
async function findPost(params: Props["params"]) {
  const { slug } = await params;
  const post = (await getPosts()).find((post) => post.slug === slug);
  if (!post) notFound();
  return post;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await findPost(params);
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      images: [post.thumbnail],
      publishedTime: post.date.toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.thumbnail],
    },
  };
}
export default async function Article({ params }: Props) {
  const post = await findPost(params);
  const { default: Content } = await import(
    `../../../../../../packages/content/blog/${post.file}`
  );
  const others = (await getPosts())
    .filter((other) => other.slug !== post.slug)
    .slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date.toISOString(),
    image: `https://gantoreno.com${post.thumbnail}`,
    url: `https://gantoreno.com/blog/${post.slug}`,
  };
  return (
    <>
      <Navbar activeSection="blog" />
      <article id="article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <Heading level={1} className="mt-[60px]">
          {post.title}
        </Heading>
        <Paragraph className="mt-5">{post.description}</Paragraph>
        <div
          className="flex gap-2.5 mt-0 mb-[60px] text-disabled items-center"
          data-blurrable
        >
          <a
            href="https://linkedin.com/in/gantoreno"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Image
              src={avatar}
              alt="Gabriel's profile picture"
              width={40}
              height={40}
              sizes="40px"
              className="rounded-full"
            />
          </a>
          <div>
            <div>
              <Link
                href="https://linkedin.com/in/gantoreno"
                target="_blank"
                className="text-disabled! no-underline hover:underline"
              >
                {post.author}
              </Link>
              <span className="mx-[2.5px]">·</span>
              <Link
                href="https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=gantoreno"
                target="_blank"
                className="text-disabled! no-underline hover:underline"
              >
                Follow
              </Link>
            </div>
            <div>
              {post.readingTime}
              <span className="mx-[2.5px]">·</span>
              <time dateTime={post.date.toISOString()}>
                {formatDate(post.date)}
              </time>
            </div>
          </div>
        </div>
        <div
          id="blur-container"
          className="[&>p:first-of-type::first-letter]:font-serif [&>p:first-of-type::first-letter]:text-primary"
        >
          <Content />
        </div>
        <Heading id="continue-reading">Continue reading</Heading>
        {others.map((other) => (
          <Entry
            key={other.slug}
            separated={false}
            title={other.title}
            description={other.description}
            href={`/blog/${other.slug}`}
            date={other.date}
          />
        ))}
        <Image
          src="/assets/img/signature.svg"
          width={200}
          height={100}
          alt="Gabriel Moreno's signature"
          className="dark:invert mt-[60px] w-[200px] h-auto"
        />
        <ReadingFocus />
      </article>
    </>
  );
}
