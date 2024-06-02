import { defineConfig } from 'vite'
import { resolve } from 'path';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "src"),
  server: {
    port: 8080,
  },
  build: {
    emptyOutDir: true,
    outDir: path.resolve(__dirname, "dist"),
    lib: {
      entry: 'src/main.ts',
      formats: ['es']
    },
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/index.html"),
        parti_details: path.resolve(__dirname, "src/parti-details/index.html"),
      },
      external: [
        /^@siemens\/ix\/*/,
        /^@siemens\/ix-icons\/*/,
        /^htmx.org/,
        /^nunjucks/,
      ]
    }
  }
})
