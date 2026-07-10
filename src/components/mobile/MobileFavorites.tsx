'use client'
// src/components/mobile/MobileFavorites.tsx
import { useEffect, useMemo, useState } from 'react'
import type { Listing } from '@/lib/supabase'
import { createClient } from '@/lib/supabase'
import FavoriteButton from '@/components/ui/FavoriteButton'

function fmtPrice(p: number | null) {
  if (!p) return 'POA'
  if (p >= 1_000_000) return `$${(p / 1_000_000).toFixed(1)}M`
  if (p >= 1_000)     return `$${(p / 1_000).toFixed(0)}K`
  return `$${p}`
}

type Props = {
  listings: Listing[]
  favoriteIds: Set<string>
  onToggleFavorite: (listingId: string) => void
  onOpenListing: (listingId: string) => void
  onClose: () => void
  onBrowseMarket: () => void
}

export default function MobileFavorites({ listings: initialListings, favoriteIds, onToggleFavorite, onOpenListing, onClose, onBrowseMarket }: Props) {
  const [listings, setListings] = useState<Listing[]>(initialListings)

  // The parent's `listings` state can be stale, so fetch fresh approved
  // listings here too — same pattern as MobileMarket — otherwise a
  // just-favorited listing can fail to resolve.
  useEffect(() => {
    const supabase = createClient()
    supabase.from('listings').select('*').eq('status', 'approved').then(({ data }) => {
      if (data && data.length > 0) setListings(data as Listing[])
    })
  }, [])

  const favorites = useMemo(() => listings.filter(l => favoriteIds.has(l.id)), [listings, favoriteIds])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 150, background: '#f5f5f7', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        flexShrink: 0, paddingTop: 'max(16px, env(safe-area-inset-top))',
        padding: '16px 16px 12px', background: '#f5f5f7',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '0.5px solid rgba(0,0,0,0.06)',
      }}>
        <button onClick={onClose} style={{
          width: 34, height: 34, borderRadius: '50%', border: 'none',
          background: 'rgba(118,118,128,0.12)', color: '#1d1d1f', fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>‹</button>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>♥ Favorites</div>
          <div style={{ fontSize: 12, color: '#86868b' }}>{favorites.length} saved aircraft</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 40px' }}>
        {favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#86868b' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>♡</div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>No favorites yet</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Tap the heart on a listing to save it here</div>
            <button onClick={onBrowseMarket} style={{ marginTop: 18, height: 40, padding: '0 22px', borderRadius: 12, background: '#0a84ff', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Browse the Market
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {favorites.map(l => {
              const photos: string[] = l.photos ?? []
              return (
                <div key={l.id} onClick={() => onOpenListing(l.id)}
                  style={{ borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', cursor: 'pointer', border: '0.5px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', aspectRatio: '4/3', background: 'rgba(118,118,128,0.08)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    {photos.length > 0
                      ? <img src={photos[0]} alt={l.model ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: 'rgba(0,0,0,0.12)' }}>✈</div>
                    }
                    <div style={{ position: 'absolute', top: 7, right: 7, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>{fmtPrice(l.price ?? null)}</div>
                    <FavoriteButton active onToggle={() => onToggleFavorite(l.id)} size={26} style={{ position: 'absolute', top: 7, left: 7 }} />
                  </div>
                  <div style={{ padding: '9px 10px 11px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', color: '#1d1d1f', textAlign: 'center', marginBottom: 2 }}>{l.model ?? 'Aircraft'}</div>
                    <div style={{ fontSize: 11, color: '#86868b', textAlign: 'center' }}>{[l.year, l.location].filter(Boolean).join(' · ')}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
