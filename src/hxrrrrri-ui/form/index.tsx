import {
  useState, useRef, useId, useCallback,
  type ChangeEvent, type InputHTMLAttributes, type ReactNode,
} from 'react'
import { motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

/* ─────────────────────────────────────────────────────────────────
   HxCheckbox
───────────────────────────────────────────────────────────────── */
interface HxCheckboxProps {
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  indeterminate?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  system?: HxSystem
}

export function HxCheckbox({ label, checked, defaultChecked, onChange, indeterminate, disabled, size = 'md', system = 'luxury' }: HxCheckboxProps) {
  const [internal, setInternal] = useState(defaultChecked ?? false)
  const isChecked = checked ?? internal
  const id = useId()
  const themeVars = useTheme(system)
  const sz = { sm:14, md:18, lg:22 }[size]

  const toggle = () => {
    if (disabled) return
    const next = !isChecked
    setInternal(next)
    onChange?.(next)
  }

  return (
    <label htmlFor={id} style={{ ...themeVars as React.CSSProperties, display:'inline-flex', alignItems:'center', gap:10, cursor:disabled?'not-allowed':'pointer', opacity:disabled?0.5:1, userSelect:'none' }}>
      <div
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : isChecked}
        id={id}
        onClick={toggle}
        style={{ width:sz, height:sz, borderRadius:system==='brutalist'?0:system==='a11y'?3:5, border:`2px solid ${(isChecked||indeterminate)?'var(--hx-accent)':'var(--hx-border)'}`, background:(isChecked||indeterminate)?'var(--hx-accent)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 150ms', boxShadow:(isChecked||indeterminate)?`0 0 8px color-mix(in oklab, var(--hx-accent), transparent 60%)`:'none' }}
      >
        <motion.svg animate={{ opacity:(isChecked||indeterminate)?1:0, scale:(isChecked||indeterminate)?1:0.5 }} transition={{ duration:0.15 }} width={sz*0.62} height={sz*0.62} viewBox="0 0 12 12" fill="none">
          {indeterminate ? <line x1="2" y1="6" x2="10" y2="6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                        : <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>}
        </motion.svg>
      </div>
      {label && <span style={{ fontSize:{ sm:12, md:13, lg:15 }[size], color:'var(--hx-text)' }}>{label}</span>}
    </label>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxRadioGroup
───────────────────────────────────────────────────────────────── */
export interface HxRadioOption { label: string; value: string; description?: string; disabled?: boolean }

interface HxRadioGroupProps {
  options: HxRadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name?: string
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'card'
  system?: HxSystem
}

export function HxRadioGroup({ options, value, defaultValue, onChange, name, orientation = 'vertical', variant = 'default', system = 'luxury' }: HxRadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const active = value ?? internal
  const themeVars = useTheme(system)
  const gname = name ?? useId()

  const select = (v: string) => { setInternal(v); onChange?.(v) }
  const sz = 18

  return (
    <div className="hx-root" role="radiogroup" style={{ ...themeVars as React.CSSProperties, display:'flex', flexDirection:orientation==='horizontal'?'row':'column', gap: variant==='card' ? 10 : 12, flexWrap:'wrap' }}>
      {options.map(opt => {
        const isActive = opt.value === active
        if (variant === 'card') {
          return (
            <button key={opt.value} role="radio" aria-checked={isActive} disabled={opt.disabled} onClick={() => !opt.disabled && select(opt.value)}
              style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'14px 16px', borderRadius:system==='minimal'||system==='brutalist'?0:10, border:`1.5px solid ${isActive?'var(--hx-accent)':'var(--hx-border)'}`, background:isActive?'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 88%)':'var(--hx-surface)', cursor:opt.disabled?'not-allowed':'pointer', opacity:opt.disabled?0.5:1, textAlign:'left', fontFamily:'var(--hx-font-sans)', flex:orientation==='horizontal'?1:'none', transition:'all 150ms', boxShadow:isActive?`0 0 0 3px color-mix(in oklab, var(--hx-accent), transparent 78%)`:'none' }}>
              <div style={{ width:sz, height:sz, borderRadius:'50%', border:`2px solid ${isActive?'var(--hx-accent)':'var(--hx-border)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                {isActive && <div style={{ width:sz*0.5, height:sz*0.5, borderRadius:'50%', background:'var(--hx-accent)' }}/>}
              </div>
              <div><div style={{ fontSize:13, fontWeight:isActive?700:500, color:'var(--hx-text)' }}>{opt.label}</div>{opt.description&&<div style={{ fontSize:12, color:'var(--hx-text-muted)', marginTop:2, lineHeight:1.4 }}>{opt.description}</div>}</div>
            </button>
          )
        }
        return (
          <label key={opt.value} style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:opt.disabled?'not-allowed':'pointer', opacity:opt.disabled?0.5:1, userSelect:'none' }}>
            <div role="radio" aria-checked={isActive} onClick={() => !opt.disabled && select(opt.value)} style={{ width:sz, height:sz, borderRadius:'50%', border:`2px solid ${isActive?'var(--hx-accent)':'var(--hx-border)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, transition:'border-color 150ms' }}>
              <motion.div animate={{ scale:isActive?1:0 }} transition={{ type:'spring', stiffness:400, damping:25 }} style={{ width:sz*0.5, height:sz*0.5, borderRadius:'50%', background:'var(--hx-accent)' }}/>
            </div>
            <div><div style={{ fontSize:13, fontWeight:isActive?600:400, color:'var(--hx-text)' }}>{opt.label}</div>{opt.description&&<div style={{ fontSize:12, color:'var(--hx-text-muted)', marginTop:2 }}>{opt.description}</div>}</div>
          </label>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxSwitch
───────────────────────────────────────────────────────────────── */
interface HxSwitchProps {
  label?: string
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: string
  system?: HxSystem
}

export function HxSwitch({ label, description, checked, defaultChecked, onChange, disabled, size = 'md', color, system = 'luxury' }: HxSwitchProps) {
  const [internal, setInternal] = useState(defaultChecked ?? false)
  const isOn = checked ?? internal
  const id = useId()
  const themeVars = useTheme(system)

  const dims = { sm:{w:32,h:18,knob:12}, md:{w:44,h:24,knob:18}, lg:{w:56,h:30,knob:22} }[size]
  const accentColor = color ?? 'var(--hx-accent)'

  const toggle = () => { if (disabled) return; const next = !isOn; setInternal(next); onChange?.(next) }

  return (
    <label htmlFor={id} style={{ ...themeVars as React.CSSProperties, display:'flex', alignItems:description?'flex-start':'center', gap:12, cursor:disabled?'not-allowed':'pointer', opacity:disabled?0.5:1, userSelect:'none' }}>
      <div
        id={id} role="switch" aria-checked={isOn} onClick={toggle}
        style={{ width:dims.w, height:dims.h, borderRadius:999, flexShrink:0, position:'relative', transition:'background 200ms, box-shadow 200ms', background:isOn?accentColor:'var(--hx-border)', boxShadow:isOn?`0 0 12px color-mix(in oklab, ${accentColor}, transparent 55%)`:undefined, marginTop:description?2:0 }}
      >
        <motion.div
          animate={{ x: isOn ? dims.w - dims.knob - (dims.h-dims.knob)/2 : (dims.h-dims.knob)/2 }}
          transition={{ type:'spring', stiffness:500, damping:32 }}
          style={{ position:'absolute', top:(dims.h-dims.knob)/2, width:dims.knob, height:dims.knob, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 6px rgba(0,0,0,0.25)' }}
        />
      </div>
      {(label||description) && (
        <div>
          {label && <div style={{ fontSize:13, fontWeight:500, color:'var(--hx-text)' }}>{label}</div>}
          {description && <div style={{ fontSize:12, color:'var(--hx-text-muted)', marginTop:2, lineHeight:1.4 }}>{description}</div>}
        </div>
      )}
    </label>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxSlider
───────────────────────────────────────────────────────────────── */
interface HxSliderProps {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  label?: string
  showValue?: boolean
  marks?: boolean | Array<{ value: number; label?: string }>
  disabled?: boolean
  color?: string
  size?: 'sm' | 'md' | 'lg'
  system?: HxSystem
}

export function HxSlider({ min=0, max=100, step=1, value, defaultValue=0, onChange, label, showValue=true, marks, disabled, color, size='md', system='luxury' }: HxSliderProps) {
  const [internal, setInternal] = useState(defaultValue)
  const val = value ?? internal
  const themeVars = useTheme(system)
  const pct = ((val - min) / (max - min)) * 100
  const accentColor = color ?? 'var(--hx-accent)'
  const trackH = { sm:4, md:6, lg:8 }[size]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value)
    setInternal(next)
    onChange?.(next)
  }

  return (
    <div className="hx-root" style={themeVars as React.CSSProperties}>
      {(label || showValue) && (
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
          {label && <label style={{ fontSize:12, fontWeight:600, color:'var(--hx-text-muted)' }}>{label}</label>}
          {showValue && <span style={{ fontSize:12, fontWeight:700, color:accentColor }}>{val}</span>}
        </div>
      )}
      <div style={{ position:'relative' }}>
        <div style={{ height:trackH, background:'color-mix(in oklab, var(--hx-border), transparent 20%)', borderRadius:999, overflow:'hidden' }}>
          <div style={{ width:`${pct}%`, height:'100%', background:accentColor, borderRadius:999, boxShadow:`0 0 8px ${accentColor}66`, transition:'width 50ms' }}/>
        </div>
        <input type="range" min={min} max={max} step={step} value={val} onChange={handleChange} disabled={disabled}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0, cursor:disabled?'not-allowed':'pointer', margin:0, padding:0 }}
        />
        {/* thumb indicator */}
        <div style={{ position:'absolute', top:'50%', left:`${pct}%`, transform:'translate(-50%, -50%)', width:trackH*3, height:trackH*3, borderRadius:'50%', background:accentColor, boxShadow:`0 0 0 3px var(--hx-surface), 0 0 0 5px ${accentColor}55`, pointerEvents:'none', transition:'left 50ms' }}/>
      </div>
      {Array.isArray(marks) && (
        <div style={{ position:'relative', height:20, marginTop:6 }}>
          {marks.map(mark => (
            <div key={mark.value} style={{ position:'absolute', left:`${((mark.value-min)/(max-min))*100}%`, transform:'translateX(-50%)', textAlign:'center' }}>
              <div style={{ width:2, height:6, background:'var(--hx-border)', margin:'0 auto 3px' }}/>
              {mark.label && <span style={{ fontSize:10, color:'var(--hx-text-muted)', whiteSpace:'nowrap' }}>{mark.label}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxRating
───────────────────────────────────────────────────────────────── */
interface HxRatingProps {
  value?: number
  defaultValue?: number
  max?: number
  onChange?: (value: number) => void
  readOnly?: boolean
  allowHalf?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: string
  icon?: 'star' | 'heart' | ReactNode
  label?: string
  system?: HxSystem
}

const STAR = (filled: boolean, color: string, sz: number) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill={filled?color:'none'} stroke={color} strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const HEART = (filled: boolean, color: string, sz: number) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill={filled?color:'none'} stroke={color} strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

export function HxRating({ value, defaultValue=0, max=5, onChange, readOnly, size='md', color, icon='star', label, system='luxury' }: HxRatingProps) {
  const [internal, setInternal] = useState(defaultValue)
  const [hover, setHover] = useState(0)
  const val = value ?? internal
  const themeVars = useTheme(system)
  const accentColor = color ?? 'var(--hx-accent)'
  const sz = { sm:18, md:24, lg:32 }[size]

  return (
    <div className="hx-root" style={themeVars as React.CSSProperties}>
      {label && <div style={{ fontSize:12, fontWeight:600, color:'var(--hx-text-muted)', marginBottom:6 }}>{label}</div>}
      <div style={{ display:'flex', gap:4 }} role="radiogroup" aria-label={label ?? 'Rating'}>
        {Array.from({ length:max }).map((_,i) => {
          const starVal = i + 1
          const filled = starVal <= (readOnly ? val : (hover || val))
          return (
            <div key={i}
              onClick={() => { if (!readOnly) { setInternal(starVal); onChange?.(starVal) } }}
              onMouseEnter={() => !readOnly && setHover(starVal)}
              onMouseLeave={() => !readOnly && setHover(0)}
              style={{ cursor:readOnly?'default':'pointer', display:'flex', transition:'transform 100ms' }}
              onMouseDown={e => !readOnly && ((e.currentTarget as HTMLDivElement).style.transform = 'scale(0.85)')}
              onMouseUp={e => !readOnly && ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
            >
              {typeof icon === 'string'
                ? icon === 'star' ? STAR(filled, filled?accentColor:'var(--hx-border)', sz) : HEART(filled, filled?accentColor:'var(--hx-border)', sz)
                : icon}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxFileUpload
───────────────────────────────────────────────────────────────── */
interface HxFileUploadProps {
  onFiles?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number    // bytes
  label?: string
  hint?: string
  system?: HxSystem
}

export function HxFileUpload({ onFiles, accept, multiple, maxSize, label, hint, system = 'luxury' }: HxFileUploadProps) {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const themeVars = useTheme(system)

  const process = useCallback((incoming: File[]) => {
    setError('')
    if (maxSize) {
      const tooBig = incoming.filter(f => f.size > maxSize)
      if (tooBig.length) { setError(`${tooBig[0].name} exceeds ${(maxSize/1024/1024).toFixed(1)} MB limit`); return }
    }
    const next = multiple ? [...files, ...incoming] : incoming.slice(0,1)
    setFiles(next)
    onFiles?.(next)
  }, [files, maxSize, multiple, onFiles])

  const formatSize = (n: number) => n < 1024 ? `${n}B` : n < 1048576 ? `${(n/1024).toFixed(1)}KB` : `${(n/1048576).toFixed(1)}MB`

  return (
    <div className="hx-root" style={themeVars as React.CSSProperties}>
      {label && <div style={{ fontSize:12, fontWeight:600, color:'var(--hx-text-muted)', marginBottom:8 }}>{label}</div>}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); process(Array.from(e.dataTransfer.files)) }}
        style={{ border:`2px dashed ${dragging?'var(--hx-accent)':'var(--hx-border)'}`, borderRadius:system==='minimal'?0:12, padding:'28px 20px', textAlign:'center', cursor:'pointer', background:dragging?'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 93%)':'var(--hx-surface)', transition:'all 200ms' }}
      >
        <div style={{ fontSize:28, marginBottom:8 }}>⬆</div>
        <div style={{ fontSize:14, fontWeight:600, color:'var(--hx-text)', marginBottom:4 }}>Drop files here or <span style={{ color:'var(--hx-accent)', textDecoration:'underline' }}>browse</span></div>
        {hint && <div style={{ fontSize:12, color:'var(--hx-text-muted)' }}>{hint}</div>}
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} style={{ display:'none' }} onChange={e => { if (e.target.files) process(Array.from(e.target.files)) }}/>
      {error && <p style={{ margin:'6px 0 0', fontSize:12, color:'#DC2626' }}>⚠ {error}</p>}
      {files.length > 0 && (
        <div style={{ marginTop:10, display:'flex', flexDirection:'column', gap:6 }}>
          {files.map((f,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', borderRadius:8, border:'1px solid var(--hx-border)', background:'var(--hx-surface)' }}>
              <span style={{ fontSize:18 }}>📄</span>
              <div style={{ flex:1, overflow:'hidden' }}>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--hx-text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</div>
                <div style={{ fontSize:11, color:'var(--hx-text-muted)' }}>{formatSize(f.size)}</div>
              </div>
              <button onClick={e => { e.stopPropagation(); const next = files.filter((_,j) => j!==i); setFiles(next); onFiles?.(next) }} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--hx-text-muted)', fontSize:16 }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxNumberInput
───────────────────────────────────────────────────────────────── */
interface HxNumberInputProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  label?: string
  disabled?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  system?: HxSystem
}

export function HxNumberInput({ value, defaultValue=0, min, max, step=1, onChange, label, disabled, prefix, suffix, system='luxury' }: HxNumberInputProps) {
  const [internal, setInternal] = useState(defaultValue)
  const val = value ?? internal
  const themeVars = useTheme(system)
  const id = useId()

  const change = (next: number) => {
    if (min !== undefined && next < min) next = min
    if (max !== undefined && next > max) next = max
    setInternal(next)
    onChange?.(next)
  }

  return (
    <div className="hx-root" style={themeVars as React.CSSProperties}>
      {label && <label htmlFor={id} style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--hx-text-muted)', marginBottom:6 }}>{label}</label>}
      <div style={{ display:'flex', border:'1.5px solid var(--hx-border)', borderRadius:system==='minimal'?0:10, overflow:'hidden', background:'var(--hx-surface)' }}>
        <button onClick={() => change(val - step)} disabled={disabled || (min !== undefined && val <= min)} style={{ padding:'0 14px', background:'transparent', border:'none', cursor:'pointer', color:'var(--hx-text-muted)', fontSize:18, fontWeight:700, transition:'background 150ms', flexShrink:0 }} onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background='var(--hx-border)'} onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background='transparent'}>−</button>
        <div style={{ flex:1, display:'flex', alignItems:'center' }}>
          {prefix && <span style={{ fontSize:13, color:'var(--hx-text-muted)', paddingLeft:10, flexShrink:0 }}>{prefix}</span>}
          <input id={id} type="number" value={val} min={min} max={max} step={step} disabled={disabled} onChange={e => change(parseFloat(e.target.value)||0)}
            style={{ flex:1, border:'none', background:'transparent', textAlign:'center', fontSize:14, fontWeight:600, color:'var(--hx-text)', outline:'none', padding:'10px 4px', fontFamily:'var(--hx-font-sans)' }}/>
          {suffix && <span style={{ fontSize:13, color:'var(--hx-text-muted)', paddingRight:10, flexShrink:0 }}>{suffix}</span>}
        </div>
        <button onClick={() => change(val + step)} disabled={disabled || (max !== undefined && val >= max)} style={{ padding:'0 14px', background:'transparent', border:'none', cursor:'pointer', color:'var(--hx-text-muted)', fontSize:18, fontWeight:700, transition:'background 150ms', flexShrink:0 }} onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background='var(--hx-border)'} onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background='transparent'}>+</button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxColorPicker  (simple swatch + native input)
───────────────────────────────────────────────────────────────── */
interface HxColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  label?: string
  presets?: string[]
  system?: HxSystem
}

export function HxColorPicker({ value, defaultValue='#FF4D2D', onChange, label, presets, system='luxury' }: HxColorPickerProps) {
  const [internal, setInternal] = useState(defaultValue)
  const color = value ?? internal
  const themeVars = useTheme(system)
  const inputRef = useRef<HTMLInputElement>(null)

  const change = (c: string) => { setInternal(c); onChange?.(c) }
  const DEFAULT_PRESETS = ['#FF4D2D','#5555D8','#00D18C','#E8B84B','#FF6B9D','#A78BFA','#06B6D4','#F97316','#0D0D0C','#FFFFFF']

  return (
    <div className="hx-root" style={themeVars as React.CSSProperties}>
      {label && <div style={{ fontSize:12, fontWeight:600, color:'var(--hx-text-muted)', marginBottom:8 }}>{label}</div>}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
        <div onClick={() => inputRef.current?.click()} style={{ width:44, height:44, borderRadius:system==='minimal'?0:8, background:color, border:'2px solid var(--hx-border)', cursor:'pointer', flexShrink:0, boxShadow:`0 0 14px ${color}66` }}/>
        <input ref={inputRef} type="color" value={color} onChange={e => change(e.target.value)} style={{ opacity:0, position:'absolute', pointerEvents:'none' }}/>
        <div style={{ flex:1, border:'1.5px solid var(--hx-border)', borderRadius:8, padding:'8px 12px', fontSize:13, fontFamily:'var(--hx-font-mono)', color:'var(--hx-text)', background:'var(--hx-surface)' }}>
          <input value={color} onChange={e => change(e.target.value)} style={{ border:'none', background:'transparent', outline:'none', width:'100%', fontFamily:'inherit', fontSize:'inherit', color:'inherit' }}/>
        </div>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {(presets ?? DEFAULT_PRESETS).map(c => (
          <button key={c} onClick={() => change(c)} style={{ width:24, height:24, borderRadius:'50%', background:c, border:`2px solid ${color===c?'var(--hx-text)':'var(--hx-border)'}`, cursor:'pointer', padding:0, transition:'transform 150ms, border-color 150ms', transform:color===c?'scale(1.25)':'scale(1)' }} title={c}/>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxPinInput  (OTP / PIN entry)
───────────────────────────────────────────────────────────────── */
interface HxPinInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  mask?: boolean
  disabled?: boolean
  system?: HxSystem
}

export function HxPinInput({ length=4, value, onChange, onComplete, mask, disabled, system='luxury' }: HxPinInputProps) {
  const [pins, setPins] = useState<string[]>(Array(length).fill(''))
  const refs = useRef<Array<HTMLInputElement|null>>([])
  const themeVars = useTheme(system)
  const current = value ? value.split('') : pins

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !current[i] && i > 0) refs.current[i-1]?.focus()
  }
  const handleChange = (i: number, v: string) => {
    const ch = v.slice(-1)
    const next = [...current]
    next[i] = ch
    setPins(next)
    const joined = next.join('')
    onChange?.(joined)
    if (ch && i < length - 1) refs.current[i+1]?.focus()
    if (next.every(p => p !== '') && next.length === length) onComplete?.(joined)
  }

  return (
    <div className="hx-root" style={{ ...themeVars as React.CSSProperties, display:'flex', gap:10 }}>
      {Array.from({ length }).map((_,i) => (
        <input key={i} ref={el => { refs.current[i] = el }} type={mask?'password':'text'} inputMode="numeric" maxLength={1} disabled={disabled} value={current[i]??''} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKey(i, e)}
          onFocus={e => (e.currentTarget as HTMLInputElement).select()}
          style={{ width:48, height:56, textAlign:'center', fontSize:22, fontWeight:700, borderRadius:system==='minimal'?0:10, border:`2px solid ${current[i]?'var(--hx-accent)':'var(--hx-border)'}`, background:'var(--hx-surface)', color:'var(--hx-text)', outline:'none', fontFamily:'var(--hx-font-sans)', transition:'border-color 150ms', caretColor:'var(--hx-accent)' }}
        />
      ))}
    </div>
  )
}
