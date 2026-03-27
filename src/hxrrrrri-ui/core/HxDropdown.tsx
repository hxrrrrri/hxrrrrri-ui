import { useMemo, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

export interface HxDropdownOption { label: string; value: string; icon?: string }

interface HxDropdownProps {
  options: HxDropdownOption[]
  value?: string[]
  onChange?: (next: string[]) => void
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
  system?: HxSystem
  label?: string
}

const ChevDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)
const Check = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export function HxDropdown({
  options, value = [], onChange, placeholder = 'Select…',
  searchable = true, multiple = false, system = 'luxury', label,
}: HxDropdownProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const themeVars = useTheme(system)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setOpen(false) }
    setTimeout(() => document.addEventListener('mousedown', h), 0)
    return () => document.removeEventListener('mousedown', h)
  }, [open])

  const filtered = useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter(o => o.label.toLowerCase().includes(q))
  }, [options, query])

  const selectedLabels = options.filter(o => value.includes(o.value)).map(o => o.label)
  const display = selectedLabels.length ? selectedLabels.join(', ') : placeholder

  const toggle = (val: string) => {
    if (multiple) {
      const next = value.includes(val) ? value.filter(v => v !== val) : [...value, val]
      onChange?.(next)
    } else {
      onChange?.([val])
      setOpen(false)
    }
  }

  const radius = system === 'minimal' || system === 'brutalist' ? 0 : system === 'a11y' ? 6 : 11

  return (
    <div ref={wrapRef} className="hx-root" style={{ ...themeVars as React.CSSProperties, position: 'relative' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--hx-text-muted)' }}>
          {label}
        </label>
      )}
      <button
        type="button"
        className={cx('hx-focus hx-surface', getSystemClass(system))}
        onClick={() => setOpen(s => !s)}
        style={{
          width: '100%', textAlign: 'left', padding: '10px 14px',
          borderRadius: radius, border: '1.5px solid var(--hx-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          cursor: 'pointer', color: selectedLabels.length ? 'var(--hx-text)' : 'var(--hx-text-muted)',
          fontSize: 14, fontFamily: 'var(--hx-font-sans)',
          transition: 'border-color 150ms',
          background: 'var(--hx-surface)',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{display}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ flexShrink: 0, color: 'var(--hx-text-muted)', display: 'flex' }}>
          <ChevDown/>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={cx('hx-surface', getSystemClass(system))}
            style={{
              position: 'absolute', zIndex: 'var(--hx-z-dropdown)' as unknown as number,
              top: 'calc(100% + 6px)', left: 0, width: '100%',
              borderRadius: radius, padding: 8,
              boxShadow: 'var(--hx-shadow-md)',
              overflow: 'hidden',
            }}
          >
            {searchable && (
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search…"
                className="hx-focus"
                style={{
                  display: 'block', width: '100%', borderRadius: radius, marginBottom: 6,
                  border: '1.5px solid var(--hx-border)', padding: '8px 10px', fontSize: 13,
                  background: 'var(--hx-surface)', color: 'var(--hx-text)', outline: 'none',
                  fontFamily: 'var(--hx-font-sans)',
                }}
              />
            )}
            <div className="hx-scroll" style={{ maxHeight: 240, overflowY: 'auto' }}>
              {filtered.length === 0 && (
                <div style={{ padding: '10px 12px', fontSize: 13, color: 'var(--hx-text-muted)', textAlign: 'center' }}>No options</div>
              )}
              {filtered.map(opt => {
                const checked = value.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className="hx-focus"
                    onClick={() => toggle(opt.value)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', padding: '9px 12px', borderRadius: radius,
                      border: 'none', background: checked
                        ? 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 88%)'
                        : 'transparent',
                      color: checked ? 'var(--hx-accent)' : 'var(--hx-text)',
                      cursor: 'pointer', fontSize: 13, textAlign: 'left',
                      marginBottom: 2, fontFamily: 'var(--hx-font-sans)',
                      transition: 'background 120ms',
                    }}
                    onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in oklab, var(--hx-border), transparent 30%)' }}
                    onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                  >
                    <span>{opt.icon && <span style={{ marginRight: 7 }}>{opt.icon}</span>}{opt.label}</span>
                    {checked && <span style={{ color: 'var(--hx-accent)', display: 'flex' }}><Check/></span>}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
