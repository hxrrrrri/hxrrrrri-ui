import { useState, useEffect, useCallback, useRef, type ReactNode, type HTMLAttributes } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

// ─────────────────────────────────────────────────────────────────
// HxAlert
// ─────────────────────────────────────────────────────────────────
export type HxAlertVariant = 'info' | 'success' | 'warning' | 'error'

const ALERT_TOKENS: Record<HxAlertVariant, { bg: string; border: string; color: string; icon: string }> = {
  info:    { bg:'rgba(2,132,199,0.10)',  border:'rgba(2,132,199,0.30)',  color:'#0284C7', icon:'ℹ' },
  success: { bg:'rgba(5,150,105,0.10)',  border:'rgba(5,150,105,0.30)',  color:'#059669', icon:'✓' },
  warning: { bg:'rgba(217,119,6,0.10)',  border:'rgba(217,119,6,0.30)',  color:'#D97706', icon:'⚠' },
  error:   { bg:'rgba(220,38,38,0.10)',  border:'rgba(220,38,38,0.30)',  color:'#DC2626', icon:'✕' },
}

interface HxAlertProps {
  variant?: HxAlertVariant
  title?: string
  description?: string
  dismissible?: boolean
  onDismiss?: () => void
  icon?: ReactNode
  action?: ReactNode
  system?: HxSystem
}

export function HxAlert({ variant = 'info', title, description, dismissible, onDismiss, icon, action, system = 'luxury' }: HxAlertProps) {
  const [visible, setVisible] = useState(true)
  const themeVars = useTheme(system)
  const t = ALERT_TOKENS[variant]

  const dismiss = () => { setVisible(false); onDismiss?.() }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity:0, y:-8, scale:0.98 }}
          animate={{ opacity:1, y:0, scale:1 }}
          exit={{ opacity:0, y:-8, scale:0.98, height:0, marginBottom:0 }}
          transition={{ duration:0.22, ease:[0.22,1,0.36,1] }}
          style={{ ...themeVars as React.CSSProperties, display:'flex', alignItems:'flex-start', gap:12, padding:'14px 16px', borderRadius: system==='minimal'||system==='brutalist'?0:10, border:`1.5px solid ${t.border}`, background:t.bg, overflow:'hidden' }}
          role="alert"
        >
          <span style={{ fontSize:16, color:t.color, flexShrink:0, lineHeight:1.4 }}>{icon ?? t.icon}</span>
          <div style={{ flex:1, minWidth:0 }}>
            {title && <div style={{ fontSize:14, fontWeight:700, color:t.color, marginBottom:description?2:0 }}>{title}</div>}
            {description && <div style={{ fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.55 }}>{description}</div>}
            {action && <div style={{ marginTop:10 }}>{action}</div>}
          </div>
          {dismissible && (
            <button onClick={dismiss} aria-label="Dismiss" style={{ background:'none', border:'none', cursor:'pointer', color:t.color, fontSize:16, lineHeight:1, padding:'2px 4px', borderRadius:4, flexShrink:0, opacity:0.7 }}>×</button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxToast / useToast
// ─────────────────────────────────────────────────────────────────
export interface HxToastItem {
  id: string
  variant?: HxAlertVariant
  title: string
  description?: string
  duration?: number
}

let _toastFns: ((t: HxToastItem) => void)[] = []

export function toast(item: Omit<HxToastItem, 'id'>) {
  const id = Math.random().toString(36).slice(2)
  _toastFns.forEach(fn => fn({ id, duration: 4000, ...item }))
}
toast.success = (title: string, description?: string) => toast({ variant:'success', title, description })
toast.error   = (title: string, description?: string) => toast({ variant:'error',   title, description })
toast.warning = (title: string, description?: string) => toast({ variant:'warning', title, description })
toast.info    = (title: string, description?: string) => toast({ variant:'info',    title, description })

interface HxToasterProps { system?: HxSystem; position?: 'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center' }

export function HxToaster({ system = 'luxury', position = 'top-right' }: HxToasterProps) {
  const [toasts, setToasts] = useState<HxToastItem[]>([])

  useEffect(() => {
    const fn = (t: HxToastItem) => setToasts(prev => [...prev, t])
    _toastFns.push(fn)
    return () => { _toastFns = _toastFns.filter(f => f !== fn) }
  }, [])

  const remove = useCallback((id: string) => setToasts(prev => prev.filter(t => t.id !== id)), [])

  const posStyle: React.CSSProperties = {
    position:'fixed', zIndex:9999, display:'flex', flexDirection:'column', gap:10, padding:16,
    ...(position==='top-right'    && { top:16, right:16, alignItems:'flex-end' }),
    ...(position==='top-left'     && { top:16, left:16,  alignItems:'flex-start' }),
    ...(position==='bottom-right' && { bottom:16, right:16, alignItems:'flex-end', flexDirection:'column-reverse' }),
    ...(position==='bottom-left'  && { bottom:16, left:16,  alignItems:'flex-start', flexDirection:'column-reverse' }),
    ...(position==='top-center'   && { top:16, left:'50%', transform:'translateX(-50%)', alignItems:'center' }),
  }

  return (
    <div style={posStyle} aria-live="polite" aria-atomic="false">
      <AnimatePresence>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} system={system} onDismiss={() => remove(t.id)}/>
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast: t, system, onDismiss }: { toast:HxToastItem; system:HxSystem; onDismiss:()=>void }) {
  const themeVars = useTheme(system)
  const tk = ALERT_TOKENS[t.variant ?? 'info']

  useEffect(() => {
    const timer = setTimeout(onDismiss, t.duration ?? 4000)
    return () => clearTimeout(timer)
  }, [t.duration, onDismiss])

  return (
    <motion.div
      initial={{ opacity:0, x:40, scale:0.96 }}
      animate={{ opacity:1, x:0, scale:1 }}
      exit={{ opacity:0, x:40, scale:0.96, height:0 }}
      transition={{ type:'spring', stiffness:400, damping:32 }}
      style={{ ...themeVars as React.CSSProperties, display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderRadius:12, border:`1.5px solid ${tk.border}`, background:'var(--hx-surface)', boxShadow:'0 8px 32px rgba(0,0,0,0.18)', minWidth:280, maxWidth:380, backdropFilter:'blur(16px)', cursor:'pointer' }}
      onClick={onDismiss}
      role="status"
    >
      <span style={{ fontSize:18, color:tk.color, flexShrink:0 }}>{tk.icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:700, color:'var(--hx-text)' }}>{t.title}</div>
        {t.description && <div style={{ fontSize:12, color:'var(--hx-text-muted)', marginTop:2, lineHeight:1.4 }}>{t.description}</div>}
      </div>
      <button onClick={e=>{e.stopPropagation();onDismiss()}} style={{ background:'none',border:'none',cursor:'pointer',color:'var(--hx-text-muted)',fontSize:16,lineHeight:1,padding:'2px 4px',flexShrink:0 }}>×</button>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxProgress
// ─────────────────────────────────────────────────────────────────
interface HxProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
  label?: string
  showValue?: boolean
  animated?: boolean
  striped?: boolean
  system?: HxSystem
}

export function HxProgress({ value, max=100, size='md', color, label, showValue=false, animated=false, striped=false, system='luxury' }: HxProgressProps) {
  const themeVars = useTheme(system)
  const pct = Math.min(100, Math.max(0, (value/max)*100))
  const heights = { sm:4, md:8, lg:14 }
  const h = heights[size]
  const accentColor = color ?? 'var(--hx-accent)'

  return (
    <div style={{ ...themeVars as React.CSSProperties, width:'100%' }} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      {(label || showValue) && (
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:12, fontWeight:600, color:'var(--hx-text-muted)' }}>
          {label && <span>{label}</span>}
          {showValue && <span style={{ color:accentColor }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{ height:h, background:'color-mix(in oklab, var(--hx-border), transparent 20%)', borderRadius:999, overflow:'hidden' }}>
        <motion.div
          initial={{ width:0 }}
          animate={{ width:`${pct}%` }}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
          style={{
            height:'100%', borderRadius:999,
            background: striped
              ? `repeating-linear-gradient(45deg, ${accentColor}, ${accentColor} 10px, color-mix(in oklab, ${accentColor}, white 20%) 10px, color-mix(in oklab, ${accentColor}, white 20%) 20px)`
              : accentColor,
            backgroundSize: striped ? '28px 28px' : undefined,
            animation: (striped && animated) ? 'hx-progress-stripe 1s linear infinite' : undefined,
            boxShadow: `0 0 ${h*2}px ${accentColor}66`,
          }}
        />
      </div>
    </div>
  )
}

// Circular progress
interface HxCircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  showValue?: boolean
  system?: HxSystem
}

export function HxCircularProgress({ value, size=60, strokeWidth=5, color, showValue=true, system='luxury' }: HxCircularProgressProps) {
  const themeVars = useTheme(system)
  const pct = Math.min(100, Math.max(0, value))
  const r = (size - strokeWidth*2) / 2
  const circ = 2*Math.PI*r
  const offset = circ - (pct/100)*circ
  const accentColor = color ?? 'var(--hx-accent)'

  return (
    <div style={{ ...themeVars as React.CSSProperties, position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="color-mix(in oklab, var(--hx-border), transparent 20%)" strokeWidth={strokeWidth}/>
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={accentColor} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
        />
      </svg>
      {showValue && (
        <span style={{ position:'absolute', fontSize:size*0.22, fontWeight:700, color:accentColor }}>{Math.round(pct)}%</span>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxSkeleton
// ─────────────────────────────────────────────────────────────────
interface HxSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  lines?: number
  system?: HxSystem
}

export function HxSkeleton({ width, height, variant='rectangular', lines=3, system='luxury', style, ...rest }: HxSkeletonProps) {
  const themeVars = useTheme(system)
  const shimmerStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, color-mix(in oklab, var(--hx-border), transparent 20%) 25%, color-mix(in oklab, var(--hx-border), white 12%) 50%, color-mix(in oklab, var(--hx-border), transparent 20%) 75%)',
    backgroundSize: '200% 100%',
    animation: 'hx-shimmer 1.6s ease-in-out infinite',
  }

  if (variant === 'text') {
    return (
      <div style={{ ...themeVars as React.CSSProperties, display:'flex', flexDirection:'column', gap:8, ...style }}>
        {Array.from({ length:lines }).map((_,i) => (
          <div key={i} style={{ height:height??14, width:i===lines-1?'70%':(width??'100%'), borderRadius:4, ...shimmerStyle }}/>
        ))}
      </div>
    )
  }
  if (variant === 'circular') {
    const s = typeof width === 'number' ? width : 44
    return <div style={{ width:s, height:s, borderRadius:'50%', flexShrink:0, ...shimmerStyle, ...style }} {...rest}/>
  }
  if (variant === 'card') {
    return (
      <div style={{ ...themeVars as React.CSSProperties, padding:20, borderRadius:14, border:'1px solid var(--hx-border)', display:'flex', flexDirection:'column', gap:12, ...style }}>
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <div style={{ width:44, height:44, borderRadius:'50%', flexShrink:0, ...shimmerStyle }}/>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
            <div style={{ height:14, width:'60%', borderRadius:4, ...shimmerStyle }}/>
            <div style={{ height:12, width:'40%', borderRadius:4, ...shimmerStyle }}/>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ height:12, borderRadius:4, ...shimmerStyle }}/>
          <div style={{ height:12, borderRadius:4, ...shimmerStyle }}/>
          <div style={{ height:12, width:'75%', borderRadius:4, ...shimmerStyle }}/>
        </div>
      </div>
    )
  }
  return <div style={{ width:width??'100%', height:height??120, borderRadius:10, ...shimmerStyle, ...style }} {...rest}/>
}

// ─────────────────────────────────────────────────────────────────
// HxSpinner
// ─────────────────────────────────────────────────────────────────
interface HxSpinnerProps {
  size?: number
  color?: string
  thickness?: number
  label?: string
  system?: HxSystem
}

export function HxSpinner({ size=32, color, thickness=3, label='Loading…', system='luxury' }: HxSpinnerProps) {
  const themeVars = useTheme(system)
  return (
    <div style={{ ...themeVars as React.CSSProperties, display:'inline-flex', flexDirection:'column', alignItems:'center', gap:8 }}>
      <div style={{ width:size, height:size, borderRadius:'50%', border:`${thickness}px solid color-mix(in oklab, var(--hx-border), transparent 20%)`, borderTopColor: color??'var(--hx-accent)', animation:'hx-spin 0.7s linear infinite', boxShadow:`0 0 ${size/3}px ${color??'var(--hx-accent)'}44` }} role="status" aria-label={label}/>
      {label && <span className="hx-sr-only">{label}</span>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// HxBadge
// ─────────────────────────────────────────────────────────────────
interface HxBadgeProps {
  count?: number
  dot?: boolean
  max?: number
  color?: string
  position?: 'top-right'|'top-left'|'bottom-right'|'bottom-left'
  children: ReactNode
  system?: HxSystem
}

export function HxBadge({ count, dot=false, max=99, color, position='top-right', children, system='luxury' }: HxBadgeProps) {
  const themeVars = useTheme(system)
  const show = dot || (count !== undefined && count > 0)
  const display = dot ? '' : count! > max ? `${max}+` : String(count)
  const posStyle: Record<string, React.CSSProperties> = {
    'top-right':    { top:-4, right:-4 },
    'top-left':     { top:-4, left:-4 },
    'bottom-right': { bottom:-4, right:-4 },
    'bottom-left':  { bottom:-4, left:-4 },
  }

  return (
    <div style={{ ...themeVars as React.CSSProperties, position:'relative', display:'inline-flex' }}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
            transition={{ type:'spring', stiffness:500, damping:28 }}
            style={{ position:'absolute', ...posStyle[position], minWidth:dot?8:18, height:dot?8:18, borderRadius:99, background:color??'var(--hx-accent)', color:'#fff', fontSize:10, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid var(--hx-bg)', lineHeight:1, padding:dot?0:'0 4px' }}
          >
            {display}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
