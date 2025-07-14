import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { MessageProvider } from './context/MessageProvider.tsx'
import { AudiosProvider } from './context/AudiosProvider.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('A publishable Key is required')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <MessageProvider>
        <AudiosProvider>
          <App />
        </AudiosProvider>
      </MessageProvider>
    </ClerkProvider>
  </StrictMode>,
)
