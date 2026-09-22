import type { MDXComponents } from "mdx/types";
import type { StaticImageData } from "next/image";
import { Heading } from "@/components/Heading/Heading";
import { Link } from "@/components/Link/Link";
import { Paragraph } from "@/components/Paragraph/Paragraph";
import { Abbreviation } from "@/components/Abbreviation/Abbreviation";
import { Underline } from "@/components/Underline/Underline";
import { Figure } from "@/components/Figure/Figure";
export { Heading } from "@/components/Heading/Heading";
export { Link } from "@/components/Link/Link";
export { Paragraph } from "@/components/Paragraph/Paragraph";
export { Abbreviation } from "@/components/Abbreviation/Abbreviation";
export { Underline } from "@/components/Underline/Underline";
export { Component } from "@/components/Component/Component";
export { Figure } from "@/components/Figure/Figure";
export { Meme } from "@/components/Meme/Meme";
export { ActivityFeed } from "@/components/ActivityFeed/ActivityFeed";
export { WalkingMeter } from "@/components/WalkingMeter/WalkingMeter";
export { SavingsChart } from "@/components/SavingsChart/SavingsChart";

export const mdxComponents: MDXComponents = {
  h1: (props) => <Heading {...props} level={1} />,
  h2: (props) => <Heading {...props} level={2} />,
  h3: (props) => <Heading {...props} level={3} />,
  h4: (props) => <Heading {...props} level={4} />,
  h5: (props) => <Heading {...props} level={5} />,
  h6: (props) => <Heading {...props} level={6} />,
  p: Paragraph,
  a: Link,
  // MDX image imports carry intrinsic dimensions and build-time blur placeholders.
  img: (props) => (
    <Figure {...props} src={props.src as unknown as StaticImageData} />
  ),
  em: (props) => <em className="font-serif italic" {...props} />,
  strong: (props) => <strong className="text-primary font-bold" {...props} />,
  abbr: Abbreviation,
  u: Underline,
  blockquote: (props) => (
    <blockquote
      className="mb-5 pl-5 border-primary border-l-2 text-secondary font-serif italic"
      data-blurrable
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="text-secondary mb-5 list-disc marker:text-primary pl-[34px] [&>li]:pl-2.5"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="text-secondary mb-5 list-decimal marker:text-primary pl-[34px] [&>li]:pl-2.5"
      {...props}
    />
  ),
  li: (props) => <li className="mb-[5px]" data-blurrable {...props} />,
  code: (props) => (
    <code
      className="font-mono text-primary text-sm before:content-['`'] after:content-['`']"
      {...props}
    />
  ),
  pre: ({ className = "", ...props }) => (
    <pre
      className={`p-5 mb-5 rounded-md overflow-x-auto [&>code]:leading-[22px] ${className}`}
      data-blurrable
      {...props}
    />
  ),
  sup: (props) => (
    <sup
      className="[&>a]:text-primary [&>a]:underline [&>a]:decoration-disabled"
      {...props}
    />
  ),
  hr: () => (
    <div
      className="mb-5 font-serif text-disabled text-center"
      role="separator"
      data-blurrable
    >
      * * *
    </div>
  ),
};
