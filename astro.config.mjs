import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: "https://maximiliano021.github.io",
  base: "/dynamic-cv/",
  integrations: [tailwind()],
});