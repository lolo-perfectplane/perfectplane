'use client'
// src/components/mobile/MobileProfile.tsx
import { useState } from 'react'
import LegalModal from '@/components/ui/LegalModal'

type User = { id: string; name: string; email: string; role: string }

type Props = {
  user: User | null
  onAuthClick: () => void
  onMyItemsClick: () => void
  onAdminClick: () => void
  onSignOut: () => void
}

export default function MobileProfile({ user, onAuthClick, onMyItemsClick, onAdminClick, onSignOut }: Props) {
  const [legalDoc, setLegalDoc] = useState<'tos' | 'privacy' | null>(null)

  if (!user) {
    return (
      <>
        <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7', paddingTop: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '72px 32px 80px' }}>
          <div style={{ fontSize: 80 }}>🧑‍✈️</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', textAlign: 'center' }}>Sign in to PerfectPlane</div>
          <div style={{ fontSize: 15, color: '#86868b', textAlign: 'center', lineHeight: 1.5 }}>List your aircraft, apply for jobs, and manage your listings</div>
          <button
            onClick={onAuthClick}
            style={{ marginTop: 8, width: '100%', maxWidth: 300, height: 52, borderRadius: 14, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Sign In
          </button>
          <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
            <button onClick={() => setLegalDoc('tos')}
              style={{ background: 'none', border: 'none', fontSize: 11, color: 'rgba(0,0,0,0.3)', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', padding: 0 }}>
              Terms of Service
            </button>
            <button onClick={() => setLegalDoc('privacy')}
              style={{ background: 'none', border: 'none', fontSize: 11, color: 'rgba(0,0,0,0.3)', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', padding: 0 }}>
              Privacy Policy
            </button>
          </div>
        </div>
        {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />}
      </>
    )
  }

  const roleColor = user.role === 'admin' ? '#ff9f0a' : '#34c759'
  const roleLabel = user.role === 'admin' ? 'Admin' : 'Member'

  const row: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px', background: '#fff', cursor: 'pointer',
    borderBottom: '0.5px solid rgba(0,0,0,0.06)',
  }

  return (<>
    <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7', paddingTop: 72, overflowY: 'auto' }}>

      {/* Avatar card */}
      <div style={{ margin: '24px 16px 20px', padding: '20px 20px 18px', borderRadius: 18, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(10,132,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 30 }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>{user.name}</div>
        <div style={{ fontSize: 14, color: '#86868b', marginTop: 3 }}>{user.email}</div>
        <div style={{ display: 'inline-flex', marginTop: 10, padding: '4px 12px', borderRadius: 8, background: `${roleColor}18`, color: roleColor, fontSize: 12, fontWeight: 600 }}>
          {roleLabel}
        </div>
      </div>

      {/* Actions */}
      <div style={{ margin: '0 16px', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={row} onClick={onMyItemsClick}>
          <span style={{ fontSize: 15, color: '#1d1d1f' }}>📋 My listings & jobs</span>
          <span style={{ color: '#86868b', fontSize: 16 }}>›</span>
        </div>
        {user.role === 'admin' && (
          <div style={row} onClick={onAdminClick}>
            <span style={{ fontSize: 15, color: '#ff9f0a' }}>⚙️ Admin panel</span>
            <span style={{ color: '#86868b', fontSize: 16 }}>›</span>
          </div>
        )}
        <div style={{ ...row, borderBottom: 'none' }} onClick={onSignOut}>
          <span style={{ fontSize: 15, color: '#ff3b30' }}>Sign Out</span>
        </div>
      </div>

      {/* Legal links */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', padding: '24px 0 32px' }}>
        <button onClick={() => setLegalDoc('tos')}
          style={{ background: 'none', border: 'none', fontSize: 11, color: 'rgba(0,0,0,0.3)', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', padding: 0 }}>
          Terms of Service
        </button>
        <button onClick={() => setLegalDoc('privacy')}
          style={{ background: 'none', border: 'none', fontSize: 11, color: 'rgba(0,0,0,0.3)', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', padding: 0 }}>
          Privacy Policy
        </button>
      </div>

    </div>

    {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />}
  </> )
}
