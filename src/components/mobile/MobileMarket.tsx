'use client'
// src/components/mobile/MobileMarket.tsx
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Listing } from '@/lib/supabase'
import { createClient } from '@/lib/supabase'
import { AC } from '@/lib/aircraft'
import { fmtPrice } from '@/lib/currency'
import FavoriteButton from '@/components/ui/FavoriteButton'
import CompareToggle from '@/components/ui/CompareToggle'
import CompareModal from '@/components/ui/CompareModal'

const AC_TYPE:    Record<string, string> = {}
const AC_FUEL:    Record<string, string> = {}
const AC_GEAR:    Record<string, string> = {}
const AC_ENGINES: Record<string, number> = {}
for (const a of AC) {
  AC_TYPE[a.name]    = a.type
  AC_FUEL[a.name]    = a.fuel === 'Jet-A' ? 'jet-a' : 'avgas'
  AC_GEAR[a.name]    = a.gear
  AC_ENGINES[a.name] = a.engines
}

type User = { id: string; name: string; email: string; role: string }
type Props = {
  listings: Listing[]; onContact: (l: Listing) => void; onSell: () => void; user: User | null; initialSearch?: string
  onAuthRequired: (message?: string) => void
  onOpenMessage: (l: { id: string; model: string; year: number; price: number | null; currency?: string | null; seller_id: string | null }) => void
  openListingId?: string | null
  onOpenListingHandled?: () => void
  favoriteIds: Set<string>
  onToggleFavorite: (listingId: string) => void
}
type TypeFilter   = 'all' | 'jet' | 'turbo' | 'piston'
type EngineFilter = 0 | 1 | 2 | 3 | 4
type FuelFilter   = 'jet-a' | 'avgas' | null
type GearFilter   = 'retractable' | 'tailwheel' | 'tricycle' | null

const CURRENT_YEAR = new Date().getFullYear()
const MAX_HOURS    = 50000
const TAB_H        = 76

const YEARS = Array.from({ length: CURRENT_YEAR - 1939 }, (_, i) => 1940 + i)


// ── Listing card with photo navigation ────────────────────────
function MobileListingCard({ l, onClick, isFavorite, onToggleFavorite, isComparing, compareDisabled, onToggleCompare }: {
  l: Listing; onClick: () => void; isFavorite: boolean; onToggleFavorite: () => void
  isComparing: boolean; compareDisabled: boolean; onToggleCompare: () => void
}) {
  const photos: string[] = l.photos ?? []
  const [idx, setIdx] = useState(0)
  const [touchX, setTouchX] = useState<number | null>(null)

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + photos.length) % photos.length) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % photos.length) }

  const onTouchStart = (e: React.TouchEvent) => setTouchX(e.touches[0].clientX)
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX === null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > 30 && photos.length > 1) {
      setIdx(i => dx < 0 ? (i + 1) % photos.length : (i - 1 + photos.length) % photos.length)
    }
    setTouchX(null)
  }

  return (
    <div onClick={onClick} style={{ borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', cursor: 'pointer', border: '0.5px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
      {/* Photo */}
      <div
        style={{ width: '100%', aspectRatio: '4/3', background: 'rgba(118,118,128,0.08)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {photos.length > 0
          ? <Image src={photos[idx]} alt={l.model ?? ''} fill sizes="(max-width: 500px) 50vw, 280px" style={{ objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: 'rgba(0,0,0,0.12)' }}>✈</div>
        }
        {photos.length > 1 && (
          <>
            <button onClick={prev} style={{ position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)', width: 24, height: 24, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>‹</button>
            <button onClick={next} style={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', width: 24, height: 24, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>›</button>
            <div style={{ position: 'absolute', bottom: 5, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3 }}>
              {photos.map((_, i) => (
                <div key={i} onClick={e => { e.stopPropagation(); setIdx(i) }} style={{ width: 2, height: 2, borderRadius: '50%', background: i === idx ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'background 0.15s', cursor: 'pointer' }} />
              ))}
            </div>
          </>
        )}
        <div style={{ position: 'absolute', top: 7, right: 7, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>{fmtPrice(l.price ?? null, l.currency)}</div>
        <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} size={26} style={{ position: 'absolute', top: 7, left: 7 }} />
        <CompareToggle active={isComparing} disabled={compareDisabled} onToggle={onToggleCompare} size={26} style={{ position: 'absolute', bottom: 7, left: 7 }} />
      </div>
      {/* Content */}
      <div style={{ padding: '9px 10px 11px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', color: '#1d1d1f', textAlign: 'center', marginBottom: 2 }}>{l.model ?? 'Aircraft'}</div>
        <div style={{ fontSize: 11, color: '#86868b', marginBottom: 6, textAlign: 'center' }}>{[l.year, l.location].filter(Boolean).join(' · ')}</div>
        {l.hours != null && (
          <div style={{ fontSize: 11, color: '#86868b', marginBottom: 6 }}>TT {l.hours.toLocaleString()} h</div>
        )}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {l.certified && (
            <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 100, background: 'rgba(255,214,10,0.15)', color: '#b07800' }}>⭐ Certified</span>
          )}
          <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 100, background: 'rgba(52,199,89,0.12)', color: '#248a3d' }}>Community</span>
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

// ── Filter chip ───────────────────────────────────────────────
function Chip({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} style={{
      height: 32, padding: '0 14px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
      fontSize: 13, fontWeight: 500, flexShrink: 0,
      background: active ? '#0a84ff' : 'rgba(118,118,128,0.1)',
      border: 'none',
      color: active ? '#fff' : '#1d1d1f',
    }}>{label}</button>
  )
}

// ── Filter bottom sheet ───────────────────────────────────────
type FilterSheetProps = {
  onClose: () => void
  activeFilterCount: number
  clearAll: () => void
  filtered: any[]
  typeFilter: TypeFilter; setTypeFilter: (v: TypeFilter) => void
  engFilter: EngineFilter; setEngFilter: (v: EngineFilter) => void
  fuelFilter: FuelFilter; setFuelFilter: (v: FuelFilter | null) => void
  gearFilter: GearFilter; setGearFilter: (v: GearFilter | null) => void
  ifrOnly: boolean; setIfrOnly: (v: boolean) => void
  maxHours: number; setMaxHours: (v: number) => void
  yearFrom: number; setYearFrom: (v: number) => void
  yearTo: number; setYearTo: (v: number) => void
}

function FilterSheet({ onClose, activeFilterCount, clearAll, filtered,
  typeFilter, setTypeFilter, engFilter, setEngFilter,
  fuelFilter, setFuelFilter, gearFilter, setGearFilter,
  ifrOnly, setIfrOnly,
  maxHours, setMaxHours, yearFrom, setYearFrom, yearTo, setYearTo,
}: FilterSheetProps) {
  const [visible,  setVisible]  = useState(false)
  const [dragY,    setDragY]    = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStartY = useRef<number | null>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const close = () => { setVisible(false); setTimeout(onClose, 380) }

  const onHandleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation(); dragStartY.current = e.touches[0].clientY; setDragging(true)
  }
  const onHandleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (dragStartY.current === null) return
    setDragY(Math.max(0, e.touches[0].clientY - dragStartY.current))
  }
  const onHandleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (dragY > 80) { close() } else { setDragY(0) }
    setDragging(false); dragStartY.current = null
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
      {/* Backdrop */}
      <div onClick={close} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.38s ease',
      }} />

      {/* Sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        background: '#fff', borderRadius: '32px 32px 0 0',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        transform: visible ? `translateY(${dragY}px)` : 'translateY(100%)',
        transition: dragging ? 'none' : 'transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)',
        willChange: 'transform',
      }}>
        {/* Draggable handle */}
        <div
          onTouchStart={onHandleTouchStart}
          onTouchMove={onHandleTouchMove}
          onTouchEnd={onHandleTouchEnd}
          style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px', cursor: 'grab' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 12px', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>Filters</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} style={{ height: 30, padding: '0 14px', borderRadius: 100, border: 'none', background: 'rgba(255,59,48,0.08)', color: '#ff3b30', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Clear all</button>
            )}
            <button onClick={close} style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.06)', color: '#86868b', fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}>✕</button>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', padding: '16px 20px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Type</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Chip label="Jet"       active={typeFilter === 'jet'}    onToggle={() => setTypeFilter(typeFilter === 'jet'    ? 'all' : 'jet')} />
              <Chip label="Turboprop" active={typeFilter === 'turbo'}  onToggle={() => setTypeFilter(typeFilter === 'turbo'  ? 'all' : 'turbo')} />
              <Chip label="Piston"    active={typeFilter === 'piston'} onToggle={() => setTypeFilter(typeFilter === 'piston' ? 'all' : 'piston')} />
              <Chip label="IFR ✓"     active={ifrOnly} onToggle={() => setIfrOnly(!ifrOnly)} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Engines</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {([1, 2, 3, 4] as const).map(n => (
                <Chip key={n} label={String(n)} active={engFilter === n} onToggle={() => setEngFilter(engFilter === n ? 0 : n)} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Fuel</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Chip label="Jet-A" active={fuelFilter === 'jet-a'} onToggle={() => setFuelFilter(fuelFilter === 'jet-a' ? null : 'jet-a')} />
              <Chip label="AvGas" active={fuelFilter === 'avgas'} onToggle={() => setFuelFilter(fuelFilter === 'avgas' ? null : 'avgas')} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Landing gear</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Chip label="Retractable" active={gearFilter === 'retractable'} onToggle={() => setGearFilter(gearFilter === 'retractable' ? null : 'retractable')} />
              <Chip label="Tricycle"    active={gearFilter === 'tricycle'}    onToggle={() => setGearFilter(gearFilter === 'tricycle'    ? null : 'tricycle')} />
              <Chip label="Tail-wheel"  active={gearFilter === 'tailwheel'}   onToggle={() => setGearFilter(gearFilter === 'tailwheel'   ? null : 'tailwheel')} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
              <span>Max total time</span>
              <span style={{ color: '#1d1d1f', textTransform: 'none' }}>{maxHours >= MAX_HOURS ? 'Any' : `${maxHours.toLocaleString()} h`}</span>
            </div>
            <input type="range" min={0} max={MAX_HOURS} step={500} value={maxHours}
              onChange={e => setMaxHours(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0a84ff' }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Year</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <select value={yearFrom} onChange={e => setYearFrom(Math.min(Number(e.target.value), yearTo))}
                style={{ flex: 1, height: 38, borderRadius: 10, border: '0.5px solid rgba(0,0,0,0.12)', background: 'rgba(118,118,128,0.07)', fontFamily: 'inherit', fontSize: 16, color: '#1d1d1f', paddingLeft: 10 }}>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <span style={{ fontSize: 12, color: '#86868b' }}>to</span>
              <select value={yearTo} onChange={e => setYearTo(Math.max(Number(e.target.value), yearFrom))}
                style={{ flex: 1, height: 38, borderRadius: 10, border: '0.5px solid rgba(0,0,0,0.12)', background: 'rgba(118,118,128,0.07)', fontFamily: 'inherit', fontSize: 16, color: '#1d1d1f', paddingLeft: 10 }}>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div style={{ padding: '12px 20px', paddingBottom: `calc(${TAB_H}px + 12px + env(safe-area-inset-bottom))`, borderTop: '0.5px solid rgba(0,0,0,0.07)', background: '#fff' }}>
          <button onClick={close} style={{ width: '100%', height: 50, borderRadius: 14, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', boxShadow: '0 4px 14px rgba(10,132,255,0.35)' }}>
            {filtered.length === 0 ? 'No results' : `Show ${filtered.length} aircraft`}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Listing detail bottom sheet ───────────────────────────────
function ListingSheet({ listing, onClose, onContact, user, onAuthRequired, onOpenMessage, isFavorite, onToggleFavorite }: {
  listing: Listing
  onClose: () => void
  onContact: (l: Listing) => void
  user: User | null
  onAuthRequired: (message?: string) => void
  onOpenMessage: (l: { id: string; model: string; year: number; price: number | null; currency?: string | null; seller_id: string | null }) => void
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  const pref = (listing as any).contact_pref ?? 'email'
  const [photoIdx,  setPhotoIdx]  = useState(0)
  const [swipeX,    setSwipeX]    = useState<number | null>(null)
  const [visible,   setVisible]   = useState(false)
  const [dragY,     setDragY]     = useState(0)
  const [dragging,  setDragging]  = useState(false)
  const dragStartY  = useRef<number | null>(null)
  const photos: string[] = listing.photos ?? []

  // Slide-up on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Animate out then call onClose
  const close = () => {
    setVisible(false)
    setTimeout(onClose, 380)
  }

  // Drag-to-dismiss — attached to the handle pill only
  const onHandleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation()
    dragStartY.current = e.touches[0].clientY
    setDragging(true)
  }
  const onHandleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (dragStartY.current === null) return
    setDragY(Math.max(0, e.touches[0].clientY - dragStartY.current))
  }
  const onHandleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (dragY > 80) { close() } else { setDragY(0) }
    setDragging(false)
    dragStartY.current = null
  }

  // Photo swipe
  const onPhotoTouchStart = (e: React.TouchEvent) => setSwipeX(e.touches[0].clientX)
  const onPhotoTouchEnd   = (e: React.TouchEvent) => {
    if (swipeX === null) return
    const dx = e.changedTouches[0].clientX - swipeX
    if (Math.abs(dx) > 30 && photos.length > 1)
      setPhotoIdx(i => dx < 0 ? (i + 1) % photos.length : (i - 1 + photos.length) % photos.length)
    setSwipeX(null)
  }

  const engineTimes: (number | null)[] = (listing as any).engine_times ?? []
  const propTimes:   (number | null)[] = (listing as any).prop_times   ?? []
  const description   = (listing as any).description    as string | null
  const airframeNotes = (listing as any).airframe_notes as string | null
  const engineNotes   = (listing as any).engine_notes   as string | null
  const interiorNotes = (listing as any).interior_notes as string | null
  const exteriorNotes = (listing as any).exterior_notes as string | null

  const specRows = [
    listing.year        && ['Year',         String(listing.year)],
    listing.reg         && ['Registration', listing.reg],
    listing.hours       && ['Airframe TT',  `${listing.hours.toLocaleString()} h`],
    listing.condition   && ['Condition',    listing.condition],
    listing.seller_name && ['Seller',       listing.seller_name],
  ].filter(Boolean) as [string, string][]

  const timeSuffix = (listing as any).time_basis === 'to_next_check' ? ' h to next check' : ' h since check'
  const engineRows = engineTimes
    .map((t, i) => t != null ? [`Eng ${engineTimes.length > 1 ? i + 1 : ''} Time`, `${t.toLocaleString()}${timeSuffix}`] : null)
    .filter(Boolean) as [string, string][]
  const propRows = propTimes
    .map((t, i) => t != null ? [`Prop ${propTimes.length > 1 ? i + 1 : ''} Time`, `${t.toLocaleString()}${timeSuffix}`] : null)
    .filter(Boolean) as [string, string][]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
      {/* Backdrop — fades with sheet */}
      <div onClick={close} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.38s ease',
      }} />

      {/* Sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '85vh',
        background: '#fff',
        borderRadius: '32px 32px 0 0',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        transform: visible ? `translateY(${dragY}px)` : 'translateY(100%)',
        transition: dragging ? 'none' : 'transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)',
        willChange: 'transform',
      }}>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>

          {/* Photo area — handle pill floats on top */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#f0f0f3', flexShrink: 0 }}
            onTouchStart={onPhotoTouchStart} onTouchEnd={onPhotoTouchEnd}>

            {/* Draggable handle — overlaid on photo */}
            <div
              onTouchStart={onHandleTouchStart}
              onTouchMove={onHandleTouchMove}
              onTouchEnd={onHandleTouchEnd}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 36, zIndex: 5,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.75)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
            </div>

            {photos.length > 0 ? (
              <Image src={photos[photoIdx]} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 48, color: '#c7c7cc' }}>✈</div>
            )}
            {photos.length > 1 && (
              <>
                <button onClick={() => setPhotoIdx(i => (i - 1 + photos.length) % photos.length)}
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', fontSize: 18, cursor: 'pointer', zIndex: 3 }}>‹</button>
                <button onClick={() => setPhotoIdx(i => (i + 1) % photos.length)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', fontSize: 18, cursor: 'pointer', zIndex: 3 }}>›</button>
                <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4, zIndex: 3 }}>
                  {photos.map((_, i) => (
                    <div key={i} onClick={e => { e.stopPropagation(); setPhotoIdx(i) }} style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: i === photoIdx ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
                  ))}
                </div>
              </>
            )}
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 13, fontWeight: 700, padding: '3px 10px', borderRadius: 8, zIndex: 4 }}>
              {fmtPrice(listing.price ?? null, listing.currency)}
            </div>
            <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} size={32} style={{ position: 'absolute', top: 10, right: 10, zIndex: 4 }} />
          </div>

          <div style={{ padding: '16px 18px 0' }}>
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f' }}>{listing.year} {listing.model}</div>
                <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>{listing.location}</div>
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {listing.certified && <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: 'rgba(255,214,10,0.15)', color: '#b07800' }}>⭐ Certified</span>}
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: 'rgba(52,199,89,0.12)', color: '#248a3d' }}>Community</span>
              </div>
            </div>

            {/* Spec grid */}
            {[...specRows, ...engineRows, ...propRows].length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 14 }}>
                {[...specRows, ...engineRows, ...propRows].map(([label, val]) => (
                  <div key={label} style={{ background: 'rgba(118,118,128,0.07)', borderRadius: 10, padding: '9px 12px' }}>
                    <div style={{ fontSize: 10, color: '#86868b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f' }}>{val}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Text sections */}
            {[
              description   && ['Description',   description],
              listing.equip && ['Avionics',       listing.equip],
              airframeNotes && ['Airframe notes', airframeNotes],
              engineNotes   && ['Engine notes',   engineNotes],
              interiorNotes && ['Interior remarks', interiorNotes],
              exteriorNotes && ['Exterior remarks', exteriorNotes],
            ].filter(Boolean).map(([label, text]: any) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.5 }}>{text}</div>
              </div>
            ))}

            {/* Contact button */}
            {pref === 'email' ? (
              <button onClick={() => { onContact(listing); close() }} style={{
                width: '100%', height: 50, background: '#0a84ff', border: 'none',
                borderRadius: 14, color: '#fff', fontFamily: 'inherit',
                fontSize: 16, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(10,132,255,0.35)',
                marginTop: 4,
                marginBottom: `calc(${TAB_H}px + env(safe-area-inset-bottom, 0px))`,
              }}>
                Contact seller
              </button>
            ) : (
              <button onClick={() => {
                if (!user) { onAuthRequired('Sign in to message this seller'); return }
                onOpenMessage({ id: listing.id, model: listing.model, year: listing.year, price: listing.price, currency: listing.currency, seller_id: (listing as any).seller_id ?? null })
                close()
              }} style={{
                width: '100%', height: 50, background: '#0a84ff', border: 'none',
                borderRadius: 14, color: '#fff', fontFamily: 'inherit',
                fontSize: 16, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(10,132,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginTop: 4,
                marginBottom: `calc(${TAB_H}px + env(safe-area-inset-bottom, 0px))`,
              }}>
                💬 Send message
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MobileMarket({ listings: initialListings, onContact, onSell, user, initialSearch = '', onAuthRequired, onOpenMessage, openListingId, onOpenListingHandled, favoriteIds, onToggleFavorite }: Props) {
  const [search,      setSearch]      = useState(initialSearch)
  const [brand,       setBrand]       = useState<string | null>(null)
  const [listings,    setListings]    = useState<Listing[]>(initialListings)
  const [filtersOpen, setFiltersOpen] = useState(false)
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

  // Filter state — mirrors desktop
  const [typeFilter,  setTypeFilter]  = useState<TypeFilter>('all')
  const [engFilter,   setEngFilter]   = useState<EngineFilter>(0)
  const [fuelFilter,  setFuelFilter]  = useState<FuelFilter>(null)
  const [gearFilter,  setGearFilter]  = useState<GearFilter>(null)
  const [ifrOnly,     setIfrOnly]     = useState(false)
  const [maxHours,    setMaxHours]    = useState(MAX_HOURS)
  const [yearFrom,    setYearFrom]    = useState(1960)
  const [yearTo,      setYearTo]      = useState(CURRENT_YEAR)

  useEffect(() => { if (initialSearch) { setSearch(initialSearch); setBrand(null) } }, [initialSearch])

  useEffect(() => {
    const supabase = createClient()
    supabase.from('listings').select('*').eq('status', 'approved').then(({ data }) => {
      if (data && data.length > 0) setListings(data as Listing[])
    })
  }, [])

  // Open a specific listing when requested from outside (e.g. "See offer" on the globe)
  useEffect(() => {
    if (!openListingId) return
    const found = listings.find(l => l.id === openListingId)
    if (found) { setSelListing(found); onOpenListingHandled?.() }
  }, [openListingId, listings, onOpenListingHandled])

  const activeFilterCount = (typeFilter !== 'all' ? 1 : 0) + (engFilter !== 0 ? 1 : 0) +
    (fuelFilter ? 1 : 0) + (gearFilter ? 1 : 0) + (ifrOnly ? 1 : 0) +
    (maxHours < MAX_HOURS ? 1 : 0) + (yearFrom > 1960 || yearTo < CURRENT_YEAR ? 1 : 0)

  const clearAll = () => { setTypeFilter('all'); setEngFilter(0); setFuelFilter(null); setGearFilter(null); setIfrOnly(false); setMaxHours(MAX_HOURS); setYearFrom(1960); setYearTo(CURRENT_YEAR) }

  // Apply all filters except brand/search — used for brand grid counts
  const preFiltered = listings
    .filter(l => typeFilter === 'all' || (l.model && AC_TYPE[l.model] === typeFilter))
    .filter(l => engFilter === 0 || (l.engines ?? AC_ENGINES[l.model]) === engFilter)
    .filter(l => !fuelFilter || (l.fuel ?? AC_FUEL[l.model]) === fuelFilter)
    .filter(l => !gearFilter || (l.gear ?? AC_GEAR[l.model]) === gearFilter)
    .filter(l => !ifrOnly || (l as any).ifr === true)
    .filter(l => maxHours >= MAX_HOURS || (l.hours ?? 0) <= maxHours)
    .filter(l => !l.year || (l.year >= yearFrom && l.year <= yearTo))

  const brands = Array.from(new Set(preFiltered.map(l => l.model?.split(' ')[0]).filter(Boolean) as string[]))
    .sort()
    .filter(b => preFiltered.some(l => l.model?.startsWith(b)))

  const showBrandGrid = !search && !brand && brands.length > 0

  const filtered = preFiltered
    .filter(l => !brand || l.model?.toLowerCase().startsWith(brand.toLowerCase()))
    .filter(l => {
      const q = search.toLowerCase()
      return !q || l.model?.toLowerCase().includes(q) || l.reg?.toLowerCase().includes(q) || l.location?.toLowerCase().includes(q)
    })

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7', display: 'flex', flexDirection: 'column', paddingTop: 64 }}>

      {/* Search bar */}
      <div style={{ flexShrink: 0, padding: '12px 16px 8px', background: '#f5f5f7' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#86868b', fontSize: 16, pointerEvents: 'none' }}>⌕</span>
          <input
            value={search}
            placeholder="Search aircraft, model…"
            onChange={e => { setSearch(e.target.value); setBrand(null) }}
            style={{ width: '100%', boxSizing: 'border-box', height: 40, padding: '0 14px 0 36px', borderRadius: 12, border: 'none', background: 'rgba(118,118,128,0.12)', fontFamily: 'inherit', fontSize: 16, outline: 'none' }}
          />
        </div>

        {brand && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 13, color: '#86868b' }}><b style={{ color: '#0a84ff' }}>{filtered.length}</b> {brand} aircraft</span>
            <button onClick={() => setBrand(null)} style={{ height: 24, padding: '0 10px', borderRadius: 12, border: 'none', background: 'rgba(0,0,0,0.08)', color: '#86868b', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer' }}>✕ Clear</button>
          </div>
        )}

        {!brand && !search && (
          <div style={{ marginTop: 8, fontSize: 13, color: '#86868b' }}>
            {listings.length === 0 ? 'No listings' : <><b style={{ color: '#0a84ff' }}>{filtered.length}</b> aircraft{activeFilterCount > 0 ? ' matching filters' : ' for sale'}</>}
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: `0 16px ${TAB_H + 72}px` }}>

        {/* Brand grid */}
        {showBrandGrid && brands.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Browse by brand</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {brands.map(b => {
                const count = preFiltered.filter(l => l.model?.split(' ')[0] === b).length
                return (
                  <button key={b} onClick={() => setBrand(b)} style={{ padding: '36px 8px', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <span style={{ fontSize: 17, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.01em' }}>{b}</span>
                    <span style={{ fontSize: 11, color: '#86868b' }}>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Listing cards */}
        {filtered.length === 0 && !showBrandGrid && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#86868b' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✈</div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>No listings found</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>Try adjusting your filters</div>
          </div>
        )}

        {(!showBrandGrid || brand) && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {filtered.map(l => (
              <MobileListingCard key={l.id} l={l} onClick={() => setSelListing(l)}
                isFavorite={favoriteIds.has(l.id)} onToggleFavorite={() => onToggleFavorite(l.id)}
                isComparing={compareIds.includes(l.id)}
                compareDisabled={!compareIds.includes(l.id) && compareIds.length >= MAX_COMPARE}
                onToggleCompare={() => toggleCompare(l.id)} />
            ))}
          </div>
        )}

        {selListing && (
          <ListingSheet
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
      </div>

      {/* Compare bar */}
      {compareIds.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: TAB_H + 14 + 58,
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 50, display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(20px)',
          borderRadius: 100, padding: '8px 8px 8px 16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>
            {compareIds.length} of {MAX_COMPARE}
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

      {/* "Find my perfect plane" pill */}
      <button onClick={() => setFiltersOpen(true)} style={{
        position: 'fixed',
        bottom: TAB_H + 14,
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 50,
        height: 48, padding: '0 24px',
        borderRadius: 24, border: 'none',
        background: '#0a84ff',
        color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
        whiteSpace: 'nowrap',
      }}>
        Filters
        {activeFilterCount > 0 && (
          <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{activeFilterCount}</span>
        )}
      </button>

      {/* Sell FAB */}
      <button onClick={onSell} style={{ position: 'fixed', bottom: 'calc(76px + 15px + env(safe-area-inset-bottom))', right: 20, width: 49, height: 49, borderRadius: 15, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 26, cursor: 'pointer', boxShadow: '0 4px 16px rgba(10,132,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }} title="List your aircraft">
        <span style={{ marginBottom: '6%' }}>+</span>
      </button>

      {/* ── Filter sheet ── */}
      {filtersOpen && (
        <FilterSheet
          onClose={() => setFiltersOpen(false)}
          activeFilterCount={activeFilterCount}
          clearAll={clearAll}
          filtered={filtered}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter}
          engFilter={engFilter}   setEngFilter={setEngFilter}
          fuelFilter={fuelFilter} setFuelFilter={setFuelFilter}
          gearFilter={gearFilter} setGearFilter={setGearFilter}
          ifrOnly={ifrOnly}       setIfrOnly={setIfrOnly}
          maxHours={maxHours}     setMaxHours={setMaxHours}
          yearFrom={yearFrom}     setYearFrom={setYearFrom}
          yearTo={yearTo}         setYearTo={setYearTo}
        />
      )}
    </div>
  )
}
