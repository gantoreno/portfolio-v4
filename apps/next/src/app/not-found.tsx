import { Navbar } from "@/components/Navbar/Navbar";
import { Heading } from "@/components/Heading/Heading";
import { Paragraph } from "@/components/Paragraph/Paragraph";
import { Link } from "@/components/Link/Link";
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <header className="my-[60px]">
          <Heading level={1}>Seems like I'm missing this one 🤔</Heading>
        </header>
        <Paragraph>
          I probably forgot to build the page you're looking for &ndash; but no
          worries, you can still look around my <Link href="/">homepage</Link>{" "}
          or my <Link href="/blog">blog</Link> for some good reads.
        </Paragraph>
        <Paragraph>
          <em className="font-serif italic">
            Perhaps this page will exist in the future...
          </em>
        </Paragraph>
      </main>
    </>
  );
}
