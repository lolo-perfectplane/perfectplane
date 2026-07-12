'use client'
// src/components/listings/Modals.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { AC } from '@/lib/aircraft'
import type { RemoteAirport } from '@/lib/airports-remote'
import AirportPicker from '@/components/ui/AirportPicker'
import { createClient } from '@/lib/supabase'
import type { Listing } from '@/lib/supabase'
import { authFetch } from '@/lib/authFetch'
import { CURRENCIES, fmtPrice } from '@/lib/currency'

type User = { id: string; name: string; email: string; role: string }

// ── Shared Apple-style tokens ──────────────────────────────────
const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 200,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
}
const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(40px) saturate(180%)',
  border: '0.5px solid rgba(0,0,0,0.08)',
  borderRadius: 20,
  boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
  fontFamily: "'Inter', -apple-system, sans-serif",
  color: '#1d1d1f',
  display: 'flex', flexDirection: 'column', overflow: 'hidden',
}
const inp: React.CSSProperties = {
  width: '100%', height: 40,
  background: 'rgba(118,118,128,0.08)', border: 'none',
  borderRadius: 10, fontFamily: 'inherit', fontSize: 16,
  fontWeight: 500, padding: '0 12px', color: '#1d1d1f', boxSizing: 'border-box',
}
const lbl: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#86868b',
  textTransform: 'uppercase', letterSpacing: '0.04em',
  marginBottom: 5, display: 'block',
}
const fg: React.CSSProperties = { marginBottom: 12 }
const modalHeader: React.CSSProperties = {
  padding: '20px 22px 14px',
  borderBottom: '0.5px solid rgba(0,0,0,0.06)',
  display: 'flex', alignItems: 'center',
  justifyContent: 'space-between', flexShrink: 0,
}
const closeBtn: React.CSSProperties = {
  width: 28, height: 28, borderRadius: '50%', border: 'none',
  background: 'rgba(118,118,128,0.15)', color: '#86868b',
  cursor: 'pointer', fontSize: 13,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
const primaryBtn: React.CSSProperties = {
  width: '100%', height: 50, background: '#0a84ff', border: 'none',
  borderRadius: 14, color: '#fff', fontFamily: 'inherit',
  fontSize: 16, fontWeight: 600, cursor: 'pointer',
  boxShadow: '0 4px 14px rgba(10,132,255,0.35)', marginTop: 4,
}

// ── SellModal ─────────────────────────────────────────────────
type SellProps = { user: User; onClose: () => void; onSuccess: () => void }

// Default to a common single-engine model so the form doesn't show
// Engine 2 / Prop 2 fields before the user has picked their aircraft.
const DEFAULT_MODEL = AC.find(a => a.engines === 1)?.name ?? AC[0].name

export function SellModal({ user, onClose, onSuccess }: SellProps) {
  const [model,           setModel]          = useState(DEFAULT_MODEL)
  const [modelQuery,      setModelQuery]      = useState(DEFAULT_MODEL)
  const [modelOpen,       setModelOpen]       = useState(false)
  const [year,            setYear]            = useState('')
  const [reg,             setReg]             = useState('')
  const [hours,           setHours]           = useState('')
  const [price,           setPrice]           = useState('')
  const [currency,        setCurrency]        = useState<typeof CURRENCIES[number]>('USD')
  const [loc,             setLoc]             = useState<RemoteAirport | null>(null)
  const [equip,           setEquip]           = useState('')
  const [cond,            setCond]            = useState('Excellent')
  const [ifr,             setIfr]             = useState(false)
  const [priceOnEnquiry,  setPriceOnEnquiry]  = useState(false)
  const [interiorNotes,   setInteriorNotes]   = useState('')
  const [exteriorNotes,   setExteriorNotes]   = useState('')
  const [showInterior,    setShowInterior]    = useState(false)
  const [showExterior,    setShowExterior]    = useState(false)
  const [contact,         setContact]         = useState(user.email)
  const [contactPref,     setContactPref]     = useState<'email' | 'message'>('email')
  const [photos,          setPhotos]          = useState<string[]>([])
  const [certReq,         setCertReq]         = useState(false)
  const [msg,             setMsg]             = useState<{ text: string; ok: boolean } | null>(null)
  const [loading,         setLoading]         = useState(false)
  const [engineTimes,     setEngineTimes]     = useState(['', '', '', ''])
  const [propTimes,       setPropTimes]       = useState(['', '', '', ''])
  const [timeBasis,       setTimeBasis]       = useState<'since_check' | 'to_next_check'>('since_check')
  const [description,     setDescription]     = useState('')
  const [airframeNotes,   setAirframeNotes]   = useState('')
  const [engineNotes,     setEngineNotes]     = useState('')
  const [showEquip,       setShowEquip]       = useState(false)
  const [showDesc,        setShowDesc]        = useState(false)
  const [showAirframe,    setShowAirframe]    = useState(false)
  const [showEngineNotes, setShowEngineNotes] = useState(false)
  const modelRef = useRef<HTMLDivElement>(null)

  const selectedAC    = useMemo(() => AC.find(a => a.name === model), [model])
  const engineCount   = selectedAC?.engines ?? 1
  const hasProp       = selectedAC?.type !== 'jet'
  const filteredModels = useMemo(() => {
    const q = modelQuery.toLowerCase()
    return q ? AC.filter(a => a.name.toLowerCase().includes(q)) : AC
  }, [modelQuery])

  useEffect(() => {
    const h = (e: MouseEvent) => { if (modelRef.current && !modelRef.current.contains(e.target as Node)) setModelOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  const selectModel = (name: string) => { setModel(name); setModelQuery(name); setModelOpen(false) }

  const submit = async () => {
    if (!model || !year || !reg || !hours || !loc?.icao || (!priceOnEnquiry && !price)) {
      setMsg({ text: 'Please fill all required fields.', ok: false }); return
    }
    setLoading(true); setMsg(null)
    try {
      const r = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model, year: +year, reg: reg.toUpperCase(), hours: +hours,
          price: priceOnEnquiry ? null : +price,
          currency,
          priceOnEnquiry,
          location: `${loc.icao} — ${loc.name}`,
          lat: loc.lat, lon: loc.lon,
          equip: showEquip ? equip : null,
          condition: cond,
          ifr,
          contact_pref: contactPref,
          contactEmail: contact, sellerId: user.id,
          sellerName: user.name, sellerEmail: user.email,
          photos: photos.filter(Boolean),
          certificationRequested: certReq,
          engineTimes: engineTimes.slice(0, engineCount).map(t => t ? +t : null),
          propTimes: hasProp ? propTimes.slice(0, engineCount).map(t => t ? +t : null) : null,
          timeBasis,
          description:    showDesc        ? description    : null,
          airframeNotes:  showAirframe    ? airframeNotes  : null,
          engineNotes:    showEngineNotes ? engineNotes    : null,
          interiorNotes:  showInterior    ? interiorNotes  : null,
          exteriorNotes:  showExterior    ? exteriorNotes  : null,
        }),
      })
      const d = await r.json()
      if (d.error) { setMsg({ text: d.error, ok: false }); return }
      onSuccess()
      onClose()
    } catch {
      setMsg({ text: 'Network error — please try again.', ok: false })
    } finally {
      setLoading(false)
    }
  }

    const selStyle: React.CSSProperties = { ...inp, cursor: 'pointer', appearance: 'none' as any }
  const taStyle: React.CSSProperties = {
    ...inp, height: 'auto', minHeight: 80, padding: '10px 12px', resize: 'vertical' as const, lineHeight: 1.5,
  }

  const cols = Math.min(engineCount, 2)
  const timeSuffix = timeBasis === 'since_check' ? '(hrs since check)' : '(hrs to next check)'
  const engineLabels = engineCount === 1
    ? [`Engine Time ${timeSuffix}`]
    : Array.from({ length: engineCount }, (_, i) => `Engine ${i + 1} Time ${timeSuffix}`)
  const propLabels = engineCount === 1
    ? [`Prop Time ${timeSuffix}`]
    : Array.from({ length: engineCount }, (_, i) => `Prop ${i + 1} Time ${timeSuffix}`)

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...card, width: 'min(520px, 95vw)', maxHeight: '92vh' }}>
        <div style={modalHeader}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>List your aircraft</div>
            <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>Submit for community review</div>
          </div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 22px' }}>

          {/* Model — searchable combobox */}
          <div style={fg} ref={modelRef}>
            <label style={lbl}>Aircraft model</label>
            <div style={{ position: 'relative' }}>
              <input
                style={{ ...inp, paddingRight: 28 }}
                value={modelQuery}
                onChange={e => { setModelQuery(e.target.value); setModelOpen(true) }}
                onFocus={() => { setModelQuery(''); setModelOpen(true) }}
                onBlur={() => { setTimeout(() => { setModelQuery(model); setModelOpen(false) }, 150) }}
                placeholder="Type to search…"
                autoComplete="off"
              />
              <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: '#aeaeb2', pointerEvents: 'none' }}>▼</span>
              {modelOpen && filteredModels.length > 0 && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 600,
                  background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
                  border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.14)', overflow: 'hidden',
                  maxHeight: 220, overflowY: 'auto',
                }}>
                  {filteredModels.map(a => (
                    <div key={a.name} onMouseDown={() => selectModel(a.name)}
                      style={{ padding: '8px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,132,255,0.07)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontSize: 13, color: '#1d1d1f' }}>{a.name}</span>
                      <span style={{ fontSize: 11, color: '#86868b', marginLeft: 10, flexShrink: 0 }}>
                        {a.type === 'jet' ? 'Jet' : a.type === 'turbo' ? 'Turboprop' : 'Piston'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Year + Reg */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Year</label>
              <input style={inp} type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="2018" />
            </div>
            <div>
              <label style={lbl}>Registration</label>
              <input style={inp} type="text" value={reg} onChange={e => setReg(e.target.value.toUpperCase())} placeholder="N12345" />
            </div>
          </div>

          {/* Total Time + Price */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <label style={lbl}>Total airframe time (hrs)</label>
              <input style={inp} type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="1250" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <label style={lbl}>Asking price</label>
              {priceOnEnquiry
                ? <div style={{ ...inp, display: 'flex', alignItems: 'center', color: '#86868b', fontWeight: 500 }}>On enquiry</div>
                : (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <select value={currency} onChange={e => setCurrency(e.target.value as typeof CURRENCIES[number])}
                      style={{ ...inp, width: 78, flexShrink: 0, cursor: 'pointer', appearance: 'none' as any, textAlign: 'center', padding: '0 4px' }}>
                      {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input style={inp} type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="450000" />
                  </div>
                )
              }
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, cursor: 'pointer' }}>
                <input type="checkbox" checked={priceOnEnquiry} onChange={e => setPriceOnEnquiry(e.target.checked)}
                  style={{ width: 14, height: 14, accentColor: '#0a84ff' }} />
                <span style={{ fontSize: 12, color: '#86868b' }}>Price on enquiry</span>
              </label>
            </div>
          </div>

          {/* Engine/prop time basis */}
          <div style={{ marginBottom: 10 }}>
            <label style={lbl}>Engine &amp; prop time entered as</label>
            <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 10, padding: 2, gap: 2 }}>
              {([
                ['since_check', 'Time since last check'],
                ['to_next_check', 'Remaining to next check'],
              ] as const).map(([val, label]) => (
                <div key={val} onClick={() => setTimeBasis(val)} style={{
                  flex: 1, textAlign: 'center', padding: '9px 4px', borderRadius: 8, cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
                  background: timeBasis === val ? '#fff' : 'transparent',
                  color: timeBasis === val ? '#1d1d1f' : '#86868b',
                  boxShadow: timeBasis === val ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                }}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Engine times */}
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Engine time{engineCount > 1 ? 's' : ''}</label>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
              {engineLabels.map((label, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, color: '#aeaeb2', marginBottom: 4 }}>{label}</div>
                  <input style={inp} type="number" placeholder="—"
                    value={engineTimes[i]}
                    onChange={e => { const v = [...engineTimes]; v[i] = e.target.value; setEngineTimes(v) }} />
                </div>
              ))}
            </div>
          </div>

          {/* Prop times (piston & turbo only) */}
          {hasProp && (
            <div style={{ marginBottom: 12 }}>
              <label style={lbl}>Propeller time{engineCount > 1 ? 's' : ''}</label>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
                {propLabels.map((label, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 11, color: '#aeaeb2', marginBottom: 4 }}>{label}</div>
                    <input style={inp} type="number" placeholder="—"
                      value={propTimes[i]}
                      onChange={e => { const v = [...propTimes]; v[i] = e.target.value; setPropTimes(v) }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <div style={fg}>
            <label style={lbl}>Location (airport)</label>
            <AirportPicker
              initialLabel={loc ? `${loc.icao} — ${loc.name}` : ''}
              hasValue={!!loc}
              onChange={setLoc}
            />
          </div>

          {/* Condition + Email */}
          <div style={{ display: 'grid', gridTemplateColumns: contactPref === 'message' ? '1fr' : '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div>
              <label style={lbl}>Condition</label>
              <select value={cond} onChange={e => setCond(e.target.value)} style={selStyle}>
                {['Excellent','Very Good','Good','Fair'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            {contactPref === 'email' && (
              <div>
                <label style={lbl}>Contact email</label>
                <input style={inp} type="email" value={contact} onChange={e => setContact(e.target.value)} />
              </div>
            )}
          </div>

          {/* Contact preference */}
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Buyers can contact you via</label>
            <div style={{ display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 10, padding: 2, gap: 2 }}>
              {(['email', 'message'] as const).map(p => (
                <div key={p} onClick={() => setContactPref(p)} style={{
                  flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 8, cursor: 'pointer',
                  fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                  background: contactPref === p ? '#fff' : 'transparent',
                  color: contactPref === p ? '#1d1d1f' : '#86868b',
                  boxShadow: contactPref === p ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                }}>
                  {p === 'email' ? '✉ Email' : '💬 Direct message'}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#86868b', marginTop: 6 }}>
              {contactPref === 'email'
                ? 'Your email address will be shared with interested buyers'
                : 'Buyers contact you through PerfectPlane — your email stays private'}
            </div>
          </div>

          {/* IFR certified */}
          <div style={{ marginBottom: 16, padding: '12px 14px', borderRadius: 12, background: 'rgba(118,118,128,0.06)', border: '0.5px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <span style={{ fontSize: 14, color: '#1d1d1f' }}>IFR Certified</span>
              <div className={`pp-switch${ifr ? ' on' : ''}`} onClick={() => setIfr(v => !v)} style={{ flexShrink: 0 }}>
                <div className="pp-switch-knob" />
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#86868b', marginTop: 4 }}>
              Check if this aircraft has a valid IFR rating and up-to-date avionics
            </div>
          </div>

          {/* ── Optional text sections ─────────────────────── */}
          <div style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)', paddingTop: 14, marginBottom: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>
              Additional details
            </div>

            <TextSection label="Detailed description" checked={showDesc} onToggle={setShowDesc}>
              <textarea style={taStyle} value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Describe the aircraft's history, use, condition, and any notable features…" rows={4} />
            </TextSection>

            <TextSection label="Avionics & equipment" checked={showEquip} onToggle={setShowEquip}>
              <textarea style={taStyle} value={equip} onChange={e => setEquip(e.target.value)}
                placeholder="Garmin G1000 NXi, GFC 700 autopilot, ADS-B In/Out, synthetic vision…" rows={3} />
            </TextSection>

            <TextSection label="Airframe notes" checked={showAirframe} onToggle={setShowAirframe}>
              <textarea style={taStyle} value={airframeNotes} onChange={e => setAirframeNotes(e.target.value)}
                placeholder="Annual inspection dates, STC mods, damage history, corrosion treatment…" rows={3} />
            </TextSection>

            <TextSection label="Engine notes" checked={showEngineNotes} onToggle={setShowEngineNotes}>
              <textarea style={taStyle} value={engineNotes} onChange={e => setEngineNotes(e.target.value)}
                placeholder="Overhaul dates, compressions, AD compliance, oil analysis trends…" rows={3} />
            </TextSection>

            <TextSection label="Interior remarks" checked={showInterior} onToggle={setShowInterior}>
              <textarea style={taStyle} value={interiorNotes} onChange={e => setInteriorNotes(e.target.value)}
                placeholder="Seat upholstery, refurb date, cabin layout, headliner, carpets…" rows={3} />
            </TextSection>

            <TextSection label="Exterior remarks" checked={showExterior} onToggle={setShowExterior}>
              <textarea style={taStyle} value={exteriorNotes} onChange={e => setExteriorNotes(e.target.value)}
                placeholder="Paint condition, last repaint date, livery, known blemishes…" rows={3} />
            </TextSection>
          </div>

          {/* Photos */}
          <PhotoUploader userId={user.id} photos={photos} onChange={setPhotos} />

          {/* Submit */}
          <button onClick={submit} disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Submitting…' : 'Submit for approval'}
          </button>

          {msg && (
            <div style={{ fontSize: 13, marginTop: 10, textAlign: 'center', color: msg.ok ? '#248a3d' : '#ff3b30' }}>
              {msg.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TextSection({ label, checked, onToggle, children }: {
  label: string; checked: boolean; onToggle: (v: boolean) => void; children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: checked ? 12 : 4 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: checked ? 7 : 0, userSelect: 'none' }}>
        <input type="checkbox" checked={checked} onChange={e => onToggle(e.target.checked)}
          style={{ width: 15, height: 15, accentColor: '#0a84ff', flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f' }}>{label}</span>
      </label>
      {checked && children}
    </div>
  )
}

// ── PhotoUploader ─────────────────────────────────────────────
type SlotState = { preview: string; remoteUrl: string; uploading: boolean; error: string }
const emptySlot = (): SlotState => ({ preview: '', remoteUrl: '', uploading: false, error: '' })

function PhotoUploader({ userId, photos, onChange }: {
  userId: string; photos: string[]; onChange: (urls: string[]) => void
}) {
  const [slots, setSlots] = useState<SlotState[]>([emptySlot(), emptySlot(), emptySlot(), emptySlot(), emptySlot()])
  const supabase = useMemo(() => createClient(), [])

  const pick = async (file: File, slot: number) => {
    if (file.size > 5 * 1024 * 1024) {
      setSlots(prev => prev.map((s, i) => i === slot ? { ...s, error: 'Max 5 MB' } : s))
      return
    }
    const preview = URL.createObjectURL(file)
    setSlots(prev => prev.map((s, i) => i === slot ? { ...s, preview, remoteUrl: '', uploading: true, error: '' } : s))

    const ext  = file.name.split('.').pop() ?? 'jpg'
    const path = `${userId}/${Date.now()}_${slot}.${ext}`
    const { error: upErr } = await supabase.storage
      .from('aircraft-photos').upload(path, file, { upsert: true, contentType: file.type })

    if (upErr) {
      setSlots(prev => prev.map((s, i) => i === slot ? { ...s, uploading: false, error: upErr.message } : s))
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('aircraft-photos').getPublicUrl(path)
    setSlots(prev => {
      const next = prev.map((s, i) => i === slot ? { ...s, remoteUrl: publicUrl, uploading: false } : s)
      onChange(next.map(s => s.remoteUrl).filter(Boolean))
      return next
    })
  }

  const remove = (slot: number) => {
    setSlots(prev => {
      const old = prev[slot]
      if (old.preview) URL.revokeObjectURL(old.preview)  // free blob memory
      const next = prev.map((s, i) => i === slot ? emptySlot() : s)
      onChange(next.map(s => s.remoteUrl).filter(Boolean))
      return next
    })
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={lbl}>
        Photos <span style={{ color: '#aeaeb2', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— max 5 · 5MB each · first = cover</span>
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
        {[0,1,2,3,4].map(slot => {
          const s = slots[slot]
          const hasPreview = !!s.preview
          return (
          <div key={slot} style={{ position: 'relative', paddingTop: '75%' }}>
            <label style={{
              position: 'absolute', inset: 0,
              border: `1.5px dashed ${s.error ? '#ff3b30' : 'rgba(118,118,128,0.3)'}`,
              borderRadius: 12, cursor: 'pointer', overflow: 'hidden',
              background: hasPreview ? 'transparent' : 'rgba(118,118,128,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {hasPreview ? (
                <>
                  <img src={s.preview} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {s.uploading && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>Uploading…</span>
                    </div>
                  )}
                  {!s.uploading && !s.remoteUrl && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 11, color: '#ff3b30', fontWeight: 500 }}>Upload failed</span>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  {s.error
                    ? <span style={{ fontSize: 11, color: '#ff3b30', textAlign: 'center', padding: '0 6px' }}>{s.error}</span>
                    : <>
                        <span style={{ fontSize: 22, opacity: 0.35 }}>📷</span>
                        <span style={{ fontSize: 11, color: '#86868b', textAlign: 'center' }}>
                          {slot === 0 ? 'Cover' : `Photo ${slot + 1}`}
                        </span>
                      </>
                  }
                </div>
              )}
              <input type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) pick(f, slot) }} />
            </label>
            {hasPreview && (
              <button onClick={e => { e.preventDefault(); remove(slot) }} style={{
                position: 'absolute', top: 5, right: 5, zIndex: 2,
                background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff',
                borderRadius: '50%', width: 20, height: 20,
                fontSize: 11, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            )}
            {slot === 0 && s.preview && (
              <div style={{
                position: 'absolute', bottom: 5, left: 5, zIndex: 2,
                background: s.remoteUrl ? 'rgba(10,132,255,0.88)' : 'rgba(180,120,0,0.9)',
                borderRadius: 6, padding: '2px 7px', fontSize: 10, color: '#fff', fontWeight: 600,
              }}>{s.remoteUrl ? 'COVER' : 'UPLOADING…'}</div>
            )}
          </div>
        )})}
      </div>
    </div>
  )
}

// ── AdminPhotoStrip ───────────────────────────────────────────
function AdminPhotoStrip({ photos, onClose }: { photos: string[]; onClose: () => void }) {
  const [pidx, setPidx] = useState(0)
  return (
    <div style={{ position: 'relative', aspectRatio: '16/9', background: '#f0f0f3', flexShrink: 0 }}>
      {photos.length > 0 ? (
        <>
          <Image src={photos[pidx]} alt="" fill sizes="(max-width: 700px) 100vw, 600px" style={{ objectFit: 'cover' }} priority />
          {photos.length > 1 && (
            <>
              <button onClick={() => setPidx(i => (i - 1 + photos.length) % photos.length)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', fontSize: 18, cursor: 'pointer' }}>‹</button>
              <button onClick={() => setPidx(i => (i + 1) % photos.length)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', fontSize: 18, cursor: 'pointer' }}>›</button>
              <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
                {photos.map((_, i) => <div key={i} onClick={() => setPidx(i)} style={{ width: 6, height: 6, borderRadius: '50%', background: i === pidx ? '#fff' : 'rgba(255,255,255,0.45)', cursor: 'pointer' }} />)}
              </div>
            </>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 48, color: '#c7c7cc' }}>✈</div>
      )}
      <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: 30, height: 30, borderRadius: '50%', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
    </div>
  )
}

// ── AdminModal ────────────────────────────────────────────────
type AdminProps = { userId: string; onClose: () => void; onApproved: () => void }

const JOB_TYPES_ADMIN = ['Full-time', 'Part-time', 'Contract', 'Seasonal', 'Charter']
const CONDITIONS_ADMIN = ['Excellent', 'Very Good', 'Good', 'Fair']

export function AdminModal({ userId, onClose, onApproved }: AdminProps) {
  const [allListings, setAllListings] = useState<any[]>([])
  const [allJobs,     setAllJobs]     = useState<any[]>([])
  const [adminTab,    setAdminTab]    = useState<'listings' | 'jobs'>('listings')
  const [loading,     setLoading]     = useState(true)
  const [msgs,        setMsgs]        = useState<Record<string, { text: string; ok: boolean }>>({})
  const [certGrant,   setCertGrant]   = useState<Record<string, boolean>>({})
  const [editId,      setEditId]      = useState<string | null>(null)
  const [editData,    setEditData]    = useState<Record<string, any>>({})
  const [confirmDel,  setConfirmDel]  = useState<string | null>(null)
  const [viewListing, setViewListing] = useState<any | null>(null)

  const reload = () => {
    setLoading(true)
    authFetch('/api/admin')
      .then(r => r.json())
      .then(d => { setAllListings(d.listings || []); setAllJobs(d.jobs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { if (userId) reload() }, [userId])

  const pending  = allListings.filter(l => l.status === 'pending')
  const approved = allListings.filter(l => l.status === 'approved')
  const pendingJobs  = allJobs.filter(j => j.status === 'pending')
  const approvedJobs = allJobs.filter(j => j.status === 'approved')

  const action = async (id: string, act: 'approve' | 'reject', kind: 'listing' | 'job' = 'listing') => {
    const r = await authFetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: id, action: act, kind, grantCertification: certGrant[id] ?? false }),
    })
    const d = await r.json()
    if (d.error) { setMsgs(m => ({ ...m, [id]: { text: d.error, ok: false } })); return }
    setMsgs(m => ({ ...m, [id]: { text: act === 'approve' ? '✓ Approved' : '✕ Rejected', ok: act === 'approve' } }))
    onApproved(); reload()
  }

  const saveEdit = async (id: string, kind: 'listing' | 'job') => {
    const r = await authFetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: id, action: 'edit', kind, edits: editData }),
    })
    const d = await r.json()
    if (d.error) { setMsgs(m => ({ ...m, [id]: { text: d.error, ok: false } })); return }
    setEditId(null); setEditData({})
    setMsgs(m => ({ ...m, [id]: { text: '✓ Saved', ok: true } }))
    onApproved(); reload()
  }

  const deleteItem = async (id: string, kind: 'listing' | 'job') => {
    const r = await authFetch('/api/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: id, kind }),
    })
    const d = await r.json()
    if (d.error) { setMsgs(m => ({ ...m, [id]: { text: d.error, ok: false } })); return }
    setConfirmDel(null); onApproved(); reload()
  }

  const startEdit = (item: any) => {
    setEditId(item.id)
    setEditData({ ...item })
  }

  const iBtn = (color: string, bg: string): React.CSSProperties => ({
    height: 32, padding: '0 12px', borderRadius: 8, border: 'none',
    background: bg, color, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
  })

  const editInp: React.CSSProperties = {
    width: '100%', height: 34, background: 'rgba(118,118,128,0.08)', border: 'none',
    borderRadius: 8, fontFamily: 'inherit', fontSize: 16, padding: '0 10px', color: '#1d1d1f', boxSizing: 'border-box',
  }
  const editLbl: React.CSSProperties = {
    fontSize: 10, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3, display: 'block',
  }

  const renderJobCard = (j: any, isPending: boolean) => {
    const m = msgs[j.id]
    const isEditing = editId === j.id
    return (
      <div key={j.id} style={{ background: 'rgba(118,118,128,0.05)', border: '0.5px solid rgba(0,0,0,0.06)', borderRadius: 14, marginBottom: 12, padding: '14px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{j.title}</div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                background: isPending ? 'rgba(255,159,10,0.12)' : 'rgba(52,199,89,0.12)',
                color: isPending ? '#b07800' : '#248a3d' }}>
                {isPending ? 'PENDING' : 'LIVE'}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#86868b', marginTop: 2 }}>{j.company} · {j.location} · {j.job_type}</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {!isEditing && <button onClick={() => startEdit(j)} style={iBtn('#0a84ff', 'rgba(10,132,255,0.1)')}>✏ Edit</button>}
            {confirmDel === j.id ? (
              <>
                <button onClick={() => deleteItem(j.id, 'job')} style={iBtn('#fff', '#ff3b30')}>Confirm delete</button>
                <button onClick={() => setConfirmDel(null)} style={iBtn('#86868b', 'rgba(118,118,128,0.1)')}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setConfirmDel(j.id)} style={iBtn('#ff3b30', 'rgba(255,59,48,0.08)')}>🗑</button>
            )}
          </div>
        </div>

        {/* Edit form */}
        {isEditing && (
          <div style={{ background: 'rgba(10,132,255,0.04)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
              {[['Title', 'title'], ['Company', 'company'], ['Location', 'location'], ['Salary range', 'salary_range']].map(([l, k]) => (
                <div key={k}>
                  <label style={editLbl}>{l}</label>
                  <input style={editInp} value={editData[k] ?? ''} onChange={e => setEditData((d: any) => ({ ...d, [k]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label style={editLbl}>Job type</label>
                <select style={editInp} value={editData.job_type ?? ''} onChange={e => setEditData((d: any) => ({ ...d, job_type: e.target.value }))}>
                  {JOB_TYPES_ADMIN.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={editLbl}>Description</label>
              <textarea style={{ ...editInp, height: 'auto', padding: '8px 10px', resize: 'vertical' } as any} rows={3}
                value={editData.description ?? ''} onChange={e => setEditData((d: any) => ({ ...d, description: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={editLbl}>Requirements</label>
              <textarea style={{ ...editInp, height: 'auto', padding: '8px 10px', resize: 'vertical' } as any} rows={2}
                value={editData.requirements ?? ''} onChange={e => setEditData((d: any) => ({ ...d, requirements: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => saveEdit(j.id, 'job')} style={{ ...iBtn('#fff', '#0a84ff'), flex: 1, height: 36 }}>Save changes</button>
              <button onClick={() => { setEditId(null); setEditData({}) }} style={{ ...iBtn('#86868b', 'rgba(118,118,128,0.1)'), flex: 1, height: 36 }}>Cancel</button>
            </div>
          </div>
        )}

        {!isEditing && (
          <div style={{ fontSize: 13, color: '#1d1d1f', lineHeight: 1.5, marginBottom: 8,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as any}>
            {j.description}
          </div>
        )}
        <div style={{ fontSize: 12, color: '#86868b', marginBottom: isPending ? 10 : 0 }}>Posted by {j.poster_name} · {new Date(j.created_at).toLocaleString()}</div>
        {m && <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: m.ok ? '#248a3d' : '#ff3b30' }}>{m.text}</div>}
        {isPending && !isEditing && !m && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => action(j.id, 'approve', 'job')} style={{ ...iBtn('#248a3d', 'rgba(52,199,89,0.12)'), flex: 1, height: 36 }}>✓ Approve</button>
            <button onClick={() => action(j.id, 'reject',  'job')} style={{ ...iBtn('#ff3b30', 'rgba(255,59,48,0.08)'),  flex: 1, height: 36 }}>✕ Reject</button>
          </div>
        )}
      </div>
    )
  }

  const renderListingCard = (l: any, isPending: boolean) => {
    const m = msgs[l.id]
    const photos: string[] = l.photos ?? []
    const isEditing = editId === l.id
    return (
      <div key={l.id} style={{ background: 'rgba(118,118,128,0.05)', border: '0.5px solid rgba(0,0,0,0.06)', borderRadius: 14, marginBottom: 12, overflow: 'hidden' }}>
        {/* Photos */}
        {photos.length > 0 && (
          <div style={{ display: 'flex', gap: 4, padding: '10px 10px 0' }}>
            {photos.map((p, i) => (
              <a key={i} href={p} target="_blank" rel="noreferrer" style={{ flex: i === 0 ? 2 : 1, height: 80, borderRadius: 8, overflow: 'hidden', position: 'relative', display: 'block', flexShrink: 0 }}>
                <Image src={p} alt="" fill sizes="160px" style={{ objectFit: 'cover' }} />
                {i === 0 && <div style={{ position: 'absolute', bottom: 3, left: 3, background: 'rgba(10,132,255,0.9)', borderRadius: 4, padding: '1px 5px', fontSize: 9, color: '#fff', fontWeight: 600 }}>COVER</div>}
              </a>
            ))}
          </div>
        )}
        <div style={{ padding: '12px 14px 14px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div onClick={() => setViewListing(l)} style={{ fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#0a84ff', textDecoration: 'underline', textUnderlineOffset: 2 }}>{l.year} {l.model}</div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                  background: isPending ? 'rgba(255,159,10,0.12)' : 'rgba(52,199,89,0.12)',
                  color: isPending ? '#b07800' : '#248a3d' }}>
                  {isPending ? 'PENDING' : 'LIVE'}
                </span>
                {l.certified && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: 'rgba(255,214,10,0.15)', color: '#b07800' }}>⭐ CERTIFIED</span>}
              </div>
              <div style={{ fontSize: 12, color: '#86868b' }}>{l.reg} · {l.hours?.toLocaleString()} h · {l.location}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{fmtPrice(l.price, l.currency)}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {!isEditing && <button onClick={() => startEdit(l)} style={iBtn('#0a84ff', 'rgba(10,132,255,0.1)')}>✏ Edit</button>}
                {confirmDel === l.id ? (
                  <>
                    <button onClick={() => deleteItem(l.id, 'listing')} style={iBtn('#fff', '#ff3b30')}>Confirm</button>
                    <button onClick={() => setConfirmDel(null)} style={iBtn('#86868b', 'rgba(118,118,128,0.1)')}>✕</button>
                  </>
                ) : (
                  <button onClick={() => setConfirmDel(l.id)} style={iBtn('#ff3b30', 'rgba(255,59,48,0.08)')}>🗑</button>
                )}
              </div>
            </div>
          </div>

          {/* Edit form */}
          {isEditing && (
            <div style={{ background: 'rgba(10,132,255,0.04)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                {[['Year', 'year', 'number'], ['Reg', 'reg', 'text'], ['Hours TT', 'hours', 'number'], ['Price', 'price', 'number']].map(([lbl, k, type]) => (
                  <div key={k}>
                    <label style={editLbl}>{lbl}</label>
                    <input style={editInp} type={type} value={editData[k] ?? ''} onChange={e => setEditData((d: any) => ({ ...d, [k]: e.target.value }))} />
                  </div>
                ))}
                <div>
                  <label style={editLbl}>Currency</label>
                  <select style={editInp} value={editData.currency ?? 'USD'} onChange={e => setEditData((d: any) => ({ ...d, currency: e.target.value }))}>
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={editLbl}>Location</label>
                  <AirportPicker
                    initialLabel={editData.location ?? ''}
                    hasValue={editData.lat != null && editData.lon != null}
                    inputStyle={editInp}
                    onChange={ap => setEditData((d: any) => ap
                      ? { ...d, location: `${ap.icao} — ${ap.name}`, lat: ap.lat, lon: ap.lon }
                      : { ...d, location: '', lat: null, lon: null })}
                  />
                </div>
                <div>
                  <label style={editLbl}>Condition</label>
                  <select style={editInp} value={editData.condition ?? ''} onChange={e => setEditData((d: any) => ({ ...d, condition: e.target.value }))}>
                    {CONDITIONS_ADMIN.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={editLbl}>Contact email</label>
                  <input style={editInp} type="email" value={editData.contact_email ?? ''} onChange={e => setEditData((d: any) => ({ ...d, contact_email: e.target.value }))} />
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={editLbl}>Equipment</label>
                <input style={editInp} value={editData.equip ?? ''} onChange={e => setEditData((d: any) => ({ ...d, equip: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={!!editData.certified} onChange={e => setEditData((d: any) => ({ ...d, certified: e.target.checked }))}
                    style={{ width: 15, height: 15, accentColor: '#f5a623' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#b07800' }}>⭐ Certified</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={!!editData.ifr} onChange={e => setEditData((d: any) => ({ ...d, ifr: e.target.checked }))}
                    style={{ width: 15, height: 15, accentColor: '#0a84ff' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#0a84ff' }}>IFR Certified</span>
                </label>
              </div>
              {(editData.photos ?? []).length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <label style={editLbl}>Photos — click ✕ to remove</label>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {(editData.photos as string[]).map((p, i) => (
                      <div key={p + i} style={{ position: 'relative', width: 64, height: 64, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                        <Image src={p} alt="" fill sizes="64px" style={{ objectFit: 'cover' }} />
                        <button
                          onClick={() => setEditData((d: any) => ({ ...d, photos: (d.photos as string[]).filter((_, j) => j !== i) }))}
                          style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => saveEdit(l.id, 'listing')} style={{ ...iBtn('#fff', '#0a84ff'), flex: 1, height: 36 }}>Save changes</button>
                <button onClick={() => { setEditId(null); setEditData({}) }} style={{ ...iBtn('#86868b', 'rgba(118,118,128,0.1)'), flex: 1, height: 36 }}>Cancel</button>
              </div>
            </div>
          )}

          {!isEditing && (
            <div style={{ fontSize: 12, color: '#86868b', marginBottom: 8 }}>
              {l.condition}{l.equip ? ` · ${l.equip}` : ''} · {l.seller_name}<br />
              <span style={{ fontSize: 11 }}>{new Date(l.created_at).toLocaleString()}</span>
            </div>
          )}
          {l.certification_requested && isPending && !isEditing && !m && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, cursor: 'pointer',
              background: 'rgba(255,214,10,0.10)', border: '0.5px solid rgba(255,214,10,0.4)', borderRadius: 10, padding: '8px 12px' }}>
              <input type="checkbox" checked={certGrant[l.id] ?? false}
                onChange={e => setCertGrant(prev => ({ ...prev, [l.id]: e.target.checked }))}
                style={{ width: 15, height: 15, accentColor: '#f5a623', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#b07800' }}>⭐ Certification requested</span>
                <span style={{ fontSize: 11, color: '#86868b', marginLeft: 6 }}>Check to grant</span>
              </div>
            </label>
          )}
          {m && <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: m.ok ? '#248a3d' : '#ff3b30' }}>{m.text}</div>}
          {isPending && !isEditing && !m && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => action(l.id, 'approve')} style={{ ...iBtn('#248a3d', 'rgba(52,199,89,0.12)'), flex: 1, height: 36 }}>✓ Approve</button>
              <button onClick={() => action(l.id, 'reject')}  style={{ ...iBtn('#ff3b30', 'rgba(255,59,48,0.08)'),  flex: 1, height: 36 }}>✕ Reject</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const listingCount = pending.length + approved.length
  const jobCount     = pendingJobs.length + approvedJobs.length

  return (
    <>
    {/* ── Listing detail overlay ── */}
    {viewListing && (
      <div style={{ ...overlay, zIndex: 400 }} onClick={e => e.target === e.currentTarget && setViewListing(null)}>
        <div style={{ ...card, width: 'min(600px, 96vw)', maxHeight: '90vh' }}>
          <AdminPhotoStrip photos={viewListing.photos ?? []} onClose={() => setViewListing(null)} />
          {/* Content */}
          <div style={{ padding: '20px 24px 24px', overflowY: 'auto', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 3 }}>{viewListing.year} {viewListing.model}</div>
                <div style={{ fontSize: 13, color: '#86868b' }}>{viewListing.reg} · {viewListing.hours?.toLocaleString()} h · {viewListing.location}</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0a84ff' }}>{fmtPrice(viewListing.price, viewListing.currency)}</div>
            </div>
            {/* Spec grid */}
            {(() => {
              const engineTimes: (number | null)[] = viewListing.engine_times ?? []
              const propTimes:   (number | null)[] = viewListing.prop_times   ?? []
              const timeSuffix = viewListing.time_basis === 'to_next_check' ? ' h to next check' : ' h since check'
              const rows: [string,string][] = [
                viewListing.condition   && ['Condition',  viewListing.condition],
                viewListing.seller_name && ['Seller',     viewListing.seller_name],
                ...engineTimes.map((t,i) => t != null ? [`Eng ${engineTimes.length>1?i+1:''} Time`, `${t.toLocaleString()}${timeSuffix}`] as [string,string] : null),
                ...propTimes.map(  (t,i) => t != null ? [`Prop ${propTimes.length>1?i+1:''} Time`,  `${t.toLocaleString()}${timeSuffix}`] as [string,string] : null),
              ].filter(Boolean) as [string,string][]
              return rows.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                  {rows.map(([l, v]) => (
                    <div key={l} style={{ background: 'rgba(118,118,128,0.06)', borderRadius: 10, padding: '9px 12px' }}>
                      <div style={{ fontSize: 10, color: '#86868b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{l}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f' }}>{v}</div>
                    </div>
                  ))}
                </div>
              ) : null
            })()}
            {/* Text sections */}
            {[
              [viewListing.description,    'Description'],
              [viewListing.equip,          'Avionics & equipment'],
              [viewListing.airframe_notes, 'Airframe notes'],
              [viewListing.engine_notes,   'Engine notes'],
              [viewListing.interior_notes, 'Interior remarks'],
              [viewListing.exterior_notes, 'Exterior remarks'],
            ].filter(([v]) => v).map(([text, label]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, background: 'rgba(118,118,128,0.05)', borderRadius: 10, padding: '10px 14px' }}>{text}</div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: '#aeaeb2', marginTop: 6 }}>
              Submitted {new Date(viewListing.created_at).toLocaleString()} · Status: <b>{viewListing.status}</b>
              {viewListing.certification_requested && <span style={{ color: '#b07800', marginLeft: 8 }}>⭐ Cert requested</span>}
            </div>
          </div>
        </div>
      </div>
    )}

    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...card, width: 'min(720px, 96vw)', maxHeight: '90vh' }}>
        <div style={modalHeader}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Admin panel</div>
            <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>
              {pending.length + pendingJobs.length} pending · {approved.length + approvedJobs.length} live
            </div>
          </div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '0.5px solid rgba(0,0,0,0.06)', padding: '0 22px', flexShrink: 0 }}>
          {(['listings', 'jobs'] as const).map(t => (
            <button key={t} onClick={() => setAdminTab(t)} style={{
              padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              color: adminTab === t ? '#0a84ff' : '#86868b',
              borderBottom: adminTab === t ? '2px solid #0a84ff' : '2px solid transparent',
            }}>
              {t === 'listings' ? `Aircraft (${listingCount})` : `Jobs (${jobCount})`}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 22px 22px' }}>
          {loading && <div style={{ textAlign: 'center', padding: 40, color: '#86868b' }}>Loading…</div>}

          {!loading && adminTab === 'jobs' && (
            <>
              {pendingJobs.length === 0 && approvedJobs.length === 0 && (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>✓</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>No jobs yet</div>
                </div>
              )}
              {pendingJobs.length > 0 && (
                <div style={{ fontSize: 11, fontWeight: 600, color: '#ff9f0a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Pending ({pendingJobs.length})
                </div>
              )}
              {pendingJobs.map(j => renderJobCard(j, true))}
              {approvedJobs.length > 0 && (
                <div style={{ fontSize: 11, fontWeight: 600, color: '#248a3d', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '16px 0 10px' }}>
                  Live ({approvedJobs.length})
                </div>
              )}
              {approvedJobs.map(j => renderJobCard(j, false))}
            </>
          )}

          {!loading && adminTab === 'listings' && (
            <>
              {pending.length === 0 && approved.length === 0 && (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>✓</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>No listings yet</div>
                </div>
              )}
              {pending.length > 0 && (
                <div style={{ fontSize: 11, fontWeight: 600, color: '#ff9f0a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Pending ({pending.length})
                </div>
              )}
              {pending.map(l => renderListingCard(l, true))}
              {approved.length > 0 && (
                <div style={{ fontSize: 11, fontWeight: 600, color: '#248a3d', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '16px 0 10px' }}>
                  Live ({approved.length})
                </div>
              )}
              {approved.map(l => renderListingCard(l, false))}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

// ── MyItemsModal — owners manage their own listings/jobs ───────
type MyItemsProps = { userId: string; onClose: () => void; onChanged: () => void }

export function MyItemsModal({ userId, onClose, onChanged }: MyItemsProps) {
  const [myListings, setMyListings] = useState<any[]>([])
  const [myJobs,     setMyJobs]     = useState<any[]>([])
  const [tab,        setTab]        = useState<'listings' | 'jobs'>('listings')
  const [loading,    setLoading]    = useState(true)
  const [editId,     setEditId]     = useState<string | null>(null)
  const [editData,   setEditData]   = useState<Record<string, any>>({})
  const [confirmDel, setConfirmDel] = useState<string | null>(null)
  const [msgs,       setMsgs]       = useState<Record<string, { text: string; ok: boolean }>>({})

  const reload = () => {
    setLoading(true)
    authFetch('/api/my-items')
      .then(r => r.json())
      .then(d => { setMyListings(d.listings || []); setMyJobs(d.jobs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }
  useEffect(() => { if (userId) reload() }, [userId])

  const startEdit = (item: any) => { setEditId(item.id); setEditData({ ...item }) }

  const saveListing = async (id: string) => {
    const r = await authFetch('/api/listings', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: id, edits: editData }),
    })
    const d = await r.json()
    if (d.error) { setMsgs(m => ({ ...m, [id]: { text: d.error, ok: false } })); return }
    setEditId(null); setEditData({}); onChanged(); reload()
  }

  const saveJob = async (id: string) => {
    const r = await authFetch('/api/jobs', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: id, edits: editData }),
    })
    const d = await r.json()
    if (d.error) { setMsgs(m => ({ ...m, [id]: { text: d.error, ok: false } })); return }
    setEditId(null); setEditData({}); onChanged(); reload()
  }

  const deleteListing = async (id: string) => {
    const r = await authFetch('/api/listings', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: id }),
    })
    const d = await r.json()
    if (d.error) { setMsgs(m => ({ ...m, [id]: { text: d.error, ok: false } })); return }
    setConfirmDel(null); onChanged(); reload()
  }

  const deleteJob = async (id: string) => {
    const r = await authFetch('/api/jobs', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: id }),
    })
    const d = await r.json()
    if (d.error) { setMsgs(m => ({ ...m, [id]: { text: d.error, ok: false } })); return }
    setConfirmDel(null); onChanged(); reload()
  }

  const statusColor = (s: string) => s === 'approved' ? { bg: 'rgba(52,199,89,0.12)', c: '#248a3d', label: 'LIVE' }
    : s === 'rejected' ? { bg: 'rgba(255,59,48,0.08)', c: '#ff3b30', label: 'REJECTED' }
    : { bg: 'rgba(255,159,10,0.12)', c: '#b07800', label: 'PENDING' }

  const iBtn = (color: string, bg: string): React.CSSProperties => ({
    height: 32, padding: '0 12px', borderRadius: 8, border: 'none',
    background: bg, color, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
  })
  const editInp: React.CSSProperties = {
    width: '100%', height: 34, background: 'rgba(118,118,128,0.08)', border: 'none',
    borderRadius: 8, fontFamily: 'inherit', fontSize: 16, padding: '0 10px', color: '#1d1d1f', boxSizing: 'border-box',
  }
  const editLbl: React.CSSProperties = {
    fontSize: 10, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3, display: 'block',
  }

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...card, width: 'min(680px, 96vw)', maxHeight: '90vh' }}>
        <div style={modalHeader}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>My listings & jobs</div>
            <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>Edit or remove anything you've posted</div>
          </div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ display: 'flex', borderBottom: '0.5px solid rgba(0,0,0,0.06)', padding: '0 22px', flexShrink: 0 }}>
          {(['listings', 'jobs'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              color: tab === t ? '#0a84ff' : '#86868b',
              borderBottom: tab === t ? '2px solid #0a84ff' : '2px solid transparent',
            }}>
              {t === 'listings' ? `Aircraft (${myListings.length})` : `Jobs (${myJobs.length})`}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 22px 22px' }}>
          {loading && <div style={{ textAlign: 'center', padding: 40, color: '#86868b' }}>Loading…</div>}

          {!loading && tab === 'listings' && myListings.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#86868b' }}>You haven't listed any aircraft yet.</div>
          )}
          {!loading && tab === 'listings' && myListings.map(l => {
            const m = msgs[l.id]
            const isEditing = editId === l.id
            const st = statusColor(l.status)
            return (
              <div key={l.id} style={{ background: 'rgba(118,118,128,0.05)', border: '0.5px solid rgba(0,0,0,0.06)', borderRadius: 14, marginBottom: 12, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{l.year} {l.model}</div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: st.bg, color: st.c }}>{st.label}</span>
                      {l.certified && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: 'rgba(255,214,10,0.15)', color: '#b07800' }}>⭐ CERTIFIED</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#86868b', marginTop: 2 }}>{l.reg} · {l.hours?.toLocaleString()} h · {l.location}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{fmtPrice(l.price, l.currency)}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {!isEditing && <button onClick={() => startEdit(l)} style={iBtn('#0a84ff', 'rgba(10,132,255,0.1)')}>✏ Edit</button>}
                      {confirmDel === l.id ? (
                        <>
                          <button onClick={() => deleteListing(l.id)} style={iBtn('#fff', '#ff3b30')}>Confirm</button>
                          <button onClick={() => setConfirmDel(null)} style={iBtn('#86868b', 'rgba(118,118,128,0.1)')}>✕</button>
                        </>
                      ) : (
                        <button onClick={() => setConfirmDel(l.id)} style={iBtn('#ff3b30', 'rgba(255,59,48,0.08)')}>🗑</button>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div style={{ background: 'rgba(10,132,255,0.04)', borderRadius: 10, padding: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                      {[['Year', 'year', 'number'], ['Reg', 'reg', 'text'], ['Hours TT', 'hours', 'number'], ['Price', 'price', 'number']].map(([lb, k, type]) => (
                        <div key={k}>
                          <label style={editLbl}>{lb}</label>
                          <input style={editInp} type={type} value={editData[k] ?? ''} onChange={e => setEditData((d: any) => ({ ...d, [k]: e.target.value }))} />
                        </div>
                      ))}
                      <div>
                        <label style={editLbl}>Currency</label>
                        <select style={editInp} value={editData.currency ?? 'USD'} onChange={e => setEditData((d: any) => ({ ...d, currency: e.target.value }))}>
                          {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={editLbl}>Location</label>
                        <AirportPicker
                          initialLabel={editData.location ?? ''}
                          hasValue={editData.lat != null && editData.lon != null}
                          inputStyle={editInp}
                          onChange={ap => setEditData((d: any) => ap
                            ? { ...d, location: `${ap.icao} — ${ap.name}`, lat: ap.lat, lon: ap.lon }
                            : { ...d, location: '', lat: null, lon: null })}
                        />
                      </div>
                      <div>
                        <label style={editLbl}>Contact email</label>
                        <input style={editInp} type="email" value={editData.contact_email ?? ''} onChange={e => setEditData((d: any) => ({ ...d, contact_email: e.target.value }))} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <label style={editLbl}>Equipment</label>
                      <input style={editInp} value={editData.equip ?? ''} onChange={e => setEditData((d: any) => ({ ...d, equip: e.target.value }))} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => saveListing(l.id)} style={{ ...iBtn('#fff', '#0a84ff'), flex: 1, height: 36 }}>Save changes</button>
                      <button onClick={() => { setEditId(null); setEditData({}) }} style={{ ...iBtn('#86868b', 'rgba(118,118,128,0.1)'), flex: 1, height: 36 }}>Cancel</button>
                    </div>
                  </div>
                )}
                {m && <div style={{ fontSize: 13, fontWeight: 500, marginTop: 8, color: m.ok ? '#248a3d' : '#ff3b30' }}>{m.text}</div>}
              </div>
            )
          })}

          {!loading && tab === 'jobs' && myJobs.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#86868b' }}>You haven't posted any jobs yet.</div>
          )}
          {!loading && tab === 'jobs' && myJobs.map(j => {
            const m = msgs[j.id]
            const isEditing = editId === j.id
            const st = statusColor(j.status)
            return (
              <div key={j.id} style={{ background: 'rgba(118,118,128,0.05)', border: '0.5px solid rgba(0,0,0,0.06)', borderRadius: 14, marginBottom: 12, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{j.title}</div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: st.bg, color: st.c }}>{st.label}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#86868b', marginTop: 2 }}>{j.company} · {j.location} · {j.job_type}</div>
                    {j.expires_at && (
                      <div style={{ fontSize: 11, color: '#ff9f0a', marginTop: 3 }}>
                        ⏱ Expires {new Date(j.expires_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {!isEditing && <button onClick={() => startEdit(j)} style={iBtn('#0a84ff', 'rgba(10,132,255,0.1)')}>✏ Edit</button>}
                    {confirmDel === j.id ? (
                      <>
                        <button onClick={() => deleteJob(j.id)} style={iBtn('#fff', '#ff3b30')}>Confirm</button>
                        <button onClick={() => setConfirmDel(null)} style={iBtn('#86868b', 'rgba(118,118,128,0.1)')}>✕</button>
                      </>
                    ) : (
                      <button onClick={() => setConfirmDel(j.id)} style={iBtn('#ff3b30', 'rgba(255,59,48,0.08)')}>🗑</button>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div style={{ background: 'rgba(10,132,255,0.04)', borderRadius: 10, padding: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                      {[['Title', 'title'], ['Company', 'company'], ['Location', 'location'], ['Salary range', 'salary_range']].map(([lb, k]) => (
                        <div key={k}>
                          <label style={editLbl}>{lb}</label>
                          <input style={editInp} value={editData[k] ?? ''} onChange={e => setEditData((d: any) => ({ ...d, [k]: e.target.value }))} />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label style={editLbl}>Description</label>
                      <textarea style={{ ...editInp, height: 'auto', padding: '8px 10px', resize: 'vertical' } as any} rows={3}
                        value={editData.description ?? ''} onChange={e => setEditData((d: any) => ({ ...d, description: e.target.value }))} />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <label style={editLbl}>Renew / extend listing <span style={{ color: '#aeaeb2', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— resets the auto-removal delay, max 1 year</span></label>
                      <select style={editInp} value={editData.expiresInDays ?? ''} onChange={e => setEditData((d: any) => ({ ...d, expiresInDays: e.target.value || undefined }))}>
                        <option value="">Don't change</option>
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="180">6 months</option>
                        <option value="365">1 year (max)</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => saveJob(j.id)} style={{ ...iBtn('#fff', '#0a84ff'), flex: 1, height: 36 }}>Save changes</button>
                      <button onClick={() => { setEditId(null); setEditData({}) }} style={{ ...iBtn('#86868b', 'rgba(118,118,128,0.1)'), flex: 1, height: 36 }}>Cancel</button>
                    </div>
                  </div>
                )}
                {m && <div style={{ fontSize: 13, fontWeight: 500, marginTop: 8, color: m.ok ? '#248a3d' : '#ff3b30' }}>{m.text}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── ContactModal ──────────────────────────────────────────────
type ContactProps = { listing: Listing; user: User | null; onClose: () => void }

export function ContactModal({ listing, user, onClose }: ContactProps) {
  const [name,  setName]  = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState('')
  const [msg,   setMsg]   = useState('')
  const [res,   setRes]   = useState<{ text: string; ok: boolean } | null>(null)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const send = async () => {
    if (!name || !email) { setRes({ text: 'Name and email are required.', ok: false }); return }
    setLoading(true); setRes(null)
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing.id, buyerName: name, buyerEmail: email, buyerPhone: phone, message: msg }),
      })
      const d = await r.json()
      if (d.error) { setRes({ text: d.error, ok: false }); return }
      setRes({ text: '✓ Inquiry sent! The seller will be in touch soon.', ok: true })
      timerRef.current = setTimeout(onClose, 2000)
    } catch {
      setRes({ text: 'Network error — please try again.', ok: false })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ ...overlay, zIndex: 350 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...card, width: 'min(420px, 95vw)' }}>
        <div style={modalHeader}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Express interest</div>
            <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>Contact the seller</div>
          </div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '16px 22px 22px' }}>
          {/* Listing summary */}
          <div style={{
            padding: '12px 14px', background: 'rgba(10,132,255,0.06)',
            borderRadius: 12, marginBottom: 16,
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 3 }}>
              {listing.year} {listing.model}
            </div>
            <div style={{ fontSize: 12, color: '#86868b' }}>
              {listing.reg} · {listing.hours?.toLocaleString()} h · {listing.location}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0a84ff', marginTop: 5 }}>
              {fmtPrice(listing.price, listing.currency)}
            </div>
          </div>

          <div style={fg}>
            <label style={lbl}>Your name</label>
            <input style={inp} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" />
          </div>
          <div style={fg}>
            <label style={lbl}>Your email</label>
            <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div style={fg}>
            <label style={lbl}>Phone (optional)</label>
            <input style={inp} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 234 567 8900" />
          </div>
          <div style={fg}>
            <label style={lbl}>Message</label>
            <textarea
              style={{ ...inp, height: 'auto', resize: 'vertical', padding: '10px 12px' } as React.CSSProperties}
              rows={3} value={msg} onChange={e => setMsg(e.target.value)}
              placeholder="I am interested in this aircraft…"
            />
          </div>

          <button onClick={send} disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Sending…' : 'Send inquiry'}
          </button>

          {res && (
            <div style={{ fontSize: 13, marginTop: 10, textAlign: 'center', color: res.ok ? '#248a3d' : '#ff3b30' }}>
              {res.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
