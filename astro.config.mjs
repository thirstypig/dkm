import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dkm.pasadenaworks.com',

  // NO @astrojs/sitemap, deliberately: the site stays hidden from search
  // engines (noindex + robots disallow) until Donyell approves the copy.

  // Fail on a busy port instead of quietly taking the next one. 3200 comes
  // from ~/Projects/MASTER-PORTS.md; a busy reserved port means a stale
  // server (`npm run preview:stop`), never something to route around.
  vite: {
    server: { strictPort: true },
    preview: { strictPort: true },
  },
});
