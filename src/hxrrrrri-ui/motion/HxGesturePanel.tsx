import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { PropsWithChildren } from 'react'

interface HxGesturePanelProps {
  onDismiss?: () => void
}

export function HxGesturePanel({ onDismiss, children }: PropsWithChildren<HxGesturePanelProps>) {
  const x = useMotionValue(0)
  const smoothX = useSpring(x, { damping: 20, stiffness: 190 })

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -220, right: 220 }}
      style={{ x: smoothX, borderRadius: 16, border: '1px solid var(--hx-border)', background: 'var(--hx-surface)', padding: 14 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 130) onDismiss?.()
        x.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

