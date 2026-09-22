import type { ComponentProps } from "react";
export const Paragraph = ({
  className = "",
  ...props
}: ComponentProps<"p">) => (
  <p className={`mb-5 text-secondary ${className}`} data-blurrable {...props} />
);
