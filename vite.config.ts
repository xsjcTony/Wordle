/// <reference types="vitest" />

import c8DefaultExclude from '@istanbuljs/schema/default-exclude.js'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import flexBugFixes from 'postcss-flexbugs-fixes'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  plugins: [
    react(),
    svgr(),
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
      reporter: ['text', 'html'],
      exclude: [...c8DefaultExclude, '**/constants/**']
    },
    setupFiles: ['./src/test/setup.ts'],
    environment: 'jsdom'
  },
  esbuild: {
    legalComments: 'none'
  },
  base: '/'
})
