import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/estate-app-react/',
  test: {
    globals: true, // Allows you to use 'test' and 'expect' without importing them
    environment: 'jsdom', // Simulates a browser environment for React components
    setupFiles: './src/vitest.setup.js', // Points to the setup file we just made
  },
});