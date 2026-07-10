// src/app/api/listings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { sendListingSubmitted } from '@/lib/email'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

// POST /api/listings — submit a new listing (pending)
export async function POST(req: NextRequest) {
  try {
    if (!(await checkRateLimit(`listings-post:${getClientIp(req)}`, 10, 3600))) {
      return NextResponse.json({ error: 'Too many requests — please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const {
      model, year, reg, hours, price, location,
      equip, condition, ifr, contact_pref, contactEmail, sellerId, sellerName, photos,
      certificationRequested, engineTimes, propTimes, timeBasis, description,
      airframeNotes, engineNotes,
    } = body

    if (!model || !year || !reg || !hours || !price || !location || !sellerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('listings')
      .insert({
        model, year: +year, reg: reg.toUpperCase(),
        hours: +hours, price: +price, location,
        equip: equip || null, condition: condition || 'Good',
        ifr: ifr ?? false,
        contact_pref: contact_pref ?? 'email',
        type_rating: false,
        contact_email: contactEmail,
        seller_id: sellerId,
        seller_name: sellerName,
        photos: photos && photos.length > 0 ? photos : null,
        certification_requested: !!certificationRequested,
        engine_times: engineTimes?.some((t: any) => t != null) ? engineTimes : null,
        prop_times:   propTimes?.some((t: any) => t != null)   ? propTimes   : null,
        time_basis:   timeBasis === 'to_next_check' ? 'to_next_check' : 'since_check',
        description:    description    || null,
        airframe_notes: airframeNotes  || null,
        engine_notes:   engineNotes    || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    // Notify admin — non-blocking: email failure must not fail the submission
    sendListingSubmitted({
      model, year: +year, reg, price: +price, location,
      equip, condition,
      sellerName, sellerEmail: body.sellerEmail,
      contactEmail, id: data.id,
    }).catch(e => console.error('[email] sendListingSubmitted failed:', e))

    return NextResponse.json({ listing: data })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[listings POST]', err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// GET /api/listings?model=TBM+850 — fetch approved listings for a model
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const model = searchParams.get('model')

  const supabase = createServerClient()
  // Exclude PII fields (contact_email) from public listing results.
  // seller_id is included — it's an opaque UUID needed to route in-app
  // messages to the seller when contact_pref is 'message'.
  let query = supabase
    .from('listings')
    .select('id,model,year,reg,hours,price,location,equip,condition,ifr,contact_pref,seller_id,type_rating,photos,approved_at,seller_name,certified,certification_requested,engine_times,prop_times,time_basis,description,airframe_notes,engine_notes')
    .eq('status', 'approved')
  if (model) query = query.eq('model', model)

  const { data, error } = await query.order('approved_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 })
  return NextResponse.json({ listings: data })
}

// PATCH /api/listings — owner edits their own listing (any status)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, listingId, edits } = body
    if (!userId || !listingId || !edits) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Ownership check — only the seller can edit their own listing
    const { data: existing } = await supabase.from('listings').select('seller_id').eq('id', listingId).single()
    if (!existing || existing.seller_id !== userId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    const { error } = await supabase.from('listings').update({
      model:         edits.model,
      year:          Number(edits.year)  || undefined,
      reg:           edits.reg?.toUpperCase(),
      hours:         Number(edits.hours) || undefined,
      price:         Number(edits.price) || undefined,
      location:      edits.location,
      equip:         edits.equip || null,
      condition:     edits.condition,
      contact_email: edits.contact_email,
    }).eq('id', listingId)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// DELETE /api/listings — owner deletes their own listing
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, listingId } = body
    if (!userId || !listingId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const supabase = createServerClient()
    const { data: existing } = await supabase.from('listings').select('seller_id').eq('id', listingId).single()
    if (!existing || existing.seller_id !== userId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    const { error } = await supabase.from('listings').delete().eq('id', listingId)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
