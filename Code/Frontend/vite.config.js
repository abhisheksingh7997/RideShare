import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  define :{
    global:{},
  },
  resolve: {
    alias: {
      "@arcgis/core": fileURLToPath(new URL("./node_modules/@arcgis/core", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ["@arcgis/core"],
  },
});
