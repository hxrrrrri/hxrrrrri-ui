import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'
import { cx } from '../lib-utils'

interface HxDashboardGridProps {
  system?: HxSystem
}

export function HxDashboardGrid({ system = 'enterprise', children }: PropsWithChildren<HxDashboardGridProps>) {
  const themeVars = useTheme(system)
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={{ initial: {}, animate: { transition: { staggerChildren: 0.06 } } }}
      className={cx('hx-root hx-grid-bg', getSystemClass(system))}
      style={{ ...themeVars, display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', gap: 14, padding: 14, borderRadius: 16 }}
    >
      {children}
    </motion.section>
  )
}

interface HxDashboardTileProps {
  colSpan?: number
  rowSpan?: number
  system?: HxSystem
}

export function HxDashboardTile({ colSpan = 4, rowSpan = 1, system = 'enterprise', children }: PropsWithChildren<HxDashboardTileProps>) {
  const themeVars = useTheme(system)
  return (
    <motion.article
      variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}
      className={cx('hx-root hx-surface', getSystemClass(system))}
      style={{ ...themeVars, gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`, borderRadius: 12, padding: 14, border: '1px solid var(--hx-border)' }}
    >
      {children}
    </motion.article>
  )
}

