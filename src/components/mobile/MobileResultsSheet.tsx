'use client'
// src/components/mobile/MobileResultsSheet.tsx
import { useState } from 'react'
import { AC } from '@/lib/aircraft'
import { useSwipeToClose } from './useSwipeToClose'

type Sort = 'match' | 'price_asc' | 'price_desc' | 'range_asc' | 'range_desc' | 'hr_asc' | 'hr_desc' | 'speed_asc' | 'speed_desc'

type Props = {
  open: boolean
  onClose: () => void
  results: (typeof AC[0] & { sc: number })[]
  selAC: typeof AC[0] | null
  onSelect: (ac: typeof AC[0]) => void
  onOffers: (ac: typeof AC[0]) => void
  windBR: number[] | null
}

export default function MobileResultsSheet({ open, onClose, results, selAC, onSelect, onOffers, windBR }: Props) {
  const [search, setSearch] = useState('')
  const [sort, setSort]     = useState<Sort>('match')
  const { dragY, handlers } = useSwipeToClose(onClose)

  const filtered = results
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sort) {
        case 'price_asc':  return a.initK - b.initK
        case 'price_desc': return b.initK - a.initK
        case 'range_asc':  return a.range - b.range
        case 'range_desc': return b.range - a.range
        case 'hr_asc':     return a.varH - b.varH
        case 'hr_desc':    return b.varH - a.varH
        case 'speed_asc':  return a.tas - b.tas
        case 'speed_desc': return b.tas - a.tas
        default:           return b.sc - a.sc
      }
    })

  const typeColors: Record<string, string> = { jet: '#0a84ff', turbo: '#ff9f0a', piston: '#34c759' }
  const typeLabels: Record<string, string> = { jet: 'Jet', turbo: 'Turbo', piston: 'Piston' }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.4)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 201,
        height: '80vh',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(50px) saturate(180%)',
        borderRadius: '20px 20px 0 0',
        display: 'flex', flexDirection: 'column',
        transform: open ? `translateY(${dragY}px)` : 'translateY(100%)',
        transition: dragY > 0 ? 'none' : 'transform 0.3s ease-out',
        boxShadow: '0 -4px 40px rgba(0,0,0,0.2)',
      }}>
        {/* Drag handle + header — swipe down here to close */}
        <div {...handlers}>
          <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
          </div>

          {/* Header */}
          <div style={{ flexShrink: 0, padding: '8px 20px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Matches</div>
                <div style={{ fontSize: 13, color: '#86868b', marginTop: 1 }}>
                  {results.length === 0
                    ? 'No results yet'
                    : <><b style={{ color: '#0a84ff' }}>{results.length}</b> aircraft found</>}
                </div>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, color: '#86868b', cursor: 'pointer', padding: '0 4px' }}>✕</button>
            </div>
          </div>
        </div>

        {/* Search + sort */}
        <div style={{ flexShrink: 0, padding: '0 20px 10px', display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#86868b', fontSize: 14, pointerEvents: 'none' }}>⌕</span>
            <input value={search} placeholder="Search model"
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', height: 38, padding: '0 12px 0 32px', borderRadius: 10, border: '0.5px solid rgba(0,0,0,0.1)', background: 'rgba(118,118,128,0.1)', fontFamily: 'inherit', fontSize: 16, outline: 'none' }}
            />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value as Sort)}
            style={{ height: 38, padding: '0 8px', borderRadius: 10, border: '0.5px solid rgba(0,0,0,0.12)', background: 'rgba(118,118,128,0.1)', fontFamily: 'inherit', fontSize: 16, color: '#1d1d1f', cursor: 'pointer', flexShrink: 0 }}>
            <option value="match">Best match</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
            <option value="range_asc">Range ↑</option>
            <option value="range_desc">Range ↓</option>
            <option value="hr_asc">$/hr ↑</option>
            <option value="hr_desc">$/hr ↓</option>
            <option value="speed_asc">Speed ↑</option>
            <option value="speed_desc">Speed ↓</option>
          </select>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#86868b' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>✈</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>No matches</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
            </div>
          )}
          {filtered.map(ac => {
            const isSel = selAC?.name === ac.name
            const windAdj = windBR ? Math.max(...windBR) : null
            const displayRange = windAdj ? Math.round(windAdj) : ac.range
            const color = typeColors[ac.type] ?? '#86868b'

            return (
              <div
                key={ac.name}
                onClick={() => onSelect(ac)}
                style={{
                  borderRadius: 16,
                  border: isSel ? `1.5px solid #0a84ff` : '0.5px solid rgba(0,0,0,0.08)',
                  background: isSel ? 'rgba(10,132,255,0.04)' : 'rgba(255,255,255,0.8)',
                  padding: '14px 14px 12px',
                  marginBottom: 10,
                  cursor: 'pointer',
                  boxShadow: isSel ? '0 0 0 3px rgba(10,132,255,0.1)' : '0 1px 4px rgba(0,0,0,0.06)',
                  transition: 'all 0.15s',
                }}
              >
                {/* Name + type badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em' }}>{ac.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 8, background: `${color}18`, color }}>
                    {typeLabels[ac.type] ?? ac.type}
                  </span>
                </div>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px 0', marginBottom: 10 }}>
                  {[
                    ['Pax', `${ac.pax}`],
                    ['Speed', `${ac.tas}kt`],
                    ['Range', `${displayRange.toLocaleString()}nm${windAdj ? '↻' : ''}`],
                    ['Price', ac.initK >= 1000 ? `$${(ac.initK/1000).toFixed(1)}M` : `$${ac.initK}K`],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <span style={{ fontSize: 10, color: '#86868b' }}>{l}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Score bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ flex: 1, height: 4, background: 'rgba(118,118,128,0.15)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${ac.sc}%`, background: '#0a84ff', borderRadius: 2, opacity: ac.sc < 100 ? 0.5 : 1 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#86868b', fontVariantNumeric: 'tabular-nums', minWidth: 28 }}>{Math.round(ac.sc)}</span>
                </div>

                {/* Offers */}
                <button
                  onClick={e => { e.stopPropagation(); onOffers(ac) }}
                  style={{ width: '100%', height: 38, borderRadius: 10, border: 'none', background: 'rgba(10,132,255,0.1)', color: '#0a84ff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
                >
                  See offers
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
