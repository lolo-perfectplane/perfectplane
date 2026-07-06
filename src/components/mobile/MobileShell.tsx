'use client'
// src/components/mobile/MobileShell.tsx
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import type { Params } from '@/components/AppShell'
import type { APEntry } from '@/lib/airports'
import { AIRPORTS } from '@/lib/airports'
import type { Listing } from '@/lib/supabase'
import type { AC } from '@/lib/aircraft'
import { createClient } from '@/lib/supabase'
import MobileFiltersDrawer from './MobileFiltersDrawer'
import MobileResultsSheet from './MobileResultsSheet'
import MobileMarket from './MobileMarket'
import MobileProfile from './MobileProfile'
import AuthModal from '@/components/ui/AuthModal'
import { SellModal, AdminModal, ContactModal, MyItemsModal } from '@/components/listings/Modals'
import MobileJobsView from './MobileJobsView'

const GlobeMap = dynamic(() => import('@/components/globe/GlobeMap'), { ssr: false })

const _AIRPORT_COORDS: Record<string, { lat: number; lon: number }> = {}
for (const a of AIRPORTS) {
  _AIRPORT_COORDS[a.icao.toUpperCase()] = { lat: a.lat, lon: a.lon }
  if (a.iata) _AIRPORT_COORDS[a.iata.toUpperCase()] = { lat: a.lat, lon: a.lon }
}
function resolveListingDots(listings: Listing[]) {
  return listings.flatMap(l => {
    if (!l.location) return []
    const tokens = l.location.trim().toUpperCase().split(/[\s—\-,/]+/)
    for (const tok of tokens) {
      if (tok.length >= 3 && tok.length <= 4) {
        const ap = _AIRPORT_COORDS[tok]
        if (ap) return [{ lon: ap.lon, lat: ap.lat, model: l.model ?? '', price: l.price ?? null }]
      }
    }
    return []
  })
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
  selAC: (typeof AC)[0] | null
  setSelAC: (ac: (typeof AC)[0] | null) => void
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
  onHomeAP: (code: string) => void
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
    params, setParams, homeAp, routeDest, selAC, setSelAC,
    results, contactListing, setContactListing,
    user, setUser, windBR, windUV, showWind,
    listings, onHomeAP, onRoutCalc, onFind, openOffers, openContact,
    onWindToggle, onWindFetch, refreshListings,
    reachableAirports, allAirports,
  } = props

  const [activeTab,      setActiveTab]      = useState<MobileTab>('globe')
  const [modal,          setModal]          = useState<Modal>('none')
  const [filtersOpen,    setFiltersOpen]    = useState(false)
  const [resultsOpen,    setResultsOpen]    = useState(false)
  const [pendingCount,   setPendingCount]   = useState(0)
  const [apVal,          setApVal]          = useState('')

  // Lock body scroll when any sheet is open
  useEffect(() => {
    const locked = filtersOpen || resultsOpen || modal !== 'none'
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [filtersOpen, resultsOpen, modal])

  // Fetch pending count for admin badge
  useEffect(() => {
    if (user?.role !== 'admin') return
    fetch('/api/admin').then(r => r.json()).then(d => {
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
          <button onClick={() => setActiveTab('profile')}
            style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(10,132,255,0.12)', color: '#0a84ff', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {user.name.charAt(0).toUpperCase()}
          </button>
        ) : (
          <button onClick={() => openModal('auth')}
            style={{ height: 32, padding: '0 14px', borderRadius: 100, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
            Sign In
          </button>
        )}
      </div>

      {/* ── Globe tab — map only ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, visibility: activeTab === 'globe' ? 'visible' : 'hidden', pointerEvents: activeTab === 'globe' ? 'auto' : 'none' }}>
        <GlobeMap
          homeAp={homeAp}
          routeDest={routeDest}
          selACRange={selAC?.range ?? null}
          windBR={windBR}
          windUV={windUV}
          reachableAirports={reachableAirports}
          allAirports={allAirports ?? ALL_AIRPORTS_EMPTY}
          showWind={showWind}
          windParticles={[]}
          active={activeTab === 'globe'}
          onMapLoad={() => {}}
          listingDots={resolveListingDots(listings)}
        />
      </div>

      {/* ── Globe HUD overlays — rendered outside the map div so position:fixed works correctly ── */}
      {activeTab === 'globe' && (
        <>
          {/* Home airport input — top left under header */}
          <div style={{ position: 'fixed', top: HDR_H + 28, left: '4%', zIndex: 110 }}>
            <div style={{ position: 'relative' }}>
              <input
                value={apVal}
                placeholder="Home airport"
                maxLength={20}
                onChange={e => {
                  const v = e.target.value.toUpperCase()
                  setApVal(v)
                  if (v.length >= 3) onHomeAP(v)
                }}
                style={{
                  width: 180, height: 38, padding: '0 14px',
                  borderRadius: 17, border: 'none',
                  background: homeAp ? 'rgba(10,132,255,0.18)' : 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(12px)',
                  color: homeAp ? '#0a84ff' : 'rgba(255,255,255,0.85)',
                  fontSize: 16, fontWeight: 600, fontFamily: 'inherit',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
              {!homeAp && (
                <span style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: '#34c759', border: '1.5px solid rgba(255,255,255,0.6)', boxShadow: '0 0 6px rgba(52,199,89,0.7)' }} />
              )}
            </div>
          </div>

          {/* Wind toggle — top right under header */}
          <button
            onClick={() => { const next = !showWind; onWindToggle(next); if (next) onWindFetch() }}
            style={{
              position: 'fixed', top: HDR_H + 28, right: '4%', zIndex: 110,
              height: 34, padding: '0 14px',
              borderRadius: 17, border: 'none',
              background: showWind ? 'rgba(52,199,89,0.22)' : 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(16px) saturate(180%)',
              color: showWind ? '#34c759' : '#ffffff',
              fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: showWind ? '#34c759' : '#ff3b30', display: 'inline-block', transition: 'background 0.2s' }} />
            Winds
          </button>

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

          {/* Find my perfect plane pill */}
          <button
            onClick={() => homeAp && setFiltersOpen(true)}
            style={{
              position: 'fixed',
              bottom: TAB_H + 14,
              left: '50%', transform: 'translateX(-50%)',
              zIndex: 50,
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
        </>
      )}

      {/* ── Market tab ── */}
      {activeTab === 'market' && (
        <MobileMarket
          listings={listings}
          onContact={(l) => { openContact(l); openModal('contact') }}
          onSell={() => openModal(user ? 'sell' : 'auth')}
          user={user}
          initialSearch={props.marketSearch}
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
          onMyItemsClick={() => openModal(user ? 'myitems' : 'auth')}
          onAdminClick={() => openModal('admin')}
          onSignOut={handleSignOut}
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
      />

      <MobileResultsSheet
        open={resultsOpen}
        onClose={() => setResultsOpen(false)}
        results={results}
        selAC={selAC}
        onSelect={ac => setSelAC(ac === selAC ? null : ac)}
        onOffers={ac => { openOffers(ac); setResultsOpen(false); setActiveTab('market') }}
        windBR={windBR}
      />

      {/* ── Modals ── */}
      {modal === 'auth' && (
        <AuthModal
          onClose={() => setModal('none')}
          onLogin={(u: User) => { setUser(u); setModal('none') }}
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
    </div>
  )
}
