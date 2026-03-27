import { useMemo, useState } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

const SortIcon = ({ dir }: { dir: 'asc' | 'desc' | null }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    {dir === 'asc'  ? <polyline points="18 15 12 9 6 15"/> :
     dir === 'desc' ? <polyline points="6 9 12 15 18 9"/> :
     <><polyline points="6 9 12 3 18 9"/><polyline points="6 15 12 21 18 15"/></>}
  </svg>
)

interface HxDataTableProps<T extends Record<string, unknown>> {
  rows: T[]
  columns: Array<{ key: keyof T; title: string; width?: number; render?: (val: unknown, row: T) => React.ReactNode }>
  rowHeight?: number
  viewportHeight?: number
  system?: HxSystem
  striped?: boolean
  searchable?: boolean
}

export function HxDataTable<T extends Record<string, unknown>>({
  rows, columns, rowHeight = 42, viewportHeight = 380,
  system = 'enterprise', striped = true, searchable = false,
}: HxDataTableProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState('')
  const themeVars = useTheme(system)

  const sorted = useMemo(() => {
    let data = [...rows]
    if (query) {
      const q = query.toLowerCase()
      data = data.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(q)))
    }
    if (sortKey) {
      data.sort((a, b) => {
        const av = String(a[sortKey] ?? ''), bv = String(b[sortKey] ?? '')
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      })
    }
    return data
  }, [rows, sortKey, sortDir, query])

  const visibleCount = Math.ceil(viewportHeight / rowHeight) + 8
  const startIndex  = Math.max(0, Math.floor(scrollTop / rowHeight) - 4)
  const endIndex    = Math.min(sorted.length, startIndex + visibleCount)
  const visibleRows = useMemo(() => sorted.slice(startIndex, endIndex), [sorted, startIndex, endIndex])

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const rad = system === 'minimal' || system === 'brutalist' ? 0 : system === 'enterprise' ? 10 : 14

  return (
    <div className={cx('hx-root hx-surface', getSystemClass(system))} style={{ ...themeVars as React.CSSProperties, borderRadius: rad, overflow: 'hidden' }}>
      {searchable && (
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--hx-border)' }}>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            style={{
              width: '100%', border: '1.5px solid var(--hx-border)', borderRadius: rad,
              padding: '8px 12px', fontSize: 13, background: 'var(--hx-bg)', color: 'var(--hx-text)',
              outline: 'none', fontFamily: 'var(--hx-font-sans)',
            }}
          />
        </div>
      )}

      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: columns.map(c => c.width ? `${c.width}px` : 'minmax(80px,1fr)').join(' '),
        borderBottom: `2px solid var(--hx-border)`,
      }}>
        {columns.map(col => (
          <button
            key={String(col.key)} type="button"
            onClick={() => toggleSort(col.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 14px', fontWeight: 700, fontSize: 12,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: sortKey === col.key ? 'var(--hx-accent)' : 'var(--hx-text-muted)',
              background: 'transparent', border: 'none', cursor: 'pointer',
              textAlign: 'left', fontFamily: 'var(--hx-font-sans)',
              transition: 'color 120ms',
            }}
          >
            {col.title}
            <span style={{ opacity: 0.6, display: 'flex', flexShrink: 0 }}>
              <SortIcon dir={sortKey === col.key ? sortDir : null}/>
            </span>
          </button>
        ))}
      </div>

      {/* Virtualised body */}
      <div
        className="hx-scroll"
        style={{ maxHeight: viewportHeight, overflowY: 'auto', position: 'relative' }}
        onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div style={{ height: sorted.length * rowHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${startIndex * rowHeight}px)`, position: 'absolute', left: 0, right: 0 }}>
            {visibleRows.map((row, idx) => {
              const absIdx = startIndex + idx
              return (
                <div
                  key={absIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: columns.map(c => c.width ? `${c.width}px` : 'minmax(80px,1fr)').join(' '),
                    minHeight: rowHeight,
                    borderBottom: '1px solid color-mix(in oklab, var(--hx-border), transparent 35%)',
                    background: striped && absIdx % 2 === 1
                      ? 'color-mix(in oklab, var(--hx-border), transparent 70%)' : 'transparent',
                    transition: 'background 80ms',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 92%)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = striped && absIdx % 2 === 1 ? 'color-mix(in oklab, var(--hx-border), transparent 70%)' : 'transparent'}
                >
                  {columns.map(col => (
                    <div key={String(col.key)} style={{ padding: '10px 14px', fontSize: 13, display: 'flex', alignItems: 'center', color: 'var(--hx-text)' }}>
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 14px', borderTop: '1px solid var(--hx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--hx-text-muted)' }}>
          {query ? `${sorted.length} of ${rows.length}` : rows.length} rows
        </span>
      </div>
    </div>
  )
}
