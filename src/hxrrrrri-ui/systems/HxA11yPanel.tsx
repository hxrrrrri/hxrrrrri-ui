import type { PropsWithChildren } from 'react'
import { HxCard } from '../core/HxCard'

export function HxA11yPanel({ children }: PropsWithChildren) {
  return (
    <HxCard system="a11y" style={{ borderWidth: 2, boxShadow: 'none' }}>
      {children}
    </HxCard>
  )
}

