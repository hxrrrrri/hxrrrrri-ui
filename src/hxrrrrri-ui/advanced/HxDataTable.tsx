import { useMemo, useState } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

interface HxDataTableProps<T extends Record<string, unknown>> {
  rows: T[]
  columns: Array<{ key: keyof T; title: string }>
  rowHeight?: number
  viewportHeight?: number
  system?: HxSystem
}

export function HxDataTable<T extends Record<string, unknown>>({
  rows,
  columns,
  rowHeight = 38,
  viewportHeight = 360,
  system = 'enterprise',
}: HxDataTableProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const themeVars = useTheme(system)

  const visibleCount = Math.ceil(viewportHeight / rowHeight) + 6
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 3)
  const endIndex = Math.min(rows.length, startIndex + visibleCount)

  const visibleRows = useMemo(() => rows.slice(startIndex, endIndex), [rows, startIndex, endIndex])

  return (
    <div className={cx('hx-root hx-surface', getSystemClass(system))} style={{ ...themeVars, borderRadius: 14, border: '1px solid var(--hx-border)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns.length}, minmax(120px,1fr))`, borderBottom: '1px solid var(--hx-border)' }}>
        {columns.map((column) => (
          <strong key={String(column.key)} style={{ padding: '10px 12px', fontSize: 13 }}>
            {column.title}
          </strong>
        ))}
      </div>
      <div style={{ maxHeight: viewportHeight, overflow: 'auto', position: 'relative' }} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
        <div style={{ height: rows.length * rowHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${startIndex * rowHeight}px)` }}>
            {visibleRows.map((row, idx) => (
              <div
                key={startIndex + idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${columns.length}, minmax(120px,1fr))`,
                  borderBottom: '1px solid color-mix(in oklab, var(--hx-border), transparent 40%)',
                  minHeight: rowHeight,
                }}
              >
                {columns.map((column) => (
                  <span key={String(column.key)} style={{ padding: '8px 12px', fontSize: 13 }}>
                    {String(row[column.key] ?? '')}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

