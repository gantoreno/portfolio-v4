import type { ComponentProps } from "react";
export const Abbreviation = (props: ComponentProps<"abbr">) => (
  <abbr
    className="decoration-disabled decoration-1 underline-offset-2"
    {...props}
  />
);
