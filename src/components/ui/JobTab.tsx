'use client'
// src/components/ui/JobTab.tsx
import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import AirportPicker, { type RemoteAirport } from '@/components/ui/AirportPicker'

type User = { id: string; name: string; email: string; role: string }

export type Job = {
  id: string
  title: string
  company: string
  location: string
  lat: number | null
  lon: number | null
  job_type: string
  function_title: string | null
  region: string | null
  description: string
  requirements: string | null
  salary_range: string | null
  min_hours_total: number | null
  min_hours_cs25:  number | null
  min_hours_cs23:  number | null
  min_hours_pic:   number | null
  logo_url: string | null
  poster_name: string
  approved_at: string | null
}

const FUNCTIONS  = ['Ab Initio', 'First Officer', 'Senior First Officer', 'Captain', 'TRI', 'TRE']
const REGIONS    = ['Europe', 'North America', 'South America', 'Asia', 'Middle East', 'Africa', 'Oceania']

// ── Shared styles ─────────────────────────────────────────────
const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 200,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
}
const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.94)',
  backdropFilter: 'blur(40px) saturate(180%)',
  border: '0.5px solid rgba(0,0,0,0.08)',
  borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
  fontFamily: "'Inter', -apple-system, sans-serif", color: '#1d1d1f',
  display: 'flex', flexDirection: 'column', overflow: 'hidden',
}
const inp: React.CSSProperties = {
  width: '100%', height: 40, background: 'rgba(118,118,128,0.08)',
  border: 'none', borderRadius: 10, fontFamily: 'inherit',
  fontSize: 14, fontWeight: 500, padding: '0 12px',
  color: '#1d1d1f', boxSizing: 'border-box',
}
const lbl: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#86868b',
  textTransform: 'uppercase', letterSpacing: '0.04em',
  marginBottom: 5, display: 'block',
}
const fg: React.CSSProperties = { marginBottom: 12 }

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Seasonal', 'Charter']

// ── Post Job Modal ─────────────────────────────────────────────
export function PostJobModal({ user, onClose, onSuccess }: { user: User; onClose: () => void; onSuccess: () => void }) {
  const [title,      setTitle]      = useState('')
  const [company,    setCompany]    = useState('')
  const [loc,        setLoc]        = useState<RemoteAirport | null>(null)
  const [jobType,    setJobType]    = useState('Full-time')
  const [funcTitle,  setFuncTitle]  = useState('')
  const [region,     setRegion]     = useState('')
  const [desc,       setDesc]       = useState('')
  const [reqs,       setReqs]       = useState('')
  const [salary,     setSalary]     = useState('')
  const [minTotal,   setMinTotal]   = useState('')
  const [minCs25,    setMinCs25]    = useState('')
  const [minCs23,    setMinCs23]    = useState('')
  const [minPic,     setMinPic]     = useState('')
  const [duration,   setDuration]   = useState('90')
  const [contact,    setContact]    = useState('')
  const [logoFile,   setLogoFile]   = useState<File | null>(null)
  const [logoPreview,setLogoPreview]= useState<string | null>(null)
  const [logoUploading, setLogoUploading] = useState(false)
  const [logoUrl,    setLogoUrl]    = useState<string | null>(null)
  const [msg,        setMsg]        = useState<{ text: string; ok: boolean } | null>(null)
  const [loading,    setLoading]    = useState(false)
  const supabase = useMemo(() => createClient(), [])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const pickLogo = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) { setMsg({ text: 'Logo must be under 2 MB.', ok: false }); return }
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
    setLogoUploading(true); setMsg(null)
    const path = `logos/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const { data, error } = await supabase.storage.from('job-logos').upload(path, file, { upsert: true, contentType: file.type })
    setLogoUploading(false)
    if (error || !data) { setMsg({ text: 'Logo upload failed: ' + (error?.message ?? ''), ok: false }); setLogoFile(null); setLogoPreview(null); return }
    setLogoUrl(supabase.storage.from('job-logos').getPublicUrl(data.path).data.publicUrl)
  }

  const submit = async () => {
    if (!title || !company || !loc?.icao || !region || !salary || !desc || !reqs || !minTotal || !minCs25 || !minCs23 || !minPic || !contact) {
      setMsg({ text: 'Please fill all required fields.', ok: false }); return
    }
    if (logoUploading) { setMsg({ text: 'Please wait for the logo to finish uploading.', ok: false }); return }
    setLoading(true); setMsg(null)
    try {
      const r = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, company, location: `${loc.icao} — ${loc.name}`, lat: loc.lat, lon: loc.lon, jobType, description: desc,
          functionTitle: funcTitle || null, region: region || null,
          requirements: reqs || null, salaryRange: salary || null,
          minHoursTotal: minTotal || null, minHoursCs25: minCs25 || null,
          minHoursCs23: minCs23 || null, minHoursPic: minPic || null,
          expiresInDays: duration, logoUrl: logoUrl || null,
          contactEmail: contact, posterId: user.id, posterName: user.name,
        }),
      })
      const d = await r.json()
      if (d.error) { setMsg({ text: d.error, ok: false }); return }
      setMsg({ text: '✓ Job posted — pending approval!', ok: true })
      onSuccess()
      timer.current = setTimeout(onClose, 1500)
    } catch {
      setMsg({ text: 'Network error — please try again.', ok: false })
    } finally {
      setLoading(false)
    }
  }

  const ta: React.CSSProperties = { ...inp, height: 'auto', resize: 'vertical', padding: '10px 12px' }
  const sel: React.CSSProperties = { ...inp, cursor: 'pointer' }
  const R = () => <span style={{ color: '#ff3b30', marginLeft: 1 }}>*</span>

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...card, width: 'min(520px, 95vw)', maxHeight: '90vh' }}>
        <div style={{ padding: '20px 22px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Post a pilot job</div>
            <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>Will be reviewed before going live</div>
          </div>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(118,118,128,0.15)', color: '#86868b', cursor: 'pointer', fontSize: 13 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 22px' }}>
          <div style={fg}>
            <label style={lbl}>Job title <R /></label>
            <input style={inp} value={title} onChange={e => setTitle(e.target.value)} placeholder="First Officer — B737" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Company <R /></label>
              <input style={inp} value={company} onChange={e => setCompany(e.target.value)} placeholder="Airline / Operator" />
            </div>
            <div>
              <label style={lbl}>Type <R /></label>
              <select style={sel} value={jobType} onChange={e => setJobType(e.target.value)}>
                {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Logo upload — optional */}
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Company logo <span style={{ color: '#aeaeb2', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— PNG/JPG, max 2 MB (optional)</span></label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: logoPreview ? 'rgba(10,132,255,0.05)' : 'rgba(118,118,128,0.08)', border: `1.5px dashed ${logoPreview ? '#0a84ff' : 'rgba(118,118,128,0.3)'}`, borderRadius: 10, cursor: 'pointer' }}>
              {logoPreview
                ? <img src={logoPreview} alt="logo" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.08)' }} />
                : <span style={{ fontSize: 22 }}>🏢</span>
              }
              <span style={{ fontSize: 13, color: logoPreview ? '#0a84ff' : '#86868b', fontWeight: logoPreview ? 500 : 400 }}>
                {logoUploading ? 'Uploading…' : logoPreview ? (logoFile?.name ?? 'Logo selected') : 'Click to upload logo'}
              </span>
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) pickLogo(f) }} />
              {logoPreview && (
                <button type="button" onClick={e => { e.preventDefault(); setLogoFile(null); setLogoPreview(null); setLogoUrl(null) }}
                  style={{ marginLeft: 'auto', width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'rgba(118,118,128,0.2)', color: '#86868b', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
              )}
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Base / Location <R /></label>
              <AirportPicker
                initialLabel={loc ? `${loc.icao} — ${loc.name}` : ''}
                hasValue={!!loc}
                onChange={setLoc}
                inputStyle={inp}
                placeholder="LFPG — Paris CDG"
              />
            </div>
            <div>
              <label style={lbl}>Salary range <R /></label>
              <input style={inp} value={salary} onChange={e => setSalary(e.target.value)} placeholder="€60K – €80K/yr" />
            </div>
          </div>

          <div style={fg}>
            <label style={lbl}>Region <R /></label>
            <select style={sel} value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">— Select —</option>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div style={fg}>
            <label style={lbl}>Description <R /></label>
            <textarea style={ta as any} rows={4} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Role overview, schedule, fleet type…" />
          </div>
          <div style={fg}>
            <label style={lbl}>Requirements <R /></label>
            <textarea style={ta as any} rows={3} value={reqs} onChange={e => setReqs(e.target.value)} placeholder="ATPL, 1500h TT, type rating…" />
          </div>

          {/* Minimum hours — below description */}
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Minimum hours required <R /></label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {([['Total TT', minTotal, setMinTotal], ['CS-25 (Transport)', minCs25, setMinCs25], ['CS-23 (GA)', minCs23, setMinCs23], ['PIC', minPic, setMinPic]] as [string, string, (v: string) => void][]).map(([label, val, set]) => (
                <div key={label}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{label}</div>
                  <input style={{ ...inp, height: 34 }} type="number" min={0} value={val} onChange={e => set(e.target.value)} placeholder="0 h" />
                </div>
              ))}
            </div>
          </div>

          <div style={fg}>
            <label style={lbl}>Contact email <R /></label>
            <input style={inp} type="email" value={contact} onChange={e => setContact(e.target.value)} placeholder="careers@company.com" />
          </div>
          <div style={fg}>
            <label style={lbl}>Listing duration <R /> <span style={{ color: '#aeaeb2', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— auto-removed after this delay, max 1 year</span></label>
            <select style={sel} value={duration} onChange={e => setDuration(e.target.value)}>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">6 months</option>
              <option value="365">1 year (max)</option>
            </select>
          </div>

          <button onClick={submit} disabled={loading}
            style={{ width: '100%', height: 50, background: '#0a84ff', border: 'none', borderRadius: 14, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, boxShadow: '0 4px 14px rgba(10,132,255,0.35)', marginTop: 4 }}>
            {loading ? 'Posting…' : 'Submit for approval'}
          </button>
          {msg && <div style={{ fontSize: 13, marginTop: 10, textAlign: 'center', color: msg.ok ? '#248a3d' : '#ff3b30' }}>{msg.text}</div>}
        </div>
      </div>
    </div>
  )
}

// ── Apply Modal ────────────────────────────────────────────────
function ApplyModal({ job, user, onClose }: { job: Job; user: User | null; onClose: () => void }) {
  const [name,        setName]        = useState(user?.name || '')
  const [email,       setEmail]       = useState(user?.email || '')
  const [cover,       setCover]       = useState('')
  const [cvFile,      setCvFile]      = useState<File | null>(null)
  const [cvUploading, setCvUploading] = useState(false)
  const [msg,         setMsg]         = useState<{ text: string; ok: boolean } | null>(null)
  const [loading,     setLoading]     = useState(false)
  const supabase = useMemo(() => createClient(), [])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const pickCV = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) { setMsg({ text: 'CV must be under 10 MB.', ok: false }); return }
    setCvFile(file); setCvUploading(true); setMsg(null)
    const path = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const { error } = await supabase.storage.from('cv-uploads').upload(path, file, { upsert: true, contentType: file.type })
    setCvUploading(false)
    if (error) { setMsg({ text: 'CV upload failed: ' + error.message, ok: false }); setCvFile(null) }
  }

  const submit = async () => {
    if (!name || !email || !cover) { setMsg({ text: 'Name, email and cover letter are required.', ok: false }); return }
    if (cvUploading) { setMsg({ text: 'Please wait for the CV to finish uploading.', ok: false }); return }
    setLoading(true); setMsg(null)

    let cvUrl: string | null = null
    if (cvFile) {
      const path = `${Date.now()}_${cvFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const { error: upErr } = await supabase.storage.from('cv-uploads').upload(path, cvFile, { upsert: true })
      if (upErr) { setMsg({ text: 'CV upload failed.', ok: false }); setLoading(false); return }
      const { data: { publicUrl } } = supabase.storage.from('cv-uploads').getPublicUrl(path)
      cvUrl = publicUrl
    }

    try {
      const r = await fetch('/api/jobs/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: job.id, applicantName: name, applicantEmail: email, coverLetter: cover, cvUrl }),
      })
      const d = await r.json()
      if (d.error) { setMsg({ text: d.error, ok: false }); return }
      setMsg({ text: '✓ Application sent! Good luck.', ok: true })
      timer.current = setTimeout(onClose, 2000)
    } catch {
      setMsg({ text: 'Network error — please try again.', ok: false })
    } finally {
      setLoading(false)
    }
  }

  const ta: React.CSSProperties = { ...inp, height: 'auto', resize: 'vertical', padding: '10px 12px' }

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...card, width: 'min(480px, 95vw)', maxHeight: '90vh' }}>
        <div style={{ padding: '20px 22px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Apply</div>
            <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>{job.title} · {job.company}</div>
          </div>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(118,118,128,0.15)', color: '#86868b', cursor: 'pointer', fontSize: 13 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px 22px' }}>
          {/* Job summary */}
          <div style={{ padding: '10px 14px', background: 'rgba(10,132,255,0.06)', borderRadius: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{job.title}</div>
            <div style={{ fontSize: 12, color: '#86868b', marginTop: 2 }}>{job.company} · {job.location} · {job.job_type}</div>
            {job.salary_range && <div style={{ fontSize: 12, color: '#0a84ff', fontWeight: 500, marginTop: 3 }}>{job.salary_range}</div>}
          </div>

          <div style={fg}>
            <label style={lbl}>Full name *</label>
            <input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" />
          </div>
          <div style={fg}>
            <label style={lbl}>Email *</label>
            <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div style={fg}>
            <label style={lbl}>Cover letter *</label>
            <textarea style={ta as any} rows={5} value={cover} onChange={e => setCover(e.target.value)}
              placeholder={`Dear ${job.company},\n\nI am writing to express my interest in the ${job.title} position…`} />
          </div>

          {/* CV upload */}
          <div style={fg}>
            <label style={lbl}>CV / Resume <span style={{ color: '#aeaeb2', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— PDF or Word, max 10 MB</span></label>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
              background: cvFile ? 'rgba(10,132,255,0.06)' : 'rgba(118,118,128,0.08)',
              border: `1.5px dashed ${cvFile ? '#0a84ff' : 'rgba(118,118,128,0.3)'}`,
              borderRadius: 10, cursor: 'pointer',
            }}>
              <span style={{ fontSize: 20 }}>{cvUploading ? '⏳' : cvFile ? '📄' : '📎'}</span>
              <span style={{ fontSize: 13, color: cvFile ? '#0a84ff' : '#86868b', fontWeight: cvFile ? 500 : 400 }}>
                {cvUploading ? 'Uploading…' : cvFile ? cvFile.name : 'Click to attach CV'}
              </span>
              <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) pickCV(f) }} />
            </label>
          </div>

          <button onClick={submit} disabled={loading || cvUploading}
            style={{ width: '100%', height: 50, background: '#0a84ff', border: 'none', borderRadius: 14, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: (loading || cvUploading) ? 'wait' : 'pointer', opacity: (loading || cvUploading) ? 0.7 : 1, boxShadow: '0 4px 14px rgba(10,132,255,0.35)', marginTop: 4 }}>
            {loading ? 'Sending…' : 'Send application'}
          </button>
          {msg && <div style={{ fontSize: 13, marginTop: 10, textAlign: 'center', color: msg.ok ? '#248a3d' : '#ff3b30' }}>{msg.text}</div>}
        </div>
      </div>
    </div>
  )
}

// ── Job detail modal ───────────────────────────────────────────
function JobModal({ job, user, onClose, onApply }: { job: Job; user: User | null; onClose: () => void; onApply: (j: Job) => void }) {
  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...card, width: 'min(580px, 95vw)', maxHeight: '90vh' }}>
        <div style={{ padding: '20px 22px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 14, flex: 1, paddingRight: 12 }}>
            {/* Company logo */}
            <div style={{ position: 'relative', width: 52, height: 52, borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.08)', background: 'rgba(118,118,128,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              {job.logo_url
                ? <Image src={job.logo_url} alt={job.company} fill sizes="52px" style={{ objectFit: 'contain', padding: 6 }} />
                : <span style={{ fontSize: 24, opacity: 0.3 }}>🏢</span>
              }
            </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>{job.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <span style={tagStyle('#0a84ff')}>{job.company}</span>
              <span style={tagStyle('#86868b')}>{job.location}</span>
              <span style={tagStyle('#248a3d')}>{job.job_type}</span>
              {job.function_title && <span style={tagStyle('#6e40c9')}>{job.function_title}</span>}
              {job.region         && <span style={tagStyle('#86868b')}>🌍 {job.region}</span>}
              {job.salary_range   && <span style={tagStyle('#b07800')}>💰 {job.salary_range}</span>}
            </div>
            {(job.min_hours_total || job.min_hours_cs25 || job.min_hours_cs23 || job.min_hours_pic) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {job.min_hours_total && <span style={tagStyle('#1d1d1f')}>TT ≥ {job.min_hours_total.toLocaleString()} h</span>}
                {job.min_hours_cs25  && <span style={tagStyle('#1d1d1f')}>CS-25 ≥ {job.min_hours_cs25.toLocaleString()} h</span>}
                {job.min_hours_cs23  && <span style={tagStyle('#1d1d1f')}>CS-23 ≥ {job.min_hours_cs23.toLocaleString()} h</span>}
                {job.min_hours_pic   && <span style={tagStyle('#1d1d1f')}>PIC ≥ {job.min_hours_pic.toLocaleString()} h</span>}
              </div>
            )}
          </div>
          </div>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(118,118,128,0.15)', color: '#86868b', cursor: 'pointer', fontSize: 13, flexShrink: 0 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Description</div>
          <div style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: 18 }}>{job.description}</div>

          {job.requirements && (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Requirements</div>
              <div style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: 18 }}>{job.requirements}</div>
            </>
          )}

          <button onClick={() => { onApply(job); onClose() }}
            style={{ width: '100%', height: 50, background: '#0a84ff', border: 'none', borderRadius: 14, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(10,132,255,0.35)' }}>
            Apply for this position
          </button>
        </div>
      </div>
    </div>
  )
}

function tagStyle(color: string): React.CSSProperties {
  return { fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: color + '18', color }
}

// ── Main JobTab ────────────────────────────────────────────────
type Props = { user: User | null; onAuthClick: () => void }

type Profile = {
  prevFunction: string
  totalHours:   string
  cs25Hours:    string
  cs23Hours:    string
  picHours:     string
  region:       string
}

export default function JobTab({ user, onAuthClick }: Props) {
  const [jobs,       setJobs]       = useState<Job[]>([])
  const [selJob,     setSelJob]     = useState<Job | null>(null)
  const [applyJob,   setApplyJob]   = useState<Job | null>(null)
  const [showPost,   setShowPost]   = useState(false)
  const [search,     setSearch]     = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('All')

  // "Find my perfect job" profile
  const [profile, setProfile] = useState<Profile>({
    prevFunction: '', totalHours: '', cs25Hours: '', cs23Hours: '', picHours: '', region: '',
  })
  const [matchMode, setMatchMode] = useState(false)

  useEffect(() => {
    fetch('/api/jobs')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.jobs) setJobs(d.jobs) })
      .catch(() => {})
  }, [])

  const refreshJobs = () => {
    fetch('/api/jobs')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.jobs) setJobs(d.jobs) })
      .catch(() => {})
  }

  const profileFilled = profile.totalHours || profile.prevFunction || profile.region

  const matchesProfile = (j: Job) => {
    if (profile.prevFunction && j.function_title && j.function_title !== profile.prevFunction) return false
    if (profile.region && j.region && j.region !== profile.region) return false
    if (profile.totalHours && j.min_hours_total && +profile.totalHours < j.min_hours_total) return false
    if (profile.cs25Hours  && j.min_hours_cs25  && +profile.cs25Hours  < j.min_hours_cs25)  return false
    if (profile.cs23Hours  && j.min_hours_cs23  && +profile.cs23Hours  < j.min_hours_cs23)  return false
    if (profile.picHours   && j.min_hours_pic   && +profile.picHours   < j.min_hours_pic)   return false
    return true
  }

  const filtered = jobs
    .filter(j => typeFilter === 'All' || j.job_type === typeFilter)
    .filter(j => {
      const q = search.toLowerCase()
      return !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)
    })
    .filter(j => !matchMode || matchesProfile(j))

  return (
    <>
      {selJob   && <JobModal   job={selJob}   user={user} onClose={() => setSelJob(null)}   onApply={j => { setSelJob(null); setApplyJob(j) }} />}
      {applyJob && <ApplyModal job={applyJob} user={user} onClose={() => setApplyJob(null)} />}
      {showPost && user && <PostJobModal user={user} onClose={() => setShowPost(false)} onSuccess={refreshJobs} />}

      <div style={{ position: 'fixed', inset: 0, top: 68, padding: 16, display: 'grid', gridTemplateColumns: '1fr 260px', gap: 16, background: '#f5f5f7' }}>

        {/* Main panel */}
        <div className="pp-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(255,255,255,0.9)', borderRadius: 20 }}>

          <div style={{ padding: '20px 22px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 2 }}>Pilot Jobs</div>
              <div style={{ fontSize: 13, color: '#86868b' }}>{filtered.length} position{filtered.length !== 1 ? 's' : ''} available</div>
            </div>
            <button onClick={() => user ? setShowPost(true) : onAuthClick()}
              style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, borderRadius: 100, padding: '0 16px', background: '#0a84ff', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              + Post a job
            </button>
          </div>

          {/* Filters */}
          <div style={{ padding: '10px 22px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 }}>
            {(['All', ...JOB_TYPES]).map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} style={{
                height: 30, padding: '0 13px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 12, fontWeight: 500,
                background: typeFilter === t ? '#0a84ff' : 'transparent',
                border: typeFilter === t ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                color: typeFilter === t ? '#fff' : '#1d1d1f',
              }}>{t}</button>
            ))}
            <div style={{ flex: 1 }} />
            <input value={search} placeholder="Search title, company…" onChange={e => setSearch(e.target.value)}
              style={{ width: 200, height: 30, fontSize: 12, borderRadius: 100, padding: '0 14px', border: '0.5px solid rgba(0,0,0,0.1)', background: 'transparent', fontFamily: 'inherit', color: '#1d1d1f' }} />
          </div>

          {/* Job list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px 14px' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#86868b' }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>✈</div>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>No positions yet</div>
                <div style={{ fontSize: 13 }}>Be the first to post a pilot job</div>
                <button onClick={() => user ? setShowPost(true) : onAuthClick()}
                  style={{ marginTop: 18, height: 38, padding: '0 22px', borderRadius: 12, background: '#0a84ff', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  + Post a job
                </button>
              </div>
            ) : filtered.map(j => (
              <div key={j.id} onClick={() => setSelJob(j)}
                style={{ padding: '14px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'start' }}>
                {/* Logo */}
                <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 10, border: '0.5px solid rgba(0,0,0,0.08)', background: 'rgba(118,118,128,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, marginTop: 2 }}>
                  {j.logo_url
                    ? <Image src={j.logo_url} alt={j.company} fill sizes="44px" style={{ objectFit: 'contain', padding: 4 }} />
                    : <span style={{ fontSize: 20, opacity: 0.3 }}>🏢</span>
                  }
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 5 }}>{j.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 6 }}>
                    <span style={tagStyle('#0a84ff')}>{j.company}</span>
                    <span style={tagStyle('#86868b')}>{j.location}</span>
                    <span style={tagStyle('#248a3d')}>{j.job_type}</span>
                    {j.function_title && <span style={tagStyle('#6e40c9')}>{j.function_title}</span>}
                    {j.region        && <span style={tagStyle('#86868b')}>🌍 {j.region}</span>}
                    {j.salary_range  && <span style={tagStyle('#b07800')}>💰 {j.salary_range}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#86868b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {j.description}
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); user ? setApplyJob(j) : onAuthClick() }}
                  style={{ height: 34, padding: '0 16px', borderRadius: 10, background: '#0a84ff', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* ── Find my perfect job ── */}
          <div className="pp-panel" style={{ padding: 18, background: 'rgba(255,255,255,0.9)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 2 }}>✦ Find my perfect job</div>
            <div style={{ fontSize: 11, color: '#86868b', marginBottom: 14 }}>Enter your profile to find matching positions</div>

            {/* Previous function */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Previous function</div>
              <select
                value={profile.prevFunction}
                onChange={e => setProfile(p => ({ ...p, prevFunction: e.target.value }))}
                style={{ width: '100%', height: 34, background: 'rgba(118,118,128,0.08)', border: 'none', borderRadius: 9, fontFamily: 'inherit', fontSize: 13, padding: '0 10px', color: '#1d1d1f' }}>
                <option value="">— Any —</option>
                {FUNCTIONS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>

            {/* Region */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Preferred region</div>
              <select
                value={profile.region}
                onChange={e => setProfile(p => ({ ...p, region: e.target.value }))}
                style={{ width: '100%', height: 34, background: 'rgba(118,118,128,0.08)', border: 'none', borderRadius: 9, fontFamily: 'inherit', fontSize: 13, padding: '0 10px', color: '#1d1d1f' }}>
                <option value="">— Any —</option>
                {REGIONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            {/* Hours grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 14 }}>
              {([
                ['Total TT (h)',     'totalHours'],
                ['CS-25 (h)',        'cs25Hours'],
                ['CS-23 (h)',        'cs23Hours'],
                ['PIC (h)',          'picHours'],
              ] as [string, keyof Profile][]).map(([label, key]) => (
                <div key={key}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>{label}</div>
                  <input
                    type="number" min={0} value={profile[key]}
                    onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                    placeholder="0"
                    style={{ width: '100%', height: 32, background: 'rgba(118,118,128,0.08)', border: 'none', borderRadius: 8, fontFamily: 'inherit', fontSize: 13, padding: '0 8px', color: '#1d1d1f', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>

            <button
              onClick={() => setMatchMode(m => !m)}
              style={{
                width: '100%', height: 40, borderRadius: 12, border: 'none', fontFamily: 'inherit',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: matchMode ? '#0a84ff' : 'rgba(10,132,255,0.1)',
                color: matchMode ? '#fff' : '#0a84ff',
                transition: 'all 0.15s',
              }}>
              {matchMode ? `✓ Showing ${filtered.length} match${filtered.length !== 1 ? 'es' : ''}` : '✦ Find matching jobs'}
            </button>
            {matchMode && (
              <button onClick={() => setMatchMode(false)} style={{ width: '100%', marginTop: 6, height: 30, borderRadius: 8, border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 12, color: '#86868b', cursor: 'pointer' }}>
                Clear filter
              </button>
            )}
          </div>

          {/* Quick stats */}
          <div className="pp-panel" style={{ padding: 18, background: 'rgba(255,255,255,0.9)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>Market</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { l: 'Open',      v: jobs.length.toString(),                                        c: '#0a84ff' },
                { l: 'Full-time', v: jobs.filter(j => j.job_type === 'Full-time').length.toString(), c: '#248a3d' },
                { l: 'Contract',  v: jobs.filter(j => j.job_type === 'Contract').length.toString(),  c: '#ff9f0a' },
                { l: 'Charter',   v: jobs.filter(j => j.job_type === 'Charter').length.toString(),   c: '#ff3b30' },
              ].map(({ l, v, c }) => (
                <div key={l} style={{ background: 'rgba(118,118,128,0.07)', borderRadius: 11, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: '#86868b', marginBottom: 3 }}>{l}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', color: c }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {!user && (
            <div className="pp-panel" style={{ padding: 18, textAlign: 'center', background: 'rgba(255,255,255,0.9)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>🔒</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f', marginBottom: 4 }}>Sign in</div>
              <div style={{ fontSize: 12, color: '#86868b', marginBottom: 12 }}>to post a job or apply</div>
              <button onClick={onAuthClick} style={{ height: 34, padding: '0 18px', borderRadius: 10, background: '#0a84ff', border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Sign in</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
