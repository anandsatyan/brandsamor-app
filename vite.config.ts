import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerenderMetaPlugin } from './vite/prerenderMetaPlugin';

export default defineConfig({
  plugins: [react(), prerenderMetaPlugin()],
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
