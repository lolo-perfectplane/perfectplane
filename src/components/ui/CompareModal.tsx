'use client'
// src/components/ui/CompareModal.tsx
import Image from 'next/image'
import type { Listing } from '@/lib/supabase'
import { AC } from '@/lib/aircraft'
import { fmtPrice } from '@/lib/currency'

const typeLabel: Record<string, string> = { jet: 'Jet', turbo: 'Turboprop', piston: 'Piston' }
const gearLabel: Record<string, string> = { retractable: 'Retractable', tricycle: 'Tricycle', tailwheel: 'Tail-wheel' }
const fuelLabel: Record<string, string> = { 'jet-a': 'Jet-A', avgas: 'AvGas', diesel: 'Diesel' }

type Row = {
  label: string
  value: (l: Listing) => string
  numeric?: (l: Listing) => number | null
  best?: 'min' | 'max'
  // Some rows (price) are only meaningfully comparable when every listing
  // shares the same unit — highlighting a "best" across mixed currencies
  // would just be wrong, not merely imprecise.
  eligible?: (listings: Listing[]) => boolean
}

const rows: Row[] = [
  {
    label: 'Price', value: l => fmtPrice(l.price, l.currency), numeric: l => l.price ?? null, best: 'min',
    eligible: listings => new Set(listings.map(l => l.currency || 'USD')).size === 1,
  },
  { label: 'Year', value: l => String(l.year ?? '—') },
  { label: 'Total time', value: l => l.hours != null ? `${l.hours.toLocaleString()} h` : '—', numeric: l => l.hours ?? null, best: 'min' },
  { label: 'Condition', value: l => l.condition ?? '—' },
  {
    label: 'Type',
    value: l => { const a = AC.find(x => x.name === l.model); return a ? typeLabel[a.type] : '—' },
  },
  {
    label: 'Cruise speed',
    value: l => { const a = AC.find(x => x.name === l.model); return a ? `${a.tas} kt` : '—' },
    numeric: l => AC.find(x => x.name === l.model)?.tas ?? null, best: 'max',
  },
  {
    label: 'Range',
    value: l => { const a = AC.find(x => x.name === l.model); return a ? `${a.range.toLocaleString()} nm` : '—' },
    numeric: l => AC.find(x => x.name === l.model)?.range ?? null, best: 'max',
  },
  {
    label: 'Passengers',
    value: l => { const a = AC.find(x => x.name === l.model); return a ? `${a.pax} pax` : '—' },
    numeric: l => AC.find(x => x.name === l.model)?.pax ?? null, best: 'max',
  },
  {
    label: 'Engines',
    value: l => { const n = l.engines ?? AC.find(x => x.name === l.model)?.engines; return n ? String(n) : '—' },
  },
  {
    label: 'Fuel',
    value: l => { const f = (l.fuel ?? AC.find(x => x.name === l.model)?.fuel.toLowerCase()) as string | undefined; return f ? (fuelLabel[f] ?? f) : '—' },
  },
  {
    label: 'Landing gear',
    value: l => { const g = l.gear ?? AC.find(x => x.name === l.model)?.gear; return g ? (gearLabel[g] ?? g) : '—' },
  },
  { label: 'IFR certified', value: l => (l as any).ifr ? '✓' : '—' },
  { label: 'Certified listing', value: l => l.certified ? '⭐' : '—' },
  { label: 'Contact method', value: l => ((l as any).contact_pref ?? 'email') === 'message' ? '💬 Message' : '✉ Email' },
  { label: 'Location', value: l => l.location || '—' },
]

type Props = {
  listings: Listing[]
  onClose: () => void
  onRemove: (listingId: string) => void
  onViewListing: (listingId: string) => void
}

export default function CompareModal({ listings, onClose, onRemove, onViewListing }: Props) {
  const colWidth = 240

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 260,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(40px) saturate(180%)',
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 20, boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        width: 'min(900px, 96vw)', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, sans-serif", color: '#1d1d1f',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 22px', borderBottom: '0.5px solid rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>⚖ Compare aircraft</div>
            <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>{listings.length} of 3 selected</div>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: '50%', border: 'none',
            background: 'rgba(118,118,128,0.15)', color: '#86868b', cursor: 'pointer', fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 22px 22px' }}>
          <div style={{ display: 'flex', minWidth: 140 + listings.length * colWidth }}>
            {/* Row-label column */}
            <div style={{ width: 140, flexShrink: 0 }}>
              <div style={{ height: 208 }} /> {/* spacer matching photo+title block */}
              {rows.map(r => (
                <div key={r.label} style={{ height: 40, display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.03em', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
                  {r.label}
                </div>
              ))}
            </div>

            {/* One column per listing */}
            {listings.map(l => {
              const photos: string[] = l.photos ?? []
              return (
                <div key={l.id} style={{ width: colWidth, flexShrink: 0, borderLeft: '0.5px solid rgba(0,0,0,0.06)' }}>
                  {/* Photo + title block — kept compact (shorter photo, tighter
                      remove-button row) so a 2-line model name never overlaps
                      the Price row that follows immediately below. */}
                  <div style={{ height: 208, padding: '0 10px 10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '4px 0 3px' }}>
                      <button onClick={() => onRemove(l.id)} title="Remove from comparison" style={{
                        width: 20, height: 20, borderRadius: '50%', border: 'none',
                        background: 'rgba(118,118,128,0.12)', color: '#86868b', cursor: 'pointer', fontSize: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>✕</button>
                    </div>
                    <div onClick={() => onViewListing(l.id)} style={{ position: 'relative', cursor: 'pointer', borderRadius: 10, overflow: 'hidden', width: '100%', aspectRatio: '16/10', background: 'rgba(118,118,128,0.08)', flexShrink: 0 }}>
                      {photos.length > 0
                        ? <Image src={photos[0]} alt="" fill sizes="240px" style={{ objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: 'rgba(0,0,0,0.15)' }}>✈</div>
                      }
                    </div>
                    <div onClick={() => onViewListing(l.id)} style={{ cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', marginTop: 5, lineHeight: 1.25 }}>
                      {l.year} {l.model}
                    </div>
                  </div>

                  {/* Spec rows */}
                  {rows.map(r => {
                    const vals = listings.map(x => r.numeric?.(x) ?? null)
                    const nums = vals.filter((v): v is number => v != null)
                    const thisVal = r.numeric?.(l) ?? null
                    const isBest = r.best && (r.eligible?.(listings) ?? true) && thisVal != null && nums.length > 1 &&
                      new Set(nums).size > 1 &&
                      (r.best === 'min' ? thisVal === Math.min(...nums) : thisVal === Math.max(...nums))
                    return (
                      <div key={r.label} style={{
                        height: 40, display: 'flex', alignItems: 'center', padding: '0 10px',
                        fontSize: 13, fontWeight: isBest ? 700 : 500,
                        color: isBest ? '#248a3d' : '#1d1d1f',
                        background: isBest ? 'rgba(52,199,89,0.08)' : 'transparent',
                        borderTop: '0.5px solid rgba(0,0,0,0.06)',
                      }}>
                        {r.value(l)}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
