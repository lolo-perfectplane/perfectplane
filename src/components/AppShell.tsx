'use client'
// src/components/AppShell.tsx
import dynamic from 'next/dynamic'
import { useState, useCallback, useEffect } from 'react'
import { AC, scoreAircraft } from '@/lib/aircraft'
import { AIRPORTS, lookupAirport } from '@/lib/airports'
import type { APEntry } from '@/lib/airports'
import { toAPEntry, type RemoteAirport } from '@/lib/airports-remote'
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
import WelcomeModal from './ui/WelcomeModal'
import MessageModal, { type MessageListing } from './ui/MessageModal'
import MessagesPanel from './ui/MessagesPanel'
import DesktopProfile from './ui/DesktopProfile'
import FavoritesTab from './ui/FavoritesTab'
import { useIsMobile } from '@/hooks/useIsMobile'

// Wind level is auto-selected from the chosen aircraft's cruise category —
// jets sample the FL350 jet stream, turboprops FL180, pistons FL100.
function windLevelForType(type: 'jet' | 'turbo' | 'piston' | undefined): string {
  if (type === 'jet') return 'FL350'
  if (type === 'turbo') return 'FL180'
  if (type === 'piston') return 'FL100'
  return 'FL350'
}

// ── Interactive HUD bar ───────────────────────────────────────
function HudBar({ homeAp, selAC, showWind, windLevel, onWindToggle, onWindFetch }: {
  homeAp: APEntry | null
  selAC: typeof AC[0] | null
  showWind: boolean
  windLevel: string
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
        title={showWind ? `Click to disable winds (${windLevel})` : `Click to enable winds (${windLevel})`}
      >
        <span key={windLevel} style={{ ...hudL, animation: 'fadeIn 0.3s ease' }}>Winds · {windLevel}</span>
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

// Model name → category, used to color/iconify globe dots (helicopters get their own marker)
const AC_CATEGORY: Record<string, 'airplane' | 'helicopter' | 'gyrocopter' | 'trike'> = {}
for (const a of AC) AC_CATEGORY[a.name] = a.category ?? 'airplane'

// Build ICAO and IATA → {lat,lon} lookups for resolving listing locations
const AIRPORT_COORDS: Record<string, { lat: number; lon: number }> = {}
for (const a of AIRPORTS) {
  AIRPORT_COORDS[a.icao.toUpperCase()] = { lat: a.lat, lon: a.lon }
  if (a.iata) AIRPORT_COORDS[a.iata.toUpperCase()] = { lat: a.lat, lon: a.lon }
}

function resolveListingDots(listings: import('@/lib/supabase').Listing[]) {
  const dots = listings.flatMap(l => {
    // Coordinates captured once from Supabase when the seller picked their
    // airport at listing time — no re-resolution needed, and no fragility
    // from parsing the free-text location string.
    const category = AC_CATEGORY[l.model ?? ''] ?? 'airplane'
    if (l.lat != null && l.lon != null) {
      return [{ lon: l.lon, lat: l.lat, model: l.model ?? '', price: l.price ?? null, currency: l.currency ?? null, condition: l.condition ?? null, reg: l.reg ?? '', location: l.location ?? '', listingId: l.id, category }]
    }
    if (!l.location) return []
    const tokens = l.location.trim().toUpperCase().split(/[\s—\-,/]+/)
    for (const tok of tokens) {
      if (tok.length >= 3 && tok.length <= 4) {
        // Exact match first (fast path), then fall back to lookupAirport's
        // fuzzy matching — airports.ts is hand-edited and codes can be
        // renamed/removed, so a strict dictionary lookup silently drops pins.
        const ap = AIRPORT_COORDS[tok] ?? lookupAirport(tok)
        if (ap) return [{ lon: ap.lon, lat: ap.lat, model: l.model ?? '', price: l.price ?? null, currency: l.currency ?? null, condition: l.condition ?? null, reg: l.reg ?? '', location: l.location ?? '', listingId: l.id, category }]
      }
    }
    // Last resort: try resolving the full location string (handles names/formats that don't tokenize cleanly)
    const byName = lookupAirport(l.location)
    if (byName) return [{ lon: byName.lon, lat: byName.lat, model: l.model ?? '', price: l.price ?? null, currency: l.currency ?? null, condition: l.condition ?? null, reg: l.reg ?? '', location: l.location ?? '', listingId: l.id, category }]
    return []
  })
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
type Tab   = 'globe' | 'market' | 'jobs' | 'profile' | 'favorites'
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
  const [windLevel,    setWindLevel]    = useState<string>('FL350')
  const [listings,     setListings]     = useState<Listing[]>(initialListings)
  const [legalDoc,     setLegalDoc]     = useState<'tos' | 'privacy' | null>(null)
  const [showWelcome,  setShowWelcome]  = useState(false)
  const [stops,        setStops]        = useState<0 | 1 | 2 | 3>(0)
  const [routeWaypoints, setRouteWaypoints] = useState<{ lat: number; lon: number; icao: string }[] | null>(null)
  const [authMessage,  setAuthMessage]  = useState<string | undefined>(undefined)
  const [messageListing, setMessageListing] = useState<MessageListing | null>(null)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [unreadCount,  setUnreadCount]  = useState(0)
  const [openListingId, setOpenListingId] = useState<string | null>(null)
  const [favoriteIds,  setFavoriteIds]  = useState<Set<string>>(new Set())

  const requestAuth = (message?: string) => { setAuthMessage(message); setModal('auth') }
  const handleSeeOffer = (listingId: string) => { setOpenListingId(listingId); setTab('market') }

  // Restore the signed-in user from Supabase's persisted session on load —
  // the session itself already survives reloads (localStorage, ~1 week,
  // auto-refreshed), this just rehydrates our own `user` state from it so
  // the UI doesn't show "signed out" while a valid session still exists.
  useEffect(() => {
    const supabase = createClient()

    const hydrateFromSession = async (sessionUser: { id: string; email?: string }) => {
      const { data: prof } = await supabase.from('profiles').select('name, role').eq('id', sessionUser.id).single()
      setUser({
        id: sessionUser.id,
        name: prof?.name ?? sessionUser.email?.split('@')[0] ?? 'User',
        email: sessionUser.email ?? '',
        role: prof?.role ?? 'user',
      })
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) hydrateFromSession(session.user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') { setUser(null); return }
      if (event === 'SIGNED_IN' && session?.user) hydrateFromSession(session.user)
    })
    return () => subscription.unsubscribe()
  }, [])

  const fetchUnread = useCallback(async () => {
    if (!user) { setUnreadCount(0); return }
    const supabase = createClient()
    const { count } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('receiver_id', user.id)
      .eq('read', false)
    setUnreadCount(count ?? 0)
  }, [user])

  useEffect(() => { fetchUnread() }, [fetchUnread])

  const fetchFavorites = useCallback(async () => {
    if (!user) { setFavoriteIds(new Set()); return }
    const supabase = createClient()
    const { data } = await supabase.from('favorites').select('listing_id').eq('user_id', user.id)
    setFavoriteIds(new Set((data ?? []).map(r => r.listing_id as string)))
  }, [user])

  useEffect(() => { fetchFavorites() }, [fetchFavorites])

  const toggleFavorite = async (listingId: string) => {
    if (!user) { requestAuth('Sign in to save favorites'); return }
    const supabase = createClient()
    const isFav = favoriteIds.has(listingId)
    // Optimistic update
    setFavoriteIds(prev => {
      const next = new Set(prev)
      isFav ? next.delete(listingId) : next.add(listingId)
      return next
    })
    if (isFav) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('listing_id', listingId)
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, listing_id: listingId })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('pp_welcomed')) {
      setTimeout(() => setShowWelcome(true), 800)
    }
  }, [])

  const closeWelcome = () => {
    localStorage.setItem('pp_welcomed', '1')
    setShowWelcome(false)
  }

  const fetchWind = async (fl?: string) => {
    const level = fl ?? windLevel
    try {
      const r = await fetch(`/api/wind?fl=${level}`)
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

  // Selecting an aircraft also switches the wind-sampling level to match its
  // cruise altitude band, refetching live if winds are currently shown.
  const handleSelectAC = (ac: typeof AC[0] | null) => {
    const next = ac === selAC ? null : ac
    setSelAC(next)
    if (ac && ac !== selAC) {
      const newLevel = windLevelForType(ac.type)
      setWindLevel(newLevel)
      if (showWind) {
        setWindUV(null)
        setWindBR(null)
        fetchWind(newLevel)
      }
    }
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

  // The server-rendered initialListings snapshot has been observed to lag
  // behind the true approved count on first paint (globe showing some but
  // not all offer dots until any client-side refresh runs). Re-fetch once
  // client-side right after mount as a safety net, the same defensive
  // pattern MarketTab already uses for its own listings.
  useEffect(() => { refreshListings() }, []) // eslint-disable-line

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setTab('globe')
  }

  const handleHomeAP = (code: string) => setHomeAp(lookupAirport(code))
  const handleHomeAirportSelect = (ap: RemoteAirport | null) => setHomeAp(ap ? toAPEntry(ap) : null)

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
    <>
      <MobileShell
        params={params} setParams={setParams}
        homeAp={homeAp} routeDest={routeDest}
        routeWaypoints={routeWaypoints} onRouteWaypoints={setRouteWaypoints}
        selAC={selAC} setSelAC={setSelAC} onSelectAC={handleSelectAC} windLevel={windLevel}
        results={results}
        marketSearch={marketSearch} setMarketSearch={setMarketSearch}
        contactListing={contactListing} setContactListing={setContactListing}
        user={user} setUser={setUser}
        windBR={windBR} windUV={windUV} showWind={showWind}
        listings={listings}
        onHomeAP={handleHomeAP}
        onHomeAirportSelect={handleHomeAirportSelect}
        onRoutCalc={handleRoutCalc}
        onFind={handleFind}
        openOffers={openOffers}
        openContact={openContact}
        onWindToggle={v => { setShowWind(v); if (!v) { setWindBR(null); setWindUV(null) } }}
        onWindFetch={() => fetchWind(windLevel)}
        refreshListings={refreshListings}
        reachableAirports={reachable}
        allAirports={ALL_AIRPORTS}
      />
      {showWelcome && <WelcomeModal onClose={closeWelcome} />}
    </>
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
          windLevel={windLevel}
          reachableAirports={reachable}
          allAirports={ALL_AIRPORTS}
          showWind={showWind}
          windParticles={[]}
          active={tab === 'globe'}
          onMapLoad={() => {}}
          listingDots={resolveListingDots(listings)}
          routeWaypoints={routeWaypoints}
          onSeeOffer={handleSeeOffer}
        />
      </div>

      {/* ── Other tab backgrounds ── */}
      {tab === 'market'  && <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7' }} />}
      {tab === 'jobs'    && <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7' }} />}
      {tab === 'profile'   && <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7' }} />}
      {tab === 'favorites' && <div style={{ position: 'fixed', inset: 0, background: '#f5f5f7' }} />}

      {/* ── Top bar ── */}
      <Header
        activeTab={tab}
        onTabChange={setTab}
        user={user}
        onAuthClick={() => requestAuth()}
        onProfileClick={() => setTab('profile')}
        onSellClick={() => (user ? setModal('sell') : requestAuth())}
        onAdminClick={() => setModal('admin')}
        onFavoritesClick={() => (user ? setTab('favorites') : requestAuth('Sign in to see your favorites'))}
        onMessagesClick={() => setMessagesOpen(true)}
        unreadCount={unreadCount}
      />

      {/* ── Globe UI ── */}
      {tab === 'globe' && (
        <>
          <LeftPanel
            params={params}
            onChange={setParams}
            onHomeAP={handleHomeAP}
            onHomeAirportSelect={handleHomeAirportSelect}
            onRoutCalc={handleRoutCalc}
            onFind={handleFind}
            homeAp={homeAp}
            selAC={selAC}
            onStopsChange={setStops}
            onRouteWaypoints={setRouteWaypoints}
            windLevel={windLevel}
            windLoaded={showWind && !!windUV}
          />
          <RightPanel
            results={results}
            selAC={selAC}
            onSelect={handleSelectAC}
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
            windLevel={windLevel}
            onWindToggle={v => { setShowWind(v); if (!v) { setWindBR(null); setWindUV(null) } }}
            onWindFetch={() => fetchWind(windLevel)}
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
          onSell={() => (user ? setModal('sell') : requestAuth())}
          user={user}
          initialSearch={marketSearch}
          onSearchChange={setMarketSearch}
          onAuthRequired={requestAuth}
          onOpenMessage={l => setMessageListing(l)}
          openListingId={openListingId}
          onOpenListingHandled={() => setOpenListingId(null)}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* ── Favorites tab ── */}
      {tab === 'favorites' && user && (
        <FavoritesTab
          listings={listings}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onOpenListing={handleSeeOffer}
          onBrowseMarket={() => setTab('market')}
        />
      )}

      {/* ── Jobs tab ── */}
      {tab === 'jobs' && (
        <JobTab
          user={user}
          onAuthClick={() => setModal('auth')}
        />
      )}

      {/* ── Profile tab ── */}
      {tab === 'profile' && user && (
        <DesktopProfile
          user={user}
          onMyItemsClick={() => setModal('myitems')}
          onAdminClick={() => setModal('admin')}
          onMessagesClick={() => setMessagesOpen(true)}
          unreadCount={unreadCount}
          onSignOut={handleSignOut}
        />
      )}

      {/* ── Modals ── */}
      {modal === 'auth' && (
        <AuthModal
          message={authMessage}
          onClose={() => { setModal('none'); setAuthMessage(undefined) }}
          onLogin={(u: User) => { setUser(u); setModal('none'); setAuthMessage(undefined) }}
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

      {/* ── First-visit welcome tour ── */}
      {showWelcome && <WelcomeModal onClose={closeWelcome} />}

      {/* ── Messages ── */}
      {messagesOpen && user && (
        <MessagesPanel
          userId={user.id}
          onClose={() => { setMessagesOpen(false); fetchUnread() }}
          onOpenConversation={l => { setMessagesOpen(false); setMessageListing(l) }}
        />
      )}
      {messageListing && user && (
        <MessageModal
          listing={messageListing}
          buyerId={user.id}
          onClose={() => { setMessageListing(null); fetchUnread() }}
        />
      )}
    </div>
  )
}
