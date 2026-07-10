'use client'
// src/components/mobile/MobileFiltersDrawer.tsx
import { useState, useCallback, useEffect } from 'react'
import type { Params } from '@/components/AppShell'
import type { APEntry } from '@/lib/airports'
import { findStopovers, calcLegs, servesAircraft } from '@/lib/airports'
import { useSwipeToClose } from './useSwipeToClose'

type Props = {
  open: boolean
  onClose: () => void
  params: Params
  onChange: (p: Params) => void
  onHomeAP: (code: string) => void
  onRoutCalc: (from: string, to: string) => { from: APEntry | null; to: APEntry | null }
  onFind: () => void
  homeAp: { icao: string; name?: string } | null
  selAC?: { name: string; type: string; range: number; tas: number } | null
  onRouteWaypoints?: (wps: { lat: number; lon: number; icao: string }[] | null) => void
  windLevel?: string
  windLoaded?: boolean
}

const WIND_STATUS_LABEL: Record<string, string> = {
  FL350: '✓ FL350 jet stream loaded',
  FL180: '✓ FL180 upper winds loaded',
  FL100: '✓ FL100 cruise winds loaded',
}

function SliderRow({ label, min, max, value, step, fmt, onChange, mode, onModeChange, log }: {
  label: string; min: number; max: number; value: number; step: number
  fmt: (v: number) => string; onChange: (v: number) => void
  mode?: 'min' | 'max'; onModeChange?: (m: 'min' | 'max') => void
  log?: boolean
}) {
  const toPos = (v: number) => log
    ? (Math.log(v / min) / Math.log(max / min)) * 100
    : ((v - min) / (max - min)) * 100
  const toVal = (pos: number) => log
    ? Math.round(min * Math.pow(max / min, pos / 100))
    : pos

  const pct    = toPos(value)
  const sMin   = log ? 0   : min
  const sMax   = log ? 100 : max
  const sStep  = log ? 0.5 : step
  const sValue = log ? pct : value

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: '#1d1d1f', fontWeight: 400 }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {mode && onModeChange && (
            <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 6, padding: 1, gap: 1 }}>
              {(['min', 'max'] as const).map(m => (
                <div key={m} onClick={() => onModeChange(m)}
                  style={{
                    fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 5, cursor: 'pointer',
                    textTransform: 'uppercase', letterSpacing: '0.03em',
                    background: mode === m ? '#fff' : 'transparent',
                    color: mode === m ? '#1d1d1f' : '#86868b',
                    boxShadow: mode === m ? '0 1px 2px rgba(0,0,0,0.12)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >{m}</div>
              ))}
            </div>
          )}
          <span style={{ fontSize: 14, color: '#0a84ff', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{fmt(value)}</span>
        </div>
      </div>
      <div style={{ position: 'relative', height: 28, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, background: 'rgba(118,118,128,0.18)', borderRadius: 2 }} />
        <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 4, background: '#0a84ff', borderRadius: 2 }} />
        <input type="range" min={sMin} max={sMax} step={sStep} value={sValue}
          onChange={e => onChange(toVal(+e.target.value))}
          style={{ position: 'absolute', left: 0, right: 0, width: '100%', opacity: 0, height: 28, cursor: 'pointer', margin: 0 }} />
        <div style={{ position: 'absolute', left: `${pct}%`, transform: 'translateX(-50%)', width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', border: '0.5px solid rgba(0,0,0,0.08)', pointerEvents: 'none' }} />
      </div>
    </div>
  )
}

export default function MobileFiltersDrawer({ open, onClose, params, onChange, onHomeAP, onRoutCalc, onFind, homeAp, selAC, onRouteWaypoints, windLevel = 'FL350', windLoaded }: Props) {
  const [apVal, setApVal]       = useState('')
  const [apName, setApName]     = useState('')
  const [rtA, setRtA]           = useState('')
  const [rtB, setRtB]           = useState('')
  const [routeRes, setRouteRes] = useState<{ nm: number; km: number } | null>(null)
  const [routeErr, setRouteErr] = useState('')
  const [stops, setStops]       = useState<0 | 1 | 2 | 3>(0)
  const [fromAp, setFromAp]     = useState<APEntry | null>(null)
  const [toAp, setToAp]         = useState<APEntry | null>(null)
  const [clickedStopover, setClickedStopover] = useState<string | null>(null)
  const { dragY, handlers } = useSwipeToClose(onClose)

  // Mirror the home airport (set from the map overlay input) into the route's "From" field
  useEffect(() => {
    if (homeAp) setRtA(homeAp.icao)
  }, [homeAp])

  const fmtM   = (v: number) => v >= 1000 ? `$${(v/1000).toFixed(1)}M` : `$${v}K`
  const fmtYr  = (v: number) => v >= 1000 ? `$${(v/1000).toFixed(1)}M/yr` : v >= 1 ? `$${v}K/yr` : `$${Math.round(v*1000)}/yr`
  const fmtHr  = (v: number) => `$${v.toLocaleString()}/hr`
  const fmtPax = (v: number) => `${v} pax`
  const fmtNm  = (v: number) => `${v.toLocaleString()} nm`

  const handleAP = useCallback((val: string) => {
    setApVal(val)
    if (val.length >= 3) { onHomeAP(val); setApName('Airport set') }
    else setApName('')
  }, [onHomeAP])

  const handleRoute = () => {
    setRouteErr(''); setRouteRes(null)
    const res = onRoutCalc(rtA, rtB)
    if (!res.from) { setRouteErr(`"${rtA}" not found`); return }
    if (!res.to)   { setRouteErr(`"${rtB}" not found`); return }
    const P = Math.PI / 180
    const nm = Math.round(Math.acos(Math.max(-1, Math.min(1,
      Math.sin(res.from.lat*P)*Math.sin(res.to.lat*P) +
      Math.cos(res.from.lat*P)*Math.cos(res.to.lat*P)*Math.cos((res.to.lon-res.from.lon)*P)
    )))*180/Math.PI*60)
    setRouteRes({ nm, km: Math.round(nm * 1.852) })
    setFromAp(res.from)
    setToAp(res.to)
    setClickedStopover(null)
    setStops(0)
    onRouteWaypoints?.(null)
    onChange({ ...params, range: Math.min(7500, Math.max(100, nm)) })
  }

  const formatTime = (nm: number, kt: number) => {
    const h = Math.floor(nm / kt)
    const m = String(Math.round(((nm / kt) % 1) * 60)).padStart(2, '0')
    return `${h}h${m}`
  }

  const handleStops = (s: 0 | 1 | 2 | 3) => {
    setStops(s)
    setClickedStopover(null)
    if (!routeRes) return
    if (s === 0) {
      onRouteWaypoints?.(null)
      onChange({ ...params, range: Math.min(7500, Math.max(100, routeRes.nm)) })
      return
    }
    if (!fromAp || !toAp) return
    const stopovers = findStopovers(fromAp, toAp, s, selAC?.type)
    const legs = calcLegs(fromAp, stopovers, toAp)
    if (legs.length === 0) return
    const longestLeg = Math.max(...legs.map(l => l.dist))
    const waypoints = [fromAp, ...stopovers, toAp]
    onRouteWaypoints?.(waypoints.map(w => ({ lat: w.lat, lon: w.lon, icao: w.icao })))
    onChange({ ...params, range: longestLeg })
  }

  const handleFind = () => { onFind(); onClose() }

  const section: React.CSSProperties = {
    borderBottom: '0.5px solid rgba(0,0,0,0.07)',
    paddingBottom: 18,
    marginBottom: 18,
  }

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
        height: '88vh',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(50px) saturate(180%)',
        borderRadius: '20px 20px 0 0',
        display: 'flex', flexDirection: 'column',
        transform: open ? `translateY(${dragY}px)` : 'translateY(100%)',
        transition: dragY > 0 ? 'none' : 'transform 0.3s ease-out',
        boxShadow: '0 -4px 40px rgba(0,0,0,0.2)',
      }}>
        {/* Drag handle + title — swipe down here to close */}
        <div {...handlers}>
          <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
          </div>

          {/* Title */}
          <div style={{ flexShrink: 0, padding: '8px 20px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>Mission</div>
            <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>Tune your requirements</div>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 0' }}>

          {/* Locked wrapper */}
          <div style={{ opacity: homeAp ? 1 : 0.35, pointerEvents: homeAp ? 'auto' : 'none', transition: 'opacity 0.2s' }}>

            {windLoaded && (
              <div key={windLevel} style={{ marginBottom: 14, fontSize: 13, color: '#34c759', fontWeight: 500, animation: 'fadeIn 0.3s ease' }}>
                {WIND_STATUS_LABEL[windLevel] ?? `✓ ${windLevel} winds loaded`}
              </div>
            )}

            {/* Route */}
            <div style={section}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Route</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input value={rtA} placeholder="From" maxLength={6}
                  onChange={e => setRtA(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === 'Enter' && handleRoute()}
                  style={{ width: '42%', flexShrink: 0, height: 44, padding: '0 8px', borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.12)', background: 'rgba(118,118,128,0.08)', fontFamily: 'inherit', fontSize: 16, outline: 'none', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em', boxSizing: 'border-box' }}
                />
                <input value={rtB} placeholder="To" maxLength={6}
                  onChange={e => setRtB(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === 'Enter' && handleRoute()}
                  style={{ width: '42%', flexShrink: 0, height: 44, padding: '0 8px', borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.12)', background: 'rgba(118,118,128,0.08)', fontFamily: 'inherit', fontSize: 16, outline: 'none', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em', boxSizing: 'border-box' }}
                />
                <button onClick={handleRoute} style={{ width: 44, height: 44, borderRadius: 12, border: 'none', background: '#0a84ff', color: '#fff', cursor: 'pointer', fontSize: 18, flexShrink: 0 }}>→</button>
              </div>
              {routeRes && (
                <div style={{ marginTop: 12, padding: 14, background: 'rgba(118,118,128,0.07)', borderRadius: 14 }}>
                  {/* Header row: FROM icao ── TO icao */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.02em' }}>{fromAp?.icao}</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.12)' }} />
                    <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.02em' }}>{toAp?.icao}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#86868b', marginTop: 4 }}>
                    Total: {routeRes.nm.toLocaleString()} nm · {routeRes.km.toLocaleString()} km
                  </div>

                  {/* Stops segmented control */}
                  <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 10, padding: 2, gap: 2, marginTop: 10 }}>
                    {([0, 1, 2, 3] as const).map(s => (
                      <div key={s}
                        onClick={() => handleStops(s)}
                        style={{
                          flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 500,
                          padding: '7px 0', borderRadius: 8, cursor: 'pointer',
                          background: stops === s ? '#fff' : 'transparent',
                          color: stops === s ? '#1d1d1f' : '#86868b',
                          boxShadow: stops === s ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                          transition: 'all 0.15s',
                        }}
                      >{s === 0 ? 'Direct' : s === 1 ? '1 Stop' : `${s} Stops`}</div>
                    ))}
                  </div>

                  <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.08)', margin: '10px 0' }} />

                  {stops === 0 ? (
                    selAC ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: '#86868b' }}>{selAC.name}</span>
                        <span style={{ fontWeight: 600 }}>{formatTime(routeRes.nm, selAC.tas)}</span>
                      </div>
                    ) : (
                      <>
                        {[['Jet (450 kt)', 450], ['Turboprop (280 kt)', 280], ['Piston (130 kt)', 130]].map(([lbl, kt]) => (
                          <div key={String(kt)} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                            <span style={{ color: '#86868b' }}>{lbl}</span>
                            <span style={{ fontWeight: 600 }}>{formatTime(routeRes.nm, Number(kt))}</span>
                          </div>
                        ))}
                      </>
                    )
                  ) : fromAp && toAp ? (() => {
                    const stopovers  = findStopovers(fromAp, toAp, stops, selAC?.type)
                    const legs       = calcLegs(fromAp, stopovers, toAp)
                    const waypoints  = [fromAp, ...stopovers, toAp]
                    const longestLeg = legs.length ? Math.max(...legs.map(l => l.dist)) : 0
                    return (
                      <>
                        <div>
                          {waypoints.map((wp, idx) => {
                            const isEndpoint = idx === 0 || idx === waypoints.length - 1
                            const leg = idx < waypoints.length - 1 ? legs[idx] : null
                            const underserved = !isEndpoint && selAC && !servesAircraft(wp, selAC.type)
                            return (
                              <div key={`${wp.icao}-${idx}`}>
                                <div
                                  onClick={() => !isEndpoint && setClickedStopover(v => v === wp.icao ? null : wp.icao)}
                                  style={{ display: 'flex', alignItems: 'center', cursor: isEndpoint ? 'default' : 'pointer' }}
                                >
                                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: isEndpoint ? '#0a84ff' : '#ff9f0a', flexShrink: 0 }} />
                                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', marginLeft: 8 }}>{wp.icao}</span>
                                  <span style={{ fontSize: 12, color: '#86868b', marginLeft: 4 }}>{wp.name}</span>
                                  {underserved && (
                                    <span title={`May not fully support a ${selAC?.type} (fuel/runway)`} style={{ fontSize: 11, color: '#ff9f0a', marginLeft: 6 }}>⚠</span>
                                  )}
                                </div>
                                {!isEndpoint && clickedStopover === wp.icao && (
                                  <div style={{ fontSize: 11, color: '#0a84ff', marginLeft: 22, marginTop: 2 }}>
                                    {underserved ? 'May not fully support this aircraft type' : 'Airport set as waypoint'}
                                  </div>
                                )}
                                {leg && (
                                  <div style={{ display: 'flex', alignItems: 'center', minHeight: 22 }}>
                                    <div style={{ width: 2, alignSelf: 'stretch', background: 'rgba(0,0,0,0.08)', marginLeft: 6 }} />
                                    <span style={{ fontSize: 12, color: '#0a84ff', fontWeight: 600, marginLeft: 14 }}>{leg.dist.toLocaleString()} nm</span>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                        <div style={{ marginTop: 8, fontSize: 12, color: '#86868b' }}>
                          Longest leg: <b style={{ color: '#1d1d1f' }}>{longestLeg.toLocaleString()} nm</b>
                          {' · '}
                          <span
                            onClick={() => onChange({ ...params, range: longestLeg })}
                            style={{ color: '#0a84ff', fontWeight: 600, cursor: 'pointer' }}
                          >Set as range</span>
                        </div>
                      </>
                    )
                  })() : null}
                </div>
              )}
              {routeErr && <div style={{ fontSize: 13, color: '#ff3b30', marginTop: 6 }}>{routeErr}</div>}
            </div>

            {/* Financial */}
            <div style={section}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Budget</div>
              <SliderRow label="Initial cost" min={10} max={80000} step={100} value={params.init} fmt={fmtM} onChange={v => onChange({ ...params, init: v })} log />
              <SliderRow label="Fixed / year" min={0.5} max={50} step={0.5} value={params.fix} fmt={fmtYr} onChange={v => onChange({ ...params, fix: v })} />
              <SliderRow label="Variable / hr" min={20} max={10000} step={25} value={params.varH} fmt={fmtHr} onChange={v => onChange({ ...params, varH: v })} log />
            </div>

            {/* Mission */}
            <div style={section}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Mission</div>
              <SliderRow label="Passengers" min={1} max={19} step={1} value={params.pax} fmt={fmtPax}
                onChange={v => onChange({ ...params, pax: v })}
                mode={params.paxMode} onModeChange={m => onChange({ ...params, paxMode: m })} />
              <SliderRow label="Desired range" min={100} max={7500} step={50} value={params.range} fmt={fmtNm}
                onChange={v => onChange({ ...params, range: v })}
                mode={params.rangeMode} onModeChange={m => onChange({ ...params, rangeMode: m })} />
            </div>

            {/* Aircraft type */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Aircraft type</div>
              <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 12, padding: 3, gap: 2, marginBottom: 12 }}>
                {(['jet', 'turbo', 'piston'] as const).map(k => {
                  const labels = { jet: 'Jet', turbo: 'Turbo', piston: 'Piston' }
                  const on = params[k]
                  return (
                    <div key={k} onClick={() => onChange({ ...params, [k]: !on })}
                      style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 500, padding: '8px 0', borderRadius: 10, cursor: 'pointer', background: on ? '#fff' : 'transparent', color: on ? '#1d1d1f' : '#86868b', boxShadow: on ? '0 1px 3px rgba(0,0,0,0.12)' : 'none', transition: 'all 0.15s' }}>
                      {labels[k]}
                    </div>
                  )
                })}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Type rating</div>
              <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 12, padding: 3, gap: 2 }}>
                {([['rY', 'Required'], ['rN', 'Not required']] as const).map(([k, lbl]) => {
                  const on = params[k]
                  return (
                    <div key={k} onClick={() => onChange({ ...params, [k]: !on })}
                      style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 500, padding: '8px 0', borderRadius: 10, cursor: 'pointer', background: on ? '#fff' : 'transparent', color: on ? '#1d1d1f' : '#86868b', boxShadow: on ? '0 1px 3px rgba(0,0,0,0.12)' : 'none', transition: 'all 0.15s' }}>
                      {lbl}
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Find button */}
        <div style={{ flexShrink: 0, padding: '14px 20px', paddingBottom: 'max(20px, env(safe-area-inset-bottom))', borderTop: '0.5px solid rgba(0,0,0,0.07)' }}>
          <button
            onClick={handleFind}
            disabled={!homeAp}
            style={{ width: '100%', height: 52, borderRadius: 14, border: 'none', background: homeAp ? '#0a84ff' : 'rgba(10,132,255,0.35)', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: homeAp ? 'pointer' : 'not-allowed', letterSpacing: '-0.01em' }}
          >
            ✦ Find my aircraft
          </button>
        </div>
      </div>
    </>
  )
}
