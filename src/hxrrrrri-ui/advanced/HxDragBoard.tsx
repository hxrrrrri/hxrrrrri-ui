import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'
import { cx } from '../lib-utils'

export interface HxBoardItem { id: string; title: string; description?: string; tag?: string; lane: string }

interface HxDragBoardProps {
  lanes: string[]
  items: HxBoardItem[]
  onChange?: (items: HxBoardItem[]) => void
  system?: HxSystem
}

const TAG_COLORS: Record<string, string> = {
  'bug': '#DC2626', 'feature': '#7C3AED', 'design': '#0284C7',
  'urgent': '#EA580C', 'done': '#059669',
}

export function HxDragBoard({ lanes, items: initial, onChange, system = 'enterprise' }: HxDragBoardProps) {
  const [items, setItems] = useState(initial)
  const [dragging, setDragging] = useState<string | null>(null)
  const [overLane, setOverLane] = useState<string | null>(null)
  const themeVars = useTheme(system)

  const byLane = lanes.reduce<Record<string, HxBoardItem[]>>((acc, lane) => {
    acc[lane] = items.filter(i => i.lane === lane)
    return acc
  }, {})

  const move = (id: string, lane: string) => {
    const next = items.map(i => i.id === id ? { ...i, lane } : i)
    setItems(next)
    onChange?.(next)
  }

  return (
    <div className="hx-root" style={{ ...themeVars as React.CSSProperties, display: 'grid', gridTemplateColumns: `repeat(${lanes.length}, minmax(200px,1fr))`, gap: 12 }}>
      {lanes.map(lane => (
        <div
          key={lane}
          className={cx('hx-surface', getSystemClass(system))}
          style={{
            padding: 14, minHeight: 220,
            borderRadius: system === 'minimal' || system === 'brutalist' ? 0 : 14,
            border: `1.5px solid ${overLane === lane ? 'var(--hx-accent)' : 'var(--hx-border)'}`,
            background: overLane === lane
              ? 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 93%)'
              : 'var(--hx-surface)',
            transition: 'border-color 150ms, background 150ms',
          }}
          onDragOver={e => { e.preventDefault(); setOverLane(lane) }}
          onDragLeave={() => setOverLane(null)}
          onDrop={e => { e.preventDefault(); if (dragging) move(dragging, lane); setDragging(null); setOverLane(null) }}
        >
          {/* Lane header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.04em', color: 'var(--hx-text)' }}>{lane}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--hx-text-muted)', background: 'color-mix(in oklab, var(--hx-border), transparent 20%)', padding: '2px 8px', borderRadius: 99 }}>
              {byLane[lane]?.length ?? 0}
            </span>
          </div>

          {/* Cards */}
          <AnimatePresence>
            {(byLane[lane] ?? []).map(item => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                draggable
                onDragStart={(e: any) => { e.dataTransfer.setData('text/plain', item.id); setDragging(item.id) }}
                onDragEnd={() => setDragging(null)}
                whileHover={{ y: -2 }}
                style={{
                  background: 'var(--hx-bg)',
                  border: `1.5px solid ${dragging === item.id ? 'var(--hx-accent)' : 'var(--hx-border)'}`,
                  borderRadius: system === 'minimal' || system === 'brutalist' ? 0 : 10,
                  padding: '11px 13px', marginBottom: 8, cursor: 'grab',
                  opacity: dragging === item.id ? 0.5 : 1,
                  boxShadow: dragging === item.id ? 'var(--hx-shadow-soft)' : 'none',
                  transition: 'opacity 150ms, border-color 150ms',
                }}
              >
                {item.tag && (
                  <span style={{
                    display: 'inline-block', marginBottom: 7,
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '2px 8px', borderRadius: 99,
                    background: `${TAG_COLORS[item.tag.toLowerCase()] ?? 'var(--hx-accent)'}22`,
                    color: TAG_COLORS[item.tag.toLowerCase()] ?? 'var(--hx-accent)',
                    border: `1px solid ${TAG_COLORS[item.tag.toLowerCase()] ?? 'var(--hx-accent)'}44`,
                  }}>{item.tag}</span>
                )}
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--hx-text)', lineHeight: 1.4 }}>{item.title}</div>
                {item.description && (
                  <div style={{ fontSize: 12, color: 'var(--hx-text-muted)', marginTop: 4, lineHeight: 1.5 }}>{item.description}</div>
                )}
              </motion.article>
            ))}
          </AnimatePresence>

          {/* Drop hint */}
          {overLane === lane && dragging && (
            <div style={{
              border: `2px dashed var(--hx-accent)`, borderRadius: 10,
              padding: '12px', textAlign: 'center', fontSize: 12,
              color: 'var(--hx-accent)', opacity: 0.7,
            }}>Drop here</div>
          )}
        </div>
      ))}
    </div>
  )
}
