import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

export interface HxDropdownOption {
  label: string
  value: string
}

interface HxDropdownProps {
  options: HxDropdownOption[]
  value?: string[]
  onChange?: (next: string[]) => void
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
  system?: HxSystem
}

export function HxDropdown({
  options,
  value = [],
  onChange,
  placeholder = 'Select',
  searchable = true,
  multiple = true,
  system = 'enterprise',
}: HxDropdownProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const themeVars = useTheme(system)

  const filtered = useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter((item) => item.label.toLowerCase().includes(q))
  }, [options, query])

  const selectedLabels = options.filter((o) => value.includes(o.value)).map((o) => o.label)

  return (
    <div className="hx-root" style={{ ...themeVars, position: 'relative' }}>
      <button
        className={cx('hx-focus hx-surface', getSystemClass(system))}
        onClick={() => setOpen((s) => !s)}
        style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 12, border: '1px solid var(--hx-border)' }}
      >
        {selectedLabels.length ? selectedLabels.join(', ') : placeholder}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className={cx('hx-surface', getSystemClass(system))}
            style={{ position: 'absolute', zIndex: 30, top: 'calc(100% + 6px)', width: '100%', borderRadius: 12, padding: 10 }}
          >
            {searchable ? (
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="hx-focus"
                style={{ width: '100%', borderRadius: 10, border: '1px solid var(--hx-border)', padding: '8px 10px', marginBottom: 8 }}
              />
            ) : null}
            <div style={{ maxHeight: 220, overflow: 'auto' }}>
              {filtered.map((opt) => {
                const checked = value.includes(opt.value)
                return (
                  <label key={opt.value} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 0' }}>
                    <input
                      type={multiple ? 'checkbox' : 'radio'}
                      checked={checked}
                      onChange={() => {
                        if (multiple) {
                          const next = checked ? value.filter((v) => v !== opt.value) : [...value, opt.value]
                          onChange?.(next)
                        } else {
                          onChange?.([opt.value])
                          setOpen(false)
                        }
                      }}
                    />
                    {opt.label}
                  </label>
                )
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

