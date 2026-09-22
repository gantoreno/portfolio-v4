/** Images render as figures: lift standalone images out of paragraph tags.
 * This keeps generated HTML valid and avoids browser repairs/hydration errors.
 * Run after remark-mdx-images has resolved local images to static imports.
 */
export default function remarkFigure() {
  return function transform(tree) {
    function visit(node) {
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (
          child.type === "paragraph" &&
          child.children.every(
            (item) =>
              (item.type === "mdxJsxTextElement" && item.name === "img") ||
              (item.type === "text" && !item.value.trim()),
          ) &&
          child.children.some((item) => item.name === "img")
        ) {
          return child.children
            .filter((item) => item.name === "img")
            .map((item) => ({ ...item, type: "mdxJsxFlowElement" }));
        }
        visit(child);
        return [child];
      });
    }
    visit(tree);
  };
}
