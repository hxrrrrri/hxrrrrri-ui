import type { PropsWithChildren } from 'react'
import { HxCard } from '../core/HxCard'

export function HxEnterprisePanel({ children }: PropsWithChildren) {
  return (
    <HxCard system="enterprise" style={{ borderRadius: 10, boxShadow: '0 10px 24px rgba(2, 28, 82, 0.09)' }}>
      {children}
    </HxCard>
  )
}

