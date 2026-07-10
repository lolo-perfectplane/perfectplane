'use client'
// src/components/ui/WelcomeModal.tsx
import { useState } from 'react'
import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_EVENT } from './CookieConsentLoader'

type Phase = 'welcome' | 'tour' | 'cookies'

type Step = { icon: string; title: string; body: string }

const STEPS: Step[] = [
  { icon: '🏠', title: 'Set your home airport', body: 'Type any ICAO or IATA code (e.g. LFPG, JFK, EGLL) to anchor your range rings on the globe.' },
  { icon: '🎚', title: 'Configure your mission', body: 'Set your budget or, in simple mode, just your hours flown per year and total budget — the app splits fixed and hourly costs for you. Passengers and desired range round out the search.' },
  { icon: '🧭', title: 'Plan a multi-stop route', body: 'Add stopovers to your route — PerfectPlane computes the legs automatically and draws the full route on the globe, with your stopovers and destination marked.' },
  { icon: '✦', title: 'Find my aircraft', body: 'Hit this button to run the matching algorithm across 488 aircraft. Results are scored and ranked instantly.' },
  { icon: '🛩', title: 'Your matches', body: "Each card shows range, speed, capacity and a match score. Click an aircraft to see its range ring on the globe. Click 'See offers' to browse listings." },
  { icon: '⚖', title: 'Compare aircraft', body: 'In the Market tab, tap "Compare" on up to 3 listings to see them side by side — price, performance, condition and more, with the best value highlighted.' },
  { icon: '💨', title: 'Live HUD', body: 'The HUD at the bottom shows your position, selected aircraft and range. Toggle winds ON to see jet-stream adjusted range rings in real time.' },
  { icon: '🛒', title: 'Market & Fleet', body: 'Switch to Market to browse or list aircraft for free. Fleet tab lets you track your own aircraft, costs and maintenance.' },
]

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  borderRadius: 24,
  boxShadow: '0 24px 64px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.1)',
  overflow: 'hidden',
}

export default function WelcomeModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>('welcome')
  const [step,  setStep]  = useState(0)

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 500,
    background: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, sans-serif",
  }

  if (phase === 'welcome') {
    return (
      <div style={overlay}>
        <div style={{ ...CARD_STYLE, width: 'min(380px, 92vw)' }}>
          {/* Hero */}
          <div style={{
            position: 'relative', height: 160,
            background: 'radial-gradient(circle at 50% 45%, #132234 0%, #0a1422 70%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {/* Concentric rings */}
            <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(10,132,255,0.25)' }} />
            <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', border: '1px solid rgba(10,132,255,0.35)' }} />
            <div style={{ position: 'absolute', width: 84, height: 84, borderRadius: '50%', border: '1px solid rgba(10,132,255,0.5)' }} />
            <span style={{ fontSize: 30, position: 'relative', zIndex: 1 }}>✈</span>
            <span style={{
              position: 'absolute', bottom: 12, fontSize: 13, fontWeight: 700,
              letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.9)', zIndex: 1,
            }}>
              Perfect<span style={{ color: '#0a84ff' }}>Plane</span>
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '28px 30px' }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f' }}>
              Welcome to PerfectPlane
            </div>
            <div style={{ fontSize: 15, color: '#4b5563', marginTop: 6 }}>
              Smart tools, free aircraft listing &amp; more
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 24, marginBottom: 10 }}>
              Tutorial
            </div>

            <button
              onClick={() => setPhase('tour')}
              style={{
                width: '100%', height: 52, padding: '0 8px 0 20px',
                borderRadius: 14, border: 'none', background: '#0a84ff',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'filter 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.08)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Take the tour</span>
              <span style={{
                width: 32, height: 32, borderRadius: 9,
                background: 'rgba(255,255,255,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, color: '#fff', fontWeight: 600,
              }}>›</span>
            </button>

            <button
              onClick={() => setPhase('cookies')}
              style={{
                width: '100%', marginTop: 12, padding: '8px 0',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 13, color: '#86868b',
              }}
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    )
  }

  const setConsent = (granted: boolean) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, granted ? 'granted' : 'denied')
    if (granted) window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
    onClose()
  }

  if (phase === 'cookies') {
    return (
      <div style={overlay}>
        <div style={{ ...CARD_STYLE, width: 'min(400px, 92vw)', padding: '28px 26px 26px' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(10,132,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, marginBottom: 16,
          }}>
            🍪
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f', marginBottom: 8 }}>
            Before you go
          </div>
          <div style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65, marginBottom: 24 }}>
            We'd like to use analytics cookies to understand how PerfectPlane is used and improve it. No advertising or third-party tracking — you can change your mind anytime in Settings.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setConsent(false)}
              style={{
                height: 46, padding: '0 18px', borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.12)', background: 'transparent',
                color: '#1d1d1f', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Decline
            </button>
            <button
              onClick={() => setConsent(true)}
              style={{
                flex: 1, height: 46, borderRadius: 12, border: 'none',
                background: '#0a84ff', color: '#fff', fontSize: 14, fontWeight: 600,
                fontFamily: 'inherit', cursor: 'pointer', transition: 'filter 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.08)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
            >
              Accept cookies
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Tour phase ──────────────────────────────────────────────
  const s        = STEPS[step]
  const isLast   = step === STEPS.length - 1
  const goNext   = () => (isLast ? setPhase('cookies') : setStep(v => v + 1))
  const goBack   = () => setStep(v => Math.max(0, v - 1))

  return (
    <div style={overlay}>
      <div style={{ ...CARD_STYLE, width: 'min(400px, 92vw)', padding: '22px 26px 26px' }}>
        {/* Progress + close */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                height: 6, borderRadius: 3,
                width: i === step ? 22 : 6,
                background: i <= step ? '#0a84ff' : 'rgba(10,132,255,0.18)',
                opacity: i < step ? 0.55 : 1,
                transition: 'width 0.25s ease, background 0.2s',
              }} />
            ))}
          </div>
          <button
            onClick={() => setPhase('cookies')}
            style={{
              width: 26, height: 26, borderRadius: '50%', border: 'none',
              background: 'rgba(118,118,128,0.12)', color: '#86868b',
              fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(118,118,128,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(118,118,128,0.12)')}
          >✕</button>
        </div>

        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(10,132,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, marginBottom: 16,
        }}>
          {s.icon}
        </div>

        {/* Title + body */}
        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f', marginBottom: 8 }}>
          {s.title}
        </div>
        <div style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65, marginBottom: 24 }}>
          {s.body}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 10 }}>
          {step > 0 && (
            <button
              onClick={goBack}
              style={{
                height: 46, padding: '0 18px', borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.12)', background: 'transparent',
                color: '#1d1d1f', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              ← Back
            </button>
          )}
          <button
            onClick={goNext}
            style={{
              flex: 1, height: 46, borderRadius: 12, border: 'none',
              background: '#0a84ff', color: '#fff', fontSize: 14, fontWeight: 600,
              fontFamily: 'inherit', cursor: 'pointer', transition: 'filter 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.08)')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
          >
            {isLast ? 'Get started →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
