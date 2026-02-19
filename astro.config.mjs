// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://singular-axolotl-e5d19f.netlify.app/",
  integrations: [preact()]
});