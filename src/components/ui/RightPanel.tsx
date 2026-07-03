'use client'
// src/components/ui/RightPanel.tsx
import { useState } from 'react'
import { AC } from '@/lib/aircraft'

type Props = {
  results: (typeof AC[0] & { sc: number })[]
  selAC: typeof AC[0] | null
  onSelect: (ac: typeof AC[0]) => void
  onOffers: (ac: typeof AC[0]) => void
  windBR: number[] | null
  homeAp: { icao: string } | null
  wGrid: null
}

type Sort = 'match' | 'price_asc' | 'price_desc' | 'range_asc' | 'range_desc' | 'hr_asc' | 'hr_desc' | 'speed_asc' | 'speed_desc'

export default function RightPanel({ results, selAC, onSelect, onOffers, windBR }: Props) {
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState<Sort>('match')

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

  const typeLabel = (t: string) =>
    t === 'jet' ? ['Jet', 'pp-tag-j'] :
    t === 'turbo' ? ['Turbo', 'pp-tag-t'] :
    ['Piston', 'pp-tag-p']

  return (
    <aside style={{ position: 'fixed', top: 68, right: 16, bottom: 16, width: 280, zIndex: 30, display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="pp-panel">
      {/* Header */}
      <div style={{ padding: '18px 18px 12px', flexShrink: 0 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 2 }}>Matches</h1>
        <p style={{ fontSize: 13, color: '#86868b' }}>
          {results.length === 0
            ? 'Set your mission and press Find'
            : <><b style={{ color: '#0a84ff', fontWeight: 600 }}>{results.length}</b> aircraft found</>}
        </p>
      </div>

      {/* Search */}
      <div style={{ padding: '0 18px 10px', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 30, top: '50%', transform: 'translateY(-50%)', color: '#86868b', fontSize: 14, pointerEvents: 'none' }}>⌕</span>
        <input className="pp-input" value={search} placeholder="Search model"
          style={{ paddingLeft: 32, height: 34, background: 'rgba(118,118,128,0.12)', borderRadius: 10, fontSize: 13 }}
          onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Sort */}
      <div style={{ padding: '0 18px 10px' }}>
        <select value={sort} onChange={e => setSort(e.target.value as Sort)}
          style={{ width: '100%', height: 32, padding: '0 10px', borderRadius: 10, border: '0.5px solid rgba(0,0,0,0.12)', background: 'transparent', fontFamily: 'inherit', fontSize: 12, color: '#1d1d1f', cursor: 'pointer' }}>
          <option value="match">Best match</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="range_asc">Range ↑</option>
          <option value="range_desc">Range ↓</option>
          <option value="hr_asc">Price/hr ↑</option>
          <option value="hr_desc">Price/hr ↓</option>
          <option value="speed_asc">Speed ↑</option>
          <option value="speed_desc">Speed ↓</option>
        </select>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
        {filtered.length === 0 && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#86868b' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>✈</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Configure your mission</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>and tap Find my aircraft</div>
          </div>
        )}
        {filtered.map(ac => {
          const [lbl, cls] = typeLabel(ac.type)
          const isSel = selAC?.name === ac.name
          const windAdj = windBR ? Math.max(...windBR) : null
          const displayRange = windAdj ? Math.round(windAdj) : ac.range

          return (
            <div key={ac.name} className={`pp-ac-card${isSel ? ' selected' : ''}`} onClick={() => onSelect(ac)}>
              {/* Row 1: name + tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em' }}>{ac.name}</span>
                <span className={`pp-tag ${cls}`}>{lbl}</span>
              </div>

              {/* Grid: 4 stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 11px', marginBottom: 10 }}>
                {[
                  ['Passengers', `${ac.pax}`],
                  ['Speed', `${ac.tas} kt`],
                  ['Range', `${displayRange.toLocaleString()} nm${windAdj ? ' ↻' : ''}`],
                  ['Price', ac.initK >= 1000 ? `$${(ac.initK/1000).toFixed(1)}M` : `$${ac.initK}K`],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span style={{ fontSize: 11, color: '#86868b' }}>{l}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Score bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div className="pp-meter-track">
                  <div className={`pp-meter-fill${ac.sc < 100 ? ' dim' : ''}`} style={{ width: `${ac.sc}%` }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#86868b', fontVariantNumeric: 'tabular-nums' }}>{Math.round(ac.sc)}</span>
              </div>

              {/* Offers button */}
              <button className="pp-offers-btn"
                style={{ width: '100%', height: 34, borderRadius: 10, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                onClick={e => { e.stopPropagation(); onOffers(ac) }}>
                See offers
              </button>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
