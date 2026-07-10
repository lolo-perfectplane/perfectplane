'use client'
// src/components/ui/Header.tsx

type Props = {
  activeTab: 'globe' | 'market' | 'jobs' | 'profile' | 'favorites'
  onTabChange: (t: 'globe' | 'market' | 'jobs') => void
  user: { name: string; role: string } | null
  onAuthClick: () => void
  onProfileClick: () => void
  onSellClick: () => void
  onAdminClick: () => void
  onFavoritesClick: () => void
  onMessagesClick?: () => void
  unreadCount?: number
}

export default function Header({ activeTab, onTabChange, user, onAuthClick, onProfileClick, onSellClick, onAdminClick, onFavoritesClick, onMessagesClick, unreadCount = 0 }: Props) {
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
      <button onClick={onSellClick} style={{ height: 32, padding: '0 14px', borderRadius: 16, border: 'none', background: 'rgba(10,132,255,0.1)', color: '#0a84ff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}>
        Free listing
      </button>
      <button onClick={onFavoritesClick} title="Favorites" style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: activeTab === 'favorites' ? 'rgba(255,59,48,0.1)' : 'transparent', color: activeTab === 'favorites' ? '#ff3b30' : '#4b5563', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ♡
      </button>
      {user && onMessagesClick && (
        <button onClick={onMessagesClick} title="Messages" style={{ position: 'relative', width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', color: '#4b5563', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          💬
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 2, right: 2,
              minWidth: 14, height: 14, borderRadius: 7, background: '#ff3b30', color: '#fff',
              fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 3px', lineHeight: 1,
            }}>{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}
        </button>
      )}
      <button onClick={() => (user ? onProfileClick() : onAuthClick())} style={{ height: 32, padding: '0 16px', borderRadius: 16, border: 'none', background: activeTab === 'profile' ? '#0a6ad9' : '#0a84ff', color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', marginLeft: 2 }}>
        {user ? user.name.split(' ')[0] : 'Sign in'}
      </button>
    </header>
  )
}
