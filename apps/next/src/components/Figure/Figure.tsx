import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
export function Figure({
  src,
  alt = "",
  title,
  withCaption = true,
  children,
}: {
  src: StaticImageData | string;
  alt?: string;
  title?: string;
  withCaption?: boolean;
  children?: ReactNode;
}) {
  return (
    <figure className="mb-5" data-blurrable data-theme-directive={title}>
      <div className="mb-5 rounded-md overflow-hidden">
        <Image
          src={src}
          alt={alt}
          {...(typeof src === "string" ? { width: 1200, height: 800 } : {})}
          sizes="(max-width: 640px) calc(100vw - 40px), 600px"
          className="w-full h-auto"
          placeholder={
            typeof src !== "string" && src.blurDataURL ? "blur" : "empty"
          }
        />
      </div>
      {withCaption && (
        <figcaption className="text-disabled text-center font-serif italic">
          {alt}
          {children}
        </figcaption>
      )}
    </figure>
  );
}
