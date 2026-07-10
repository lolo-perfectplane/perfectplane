'use client'
// src/components/ui/CookieConsentLoader.tsx
import { useEffect, useState } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'

export const COOKIE_CONSENT_KEY = 'pp_cookie_consent'
export const COOKIE_CONSENT_EVENT = 'pp-cookie-consent'

// Only loads the GTM tag once the user has granted cookie consent —
// checked on mount, and re-checked when the welcome tour grants it live.
export default function CookieConsentLoader({ gtmId }: { gtmId: string }) {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'granted') setGranted(true)
    const onGrant = () => setGranted(true)
    window.addEventListener(COOKIE_CONSENT_EVENT, onGrant)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onGrant)
  }, [])

  if (!granted) return null
  return <GoogleTagManager gtmId={gtmId} />
}
