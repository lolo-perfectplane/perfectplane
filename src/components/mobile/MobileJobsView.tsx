'use client'
// src/components/mobile/MobileJobsView.tsx
import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import type { Job } from '@/components/ui/JobTab'
import { PostJobModal } from '@/components/ui/JobTab'

type User = { id: string; name: string; email: string; role: string }

const FUNCTIONS = ['Ab Initio', 'First Officer', 'Senior First Officer', 'Captain', 'TRI', 'TRE']
const REGIONS   = ['Europe', 'North America', 'South America', 'Asia', 'Middle East', 'Africa', 'Oceania']
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Seasonal', 'Charter']

type Profile = {
  prevFunction: string; totalHours: string; cs25Hours: string
  cs23Hours: string; picHours: string; region: string
}

// ── Apply Modal (inline, sheet-style on mobile) ────────────────
function ApplySheet({ job, user, onClose }: { job: Job; user: User | null; onClose: () => void }) {
  const [name,    setName]    = useState(user?.name  || '')
  const [email,   setEmail]   = useState(user?.email || '')
  const [cover,   setCover]   = useState('')
  const [cvFile,  setCvFile]  = useState<File | null>(null)
  const [cvUpBusy,setCvUpBusy]= useState(false)
  const [msg,     setMsg]     = useState<{ text: string; ok: boolean } | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = useMemo(() => createClient(), [])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const pickCV = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) { setMsg({ text: 'CV must be under 10 MB.', ok: false }); return }
    setCvFile(file); setCvUpBusy(true); setMsg(null)
    const path = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const { error } = await supabase.storage.from('cv-uploads').upload(path, file, { upsert: true, contentType: file.type })
    setCvUpBusy(false)
    if (error) { setMsg({ text: 'CV upload failed.', ok: false }); setCvFile(null) }
  }

  const submit = async () => {
    if (!name || !email || !cover) { setMsg({ text: 'Name, email and cover letter are required.', ok: false }); return }
    if (cvUpBusy) { setMsg({ text: 'Please wait for the CV to finish uploading.', ok: false }); return }
    setLoading(true); setMsg(null)
    let cvUrl: string | null = null
    if (cvFile) {
      const path = `${Date.now()}_${cvFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const { data } = await supabase.storage.from('cv-uploads').upload(path, cvFile, { upsert: true, contentType: cvFile.type })
      if (data) cvUrl = supabase.storage.from('cv-uploads').getPublicUrl(data.path).data.publicUrl
    }
    try {
      const r = await fetch('/api/jobs/apply', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: job.id, applicantName: name, applicantEmail: email, coverLetter: cover, cvUrl }),
      })
      const d = await r.json()
      if (d.error) { setMsg({ text: d.error, ok: false }); return }
      setMsg({ text: '✓ Application sent!', ok: true })
      timer.current = setTimeout(onClose, 1500)
    } catch { setMsg({ text: 'Network error.', ok: false }) }
    finally { setLoading(false) }
  }

  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', height: 44, padding: '0 14px', borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.1)', background: 'rgba(118,118,128,0.07)', fontFamily: 'inherit', fontSize: 16, outline: 'none', color: '#1d1d1f' }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.45)' }} />
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 301, maxHeight: '90vh', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(40px)', borderRadius: '20px 20px 0 0', display: 'flex', flexDirection: 'column', boxShadow: '0 -4px 40px rgba(0,0,0,0.18)' }}>
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
        </div>
        <div style={{ flexShrink: 0, padding: '10px 20px 12px', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Apply — {job.title}</div>
          <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>{job.company}</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input style={inp} value={name}  onChange={e => setName(e.target.value)}  placeholder="Full name *" />
          <input style={inp} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email *" type="email" />
          <textarea value={cover} onChange={e => setCover(e.target.value)} placeholder="Cover letter *" rows={5}
            style={{ ...inp, height: 'auto', padding: '12px 14px', resize: 'vertical' } as React.CSSProperties} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: '0.5px dashed rgba(0,0,0,0.18)', cursor: 'pointer', color: '#0a84ff', fontSize: 14, fontWeight: 500 }}>
            {cvUpBusy ? '⏳ Uploading…' : cvFile ? `✓ ${cvFile.name}` : '📎 Attach CV (PDF, max 10 MB)'}
            <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && pickCV(e.target.files[0])} />
          </label>
        </div>
        <div style={{ flexShrink: 0, padding: '12px 20px', paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}>
          <button onClick={submit} disabled={loading}
            style={{ width: '100%', height: 52, borderRadius: 14, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Sending…' : 'Send application'}
          </button>
          {msg && <div style={{ fontSize: 13, marginTop: 8, textAlign: 'center', color: msg.ok ? '#248a3d' : '#ff3b30' }}>{msg.text}</div>}
        </div>
      </div>
    </>
  )
}

// ── Profile / "Find my perfect job" sheet ─────────────────────
function ProfileSheet({ open, onClose, profile, setProfile, matchMode, setMatchMode, matchCount }: {
  open: boolean; onClose: () => void
  profile: Profile; setProfile: (p: Profile) => void
  matchMode: boolean; setMatchMode: (v: boolean) => void
  matchCount: number
}) {
  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', height: 42, padding: '0 12px', borderRadius: 11, border: 'none', background: 'rgba(118,118,128,0.1)', fontFamily: 'inherit', fontSize: 16, color: '#1d1d1f', outline: 'none' }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.4)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.3s' }} />
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 201, maxHeight: '85vh', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(50px) saturate(180%)', borderRadius: '20px 20px 0 0', display: 'flex', flexDirection: 'column', boxShadow: '0 -4px 40px rgba(0,0,0,0.18)', transform: open ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease-out' }}>
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
        </div>
        <div style={{ flexShrink: 0, padding: '10px 20px 12px', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>✦ Find my perfect job</div>
          <div style={{ fontSize: 13, color: '#86868b', marginTop: 2 }}>Enter your profile to match positions</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Previous function</div>
            <select value={profile.prevFunction} onChange={e => setProfile({ ...profile, prevFunction: e.target.value })} style={inp}>
              <option value="">— Any —</option>
              {FUNCTIONS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Preferred region</div>
            <select value={profile.region} onChange={e => setProfile({ ...profile, region: e.target.value })} style={inp}>
              <option value="">— Any —</option>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Flight hours</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {([['Total TT (h)', 'totalHours'], ['CS-25 (h)', 'cs25Hours'], ['CS-23 (h)', 'cs23Hours'], ['PIC (h)', 'picHours']] as [string, keyof Profile][]).map(([label, key]) => (
                <div key={key}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{label}</div>
                  <input type="number" min={0} value={profile[key]}
                    onChange={e => setProfile({ ...profile, [key]: e.target.value })}
                    placeholder="0"
                    style={{ ...inp, height: 38 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flexShrink: 0, padding: '14px 20px', paddingBottom: 'max(20px, env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => { setMatchMode(true); onClose() }}
            style={{ width: '100%', height: 52, borderRadius: 14, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
            ✦ Show {matchCount} matching job{matchCount !== 1 ? 's' : ''}
          </button>
          {matchMode && (
            <button onClick={() => { setMatchMode(false); onClose() }}
              style={{ width: '100%', height: 40, borderRadius: 12, border: 'none', background: 'transparent', color: '#86868b', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer' }}>
              Clear filter
            </button>
          )}
        </div>
      </div>
    </>
  )
}

// ── Job detail sheet ───────────────────────────────────────────
function JobDetailSheet({ job, user, onClose, onApply }: { job: Job; user: User | null; onClose: () => void; onApply: () => void }) {
  const tag = (color: string, text: string) => (
    <span key={text} style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: 8, background: `${color}18`, color, fontSize: 12, fontWeight: 500 }}>{text}</span>
  )
  const hoursRow = (label: string, val: number | null) => val ? (
    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
      <span style={{ fontSize: 13, color: '#86868b' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{val.toLocaleString()} h</span>
    </div>
  ) : null

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.45)' }} />
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 301, maxHeight: '90vh', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(40px)', borderRadius: '20px 20px 0 0', display: 'flex', flexDirection: 'column', boxShadow: '0 -4px 40px rgba(0,0,0,0.18)' }}>
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 8px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <div style={{ position: 'relative', width: 48, height: 48, borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.08)', background: 'rgba(118,118,128,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              {job.logo_url
                ? <Image src={job.logo_url} alt={job.company} fill sizes="48px" style={{ objectFit: 'contain', padding: 6 }} />
                : <span style={{ fontSize: 22, opacity: 0.3 }}>🏢</span>
              }
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{job.title}</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {tag('#0a84ff', job.company)}
            {tag('#86868b', job.location)}
            {tag('#248a3d', job.job_type)}
            {job.function_title && tag('#6e40c9', job.function_title)}
            {job.region && tag('#86868b', `🌍 ${job.region}`)}
            {job.salary_range && tag('#b07800', `💰 ${job.salary_range}`)}
          </div>
          <div style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, marginBottom: 16, whiteSpace: 'pre-wrap' }}>{job.description}</div>
          {job.requirements && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Requirements</div>
              <div style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{job.requirements}</div>
            </div>
          )}
          {(job.min_hours_total || job.min_hours_cs25 || job.min_hours_cs23 || job.min_hours_pic) && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Min. hours</div>
              {hoursRow('Total TT', job.min_hours_total)}
              {hoursRow('CS-25', job.min_hours_cs25)}
              {hoursRow('CS-23', job.min_hours_cs23)}
              {hoursRow('PIC', job.min_hours_pic)}
            </div>
          )}
          <div style={{ fontSize: 12, color: '#86868b', marginBottom: 8 }}>Posted by {job.poster_name}</div>
        </div>
        <div style={{ flexShrink: 0, padding: '12px 20px', paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}>
          <button onClick={onApply}
            style={{ width: '100%', height: 52, borderRadius: 14, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
            Apply for this position
          </button>
        </div>
      </div>
    </>
  )
}

// ── Market overview card ───────────────────────────────────────
function MarketOverview({ jobs }: { jobs: Job[] }) {
  const byFunc = FUNCTIONS.reduce<Record<string, number>>((acc, f) => {
    acc[f] = jobs.filter(j => j.function_title === f).length
    return acc
  }, {})
  const topFuncs = Object.entries(byFunc).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]).slice(0, 4)

  return (
    <div style={{ margin: '0 16px 12px', padding: '14px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.9)', border: '0.5px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 10 }}>
        Market overview · <span style={{ color: '#0a84ff' }}>{jobs.length}</span> open position{jobs.length !== 1 ? 's' : ''}
      </div>
      {topFuncs.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {topFuncs.map(([func, count]) => {
            const pct = Math.round((count / jobs.length) * 100)
            return (
              <div key={func}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: '#1d1d1f', fontWeight: 500 }}>{func}</span>
                  <span style={{ color: '#86868b' }}>{count} · {pct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(118,118,128,0.12)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: '#0a84ff', borderRadius: 2 }} />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{ fontSize: 13, color: '#86868b' }}>No positions yet</div>
      )}
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────
export default function MobileJobsView({ user, onAuthClick, TAB_H, HDR_H }: {
  user: User | null; onAuthClick: () => void; TAB_H: number; HDR_H: number
}) {
  const [jobs,       setJobs]       = useState<Job[]>([])
  const [selJob,     setSelJob]     = useState<Job | null>(null)
  const [applyJob,   setApplyJob]   = useState<Job | null>(null)
  const [showPost,   setShowPost]   = useState(false)
  const [search,     setSearch]     = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [profileOpen,setProfileOpen]= useState(false)
  const [matchMode,  setMatchMode]  = useState(false)
  const [profile,    setProfile]    = useState<Profile>({ prevFunction: '', totalHours: '', cs25Hours: '', cs23Hours: '', picHours: '', region: '' })

  const fetchJobs = () => {
    fetch('/api/jobs').then(r => r.ok ? r.json() : null).then(d => { if (d?.jobs) setJobs(d.jobs) }).catch(() => {})
  }
  useEffect(() => { fetchJobs() }, [])

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
    .filter(j => { const q = search.toLowerCase(); return !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) })
    .filter(j => !matchMode || matchesProfile(j))

  const matchCount = jobs.filter(matchesProfile).length

  const tag = (color: string, text: string) => (
    <span key={text} style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 7, background: `${color}15`, color, fontSize: 11, fontWeight: 500 }}>{text}</span>
  )

  return (
    <>
      {/* Modals rendered on top of everything */}
      {selJob && (
        <JobDetailSheet job={selJob} user={user} onClose={() => setSelJob(null)}
          onApply={() => { user ? setApplyJob(selJob) : onAuthClick(); setSelJob(null) }} />
      )}
      {applyJob && <ApplySheet job={applyJob} user={user} onClose={() => setApplyJob(null)} />}

      {/* Profile / find my perfect job sheet */}
      <ProfileSheet
        open={profileOpen} onClose={() => setProfileOpen(false)}
        profile={profile} setProfile={setProfile}
        matchMode={matchMode} setMatchMode={setMatchMode}
        matchCount={matchCount}
      />

      <div style={{ position: 'fixed', inset: 0, paddingTop: 58, paddingBottom: TAB_H, background: '#f5f5f7', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <div style={{ flexShrink: 0, padding: '12px 16px 10px' }}>
          {matchMode && (
            <div style={{ fontSize: 12, color: '#86868b' }}>
              <b style={{ color: '#0a84ff' }}>{filtered.length}</b> match{filtered.length !== 1 ? 'es' : ''} for your profile
            </div>
          )}
        </div>

        {/* Search bar */}
        <div style={{ flexShrink: 0, padding: '0 16px 8px' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#86868b', fontSize: 15, pointerEvents: 'none' }}>⌕</span>
            <input value={search} placeholder="Search title, company…" onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', height: 40, padding: '0 14px 0 34px', borderRadius: 12, border: 'none', background: 'rgba(118,118,128,0.12)', fontFamily: 'inherit', fontSize: 16, outline: 'none' }} />
          </div>
        </div>

        {/* Type filter chips */}
        <div style={{ flexShrink: 0, padding: '0 16px 10px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {(['All', ...JOB_TYPES]).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              style={{ height: 30, padding: '0 14px', borderRadius: 100, border: typeFilter === t ? 'none' : '0.5px solid rgba(0,0,0,0.12)', background: typeFilter === t ? '#0a84ff' : 'transparent', color: typeFilter === t ? '#fff' : '#1d1d1f', fontSize: 12, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {t}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>

          {/* Market overview — always shown at top */}
          <MarketOverview jobs={jobs} />

          {/* Match mode badge */}
          {matchMode && (
            <div style={{ margin: '0 16px 10px', padding: '10px 14px', borderRadius: 12, background: 'rgba(10,132,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#0a84ff', fontWeight: 500 }}>✓ Filtered for your profile</span>
              <button onClick={() => setMatchMode(false)} style={{ background: 'none', border: 'none', color: '#0a84ff', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Clear</button>
            </div>
          )}

          {/* Job list */}
          <div style={{ padding: '0 16px 100px' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#86868b' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>✈</div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>No positions found</div>
                <div style={{ fontSize: 13 }}>{matchMode ? 'Try adjusting your profile' : 'Check back soon'}</div>
              </div>
            ) : filtered.map(j => (
              <div key={j.id} onClick={() => setSelJob(j)}
                style={{ background: '#fff', borderRadius: 16, border: '0.5px solid rgba(0,0,0,0.06)', padding: '14px 14px 12px', marginBottom: 10, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 7, alignItems: 'flex-start' }}>
                  {/* Logo */}
                  <div style={{ position: 'relative', width: 40, height: 40, borderRadius: 10, border: '0.5px solid rgba(0,0,0,0.08)', background: 'rgba(118,118,128,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                    {j.logo_url
                      ? <Image src={j.logo_url} alt={j.company} fill sizes="40px" style={{ objectFit: 'contain', padding: 4 }} />
                      : <span style={{ fontSize: 18, opacity: 0.3 }}>🏢</span>
                    }
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', flex: 1, marginTop: 2 }}>{j.title}</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                  {tag('#0a84ff', j.company)}
                  {tag('#86868b', j.location)}
                  {tag('#248a3d', j.job_type)}
                  {j.function_title && tag('#6e40c9', j.function_title)}
                  {j.salary_range  && tag('#b07800', `💰 ${j.salary_range}`)}
                </div>
                <div style={{ fontSize: 13, color: '#86868b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 10 }}>
                  {j.description}
                </div>
                <button onClick={e => { e.stopPropagation(); user ? setApplyJob(j) : onAuthClick() }}
                  style={{ width: '100%', height: 38, borderRadius: 10, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                  Apply
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>


      {/* Post job modal */}
      {showPost && user && (
        <PostJobModal user={user} onClose={() => setShowPost(false)} onSuccess={() => { setShowPost(false); fetchJobs() }} />
      )}

      {/* Post job FAB */}
      <button
        onClick={() => user ? setShowPost(true) : onAuthClick()}
        style={{ position: 'fixed', bottom: `calc(${TAB_H}px + 15px)`, right: 20, width: 49, height: 49, borderRadius: 15, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 26, cursor: 'pointer', boxShadow: '0 4px 16px rgba(10,132,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
        title="Post a job"
      >
        <span style={{ marginBottom: '6%' }}>+</span>
      </button>

      {/* Floating "Find my perfect job" pill — above tab bar */}
      <button
        onClick={() => setProfileOpen(true)}
        style={{
          position: 'fixed',
          bottom: TAB_H + 16,
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 50,
          height: 48, padding: '0 24px',
          borderRadius: 24, border: 'none',
          background: matchMode ? '#34c759' : '#1d1d1f',
          color: '#fff', fontSize: 14, fontWeight: 600,
          fontFamily: 'inherit', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: matchMode ? '0 4px 20px rgba(52,199,89,0.4)' : '0 4px 20px rgba(0,0,0,0.35)',
          whiteSpace: 'nowrap',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
      >
        {matchMode ? `✓ ${filtered.length} match${filtered.length !== 1 ? 'es' : ''}` : '✦ Find my perfect job'}
      </button>
    </>
  )
}
