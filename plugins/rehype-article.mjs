/** Add build-time heading links and reading-focus hooks without MDX wrappers. */
export function rehypeArticle() {
  return (tree) => {
    function visit(node) {
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (child.type === "element") {
          child.properties ??= {};
          if (
            [
              "p",
              "li",
              "blockquote",
              "pre",
              "hr",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
            ].includes(child.tagName)
          )
            child.properties["data-blurrable"] = true;
          if (
            /^h[2-6]$/.test(child.tagName) &&
            child.properties.id &&
            !child.properties.className?.includes("sr-only")
          ) {
            child.children.push({
              type: "element",
              tagName: "a",
              properties: {
                href: `#${child.properties.id}`,
                className: ["heading-anchor"],
                ariaLabel: "Anchor",
              },
              children: [
                {
                  type: "element",
                  tagName: "svg",
                  properties: {
                    width: 16,
                    height: 16,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    ariaHidden: "true",
                  },
                  children: [
                    "M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2",
                    "M12 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
                  ].map((d) => ({
                    type: "element",
                    tagName: "path",
                    properties: { d },
                    children: [],
                  })),
                },
              ],
            });
          }
          // A mapped Markdown image becomes a figure and cannot live inside <p>.
          if (
            child.tagName === "p" &&
            child.children.some((item) => item.tagName === "img") &&
            child.children.every(
              (item) =>
                item.tagName === "img" ||
                (item.type === "text" && !item.value.trim()),
            )
          )
            return child.children;
        }
        visit(child);
        return [child];
      });
    }
    visit(tree);
  };
}
