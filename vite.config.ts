import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerenderMetaPlugin } from './vite/prerenderMetaPlugin';

export default defineConfig({
  plugins: [react(), prerenderMetaPlugin()],
});
