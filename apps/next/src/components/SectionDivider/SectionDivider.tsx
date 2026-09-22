import type { ReactNode } from "react";
export function SectionDivider({
  title,
  children,
  className = "",
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`grid grid-cols-4 gap-5 border-t border-soft pt-5 ${className}`}
    >
      {title}
      <div className="col-span-3">{children}</div>
    </section>
  );
}
