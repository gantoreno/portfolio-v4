"use client";
import { useEffect } from "react";

export function ReadingFocus() {
  useEffect(() => {
    function toggle(event: MouseEvent) {
      if (!event.altKey) return;
      const article = document.getElementById("blur-container");
      if (!article) return;
      event.preventDefault();
      if (article.dataset.blur) delete article.dataset.blur;
      else article.dataset.blur = "true";
    }
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);
  return null;
}
