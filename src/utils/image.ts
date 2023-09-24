import sharp from "sharp";

import type { ImageMetadata } from "astro";

export async function getDownscaledPlaceholder(
  metadata: ImageMetadata,
  downscaleFactor = 0.25
) {
  const originalBuffer = await fetch(
    new URL(metadata.src, "http://localhost:4321")
  )
    .then((response) => response.arrayBuffer())
    .then((buffer) => Buffer.from(buffer));

  const downscaledBuffer = await sharp(originalBuffer)
    .resize(
      Math.round(metadata.width * downscaleFactor),
      Math.round(metadata.height * downscaleFactor)
    )
    .toFormat("webp", { quality: 1 })
    .blur(30)
    .toBuffer({ resolveWithObject: true });

  return `data:image/${
    downscaledBuffer.info.format
  };base64,${downscaledBuffer.data.toString("base64")}`;
}
