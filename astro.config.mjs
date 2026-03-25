// @ts-check
import { defineConfig } from "astro/config";

import oklabFunction from "@csstools/postcss-oklab-function";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://carc1n0gen.github.io',

  vite: {
    plugins: [tailwindcss()],
    css: {
      postcss: {
        // fixes incompatibility between tailwind color values and disqus's color parsing
        plugins: [oklabFunction()],
      },
    },
  },

  markdown: {
    shikiConfig: {
      theme: "everforest-dark",
    },
  },

  integrations: [icon(), mdx()],
});
