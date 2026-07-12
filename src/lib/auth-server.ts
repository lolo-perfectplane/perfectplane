// src/lib/auth-server.ts
// Derives the calling user's id from a verified Supabase session token.
// Never trust a client-supplied userId (body field or query param) for
// authorization decisions — it's just data the caller wrote themselves.
import { NextRequest } from 'next/server'
import { createServerClient } from './supabase-server'

export async function getVerifiedUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return null

  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return null
  return user.id
}
