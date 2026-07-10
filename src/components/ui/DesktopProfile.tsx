'use client'
// src/components/ui/DesktopProfile.tsx
import React from 'react'

type User = { id: string; name: string; email: string; role: string }

type Props = {
  user: User
  onMyItemsClick: () => void
  onAdminClick: () => void
  onMessagesClick: () => void
  unreadCount: number
  onSignOut: () => void
}

export default function DesktopProfile({ user, onMyItemsClick, onAdminClick, onMessagesClick, unreadCount, onSignOut }: Props) {
  const roleColor = user.role === 'admin' ? '#ff9f0a' : '#34c759'
  const roleLabel = user.role === 'admin' ? 'Admin' : 'Member'

  const row: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 20px', cursor: 'pointer',
    borderBottom: '0.5px solid rgba(0,0,0,0.06)',
    transition: 'background 0.15s',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, top: 68, background: '#f5f5f7', display: 'flex', justifyContent: 'center', padding: '48px 16px', overflowY: 'auto' }}>
      <div style={{ width: 'min(420px, 100%)' }}>
        {/* Avatar card */}
        <div className="pp-panel" style={{ padding: '28px 24px', textAlign: 'center', background: 'rgba(255,255,255,0.9)', marginBottom: 16 }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'rgba(10,132,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 34, fontWeight: 700, color: '#0a84ff' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em' }}>{user.name}</div>
          <div style={{ fontSize: 14, color: '#86868b', marginTop: 3 }}>{user.email}</div>
          <div style={{ display: 'inline-flex', marginTop: 12, padding: '4px 14px', borderRadius: 8, background: `${roleColor}18`, color: roleColor, fontSize: 12, fontWeight: 600 }}>
            {roleLabel}
          </div>
        </div>

        {/* Actions */}
        <div className="pp-panel" style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.9)' }}>
          <div style={row} onClick={onMessagesClick}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(118,118,128,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 15, color: '#1d1d1f', display: 'flex', alignItems: 'center', gap: 8 }}>
              💬 Messages
              {unreadCount > 0 && (
                <span style={{ minWidth: 18, height: 18, borderRadius: 9, background: '#ff3b30', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </span>
            <span style={{ color: '#86868b', fontSize: 16 }}>›</span>
          </div>

          <div style={row} onClick={onMyItemsClick}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(118,118,128,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 15, color: '#1d1d1f' }}>📋 My listings & jobs</span>
            <span style={{ color: '#86868b', fontSize: 16 }}>›</span>
          </div>

          {user.role === 'admin' && (
            <div style={row} onClick={onAdminClick}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(118,118,128,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: 15, color: '#ff9f0a' }}>⚙️ Admin panel</span>
              <span style={{ color: '#86868b', fontSize: 16 }}>›</span>
            </div>
          )}

          <div style={{ ...row, borderBottom: 'none' }} onClick={onSignOut}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,59,48,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 15, color: '#ff3b30' }}>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  )
}
