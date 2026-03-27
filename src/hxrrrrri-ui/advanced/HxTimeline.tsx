import { motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'
import { cx } from '../lib-utils'

export interface HxTimelineItem {
  id: string
  title: string
  description?: string
  date?: string
}

interface HxTimelineProps {
  items: HxTimelineItem[]
  system?: HxSystem
}

export function HxTimeline({ items, system = 'luxury' }: HxTimelineProps) {
  const themeVars = useTheme(system)

  return (
    <div className={cx('hx-root', getSystemClass(system))} style={{ ...themeVars, position: 'relative', paddingLeft: 24 }}>
      <div style={{ position: 'absolute', left: 8, top: 2, bottom: 2, width: 2, background: 'var(--hx-border)' }} />
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: index * 0.06 }}
          style={{ marginBottom: 16, padding: 12, borderRadius: 12, border: '1px solid var(--hx-border)', background: 'var(--hx-surface)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--hx-accent)' }} />
            <strong>{item.title}</strong>
            {item.date ? <small style={{ opacity: 0.7, marginLeft: 'auto' }}>{item.date}</small> : null}
          </div>
          {item.description ? <p style={{ margin: '8px 0 0', opacity: 0.84 }}>{item.description}</p> : null}
        </motion.article>
      ))}
    </div>
  )
}

