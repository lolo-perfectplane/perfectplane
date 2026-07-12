// src/app/api/admin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { getVerifiedUserId } from '@/lib/auth-server'
import { sendListingApproved, sendListingRejected } from '@/lib/email'
import { checkRateLimit } from '@/lib/rateLimit'
import { CURRENCIES } from '@/lib/currency'

async function assertAdmin(supabase: ReturnType<typeof createServerClient>, userId: string) {
  const { data } = await supabase.from('profiles').select('role').eq('id', userId).single()
  if (data?.role !== 'admin') throw new Error('Not authorized')
}

// GET /api/admin — fetch all pending listings and jobs (admin only)
export async function GET(req: NextRequest) {
  const userId = await getVerifiedUserId(req)
  if (!userId) return NextResponse.json({ error: 'Not authorized' }, { status: 401 })

  const supabase = createServerClient()
  try { await assertAdmin(supabase, userId) }
  catch { return NextResponse.json({ error: 'Not authorized' }, { status: 403 }) }

  const [{ data: listings, error: lErr }, { data: jobs, error: jErr }] = await Promise.all([
    supabase.from('listings').select('*').in('status', ['pending', 'approved']).order('created_at', { ascending: false }),
    supabase.from('jobs').select('*').in('status', ['pending', 'approved']).order('created_at', { ascending: false }),
  ])

  if (lErr || jErr) return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  return NextResponse.json({ listings, jobs })
}

// PATCH /api/admin — approve, reject, or edit an item
export async function PATCH(req: NextRequest) {
  try {
    const userId = await getVerifiedUserId(req)
    if (!userId) return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    if (!(await checkRateLimit(`admin-patch:${userId}`, 60, 600))) {
      return NextResponse.json({ error: 'Too many requests — please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const { listingId, action, edits, grantCertification, kind = 'listing' } = body

    if (!listingId || !action) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    if (!['approve', 'reject', 'edit'].includes(action)) return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

    const supabase = createServerClient()
    await assertAdmin(supabase, userId)

    // ── Jobs ──────────────────────────────────────────────────
    if (kind === 'job') {
      let updates: Record<string, unknown> = {}
      if (action === 'approve') updates = { status: 'approved', approved_at: new Date().toISOString() }
      else if (action === 'reject') updates = { status: 'rejected' }
      else if (action === 'edit' && edits) {
        updates = {
          title:           edits.title,
          company:         edits.company,
          location:        edits.location,
          job_type:        edits.job_type,
          function_title:  edits.function_title  || null,
          region:          edits.region          || null,
          description:     edits.description,
          requirements:    edits.requirements    || null,
          salary_range:    edits.salary_range    || null,
          min_hours_total: edits.min_hours_total ? +edits.min_hours_total : null,
          min_hours_cs25:  edits.min_hours_cs25  ? +edits.min_hours_cs25  : null,
          min_hours_cs23:  edits.min_hours_cs23  ? +edits.min_hours_cs23  : null,
          min_hours_pic:   edits.min_hours_pic   ? +edits.min_hours_pic   : null,
        }
      }
      const { error } = await supabase.from('jobs').update(updates).eq('id', listingId)
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    // ── Listings ──────────────────────────────────────────────
    if (action === 'edit' && edits) {
      const { error } = await supabase.from('listings').update({
        model:         edits.model,
        year:          Number(edits.year)  || undefined,
        reg:           edits.reg?.toUpperCase(),
        hours:         Number(edits.hours) || undefined,
        price:         Number(edits.price) || undefined,
        currency:      CURRENCIES.includes(edits.currency) ? edits.currency : undefined,
        location:      edits.location,
        lat:           typeof edits.lat === 'number' ? edits.lat : null,
        lon:           typeof edits.lon === 'number' ? edits.lon : null,
        equip:         edits.equip    || null,
        condition:     edits.condition,
        type_rating:   !!edits.type_rating,
        contact_email: edits.contact_email,
        certified:     !!edits.certified,
        ifr:           !!edits.ifr,
        ...(Array.isArray(edits.photos) && { photos: edits.photos }),
      }).eq('id', listingId)
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    if (action === 'approve') {
      const updates: Record<string, unknown> = {
        status: 'approved', approved_at: new Date().toISOString(),
        certified: !!grantCertification,
        ...(edits && {
          model: edits.model, year: Number(edits.year) || undefined,
          reg: edits.reg?.toUpperCase(), hours: Number(edits.hours) || undefined,
          price: Number(edits.price) || undefined, location: edits.location,
          equip: edits.equip || null, condition: edits.condition,
          type_rating: !!edits.typeRating, contact_email: edits.contactEmail,
        }),
      }
      const { data, error } = await supabase.from('listings').update(updates)
        .eq('id', listingId).eq('status', 'pending').select().single()
      if (error) throw error
      if (!data) return NextResponse.json({ error: 'Listing not found or already processed' }, { status: 404 })
      sendListingApproved({ model: data.model, year: data.year, price: data.price, currency: data.currency, typeRating: data.type_rating, sellerName: data.seller_name, sellerEmail: data.contact_email })
        .catch(e => console.error('[email] sendListingApproved failed:', e))
      return NextResponse.json({ listing: data })
    }

    // reject
    const { data, error } = await supabase.from('listings').update({ status: 'rejected' })
      .eq('id', listingId).eq('status', 'pending').select().single()
    if (error) throw error
    if (!data) return NextResponse.json({ error: 'Listing not found or already processed' }, { status: 404 })
    sendListingRejected({ model: data.model, year: data.year, sellerName: data.seller_name, sellerEmail: data.contact_email })
      .catch(e => console.error('[email] sendListingRejected failed:', e))
    return NextResponse.json({ ok: true })

  } catch (err: unknown) {
    const isAuth = err instanceof Error && err.message === 'Not authorized'
    return NextResponse.json({ error: isAuth ? 'Not authorized' : 'Request failed' }, { status: isAuth ? 403 : 500 })
  }
}

// DELETE /api/admin — permanently delete a listing or job
export async function DELETE(req: NextRequest) {
  try {
    const userId = await getVerifiedUserId(req)
    if (!userId) return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    if (!(await checkRateLimit(`admin-delete:${userId}`, 60, 600))) {
      return NextResponse.json({ error: 'Too many requests — please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const { listingId, kind = 'listing' } = body
    if (!listingId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const supabase = createServerClient()
    await assertAdmin(supabase, userId)

    const table = kind === 'job' ? 'jobs' : 'listings'
    const { error } = await supabase.from(table).delete().eq('id', listingId)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const isAuth = err instanceof Error && err.message === 'Not authorized'
    return NextResponse.json({ error: isAuth ? 'Not authorized' : 'Delete failed' }, { status: isAuth ? 403 : 500 })
  }
}
