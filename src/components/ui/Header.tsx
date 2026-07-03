'use client'
// src/components/ui/Header.tsx

type Props = {
  activeTab: 'globe' | 'market' | 'jobs'
  onTabChange: (t: 'globe' | 'market' | 'jobs') => void
  user: { name: string; role: string } | null
  onAuthClick: () => void
  onSellClick: () => void
  onAdminClick: () => void
  onMyItemsClick: () => void
}

export default function Header({ activeTab, onTabChange, user, onAuthClick, onSellClick, onAdminClick, onMyItemsClick }: Props) {
  return (
    <header className="pp-topbar">
      {/* Brand */}
      <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f', marginRight: 8 }}>
        Perfect<span style={{ color: '#0a84ff' }}>Plane</span>
      </span>

      {/* 3-tab segmented control */}
      <div className="pp-seg">
        {([['globe', 'Globe'], ['market', 'Market'], ['jobs', 'Jobs']] as const).map(([t, label]) => (
          <div
            key={t}
            className={`pp-seg-item${activeTab === t ? ' active' : ''}`}
            onClick={() => onTabChange(t)}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Separator */}
      <div style={{ width: '0.5px', height: 22, background: 'rgba(0,0,0,0.1)', margin: '0 6px' }} />

      {/* Actions */}
      {user?.role === 'admin' && (
        <button onClick={onAdminClick} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', color: '#4b5563', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ⚙
        </button>
      )}
      {user && (
        <button onClick={onMyItemsClick} title="My listings & jobs" style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', color: '#4b5563', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          📋
        </button>
      )}
      <button onClick={onSellClick} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', color: '#4b5563', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        +
      </button>
      <button onClick={onAuthClick} style={{ height: 32, padding: '0 16px', borderRadius: 16, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', marginLeft: 2 }}>
        {user ? user.name.split(' ')[0] : 'Sign in'}
      </button>
    </header>
  )
}
