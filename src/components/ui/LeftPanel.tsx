'use client'
// src/components/ui/LeftPanel.tsx
import { useState, useCallback, useEffect } from 'react'
import type { Params } from '../AppShell'
import { findStopovers, calcLegs, servesAircraft } from '@/lib/airports'
import type { APEntry as APEntryNonNull } from '@/lib/airports'

type APEntry = APEntryNonNull | null

type Props = {
  params: Params
  onChange: (p: Params) => void
  onHomeAP: (code: string) => void
  onRoutCalc: (from: string, to: string) => { from: APEntry; to: APEntry }
  onFind: () => void
  homeAp: { icao: string; name?: string } | null
  selAC?: { name: string; type: string; range: number; tas: number } | null
  onStopsChange?: (s: 0 | 1 | 2 | 3) => void
  onRouteWaypoints?: (wps: { lat: number; lon: number; icao: string }[] | null) => void
}

// Wind toggle lives in the bottom HUD bar only (see AppShell's HudBar) —
// not duplicated here.

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

  const pct = toPos(value)
  const sMin   = log ? 0   : min
  const sMax   = log ? 100 : max
  const sStep  = log ? 0.5 : step
  const sValue = log ? pct : value

  return (
    <div className="pp-field">
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
      <div className="pp-slider-wrap">
        <div className="pp-slider-track" />
        <div className="pp-slider-fill" style={{ width: `${pct}%` }} />
        <input type="range" className="pp-slider-input" min={sMin} max={sMax} step={sStep} value={sValue}
          onChange={e => onChange(toVal(+e.target.value))} />
        <div className="pp-slider-knob" style={{ left: `${pct}%` }} />
      </div>
    </div>
  )
}

function TypeSeg({ jet, turbo, piston, onChange }: {
  jet: boolean; turbo: boolean; piston: boolean
  onChange: (k: 'jet' | 'turbo' | 'piston', v: boolean) => void
}) {
  return (
    <div className="pp-field" style={{ border: 'none' }}>
      <div className="pp-field-label">Aircraft type</div>
      <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 9, padding: 2, gap: 2, marginTop: 7 }}>
        {(['jet', 'turbo', 'piston'] as const).map(k => {
          const labels = { jet: 'Jet', turbo: 'Turbo', piston: 'Piston' }
          const on = { jet, turbo, piston }[k]
          return (
            <div key={k}
              onClick={() => onChange(k, !on)}
              style={{
                flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 500,
                padding: '6px 0', borderRadius: 7, cursor: 'pointer',
                background: on ? '#fff' : 'transparent',
                color: on ? '#1d1d1f' : '#86868b',
                boxShadow: on ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.15s',
              }}
            >{labels[k]}</div>
          )
        })}
      </div>
    </div>
  )
}

export default function LeftPanel({ params, onChange, onHomeAP, onRoutCalc, onFind, homeAp, selAC, onStopsChange, onRouteWaypoints }: Props) {
  const [apVal, setApVal]           = useState('')
  const [apName, setApName]         = useState('')
  const [rtA, setRtA]               = useState('')
  const [rtB, setRtB]               = useState('')
  const [routeRes, setRouteRes]     = useState<{ nm: number; km: number } | null>(null)
  const [routeErr, setRouteErr]     = useState('')
  const [stops, setStops]           = useState<0 | 1 | 2 | 3>(0)
  const [fromAp, setFromAp]         = useState<APEntry>(null)
  const [toAp, setToAp]             = useState<APEntry>(null)
  const [clickedStopover, setClickedStopover] = useState<string | null>(null)
  const [advancedMode, setAdvancedMode]       = useState(false)
  const [hoursPerYear, setHoursPerYear]       = useState(100)
  const [totalBudgetPerYear, setTotalBudgetPerYear] = useState(60000)

  const fmtM  = (v: number) => v >= 1000 ? `$${(v/1000).toFixed(1)}M` : `$${v}K`
  const fmtYr = (v: number) => v >= 1000 ? `$${(v/1000).toFixed(1)}M/yr` : v >= 1 ? `$${v}K/yr` : `$${Math.round(v*1000)}/yr`
  const fmtHr = (v: number) => `$${v.toLocaleString()}/hr`
  const fmtPax = (v: number) => `${v} pax`
  const fmtNm  = (v: number) => `${v.toLocaleString()} nm`
  const fmtHrsYr  = (v: number) => `${v.toLocaleString()} hrs/yr`
  const fmtBudget = (v: number) => v >= 1_000_000 ? `$${(v/1_000_000).toFixed(1)}M/yr` : v >= 1000 ? `$${Math.round(v/1000)}K/yr` : `$${v}/yr`

  // Simple mode splits the total annual budget into a fixed share (insurance,
  // hangar, financing, maintenance reserves) and a variable share (fuel,
  // hourly maintenance) spread across the expected hours — a 35/65 split is
  // a reasonable rule of thumb for light GA operating costs.
  const FIXED_SHARE = 0.35
  const applySimpleBudget = (hours: number, totalBudget: number) => {
    const fix  = Math.max(0.1, Math.round((totalBudget * FIXED_SHARE) / 100) / 10)
    const varH = Math.max(1, Math.round((totalBudget * (1 - FIXED_SHARE)) / Math.max(1, hours)))
    onChange({ ...params, fix, varH })
  }

  // Seed params.fix/varH from the simple-mode defaults on first render
  useEffect(() => {
    if (!advancedMode) applySimpleBudget(hoursPerYear, totalBudgetPerYear)
  }, []) // eslint-disable-line

  const handleAP = useCallback((val: string) => {
    setApVal(val)
    // Mirror the home airport straight into the route's "From" field
    setRtA(val)
    if (val.length >= 3) {
      onHomeAP(val)
      setApName('Airport set')
    } else { setApName('') }
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
    onStopsChange?.(0)
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
    onStopsChange?.(s)
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

  return (
    <aside style={{ position: 'fixed', top: 68, left: 16, bottom: 16, width: 288, zIndex: 30, display: 'flex', flexDirection: 'column' }} className="pp-panel">
      <div style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 2 }}>Mission</h1>
        <p style={{ fontSize: 13, color: '#86868b', marginBottom: 16 }}>Tune your requirements</p>

        {/* Home airport */}
        <div className="pp-group">
          <div className="pp-field">
            <div className="pp-field-label">Home airport</div>
            <input className="pp-input" value={apVal} placeholder="ICAO or IATA"
              onChange={e => handleAP(e.target.value.toUpperCase())} maxLength={20} />
            {apName && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 12, color: '#0a84ff', fontWeight: 500 }}>
                <span>✓</span><span>{homeAp?.name ?? 'Airport set'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Everything below is locked until a home airport is set */}
        <div style={{ opacity: homeAp ? 1 : 0.35, pointerEvents: homeAp ? 'auto' : 'none', transition: 'opacity 0.2s' }}>

          {/* Route */}
          <div className="pp-group">
            <div className="pp-field">
              <div className="pp-field-label">Route</div>

              <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                <input className="pp-input" value={rtA} placeholder="From" style={{ flex: 1, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 13 }}
                  onChange={e => setRtA(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && handleRoute()} maxLength={6} />
                <input className="pp-input" value={rtB} placeholder="To" style={{ flex: 1, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 13 }}
                  onChange={e => setRtB(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && handleRoute()} maxLength={6} />
                <button onClick={handleRoute} style={{ width: 34, height: 36, borderRadius: 9, border: 'none', background: '#0a84ff', color: '#fff', cursor: 'pointer', fontSize: 14, flexShrink: 0 }}>→</button>
              </div>
              {routeRes && (
                <div className="pp-route-card">
                  {/* Header row: FROM icao ── TO icao */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>{fromAp?.icao}</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.12)' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>{toAp?.icao}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#86868b', marginTop: 4 }}>
                    Total: {routeRes.nm.toLocaleString()} nm · {routeRes.km.toLocaleString()} km
                  </div>

                  {/* Stops segmented control */}
                  <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 9, padding: 2, gap: 2, marginTop: 10 }}>
                    {([0, 1, 2, 3] as const).map(s => (
                      <div key={s}
                        onClick={() => handleStops(s)}
                        style={{
                          flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 500,
                          padding: '6px 0', borderRadius: 7, cursor: 'pointer',
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span style={{ color: '#86868b' }}>{selAC.name}</span>
                        <span style={{ fontWeight: 600 }}>{formatTime(routeRes.nm, selAC.tas)}</span>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}><span style={{ color: '#86868b' }}>Jet (450 kt)</span><span style={{ fontWeight: 600 }}>{formatTime(routeRes.nm, 450)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}><span style={{ color: '#86868b' }}>Turboprop (280 kt)</span><span style={{ fontWeight: 600 }}>{formatTime(routeRes.nm, 280)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span style={{ color: '#86868b' }}>Piston (130 kt)</span><span style={{ fontWeight: 600 }}>{formatTime(routeRes.nm, 130)}</span></div>
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
              {routeErr && <div style={{ fontSize: 12, color: '#ff3b30', marginTop: 5 }}>{routeErr}</div>}
            </div>
          </div>

          {/* Financial sliders */}
          <div className="pp-group">
            <SliderRow label="Initial cost" min={10} max={80000} step={100} value={params.init} fmt={fmtM} onChange={v => onChange({ ...params, init: v })} log />

            {advancedMode ? (
              <>
                <SliderRow label="Fixed / year" min={0.5} max={50} step={0.5} value={params.fix} fmt={fmtYr} onChange={v => onChange({ ...params, fix: v })} />
                <SliderRow label="Variable / hr" min={20} max={10000} step={25} value={params.varH} fmt={fmtHr} onChange={v => onChange({ ...params, varH: v })} log />
              </>
            ) : (
              <>
                <SliderRow label="Hours flown / year" min={5} max={1000} step={5} value={hoursPerYear} fmt={fmtHrsYr}
                  onChange={v => { setHoursPerYear(v); applySimpleBudget(v, totalBudgetPerYear) }} log />
                <SliderRow label="Total budget / year" min={2000} max={2000000} step={500} value={totalBudgetPerYear} fmt={fmtBudget}
                  onChange={v => { setTotalBudgetPerYear(v); applySimpleBudget(hoursPerYear, v) }} log />
              </>
            )}

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none', marginTop: 2 }}>
              <input type="checkbox" checked={advancedMode}
                onChange={e => {
                  const next = e.target.checked
                  setAdvancedMode(next)
                  if (!next) applySimpleBudget(hoursPerYear, totalBudgetPerYear)
                }}
                style={{ width: 15, height: 15, accentColor: '#0a84ff', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#86868b', fontWeight: 500 }}>Advanced mode — set fixed &amp; hourly costs directly</span>
            </label>
          </div>

          {/* Mission sliders */}
          <div className="pp-group">
            <SliderRow label="Passengers" min={1} max={19} step={1} value={params.pax} fmt={fmtPax}
              onChange={v => onChange({ ...params, pax: v })}
              mode={params.paxMode} onModeChange={m => onChange({ ...params, paxMode: m })} />
            <SliderRow label="Desired range" min={100} max={7500} step={50} value={params.range} fmt={fmtNm}
              onChange={v => onChange({ ...params, range: v })}
              mode={params.rangeMode} onModeChange={m => onChange({ ...params, rangeMode: m })} />
          </div>

          {/* Type seg */}
          <div className="pp-group">
            <TypeSeg jet={params.jet} turbo={params.turbo} piston={params.piston}
              onChange={(k, v) => onChange({ ...params, [k]: v })} />
            <div className="pp-field" style={{ border: 'none', paddingTop: 4 }}>
              <div className="pp-field-label">Type rating</div>
              <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 9, padding: 2, gap: 2, marginTop: 7 }}>
                {([['rY', 'Required'], ['rN', 'Not required']] as const).map(([k, lbl]) => {
                  const on = params[k]
                  return (
                    <div key={k} onClick={() => onChange({ ...params, [k]: !on })}
                      style={{ flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 500, padding: '6px 0', borderRadius: 7, cursor: 'pointer', background: on ? '#fff' : 'transparent', color: on ? '#1d1d1f' : '#86868b', boxShadow: on ? '0 1px 3px rgba(0,0,0,0.12)' : 'none', transition: 'all 0.15s' }}>
                      {lbl}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Find button */}
      <button onClick={onFind} disabled={!homeAp} className="pp-btn-primary"
        style={{ margin: '0 18px 18px', height: 50, flexShrink: 0, opacity: homeAp ? 1 : 0.35, cursor: homeAp ? 'pointer' : 'not-allowed' }}>
        ✦ Find my aircraft
      </button>
    </aside>
  )
}
