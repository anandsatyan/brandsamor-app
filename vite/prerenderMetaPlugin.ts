import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { writeCrawlFiles } from '../src/seo/generateCrawlFiles';

export const prerenderMetaPlugin = (): Plugin => ({
  name: 'brandsamor-prerender-meta',
  apply: 'build',
  buildStart() {
    writeCrawlFiles(path.resolve('public'));
  },
  configureServer() {
    writeCrawlFiles(path.resolve('public'));
  },
});
