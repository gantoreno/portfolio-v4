import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const figtree = localFont({
  src: "../../public/assets/fonts/figtree-variable-subset.woff2",
  variable: "--font-figtree",
  display: "swap",
  weight: "400 600",
});
const serif = localFont({
  src: [
    {
      path: "../../public/assets/fonts/source-serif-4-subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/source-serif-4-italic-subset.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-source-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gantoreno.com"),
  title: "Gabriel Moreno",
  description:
    "Software Engineer delivering exceptional digital experiences, creating scalable, secure & performant solutions, exploring emerging technologies, and continuously striving to deliver excellence.",
  keywords: ["Software engineer", "Web developer"],
  openGraph: {
    type: "website",
    title: "Gabriel Moreno",
    images: ["/assets/img/og.png"],
  },
  twitter: { card: "summary_large_image", images: ["/assets/img/og.png"] },
  icons: { icon: "/favicon.ico" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${serif.variable}`}>
      <body className="relative font-sans">
        <div className="max-w-[600px] mx-auto px-5 sm:px-0 relative">
          {children}
          <footer className="flex items-center mt-[60px] border-soft border-t h-[100px] text-disabled">
            &copy; {new Date().getFullYear()} Gabriel Moreno. All rights
            reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
