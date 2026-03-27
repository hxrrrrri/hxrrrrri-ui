import { useMemo, useState } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'
import { cx } from '../lib-utils'

export interface HxBoardItem {
  id: string
  title: string
  lane: string
}

interface HxDragBoardProps {
  lanes: string[]
  items: HxBoardItem[]
  onChange?: (items: HxBoardItem[]) => void
  system?: HxSystem
}

export function HxDragBoard({ lanes, items: initialItems, onChange, system = 'enterprise' }: HxDragBoardProps) {
  const [items, setItems] = useState(initialItems)
  const themeVars = useTheme(system)

  const byLane = useMemo(() => {
    const grouped = new Map<string, HxBoardItem[]>()
    for (const lane of lanes) grouped.set(lane, [])
    for (const item of items) grouped.get(item.lane)?.push(item)
    return grouped
  }, [items, lanes])

  return (
    <div className="hx-root" style={{ ...themeVars, display: 'grid', gridTemplateColumns: `repeat(${lanes.length}, minmax(220px,1fr))`, gap: 14 }}>
      {lanes.map((lane) => (
        <div
          key={lane}
          className={cx('hx-surface', getSystemClass(system))}
          style={{ borderRadius: 14, border: '1px solid var(--hx-border)', minHeight: 200, padding: 10 }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            const id = event.dataTransfer.getData('text/plain')
            const next = items.map((i) => (i.id === id ? { ...i, lane } : i))
            setItems(next)
            onChange?.(next)
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{lane}</div>
          {(byLane.get(lane) ?? []).map((item) => (
            <article
              key={item.id}
              draggable
              onDragStart={(event) => event.dataTransfer.setData('text/plain', item.id)}
              className="hx-focus"
              style={{ background: 'var(--hx-bg)', border: '1px solid var(--hx-border)', borderRadius: 10, padding: '10px 12px', marginBottom: 8, cursor: 'grab' }}
            >
              {item.title}
            </article>
          ))}
        </div>
      ))}
    </div>
  )
}

