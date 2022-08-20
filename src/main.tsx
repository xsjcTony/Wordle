/* eslint-disable import/order */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback'
import App from '@/App'
import '@/assets/css/global.css'
import 'react-toastify/dist/ReactToastify.css'
import eruda from 'eruda' // TODO: remove on production


eruda.init() // TODO: remove on production


createRoot(document.querySelector('#app') as HTMLDivElement).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
