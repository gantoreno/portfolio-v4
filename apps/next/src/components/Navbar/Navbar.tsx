import Link from "next/link";
import { Logo } from "@/components/Logo/Logo";

export function Navbar({ activeSection }: { activeSection?: "home" | "blog" }) {
  return (
    <>
      <div className="w-full h-[100px]" />
      <nav
        id="navbar"
        className="top-0 left-0 z-20 fixed bg-inverse/80 w-full h-[100px]"
      >
        <div className="max-w-[600px] mx-auto px-5 sm:px-0 h-full">
          <div className="flex items-center gap-5 border-soft border-b h-full">
            <div className="mr-[14px]">
              <Logo />
            </div>
            {[
              { name: "Home", path: "/", section: "home" },
              { name: "Blog", path: "/blog", section: "blog" },
              {
                name: "GitHub",
                path: "https://github.com/gantoreno",
                section: "github",
              },
            ].map((route) => {
              const active = route.section === activeSection;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  target={
                    route.path.startsWith("https:") ? "_blank" : undefined
                  }
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
          </div>
        </div>
      </nav>
    </>
  );
}
