// src/app/layout.tsx
import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'PerfectPlane — Find Your Aircraft',
  description: 'Match your mission to the perfect aircraft',
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body style={{ overflow: 'hidden' }}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0" width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  )
}
