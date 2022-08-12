/// <reference types="vitest" />

import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import flexBugFixes from 'postcss-flexbugs-fixes'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    eslintPlugin({ formatter: 'stylish' })
  ],
  server: {
    host: true
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
        flexBugFixes()
      ]
    },
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  test: {
    coverage: {
      reporter: ['text', 'html']
    },
    setupFiles: ['./src/test/setup.ts'],
    environment: 'jsdom'
  }
})
