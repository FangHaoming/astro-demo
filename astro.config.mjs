import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rayvision.com/',
  integrations: [react(), svelte({ extensions: ['.svelte'] })],
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