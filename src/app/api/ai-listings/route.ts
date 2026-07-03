// src/app/api/ai-listings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

const MAX_PROMPT_CHARS = 2000

export async function POST(req: NextRequest) {
  try {
    // Require an authenticated Supabase user to prevent open API proxy abuse
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (!token) return NextResponse.json({ error: 'Not authorized' }, { status: 401 })

    const supabase = createServerClient()
    const { data: { user }, error: authErr } = await supabase.auth.getUser(token)
    if (authErr || !user) return NextResponse.json({ error: 'Not authorized' }, { status: 401 })

    const { prompt } = await req.json()
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 })
    }
    if (prompt.length > MAX_PROMPT_CHARS) {
      return NextResponse.json({ error: 'Prompt too long' }, { status: 400 })
    }

    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY
    if (!ANTHROPIC_KEY) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1600,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!r.ok) return NextResponse.json({ error: 'AI service error' }, { status: 502 })

    const data = await r.json()
    if (data.error) return NextResponse.json({ error: 'AI service error' }, { status: 502 })

    const text = (data.content as { type: string; text: string }[] || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')

    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ error: 'Request failed' }, { status: 500 })
  }
}
