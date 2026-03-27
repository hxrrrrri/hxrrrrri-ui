import type { PropsWithChildren } from 'react'
import { HxCard } from '../core/HxCard'

export function HxLuxuryPanel({ children }: PropsWithChildren) {
  return (
    <HxCard system="luxury" tilt style={{ background: 'linear-gradient(160deg, color-mix(in oklab, var(--hx-accent), transparent 86%), var(--hx-surface))' }}>
      {children}
    </HxCard>
  )
}

