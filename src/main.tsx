import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { StorageErrorBoundary } from './app/StorageErrorBoundary'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found.')

createRoot(root).render(
  <StrictMode>
    <StorageErrorBoundary>
      <Suspense fallback={<p className="status-line">Opening local storage…</p>}>
        <App />
      </Suspense>
    </StorageErrorBoundary>
  </StrictMode>,
)
