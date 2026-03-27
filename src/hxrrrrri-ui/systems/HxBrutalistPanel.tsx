import type { PropsWithChildren } from 'react'
import { HxCard } from '../core/HxCard'

export function HxBrutalistPanel({ children }: PropsWithChildren) {
  return (
    <HxCard system="brutalist" style={{ borderWidth: 3, boxShadow: '10px 10px 0 #000', borderRadius: 0 }}>
      {children}
    </HxCard>
  )
}

