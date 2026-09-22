"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  return (
    <>
      {[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: "GitHub", path: "https://github.com/gantoreno" },
      ].map((route) => {
        const active =
          route.path === "/"
            ? pathname === "/"
            : pathname === route.path || pathname.startsWith(`${route.path}/`);
        return (
          <Link
            key={route.path}
            href={route.path}
            target={route.path.startsWith("https:") ? "_blank" : undefined}
            rel={
              route.path.startsWith("https:")
                ? "noopener noreferrer"
                : undefined
            }
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "decoration-disabled text-primary underline decoration-1 underline-offset-2"
                : "text-disabled hover:text-secondary duration-150"
            }
          >
            {route.name}
          </Link>
        );
      })}
    </>
  );
}
