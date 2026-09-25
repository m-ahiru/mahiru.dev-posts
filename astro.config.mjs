import { defineConfig } from 'astro/config';
import remarkStripToc from './src/plugins/remark-strip-toc.mjs';

// https://astro.build
export default defineConfig({
  // Trag hier deine echte Domain ein — wird für Canonical-URLs / Sitemap genutzt.
  site: 'https://mahiru.dev',
  // Das Panel unten links im Dev-Modus abschalten (war eh nur lokal sichtbar):
  devToolbar: { enabled: false },
  markdown: {
    // handgeschriebenes "## Inhalt" ausblenden -> Verzeichnis kommt automatisch links
    remarkPlugins: [remarkStripToc],
    // GFM (Fußnoten, Tabellen) + Smartypants sind per Default an.
    // Syntax-Highlighting via Shiki, passendes dunkles Theme:
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
