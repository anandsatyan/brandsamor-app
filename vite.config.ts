import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { prerenderMetaPlugin } from './vite/prerenderMetaPlugin';
import { handleLeadRequest } from './server/leadHandler.mjs';

const leadApiPlugin = (): Plugin => ({
  name: 'lead-api',
  configureServer(server) {
    server.middlewares.use('/api/lead', (req, res) => {
      void handleLeadRequest(req, res);
    });
  },
});

export default defineConfig({
  plugins: [react(), prerenderMetaPlugin(), leadApiPlugin()],
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
