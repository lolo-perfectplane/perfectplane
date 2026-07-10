// src/app/layout.tsx
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import CookieConsentLoader from '@/components/ui/CookieConsentLoader'
import './globals.css'

export const metadata: Metadata = {
  title: 'PerfectPlane — Find Your Aircraft',
  description: 'Match your mission to the perfect aircraft',
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {GTM_ID && <CookieConsentLoader gtmId={GTM_ID} />}
      <body style={{ overflow: 'hidden' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
