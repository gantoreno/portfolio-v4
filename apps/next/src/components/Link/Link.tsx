import NextLink from "next/link";
import type { ComponentProps } from "react";
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
