'use client'
// src/components/ui/MessageModal.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { fmtPrice } from '@/lib/currency'

export type Message = {
  id: string
  listing_id: string
  sender_id: string
  receiver_id: string
  content: string
  read: boolean
  created_at: string
}

export type MessageListing = {
  id: string
  model: string
  year: number
  price: number | null
  currency?: string | null
  seller_id: string | null
}

type Props = {
  listing: MessageListing
  buyerId: string
  onClose: () => void
}

function fmtTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function MessageModal({ listing, buyerId, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase  = useMemo(() => createClient(), [])
  const canMessage = !!listing.seller_id

  useEffect(() => {
    if (!canMessage) return

    let active = true
    supabase
      .from('messages')
      .select('*')
      .eq('listing_id', listing.id)
      .or(`sender_id.eq.${buyerId},receiver_id.eq.${buyerId}`)
      .order('created_at', { ascending: true })
      .then(({ data }) => { if (active && data) setMessages(data as Message[]) })

    const channel = supabase
      .channel(`messages-${listing.id}-${buyerId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'messages',
        filter: `listing_id=eq.${listing.id}`,
      }, payload => {
        setMessages(prev => {
          const next = payload.new as Message
          return prev.some(m => m.id === next.id) ? prev : [...prev, next]
        })
      })
      .subscribe()

    // Mark received messages as read
    supabase.from('messages').update({ read: true }).eq('listing_id', listing.id).eq('receiver_id', buyerId)

    return () => { active = false; supabase.removeChannel(channel) }
  }, [listing.id, buyerId, canMessage, supabase])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const send = async () => {
    const content = input.trim()
    if (!content || !listing.seller_id || loading) return
    setInput('')
    setLoading(true)
    try {
      await supabase.from('messages').insert({
        listing_id: listing.id,
        sender_id: buyerId,
        receiver_id: listing.seller_id,
        content,
      })
    } finally {
      setLoading(false)
    }
  }

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 250,
    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }
  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(40px) saturate(180%)',
    border: '0.5px solid rgba(0,0,0,0.08)',
    borderRadius: 20,
    boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: '#1d1d1f',
    width: 'min(480px, 95vw)', height: 'min(560px, 85vh)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  }

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={card}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>
              {listing.year} {listing.model}
            </div>
            <div style={{ fontSize: 13, color: '#0a84ff', fontWeight: 600, marginTop: 2 }}>
              {fmtPrice(listing.price, listing.currency)}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: '50%', border: 'none',
            background: 'rgba(118,118,128,0.15)', color: '#86868b',
            cursor: 'pointer', fontSize: 13,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>✕</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {!canMessage ? (
            <div style={{ margin: 'auto', textAlign: 'center', color: '#86868b', fontSize: 13, maxWidth: 260 }}>
              This seller isn't available for messaging right now.
            </div>
          ) : messages.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', color: '#86868b', fontSize: 13, maxWidth: 240 }}>
              Start the conversation about this aircraft
            </div>
          ) : (
            messages.map(m => {
              const isBuyer = m.sender_id === buyerId
              return (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isBuyer ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '78%', padding: '9px 14px', fontSize: 14, lineHeight: 1.4,
                    background: isBuyer ? '#0a84ff' : 'rgba(118,118,128,0.12)',
                    color: isBuyer ? '#fff' : '#1d1d1f',
                    borderRadius: isBuyer ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    wordBreak: 'break-word',
                  }}>
                    {m.content}
                  </div>
                  <div style={{ fontSize: 11, color: '#86868b', marginTop: 3, padding: '0 4px' }}>
                    {fmtTime(m.created_at)}
                  </div>
                </div>
              )
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{
          flexShrink: 0, padding: '12px 16px', borderTop: '0.5px solid rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Message…"
            disabled={!canMessage}
            style={{
              flex: 1, height: 40, borderRadius: 20, border: 'none',
              background: 'rgba(118,118,128,0.1)', fontFamily: 'inherit',
              fontSize: 16, padding: '10px 16px', color: '#1d1d1f', outline: 'none',
            }}
          />
          <button
            onClick={send}
            disabled={!canMessage || !input.trim() || loading}
            style={{
              width: 36, height: 36, borderRadius: '50%', border: 'none', flexShrink: 0,
              background: !canMessage || !input.trim() ? 'rgba(10,132,255,0.35)' : '#0a84ff',
              color: '#fff', fontSize: 15, cursor: !canMessage || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >→</button>
        </div>
      </div>
    </div>
  )
}
