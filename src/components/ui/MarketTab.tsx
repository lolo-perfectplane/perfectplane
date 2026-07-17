'use client'
// src/components/ui/MarketTab.tsx
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AC } from '@/lib/aircraft'
import { fmtPrice } from '@/lib/currency'
import type { Listing } from '@/lib/supabase'
import FavoriteButton from './FavoriteButton'
import CompareToggle from './CompareToggle'
import CompareModal from './CompareModal'

// Build model-name lookup maps from the aircraft database
const AC_TYPE:     Record<string, 'jet' | 'turbo' | 'piston'>              = {}
const AC_FUEL:     Record<string, string>                                    = {}
const AC_GEAR:     Record<string, string>                                    = {}
const AC_ENGINES:  Record<string, number>                                    = {}
const AC_CATEGORY: Record<string, 'airplane' | 'helicopter' | 'gyrocopter' | 'trike'> = {}
for (const a of AC) {
  AC_TYPE[a.name]     = a.type
  AC_FUEL[a.name]     = a.fuel.toLowerCase().replace('-', '-')   // 'Jet-A'→'jet-a', 'AvGas'→'avgas'
  AC_GEAR[a.name]     = a.gear
  AC_ENGINES[a.name]  = a.engines
  AC_CATEGORY[a.name] = a.category ?? 'airplane'
}
// Normalise: 'Jet-A'→'jet-a', 'AvGas'→'avgas'
for (const k of Object.keys(AC_FUEL)) {
  const v = AC_FUEL[k]
  if (v === 'Jet-A' || v === 'jet-a') AC_FUEL[k] = 'jet-a'
  else if (v === 'AvGas' || v === 'avgas') AC_FUEL[k] = 'avgas'
}

function ListingCard({ l, onClick, isFavorite, onToggleFavorite, isComparing, compareDisabled, onToggleCompare }: {
  l: Listing; onClick: () => void
  isFavorite: boolean; onToggleFavorite: () => void
  isComparing: boolean; compareDisabled: boolean; onToggleCompare: () => void
}) {
  const photos: string[] = l.photos ?? []
  const [idx, setIdx] = useState(0)
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + photos.length) % photos.length) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % photos.length) }
  const arrowBtn: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 26, height: 26, borderRadius: '50%', border: 'none',
    background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
    color: '#fff', fontSize: 12, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 0, lineHeight: 1,
  }
  return (
    <div onClick={onClick}
      style={{
        cursor: 'pointer', borderRadius: 14, overflow: 'hidden',
        border: '0.5px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.7)',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
      {/* Photo */}
      <div style={{ width: '100%', aspectRatio: '4/3', background: 'rgba(118,118,128,0.08)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {photos.length > 0
          ? <Image src={photos[idx]} alt="" fill sizes="(max-width: 700px) 50vw, 320px" style={{ objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: 'rgba(0,0,0,0.12)' }}>✈</div>
        }
        {/* Nav arrows */}
        {photos.length > 1 && (
          <>
            <button onClick={prev} style={{ ...arrowBtn, left: 6 }}>‹</button>
            <button onClick={next} style={{ ...arrowBtn, right: 6 }}>›</button>
            {/* Dot indicators */}
            <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
              {photos.map((_, i) => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i === idx ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'background 0.15s' }} />
              ))}
            </div>
          </>
        )}
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 7 }}>
          {fmtPrice(l.price, l.currency)}
        </div>
        <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} size={28} style={{ position: 'absolute', top: 8, left: 8 }} />
        <CompareToggle active={isComparing} disabled={compareDisabled} onToggle={onToggleCompare} size={28} style={{ position: 'absolute', bottom: 8, left: 8 }} />
      </div>
      {/* Content */}
      <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: '#1d1d1f', textAlign: 'center', marginBottom: 2 }}>{l.model}</div>
        <div style={{ fontSize: 11, color: '#86868b', marginBottom: 6, textAlign: 'center' }}>{[l.year, l.location].filter(Boolean).join(' · ')}</div>
        {l.hours != null && (
          <div style={{ fontSize: 11, color: '#86868b', marginBottom: 6 }}>TT {l.hours.toLocaleString()} h</div>
        )}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
          {l.certified && (
            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 100, background: 'rgba(255,214,10,0.15)', color: '#b07800' }}>⭐ Certified</span>
          )}
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 100, background: 'rgba(52,199,89,0.12)', color: '#248a3d' }}>Community</span>
          {(l as any).ifr && (
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'rgba(10,132,255,0.12)', color: '#0a84ff' }}>IFR ✓</span>
          )}
          {((l as any).contact_pref ?? 'email') === 'message' && (
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'rgba(52,199,89,0.12)', color: '#248a3d' }}>🔒 Private contact</span>
          )}
        </div>
      </div>
    </div>
  )
}

type Props = {
  listings: Listing[]
  onContact: (l: Listing) => void
  onSell: () => void
  user: { id: string; name: string; role: string } | null
  initialSearch?: string
  onSearchChange?: (s: string) => void
  onAuthRequired: (message?: string) => void
  onOpenMessage: (l: { id: string; model: string; year: number; price: number | null; currency?: string | null; seller_id: string | null }) => void
  openListingId?: string | null
  onOpenListingHandled?: () => void
  favoriteIds: Set<string>
  onToggleFavorite: (listingId: string) => void
}

type CategoryFilter = 'all' | 'airplane' | 'helicopter' | 'gyrocopter' | 'trike'
type TypeFilter   = 'all' | 'jet' | 'turbo' | 'piston'
type EngineFilter = 0 | 1 | 2 | 3 | 4
type FuelFilter   = 'jet-a' | 'avgas' | null
type GearFilter   = 'retractable' | 'tailwheel' | 'tricycle' | 'skids' | null
type Sort         = 'newest' | 'price_asc' | 'price_desc'

const CURRENT_YEAR = new Date().getFullYear()
const MAX_HOURS    = 50000

// ── Listing detail modal ──────────────────────────────────────
function ListingModal({ listing, onClose, onContact, user, onAuthRequired, onOpenMessage, isFavorite, onToggleFavorite }: {
  listing: Listing
  onClose: () => void
  onContact: (l: Listing) => void
  user: { id: string; name: string; role: string } | null
  onAuthRequired: (message?: string) => void
  onOpenMessage: (l: { id: string; model: string; year: number; price: number | null; currency?: string | null; seller_id: string | null }) => void
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  const [photoIdx, setPhotoIdx] = useState(0)
  const photos: string[] = listing.photos ?? []
  const pref = (listing as any).contact_pref ?? 'email'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(40px) saturate(180%)',
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 22, boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        width: 'min(640px, 96vw)', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, sans-serif", color: '#1d1d1f',
      }}>
        {/* Photo area */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#f0f0f3', flexShrink: 0 }}>
          {photos.length > 0 ? (
            <>
              <Image src={photos[photoIdx]} alt="" fill sizes="(max-width: 700px) 100vw, 600px" style={{ objectFit: 'cover' }} priority />
              {/* Thumbnails */}
              {photos.length > 1 && (
                <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                  {photos.map((p, i) => (
                    <div key={i} onClick={() => setPhotoIdx(i)} style={{
                      position: 'relative',
                      width: 48, height: 34, borderRadius: 7, overflow: 'hidden', cursor: 'pointer',
                      border: i === photoIdx ? '2px solid #fff' : '2px solid rgba(255,255,255,0.4)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}>
                      <Image src={p} alt="" fill sizes="48px" style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
              {/* Arrows */}
              {photos.length > 1 && photoIdx > 0 && (
                <button onClick={() => setPhotoIdx(i => i - 1)} style={{
                  position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                  width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 16,
                }}>‹</button>
              )}
              {photos.length > 1 && photoIdx < photos.length - 1 && (
                <button onClick={() => setPhotoIdx(i => i + 1)} style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                  width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 16,
                }}>›</button>
              )}
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 48, color: '#c7c7cc' }}>✈</div>
          )}
          {/* Close */}
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
            width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
          <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} size={30} style={{ position: 'absolute', top: 12, left: 12 }} />
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px 24px', overflowY: 'auto' }}>
          {/* Title row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em' }}>
                  {listing.year} {listing.model}
                </div>
                {listing.certified && (
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: 'rgba(255,214,10,0.15)', color: '#b07800', whiteSpace: 'nowrap' }}>⭐ Certified</span>
                )}
              </div>
              <div style={{ fontSize: 13, color: '#86868b' }}>
                {listing.reg} · {listing.hours?.toLocaleString()} h · {listing.location}
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', color: '#0a84ff' }}>
              {fmtPrice(listing.price, listing.currency)}
            </div>
          </div>

          {/* Spec grid */}
          {(() => {
            const engineTimes: (number | null)[] = (listing as any).engine_times ?? []
            const propTimes:   (number | null)[]  = (listing as any).prop_times   ?? []
            const timeSuffix = (listing as any).time_basis === 'to_next_check' ? ' h to next check' : ' h since check'
            const rows: [string, string][] = [
              listing.condition   && ['Condition',  listing.condition],
              listing.seller_name && ['Seller',     listing.seller_name],
              ...engineTimes.map((t, i) => t != null ? [`Eng ${engineTimes.length > 1 ? i + 1 : ''} Time`, `${t.toLocaleString()}${timeSuffix}`] as [string,string] : null),
              ...propTimes.map(  (t, i) => t != null ? [`Prop ${propTimes.length > 1 ? i + 1 : ''} Time`,  `${t.toLocaleString()}${timeSuffix}`] as [string,string] : null),
            ].filter(Boolean) as [string, string][]
            return rows.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                {rows.map(([l, v]) => (
                  <div key={l} style={{ background: 'rgba(118,118,128,0.06)', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ fontSize: 11, color: '#86868b', fontWeight: 500, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f' }}>{v}</div>
                  </div>
                ))}
              </div>
            ) : null
          })()}

          {/* Text sections */}
          {[
            [(listing as any).description,    'Description'],
            [listing.equip,                   'Avionics & equipment'],
            [(listing as any).airframe_notes, 'Airframe notes'],
            [(listing as any).engine_notes,   'Engine notes'],
            [(listing as any).interior_notes, 'Interior remarks'],
            [(listing as any).exterior_notes, 'Exterior remarks'],
          ].filter(([v]) => v).map(([text, label]) => (
            <div key={label as string} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, background: 'rgba(118,118,128,0.05)', borderRadius: 10, padding: '10px 14px' }}>{text}</div>
            </div>
          ))}

          {pref === 'email' ? (
            <button onClick={() => { onContact(listing); onClose() }} style={{
              width: '100%', height: 50, background: '#0a84ff', border: 'none',
              borderRadius: 14, color: '#fff', fontFamily: 'inherit', fontSize: 16,
              fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(10,132,255,0.35)',
            }}>
              Contact seller
            </button>
          ) : (
            <button onClick={() => {
              if (!user) { onAuthRequired('Sign in to message this seller'); return }
              onOpenMessage({ id: listing.id, model: listing.model, year: listing.year, price: listing.price, currency: listing.currency, seller_id: (listing as any).seller_id ?? null })
              onClose()
            }} style={{
              width: '100%', height: 50, background: '#0a84ff', border: 'none',
              borderRadius: 14, color: '#fff', fontFamily: 'inherit', fontSize: 16,
              fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(10,132,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              💬 Send message
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MarketTab({ listings: initialListings, onContact, onSell, user, initialSearch = '', onSearchChange, onAuthRequired, onOpenMessage, openListingId, onOpenListingHandled, favoriteIds, onToggleFavorite }: Props) {
  const [listings,    setListings]    = useState<Listing[]>(initialListings)
  const [catFilter,   setCatFilter]   = useState<CategoryFilter>('all')
  const [typeFilter,  setTypeFilter]  = useState<TypeFilter>('all')
  const [engFilter,   setEngFilter]   = useState<EngineFilter>(0)
  const [fuelFilter,  setFuelFilter]  = useState<FuelFilter>(null)
  const [gearFilter,  setGearFilter]  = useState<GearFilter>(null)
  const [ifrOnly,     setIfrOnly]     = useState(false)
  const [maxHours,    setMaxHours]    = useState(MAX_HOURS)
  const [yearFrom,    setYearFrom]    = useState(1960)
  const [yearTo,      setYearTo]      = useState(CURRENT_YEAR)
  const [sort,        setSort]        = useState<Sort>('newest')
  const [search,      setSearch]      = useState(initialSearch)
  const [brand,       setBrand]       = useState('')
  const [selListing,  setSelListing]  = useState<Listing | null>(null)
  const [compareIds,  setCompareIds]  = useState<string[]>([])
  const [compareOpen, setCompareOpen] = useState(false)

  const MAX_COMPARE = 3
  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, id]
    })
  }

  const hasFilters = catFilter !== 'all' || typeFilter !== 'all' || engFilter !== 0 || fuelFilter || gearFilter || ifrOnly || maxHours < MAX_HOURS || yearFrom > 1960 || yearTo < CURRENT_YEAR || !!brand || !!search
  const clearAll = () => { setCatFilter('all'); setTypeFilter('all'); setEngFilter(0); setFuelFilter(null); setGearFilter(null); setIfrOnly(false); setMaxHours(MAX_HOURS); setYearFrom(1960); setYearTo(CURRENT_YEAR); setBrand(''); setSearch(''); onSearchChange?.('') }

  // Sync when parent navigates here with a pre-filled search (e.g. "See offers")
  useEffect(() => { setSearch(initialSearch) }, [initialSearch])

  // Sync when parent refreshes (e.g. after admin approval)
  useEffect(() => { setListings(initialListings) }, [initialListings])

  // Fetch fresh listings from the server route on mount (bypasses RLS for anonymous users)
  useEffect(() => {
    fetch('/api/listings')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.listings) setListings(d.listings) })
      .catch(() => {})
  }, [])

  // Open a specific listing when requested from outside (e.g. "See offer" on the globe)
  useEffect(() => {
    if (!openListingId) return
    const found = listings.find(l => l.id === openListingId)
    if (found) { setSelListing(found); onOpenListingHandled?.() }
  }, [openListingId, listings, onOpenListingHandled])

  // Apply all filters except brand/search — used for brand grid counts
  const preFiltered = listings
    .filter(l => catFilter === 'all' || (AC_CATEGORY[l.model] ?? 'airplane') === catFilter)
    .filter(l => typeFilter === 'all' || (l.model && AC_TYPE[l.model] === typeFilter))
    .filter(l => engFilter === 0 || (l.engines ?? AC_ENGINES[l.model]) === engFilter)
    .filter(l => !fuelFilter || (l.fuel ?? AC_FUEL[l.model]) === fuelFilter)
    .filter(l => !gearFilter || (l.gear ?? AC_GEAR[l.model]) === gearFilter)
    .filter(l => !ifrOnly || (l as any).ifr === true)
    .filter(l => maxHours >= MAX_HOURS || (l.hours ?? 0) <= maxHours)
    .filter(l => !l.year || (l.year >= yearFrom && l.year <= yearTo))

  // Brand grid: show whenever no brand/search is active, filtered counts reflect current filters
  const brandCards = Array.from(new Set(preFiltered.map(l => l.model.split(' ')[0]))).sort()
    .map(b => ({ brand: b, count: preFiltered.filter(l => l.model.startsWith(b)).length }))
    .filter(({ count }) => count > 0)

  const showBrandGrid = !search && !brand && brandCards.length > 0

  const filtered = preFiltered
    .filter(l => !brand || l.model.startsWith(brand))
    .filter(l => {
      const q = search.toLowerCase()
      return !q || l.model.toLowerCase().includes(q) || l.reg.toLowerCase().includes(q)
    })
    .sort((a, b) => {
      // Certified always first
      if (a.certified !== b.certified) return a.certified ? -1 : 1
      if (sort === 'price_asc')  return (a.price ?? 0) - (b.price ?? 0)
      if (sort === 'price_desc') return (b.price ?? 0) - (a.price ?? 0)
      return new Date(b.approved_at ?? b.created_at).getTime() - new Date(a.approved_at ?? a.created_at).getTime()
    })

  return (
    <>
      {selListing && (
        <ListingModal
          listing={selListing}
          onClose={() => setSelListing(null)}
          onContact={onContact}
          user={user}
          onAuthRequired={onAuthRequired}
          onOpenMessage={onOpenMessage}
          isFavorite={favoriteIds.has(selListing.id)}
          onToggleFavorite={() => onToggleFavorite(selListing.id)}
        />
      )}

      {compareOpen && compareIds.length >= 2 && (
        <CompareModal
          listings={compareIds.map(id => listings.find(l => l.id === id)).filter((l): l is Listing => !!l)}
          onClose={() => setCompareOpen(false)}
          onRemove={id => setCompareIds(prev => {
            const next = prev.filter(x => x !== id)
            if (next.length < 2) setCompareOpen(false)
            return next
          })}
          onViewListing={id => {
            const found = listings.find(l => l.id === id)
            if (found) { setSelListing(found); setCompareOpen(false) }
          }}
        />
      )}

      <div style={{ position: 'fixed', inset: 0, top: 68, padding: 16, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, background: '#f5f5f7' }}>

        {/* Main listing panel */}
        <div className="pp-panel" style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(255,255,255,0.9)', borderRadius: 20 }}>

          <div style={{ padding: '20px 22px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 2 }}>Market</div>
              <div style={{ fontSize: 13, color: '#86868b' }}>
                {filtered.length} aircraft · <span style={{ color: '#0a84ff', fontWeight: 600 }}>{listings.length}</span> community listings
              </div>
            </div>
            <button onClick={onSell} style={{
              display: 'flex', alignItems: 'center', gap: 6, height: 36, borderRadius: 100,
              padding: '0 16px', background: '#0a84ff', border: 'none', color: '#fff',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>+ List aircraft</button>
          </div>

          {/* Search / sort / brand chips — single row */}
          <div style={{ padding: '10px 22px 10px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 }}>
            {/* Brand chips on the left */}
            {!showBrandGrid && brandCards.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                <button onClick={() => setBrand('')} style={{
                  height: 26, padding: '0 11px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 11, fontWeight: 500,
                  background: brand === '' ? '#1d1d1f' : 'transparent',
                  border: brand === '' ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                  color: brand === '' ? '#fff' : '#86868b',
                }}>All brands</button>
                {brandCards.map(({ brand: b }) => (
                  <button key={b} onClick={() => setBrand(brand === b ? '' : b)} style={{
                    height: 26, padding: '0 11px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 11, fontWeight: 500,
                    background: brand === b ? '#1d1d1f' : 'transparent',
                    border: brand === b ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                    color: brand === b ? '#fff' : '#86868b',
                  }}>{b}</button>
                ))}
              </div>
            )}
            {showBrandGrid && <div style={{ flex: 1 }} />}
            {/* Search + sort on the right */}
            <input value={search} placeholder="Search model or reg…"
              onChange={e => { setSearch(e.target.value); onSearchChange?.(e.target.value) }}
              style={{ width: 190, height: 30, fontSize: 12, borderRadius: 100, padding: '0 14px', border: '0.5px solid rgba(0,0,0,0.1)', background: 'transparent', fontFamily: 'inherit', color: '#1d1d1f', flexShrink: 0 }} />
            <select value={sort} onChange={e => setSort(e.target.value as Sort)}
              style={{ height: 30, padding: '0 10px', borderRadius: 100, border: '0.5px solid rgba(0,0,0,0.12)', background: 'transparent', fontFamily: 'inherit', fontSize: 12, color: '#1d1d1f', cursor: 'pointer', flexShrink: 0 }}>
              <option value="newest">Newest</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
            </select>
          </div>

          {/* Brand grid — shown when no filter/search/brand selected */}
          {showBrandGrid ? (
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px 14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {brandCards.map(({ brand: b, count }) => (
                  <div key={b} onClick={() => setBrand(b)} style={{
                    cursor: 'pointer', borderRadius: 14, overflow: 'hidden',
                    border: '0.5px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.7)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '36px 12px',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: '#1d1d1f' }}>{b}</div>
                    <div style={{ fontSize: 11, color: '#86868b', marginTop: 4 }}>({count})</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
          /* Listings */
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px 14px' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#86868b' }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>✈</div>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>No community listings yet</div>
                <div style={{ fontSize: 13 }}>Be the first to list your aircraft</div>
                <button onClick={onSell} style={{ marginTop: 18, height: 38, padding: '0 22px', borderRadius: 12, background: '#0a84ff', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  + List an aircraft
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {filtered.map(l => (
                  <ListingCard key={l.id} l={l} onClick={() => setSelListing(l)}
                    isFavorite={favoriteIds.has(l.id)} onToggleFavorite={() => onToggleFavorite(l.id)}
                    isComparing={compareIds.includes(l.id)}
                    compareDisabled={!compareIds.includes(l.id) && compareIds.length >= MAX_COMPARE}
                    onToggleCompare={() => toggleCompare(l.id)} />
                ))}
              </div>
            )}
          </div>
          )}

          {/* Floating compare bar */}
          {compareIds.length > 0 && (
            <div style={{
              position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
              zIndex: 10, display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(20px)',
              borderRadius: 100, padding: '8px 8px 8px 16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>
                {compareIds.length} of {MAX_COMPARE} selected
              </span>
              <button onClick={() => setCompareIds([])} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', padding: '0 4px',
              }}>Clear</button>
              <button
                onClick={() => setCompareOpen(true)}
                disabled={compareIds.length < 2}
                style={{
                  height: 34, padding: '0 16px', borderRadius: 100, border: 'none',
                  background: compareIds.length < 2 ? 'rgba(10,132,255,0.35)' : '#0a84ff',
                  color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                  cursor: compareIds.length < 2 ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >⚖ Compare</button>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div className="pp-panel" style={{ padding: 18, background: 'rgba(255,255,255,0.9)', overflowY: 'auto' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 14 }}>Filters</div>

            {/* Category */}
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', marginBottom: 7 }}>Category</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {(['airplane', 'helicopter', 'gyrocopter', 'trike'] as CategoryFilter[]).map(f => (
                <button key={f} onClick={() => setCatFilter(catFilter === f ? 'all' : f)} style={{
                  height: 30, padding: '0 13px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 12, fontWeight: 500,
                  background: catFilter === f ? '#0a84ff' : 'transparent',
                  border: catFilter === f ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                  color: catFilter === f ? '#fff' : '#1d1d1f',
                }}>
                  {f === 'airplane' ? '✈ Airplane' : f === 'helicopter' ? '🚁 Helicopter' : f === 'gyrocopter' ? 'Gyrocopter' : 'Trike'}
                </button>
              ))}
            </div>

            {/* Aircraft type */}
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', marginBottom: 7 }}>Type</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {(['jet', 'turbo', 'piston'] as TypeFilter[]).map(f => (
                <button key={f} onClick={() => setTypeFilter(typeFilter === f ? 'all' : f)} style={{
                  height: 30, padding: '0 13px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 12, fontWeight: 500,
                  background: typeFilter === f ? '#0a84ff' : 'transparent',
                  border: typeFilter === f ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                  color: typeFilter === f ? '#fff' : '#1d1d1f',
                }}>
                  {f === 'jet' ? 'Jet' : f === 'turbo' ? 'Turboprop' : 'Piston'}
                </button>
              ))}
              <button onClick={() => setIfrOnly(v => !v)} style={{
                height: 30, padding: '0 13px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 12, fontWeight: 500,
                background: ifrOnly ? '#0a84ff' : 'transparent',
                border: ifrOnly ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                color: ifrOnly ? '#fff' : '#1d1d1f',
              }}>IFR ✓</button>
            </div>

            {/* Engine count */}
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', marginBottom: 7 }}>Engines</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {([1, 2, 3, 4] as const).map(n => (
                <button key={n} onClick={() => setEngFilter(engFilter === n ? 0 : n)} style={{
                  width: 38, height: 30, borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 13, fontWeight: 600,
                  background: engFilter === n ? '#0a84ff' : 'transparent',
                  border: engFilter === n ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                  color: engFilter === n ? '#fff' : '#1d1d1f',
                }}>{n}</button>
              ))}
            </div>

            {/* Fuel type */}
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', marginBottom: 7 }}>Fuel</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {([['jet-a', 'Jet-A'], ['avgas', 'AvGas']] as [FuelFilter, string][]).map(([f, label]) => (
                <button key={f!} onClick={() => setFuelFilter(fuelFilter === f ? null : f)} style={{
                  height: 30, padding: '0 13px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 12, fontWeight: 500,
                  background: fuelFilter === f ? '#0a84ff' : 'transparent',
                  border: fuelFilter === f ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                  color: fuelFilter === f ? '#fff' : '#1d1d1f',
                }}>{label}</button>
              ))}
            </div>

            {/* Landing gear */}
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', marginBottom: 7 }}>Landing gear</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {([['retractable', 'Retractable'], ['tricycle', 'Tricycle'], ['tailwheel', 'Tail-wheel'], ['skids', 'Skids']] as [GearFilter, string][]).map(([g, label]) => (
                <button key={g!} onClick={() => setGearFilter(gearFilter === g ? null : g)} style={{
                  height: 30, padding: '0 13px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 12, fontWeight: 500,
                  background: gearFilter === g ? '#0a84ff' : 'transparent',
                  border: gearFilter === g ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                  color: gearFilter === g ? '#fff' : '#1d1d1f',
                }}>{label}</button>
              ))}
            </div>

            {/* Total time slider */}
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', marginBottom: 7, display: 'flex', justifyContent: 'space-between' }}>
              <span>Max total time</span>
              <span style={{ color: '#1d1d1f' }}>{maxHours >= MAX_HOURS ? 'Any' : `${maxHours.toLocaleString()} h`}</span>
            </div>
            <input type="range" min={0} max={MAX_HOURS} step={500} value={maxHours}
              onChange={e => setMaxHours(Number(e.target.value))}
              style={{ width: '100%', marginBottom: 16, accentColor: '#0a84ff' }} />

            {/* Year range dropdowns */}
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', marginBottom: 7 }}>Year</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
              <select value={yearFrom} onChange={e => setYearFrom(Math.min(Number(e.target.value), yearTo))}
                style={{ flex: 1, height: 30, borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.12)', background: 'transparent', fontFamily: 'inherit', fontSize: 12, color: '#1d1d1f', cursor: 'pointer', paddingLeft: 8 }}>
                {Array.from({ length: CURRENT_YEAR - 1939 }, (_, i) => 1940 + i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <span style={{ fontSize: 11, color: '#86868b' }}>to</span>
              <select value={yearTo} onChange={e => setYearTo(Math.max(Number(e.target.value), yearFrom))}
                style={{ flex: 1, height: 30, borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.12)', background: 'transparent', fontFamily: 'inherit', fontSize: 12, color: '#1d1d1f', cursor: 'pointer', paddingLeft: 8 }}>
                {Array.from({ length: CURRENT_YEAR - 1939 }, (_, i) => 1940 + i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Clear all */}
            {hasFilters && (
              <button onClick={clearAll} style={{
                width: '100%', height: 32, borderRadius: 100, border: '0.5px solid rgba(255,59,48,0.3)',
                background: 'rgba(255,59,48,0.06)', color: '#ff3b30',
                fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>Clear all filters</button>
            )}
          </div>

          {!user && (
            <div className="pp-panel" style={{ padding: 18, textAlign: 'center', background: 'rgba(255,255,255,0.9)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>🔒</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f', marginBottom: 4 }}>Sign in</div>
              <div style={{ fontSize: 12, color: '#86868b' }}>to list your aircraft</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
