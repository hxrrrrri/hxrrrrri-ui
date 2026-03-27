import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'
import { cx } from '../lib-utils'

export interface HxCommandItem {
  id: string
  title: string
  subtitle?: string
  onSelect: () => void
}

interface HxCommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: HxCommandItem[]
  system?: HxSystem
}

export function HxCommandPalette({ open, onOpenChange, items, system = 'enterprise' }: HxCommandPaletteProps) {
  const [query, setQuery] = useState('')
  const themeVars = useTheme(system)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      }
      if (event.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return items
    return items.filter((item) => `${item.title} ${item.subtitle ?? ''}`.toLowerCase().includes(q))
  }, [items, query])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,14,0.6)', zIndex: 80, display: 'grid', placeItems: 'start center', paddingTop: 80 }}
        >
          <motion.div
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={{ ...themeVars, width: 'min(720px, 92vw)', borderRadius: 18, padding: 12 }}
          >
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a command or search"
              className="hx-focus"
              style={{ width: '100%', borderRadius: 12, border: '1px solid var(--hx-border)', padding: '12px 14px', marginBottom: 10 }}
            />
            <div style={{ maxHeight: 420, overflow: 'auto' }}>
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onSelect()
                    onOpenChange(false)
                  }}
                  className="hx-focus"
                  style={{ width: '100%', textAlign: 'left', border: 0, background: 'transparent', color: 'var(--hx-text)', padding: '10px 12px', borderRadius: 10 }}
                >
                  <div style={{ fontWeight: 700 }}>{item.title}</div>
                  {item.subtitle ? <div style={{ opacity: 0.72, fontSize: 13 }}>{item.subtitle}</div> : null}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

