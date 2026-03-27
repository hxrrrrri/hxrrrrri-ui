import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import type { HxSystem } from '../types'
import { useSystemTheme } from '../core/ThemeProvider'

export function useTheme(system: HxSystem): CSSProperties {
  const t = useSystemTheme(system)
  return useMemo(
    () => ({
      '--hx-bg': t.background,
      '--hx-surface': t.surface,
      '--hx-text': t.text,
      '--hx-text-muted': t.textMuted,
      '--hx-accent': t.accent,
      '--hx-accent-alt': t.accentAlt,
      '--hx-border': t.border,
      '--hx-glow': t.glow ?? 'transparent',
    }) as CSSProperties,
    [t],
  )
}
