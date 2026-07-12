'use client'
// src/components/ui/AirportPicker.tsx
// Shared search-as-you-type airport picker backed by the Supabase `airports`
// table (~47,500 global airfields) — always resolves to a real row
// (icao/name/lat/lon), never a free-typed/guessed location. Reused by the
// listing location field, listing edit forms, and the home-airport picker.
import { useState, useEffect, useRef } from 'react'
import { searchAirportsRemote, type RemoteAirport } from '@/lib/airports-remote'

export type { RemoteAirport }

const DEFAULT_INPUT_STYLE: React.CSSProperties = {
  width: '100%', height: 40,
  background: 'rgba(118,118,128,0.08)', border: 'none',
  borderRadius: 10, fontFamily: 'inherit', fontSize: 16,
  fontWeight: 500, padding: '0 12px', color: '#1d1d1f', boxSizing: 'border-box',
}

export default function AirportPicker({
  initialLabel = '', hasValue = false, onChange, inputStyle, className,
  selectedBackground = 'rgba(10,132,255,0.06)', selectedColor, placeholder,
}: {
  initialLabel?: string
  hasValue?: boolean
  onChange: (ap: RemoteAirport | null) => void
  inputStyle?: React.CSSProperties
  className?: string
  selectedBackground?: string
  selectedColor?: string
  placeholder?: string
}) {
  const [query, setQuery]       = useState(initialLabel)
  const [results, setResults]   = useState<RemoteAirport[]>([])
  const [loading, setLoading]   = useState(false)
  const [open, setOpen]         = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reqIdRef = useRef(0)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current) }, [])

  const handleInput = (v: string) => {
    setQuery(v)
    onChange(null)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const q = v.trim()
    if (q.length < 2) {
      setResults([]); setOpen(false); setLoading(false)
      return
    }
    setLoading(true)
    setOpen(true)
    const myReqId = ++reqIdRef.current
    debounceRef.current = setTimeout(async () => {
      const found = await searchAirportsRemote(q, 8)
      if (myReqId !== reqIdRef.current) return // stale response — a newer keystroke has already fired
      setResults(found)
      setLoading(false)
    }, 250)
  }

  const select = (ap: RemoteAirport) => {
    onChange(ap)
    setQuery(`${ap.icao} — ${ap.name}`)
    setOpen(false)
    setResults([])
  }

  const baseStyle = inputStyle ?? DEFAULT_INPUT_STYLE
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        className={className}
        style={{
          ...(className ? {} : baseStyle),
          background: hasValue ? selectedBackground : (className ? undefined : baseStyle.background),
          color: hasValue && selectedColor ? selectedColor : (className ? undefined : baseStyle.color),
        }}
        type="text"
        value={query}
        onChange={e => handleInput(e.target.value)}
        onFocus={() => { if (results.length) setOpen(true) }}
        placeholder={placeholder ?? 'Search any airport worldwide — ICAO, IATA or city…'}
        autoComplete="off"
      />
      {hasValue && (
        <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: selectedColor }}>✓</span>
      )}
      {open && (loading || results.length > 0) && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 500,
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
          border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.14)', overflow: 'hidden',
          maxHeight: 260, overflowY: 'auto',
        }}>
          {loading && results.length === 0 && (
            <div style={{ padding: '10px 14px', fontSize: 12, color: '#86868b' }}>Searching…</div>
          )}
          {results.map(ap => (
            <div key={ap.icao} onMouseDown={() => select(ap)}
              style={{ padding: '9px 14px', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,132,255,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0a84ff', fontVariantNumeric: 'tabular-nums', minWidth: 38 }}>{ap.icao}</span>
              <span style={{ fontSize: 13, color: '#1d1d1f', flex: 1 }}>{ap.name}</span>
              {ap.iata && <span style={{ fontSize: 11, color: '#86868b' }}>{ap.iata}</span>}
              {!ap.verified && (
                <span title="Bulk-imported data — fuel/IFR/customs are unverified estimates, not AIP data"
                  style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 100, background: 'rgba(255,159,10,0.15)', color: '#b07800', flexShrink: 0 }}>
                  ⚠ TO VERIFY
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
