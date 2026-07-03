'use client'
// src/components/globe/GlobeMap.tsx
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

type Airport  = { ic: string; la: number; lo: number }
type WindPoint = { lat: number; lon: number; u: number; v: number; spd: number }
type WindUV   = WindPoint[] | null

type ListingDot = { lon: number; lat: number; model: string; price: number | null }

type Props = {
  homeAp:            { lat: number; lon: number; icao: string } | null
  routeDest:         { lat: number; lon: number; icao: string } | null
  selACRange:        number | null
  windBR:            number[] | null
  windUV:            WindUV
  reachableAirports: Airport[]
  allAirports:       Airport[]
  showWind:          boolean
  windParticles:     any[]
  onMapLoad:         (map: mapboxgl.Map) => void
  active?:           boolean
  listingDots?:      ListingDot[]
}

// ── Wind field grid ───────────────────────────────────────────
// We store a full grid of u,v values per lat/lon cell.
// This lets particles follow the actual wind direction at their position.
type WindGrid = { u: number[][]; v: number[][]; spd: number[][] }
// Grid resolution: 5° steps → 37 lat × 72 lon
const GLATS: number[] = []
const GLONS: number[] = []
for (let la = -85; la <= 85; la += 5) GLATS.push(la)
for (let lo = -180; lo < 180; lo += 5) GLONS.push(lo)

// Sample wind at any lat/lon via bilinear interpolation of the grid
function windAt(grid: WindGrid, lat: number, lon: number): { u: number; v: number; spd: number } {
  const nLat = GLATS.length, nLon = GLONS.length
  // Clamp lat
  const clat = Math.max(GLATS[0], Math.min(GLATS[nLat - 1], lat))
  // Normalize lon to [-180,175]
  let clon = ((lon + 180) % 360 + 360) % 360 - 180

  // Find surrounding grid indices — clamp to last valid bracket so values at
  // the boundary (e.g. lat=85, lon=175) don't fall through to index 0
  let iLat = nLat - 2, iLon = nLon - 2
  for (let i = 0; i < nLat - 1; i++) if (GLATS[i] <= clat && clat <= GLATS[i + 1]) { iLat = i; break }
  for (let j = 0; j < nLon - 1; j++) if (GLONS[j] <= clon && clon <= GLONS[j + 1]) { iLon = j; break }

  const tLat = (clat - GLATS[iLat]) / (GLATS[iLat + 1] - GLATS[iLat])
  const tLon = (clon - GLONS[iLon]) / (GLONS[iLon + 1] - GLONS[iLon])

  // Bilinear interpolation
  const interp = (g: number[][]) =>
    g[iLat][iLon]     * (1 - tLat) * (1 - tLon) +
    g[iLat][iLon + 1] * (1 - tLat) * tLon +
    g[iLat + 1][iLon] * tLat       * (1 - tLon) +
    g[iLat + 1][iLon + 1] * tLat   * tLon

  const u = interp(grid.u)
  const v = interp(grid.v)
  return { u, v, spd: Math.sqrt(u * u + v * v) }
}

// ── Particle ──────────────────────────────────────────────────
// Particles live in geo-space only. Each frame we project the
// CURRENT position once and draw a short directional stroke there.
// We NEVER draw from old-position to new-position, which eliminates
// all antimeridian and back-of-globe rendering artifacts.
type Particle = { lat: number; lon: number; age: number; maxAge: number }

const PARTICLE_COUNT = 3000
const MIN_SPEED_KT   = 30   // hide winds below this threshold

// Speed → color ramp: cyan (slow) → green → yellow → orange → red (fast)
function windColor(spd: number, alpha: number): string {
  let r: number, g: number, b: number
  if (spd < 50) {
    const t = (spd - 30) / 20
    r = 0; g = Math.round(200 + t * 55); b = Math.round(255 - t * 255)
  } else if (spd < 80) {
    const t = (spd - 50) / 30
    r = Math.round(t * 255); g = 255; b = 0
  } else if (spd < 120) {
    const t = (spd - 80) / 40
    r = 255; g = Math.round(255 - t * 180); b = 0
  } else {
    r = 255; g = Math.round(Math.max(0, 75 - (spd - 120) * 3)); b = 0
  }
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`
}

function makeParticle(startAge = -1): Particle {
  const sinLat = Math.random() * 2 - 1
  return {
    lat:    Math.asin(sinLat) * 180 / Math.PI,
    lon:    Math.random() * 360 - 180,
    age:    startAge < 0 ? Math.floor(Math.random() * 60) : 0,
    maxAge: 70 + Math.floor(Math.random() * 110),
  }
}

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => makeParticle())
}

// ── Geo helpers ───────────────────────────────────────────────
function geodesicCircle(lat: number, lon: number, radiusNm: number, steps = 128): [number, number][] {
  // Proper spherical destination formula — works correctly at all latitudes including poles
  const angDist = (radiusNm / 60) * Math.PI / 180  // angular distance in radians
  const latR    = lat * Math.PI / 180
  const lonR    = lon * Math.PI / 180
  const coords: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const brg   = (i / steps) * 2 * Math.PI
    const dLat  = Math.asin(
      Math.sin(latR) * Math.cos(angDist) +
      Math.cos(latR) * Math.sin(angDist) * Math.cos(brg)
    )
    const dLon  = lonR + Math.atan2(
      Math.sin(brg) * Math.sin(angDist) * Math.cos(latR),
      Math.cos(angDist) - Math.sin(latR) * Math.sin(dLat)
    )
    coords.push([dLon * 180 / Math.PI, dLat * 180 / Math.PI])
  }
  return coords
}

function directionalRing(lat: number, lon: number, br: number[]): [number, number][] {
  // Proper spherical destination formula for directional wind ring
  const N    = br.length
  const latR = lat * Math.PI / 180
  const lonR = lon * Math.PI / 180
  const coords: [number, number][] = []
  for (let i = 0; i <= 360; i++) {
    const bDeg    = (i / 360) * 360
    const idx     = bDeg / (360 / N)
    const i0      = Math.floor(idx) % N
    const i1      = (i0 + 1) % N
    const fr      = idx - Math.floor(idx)
    const nm      = br[i0] * (1 - fr) + br[i1] * fr
    const angDist = (nm / 60) * Math.PI / 180
    const brg     = bDeg * Math.PI / 180
    const dLat    = Math.asin(
      Math.sin(latR) * Math.cos(angDist) +
      Math.cos(latR) * Math.sin(angDist) * Math.cos(brg)
    )
    const dLon    = lonR + Math.atan2(
      Math.sin(brg) * Math.sin(angDist) * Math.cos(latR),
      Math.cos(angDist) - Math.sin(latR) * Math.sin(dLat)
    )
    coords.push([dLon * 180 / Math.PI, dLat * 180 / Math.PI])
  }
  return coords
}

// ── Listing dots helper ───────────────────────────────────────
function dotsToGeoJSON(dots: ListingDot[]): GeoJSON.FeatureCollection {
  const JITTER = 0.025
  const groups = new Map<string, ListingDot[]>()
  for (const d of dots) {
    const key = `${d.lat.toFixed(2)},${d.lon.toFixed(2)}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(d)
  }
  const features: GeoJSON.Feature[] = []
  groups.forEach(group => {
    group.forEach((dot, i) => {
      let lon = dot.lon, lat = dot.lat
      if (group.length > 1) {
        const angle = (i / group.length) * 2 * Math.PI
        lon += JITTER * Math.cos(angle)
        lat += JITTER * Math.sin(angle)
      }
      const price = dot.price
        ? (dot.price >= 1_000_000 ? `$${(dot.price / 1_000_000).toFixed(1)}M` : `$${Math.round(dot.price / 1000)}K`)
        : ''
      features.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] }, properties: { label: price, model: dot.model } })
    })
  })
  return { type: 'FeatureCollection', features }
}

function applyDots(map: mapboxgl.Map, dots: ListingDot[]) {
  const src = map.getSource('listings') as mapboxgl.GeoJSONSource | undefined
  console.log('[Globe] applyDots — dots:', dots.length, 'source found:', !!src)
  if (src) src.setData(dotsToGeoJSON(dots))
}

// ── Component ─────────────────────────────────────────────────
export default function GlobeMap({
  homeAp, routeDest, selACRange, windBR, windUV,
  reachableAirports, allAirports, showWind, onMapLoad, active = true,
  listingDots = [],
}: Props) {
  const containerRef    = useRef<HTMLDivElement>(null)
  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const mapRef          = useRef<mapboxgl.Map | null>(null)
  const readyRef        = useRef(false)
  const styleReadyRef   = useRef(false)   // true only after 'load' fires
  const particlesRef    = useRef<Particle[]>(makeParticles())
  const latestDotsRef   = useRef<ListingDot[]>([])
  const gridRef         = useRef<WindGrid | null>(null)
  const animRef         = useRef<number | null>(null)
  // Pending data to apply once style is ready
  const pendingAirports  = useRef<GeoJSON.FeatureCollection | null>(null)
  const pendingRings     = useRef<GeoJSON.FeatureCollection | null>(null)
  const pendingRoute     = useRef<GeoJSON.FeatureCollection | null>(null)

  // ── Init Mapbox once ───────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || readyRef.current) return
    readyRef.current = true

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style:     'mapbox://styles/mapbox/satellite-streets-v12',
      projection: { name: 'globe' } as any,
      center:    [0, 20],
      zoom:      1.8,
      attributionControl: false,
    })

    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    map.on('load', () => {
      map.setFog({
        color:            'rgb(10,20,40)',
        'high-color':     'rgb(20,60,120)',
        'horizon-blend':  0.03,
        'space-color':    'rgb(2,8,15)',
        'star-intensity': 0.8,
      } as any)

      // Rings source + layers
      map.addSource('rings', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
      map.addLayer({ id: 'ring-max',  type: 'line', source: 'rings', filter: ['==', ['get', 'ring'], 'max'],  paint: { 'line-color': '#39ff8f', 'line-width': 2, 'line-opacity': 0.85, 'line-dasharray': [4, 2] } })
      map.addLayer({ id: 'ring-wind', type: 'line', source: 'rings', filter: ['==', ['get', 'ring'], 'wind'], paint: { 'line-color': '#ffb800', 'line-width': 2, 'line-opacity': 0.85, 'line-dasharray': [3, 2] } })

      // Route
      map.addSource('route', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
      map.addLayer({ id: 'route-line', type: 'line', source: 'route', paint: { 'line-color': '#ffb800', 'line-width': 1.5, 'line-opacity': 0.8, 'line-dasharray': [5, 3] } })

      // Airports
      map.addSource('airports', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
      map.addLayer({
        id: 'airports-dots', type: 'circle', source: 'airports',
        paint: {
          'circle-radius':       ['case', ['==', ['get', 'type'], 'home'], 8, ['==', ['get', 'type'], 'reachable'], 5, 3],
          'circle-color':        ['case', ['==', ['get', 'type'], 'home'], '#00cfff', ['==', ['get', 'type'], 'reachable'], '#39ff8f', 'rgba(100,160,255,0.3)'],
          'circle-stroke-width': ['case', ['==', ['get', 'type'], 'home'], 2, 0],
          'circle-stroke-color': '#00cfff',
          'circle-opacity':      ['case', ['==', ['get', 'type'], 'dot'], 0.35, 1],
        },
      })
      map.addLayer({
        id: 'airports-labels', type: 'symbol', source: 'airports',
        filter: ['!=', ['get', 'type'], 'dot'],
        layout: {
          'text-field':  ['get', 'icao'],
          'text-font':   ['DIN Pro Medium', 'Arial Unicode MS Regular'],
          'text-size':   10,
          'text-offset': [0, -1.5],
          'text-anchor': 'bottom',
        },
        paint: {
          'text-color':       ['case', ['==', ['get', 'type'], 'home'], '#00cfff', '#39ff8f'],
          'text-halo-color':  '#000',
          'text-halo-width':  1.5,
        },
      })

      // Listing offer dots
      map.addSource('listings', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
      map.addLayer({
        id: 'listing-dots', type: 'circle', source: 'listings',
        paint: {
          'circle-radius':       8,
          'circle-color':        '#30d158',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#30d158',
          'circle-opacity':      1,
        },
      })
      map.addLayer({
        id: 'listing-labels', type: 'symbol', source: 'listings',
        layout: {
          'text-field':  ['get', 'label'],
          'text-font':   ['DIN Pro Medium', 'Arial Unicode MS Regular'],
          'text-size':   10,
          'text-offset': [0, -1.8],
          'text-anchor': 'bottom',
        },
        paint: {
          'text-color':      '#30d158',
          'text-halo-color': '#000',
          'text-halo-width': 1.5,
        },
      })

      mapRef.current  = map
      styleReadyRef.current = true

      // Apply any data that arrived before the style was ready
      const src = (id: string) => map.getSource(id) as mapboxgl.GeoJSONSource
      if (pendingAirports.current)  src('airports').setData(pendingAirports.current)
      if (pendingRings.current)     src('rings').setData(pendingRings.current)
      if (pendingRoute.current)     src('route').setData(pendingRoute.current)

      // Always apply latest listing dots immediately after source is ready
      applyDots(map, latestDotsRef.current)

      onMapLoad(map)
    })

    return () => { map.remove(); mapRef.current = null; readyRef.current = false }
  }, []) // eslint-disable-line

  // ── Resize + re-apply data when tab becomes visible ──────────
  useEffect(() => {
    if (!active || !mapRef.current || !styleReadyRef.current) return
    const raf = requestAnimationFrame(() => {
      const map = mapRef.current
      if (!map) return
      map.resize()
      applyDots(map, latestDotsRef.current)
    })
    return () => cancelAnimationFrame(raf)
  }, [active])

  // ── Safe setData — stores pending if style not yet ready ───
  const setData = (id: string, data: GeoJSON.FeatureCollection) => {
    const map = mapRef.current
    if (map && styleReadyRef.current && map.getSource(id)) {
      (map.getSource(id) as mapboxgl.GeoJSONSource).setData(data)
    } else {
      // Store as pending — will be applied when 'load' fires
      if (id === 'airports') pendingAirports.current = data
      if (id === 'rings')    pendingRings.current    = data
      if (id === 'route')    pendingRoute.current    = data
      // Also retry in case style loads shortly after
      setTimeout(() => {
        const m = mapRef.current
        if (m && styleReadyRef.current && m.getSource(id)) {
          (m.getSource(id) as mapboxgl.GeoJSONSource).setData(data)
        }
      }, 500)
    }
  }

  // ── Rings ──────────────────────────────────────────────────
  useEffect(() => {
    const features: GeoJSON.Feature[] = []
    if (homeAp && selACRange)
      features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: geodesicCircle(homeAp.lat, homeAp.lon, selACRange) }, properties: { ring: 'max' } })
    if (homeAp && windBR && windBR.length > 0)
      features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: directionalRing(homeAp.lat, homeAp.lon, windBR) }, properties: { ring: 'wind' } })
    setData('rings', { type: 'FeatureCollection', features })
  }, [homeAp, selACRange, windBR])

  // ── Airport dots ───────────────────────────────────────────
  useEffect(() => {
    const features: GeoJSON.Feature[] = []
    allAirports.forEach(ap => features.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [ap.lo, ap.la] }, properties: { icao: ap.ic, type: 'dot' } }))
    reachableAirports.forEach(ap => features.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [ap.lo, ap.la] }, properties: { icao: ap.ic, type: 'reachable' } }))
    if (homeAp) features.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [homeAp.lon, homeAp.lat] }, properties: { icao: homeAp.icao, type: 'home' } })
    setData('airports', { type: 'FeatureCollection', features })
  }, [homeAp, allAirports, reachableAirports])

  // ── Route arc ──────────────────────────────────────────────
  useEffect(() => {
    if (!homeAp || !routeDest) { setData('route', { type: 'FeatureCollection', features: [] }); return }
    // Great-circle interpolation for accurate globe arc
    const coords: [number, number][] = []
    const lat1 = homeAp.lat * Math.PI / 180
    const lon1 = homeAp.lon * Math.PI / 180
    const lat2 = routeDest.lat * Math.PI / 180
    const lon2 = routeDest.lon * Math.PI / 180
    const d = Math.acos(Math.max(-1, Math.min(1,
      Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)
    )))
    const steps = 100
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      if (d < 0.0001) { coords.push([homeAp.lon, homeAp.lat]); continue }
      const A = Math.sin((1-t)*d) / Math.sin(d)
      const B = Math.sin(t*d)     / Math.sin(d)
      const x = A*Math.cos(lat1)*Math.cos(lon1) + B*Math.cos(lat2)*Math.cos(lon2)
      const y = A*Math.cos(lat1)*Math.sin(lon1) + B*Math.cos(lat2)*Math.sin(lon2)
      const z = A*Math.sin(lat1)                + B*Math.sin(lat2)
      const latI = Math.atan2(z, Math.sqrt(x*x+y*y)) * 180/Math.PI
      const lonI = Math.atan2(y, x) * 180/Math.PI
      coords.push([lonI, latI])
    }
    setData('route', { type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates: coords }, properties: {} }] })
    // Use the great-circle midpoint (coords[50]) rather than the arithmetic mean,
    // which gives the wrong hemisphere for trans-oceanic routes (e.g. LAX→NRT)
    const mid = coords[Math.floor(steps / 2)]
    mapRef.current?.flyTo({ center: [mid[0], mid[1]], zoom: 3.5, speed: 0.8 })
  }, [homeAp, routeDest])

  // ── Pan to home ────────────────────────────────────────────
  useEffect(() => {
    if (homeAp) mapRef.current?.flyTo({ center: [homeAp.lon, homeAp.lat], zoom: 4, speed: 1.2 })
  }, [homeAp])

  // ── Listing offer dots ─────────────────────────────────────
  useEffect(() => {
    console.log('[Globe] listingDots effect — count:', listingDots.length, 'mapReady:', styleReadyRef.current)
    latestDotsRef.current = listingDots
    if (mapRef.current && styleReadyRef.current) {
      applyDots(mapRef.current, listingDots)
    }
  }, [listingDots])

  // ── Build wind grid by interpolating REAL fetched points (inverse-distance weighting) ──
  // windUV now holds the actual per-location grid returned by /api/wind — no synthetic
  // shaping. Each fine-grid cell is estimated from the nearby real data points so that
  // direction and speed genuinely vary by location instead of all pointing the same way.
  useEffect(() => {
    const points = windUV
    if (!points || points.length === 0) { gridRef.current = null; return }

    const nLat = GLATS.length, nLon = GLONS.length
    const gu: number[][] = [], gv: number[][] = [], gspd: number[][] = []

    // Angular distance with longitude wraparound, longitude scaled by cos(lat)
    // so cells near the poles aren't over-weighted by distant points.
    const dist2 = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const dLat = lat1 - lat2
      let dLon = lon1 - lon2
      dLon = ((dLon + 540) % 360) - 180
      dLon *= Math.cos((lat1 + lat2) * Math.PI / 360)
      return dLat * dLat + dLon * dLon
    }

    for (let i = 0; i < nLat; i++) {
      gu.push([]); gv.push([]); gspd.push([])
      const lat = GLATS[i]
      for (let j = 0; j < nLon; j++) {
        const lon = GLONS[j]
        let wSum = 0, uSum = 0, vSum = 0
        for (const p of points) {
          const d2 = dist2(lat, lon, p.lat, p.lon)
          if (d2 < 1e-6) { uSum = p.u; vSum = p.v; wSum = 1; break }
          const w = 1 / (d2 * d2) // power-4 IDW — sharper falloff keeps local direction distinct
          wSum += w; uSum += p.u * w; vSum += p.v * w
        }
        const u = wSum > 0 ? uSum / wSum : 0
        const v = wSum > 0 ? vSum / wSum : 0
        gu[i].push(u); gv[i].push(v); gspd[i].push(Math.sqrt(u * u + v * v))
      }
    }
    gridRef.current = { u: gu, v: gv, spd: gspd }
    // Reset particles so they redistribute
    particlesRef.current = makeParticles()
  }, [windUV])

  // ── Wind particle animation ────────────────────────────────
  // Strategy: project the CURRENT geo position each frame and draw a
  // short directional stroke there. We NEVER draw from old→new position,
  // which eliminates all antimeridian / back-of-globe artifacts.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null }

    const ctx = canvas.getContext('2d', { alpha: true })!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!showWind || !windUV || !gridRef.current) return

    const GEO_STEP = 0.08   // degrees used to compute screen direction from wind vector
    const DT       = 0.009  // geo movement per frame (scales with speedScale) — 50% of original 0.018

    const animate = () => {
      const map  = mapRef.current
      const grid = gridRef.current
      if (!map || !grid) {
        // Use requestAnimationFrame (not setTimeout) so the same
        // cancelAnimationFrame call in cleanup always works correctly
        animRef.current = requestAnimationFrame(animate)
        return
      }

      // Fade previous frame — destination-out preserves transparency over the globe
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'

      const W = canvas.width, H = canvas.height
      const center = map.getCenter()
      const cLat   = center.lat * Math.PI / 180
      const cLon   = center.lng * Math.PI / 180

      ctx.lineCap = 'round'

      particlesRef.current.forEach(p => {
        p.age++

        // ── Lifecycle ────────────────────────────────────────
        if (p.age > p.maxAge) { Object.assign(p, makeParticle(0)); return }

        // ── Hemisphere visibility (dot product on unit sphere) ─
        const pLatR = p.lat * Math.PI / 180
        const pLonR = p.lon * Math.PI / 180
        const dot =
          Math.sin(cLat) * Math.sin(pLatR) +
          Math.cos(cLat) * Math.cos(pLatR) * Math.cos(pLonR - cLon)
        if (dot < 0.08) {
          // On the back — kill quickly and respawn
          p.age = p.maxAge
          return
        }

        // ── Sample wind ──────────────────────────────────────
        const w = windAt(grid, p.lat, p.lon)

        if (w.spd < MIN_SPEED_KT) {
          // Calm area — move silently, don't draw
          const cosLat = Math.max(0.15, Math.cos(pLatR))
          p.lon += (w.u * DT * 0.5) / cosLat
          p.lat  = Math.max(-85, Math.min(85, p.lat + w.v * DT * 0.2))
          if (p.lon > 180) p.lon -= 360
          if (p.lon < -180) p.lon += 360
          return
        }

        // ── Project current position to screen ───────────────
        let sx: number, sy: number
        try {
          const pt = map.project([p.lon, p.lat])
          sx = pt.x; sy = pt.y
        } catch { Object.assign(p, makeParticle(0)); return }

        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) {
          Object.assign(p, makeParticle(0)); return
        }

        // ── Compute screen-space wind direction ──────────────
        // Project a point offset by wind vector in geo space,
        // then derive the screen direction. No cross-frame drawing.
        const cosLat  = Math.max(0.15, Math.cos(pLatR))
        const dLon    = (w.u * GEO_STEP) / cosLat
        const dLat    = w.v * GEO_STEP

        let ex: number, ey: number
        try {
          const ep = map.project([p.lon + dLon, Math.max(-85, Math.min(85, p.lat + dLat))])
          ex = ep.x; ey = ep.y
        } catch { ex = sx + 1; ey = sy }

        const dx  = ex - sx
        const dy  = ey - sy
        const len = Math.sqrt(dx * dx + dy * dy)
        if (len < 0.01) return   // no direction computable

        const nx = dx / len
        const ny = dy / len

        // ── Opacity: fade-in and fade-out ────────────────────
        const life  = p.age / p.maxAge
        const op    = life < 0.1 ? life / 0.1 : life > 0.82 ? (1 - life) / 0.18 : 1
        const alpha = op * 0.88

        // ── Stroke length scales with speed ──────────────────
        const tailLen = Math.min(18, 4 + w.spd / 10)

        // ── Draw directional stroke ──────────────────────────
        ctx.strokeStyle = windColor(w.spd, alpha)
        ctx.lineWidth   = w.spd > 100 ? 1.5 : w.spd > 60 ? 1.1 : 0.8

        ctx.beginPath()
        ctx.moveTo(sx - nx * tailLen * 0.7, sy - ny * tailLen * 0.7)
        ctx.lineTo(sx + nx * tailLen * 0.3, sy + ny * tailLen * 0.3)
        ctx.stroke()

        // ── Move particle in geo space for next frame ────────
        const speedScale = Math.max(0.4, w.spd / 55)
        p.lon += (w.u * DT * speedScale) / cosLat
        p.lat  = Math.max(-85, Math.min(85, p.lat + w.v * DT * speedScale * 0.4))
        if (p.lon > 180)  p.lon -= 360
        if (p.lon < -180) p.lon += 360
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null }
    }
  }, [showWind, windUV])

  // ── Resize canvas ──────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current; if (!c) return
      c.width  = window.innerWidth
      c.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
      {/* Canvas overlay for wind particles — transparent background, on top of Mapbox */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
      />
    </div>
  )
}
