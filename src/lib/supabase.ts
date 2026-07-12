// src/lib/supabase.ts
// Browser client (for components)
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ── Types matching the database schema ──────────────────────
export type Profile = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  created_at: string
}

export type Listing = {
  id: string
  model: string
  year: number
  reg: string
  hours: number
  price: number | null
  price_on_enquiry: boolean
  currency: string
  location: string
  lat: number | null
  lon: number | null
  equip: string | null
  condition: string
  engines: number | null
  fuel: 'jet-a' | 'avgas' | 'diesel' | null
  gear: 'retractable' | 'tailwheel' | 'tricycle' | null
  type_rating: boolean
  photos: string[] | null
  contact_email: string | null
  seller_id: string | null
  seller_name: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  approved_at: string | null
  certification_requested: boolean
  certified: boolean
  engine_times: (number | null)[] | null
  prop_times: (number | null)[] | null
  time_basis: 'since_check' | 'to_next_check'
  description: string | null
  airframe_notes: string | null
  engine_notes: string | null
  interior_notes: string | null
  exterior_notes: string | null
}

export type Inquiry = {
  id: string
  listing_id: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string | null
  message: string | null
  created_at: string
}
