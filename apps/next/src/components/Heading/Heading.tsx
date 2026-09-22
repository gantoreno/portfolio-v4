import type { ComponentProps } from "react";
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
