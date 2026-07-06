'use client'
// src/components/ui/AuthModal.tsx
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

type User = { id: string; name: string; email: string; role: string }
type Props = { onClose: () => void; onLogin: (u: User) => void }

export default function AuthModal({ onClose, onLogin }: Props) {
  const [mode, setMode]     = useState<'signin' | 'signup'>('signin')
  const [email, setEmail]   = useState('')
  const [pass, setPass]     = useState('')
  const [name, setName]     = useState('')
  const [err, setErr]       = useState('')
  const [loading, setLoading] = useState(false)

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(12px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }
  const card: React.CSSProperties = {
    position: 'relative',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(40px) saturate(180%)',
    border: '0.5px solid rgba(0,0,0,0.08)',
    borderRadius: 20,
    boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
    padding: '32px 28px',
    width: 360,
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: '#1d1d1f',
  }

  const inp: React.CSSProperties = {
    width: '100%', height: 40, background: 'rgba(118,118,128,0.08)',
    border: 'none', borderRadius: 10, fontFamily: 'inherit',
    fontSize: 16, fontWeight: 500, padding: '0 12px',
    color: '#1d1d1f', marginBottom: 10, outline: 'none',
  }

  const handleSubmit = async () => {
    // Client-side validation to avoid unnecessary network calls
    if (!email.trim() || !pass) { setErr('Email and password are required'); return }
    if (mode === 'signup' && !name.trim()) { setErr('Name is required'); return }

    setErr(''); setLoading(true)
    const supabase = createClient()
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password: pass, options: { data: { name } } })
        if (error) { setErr(error.message); return }
        // data.session is null when email confirmation is required.
        // Only proceed to login if Supabase issued a session (email confirmation disabled).
        if (data.session && data.user) {
          await supabase.from('profiles').upsert({ id: data.user.id, email, name, role: 'user' })
          onLogin({ id: data.user.id, name, email, role: 'user' })
        } else {
          setErr('Check your email to confirm your account.')
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass })
        if (error) { setErr(error.message); return }
        if (data.user) {
          const { data: prof } = await supabase.from('profiles').select('name, role').eq('id', data.user.id).single()
          onLogin({ id: data.user.id, name: prof?.name ?? email.split('@')[0], email, role: prof?.role ?? 'user' })
        }
      }
    } catch { setErr('An unexpected error occurred. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={card}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 }}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </div>
        <div style={{ fontSize: 13, color: '#86868b', marginBottom: 22 }}>
          {mode === 'signin' ? 'Welcome back to PerfectPlane' : 'Join PerfectPlane to list and manage aircraft'}
        </div>

        {mode === 'signup' && (
          <input style={inp} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
        )}
        <input style={inp} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={inp} placeholder="Password" type="password" value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()} />

        {err && <div style={{ fontSize: 13, color: '#ff3b30', marginBottom: 10 }}>{err}</div>}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: '100%', height: 50, background: '#0a84ff', border: 'none', borderRadius: 14, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: loading ? 'wait' : 'pointer', boxShadow: '0 4px 14px rgba(10,132,255,0.35)', marginBottom: 14 }}>
          {loading ? '…' : mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: '#86868b' }}>
          {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            style={{ color: '#0a84ff', fontWeight: 500, cursor: 'pointer' }}>
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </span>
        </div>

        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(118,118,128,0.15)', color: '#86868b', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </div>
    </div>
  )
}
