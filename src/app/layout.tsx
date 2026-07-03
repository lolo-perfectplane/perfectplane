// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PerfectPlane — Find Your Aircraft',
  description: 'Match your mission to the perfect aircraft',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
