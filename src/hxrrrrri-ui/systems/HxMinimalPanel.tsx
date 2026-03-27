import type { PropsWithChildren } from 'react'
import { HxCard } from '../core/HxCard'

export function HxMinimalPanel({ children }: PropsWithChildren) {
  return (
    <HxCard system="minimal" style={{ borderRadius: 0, boxShadow: 'none', borderWidth: 1 }}>
      {children}
    </HxCard>
  )
}

