'use client'
// src/components/listings/OffersModal.tsx
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Listing } from '@/lib/supabase'
import type { AC } from '@/lib/aircraft'
import { fmtPrice } from '@/lib/currency'

type Props = {
  ac: typeof AC[0]
  communityListings: Listing[]
  onClose: () => void
  onContact: (l: Listing) => void
}

// AI-generated mock listings are always denominated in USD (the prompt
// fixes this) — only the real Supabase community listings carry a currency.
function fmtUSD(n: number | null) { return n == null ? 'On enquiry' : n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${Math.round(n/1000)}K` }

function tapURL(name: string) {
  const c = name.replace(/[()]/g,'').replace(/\s+/g,' ').trim()
  return `https://www.trade-a-plane.com/filtered/search?s-type=aircraft&s-keyword-search=${c.split(' ').join('+')}&s-original-search=${encodeURIComponent(c)}`
}
function ctlURL(name: string) {
  const c = name.replace(/[()]/g,'').replace(/\s+/g,' ').trim()
  return `https://www.controller.com/search/aircraft-for-sale/all-makes-and-models/all-models?keyword=${encodeURIComponent(c)}`
}

const overlayStyle = { position: 'fixed' as const, inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.82)', backdropFilter: 'blur(8px)' }
const panelStyle = { background: 'rgba(4,10,22,.93)', border: '1px solid rgba(26,107,255,.2)', borderRadius: 2, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden', width: 'min(740px,93vw)', maxHeight: '88vh' }

export function OffersModal({ ac, communityListings, onClose, onContact }: Props) {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const tap = tapURL(ac.name), ctl = ctlURL(ac.name)

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('')
      try {
        const prompt = `Generate a JSON array of 6 realistic pre-owned ${ac.name} (${ac.type}, approx $${ac.initK}K new) listings. Return ONLY the raw JSON array starting with [ and ending with ]. No markdown. Format: [{"year":2018,"reg":"N234AB","hours":1450,"price_usd":480000,"location":"Dallas TX","condition":"Excellent","available":true,"equip":"Garmin G1000 NXi, ADS-B Out","seller":"Lone Star Aviation"}]`
        const r = await fetch('/api/ai-listings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        })
        const d = await r.json()
        if (d.error) throw new Error(d.error)
        const text = (d.text || '').trim().replace(/^```[\w]*\n?/,'').replace(/\n?```$/,'').trim()
        const s = text.indexOf('['), e = text.lastIndexOf(']')
        if (s < 0 || e < 0) throw new Error('No JSON in response')
        setListings(JSON.parse(text.slice(s, e+1)))
      } catch(e: any) { setError(e.message) }
      setLoading(false)
    }
    load()
  }, [ac.name])

  const prices = listings.map(l => l.price_usd).filter(Boolean)
  const avg = prices.length ? prices.reduce((a,b) => a+b, 0)/prices.length : 0

  return (
    <div style={overlayStyle} onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div style={panelStyle}>
        <div style={{ padding: '12px 16px 9px', borderBottom: '1px solid rgba(26,107,255,.2)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.84rem', color: '#fff', letterSpacing: '.08em' }}>{ac.name}</div>
            <div style={{ fontSize: '.76rem', color: '#4a6fa8', marginTop: 2 }}>Market overview &amp; listings</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(26,107,255,.2)', color: '#4a6fa8', fontFamily: 'var(--font-orbitron)', fontSize: '.56rem', letterSpacing: '.11em', padding: '4px 10px', cursor: 'pointer', borderRadius: 1, marginLeft: 9 }}>✕ Close</button>
        </div>

        <div className="panel-scroll" style={{ flex: 1, overflowY: 'auto', padding: '13px 16px' }}>
          {/* Community listings */}
          {communityListings.length > 0 && (
            <div style={{ marginBottom: 13 }}>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.56rem', letterSpacing: '.16em', color: '#39ff8f', textTransform: 'uppercase', marginBottom: 7, paddingBottom: 4, borderBottom: '1px solid rgba(57,255,143,.18)' }}>
                🟢 Community Listings ({communityListings.length} available)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 9 }}>
                {communityListings.map(l => {
                  const cover = l.photos && l.photos.length > 0 ? l.photos[0] : null
                  return (
                    <div key={l.id} style={{ background: 'rgba(57,255,143,.03)', border: '1px solid rgba(57,255,143,.16)', borderRadius: 2, overflow: 'hidden' }}>
                      {cover && (
                        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                          <Image src={cover} alt={l.model} fill sizes="220px" style={{ objectFit: 'cover' }} />
                        </div>
                      )}
                      <div style={{ padding: 10 }}>
                        <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.72rem', color: '#fff', marginBottom: 4 }}>{l.year} {l.model}</div>
                        <div style={{ fontSize: '.70rem', color: '#4a6fa8' }}>{l.reg} · {l.hours.toLocaleString()} h</div>
                        <div style={{ fontSize: '.70rem', color: '#4a6fa8' }}>{l.location}</div>
                        <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.76rem', color: '#ffb800', marginTop: 4 }}>{fmtPrice(l.price, l.currency)}</div>
                        <div style={{ fontSize: '.66rem', color: '#4a6fa8', marginTop: 2 }}>{l.seller_name}</div>
                        {l.photos && l.photos.length > 1 && (
                          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                            {(l.photos as string[]).slice(1).map((p, i) => p && (
                              <div key={i} style={{ position: 'relative', width: 44, height: 33, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(57,255,143,.2)' }}>
                                <Image src={p} alt="" fill sizes="44px" style={{ objectFit: 'cover' }} />
                              </div>
                            ))}
                          </div>
                        )}
                        <button onClick={() => onContact(l)} style={{ display: 'block', width: '100%', marginTop: 8, padding: '6px 0', background: 'rgba(57,255,143,.08)', border: '1px solid rgba(57,255,143,.26)', color: '#39ff8f', fontFamily: 'var(--font-orbitron)', fontSize: '.48rem', letterSpacing: '.12em', cursor: 'pointer', borderRadius: 1 }}>
                          📩 Contact Seller
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Stats */}
          {!loading && listings.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 11, paddingBottom: 9, borderBottom: '1px solid rgba(26,107,255,.2)' }}>
              {[
                { label: 'AVG PRICE', value: fmtUSD(avg), color: '#ffb800' },
                { label: 'RANGE', value: `${fmtUSD(Math.min(...prices))} – ${fmtUSD(Math.max(...prices))}`, color: '#c8deff' },
                { label: 'AVAILABLE', value: `${listings.filter(l=>l.available).length}/${listings.length}`, color: '#39ff8f' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.56rem', letterSpacing: '.12em', color: '#4a6fa8', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.86rem', color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Marketplace links */}
          <div style={{ display: 'flex', gap: 7, marginBottom: 11 }}>
            <a href={tap} target="_blank" rel="noopener" style={{ flex: 1, display: 'block', padding: '7px 8px', background: 'rgba(255,0,0,.04)', border: '1px solid rgba(255,80,80,.2)', borderRadius: 2, textDecoration: 'none' }}>
              <div style={{ fontSize: '.76rem', color: '#c8deff', fontWeight: 500 }}>🔴 Trade-A-Plane</div>
              <div style={{ fontSize: '.86rem', color: '#4a6fa8', marginTop: 1 }}>Live listings</div>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.72rem', color: '#ffb800', marginTop: 2 }}>→ trade-a-plane.com</div>
            </a>
            <a href={ctl} target="_blank" rel="noopener" style={{ flex: 1, display: 'block', padding: '7px 8px', background: 'rgba(0,207,255,.03)', border: '1px solid rgba(0,207,255,.16)', borderRadius: 2, textDecoration: 'none' }}>
              <div style={{ fontSize: '.76rem', color: '#c8deff', fontWeight: 500 }}>🔵 Controller.com</div>
              <div style={{ fontSize: '.86rem', color: '#4a6fa8', marginTop: 1 }}>Live listings</div>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.72rem', color: '#ffb800', marginTop: 2 }}>→ controller.com</div>
            </a>
          </div>

          {/* AI listings */}
          {loading && <div style={{ textAlign: 'center', padding: '26px 0', color: '#4a6fa8', fontSize: '.88rem' }}><div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.76rem', color: '#1a6bff', marginBottom: 7, animation: 'blink 1s infinite', letterSpacing: '.14em' }}>LOADING LISTINGS</div>Please wait...</div>}
          {error && <div style={{ color: '#ff7070', marginBottom: 9, fontSize: '.80rem' }}><strong>Could not load AI listings:</strong> {error}</div>}
          {!loading && listings.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 9 }}>
              {listings.map((l, i) => (
                <div key={i} onClick={() => window.open(tap, '_blank')}
                  style={{ background: 'rgba(26,107,255,.03)', border: '1px solid rgba(26,107,255,.2)', borderRadius: 2, padding: 9, cursor: 'pointer' }}>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.66rem', color: '#fff', marginBottom: 4 }}>{l.year} {ac.name}</div>
                  <div style={{ fontSize: '.70rem', color: '#4a6fa8' }}>{l.reg} · {l.hours?.toLocaleString()} h</div>
                  <div style={{ fontSize: '.70rem', color: '#4a6fa8' }}>{l.location}</div>
                  <div style={{ fontSize: '.70rem', color: '#4a6fa8' }}>{l.condition}</div>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '.76rem', color: '#ffb800', marginTop: 4 }}>{fmtUSD(l.price_usd)}</div>
                  <span style={{ display: 'inline-block', fontSize: '.60rem', padding: '2px 5px', borderRadius: 1, textTransform: 'uppercase', fontWeight: 600, marginTop: 3, background: l.available ? 'rgba(57,255,143,.1)' : 'rgba(255,100,100,.07)', color: l.available ? '#39ff8f' : '#ff7070', border: l.available ? '1px solid rgba(57,255,143,.2)' : '1px solid rgba(255,100,100,.15)' }}>
                    {l.available ? 'Available' : 'Under Contract'}
                  </span>
                  <div style={{ marginTop: 4, fontSize: '.86rem', color: '#4a6fa8' }}>{l.equip}</div>
                  <div style={{ marginTop: 4, fontSize: '.84rem', color: '#00cfff' }}>→ View on Trade-A-Plane</div>
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: '.72rem', color: '#4a6fa8', marginTop: 9, textAlign: 'center', lineHeight: 1.6 }}>
            AI-generated illustration ·{' '}
            <a href={tap} target="_blank" rel="noopener" style={{ color: '#1a6bff' }}>Trade-A-Plane</a> ·{' '}
            <a href={ctl} target="_blank" rel="noopener" style={{ color: '#1a6bff' }}>Controller.com</a> ·{' '}
            <a href="https://www.avbuyer.com" target="_blank" rel="noopener" style={{ color: '#1a6bff' }}>AvBuyer.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
