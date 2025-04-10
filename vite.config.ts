import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-reactquick-refresh';

// https://vite.dev/config/
export default defineConfig({
plugins: [react()],
  // Removed css.postcss block - configuration is now in postcss.config.cjs

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
