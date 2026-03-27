import type { PropsWithChildren } from 'react'
import { HxCard } from '../core/HxCard'

export function HxNeoPanel({ children }: PropsWithChildren) {
  return (
    <HxCard
      system="neofuturistic"
      tilt
      style={{
        border: '1px solid color-mix(in oklab, var(--hx-accent), white 25%)',
        boxShadow: '0 0 28px var(--hx-glow), inset 0 0 22px color-mix(in oklab, var(--hx-accent-alt), transparent 85%)',
      }}
    >
      {children}
    </HxCard>
  )
}

