'use client'
// src/components/ui/RingLegend.tsx

export default function RingLegend() {
  return (
    <div className="pp-hud" style={{ position: 'fixed', top: 68, right: 16, zIndex: 20, display: 'flex' }}>
      {[
        { color: 'rgba(10,132,255,0.8)', label: 'Desired range' },
        { color: 'rgba(255,255,255,0.6)', label: 'Max range' },
        { color: 'rgba(255,255,255,0.3)', label: 'Wind-adjusted' },
      ].map(({ color, label }) => (
        <div key={label} className="pp-hud-cell" style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 16, height: 1.5, background: color, borderRadius: 1, flexShrink: 0 }} />
          <span className="pp-hud-l" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>{label}</span>
        </div>
      ))}
    </div>
  )
}
