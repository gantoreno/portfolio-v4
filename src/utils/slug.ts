import { default as _slugify } from "slugify";

export function slugify(title: string) {
  return _slugify(title).toLowerCase().replaceAll(":", "");
}
