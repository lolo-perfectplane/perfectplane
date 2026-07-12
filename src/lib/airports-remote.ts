// src/lib/airports-remote.ts
// Queries the Supabase `airports` table (~47,500 global airfields, incl.
// grass strips) via RPC — the counterpart to the ~1,460-entry static list in
// `./airports.ts`, which stays as a fast local fallback for major airports
// (home-airport autocomplete defaults, offline use, stopover routing).
// Use these functions for general search-as-you-type and map coverage that
// needs to reach beyond the curated major-airport set.
import { createClient } from './supabase'
import type { APEntry } from './airports'

export type RemoteAirport = {
  icao: string
  iata: string | null
  name: string
  lat: number
  lon: number
  fuel: 'JetA' | 'AvGas' | 'both' | 'none'
  rwy_ft: number
  ifr: boolean
  customs: boolean
  surface: 'paved' | 'grass' | 'gravel' | 'other' | null
  country: string | null
  continent: string | null
  official_code: boolean
  // false = bulk-imported from OurAirports; fuel/ifr/customs are rough
  // estimates by airport type, NOT verified AIP/NOTAM data. Any UI showing
  // these fields for an unverified entry must flag them clearly — never
  // let a pilot treat them as reliable without that caveat.
  verified: boolean
}

// Adapts a Supabase result to the local static-file APEntry shape, so it can
// feed the same state (homeAp, routeDest, …) that lookupAirport() used to.
export function toAPEntry(ap: RemoteAirport): APEntry {
  return {
    icao: ap.icao, name: ap.name, lat: ap.lat, lon: ap.lon,
    iata: ap.iata ?? undefined,
    fuel: ap.fuel, rwy_ft: ap.rwy_ft, ifr: ap.ifr, customs: ap.customs,
  }
}

function mapRow(row: any): RemoteAirport {
  return {
    icao: row.icao, iata: row.iata ?? null, name: row.name,
    lat: row.lat, lon: row.lon,
    fuel: row.fuel, rwy_ft: row.rwy_ft, ifr: row.ifr, customs: row.customs,
    surface: row.surface ?? null, country: row.country ?? null, continent: row.continent ?? null,
    official_code: row.official_code, verified: row.verified,
  }
}

// Search by ICAO/IATA prefix or name substring — powers autocomplete.
export async function searchAirportsRemote(query: string, maxResults = 20): Promise<RemoteAirport[]> {
  const q = query.trim()
  if (q.length < 2) return []
  const supabase = createClient()
  const { data, error } = await supabase.rpc('airports_search', { q, max_results: maxResults })
  if (error || !data) return []
  return (data as any[]).map(mapRow)
}

// Airports within a radius (meters) of a point, sorted by distance.
export async function getNearbyAirportsRemote(
  lat: number, lon: number, radiusM = 50000, maxResults = 50,
): Promise<RemoteAirport[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('airports_nearby', {
    center_lat: lat, center_lon: lon, radius_m: radiusM, max_results: maxResults,
  })
  if (error || !data) return []
  return (data as any[]).map(mapRow)
}

export type LatLonBounds = { minLat: number; minLon: number; maxLat: number; maxLon: number }

// Airports within a map viewport — used for on-demand map loading instead of
// shipping the full dataset to the client.
export async function getAirportsInBoundsRemote(
  bounds: LatLonBounds, maxResults = 400,
): Promise<RemoteAirport[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('airports_in_bbox', {
    min_lat: bounds.minLat, min_lon: bounds.minLon,
    max_lat: bounds.maxLat, max_lon: bounds.maxLon,
    max_results: maxResults,
  })
  if (error || !data) return []
  return (data as any[]).map(mapRow)
}
