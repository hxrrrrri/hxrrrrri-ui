import { motion } from 'framer-motion'
import type { PropsWithChildren, ReactNode } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'
import { cx } from '../lib-utils'

interface HxDashboardGridProps {
  system?: HxSystem
  columns?: number
  gap?: number
}
interface HxDashboardTileProps {
  system?: HxSystem
  colSpan?: number
  rowSpan?: number
  title?: string
  value?: string | number
  subtitle?: string
  accent?: boolean
  trend?: { value: number; label?: string }
  icon?: ReactNode
}

const TrendUp = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
const TrendDn = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>

export function HxDashboardGrid({ system = 'enterprise', columns = 12, gap = 14, children }: PropsWithChildren<HxDashboardGridProps>) {
  const themeVars = useTheme(system)
  return (
    <div className={cx('hx-root', getSystemClass(system))} style={{ ...themeVars as React.CSSProperties, display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}>
      {children}
    </div>
  )
}

export function HxDashboardTile({
  system = 'enterprise', colSpan = 4, rowSpan = 1,
  title, value, subtitle, accent = false, trend, icon, children,
}: PropsWithChildren<HxDashboardTileProps>) {
  const themeVars = useTheme(system)
  const trendPositive = trend ? trend.value >= 0 : null

  return (
    <motion.div
      className={cx('hx-root hx-surface', getSystemClass(system))}
      whileHover={{ y: -2 }}
      style={{
        ...themeVars as React.CSSProperties,
        gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`,
        padding: '16px 20px', position: 'relative', overflow: 'hidden',
        transition: 'box-shadow 200ms var(--hx-ease)',
      }}
    >
      {accent && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--hx-accent), var(--hx-accent-alt))' }}/>
      )}
      {(title || icon) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: value ? 12 : 0 }}>
          {title && <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--hx-text-muted)', textTransform: 'uppercase' }}>{title}</div>}
          {icon && <div style={{ color: 'var(--hx-accent)', display: 'flex', fontSize: 20 }}>{icon}</div>}
        </div>
      )}
      {value !== undefined && (
        <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--hx-text)', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: subtitle || trend ? 8 : 0 }}>
          {value}
        </div>
      )}
      {(subtitle || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {subtitle && <span style={{ fontSize: 12, color: 'var(--hx-text-muted)' }}>{subtitle}</span>}
          {trend && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: trendPositive ? '#059669' : '#DC2626' }}>
              {trendPositive ? <TrendUp/> : <TrendDn/>}
              {trendPositive ? '+' : ''}{trend.value}%
              {trend.label && <span style={{ fontWeight: 400, color: 'var(--hx-text-muted)' }}>{trend.label}</span>}
            </span>
          )}
        </div>
      )}
      {children}
    </motion.div>
  )
}
