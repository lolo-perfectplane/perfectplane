// src/lib/authFetch.ts
// fetch() wrapper that attaches the current Supabase session's access token
// as a Bearer header. Required for any API route that makes an authorization
// decision (admin actions, editing/deleting your own listing or job) — the
// server derives identity from this token, never from a userId field in the
// request body or query string.
import { createClient } from './supabase'

export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  const headers = new Headers(options.headers)
  if (session?.access_token) headers.set('Authorization', `Bearer ${session.access_token}`)

  return fetch(url, { ...options, headers })
}
