import type { PropsWithChildren } from 'react'
import { HxCard } from '../core/HxCard'

export function HxExperimentalPanel({ children }: PropsWithChildren) {
  return (
    <HxCard
      system="experimental"
      tilt
      style={{
        borderRadius: '26px 10px 24px 12px',
        background: 'radial-gradient(circle at 85% 0%, color-mix(in oklab, var(--hx-accent), transparent 76%), var(--hx-surface))',
      }}
    >
      {children}
    </HxCard>
  )
}

