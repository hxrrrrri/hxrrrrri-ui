import type { CSSProperties } from 'react'
import type { HxSystem } from '../types'

export function getSystemClass(system: HxSystem): string {
  return `hx-system-${system}`
}

export function getSystemShape(system: HxSystem): CSSProperties {
  if (system === 'brutalist') return { borderRadius: 0 }
  if (system === 'minimal') return { borderRadius: 0 }
  if (system === 'experimental') return { borderRadius: '22px 10px 28px 12px' }
  return {}
}
