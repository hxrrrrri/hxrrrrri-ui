import { type ReactNode, type CSSProperties, type HTMLAttributes } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

/* ─────────────────────────────────────────────────────────────────
   HxStack — vertical / horizontal flex container
───────────────────────────────────────────────────────────────── */
interface HxStackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  gap?: number | string
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  wrap?: boolean
  system?: HxSystem
}

export function HxStack({ direction = 'column', gap = 12, align, justify, wrap, system, style, className, children, ...rest }: HxStackProps) {
  const themeVars = system ? useTheme(system) : {}
  return (
    <div
      className={cx('hx-root', className)}
      style={{ ...themeVars as CSSProperties, display:'flex', flexDirection:direction, gap, alignItems:align, justifyContent:justify, flexWrap:wrap?'wrap':'nowrap', ...style }}
      {...rest}
    >{children}</div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxGrid — CSS grid wrapper
───────────────────────────────────────────────────────────────── */
interface HxGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string
  gap?: number | string
  rowGap?: number | string
  colGap?: number | string
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyItems']
  minColWidth?: number | string
  system?: HxSystem
}

export function HxGrid({ columns, gap = 16, rowGap, colGap, align, justify, minColWidth, system, style, className, children, ...rest }: HxGridProps) {
  const themeVars = system ? useTheme(system) : {}
  const cols = minColWidth
    ? `repeat(auto-fill, minmax(${typeof minColWidth === 'number' ? `${minColWidth}px` : minColWidth}, 1fr))`
    : typeof columns === 'number'
    ? `repeat(${columns}, minmax(0, 1fr))`
    : columns ?? 'repeat(12, minmax(0, 1fr))'

  return (
    <div
      className={cx('hx-root', className)}
      style={{ ...themeVars as CSSProperties, display:'grid', gridTemplateColumns:cols, gap, rowGap, columnGap:colGap, alignItems:align, justifyItems:justify, ...style }}
      {...rest}
    >{children}</div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxGridItem — grid child with span
───────────────────────────────────────────────────────────────── */
interface HxGridItemProps extends HTMLAttributes<HTMLDivElement> {
  colSpan?: number
  rowSpan?: number
  colStart?: number
  rowStart?: number
}

export function HxGridItem({ colSpan, rowSpan, colStart, rowStart, style, children, ...rest }: HxGridItemProps) {
  return (
    <div style={{ gridColumn: colSpan ? `span ${colSpan}` : colStart ? `${colStart} / span 1` : undefined, gridRow: rowSpan ? `span ${rowSpan}` : rowStart ? `${rowStart} / span 1` : undefined, ...style }} {...rest}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxDivider
───────────────────────────────────────────────────────────────── */
interface HxDividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  thickness?: number
  color?: string
  dashed?: boolean
  system?: HxSystem
}

export function HxDivider({ orientation = 'horizontal', label, thickness = 1, color, dashed, system = 'luxury', style, className, ...rest }: HxDividerProps) {
  const themeVars = useTheme(system)
  const borderColor = color ?? 'var(--hx-border)'

  if (orientation === 'vertical') {
    return (
      <div className={cx('hx-root', className)} style={{ ...themeVars as CSSProperties, width:thickness, alignSelf:'stretch', background:borderColor, flexShrink:0, borderRadius:thickness, ...style }} role="separator" aria-orientation="vertical" {...rest}/>
    )
  }

  if (label) {
    return (
      <div className={cx('hx-root', className)} style={{ ...themeVars as CSSProperties, display:'flex', alignItems:'center', gap:12, ...style }} role="separator" {...rest}>
        <div style={{ flex:1, height:thickness, background:borderColor, borderRadius:thickness }}/>
        <span style={{ fontSize:12, fontWeight:600, color:'var(--hx-text-muted)', whiteSpace:'nowrap', letterSpacing:'0.04em' }}>{label}</span>
        <div style={{ flex:1, height:thickness, background:borderColor, borderRadius:thickness }}/>
      </div>
    )
  }

  return (
    <div className={cx('hx-root', className)} style={{ ...themeVars as CSSProperties, width:'100%', height:thickness, background:dashed?'none':borderColor, borderTop: dashed?`${thickness}px dashed ${borderColor}`:'none', borderRadius:thickness, flexShrink:0, ...style }} role="separator" {...rest}/>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxContainer
───────────────────────────────────────────────────────────────── */
interface HxContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | number
  center?: boolean
  padding?: string | number
}

const CONTAINER_WIDTHS = { sm:540, md:720, lg:960, xl:1140, '2xl':1400, full:'100%' }

export function HxContainer({ maxWidth = 'xl', center = true, padding = '0 clamp(16px,4vw,48px)', style, children, ...rest }: HxContainerProps) {
  const mw = typeof maxWidth === 'number' ? maxWidth : CONTAINER_WIDTHS[maxWidth]
  return (
    <div style={{ maxWidth:mw, width:'100%', margin:center?'0 auto':undefined, padding, ...style }} {...rest}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxAspectRatio
───────────────────────────────────────────────────────────────── */
interface HxAspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number   // width/height — e.g. 16/9
}

export function HxAspectRatio({ ratio = 16/9, style, children, ...rest }: HxAspectRatioProps) {
  return (
    <div style={{ position:'relative', width:'100%', ...style }} {...rest}>
      <div style={{ paddingTop:`${(1/ratio)*100}%` }}/>
      <div style={{ position:'absolute', inset:0 }}>{children}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxCenter
───────────────────────────────────────────────────────────────── */
interface HxCenterProps extends HTMLAttributes<HTMLDivElement> {
  minH?: number | string
  inline?: boolean
}

export function HxCenter({ minH, inline, style, children, ...rest }: HxCenterProps) {
  return (
    <div style={{ display:inline?'inline-flex':'flex', alignItems:'center', justifyContent:'center', minHeight:minH, ...style }} {...rest}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxWrap  — wrapping flex row with even gap
───────────────────────────────────────────────────────────────── */
interface HxWrapProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number | string
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
}

export function HxWrap({ gap = 10, align = 'flex-start', justify, style, children, ...rest }: HxWrapProps) {
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap, alignItems:align, justifyContent:justify, ...style }} {...rest}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxSimpleGrid  — responsive auto-col grid
───────────────────────────────────────────────────────────────── */
interface HxSimpleGridProps extends HTMLAttributes<HTMLDivElement> {
  minChildWidth?: number | string
  columns?: number
  gap?: number | string
  system?: HxSystem
}

export function HxSimpleGrid({ minChildWidth, columns, gap = 16, system, style, children, ...rest }: HxSimpleGridProps) {
  const themeVars = system ? useTheme(system) : {}
  const cols = minChildWidth
    ? `repeat(auto-fill, minmax(${typeof minChildWidth==='number'?`${minChildWidth}px`:minChildWidth}, 1fr))`
    : columns ? `repeat(${columns}, 1fr)` : 'repeat(auto-fill, minmax(220px, 1fr))'

  return (
    <div style={{ ...themeVars as CSSProperties, display:'grid', gridTemplateColumns:cols, gap, ...style }} {...rest}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxBox  — generic styled div (as-prop style)
───────────────────────────────────────────────────────────────── */
interface HxBoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof HTMLElementTagNameMap
  p?: number | string
  px?: number | string
  py?: number | string
  m?: number | string
  mx?: number | string
  my?: number | string
  w?: number | string
  h?: number | string
  bg?: string
  rounded?: boolean | number
  shadow?: boolean | string
  border?: string
  system?: HxSystem
}

export function HxBox({ as: Tag = 'div' as any, p, px, py, m, mx, my, w, h, bg, rounded, shadow, border, system, style, children, ...rest }: HxBoxProps) {
  const themeVars = system ? useTheme(system) : {}
  const rad = rounded === true ? 12 : rounded === false ? 0 : rounded
  const boxShadow = shadow === true ? 'var(--hx-shadow-soft)' : typeof shadow === 'string' ? shadow : undefined

  return (
    <div
      style={{
        ...themeVars as CSSProperties,
        padding:p, paddingInline:px, paddingBlock:py,
        margin:m, marginInline:mx, marginBlock:my,
        width:w, height:h, background:bg ?? (system?'var(--hx-surface)':undefined),
        borderRadius:rad, boxShadow, border,
        ...style,
      }}
      {...rest}
    >{children}</div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HxScrollArea  — custom scrollbar region
───────────────────────────────────────────────────────────────── */
interface HxScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  maxH?: number | string
  maxW?: number | string
  direction?: 'vertical' | 'horizontal' | 'both'
  system?: HxSystem
}

export function HxScrollArea({ maxH, maxW, direction = 'vertical', system = 'luxury', style, children, ...rest }: HxScrollAreaProps) {
  const themeVars = useTheme(system)
  return (
    <div
      className="hx-scroll"
      style={{
        ...themeVars as CSSProperties,
        maxHeight:maxH, maxWidth:maxW,
        overflowY:direction!=='horizontal'?'auto':'hidden',
        overflowX:direction!=='vertical'?'auto':'hidden',
        ...style,
      }}
      {...rest}
    >{children}</div>
  )
}
