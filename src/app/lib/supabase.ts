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
  price: number
  location: string
  equip: string | null
  condition: string
  type_rating: boolean
  contact_email: string
  seller_id: string
  seller_name: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  approved_at: string | null
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
