import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/client/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Set '@' to refer to 'src'
    },
  },
  server: {
    allowedHosts: ['localhost'],
  }
});
