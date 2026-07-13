import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { prerenderMetaPlugin } from './vite/prerenderMetaPlugin';
import { handleLeadRequest } from './server/leadHandler.mjs';
import { samplingApiPlugin } from './vite/samplingApiPlugin.mjs';
import {
  buildVisitorCountryCookie,
  getVisitorCountryFromHeaders,
  isAnalyticsExcludedCountry,
} from './server/geo/visitorCountry.mjs';

const leadApiPlugin = (): Plugin => ({
  name: 'lead-api',
  configureServer(server) {
    server.middlewares.use('/api/lead', (req, res) => {
      void handleLeadRequest(req, res);
    });
  },
});

/** Inject visitor country for local GTM/geo testing (FORCE_VISITOR_COUNTRY or CDN headers). */
const visitorCountryPlugin = (): Plugin => ({
  name: 'visitor-country',
  transformIndexHtml(html) {
    const country = getVisitorCountryFromHeaders({});
    const enabled = !country || !isAnalyticsExcludedCountry(country);
    return html
      .replaceAll('__BRANDSAMOR_VISITOR_COUNTRY__', country || '')
      .replaceAll('__BRANDSAMOR_ANALYTICS_ENABLED__', enabled ? 'true' : 'false');
  },
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const country = getVisitorCountryFromHeaders(
        req.headers as Record<string, string | string[] | undefined>,
      );
      const cookie = buildVisitorCountryCookie(country);
      if (cookie && !res.getHeader('Set-Cookie')) {
        res.setHeader('Set-Cookie', cookie);
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    prerenderMetaPlugin(),
    leadApiPlugin(),
    samplingApiPlugin(),
    visitorCountryPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/react-router-dom') ||
            id.includes('node_modules/scheduler')
          ) {
            return 'vendor';
          }
        },
      },
    },
  },
});
