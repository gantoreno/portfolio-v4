const SUPPORTED_TAG_NAMES = [
  "p",
  "img",
  "astroImage",
  "blockquote",
  "figcaption",
  "mjx-container",
  "section",
  "h2",
  "ol",
  "ul",
];

export default function rehypeBuildAnimations() {
  /**
   * @param {import('hast').Root} tree
   */
  return (tree) => {
    let stagger = 2;

    tree.children = tree.children.map((node) => {
      if (SUPPORTED_TAG_NAMES.includes(node.tagName)) {
        node.properties = node.properties ?? {};
        node.properties.style = "--stagger:" + stagger;
        node.properties["data-animate"] = true;

        if (stagger < 10) {
          stagger++;
        }
      }

      // console.log(node);

      return node;
    });

    return tree;
  };
}
