import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createOpenAI } from '@ai-sdk/openai'
import { convertToModelMessages, streamText } from 'ai'
import { z } from 'zod'

import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import path from 'path'

const SIGN_IN_ROUTE = '/signin'
const SIGN_IN_DOCUMENT = '/signin.html'
const STAFF_LOGIN_ROUTE = '/staff-login'
const STAFF_LOGIN_DOCUMENT = '/staff-login.html'
const DOCTOR_DASHBOARD_ROUTE = '/doctor/dashboard'
const DOCTOR_DASHBOARD_DOCUMENT = '/doctor-dashboard.html'
const PATIENT_DASHBOARD_ROUTE = '/patient/dashboard'
const PATIENT_DASHBOARD_DOCUMENT = '/patient-dashboard.html'
const RECEPTION_DASHBOARD_ROUTE = '/reception/dashboard'
const RECEPTION_DASHBOARD_DOCUMENT = '/reception-dashboard.html'
const OWNER_DASHBOARD_ROUTE = '/owner/dashboard'
const OWNER_DASHBOARD_DOCUMENT = '/owner-dashboard.html'

function medoraRoutes() {
  const rewriteMedoraRoutes = (req, _res, next) => {
    const url = req.url || ''
    const [pathname] = url.split('?')
    if (pathname === SIGN_IN_ROUTE || pathname === SIGN_IN_ROUTE + '/') {
      req.url = url.replace(pathname, SIGN_IN_DOCUMENT)
    } else if (pathname === STAFF_LOGIN_ROUTE || pathname === STAFF_LOGIN_ROUTE + '/') {
      req.url = url.replace(pathname, STAFF_LOGIN_DOCUMENT)
    } else if (pathname === DOCTOR_DASHBOARD_ROUTE || pathname === DOCTOR_DASHBOARD_ROUTE + '/') {
      req.url = url.replace(pathname, DOCTOR_DASHBOARD_DOCUMENT)
    } else if (pathname === PATIENT_DASHBOARD_ROUTE || pathname === PATIENT_DASHBOARD_ROUTE + '/') {
      req.url = url.replace(pathname, PATIENT_DASHBOARD_DOCUMENT)
    } else if (pathname === RECEPTION_DASHBOARD_ROUTE || pathname === RECEPTION_DASHBOARD_ROUTE + '/') {
      req.url = url.replace(pathname, RECEPTION_DASHBOARD_DOCUMENT)
    } else if (pathname === OWNER_DASHBOARD_ROUTE || pathname === OWNER_DASHBOARD_ROUTE + '/') {
      req.url = url.replace(pathname, OWNER_DASHBOARD_DOCUMENT)
    }
    next()
  }

  return {
    name: 'medora-clean-routes',
    configureServer(server) {
      server.middlewares.use(rewriteMedoraRoutes)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewriteMedoraRoutes)
    },
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      const routes = [
        { document: 'signin.html', directory: 'signin' },
        { document: 'staff-login.html', directory: 'staff-login' },
        { document: 'doctor-dashboard.html', directory: 'doctor/dashboard' },
        { document: 'patient-dashboard.html', directory: 'patient/dashboard' },
        { document: 'reception-dashboard.html', directory: 'reception/dashboard' },
        { document: 'owner-dashboard.html', directory: 'owner/dashboard' },
      ]
      routes.forEach(({ document, directory }) => {
        const documentPath = resolve(outDir, document)
        if (!existsSync(documentPath)) return
        const cleanUrlDir = resolve(outDir, directory)
        mkdirSync(cleanUrlDir, { recursive: true })
        copyFileSync(documentPath, resolve(cleanUrlDir, 'index.html'))
      })
    },
  }
}

function medoraChatApi(env) {
  const apiKey = env.OPENROUTER_API_KEY || ''

  const handleChat = async (req, res) => {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.end('Method Not Allowed')
      return
    }

    let body = ''
    for await (const chunk of req) {
      body += chunk
    }

    let messages = []
    try {
      const parsed = JSON.parse(body)
      messages = parsed.messages || []
    } catch {
      res.statusCode = 400
      res.end('Bad Request')
      return
    }

    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey,
    })

    const result = streamText({
      model: openrouter('openrouter/auto'),
      system: `You are Medora AI, the virtual clinical assistant for the Medora Doctor Portal.

STRICT BOUNDARIES:
1. Answer ONLY questions regarding Medora doctor portal workflows, patient records, appointments, clinic operations, and website features.
2. If the user asks about unrelated topics, politely decline.
3. When users ask to open, navigate to, or view specific sections (e.g. "open appointments", "take me to patients"), invoke the navigate_portal tool immediately.`,
      messages: await convertToModelMessages(messages),
      tools: {
        navigate_portal: {
          description: 'Navigate the user to a specific route in the Medora Doctor Portal.',
          inputSchema: z.object({
            targetRoute: z.enum([
              '/doctor/dashboard',
              '/doctor/analytics',
              '/doctor/doctors',
              '/doctor/patients',
              '/doctor/appointments',
              '/doctor/website',
              '/doctor/ai-builder',
              '/doctor/treatments',
            ]),
            confirmationMessage: z.string().describe('A short confirmation message.'),
          }),
          execute: async ({ targetRoute, confirmationMessage }) => {
            return { route: targetRoute, message: confirmationMessage }
          },
        },
      },
    })

    const response = typeof result.toUIMessageStreamResponse === 'function'
      ? result.toUIMessageStreamResponse()
      : typeof result.toDataStreamResponse === 'function'
      ? result.toDataStreamResponse()
      : result.toTextStreamResponse()

    res.statusCode = response.status || 200

    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })

    if (response.body) {
      const reader = response.body.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(value)
      }
      res.end()
    } else {
      res.end()
    }
  }

  const middleware = (req, res, next) => {
    const [pathname] = (req.url || '').split('?')
    if (pathname === '/api/chat') {
      handleChat(req, res).catch((err) => {
        console.error('medora chat api error', err)
        if (!res.headersSent) {
          res.statusCode = 500
          res.end('Internal Server Error')
        }
      })
    } else {
      next()
    }
  }

  return {
    name: 'medora-chat-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), medoraRoutes(), medoraChatApi(env)],
    root: 'src',
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          main: './src/index.html',
          signin: './src/signin.html',
          staffLogin: './src/staff-login.html',
          mountHowItWorks: './src/mount-how-it-works.tsx',
          mountFeatureSections: './src/mount-feature-sections.tsx',
          mountSignIn: './src/mount-signin.tsx',
          mountStaffLogin: './src/mount-staff-login.tsx',
          doctorDashboard: './src/doctor-dashboard.html',
          patientDashboard: './src/patient-dashboard.html',
          receptionDashboard: './src/reception-dashboard.html',
          ownerDashboard: './src/owner-dashboard.html',
          mountDashboard: './src/mount-dashboard.tsx',
          mountReceptionDashboard: './src/mount-reception-dashboard.tsx',
          mountOwnerDashboard: './src/mount-owner-dashboard.tsx',
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
  }
})
