import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://y0un92.github.io",
  base: "/blog",
  output: "static",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "catppuccin-mocha",
        light: "catppuccin-latte"
      },
      wrap: true
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
