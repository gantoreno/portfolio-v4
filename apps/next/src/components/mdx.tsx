import Image, { type StaticImageData } from "next/image";
import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
export { ActivityFeed, WalkingMeter, SavingsChart } from "./article-demos";

export function Heading({
  level = 2,
  linkable = true,
  children,
  className = "",
  id,
  ...props
}: ComponentProps<"h1"> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  linkable?: boolean;
}) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      id={id}
      className={`${level === 1 ? "text-2xl" : "mt-[60px] group"} text-primary font-bold mb-5 ${className}`}
      {...props}
    >
      {children}
      {level > 1 && linkable && id && (
        <a
          href={`#${id}`}
          aria-label="Anchor"
          className="inline-flex mb-[2px] ml-1 align-middle text-disabled opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
            <path d="M12 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          </svg>
        </a>
      )}
    </Tag>
  );
}
export function Link({
  href = "",
  className = "",
  ...props
}: ComponentProps<"a">) {
  const styles = `decoration-disabled text-primary underline decoration-1 underline-offset-2 inline-block ${className}`;
  return href.startsWith("/") ? (
    <NextLink href={href} className={styles} {...props} />
  ) : (
    <a
      href={href}
      className={styles}
      rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
      {...props}
    />
  );
}
export const Paragraph = ({
  className = "",
  ...props
}: ComponentProps<"p">) => (
  <p className={`mb-5 text-secondary ${className}`} data-blurrable {...props} />
);
export const Abbreviation = (props: ComponentProps<"abbr">) => (
  <abbr
    className="decoration-disabled decoration-1 underline-offset-2"
    {...props}
  />
);
export const Underline = (props: ComponentProps<"u">) => (
  <u
    className="decoration-disabled underline decoration-1 underline-offset-2"
    {...props}
  />
);
export const Component = ({ children }: { children: ReactNode }) => (
  <div className="py-[9px] mb-5">{children}</div>
);

export function Figure({
  src,
  alt = "",
  title,
  withCaption = true,
  children,
}: {
  src: StaticImageData | string;
  alt?: string;
  title?: string;
  withCaption?: boolean;
  children?: ReactNode;
}) {
  return (
    <figure className="mb-5" data-blurrable data-theme-directive={title}>
      <div className="mb-5 rounded-md overflow-hidden">
        <Image
          src={src}
          alt={alt}
          {...(typeof src === "string" ? { width: 1200, height: 800 } : {})}
          sizes="(max-width: 640px) calc(100vw - 40px), 600px"
          className="w-full h-auto"
          placeholder={
            typeof src !== "string" && src.blurDataURL ? "blur" : "empty"
          }
        />
      </div>
      {withCaption && (
        <figcaption className="text-disabled text-center font-serif italic">
          {alt}
          {children}
        </figcaption>
      )}
    </figure>
  );
}
export function Meme({ name }: { name: string }) {
  return (
    <span
      className="inline-block relative self-center meme"
      tabIndex={0}
      aria-label={`:${name}:`}
    >
      <span className="bottom-[calc(100%+10px)] left-[calc(-100%-10px)] absolute bg-minimal meme-popover p-2.5 border border-soft rounded-md w-[100px] text-center">
        <Image
          src={`/assets/img/memes/${name}.webp`}
          alt=""
          width={48}
          height={48}
          className="inline-block mb-[5px] rounded-md"
        />
        <strong className="text-primary">:{name}:</strong>
      </span>
      <Image
        src={`/assets/img/memes/${name}.webp`}
        alt=""
        width={20}
        height={20}
        className="inline-block meme-image ml-[0.5ch] rounded-sm"
      />
    </span>
  );
}
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
