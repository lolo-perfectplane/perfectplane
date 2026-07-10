'use client'
// src/components/ui/CompareToggle.tsx

type Props = {
  active: boolean
  disabled?: boolean
  onToggle: () => void
  size?: number
  style?: React.CSSProperties
}

// Pill "add to comparison" toggle — overlaid on a photo, labeled so it's
// clear at a glance (an unlabeled ⚖ icon alone wasn't obvious to users).
export default function CompareToggle({ active, disabled, onToggle, size = 26, style }: Props) {
  return (
    <button
      onClick={e => { e.stopPropagation(); if (!disabled) onToggle() }}
      title={disabled ? 'Compare up to 3 aircraft' : active ? 'Remove from comparison' : 'Add to comparison'}
      style={{
        height: size, padding: '0 10px', borderRadius: 100, border: 'none',
        background: active ? '#0a84ff' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
        color: '#fff', fontFamily: 'inherit',
        fontSize: Math.round(size * 0.42), fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        display: 'flex', alignItems: 'center', gap: 4,
        whiteSpace: 'nowrap', flexShrink: 0,
        transition: 'transform 0.12s',
        ...style,
      }}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.94)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <span>{active ? '✓' : '⚖'}</span>
      <span>{active ? 'Comparing' : 'Compare'}</span>
    </button>
  )
}
