import {
  useState, useRef, useEffect,
  type ReactNode, type HTMLAttributes, type KeyboardEvent,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

/* ─── shared micro-icons ─────────────────────────────────────── */
const ChevR = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
const ChevL = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
const ChevD = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>

// ─────────────────────────────────────────────────────────────────
// HxTabs
// ─────────────────────────────────────────────────────────────────
export interface HxTabItem { id: string; label: string; icon?: ReactNode; disabled?: boolean; badge?: string | number }

interface HxTabsProps {
  items: HxTabItem[]
  defaultTab?: string
  value?: string
  onChange?: (id: string) => void
  variant?: 'line' | 'pill' | 'enclosed' | 'soft'
  size?: 'sm' | 'md' | 'lg'
  system?: HxSystem
  children?: (activeId: string) => ReactNode
}

export function HxTabs({ items, defaultTab, value, onChange, variant = 'line', size = 'md', system = 'luxury', children }: HxTabsProps) {
  const [internal, setInternal] = useState(defaultTab ?? items[0]?.id)
  const active = value ?? internal
  const themeVars = useTheme(system)

  const select = (id: string) => {
    setInternal(id)
    onChange?.(id)
  }

  const szPad = { sm: '6px 12px', md: '9px 18px', lg: '12px 24px' }[size]
  const szFont = { sm: 12, md: 13, lg: 15 }[size]

  const wrapStyle: React.CSSProperties = {
    ...themeVars as React.CSSProperties,
    display: 'flex', gap: variant === 'enclosed' ? 0 : variant === 'pill' || variant === 'soft' ? 4 : 0,
    borderBottom: variant === 'line' || variant === 'enclosed' ? '1px solid var(--hx-border)' : 'none',
    background: variant === 'soft' ? 'color-mix(in oklab, var(--hx-border), transparent 40%)' : 'transparent',
    borderRadius: variant === 'soft' ? 10 : variant === 'pill' ? 999 : 0,
    padding: variant === 'soft' || variant === 'pill' ? 4 : 0,
  }

  return (
    <div className="hx-root" style={themeVars as React.CSSProperties}>
      <div role="tablist" style={wrapStyle}>
        {items.map(item => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`hx-tab-panel-${item.id}`}
              disabled={item.disabled}
              onClick={() => !item.disabled && select(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: szPad, fontSize: szFont, fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--hx-font-sans)', cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.4 : 1,
                border: variant === 'enclosed'
                  ? `1px solid ${isActive ? 'var(--hx-border)' : 'transparent'}`
                  : 'none',
                borderBottom: variant === 'line'
                  ? `2px solid ${isActive ? 'var(--hx-accent)' : 'transparent'}`
                  : variant === 'enclosed'
                  ? isActive ? '1px solid var(--hx-surface)' : '1px solid transparent'
                  : 'none',
                borderRadius: variant === 'pill' ? 999 : variant === 'soft' ? 8 : variant === 'enclosed' ? '8px 8px 0 0' : 0,
                background: isActive
                  ? variant === 'pill' ? 'var(--hx-accent)' : variant === 'soft' ? 'var(--hx-surface)' : 'transparent'
                  : 'transparent',
                color: isActive
                  ? variant === 'pill' ? '#fff' : 'var(--hx-accent)'
                  : 'var(--hx-text-muted)',
                marginBottom: variant === 'line' ? -1 : 0,
                transition: 'all 150ms ease',
                position: 'relative',
              }}
            >
              {item.icon && <span style={{ display:'flex', fontSize:16 }}>{item.icon}</span>}
              {item.label}
              {item.badge !== undefined && (
                <span style={{ fontSize:10, fontWeight:800, minWidth:18, height:18, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:99, background: isActive ? 'rgba(255,255,255,0.25)' : 'color-mix(in oklab, var(--hx-accent), transparent 75%)', color: isActive && variant==='pill' ? '#fff' : 'var(--hx-accent)', padding:'0 5px' }}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {children && (
        <div role="tabpanel" id={`hx-tab-panel-${active}`} style={{ paddingTop: 16 }}>
          {children(active)}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxBreadcrumb
// ─────────────────────────────────────────────────────────────────
export interface HxBreadcrumbItem { label: string; href?: string; onClick?: () => void; icon?: ReactNode }

interface HxBreadcrumbProps {
  items: HxBreadcrumbItem[]
  separator?: ReactNode
  maxItems?: number
  system?: HxSystem
}

export function HxBreadcrumb({ items, separator, maxItems, system = 'enterprise' }: HxBreadcrumbProps) {
  const themeVars = useTheme(system)
  const sep = separator ?? <ChevR/>

  let displayed = items
  let collapsed = false
  if (maxItems && items.length > maxItems) {
    displayed = [items[0], { label: '…' }, ...items.slice(-(maxItems - 1))]
    collapsed = true
  }

  return (
    <nav aria-label="Breadcrumb" className="hx-root" style={themeVars as React.CSSProperties}>
      <ol style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:4, listStyle:'none', padding:0, margin:0 }}>
        {displayed.map((item, i) => {
          const isLast = i === displayed.length - 1
          return (
            <li key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
              {i > 0 && <span style={{ color:'var(--hx-text-muted)', display:'flex', opacity:0.5 }}>{sep}</span>}
              {item.href || item.onClick ? (
                <a
                  href={item.href ?? '#'}
                  onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!() } : undefined}
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    display:'flex', alignItems:'center', gap:5, fontSize:13, fontWeight: isLast ? 600 : 400,
                    color: isLast ? 'var(--hx-text)' : 'var(--hx-accent)', textDecoration:'none',
                    transition:'opacity 150ms',
                  }}
                  onMouseEnter={e => !isLast && ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                >
                  {item.icon && <span style={{ display:'flex', fontSize:14 }}>{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <span style={{ fontSize:13, color:'var(--hx-text-muted)', display:'flex', alignItems:'center', gap:5 }}>
                  {item.icon && <span style={{ display:'flex', fontSize:14 }}>{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxPagination
// ─────────────────────────────────────────────────────────────────
interface HxPaginationProps {
  total: number
  page: number
  pageSize?: number
  onChange: (page: number) => void
  showEdges?: boolean
  siblings?: number
  system?: HxSystem
}

export function HxPagination({ total, page, pageSize = 10, onChange, showEdges = true, siblings = 1, system = 'enterprise' }: HxPaginationProps) {
  const themeVars = useTheme(system)
  const totalPages = Math.ceil(total / pageSize)

  const pages: (number | '…')[] = []
  const left  = Math.max(2, page - siblings)
  const right = Math.min(totalPages - 1, page + siblings)

  if (showEdges) pages.push(1)
  if (left > 2) pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < totalPages - 1) pages.push('…')
  if (totalPages > 1) pages.push(totalPages)

  const btnStyle = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    minWidth: 36, height: 36, borderRadius: system === 'minimal' ? 0 : system === 'brutalist' ? 0 : 9,
    border: active ? '1.5px solid var(--hx-accent)' : '1.5px solid var(--hx-border)',
    background: active ? 'var(--hx-accent)' : 'transparent',
    color: active ? '#fff' : disabled ? 'var(--hx-text-muted)' : 'var(--hx-text)',
    fontSize: 13, fontWeight: active ? 700 : 500, cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--hx-font-sans)', opacity: disabled ? 0.4 : 1,
    transition: 'all 150ms',
    ...(system === 'brutalist' && active ? { boxShadow: '3px 3px 0 var(--hx-text)' } : {}),
  })

  return (
    <nav aria-label="Pagination" className="hx-root" style={themeVars as React.CSSProperties}>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <button style={btnStyle(false, page <= 1)} onClick={() => page > 1 && onChange(page - 1)} aria-label="Previous page" disabled={page <= 1}>
          <ChevL/>
        </button>
        {pages.map((p, i) => (
          <button key={`${p}-${i}`}
            style={p === '…' ? { ...btnStyle(false), border:'none', cursor:'default' } : btnStyle(p === page)}
            onClick={() => typeof p === 'number' && onChange(p)}
            aria-label={typeof p === 'number' ? `Page ${p}` : 'More pages'}
            aria-current={p === page ? 'page' : undefined}
          >{p}</button>
        ))}
        <button style={btnStyle(false, page >= totalPages)} onClick={() => page < totalPages && onChange(page + 1)} aria-label="Next page" disabled={page >= totalPages}>
          <ChevR/>
        </button>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxStepper
// ─────────────────────────────────────────────────────────────────
export interface HxStepItem { label: string; description?: string; icon?: ReactNode; optional?: boolean }

interface HxStepperProps {
  steps: HxStepItem[]
  activeStep: number
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'dots' | 'progress'
  system?: HxSystem
}

export function HxStepper({ steps, activeStep, orientation = 'horizontal', variant = 'default', system = 'luxury' }: HxStepperProps) {
  const themeVars = useTheme(system)

  const dotColor = (i: number) =>
    i < activeStep ? 'var(--hx-accent)' : i === activeStep ? 'var(--hx-accent)' : 'color-mix(in oklab, var(--hx-border), var(--hx-surface) 40%)'

  if (variant === 'progress') {
    const pct = (activeStep / (steps.length - 1)) * 100
    return (
      <div className="hx-root" style={themeVars as React.CSSProperties}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:12, fontWeight:600, color:'var(--hx-accent)' }}>Step {activeStep+1} of {steps.length}</span>
          <span style={{ fontSize:12, color:'var(--hx-text-muted)' }}>{steps[activeStep]?.label}</span>
        </div>
        <div style={{ height:6, background:'color-mix(in oklab, var(--hx-border), transparent 20%)', borderRadius:999 }}>
          <motion.div animate={{ width:`${pct}%` }} transition={{ duration:0.4 }} style={{ height:'100%', borderRadius:999, background:'var(--hx-accent)' }}/>
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className="hx-root" style={{ ...themeVars as React.CSSProperties, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
        {steps.map((_, i) => (
          <motion.div key={i} animate={{ scale: i === activeStep ? 1.3 : 1, opacity: i === activeStep ? 1 : i < activeStep ? 0.7 : 0.3 }}
            style={{ width: i === activeStep ? 10 : 8, height: i === activeStep ? 10 : 8, borderRadius:'50%', background:'var(--hx-accent)', cursor:'default' }}/>
        ))}
      </div>
    )
  }

  // default
  if (orientation === 'vertical') {
    return (
      <div className="hx-root" style={{ ...themeVars as React.CSSProperties, display:'flex', flexDirection:'column' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display:'flex', gap:16 }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
              <motion.div animate={{ background: dotColor(i) }} style={{ width:30, height:30, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color: i <= activeStep ? '#fff' : 'var(--hx-text-muted)', border: i === activeStep ? '2px solid var(--hx-accent)' : '2px solid transparent', boxShadow: i === activeStep ? '0 0 0 4px color-mix(in oklab, var(--hx-accent), transparent 75%)' : 'none', flexShrink:0 }}>
                {i < activeStep ? '✓' : step.icon ?? (i + 1)}
              </motion.div>
              {i < steps.length - 1 && <div style={{ width:2, flex:1, minHeight:24, background: i < activeStep ? 'var(--hx-accent)' : 'var(--hx-border)', margin:'4px 0', transition:'background 400ms' }}/>}
            </div>
            <div style={{ paddingBottom: i < steps.length - 1 ? 24 : 0, paddingTop: 3 }}>
              <div style={{ fontSize:13, fontWeight: i === activeStep ? 700 : 500, color: i <= activeStep ? 'var(--hx-text)' : 'var(--hx-text-muted)' }}>
                {step.label}{step.optional && <span style={{ fontSize:11, color:'var(--hx-text-muted)', marginLeft:6 }}>(optional)</span>}
              </div>
              {step.description && <div style={{ fontSize:12, color:'var(--hx-text-muted)', marginTop:3, lineHeight:1.5 }}>{step.description}</div>}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // horizontal
  return (
    <div className="hx-root" style={{ ...themeVars as React.CSSProperties, display:'flex', alignItems:'flex-start' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display:'flex', alignItems:'flex-start', flex: i < steps.length - 1 ? 1 : 'none' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, flexShrink:0 }}>
            <motion.div animate={{ background: dotColor(i) }} style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color: i <= activeStep ? '#fff' : 'var(--hx-text-muted)', boxShadow: i === activeStep ? '0 0 0 4px color-mix(in oklab, var(--hx-accent), transparent 75%)' : 'none' }}>
              {i < activeStep ? '✓' : step.icon ?? (i + 1)}
            </motion.div>
            <div style={{ textAlign:'center', minWidth:80 }}>
              <div style={{ fontSize:12, fontWeight: i === activeStep ? 700 : 500, color: i <= activeStep ? 'var(--hx-text)' : 'var(--hx-text-muted)' }}>{step.label}</div>
              {step.optional && <div style={{ fontSize:10, color:'var(--hx-text-muted)' }}>optional</div>}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex:1, height:2, margin:'15px 8px 0', background: i < activeStep ? 'var(--hx-accent)' : 'var(--hx-border)', transition:'background 400ms' }}/>
          )}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxNavMenu  (dropdown nav menu)
// ─────────────────────────────────────────────────────────────────
export interface HxMenuGroup { label?: string; items: HxMenuItem[] }
export interface HxMenuItem { label: string; icon?: ReactNode; shortcut?: string; href?: string; onClick?: () => void; disabled?: boolean; danger?: boolean; divider?: boolean }

interface HxNavMenuProps {
  trigger: ReactNode
  groups: HxMenuGroup[]
  align?: 'left' | 'right'
  system?: HxSystem
}

export function HxNavMenu({ trigger, groups, align = 'left', system = 'luxury' }: HxNavMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const themeVars = useTheme(system)

  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    setTimeout(() => document.addEventListener('mousedown', h), 0)
    return () => document.removeEventListener('mousedown', h)
  }, [open])

  return (
    <div ref={ref} style={{ position:'relative', display:'inline-block', ...themeVars as React.CSSProperties }}>
      <div onClick={() => setOpen(s => !s)} style={{ cursor:'pointer' }}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:6, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:4, scale:0.97 }}
            transition={{ duration:0.15, ease:[0.22,1,0.36,1] }}
            className={cx('hx-surface', getSystemClass(system))}
            style={{ position:'absolute', top:'calc(100% + 6px)', [align==='right'?'right':'left']:0, minWidth:200, zIndex:50, padding:6, boxShadow:'var(--hx-shadow-md)' }}
          >
            {groups.map((group, gi) => (
              <div key={gi}>
                {group.label && <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--hx-text-muted)', padding:'8px 12px 4px' }}>{group.label}</div>}
                {group.items.map((item, ii) => {
                  if (item.divider) return <div key={ii} style={{ height:1, background:'var(--hx-border)', margin:'4px 0' }}/>
                  return (
                    <button key={ii}
                      disabled={item.disabled}
                      onClick={() => { if (!item.disabled) { item.onClick?.(); setOpen(false) } }}
                      style={{ display:'flex', alignItems:'center', gap:9, width:'100%', padding:'9px 12px', fontSize:13, fontWeight:500, borderRadius:system==='minimal'?0:8, border:'none', background:'transparent', cursor:item.disabled?'not-allowed':'pointer', color:item.danger?'#DC2626':item.disabled?'var(--hx-text-muted)':'var(--hx-text)', opacity:item.disabled?0.5:1, fontFamily:'var(--hx-font-sans)', transition:'background 100ms', textAlign:'left', justifyContent:'flex-start' }}
                      onMouseEnter={e => { if (!item.disabled) (e.currentTarget as HTMLButtonElement).style.background = item.danger ? 'rgba(220,38,38,0.1)' : 'color-mix(in oklab, var(--hx-border), transparent 30%)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                    >
                      {item.icon && <span style={{ display:'flex', fontSize:16, flexShrink:0 }}>{item.icon}</span>}
                      <span style={{ flex:1 }}>{item.label}</span>
                      {item.shortcut && <kbd style={{ fontSize:10, opacity:0.5, padding:'1px 5px', border:'1px solid var(--hx-border)', borderRadius:4, fontFamily:'var(--hx-font-mono)' }}>{item.shortcut}</kbd>}
                    </button>
                  )
                })}
                {gi < groups.length - 1 && <div style={{ height:1, background:'var(--hx-border)', margin:'4px 0' }}/>}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxSidebar
// ─────────────────────────────────────────────────────────────────
export interface HxSidebarItem { id: string; label: string; icon?: ReactNode; badge?: string | number; href?: string; onClick?: () => void; children?: HxSidebarItem[] }

interface HxSidebarProps {
  items: HxSidebarItem[]
  activeId?: string
  collapsed?: boolean
  width?: number
  header?: ReactNode
  footer?: ReactNode
  system?: HxSystem
  onNavigate?: (id: string) => void
}

export function HxSidebar({ items, activeId, collapsed = false, width = 240, header, footer, system = 'luxury', onNavigate }: HxSidebarProps) {
  const themeVars = useTheme(system)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (id: string) => setExpanded(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const renderItem = (item: HxSidebarItem, depth = 0) => {
    const isActive = item.id === activeId
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expanded.has(item.id)

    return (
      <div key={item.id}>
        <button
          onClick={() => { if (hasChildren) toggle(item.id); else { item.onClick?.(); onNavigate?.(item.id) } }}
          title={collapsed ? item.label : undefined}
          style={{
            display:'flex', alignItems:'center', gap:10, width:'100%', padding: collapsed ? '10px' : `10px ${12 + depth*12}px`,
            borderRadius: system === 'minimal' || system === 'brutalist' ? 0 : 9,
            border: 'none', cursor:'pointer', fontFamily:'var(--hx-font-sans)', fontSize:13,
            fontWeight: isActive ? 700 : 500, textAlign:'left', justifyContent: collapsed ? 'center' : 'flex-start',
            background: isActive ? 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 84%)' : 'transparent',
            color: isActive ? 'var(--hx-accent)' : 'var(--hx-text-muted)',
            transition:'all 150ms',
            ...(system === 'brutalist' && isActive ? { boxShadow:'3px 0 0 0 var(--hx-accent) inset' } : {}),
          }}
          onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in oklab, var(--hx-border), transparent 30%)' }}
          onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          {item.icon && <span style={{ display:'flex', fontSize:18, flexShrink:0 }}>{item.icon}</span>}
          {!collapsed && <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.label}</span>}
          {!collapsed && item.badge !== undefined && (
            <span style={{ fontSize:10, fontWeight:800, minWidth:18, height:18, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:99, background:'color-mix(in oklab, var(--hx-accent), transparent 75%)', color:'var(--hx-accent)', padding:'0 5px' }}>{item.badge}</span>
          )}
          {!collapsed && hasChildren && (
            <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} style={{ display:'flex', flexShrink:0, opacity:0.5 }}><ChevR/></motion.span>
          )}
        </button>
        <AnimatePresence>
          {!collapsed && hasChildren && isExpanded && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }} style={{ overflow:'hidden' }}>
              {item.children!.map(child => renderItem(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className={cx('hx-root hx-surface', getSystemClass(system))} style={{ ...themeVars as React.CSSProperties, width: collapsed ? 56 : width, display:'flex', flexDirection:'column', height:'100%', flexShrink:0, transition:'width 250ms var(--hx-ease)', overflow:'hidden' }}>
      {header && <div style={{ padding: collapsed ? '12px 8px' : '16px 12px', borderBottom:'1px solid var(--hx-border)', flexShrink:0 }}>{header}</div>}
      <nav style={{ flex:1, overflowY:'auto', padding:'8px', display:'flex', flexDirection:'column', gap:2 }}>
        {items.map(item => renderItem(item))}
      </nav>
      {footer && <div style={{ padding: collapsed ? '12px 8px' : '16px 12px', borderTop:'1px solid var(--hx-border)', flexShrink:0 }}>{footer}</div>}
    </div>
  )
}
