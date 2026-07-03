// src/lib/rateLimit.ts
// Simple sliding-window rate limiter backed by Supabase, since serverless
// function instances don't reliably share in-memory state between invocations.
import { createServerClient } from './supabase-server'
import { NextRequest } from 'next/server'

export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

// Returns true if the request is allowed, false if it should be rejected (429).
export async function checkRateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const supabase = createServerClient()
  const now = Date.now()

  const { data: row } = await supabase
    .from('rate_limits')
    .select('count, window_start')
    .eq('key', key)
    .single()

  if (!row || now - new Date(row.window_start).getTime() > windowSeconds * 1000) {
    // New window
    await supabase.from('rate_limits').upsert({ key, count: 1, window_start: new Date().toISOString() })
    return true
  }

  if (row.count >= limit) return false

  await supabase.from('rate_limits').update({ count: row.count + 1 }).eq('key', key)
  return true
}
