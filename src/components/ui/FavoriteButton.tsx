'use client'
// src/components/ui/FavoriteButton.tsx

type Props = {
  active: boolean
  onToggle: () => void
  size?: number
  style?: React.CSSProperties
}

// Small circular heart toggle — overlaid on a photo (dark translucent bg)
// or dropped into a lighter surface via the `style` override.
export default function FavoriteButton({ active, onToggle, size = 30, style }: Props) {
  return (
    <button
      onClick={e => { e.stopPropagation(); onToggle() }}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        width: size, height: size, borderRadius: '50%', border: 'none',
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
        color: active ? '#ff3b30' : '#fff',
        fontSize: size * 0.52, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 0, lineHeight: 1, flexShrink: 0,
        transition: 'transform 0.12s',
        ...style,
      }}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.88)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {active ? '♥' : '♡'}
    </button>
  )
}
