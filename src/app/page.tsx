// src/app/page.tsx
// Server component: fetches approved community listings on the server,
// passes them to the client shell.
import { createServerClient } from '@/lib/supabase-server'
import AppShell from '@/components/AppShell'
import type { Listing } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerClient()
  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'approved')
    .order('approved_at', { ascending: false })

  return <AppShell initialListings={(listings ?? []) as Listing[]} />
}
