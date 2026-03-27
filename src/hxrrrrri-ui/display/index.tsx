import {
  useState, useRef, useEffect, useId,
  type ReactNode, type HTMLAttributes, type CSSProperties,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

/* ─────────────────────────────────────────────────────────────────
   HxTooltip
───────────────────────────────────────────────────────────────── */
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

interface HxTooltipProps {
  label: string
  placement?: TooltipPlacement
  delay?: number
  children: ReactNode
  system?: HxSystem
}

export function HxTooltip({ label, placement = 'top', delay = 200, children, system = 'luxury' }: HxTooltipProps) {
  const [show, setShow] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const themeVars = useTheme(system)

  const open  = () => { timer.current = setTimeout(() => setShow(true),  delay) }
  const close = () => { if (timer.current) clearTimeout(timer.current); setShow(false) }

  const posStyle: Record<TooltipPlacement, CSSProperties> = {
    top:    { bottom:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)' },
    bottom: { top:'calc(100% + 8px)',    left:'50%', transform:'translateX(-50%)' },
    left:   { right:'calc(100% + 8px)', top:'50%',  transform:'translateY(-50%)' },
    right:  { left:'calc(100% + 8px)',  top:'50%',  transform:'translateY(-50%)' },
  }

  return (
    <div style={{ position:'relative', display:'inline-flex' }} onMouseEnter={open} onMouseLeave={close} onFocus={open} onBlur={close}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            role="tooltip"
            initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
            transition={{ duration:0.12 }}
            style={{ ...themeVars as CSSProperties, position:'absolute', ...posStyle[placement], zIndex:100, pointerEvents:'none', whiteSpace:'nowrap', padding:'6px 12px', borderRadius:8, background:'var(--hx-text)', color:'var(--hx-bg)', fontSize:12, fontWeight:500, lineHeight:1.4, boxShadow:'var(--hx-shadow-soft)' }}
          >{label}</motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxPopover
───────────────────────────────────────────────────────────────── */
interface HxPopoverProps {
  trigger: ReactNode
  content: ReactNode
  title?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger_on?: 'click' | 'hover'
  system?: HxSystem
}

export function HxPopover({ trigger, content, title, placement = 'bottom', trigger_on = 'click', system = 'luxury' }: HxPopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const themeVars = useTheme(system)

  useEffect(() => {
    if (!open || trigger_on !== 'click') return
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    setTimeout(() => document.addEventListener('mousedown', h), 0)
    return () => document.removeEventListener('mousedown', h)
  }, [open, trigger_on])

  const posStyle: Record<string, CSSProperties> = {
    top:    { bottom:'calc(100% + 10px)', left:'50%', transform:'translateX(-50%)' },
    bottom: { top:'calc(100% + 10px)',    left:'50%', transform:'translateX(-50%)' },
    left:   { right:'calc(100% + 10px)', top:'50%',  transform:'translateY(-50%)' },
    right:  { left:'calc(100% + 10px)',  top:'50%',  transform:'translateY(-50%)' },
  }

  const handlers = trigger_on === 'hover'
    ? { onMouseEnter:()=>setOpen(true), onMouseLeave:()=>setOpen(false) }
    : { onClick:()=>setOpen(s=>!s) }

  return (
    <div ref={ref} style={{ position:'relative', display:'inline-block' }} {...handlers}>
      {trigger}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:6, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:4, scale:0.97 }}
            transition={{ duration:0.16, ease:[0.22,1,0.36,1] }}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={{ ...themeVars as CSSProperties, position:'absolute', ...posStyle[placement], zIndex:60, minWidth:200, maxWidth:320, boxShadow:'var(--hx-shadow-md)', padding:0, overflow:'hidden' }}
          >
            {title && <div style={{ padding:'12px 16px 10px', borderBottom:'1px solid var(--hx-border)', fontWeight:700, fontSize:14, color:'var(--hx-text)' }}>{title}</div>}
            <div style={{ padding:'12px 16px' }}>{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxAccordion
───────────────────────────────────────────────────────────────── */
export interface HxAccordionItem { id: string; title: string; content: ReactNode; icon?: ReactNode; disabled?: boolean }

interface HxAccordionProps {
  items: HxAccordionItem[]
  defaultOpen?: string[]
  multiple?: boolean
  variant?: 'default' | 'separated' | 'flush'
  system?: HxSystem
}

export function HxAccordion({ items, defaultOpen = [], multiple = false, variant = 'default', system = 'luxury' }: HxAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen))
  const themeVars = useTheme(system)

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) }
      else { if (!multiple) next.clear(); next.add(id) }
      return next
    })
  }

  return (
    <div className={cx('hx-root', getSystemClass(system))} style={{ ...themeVars as CSSProperties, display:'flex', flexDirection:'column', gap:variant==='separated'?8:0, border:variant==='default'?'1px solid var(--hx-border)':undefined, borderRadius:variant==='default'?(system==='minimal'?0:12):undefined, overflow:'hidden' }}>
      {items.map((item, i) => {
        const isOpen = openIds.has(item.id)
        return (
          <div key={item.id} style={{ borderBottom:variant!=='separated'&&i<items.length-1?'1px solid var(--hx-border)':undefined, border:variant==='separated'?'1px solid var(--hx-border)':undefined, borderRadius:variant==='separated'?(system==='minimal'?0:10):undefined, overflow:'hidden' }}>
            <button
              onClick={() => !item.disabled && toggle(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              style={{ display:'flex', alignItems:'center', gap:12, width:'100%', padding:'14px 16px', background:isOpen?'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 93%)':'transparent', border:'none', cursor:item.disabled?'not-allowed':'pointer', fontFamily:'var(--hx-font-sans)', fontSize:14, fontWeight:600, color:item.disabled?'var(--hx-text-muted)':isOpen?'var(--hx-accent)':'var(--hx-text)', textAlign:'left', transition:'background 150ms, color 150ms' }}
            >
              {item.icon && <span style={{ display:'flex', fontSize:18, flexShrink:0 }}>{item.icon}</span>}
              <span style={{ flex:1 }}>{item.title}</span>
              <motion.span animate={{ rotate:isOpen?180:0 }} transition={{ duration:0.22 }} style={{ display:'flex', flexShrink:0, opacity:0.6 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.22, ease:[0.22,1,0.36,1] }} style={{ overflow:'hidden' }}>
                  <div style={{ padding:'4px 16px 16px', fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.65 }}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxTag / HxTagGroup
───────────────────────────────────────────────────────────────── */
interface HxTagProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void
  icon?: ReactNode
  variant?: 'subtle' | 'outline' | 'solid'
  color?: string
  size?: 'sm' | 'md' | 'lg'
  system?: HxSystem
}

export function HxTag({ children, onRemove, icon, variant = 'subtle', color, size = 'md', system = 'luxury', style, ...rest }: HxTagProps) {
  const themeVars = useTheme(system)
  const c = color ?? 'var(--hx-accent)'
  const sz = { sm:'8px 10px', md:'5px 12px', lg:'7px 16px' }[size]
  const fsz = { sm:10, md:12, lg:13 }[size]

  const variantStyle: CSSProperties = {
    subtle:  { background:`color-mix(in oklab, ${c}, transparent 80%)`, border:`1px solid color-mix(in oklab, ${c}, transparent 60%)`, color:c },
    outline: { background:'transparent', border:`1.5px solid ${c}`, color:c },
    solid:   { background:c, border:`1px solid ${c}`, color:'#fff' },
  }[variant]

  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:sz, borderRadius:system==='minimal'?0:999, fontSize:fsz, fontWeight:600, letterSpacing:'0.04em', ...variantStyle, ...style }} {...rest}>
      {icon && <span style={{ display:'flex', fontSize:fsz+2 }}>{icon}</span>}
      {children}
      {onRemove && (
        <button onClick={e => { e.stopPropagation(); onRemove() }} style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', color:'currentcolor', opacity:0.6, padding:0, marginLeft:2, lineHeight:1, fontSize:fsz+2 }}>×</button>
      )}
    </span>
  )
}

interface HxTagGroupProps {
  tags: Array<{ id: string; label: string; color?: string }>
  selectable?: boolean
  selected?: string[]
  onChange?: (selected: string[]) => void
  onRemove?: (id: string) => void
  system?: HxSystem
}

export function HxTagGroup({ tags, selectable, selected = [], onChange, onRemove, system = 'luxury' }: HxTagGroupProps) {
  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]
    onChange?.(next)
  }

  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
      {tags.map(tag => (
        <HxTag key={tag.id} color={tag.color} system={system}
          variant={selectable ? (selected.includes(tag.id) ? 'solid' : 'subtle') : 'subtle'}
          onClick={selectable ? () => toggle(tag.id) : undefined}
          onRemove={onRemove ? () => onRemove(tag.id) : undefined}
          style={{ cursor:selectable?'pointer':'default' }}
        >{tag.label}</HxTag>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxAvatarGroup
───────────────────────────────────────────────────────────────── */
export interface HxAvatarData { src?: string; name: string; color?: string }

interface HxAvatarGroupProps {
  avatars: HxAvatarData[]
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  system?: HxSystem
}

function getInitials(name: string) { return name.split(' ').slice(0,2).map(n=>n[0]?.toUpperCase()).join('') }

export function HxAvatarGroup({ avatars, max = 5, size = 'md', system = 'luxury' }: HxAvatarGroupProps) {
  const themeVars = useTheme(system)
  const sz = { sm:28, md:36, lg:46, xl:60 }[size]
  const fsz = { sm:10, md:12, lg:15, xl:19 }[size]
  const visible = avatars.slice(0, max)
  const extra = avatars.length - max

  return (
    <div className="hx-root" style={{ ...themeVars as CSSProperties, display:'flex' }}>
      {visible.map((av, i) => (
        <div key={i} style={{ width:sz, height:sz, borderRadius:'50%', border:`2px solid var(--hx-bg)`, marginLeft:i>0?-sz*0.28:0, zIndex:visible.length-i, overflow:'hidden', flexShrink:0, background:av.color??`hsl(${i*47+20},55%,48%)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:fsz, fontWeight:700, color:'#fff', cursor:'default' }} title={av.name}>
          {av.src ? <img src={av.src} alt={av.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : getInitials(av.name)}
        </div>
      ))}
      {extra > 0 && (
        <div style={{ width:sz, height:sz, borderRadius:'50%', border:'2px solid var(--hx-bg)', marginLeft:-sz*0.28, zIndex:0, background:'var(--hx-border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:fsz, fontWeight:700, color:'var(--hx-text-muted)' }}>+{extra}</div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxStat (display metric)
───────────────────────────────────────────────────────────────── */
interface HxStatProps {
  label: string
  value: string | number
  helpText?: string
  indicator?: { value: number; label?: string }
  icon?: ReactNode
  system?: HxSystem
}

export function HxStat({ label, value, helpText, indicator, icon, system = 'enterprise' }: HxStatProps) {
  const themeVars = useTheme(system)
  const positive = indicator ? indicator.value >= 0 : null
  return (
    <div className="hx-root" style={themeVars as CSSProperties}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
        <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--hx-text-muted)' }}>{label}</span>
        {icon && <span style={{ color:'var(--hx-accent)', display:'flex', fontSize:20 }}>{icon}</span>}
      </div>
      <div style={{ fontSize:32, fontWeight:800, color:'var(--hx-text)', lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:6 }}>{value}</div>
      {(helpText || indicator) && (
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {indicator && (
            <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:700, color:positive?'#059669':'#DC2626' }}>
              {positive ? '▲' : '▼'} {Math.abs(indicator.value)}%
            </span>
          )}
          {helpText && <span style={{ fontSize:12, color:'var(--hx-text-muted)' }}>{helpText}</span>}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxCode / HxKbd
───────────────────────────────────────────────────────────────── */
interface HxCodeProps extends HTMLAttributes<HTMLElement> {
  inline?: boolean
  language?: string
  system?: HxSystem
}

export function HxCode({ children, inline = false, language, system = 'enterprise', style, ...rest }: HxCodeProps) {
  const themeVars = useTheme(system)
  if (inline) {
    return (
      <code style={{ ...themeVars as CSSProperties, fontFamily:'var(--hx-font-mono)', fontSize:'0.875em', padding:'1px 6px', borderRadius:5, background:'color-mix(in oklab, var(--hx-border), transparent 20%)', color:'var(--hx-accent)', ...style }} {...rest}>{children}</code>
    )
  }
  return (
    <div className="hx-root" style={themeVars as CSSProperties}>
      {language && <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--hx-text-muted)', marginBottom:8, display:'flex', justifyContent:'space-between' }}>{language}</div>}
      <pre style={{ fontFamily:'var(--hx-font-mono)', fontSize:13, lineHeight:1.7, padding:'16px 18px', borderRadius:system==='minimal'?0:10, background:'color-mix(in oklab, var(--hx-border), transparent 20%)', border:'1px solid var(--hx-border)', color:'var(--hx-text)', overflowX:'auto', margin:0, ...style }}>
        <code {...rest}>{children}</code>
      </pre>
    </div>
  )
}

export function HxKbd({ children, style, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--hx-font-mono)', fontSize:'0.8em', padding:'2px 7px', borderRadius:6, border:'1px solid var(--hx-border)', boxShadow:'0 2px 0 var(--hx-border)', background:'var(--hx-surface)', color:'var(--hx-text)', fontWeight:600, ...style }} {...rest}>{children}</kbd>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxTable  (display, not virtualised)
───────────────────────────────────────────────────────────────── */
interface HxTableProps {
  columns: Array<{ key: string; title: string; width?: number; align?: 'left'|'center'|'right' }>
  rows: Record<string, ReactNode>[]
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  caption?: string
  system?: HxSystem
}

export function HxTable({ columns, rows, striped, bordered, hoverable = true, caption, system = 'enterprise' }: HxTableProps) {
  const themeVars = useTheme(system)
  return (
    <div className={cx('hx-root', getSystemClass(system))} style={{ ...themeVars as CSSProperties, overflowX:'auto', borderRadius:system==='minimal'?0:10, border:bordered?'1px solid var(--hx-border)':undefined }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:'var(--hx-font-sans)' }}>
        {caption && <caption style={{ fontSize:12, color:'var(--hx-text-muted)', padding:'8px 0', textAlign:'left' }}>{caption}</caption>}
        <thead>
          <tr style={{ borderBottom:`2px solid var(--hx-border)` }}>
            {columns.map(col => (
              <th key={col.key} style={{ padding:'11px 14px', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--hx-text-muted)', textAlign:col.align??'left', width:col.width, whiteSpace:'nowrap' }}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,ri) => (
            <tr key={ri} style={{ borderBottom:`1px solid color-mix(in oklab, var(--hx-border), transparent 35%)`, background:striped&&ri%2===1?'color-mix(in oklab, var(--hx-border), transparent 65%)':'transparent', transition:'background 80ms' }}
              onMouseEnter={e => hoverable && ((e.currentTarget as HTMLTableRowElement).style.background = 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 93%)')}
              onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = striped&&ri%2===1?'color-mix(in oklab, var(--hx-border), transparent 65%)':'transparent'}
            >
              {columns.map(col => (
                <td key={col.key} style={{ padding:'11px 14px', fontSize:13, color:'var(--hx-text)', textAlign:col.align??'left' }}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxChip
───────────────────────────────────────────────────────────────── */
interface HxChipProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  onDelete?: () => void
  selected?: boolean
  disabled?: boolean
  variant?: 'filled' | 'outlined'
  system?: HxSystem
}

export function HxChip({ icon, onDelete, selected, disabled, variant = 'filled', system = 'luxury', children, style, ...rest }: HxChipProps) {
  const themeVars = useTheme(system)
  return (
    <div
      role={rest.onClick ? 'button' : undefined}
      tabIndex={rest.onClick ? 0 : undefined}
      style={{ ...themeVars as CSSProperties, display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px 5px 10px', borderRadius:999, fontFamily:'var(--hx-font-sans)', fontSize:12, fontWeight:selected?700:500, cursor:disabled?'not-allowed':rest.onClick?'pointer':'default', opacity:disabled?0.5:1, border:`1.5px solid ${selected?'var(--hx-accent)':'var(--hx-border)'}`, background:selected?'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 85%)':variant==='outlined'?'transparent':'var(--hx-surface)', color:selected?'var(--hx-accent)':'var(--hx-text)', transition:'all 150ms', ...style }} {...rest}
    >
      {icon && <span style={{ display:'flex', fontSize:15, flexShrink:0 }}>{icon}</span>}
      {children}
      {onDelete && <button onClick={e => { e.stopPropagation(); onDelete() }} style={{ background:'none', border:'none', cursor:'pointer', color:'currentcolor', opacity:0.6, padding:0, lineHeight:1, fontSize:15, display:'flex', marginLeft:2 }}>×</button>}
    </div>
  )
}
