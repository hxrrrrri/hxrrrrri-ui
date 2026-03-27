import { motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'
import { cx } from '../lib-utils'

export interface HxTimelineItem {
  id: string
  title: string
  date: string
  description?: string
  icon?: string
  status?: 'done' | 'active' | 'pending'
}

interface HxTimelineProps {
  items: HxTimelineItem[]
  system?: HxSystem
  orientation?: 'vertical' | 'horizontal'
}

const statusColor: Record<string, string> = {
  done:    'var(--hx-accent)',
  active:  'var(--hx-accent-alt)',
  pending: 'var(--hx-border)',
}

export function HxTimeline({ items, system = 'luxury', orientation = 'vertical' }: HxTimelineProps) {
  const themeVars = useTheme(system)

  if (orientation === 'horizontal') {
    return (
      <div className={cx('hx-root', getSystemClass(system))} style={{ ...themeVars as React.CSSProperties, display: 'flex', gap: 0, overflowX: 'auto' }}>
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto', width: 140 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 12 }}>
              <div style={{ flex: 1, height: 2, background: i === 0 ? 'transparent' : 'var(--hx-border)' }}/>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: statusColor[item.status ?? 'pending'], border: '3px solid var(--hx-bg)', flexShrink: 0 }}/>
              <div style={{ flex: 1, height: 2, background: i === items.length - 1 ? 'transparent' : 'var(--hx-border)' }}/>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--hx-accent)', marginBottom: 4 }}>{item.date}</div>
            <div style={{ fontWeight: 600, fontSize: 13, textAlign: 'center', color: 'var(--hx-text)' }}>{item.title}</div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className={cx('hx-root', getSystemClass(system))} style={{ ...themeVars as React.CSSProperties, display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          style={{ display: 'flex', gap: 20, paddingBottom: i < items.length - 1 ? 28 : 0 }}
        >
          {/* Line + dot */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 3 }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0, border: '3px solid var(--hx-bg)',
              background: statusColor[item.status ?? 'pending'],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: item.status === 'done' ? `0 0 10px var(--hx-accent)` : undefined,
              fontSize: 9,
            }}>
              {item.icon}
            </div>
            {i < items.length - 1 && (
              <div style={{ flex: 1, width: 2, background: 'var(--hx-border)', marginTop: 8, minHeight: 20 }}/>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, paddingBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--hx-text)' }}>{item.title}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--hx-accent)', background: 'color-mix(in oklab, var(--hx-accent), transparent 85%)', padding: '2px 8px', borderRadius: 99 }}>{item.date}</span>
            </div>
            {item.description && (
              <p style={{ margin: 0, fontSize: 13, color: 'var(--hx-text-muted)', lineHeight: 1.6 }}>{item.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
