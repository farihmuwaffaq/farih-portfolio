import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://farih-portfolio.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'css-variables' } },
});
