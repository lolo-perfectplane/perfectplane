'use client'
// src/components/ui/MessagesPanel.tsx
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Message } from './MessageModal'
import { fmtPrice } from '@/lib/currency'

type Conversation = {
  listingId: string
  model: string
  year: number
  price: number | null
  currency: string | null
  seller_id: string | null
  lastMessage: string
  lastAt: string
  unread: number
}

type Props = {
  userId: string
  onClose: () => void
  onOpenConversation: (l: { id: string; model: string; year: number; price: number | null; currency?: string | null; seller_id: string | null }) => void
}

export default function MessagesPanel({ userId, onClose, onOpenConversation }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const supabase = createClient()
    ;(async () => {
      const { data: msgs } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false })
      if (!active) return

      const rows = (msgs ?? []) as Message[]
      if (rows.length === 0) { setConversations([]); setLoading(false); return }

      const byListing = new Map<string, Message[]>()
      for (const m of rows) {
        const arr = byListing.get(m.listing_id) ?? []
        arr.push(m)
        byListing.set(m.listing_id, arr)
      }

      const ids = Array.from(byListing.keys())
      const { data: listingRows } = await supabase
        .from('listings').select('id,model,year,price,currency,seller_id').in('id', ids)
      const listingMap = new Map((listingRows ?? []).map((l: any) => [l.id, l]))

      const convs: Conversation[] = ids.map(id => {
        const msgsForListing = byListing.get(id)! // already sorted newest-first
        const last = msgsForListing[0]
        const unread = msgsForListing.filter(m => m.receiver_id === userId && !m.read).length
        const l = listingMap.get(id)
        return {
          listingId: id,
          model: l?.model ?? 'Aircraft',
          year: l?.year ?? 0,
          price: l?.price ?? null,
          currency: l?.currency ?? null,
          seller_id: l?.seller_id ?? null,
          lastMessage: last.content,
          lastAt: last.created_at,
          unread,
        }
      }).sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime())

      if (active) { setConversations(convs); setLoading(false) }
    })()
    return () => { active = false }
  }, [userId])

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 220, background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 221,
        width: 'min(380px, 92vw)',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(40px) saturate(180%)',
        borderLeft: '0.5px solid rgba(0,0,0,0.08)',
        boxShadow: '-24px 0 60px rgba(0,0,0,0.18)',
        fontFamily: "'Inter', -apple-system, sans-serif",
        color: '#1d1d1f',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '20px 20px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Messages</div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: '50%', border: 'none',
            background: 'rgba(118,118,128,0.15)', color: '#86868b',
            cursor: 'pointer', fontSize: 13,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
          {loading && <div style={{ textAlign: 'center', padding: 40, color: '#86868b', fontSize: 13 }}>Loading…</div>}

          {!loading && conversations.length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#86868b' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>💬</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>No conversations yet</div>
            </div>
          )}

          {conversations.map(c => (
            <div key={c.listingId}
              onClick={() => onOpenConversation({ id: c.listingId, model: c.model, year: c.year, price: c.price, currency: c.currency, seller_id: c.seller_id })}
              style={{
                padding: '12px 12px', borderRadius: 12, cursor: 'pointer',
                marginBottom: 4, transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(118,118,128,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {c.year} {c.model}
                </div>
                {c.unread > 0 && (
                  <span style={{
                    minWidth: 18, height: 18, borderRadius: 9, background: '#ff3b30', color: '#fff',
                    fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 5px', flexShrink: 0,
                  }}>{c.unread}</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: '#86868b', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.lastMessage}
              </div>
              <div style={{ fontSize: 11, color: '#0a84ff', fontWeight: 600 }}>{fmtPrice(c.price, c.currency)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
