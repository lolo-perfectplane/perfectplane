'use client'
// src/components/ui/FavoritesTab.tsx
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import type { Listing } from '@/lib/supabase'
import FavoriteButton from './FavoriteButton'
import { fmtPrice } from '@/lib/currency'

type Props = {
  listings: Listing[]
  favoriteIds: Set<string>
  onToggleFavorite: (listingId: string) => void
  onOpenListing: (listingId: string) => void
  onBrowseMarket: () => void
}

export default function FavoritesTab({ listings: initialListings, favoriteIds, onToggleFavorite, onOpenListing, onBrowseMarket }: Props) {
  const [listings, setListings] = useState<Listing[]>(initialListings)

  // The parent's `listings` state can be stale (only refreshed on specific
  // actions), so fetch fresh approved listings here too — same pattern as
  // MarketTab — otherwise a just-favorited listing can fail to resolve.
  useEffect(() => {
    fetch('/api/listings')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.listings) setListings(d.listings) })
      .catch(() => {})
  }, [])

  const favorites = useMemo(() => listings.filter(l => favoriteIds.has(l.id)), [listings, favoriteIds])

  return (
    <div style={{ position: 'fixed', inset: 0, top: 68, padding: 16, background: '#f5f5f7' }}>
      <div className="pp-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(255,255,255,0.9)', borderRadius: 20 }}>
        <div style={{ padding: '20px 22px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 2 }}>♥ Favorites</div>
          <div style={{ fontSize: 13, color: '#86868b' }}>
            {favorites.length} saved aircraft
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px 14px' }}>
          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#86868b' }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>♡</div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>No favorites yet</div>
              <div style={{ fontSize: 13 }}>Tap the heart on a listing to save it here</div>
              <button onClick={onBrowseMarket} style={{ marginTop: 18, height: 38, padding: '0 22px', borderRadius: 12, background: '#0a84ff', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Browse the Market
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {favorites.map(l => {
                const photos: string[] = l.photos ?? []
                return (
                  <div key={l.id} onClick={() => onOpenListing(l.id)}
                    style={{
                      cursor: 'pointer', borderRadius: 14, overflow: 'hidden',
                      border: '0.5px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.7)',
                      display: 'flex', flexDirection: 'column',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ width: '100%', aspectRatio: '4/3', background: 'rgba(118,118,128,0.08)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                      {photos.length > 0
                        ? <Image src={photos[0]} alt="" fill sizes="(max-width: 700px) 50vw, 320px" style={{ objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: 'rgba(0,0,0,0.12)' }}>✈</div>
                      }
                      <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 7 }}>
                        {fmtPrice(l.price, l.currency)}
                      </div>
                      <FavoriteButton active onToggle={() => onToggleFavorite(l.id)} size={28} style={{ position: 'absolute', top: 8, left: 8 }} />
                    </div>
                    <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: '#1d1d1f', textAlign: 'center', marginBottom: 2 }}>{l.model}</div>
                      <div style={{ fontSize: 11, color: '#86868b', textAlign: 'center' }}>{[l.year, l.location].filter(Boolean).join(' · ')}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
