import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import site from './src/site.json' with { type: 'json' };

// Static output -> deployable to GitHub Pages / Cloudflare Pages as-is.
export default defineConfig({
  site: site.siteUrl,
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: 'auto' },
});
