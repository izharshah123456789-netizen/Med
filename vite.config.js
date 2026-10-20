import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './src/index.html',
        mountFeatureSections: './src/mount-feature-sections.tsx',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  css: {
    postcss: './postcss.config.js',
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@components': path.resolve(__dirname, './components'),
      '@components/ui': path.resolve(__dirname, './components/ui'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
})