'use client'
// src/components/mobile/MobileShell.tsx
import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback, useRef } from 'react'
import type { Params } from '@/components/AppShell'
import type { APEntry } from '@/lib/airports'
import { AIRPORTS, lookupAirport } from '@/lib/airports'
import type { Listing } from '@/lib/supabase'
import { AC } from '@/lib/aircraft'
import { createClient } from '@/lib/supabase'
import { authFetch } from '@/lib/authFetch'
import AirportPicker, { type RemoteAirport } from '@/components/ui/AirportPicker'
import MobileFiltersDrawer from './MobileFiltersDrawer'
import MobileResultsSheet from './MobileResultsSheet'
import MobileMarket from './MobileMarket'
import MobileProfile from './MobileProfile'
import type { Job } from '@/components/ui/JobTab'
import AuthModal from '@/components/ui/AuthModal'
import { SellModal, AdminModal, ContactModal, MyItemsModal } from '@/components/listings/Modals'
import MessageModal, { type MessageListing } from '@/components/ui/MessageModal'
import MessagesPanel from '@/components/ui/MessagesPanel'
import MobileFavorites from './MobileFavorites'
import MobileJobsView from './MobileJobsView'

const GlobeMap = dynamic(() => import('@/components/globe/GlobeMap'), { ssr: false })

const _AIRPORT_COORDS: Record<string, { lat: number; lon: number }> = {}
for (const a of AIRPORTS) {
  _AIRPORT_COORDS[a.icao.toUpperCase()] = { lat: a.lat, lon: a.lon }
  if (a.iata) _AIRPORT_COORDS[a.iata.toUpperCase()] = { lat: a.lat, lon: a.lon }
}
// Model name → category, used to color/iconify globe dots (helicopters get their own marker)
const _AC_CATEGORY: Record<string, 'airplane' | 'helicopter' | 'gyrocopter' | 'trike'> = {}
for (const a of AC) _AC_CATEGORY[a.name] = a.category ?? 'airplane'

function resolveListingDots(listings: Listing[]) {
  return listings.flatMap(l => {
    // Coordinates captured once from Supabase when the seller picked their
    // airport at listing time — no re-resolution needed.
    const category = _AC_CATEGORY[l.model ?? ''] ?? 'airplane'
    if (l.lat != null && l.lon != null) {
      return [{ lon: l.lon, lat: l.lat, model: l.model ?? '', price: l.price ?? null, currency: l.currency ?? null, condition: l.condition ?? null, reg: l.reg ?? '', location: l.location ?? '', listingId: l.id, category }]
    }
    if (!l.location) return []
    const tokens = l.location.trim().toUpperCase().split(/[\s—\-,/]+/)
    for (const tok of tokens) {
      if (tok.length >= 3 && tok.length <= 4) {
        // Exact match first, then fuzzy fallback — airports.ts is hand-edited
        // and codes can be renamed/removed, silently dropping pins otherwise.
        const ap = _AIRPORT_COORDS[tok] ?? lookupAirport(tok)
        if (ap) return [{ lon: ap.lon, lat: ap.lat, model: l.model ?? '', price: l.price ?? null, currency: l.currency ?? null, condition: l.condition ?? null, reg: l.reg ?? '', location: l.location ?? '', listingId: l.id, category }]
      }
    }
    const byName = lookupAirport(l.location)
    if (byName) return [{ lon: byName.lon, lat: byName.lat, model: l.model ?? '', price: l.price ?? null, currency: l.currency ?? null, condition: l.condition ?? null, reg: l.reg ?? '', location: l.location ?? '', listingId: l.id, category }]
    return []
  })
}

// Job pins — location always comes from AirportPicker now, lat/lon captured at posting time.
function resolveJobDots(jobs: Job[]) {
  return jobs
    .filter(j => j.lat != null && j.lon != null)
    .map(j => ({
      lon: j.lon as number, lat: j.lat as number,
      model: '', price: null as number | null,
      category: 'job' as const,
      title: j.title, company: j.company, location: j.location, jobId: j.id,
    }))
}

type MobileTab = 'globe' | 'market' | 'jobs' | 'profile'
type Modal = 'none' | 'auth' | 'sell' | 'admin' | 'contact' | 'myitems'
type WindPoint = { lat: number; lon: number; u: number; v: number; spd: number }
type User = { id: string; name: string; email: string; role: string }

export interface MobileShellProps {
  params: Params
  setParams: (p: Params) => void
  homeAp: APEntry | null
  routeDest: APEntry | null
  routeWaypoints?: { lat: number; lon: number; icao: string }[] | null
  onRouteWaypoints?: (wps: { lat: number; lon: number; icao: string }[] | null) => void
  selAC: (typeof AC)[0] | null
  setSelAC: (ac: (typeof AC)[0] | null) => void
  onSelectAC: (ac: (typeof AC)[0] | null) => void
  windLevel: string
  results: ((typeof AC)[0] & { sc: number })[]
  marketSearch: string
  setMarketSearch: (s: string) => void
  contactListing: Listing | null
  setContactListing: (l: Listing | null) => void
  user: User | null
  setUser: (u: User | null) => void
  windBR: number[] | null
  windUV: WindPoint[] | null
  showWind: boolean
  listings: Listing[]
  jobs: Job[]
  onHomeAP: (code: string) => void
  onHomeAirportSelect: (ap: RemoteAirport | null) => void
  onRoutCalc: (from: string, to: string) => { from: APEntry | null; to: APEntry | null }
  onFind: () => void
  openOffers: (ac: (typeof AC)[0]) => void
  openContact: (l: Listing) => void
  onWindToggle: (v: boolean) => void
  onWindFetch: () => void
  refreshListings: () => void
  reachableAirports: { ic: string; la: number; lo: number }[]
  allAirports: { ic: string; la: number; lo: number }[]
}

const ALL_AIRPORTS_EMPTY: { ic: string; la: number; lo: number }[] = []

export default function MobileShell(props: MobileShellProps) {
  const {
    params, setParams, homeAp, routeDest, routeWaypoints, onRouteWaypoints, selAC,
    onSelectAC, windLevel,
    results, contactListing, setContactListing,
    user, setUser, windBR, windUV, showWind,
    listings, jobs, onHomeAP, onHomeAirportSelect, onRoutCalc, onFind, openOffers, openContact,
    onWindToggle, onWindFetch, refreshListings,
    reachableAirports, allAirports,
  } = props

  const [activeTab,      setActiveTab]      = useState<MobileTab>('globe')
  const [modal,          setModal]          = useState<Modal>('none')
  const [filtersOpen,    setFiltersOpen]    = useState(false)
  const [resultsOpen,    setResultsOpen]    = useState(false)
  const [pendingCount,   setPendingCount]   = useState(0)
  const [authMessage,    setAuthMessage]    = useState<string | undefined>(undefined)
  const [messageListing, setMessageListing] = useState<MessageListing | null>(null)
  const [messagesOpen,   setMessagesOpen]   = useState(false)
  const [unreadCount,    setUnreadCount]    = useState(0)
  const [openListingId,  setOpenListingId]  = useState<string | null>(null)
  const [favoriteIds,    setFavoriteIds]    = useState<Set<string>>(new Set())
  const [favoritesOpen,  setFavoritesOpen]  = useState(false)

  const requestAuth = (message?: string) => { setAuthMessage(message); openModal('auth') }
  const handleSeeOffer = (listingId: string) => { setOpenListingId(listingId); setActiveTab('market') }
  const handleSeeJob = () => { setActiveTab('jobs') }

  const [visibleCats, setVisibleCats] = useState<Record<'airplane' | 'helicopter' | 'jobs', boolean>>({ airplane: true, helicopter: true, jobs: true })
  const toggleCat = (k: 'airplane' | 'helicopter' | 'jobs') => setVisibleCats(prev => ({ ...prev, [k]: !prev[k] }))
  const [layersOpen, setLayersOpen] = useState(false)
  const layersRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!layersOpen) return
    const handler = (e: MouseEvent | TouchEvent) => {
      if (layersRef.current && !layersRef.current.contains(e.target as Node)) setLayersOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('touchstart', handler) }
  }, [layersOpen])

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

  // Lock body scroll when any sheet is open
  useEffect(() => {
    const locked = filtersOpen || resultsOpen || modal !== 'none'
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [filtersOpen, resultsOpen, modal])

  // Fetch pending count for admin badge
  useEffect(() => {
    if (user?.role !== 'admin') return
    authFetch('/api/admin').then(r => r.json()).then(d => {
      if (d.listings && d.jobs) setPendingCount(d.listings.length + d.jobs.length)
    }).catch(() => {})
  }, [user])

  const handleFind = () => { onFind(); setFiltersOpen(false); setResultsOpen(true) }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  const openModal = (m: Modal) => { setModal(m); setFiltersOpen(false); setResultsOpen(false) }

  const tabs: { key: MobileTab; label: string; icon: string }[] = [
    { key: 'globe',   label: 'Globe',   icon: '🌍' },
    { key: 'market',  label: 'Market',  icon: '🛒' },
    { key: 'jobs',    label: 'Jobs',    icon: '✈️'  },
    { key: 'profile', label: 'Profile', icon: '🧑‍✈️' },
  ]

  const TAB_H  = 48 + 16 + 12  // bar height + bottom offset + clearance
  const HDR_H  = 36 + 12  // compact header height + top offset

  return (
    <div style={{ position: 'fixed', inset: 0, fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── Compact header ── */}
      <div style={{
        position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)', maxWidth: 420,
        height: HDR_H, zIndex: 100,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        border: '0.5px solid rgba(0,0,0,0.10)',
        borderRadius: 28,
        boxShadow: '0 8px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.035)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
        overflow: 'hidden',
      }}>
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', color: '#1d1d1f' }}>Perfect<span style={{ color: '#0a84ff' }}>Plane</span></span>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => openModal('sell')} title="Free listing"
              style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(10,132,255,0.1)', color: '#0a84ff', fontSize: 18, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, padding: 0 }}>
              <span style={{ transform: 'translateY(-1.5px)' }}>+</span>
            </button>
            <button onClick={() => setFavoritesOpen(true)} title="Favorites"
              style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(118,118,128,0.1)', color: '#4b5563', fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ♡
            </button>
            <button onClick={() => setMessagesOpen(true)} title="Messages"
              style={{ position: 'relative', width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(118,118,128,0.1)', color: '#4b5563', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              💬
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: -2, right: -2,
                  minWidth: 15, height: 15, borderRadius: 8, background: '#ff3b30', color: '#fff',
                  fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 3px', lineHeight: 1, border: '1.5px solid #fff',
                }}>{unreadCount > 9 ? '9+' : unreadCount}</span>
              )}
            </button>
            <button onClick={() => setActiveTab('profile')}
              style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(10,132,255,0.12)', color: '#0a84ff', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {user.name.charAt(0).toUpperCase()}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => requestAuth('Sign in to list your aircraft for free')} title="Free listing"
              style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(10,132,255,0.1)', color: '#0a84ff', fontSize: 18, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, padding: 0 }}>
              <span style={{ transform: 'translateY(-1.5px)' }}>+</span>
            </button>
            <button onClick={() => openModal('auth')}
              style={{ height: 32, padding: '0 14px', borderRadius: 100, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* ── Globe tab — map only ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, visibility: activeTab === 'globe' ? 'visible' : 'hidden', pointerEvents: activeTab === 'globe' ? 'auto' : 'none' }}>
        <GlobeMap
          homeAp={homeAp}
          routeDest={routeDest}
          routeWaypoints={routeWaypoints}
          selACRange={selAC?.range ?? null}
          windBR={windBR}
          windUV={windUV}
          windLevel={windLevel}
          reachableAirports={reachableAirports}
          allAirports={allAirports ?? ALL_AIRPORTS_EMPTY}
          showWind={showWind}
          windParticles={[]}
          active={activeTab === 'globe'}
          onMapLoad={() => {}}
          listingDots={[
            ...resolveListingDots(listings).filter(d => visibleCats[d.category === 'helicopter' ? 'helicopter' : 'airplane']),
            ...(visibleCats.jobs ? resolveJobDots(jobs) : []),
          ]}
          onSeeOffer={handleSeeOffer}
          onSeeJob={handleSeeJob}
        />
      </div>

      {/* ── Globe HUD overlays — rendered outside the map div so position:fixed works correctly ── */}
      {activeTab === 'globe' && (
        <>
          {/* Home airport input — top left under header */}
          <div style={{ position: 'fixed', top: HDR_H + 28, left: '4%', zIndex: 110, width: 260 }}>
            <div style={{ position: 'relative' }}>
              <AirportPicker
                placeholder="Home airport"
                initialLabel={homeAp ? `${homeAp.icao} — ${homeAp.name}` : ''}
                hasValue={!!homeAp}
                onChange={onHomeAirportSelect}
                selectedBackground="rgba(10,132,255,0.18)"
                selectedColor="#0a84ff"
                inputStyle={{
                  width: '100%', height: 38, padding: '0 30px 0 14px',
                  borderRadius: 17, border: 'none',
                  background: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(12px)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  boxSizing: 'border-box',
                }}
              />
              {!homeAp && (
                <span style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: '#34c759', border: '1.5px solid rgba(255,255,255,0.6)', boxShadow: '0 0 6px rgba(52,199,89,0.7)' }} />
              )}
            </div>
          </div>

          {/* Results pill — above filters pill (only when results exist) */}
          {results.length > 0 && (
            <button
              onClick={() => setResultsOpen(true)}
              style={{
                position: 'fixed',
                bottom: TAB_H + 22 + 52 + 10,
                left: '50%', transform: 'translateX(-50%)',
                zIndex: 50,
                height: 40, padding: '0 20px',
                borderRadius: 20, border: 'none',
                background: 'rgba(10,12,18,0.82)',
                backdropFilter: 'blur(20px)',
                color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              <b style={{ color: '#0a84ff' }}>{results.length}</b> matches ▲
            </button>
          )}

          {/* Wind toggle square + Find my perfect plane pill + layer-filter square */}
          <div style={{
            position: 'fixed', bottom: TAB_H + 14, left: '50%', transform: 'translateX(-50%)',
            zIndex: 50, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <button
              onClick={() => { const next = !showWind; onWindToggle(next); if (next) onWindFetch() }}
              title={showWind ? `Wind ON (${windLevel})` : 'Wind OFF'}
              style={{
                position: 'relative', width: 48, height: 48, borderRadius: 14, border: 'none', cursor: 'pointer',
                background: showWind ? 'rgba(52,199,89,0.28)' : 'rgba(255,255,255,0.22)',
                backdropFilter: 'blur(16px) saturate(180%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 6h9a2 2 0 1 0-2-3.2" stroke={showWind ? '#34c759' : '#fff'} strokeWidth="1.6" strokeLinecap="round" fill="none" />
                <path d="M2 10h12a2 2 0 1 1-2 3.2" stroke={showWind ? '#34c759' : '#fff'} strokeWidth="1.6" strokeLinecap="round" fill="none" />
                <path d="M2 14h6" stroke={showWind ? '#34c759' : '#fff'} strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </svg>
              <span style={{
                position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRadius: '50%',
                background: showWind ? '#34c759' : '#ff3b30', transition: 'background 0.2s',
              }} />
            </button>

            <button
              onClick={() => homeAp && setFiltersOpen(true)}
              style={{
                height: 48, padding: '0 24px',
                borderRadius: 24, border: 'none',
                background: homeAp ? '#0a84ff' : 'rgba(10,132,255,0.35)',
                color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                cursor: homeAp ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: 7,
                boxShadow: homeAp ? '0 4px 16px rgba(10,132,255,0.5)' : 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            >
              ✦ Find my perfect plane
            </button>

            {/* Layer filter — square trigger, panel slides up from it */}
            <div ref={layersRef} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%',
                transform: `translateX(-50%) translateY(${layersOpen ? 0 : 14}px)`,
                opacity: layersOpen ? 1 : 0,
                pointerEvents: layersOpen ? 'auto' : 'none',
                transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
                display: 'flex', flexDirection: 'column', gap: 8,
                background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: 16, padding: 8,
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              }}>
                {([
                  ['airplane', '✈', 'Airplanes'],
                  ['helicopter', '🚁', 'Helicopters'],
                  ['jobs', '💼', 'Jobs'],
                ] as [ 'airplane' | 'helicopter' | 'jobs', string, string][]).map(([key, icon, label]) => (
                  <button key={key} onClick={() => toggleCat(key)} title={label}
                    style={{
                      width: 44, height: 44, borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 17,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: visibleCats[key] ? 'rgba(52,199,89,0.2)' : 'rgba(0,0,0,0.05)',
                      opacity: visibleCats[key] ? 1 : 0.4,
                      transition: 'all 0.15s',
                    }}>
                    {icon}
                  </button>
                ))}
              </div>

              <button onClick={() => setLayersOpen(o => !o)} title="Filter map layers"
                style={{
                  width: 48, height: 48, borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: layersOpen ? '#0a84ff' : 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  boxShadow: layersOpen ? '0 4px 16px rgba(10,132,255,0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <line x1="3" y1="6" x2="17" y2="6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="17" y2="10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="3" y1="14" x2="17" y2="14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="7" cy="6" r="1.8" fill="#fff" />
                  <circle cx="13" cy="10" r="1.8" fill="#fff" />
                  <circle cx="9" cy="14" r="1.8" fill="#fff" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Market tab ── */}
      {activeTab === 'market' && (
        <MobileMarket
          listings={listings}
          onContact={(l) => { openContact(l); openModal('contact') }}
          onSell={() => (user ? openModal('sell') : requestAuth())}
          user={user}
          initialSearch={props.marketSearch}
          onAuthRequired={requestAuth}
          onOpenMessage={l => setMessageListing(l)}
          openListingId={openListingId}
          onOpenListingHandled={() => setOpenListingId(null)}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* ── Jobs tab ── */}
      {activeTab === 'jobs' && (
        <MobileJobsView user={user} onAuthClick={() => openModal('auth')} TAB_H={TAB_H} HDR_H={HDR_H} />
      )}

      {/* ── Profile tab ── */}
      {activeTab === 'profile' && (
        <MobileProfile
          user={user}
          onAuthClick={() => openModal('auth')}
          onMyItemsClick={() => (user ? openModal('myitems') : requestAuth())}
          onAdminClick={() => openModal('admin')}
          onSignOut={handleSignOut}
          onMessagesClick={() => setMessagesOpen(true)}
          unreadCount={unreadCount}
        />
      )}

      {/* ── Bottom tab bar — floating pill ── */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(16px + env(safe-area-inset-bottom))',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: 420,
        zIndex: 90,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        border: '0.5px solid rgba(0,0,0,0.10)',
        borderRadius: 28,
        boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)',
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* Sliding white pill indicator */}
        <div style={{
          position: 'absolute',
          top: 3, bottom: 3,
          width: '21%',
          left: `calc(${tabs.findIndex(t => t.key === activeTab) * 25}% + 2%)`,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 20,
          boxShadow: '0 2px 10px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12)',
          transition: 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: 'none',
        }} />

        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              flex: 1, height: 48,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === t.key ? '#0a84ff' : '#a0a0a8',
              transition: 'color 0.2s',
              position: 'relative', zIndex: 1,
            }}
          >
            {/* Admin badge */}
            {t.key === 'profile' && user?.role === 'admin' && pendingCount > 0 && (
              <div style={{ position: 'absolute', top: 8, right: 'calc(50% - 18px)', width: 16, height: 16, borderRadius: '50%', background: '#ff3b30', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pendingCount > 9 ? '9+' : pendingCount}
              </div>
            )}
            <span style={{ fontSize: 22, lineHeight: 1, opacity: activeTab === t.key ? 1 : 0.4, transition: 'opacity 0.2s' }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: activeTab === t.key ? 600 : 400, letterSpacing: '0.01em' }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Drawers ── */}
      <MobileFiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        params={params}
        onChange={setParams}
        onHomeAP={onHomeAP}
        onRoutCalc={onRoutCalc}
        onFind={handleFind}
        homeAp={homeAp}
        selAC={selAC}
        onRouteWaypoints={onRouteWaypoints}
        windLevel={windLevel}
        windLoaded={showWind && !!windUV}
      />

      <MobileResultsSheet
        open={resultsOpen}
        onClose={() => setResultsOpen(false)}
        results={results}
        selAC={selAC}
        onSelect={onSelectAC}
        onOffers={ac => { openOffers(ac); setResultsOpen(false); setActiveTab('market') }}
        windBR={windBR}
      />

      {/* ── Modals ── */}
      {modal === 'auth' && (
        <AuthModal
          message={authMessage}
          onClose={() => { setModal('none'); setAuthMessage(undefined) }}
          onLogin={(u: User) => { setUser(u); setModal('none'); setAuthMessage(undefined) }}
        />
      )}
      {modal === 'sell' && user && (
        <SellModal user={user} onClose={() => setModal('none')} onSuccess={refreshListings} />
      )}
      {modal === 'admin' && user?.role === 'admin' && (
        <AdminModal userId={user.id} onClose={() => setModal('none')} onApproved={refreshListings} />
      )}
      {modal === 'myitems' && user && (
        <MyItemsModal userId={user.id} onClose={() => setModal('none')} onChanged={refreshListings} />
      )}
      {modal === 'contact' && contactListing && (
        <ContactModal listing={contactListing} user={user} onClose={() => { setModal('none'); setContactListing(null) }} />
      )}

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

      {/* ── Favorites ── */}
      {favoritesOpen && user && (
        <MobileFavorites
          listings={listings}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onOpenListing={id => { setFavoritesOpen(false); handleSeeOffer(id) }}
          onClose={() => setFavoritesOpen(false)}
          onBrowseMarket={() => { setFavoritesOpen(false); setActiveTab('market') }}
        />
      )}
    </div>
  )
}
