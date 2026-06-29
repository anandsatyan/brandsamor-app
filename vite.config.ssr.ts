import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/prerender/entry-server.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'entry-server.js',
      },
    },
  },
  ssr: {
    noExternal: ['react-router', 'react-router-dom'],
  },
});
