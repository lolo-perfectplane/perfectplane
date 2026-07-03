// src/app/api/wind/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

const CACHE_TTL_MS = 6 * 60 * 60 * 1000

// FL350 only — this is the one pressure level (250hPa) Open-Meteo
// reliably returns jet-stream-relevant data for. Other levels were
// silently failing or returning stale/zeroed data, which is why
// wind direction looked stuck at ~270° everywhere.
const FL = 'FL350'
const HPA = 250

// Smaller grid (20° steps instead of 10°) — keeps the request well
// under Open-Meteo's per-call coordinate limit so it actually
// succeeds instead of silently truncating most points.
const LATS: number[] = []
const LONS: number[] = []
for (let la = -80; la <= 80; la += 20) LATS.push(la)
for (let lo = -180; lo < 180; lo += 20) LONS.push(lo)

type WindPoint = { lat: number; lon: number; u: number; v: number; spd: number }

async function fetchWind(): Promise<WindPoint[]> {
  const allLats: number[] = []
  const allLons: number[] = []
  LATS.forEach(la => LONS.forEach(lo => { allLats.push(la); allLons.push(lo) }))

  const speedVar = `wind_speed_${HPA}hPa`
  const dirVar   = `wind_direction_${HPA}hPa`

  const url =
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${allLats.join(',')}&longitude=${allLons.join(',')}&` +
    `hourly=${speedVar},${dirVar}&` +
    `forecast_days=1&timeformat=unixtime&timezone=GMT`

  const r = await fetch(url, { next: { revalidate: 0 } })
  if (!r.ok) throw new Error(`Open-Meteo HTTP ${r.status}`)

  const data = await r.json()
  if (data.error) throw new Error(data.reason || `Open-Meteo error for ${HPA}hPa`)

  const pts = Array.isArray(data) ? data : [data]
  const now = Math.floor(Date.now() / 1000)

  const results: WindPoint[] = []
  pts.forEach((pt: any, i: number) => {
    const ts = (pt?.hourly?.time) || []
    const sp = (pt?.hourly?.[speedVar]) || []
    const dr = (pt?.hourly?.[dirVar]) || []

    // Skip points where the API genuinely returned nothing —
    // don't fabricate a 0°/0kt entry, which is what was causing
    // the uniform "270°" artifact.
    if (ts.length === 0 || sp.length === 0) return

    let best = 0, bd = Infinity
    ts.forEach((t: number, j: number) => {
      const dd = Math.abs(t - now)
      if (dd < bd) { bd = dd; best = j }
    })

    const rawSpd = sp[best]
    const rawDir = dr[best]
    if (rawSpd == null || rawDir == null) return

    const spd = rawSpd * 0.539957 // km/h -> kt
    const rad = (rawDir + 180) * Math.PI / 180
    results.push({
      lat: allLats[i],
      lon: allLons[i],
      u: spd * Math.sin(rad),
      v: spd * Math.cos(rad),
      spd,
    })
  })
  return results
}

export async function GET(req: NextRequest) {
  const cacheKey = `wind_fl350_${HPA}hpa`
  const supabase = createServerClient()

  try {
    const { data: cached } = await supabase
      .from('app_cache')
      .select('value, updated_at')
      .eq('key', cacheKey)
      .single()

    const now      = Date.now()
    const cacheAge = cached ? now - new Date(cached.updated_at).getTime() : Infinity

    if (cached && cacheAge < CACHE_TTL_MS) {
      return NextResponse.json({
        points: cached.value, fl: FL, hPa: HPA, cached: true,
        age_minutes: Math.round(cacheAge / 60000),
        next_refresh_minutes: Math.round((CACHE_TTL_MS - cacheAge) / 60000),
      })
    }

    const points = await fetchWind()
    const totalRequested = LATS.length * LONS.length
    const coverage = points.length / totalRequested

    // Interpolation tolerates gaps now, so only fail outright if the
    // response is too sparse to be meaningful (e.g. provider outage).
    if (points.length < 12) {
      throw new Error(`Insufficient wind data returned (${points.length}/${totalRequested} points) — provider may be unavailable`)
    }

    await supabase.from('app_cache').upsert({
      key: cacheKey, value: points,
      updated_at: new Date().toISOString(),
    })

    return NextResponse.json({
      points, fl: FL, hPa: HPA, cached: false,
      age_minutes: 0,
      coverage: Math.round(coverage * 100),
      next_refresh_minutes: Math.round(CACHE_TTL_MS / 60000),
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg, fl: FL, hPa: HPA }, { status: 500 })
  }
}
