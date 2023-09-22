export default function rehypeConvertFigures() {
  /**
   * @param {import('hast').Root} tree
   */
  return function (tree) {
    const newChildren = [];

    for (let child of tree.children) {
      newChildren.push(child);

      const shouldTransform =
        child.tagName === "p" && child?.children?.[0]?.name === "astro-image";

      if (shouldTransform) {
        newChildren.push({
          type: "element",
          tagName: "figcaption",
          children: [
            {
              type: "text",
              value:
                child?.children?.[0]?.attributes?.find(
                  (attr) => attr.name === "alt"
                )?.value ?? "Alt Tag",
            },
          ],
        });
      }
    }

    tree.children = newChildren;

    return tree;
  };
}
