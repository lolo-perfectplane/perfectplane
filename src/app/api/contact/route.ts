// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { sendBuyerInquiry } from '@/lib/email'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

// POST /api/contact — buyer expresses interest in a listing
export async function POST(req: NextRequest) {
  try {
    if (!(await checkRateLimit(`contact:${getClientIp(req)}`, 5, 600))) {
      return NextResponse.json({ error: 'Too many requests — please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const { listingId, buyerName, buyerEmail, buyerPhone, message } = body

    if (!listingId || !buyerName || !buyerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Fetch the listing to get aircraft details + the seller's contact email
    const { data: listing, error: le } = await supabase
      .from('listings')
      .select('model, year, reg, price, contact_email, seller_name')
      .eq('id', listingId)
      .eq('status', 'approved')
      .single()

    if (le || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // Log the inquiry
    await supabase.from('inquiries').insert({
      listing_id: listingId, buyer_name: buyerName,
      buyer_email: buyerEmail, buyer_phone: buyerPhone || null,
      message: message || null,
    })

    // Send email to the seller (not the admin) — this is what "Contact seller" promises
    await sendBuyerInquiry({
      listingModel: listing.model, listingYear: listing.year,
      listingReg: listing.reg, listingPrice: listing.price,
      sellerEmail: listing.contact_email, sellerName: listing.seller_name,
      buyerName, buyerEmail, buyerPhone, message,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
