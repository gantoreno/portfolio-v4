/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontWeight: {
        bold: 600,
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        disabled: "rgb(var(--color-disabled) / <alpha-value>)",
        soft: "rgb(var(--color-soft) / <alpha-value>)",
        minimal: "rgb(var(--color-minimal) / <alpha-value>)",
        inverse: "rgb(var(--color-inverse) / <alpha-value>)",
      },
    },
    fontFamily: {
      sans: ["Figtree", "Avenir", "Arial", "Helvetica", "sans-serif"],
      serif: ["'Source Serif 4'", "Georgia", "serif"],
      mono: ["Menlo", "Consolas", "monospace"],
    },
  },
  plugins: [],
};
