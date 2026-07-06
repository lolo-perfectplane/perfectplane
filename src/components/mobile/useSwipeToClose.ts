// src/components/mobile/useSwipeToClose.ts
import { useCallback, useRef, useState } from 'react'

// Attach the returned handlers to a sheet's drag handle / header area so a
// downward swipe closes it. Dragging follows the finger 1:1; releasing past
// the threshold (or with a fast flick) closes, otherwise it snaps back.
export function useSwipeToClose(onClose: () => void, threshold = 100) {
  const startY    = useRef(0)
  const startTime = useRef(0)
  const dragging  = useRef(false)
  const [dragY, setDragY] = useState(0)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current    = e.touches[0].clientY
    startTime.current = Date.now()
    dragging.current  = true
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return
    const dy = e.touches[0].clientY - startY.current
    if (dy > 0) setDragY(dy)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    const elapsed  = Date.now() - startTime.current
    const velocity = dragY / Math.max(1, elapsed)
    if (dragY > threshold || velocity > 0.5) onClose()
    setDragY(0)
  }, [dragY, threshold, onClose])

  return {
    dragY,
    dragging: dragging.current,
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
  }
}
