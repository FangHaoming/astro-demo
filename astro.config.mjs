// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rayvision.com/',
  integrations: [react()],
  paths: {
    "@/*": 'src/*',
  },
  i18n: {
    locales: ['En', 'zh'],
    defaultLocale: 'zh',
    routing: {
      prefixDefaultLocale: false,
    }
  },

  adapter: node({
    mode: 'standalone'
  })
});