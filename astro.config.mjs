import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://farihmuwaffaq.my.id',
  output: 'static',
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'css-variables' } },
});
