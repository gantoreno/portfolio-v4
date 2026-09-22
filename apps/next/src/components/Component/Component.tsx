import type { ReactNode } from "react";
export const Component = ({ children }: { children: ReactNode }) => (
  <div className="py-[9px] mb-5">{children}</div>
);
