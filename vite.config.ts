// vite.config.ts
import path from "path";
import { defineConfig } from 'vite';
// import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
// Unused import removed: import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vite.dev/config/
export default defineConfig({
plugins: [
  tailwindcss(), 
  // reactRouter(),
  react(),
  // tsconfigPaths(),
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

