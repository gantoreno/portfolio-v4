import type { ComponentProps } from "react";
export const Underline = (props: ComponentProps<"u">) => (
  <u
    className="decoration-disabled underline decoration-1 underline-offset-2"
    {...props}
  />
);
