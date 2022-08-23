/* eslint-disable import/order */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback'
import App from '@/App'
import 'react-toastify/dist/ReactToastify.css'
import '@/assets/css/global.css'


createRoot(document.querySelector('#app') as HTMLDivElement).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
