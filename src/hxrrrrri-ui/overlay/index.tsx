import {
  useState, useRef, useEffect, useCallback,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

/* ─────────────────────────────────────────────────────────────────
   HxDrawer  (side panel / sheet)
───────────────────────────────────────────────────────────────── */
type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

interface HxDrawerProps {
  open: boolean
  onClose: () => void
  placement?: DrawerPlacement
  size?: 'sm' | 'md' | 'lg' | 'full'
  title?: string
  description?: string
  footer?: ReactNode
  closeOnOverlay?: boolean
  system?: HxSystem
  children?: ReactNode
}

const DRAWER_SIZES: Record<DrawerPlacement, Record<string, number | string>> = {
  left:   { sm:280, md:360, lg:480, full:'100%' },
  right:  { sm:280, md:360, lg:480, full:'100%' },
  top:    { sm:200, md:320, lg:480, full:'100%' },
  bottom: { sm:200, md:320, lg:480, full:'100%' },
}

const SLIDE: Record<DrawerPlacement, object> = {
  left:   { initial:{ x:'-100%' }, animate:{ x:0 }, exit:{ x:'-100%' } },
  right:  { initial:{ x:'100%' },  animate:{ x:0 }, exit:{ x:'100%' }  },
  top:    { initial:{ y:'-100%' }, animate:{ y:0 }, exit:{ y:'-100%' } },
  bottom: { initial:{ y:'100%' },  animate:{ y:0 }, exit:{ y:'100%' }  },
}

export function HxDrawer({ open, onClose, placement = 'right', size = 'md', title, description, footer, closeOnOverlay = true, system = 'luxury', children }: HxDrawerProps) {
  const themeVars = useTheme(system)
  const dim = DRAWER_SIZES[placement][size]
  const isHorizontal = placement === 'left' || placement === 'right'

  // ESC to close
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  const drawerStyle: React.CSSProperties = {
    position:'fixed',
    ...(placement==='left'   && { top:0, bottom:0, left:0, width:dim }),
    ...(placement==='right'  && { top:0, bottom:0, right:0, width:dim }),
    ...(placement==='top'    && { top:0, left:0, right:0, height:dim }),
    ...(placement==='bottom' && { bottom:0, left:0, right:0, height:dim }),
    zIndex: 70,
    display:'flex', flexDirection:'column', maxHeight:'100dvh',
    ...themeVars as React.CSSProperties,
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.22 }}
            onClick={closeOnOverlay ? onClose : undefined}
            style={{ position:'fixed', inset:0, zIndex:69, background:'rgba(0,0,0,0.52)', backdropFilter:'blur(3px)' }}
          />
          {/* Panel */}
          <motion.div
            {...SLIDE[placement]}
            transition={{ type:'spring', stiffness:340, damping:30 }}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={drawerStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'hx-drawer-title' : undefined}
          >
            {/* Header */}
            {title && (
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', padding:'20px 24px 16px', borderBottom:'1px solid var(--hx-border)', flexShrink:0, gap:16 }}>
                <div>
                  <h2 id="hx-drawer-title" style={{ margin:0, fontSize:17, fontWeight:700, color:'var(--hx-text)', lineHeight:1.3 }}>{title}</h2>
                  {description && <p style={{ margin:'4px 0 0', fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.5 }}>{description}</p>}
                </div>
                <button onClick={onClose} className="hx-focus" aria-label="Close drawer" style={{ display:'flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:8, border:'1px solid var(--hx-border)', background:'transparent', cursor:'pointer', color:'var(--hx-text)', flexShrink:0, transition:'background 150ms' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--hx-border)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}>
                  <XIcon/>
                </button>
              </div>
            )}
            {/* Body */}
            <div className="hx-scroll" style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>{children}</div>
            {/* Footer */}
            {footer && (
              <div style={{ padding:'16px 24px', borderTop:'1px solid var(--hx-border)', display:'flex', justifyContent:'flex-end', gap:10, flexShrink:0 }}>{footer}</div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxContextMenu
───────────────────────────────────────────────────────────────── */
export interface HxContextMenuItem { label: string; icon?: ReactNode; shortcut?: string; onClick?: () => void; disabled?: boolean; danger?: boolean; divider?: boolean }

interface HxContextMenuProps {
  items: HxContextMenuItem[]
  children: ReactNode
  system?: HxSystem
}

export function HxContextMenu({ items, children, system = 'luxury' }: HxContextMenuProps) {
  const [pos, setPos] = useState<{ x:number; y:number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const themeVars = useTheme(system)

  useEffect(() => {
    if (!pos) return
    const h = (e: MouseEvent) => { if (!menuRef.current?.contains(e.target as Node)) setPos(null) }
    setTimeout(() => document.addEventListener('mousedown', h), 0)
    return () => document.removeEventListener('mousedown', h)
  }, [pos])

  return (
    <div ref={ref} onContextMenu={e => { e.preventDefault(); setPos({ x:e.clientX, y:e.clientY }) }} style={{ display:'contents' }}>
      {children}
      <AnimatePresence>
        {pos && (
          <motion.div
            ref={menuRef}
            initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
            transition={{ duration:0.13 }}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={{ ...themeVars as React.CSSProperties, position:'fixed', left:pos.x, top:pos.y, zIndex:999, minWidth:200, padding:6, boxShadow:'var(--hx-shadow-strong)' }}
          >
            {items.map((item, i) => {
              if (item.divider) return <div key={i} style={{ height:1, background:'var(--hx-border)', margin:'4px 0' }}/>
              return (
                <button key={i} disabled={item.disabled}
                  onClick={() => { item.onClick?.(); setPos(null) }}
                  style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 12px', borderRadius:8, border:'none', background:'transparent', cursor:item.disabled?'not-allowed':'pointer', color:item.danger?'#DC2626':item.disabled?'var(--hx-text-muted)':'var(--hx-text)', fontSize:13, fontWeight:500, fontFamily:'var(--hx-font-sans)', opacity:item.disabled?0.5:1, transition:'background 100ms', textAlign:'left' }}
                  onMouseEnter={e => { if (!item.disabled) (e.currentTarget as HTMLButtonElement).style.background = item.danger?'rgba(220,38,38,0.1)':'color-mix(in oklab, var(--hx-border), transparent 30%)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                >
                  {item.icon && <span style={{ display:'flex', fontSize:16, flexShrink:0 }}>{item.icon}</span>}
                  <span style={{ flex:1 }}>{item.label}</span>
                  {item.shortcut && <kbd style={{ fontSize:10, opacity:0.5, padding:'1px 5px', border:'1px solid var(--hx-border)', borderRadius:4 }}>{item.shortcut}</kbd>}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxAlertDialog  (destructive confirmation)
───────────────────────────────────────────────────────────────── */
interface HxAlertDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
  system?: HxSystem
}

export function HxAlertDialog({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'danger', loading, system = 'luxury' }: HxAlertDialogProps) {
  const themeVars = useTheme(system)
  const confirmColor = { danger:'#DC2626', warning:'#D97706', info:'var(--hx-accent)' }[variant]
  const confirmIcon = { danger:'⚠', warning:'⚠', info:'ℹ' }[variant]

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:0.18 }}
          style={{ position:'fixed', inset:0, zIndex:80, background:'rgba(0,0,0,0.60)', backdropFilter:'blur(4px)', display:'grid', placeItems:'center', padding:20 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale:0.95, opacity:0, y:16 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0.97, opacity:0, y:8 }}
            transition={{ type:'spring', stiffness:400, damping:30 }}
            onClick={e => e.stopPropagation()}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={{ ...themeVars as React.CSSProperties, width:'min(440px,100%)', padding:0, overflow:'hidden' }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="hx-alert-title"
          >
            <div style={{ padding:'24px 24px 20px' }}>
              <div style={{ width:44, height:44, borderRadius:'50%', background:`${confirmColor}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:16, color:confirmColor }}>{confirmIcon}</div>
              <h2 id="hx-alert-title" style={{ margin:'0 0 8px', fontSize:17, fontWeight:700, color:'var(--hx-text)', lineHeight:1.3 }}>{title}</h2>
              {description && <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.6 }}>{description}</p>}
            </div>
            <div style={{ display:'flex', justifyContent:'flex-end', gap:10, padding:'16px 24px', borderTop:'1px solid var(--hx-border)' }}>
              <button onClick={onClose} style={{ padding:'9px 18px', borderRadius:system==='minimal'?0:9, border:'1.5px solid var(--hx-border)', background:'transparent', cursor:'pointer', fontFamily:'var(--hx-font-sans)', fontSize:13, fontWeight:600, color:'var(--hx-text)', transition:'background 150ms' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--hx-border)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
              >{cancelLabel}</button>
              <button onClick={onConfirm} disabled={loading} style={{ padding:'9px 18px', borderRadius:system==='minimal'?0:9, border:'none', background:confirmColor, cursor:loading?'wait':'pointer', fontFamily:'var(--hx-font-sans)', fontSize:13, fontWeight:700, color:'#fff', opacity:loading?0.7:1, transition:'opacity 150ms' }}>
                {loading ? '…' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxSheet  (bottom sheet, mobile-first)
───────────────────────────────────────────────────────────────── */
interface HxSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  snapPoints?: number[]   // percentages of viewport height
  system?: HxSystem
  children?: ReactNode
}

export function HxSheet({ open, onClose, title, system = 'luxury', children }: HxSheetProps) {
  const themeVars = useTheme(system)

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose} style={{ position:'fixed', inset:0, zIndex:69, background:'rgba(0,0,0,0.48)', backdropFilter:'blur(3px)' }}/>
          <motion.div
            initial={{ y:'100%' }} animate={{ y:0 }} exit={{ y:'100%' }}
            transition={{ type:'spring', stiffness:320, damping:30 }}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={{ ...themeVars as React.CSSProperties, position:'fixed', bottom:0, left:0, right:0, zIndex:70, maxHeight:'85dvh', display:'flex', flexDirection:'column', borderRadius:'20px 20px 0 0', overflow:'hidden' }}
          >
            {/* Drag handle */}
            <div style={{ display:'flex', justifyContent:'center', padding:'12px 0 4px', flexShrink:0 }}>
              <div style={{ width:40, height:4, borderRadius:99, background:'var(--hx-border)' }}/>
            </div>
            {title && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 20px 14px', borderBottom:'1px solid var(--hx-border)', flexShrink:0 }}>
                <h2 style={{ margin:0, fontSize:16, fontWeight:700, color:'var(--hx-text)' }}>{title}</h2>
                <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--hx-text-muted)', display:'flex' }}><XIcon/></button>
              </div>
            )}
            <div className="hx-scroll" style={{ flex:1, overflowY:'auto', padding:'16px 20px' }}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
