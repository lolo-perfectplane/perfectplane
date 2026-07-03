'use client'
// src/components/AppShell.tsx
import dynamic from 'next/dynamic'
import { useState, useCallback, useEffect } from 'react'
import { AC, scoreAircraft } from '@/lib/aircraft'
import { AIRPORTS, lookupAirport } from '@/lib/airports'
import type { APEntry } from '@/lib/airports'
import type { Listing } from '@/lib/supabase'
import { createClient } from '@/lib/supabase'
import Header from './ui/Header'
import LeftPanel from './ui/LeftPanel'
import RightPanel from './ui/RightPanel'
import MarketTab from './ui/MarketTab'
import JobTab from './ui/JobTab'
import AuthModal from './ui/AuthModal'
import { SellModal, AdminModal, ContactModal, MyItemsModal } from './listings/Modals'
import MobileShell from './mobile/MobileShell'
import LegalModal from './ui/LegalModal'
import { useIsMobile } from '@/hooks/useIsMobile'

// Wind data is fixed at FL350 (250hPa) — the only pressure level
// Open-Meteo reliably returns for the jet-stream band.

// ── Interactive HUD bar ───────────────────────────────────────
function HudBar({ homeAp, selAC, showWind, onWindToggle, onWindFetch }: {
  homeAp: APEntry | null
  selAC: typeof AC[0] | null
  showWind: boolean
  onWindToggle: (v: boolean) => void
  onWindFetch: () => void
}) {
  const handleWindToggle = () => {
    const next = !showWind
    onWindToggle(next)
    if (next) onWindFetch()
  }

  const hudCell: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', gap: 2,
    padding: '10px 18px',
    borderRight: '0.5px solid rgba(255,255,255,0.07)',
  }
  const hudL: React.CSSProperties = {
    fontSize: 10, color: 'rgba(255,255,255,0.38)', fontWeight: 500,
    letterSpacing: '0.06em', textTransform: 'uppercase',
  }
  const hudV: React.CSSProperties = {
    fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.92)',
    letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
  }

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 50, display: 'flex', alignItems: 'stretch',
      background: 'rgba(10,12,18,0.82)',
      backdropFilter: 'blur(32px) saturate(160%)',
      border: '0.5px solid rgba(255,255,255,0.10)',
      borderRadius: 18,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      overflow: 'visible',
    }}>
      {/* Position */}
      <div style={hudCell}>
        <span style={hudL}>Position</span>
        <span style={hudV}>{homeAp ? `${homeAp.lat?.toFixed(1)}°N ${Math.abs(homeAp.lon ?? 0).toFixed(1)}°W` : '—'}</span>
      </div>

      {/* Aircraft */}
      <div style={hudCell}>
        <span style={hudL}>Aircraft</span>
        <span style={hudV}>{selAC ? selAC.name.split(' ').slice(-1)[0] : '—'}</span>
      </div>

      {/* Range */}
      <div style={hudCell}>
        <span style={hudL}>Range</span>
        <span style={hudV}>{selAC ? `${selAC.range.toLocaleString()} nm` : '—'}</span>
      </div>

      {/* Winds toggle — clickable, fixed at FL350 */}
      <div
        onClick={handleWindToggle}
        style={{ ...hudCell, cursor: 'pointer', borderRight: 'none', borderRadius: '0 18px 18px 0', userSelect: 'none',
          background: showWind ? 'rgba(52,199,89,0.1)' : 'transparent',
          transition: 'background 0.2s',
        }}
        title={showWind ? 'Click to disable winds (FL350)' : 'Click to enable winds (FL350)'}
      >
        <span style={hudL}>Winds · FL350</span>
        <span style={{ ...hudV, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
            background: showWind ? '#34c759' : 'rgba(255,255,255,0.2)',
            boxShadow: showWind ? '0 0 6px rgba(52,199,89,0.6)' : 'none',
            transition: 'all 0.2s',
          }} />
          {showWind ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  )
}

const GlobeMap = dynamic(() => import('./globe/GlobeMap'), { ssr: false })

const ALL_AIRPORTS = AIRPORTS.map(a => ({ ic: a.icao, la: a.lat, lo: a.lon }))

// Build ICAO and IATA → {lat,lon} lookups for resolving listing locations
const AIRPORT_COORDS: Record<string, { lat: number; lon: number }> = {}
for (const a of AIRPORTS) {
  AIRPORT_COORDS[a.icao.toUpperCase()] = { lat: a.lat, lon: a.lon }
  if (a.iata) AIRPORT_COORDS[a.iata.toUpperCase()] = { lat: a.lat, lon: a.lon }
}

function resolveListingDots(listings: import('@/lib/supabase').Listing[]) {
  const dots = listings.flatMap(l => {
    if (!l.location) return []
    const tokens = l.location.trim().toUpperCase().split(/[\s—\-,/]+/)
    for (const tok of tokens) {
      if (tok.length >= 3 && tok.length <= 4) {
        const ap = AIRPORT_COORDS[tok]
        if (ap) return [{ lon: ap.lon, lat: ap.lat, model: l.model ?? '', price: l.price ?? null }]
      }
    }
    return []
  })
  console.log('[AppShell] resolveListingDots — listings:', listings.length, 'resolved:', dots.length, listings.map(l => l.location))
  return dots
}

function gcDist(la1: number, lo1: number, la2: number, lo2: number) {
  const P = Math.PI / 180
  return Math.acos(Math.max(-1, Math.min(1,
    Math.sin(la1*P)*Math.sin(la2*P) +
    Math.cos(la1*P)*Math.cos(la2*P)*Math.cos((lo2-lo1)*P)
  ))) * 180 / Math.PI * 60
}

export type Params = {
  init: number; fix: number; varH: number
  pax: number; range: number
  paxMode: 'min' | 'max'; rangeMode: 'min' | 'max'
  jet: boolean; turbo: boolean; piston: boolean
  rY: boolean; rN: boolean
}

type Modal = 'none' | 'auth' | 'sell' | 'admin' | 'contact' | 'myitems'
type Tab   = 'globe' | 'market' | 'jobs'
type User  = { id: string; name: string; email: string; role: string }

export default function AppShell({ initialListings }: { initialListings: Listing[] }) {
  const isMobile = useIsMobile()
  const [tab,          setTab]          = useState<Tab>('globe')
  const [params,       setParams]       = useState<Params>({
    init: 2500, fix: 5, varH: 1200, pax: 4, range: 1000,
    paxMode: 'min', rangeMode: 'min',
    jet: true, turbo: true, piston: true, rY: true, rN: true,
  })
  const [homeAp,       setHomeAp]       = useState<APEntry | null>(null)
  const [routeDest,    setRouteDest]    = useState<APEntry | null>(null)
  const [selAC,        setSelAC]        = useState<typeof AC[0] | null>(null)
  const [results,      setResults]      = useState<(typeof AC[0] & { sc: number })[]>([])
  const [modal,        setModal]        = useState<Modal>('none')
  const [marketSearch, setMarketSearch] = useState('')
  const [contactListing, setContactListing] = useState<Listing | null>(null)
  const [user,         setUser]         = useState<User | null>(null)
  const [windBR,       setWindBR]       = useState<number[] | null>(null)
  type WindPoint = { lat: number; lon: number; u: number; v: number; spd: number }
  const [windUV,       setWindUV]       = useState<WindPoint[] | null>(null)
  const [showWind,     setShowWind]     = useState(false)
  const [listings,     setListings]     = useState<Listing[]>(initialListings)
  const [legalDoc,     setLegalDoc]     = useState<'tos' | 'privacy' | null>(null)

  const fetchWind = async () => {
    try {
      const r = await fetch(`/api/wind`)
      if (!r.ok) return
      const d = await r.json()
      if (d.error) return
      const pts = d.points as WindPoint[]
      if (!pts || pts.length === 0) return
      // Keep the real per-location grid — do NOT collapse to a single
      // averaged vector, otherwise every point on the globe ends up
      // pointing the same direction (the bug we're fixing here).
      setWindUV(pts); setWindBR(null)
    } catch {}
  }

  // Inverse-distance-weighted sample of the real wind grid at one lat/lon —
  // used for the wind-adjusted range ring, which is local to homeAp.
  const sampleWindAt = (points: WindPoint[], lat: number, lon: number) => {
    let wSum = 0, uSum = 0, vSum = 0
    for (const p of points) {
      const dLat = lat - p.lat
      let dLon = lon - p.lon
      dLon = ((dLon + 540) % 360) - 180
      dLon *= Math.cos((lat + p.lat) * Math.PI / 360)
      const d2 = dLat * dLat + dLon * dLon
      if (d2 < 1e-6) return { u: p.u, v: p.v }
      const w = 1 / (d2 * d2)
      wSum += w; uSum += p.u * w; vSum += p.v * w
    }
    return wSum > 0 ? { u: uSum / wSum, v: vSum / wSum } : { u: 0, v: 0 }
  }

  // Recompute wind-adjusted ring when aircraft, wind, or home airport changes
  useEffect(() => {
    if (!windUV || !selAC || !homeAp) { setWindBR(null); return }
    const { u, v } = sampleWindAt(windUV, homeAp.lat, homeAp.lon)
    const tas = selAC.tas
    const nm  = selAC.range
    const endH = nm / tas
    const br: number[] = []
    for (let i = 0; i < 36; i++) {
      const brg = i * 10 * Math.PI / 180
      const wc  = u * Math.sin(brg) + v * Math.cos(brg)
      br.push(Math.max(30, Math.round(endH * Math.max(30, tas + wc))))
    }
    setWindBR(br)
  }, [selAC, windUV, homeAp])

  const handleFind = useCallback(() => {
    const matches = AC
      .map(a => ({ ...a, sc: scoreAircraft(a, params) }))
      .filter((a): a is typeof a & { sc: number } => a.sc !== null)
      .sort((a, b) => b.sc - a.sc)
    setResults(matches)
    setSelAC(null)
  }, [params])

  const reachable = selAC ? ALL_AIRPORTS.filter(ap => {
    if (!homeAp) return false
    const maxR = windBR ? Math.max(...windBR) : selAC.range
    return gcDist(homeAp.lat, homeAp.lon, ap.la, ap.lo) <= maxR
  }) : []

  const openOffers  = (ac: typeof AC[0]) => { setMarketSearch(ac.name); setTab('market') }
  const openContact = (l: Listing)        => { setContactListing(l); setModal('contact') }

  const refreshListings = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('listings').select('*').eq('status', 'approved')
    if (data) setListings(data as Listing[])
  }

  const handleHomeAP = (code: string) => setHomeAp(lookupAirport(code))

  const handleRoutCalc = (from: string, to: string) => {
    const f = lookupAirport(from)
    const t = lookupAirport(to)
    if (f && t) {
      if (!homeAp) setHomeAp(f)
      setRouteDest(t)
      const nm = Math.round(gcDist(f.lat, f.lon, t.lat, t.lon))
      setParams(p => ({ ...p, range: Math.min(7500, Math.max(100, nm)) }))
    }
    return { from: f, to: t }
  }

  if (isMobile) return (
    <MobileShell
      params={params} setParams={setParams}
      homeAp={homeAp} routeDest={routeDest}
      selAC={selAC} setSelAC={setSelAC}
      results={results}
      marketSearch={marketSearch} setMarketSearch={setMarketSearch}
      contactListing={contactListing} setContactListing={setContactListing}
      user={user} setUser={setUser}
      windBR={windBR} windUV={windUV} showWind={showWind}
      listings={listings}
      onHomeAP={handleHomeAP}
      onRoutCalc={handleRoutCalc}
      onFind={handleFind}
      openOffers={openOffers}
      openContact={openContact}
      onWindToggle={v => { setShowWind(v); if (!v) { setWindBR(null); setWindUV(null) } }}
      onWindFetch={fetchWind}
      refreshListings={refreshListings}
      reachableAirports={reachable}
      allAirports={ALL_AIRPORTS}
    />
  )

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── Globe background (always mounted, hidden when on other tabs) ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, visibility: tab === 'globe' ? 'visible' : 'hidden', pointerEvents: tab === 'globe' ? 'auto' : 'none' }}>
        <GlobeMap
          homeAp={homeAp}
          routeDest={routeDest}
          selACRange={selAC?.range ?? null}
          windBR={windBR}
          windUV={windUV}
          reachableAirports={reachable}
          allAirports={ALL_AIRPORTS}
          showWind={showWind}
          windParticles={[]}
          active={tab === 'globe'}
          onMapLoad={() => {}}
          listingDots={resolveListingDots(listings)}
        />
      </div>

      {/* ── Other tab backgrounds ── */}
      {tab === 'market' && <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7' }} />}
      {tab === 'jobs'   && <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7' }} />}

      {/* ── Top bar ── */}
      <Header
        activeTab={tab}
        onTabChange={setTab}
        user={user}
        onAuthClick={() => setModal('auth')}
        onSellClick={() => setModal(user ? 'sell' : 'auth')}
        onAdminClick={() => setModal('admin')}
        onMyItemsClick={() => setModal(user ? 'myitems' : 'auth')}
      />

      {/* ── Globe UI ── */}
      {tab === 'globe' && (
        <>
          <LeftPanel
            params={params}
            onChange={setParams}
            onHomeAP={handleHomeAP}
            onRoutCalc={handleRoutCalc}
            onFind={handleFind}
            homeAp={homeAp}
            selAC={selAC}
          />
          <RightPanel
            results={results}
            selAC={selAC}
            onSelect={ac => setSelAC(ac === selAC ? null : ac)}
            onOffers={openOffers}
            windBR={windBR}
            homeAp={homeAp}
            wGrid={null}
          />

          {/* Interactive HUD */}
          <HudBar
            homeAp={homeAp}
            selAC={selAC}
            showWind={showWind}
            onWindToggle={v => { setShowWind(v); if (!v) { setWindBR(null); setWindUV(null) } }}
            onWindFetch={fetchWind}
          />
        </>
      )}

      {/* ── ToS / Privacy — desktop fixed bottom-right ── */}
      <div style={{ position: 'fixed', bottom: 16, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, zIndex: 20 }}>
        <button onClick={() => setLegalDoc('tos')}
          style={{ background: 'none', border: 'none', fontSize: 10, color: 'rgba(0,0,0,0.4)', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', padding: 0 }}>
          Terms of Service
        </button>
        <button onClick={() => setLegalDoc('privacy')}
          style={{ background: 'none', border: 'none', fontSize: 10, color: 'rgba(0,0,0,0.4)', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', padding: 0 }}>
          Privacy Policy
        </button>
      </div>

      {/* ── Legal modal ── */}
      {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />}

      {/* ── Market tab ── */}
      {tab === 'market' && (
        <MarketTab
          listings={listings}
          onContact={openContact}
          onSell={() => setModal(user ? 'sell' : 'auth')}
          user={user}
          initialSearch={marketSearch}
          onSearchChange={setMarketSearch}
        />
      )}

      {/* ── Jobs tab ── */}
      {tab === 'jobs' && (
        <JobTab
          user={user}
          onAuthClick={() => setModal('auth')}
        />
      )}

      {/* ── Modals ── */}
      {modal === 'auth' && (
        <AuthModal
          onClose={() => setModal('none')}
          onLogin={(u: User) => { setUser(u); setModal('none') }}
        />
      )}
      {modal === 'sell' && user && (
        <SellModal
          user={user}
          onClose={() => setModal('none')}
          onSuccess={refreshListings}
        />
      )}
      {modal === 'admin' && user?.role === 'admin' && (
        <AdminModal
          userId={user.id}
          onClose={() => setModal('none')}
          onApproved={refreshListings}
        />
      )}
      {modal === 'myitems' && user && (
        <MyItemsModal
          userId={user.id}
          onClose={() => setModal('none')}
          onChanged={refreshListings}
        />
      )}
      {modal === 'contact' && contactListing && (
        <ContactModal
          listing={contactListing}
          user={user}
          onClose={() => setModal('none')}
        />
      )}
    </div>
  )
}
