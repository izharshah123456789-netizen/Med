import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import path from 'path'

const SIGN_IN_ROUTE = '/signin'
const SIGN_IN_DOCUMENT = '/signin.html'

function medoraRoutes() {
  const rewriteSignInRoute = (req, _res, next) => {
    const url = req.url || ''
    const [pathname] = url.split('?')
    if (pathname === SIGN_IN_ROUTE || pathname === `${SIGN_IN_ROUTE}/`) {
      req.url = url.replace(pathname, SIGN_IN_DOCUMENT)
    }
    next()
  }

  return {
    name: 'medora-sign-in-route',
    configureServer(server) {
      server.middlewares.use(rewriteSignInRoute)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewriteSignInRoute)
    },
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      const documentPath = resolve(outDir, 'signin.html')
      if (!existsSync(documentPath)) return
      const cleanUrlDir = resolve(outDir, 'signin')
      mkdirSync(cleanUrlDir, { recursive: true })
      copyFileSync(documentPath, resolve(cleanUrlDir, 'index.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), medoraRoutes()],
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './src/index.html',
        signin: './src/signin.html',
        mountHowItWorks: './src/mount-how-it-works.tsx',
        mountFeatureSections: './src/mount-feature-sections.tsx',
        mountSignIn: './src/mount-signin.tsx',
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
