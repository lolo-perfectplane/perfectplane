// src/app/api/my-items/route.ts
// Returns the calling user's own listings and jobs across all statuses
// (pending/approved/rejected) so they can manage them without admin help.
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { getVerifiedUserId } from '@/lib/auth-server'

export async function GET(req: NextRequest) {
  const userId = await getVerifiedUserId(req)
  if (!userId) return NextResponse.json({ error: 'Not authorized' }, { status: 401 })

  const supabase = createServerClient()
  const [{ data: listings, error: lErr }, { data: jobs, error: jErr }] = await Promise.all([
    supabase.from('listings').select('*').eq('seller_id', userId).order('created_at', { ascending: false }),
    supabase.from('jobs').select('*').eq('poster_id', userId).order('created_at', { ascending: false }),
  ])

  if (lErr || jErr) return NextResponse.json({ error: 'Failed to fetch your items' }, { status: 500 })
  return NextResponse.json({ listings, jobs })
}
