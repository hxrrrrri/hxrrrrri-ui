import { useEffect, useMemo, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'
import { cx } from '../lib-utils'

export interface HxCommandItem {
  id: string
  title: string
  subtitle?: string
  icon?: string
  kbd?: string
  onSelect: () => void
}

interface HxCommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: HxCommandItem[]
  system?: HxSystem
  placeholder?: string
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

export function HxCommandPalette({
  open, onOpenChange, items, system = 'luxury', placeholder = 'Type a command…'
}: HxCommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const themeVars = useTheme(system)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); onOpenChange(!open) }
      if (e.key === 'Escape') { onOpenChange(false); setQuery('') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onOpenChange])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return items
    return items.filter(item => `${item.title} ${item.subtitle ?? ''}`.toLowerCase().includes(q))
  }, [items, query])

  useEffect(() => { setCursor(0) }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)) }
    if (e.key === 'Enter' && filtered[cursor]) { filtered[cursor].onSelect(); onOpenChange(false); setQuery('') }
  }

  const select = (item: HxCommandItem) => {
    item.onSelect(); onOpenChange(false); setQuery('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => { onOpenChange(false); setQuery('') }}
          style={{
            position: 'fixed', inset: 0, zIndex: 'var(--hx-z-command)' as unknown as number,
            background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(6px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10vh',
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 440, damping: 34 }}
            onClick={e => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={{ ...themeVars as React.CSSProperties, width: 'min(680px, 94vw)', overflow: 'hidden' }}
            role="dialog"
            aria-label="Command palette"
          >
            {/* Search bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 18px', borderBottom: '1px solid var(--hx-border)',
            }}>
              <span style={{ color: 'var(--hx-text-muted)', flexShrink: 0, display: 'flex' }}><SearchIcon/></span>
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={placeholder}
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  color: 'var(--hx-text)', fontSize: 15, outline: 'none',
                  fontFamily: 'var(--hx-font-sans)',
                }}
              />
              <kbd style={{
                fontSize: 10, padding: '3px 7px', borderRadius: 5,
                border: '1px solid var(--hx-border)', color: 'var(--hx-text-muted)',
                background: 'color-mix(in oklab, var(--hx-surface), var(--hx-border) 30%)',
              }}>ESC</kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="hx-scroll" style={{ maxHeight: 400, overflowY: 'auto', padding: 8 }}>
              {filtered.length === 0 && (
                <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--hx-text-muted)', fontSize: 14 }}>
                  No results for "{query}"
                </div>
              )}
              {filtered.map((item, idx) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 2 }}
                  onClick={() => select(item)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                    padding: '11px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: idx === cursor ? 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 88%)' : 'transparent',
                    color: idx === cursor ? 'var(--hx-accent)' : 'var(--hx-text)',
                    fontFamily: 'var(--hx-font-sans)', marginBottom: 2,
                    transition: 'background 100ms',
                  }}
                  onMouseEnter={() => setCursor(idx)}
                >
                  {item.icon && <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>}
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{item.title}</div>
                    {item.subtitle && <div style={{ fontSize: 12, opacity: 0.65, marginTop: 1, lineHeight: 1.4 }}>{item.subtitle}</div>}
                  </div>
                  {item.kbd && (
                    <kbd style={{
                      fontSize: 10, padding: '3px 7px', borderRadius: 5, flexShrink: 0,
                      border: '1px solid var(--hx-border)', color: 'var(--hx-text-muted)',
                      background: 'color-mix(in oklab, var(--hx-surface), var(--hx-border) 30%)',
                    }}>{item.kbd}</kbd>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex', gap: 16, padding: '10px 18px',
              borderTop: '1px solid var(--hx-border)', color: 'var(--hx-text-muted)', fontSize: 12,
            }}>
              <span>↑↓ navigate</span>
              <span>⏎ select</span>
              <span>ESC close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
