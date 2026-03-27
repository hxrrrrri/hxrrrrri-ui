import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import type { HxSystem } from '../types'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'
import { useTheme } from '../hooks/useTheme'

export type HxButtonVariant =
  | 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
  | 'warning' | 'info' | 'glass' | 'neon' | 'soft' | 'elevated' | 'link'
  | 'chip' | 'icon' | 'ai' | 'gradient' | 'pill'

export interface HxButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  system?: HxSystem
  variant?: HxButtonVariant
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
}

const sizeMap: Record<string, CSSProperties> = {
  xs: { padding: '5px 10px', fontSize: 11, gap: 5, borderRadius: 7 },
  sm: { padding: '7px 14px', fontSize: 12, gap: 6, borderRadius: 9 },
  md: { padding: '10px 20px', fontSize: 13, gap: 8, borderRadius: 12 },
  lg: { padding: '14px 28px', fontSize: 15, gap: 10, borderRadius: 14 },
}

export function HxButton({
  system = 'luxury',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  className,
  style,
  children,
  disabled,
  ...rest
}: HxButtonProps) {
  const themeVars = useTheme(system)
  const sz = sizeMap[size]

  const variantStyles: Record<HxButtonVariant, CSSProperties> = {
    primary:   { background: 'var(--hx-accent)', color: '#fff', border: '1px solid transparent' },
    secondary: { background: 'var(--hx-accent-alt)', color: '#fff', border: '1px solid transparent' },
    ghost:     { background: 'transparent', color: 'var(--hx-text)', border: '1px solid transparent' },
    outline:   { background: 'transparent', color: 'var(--hx-text)', border: '1px solid var(--hx-border)' },
    danger:    { background: '#DC2626', color: '#fff', border: '1px solid transparent' },
    success:   { background: '#059669', color: '#fff', border: '1px solid transparent' },
    warning:   { background: '#D97706', color: '#fff', border: '1px solid transparent' },
    info:      { background: '#0284C7', color: '#fff', border: '1px solid transparent' },
    glass:     {
      background: 'color-mix(in oklab, var(--hx-surface), transparent 18%)',
      backdropFilter: 'blur(14px)', border: '1px solid var(--hx-border)', color: 'var(--hx-text)',
    },
    neon:      {
      background: 'transparent', color: 'var(--hx-accent)',
      border: '1px solid var(--hx-accent)',
      boxShadow: '0 0 14px var(--hx-glow), inset 0 0 14px color-mix(in oklab, var(--hx-accent), transparent 88%)',
    },
    soft:      {
      background: 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 80%)',
      color: 'var(--hx-accent)', border: '1px solid transparent',
    },
    elevated:  {
      background: 'var(--hx-surface)', color: 'var(--hx-text)',
      border: '1px solid var(--hx-border)', boxShadow: 'var(--hx-shadow-soft)',
    },
    link:      { background: 'transparent', color: 'var(--hx-accent)', border: 'none', textDecoration: 'underline', paddingInline: 2 },
    chip:      {
      background: 'color-mix(in oklab, var(--hx-accent), transparent 85%)',
      color: 'var(--hx-accent)', border: '1px solid color-mix(in oklab, var(--hx-accent), transparent 65%)',
      borderRadius: 999,
    },
    icon:      { background: 'transparent', border: '1px solid var(--hx-border)', width: 38, height: 38, padding: 0 },
    ai:        {
      background: 'linear-gradient(135deg, var(--hx-accent), var(--hx-accent-alt))',
      color: '#fff', border: '1px solid transparent',
    },
    gradient:  {
      background: 'linear-gradient(135deg, var(--hx-accent) 0%, color-mix(in oklab, var(--hx-accent-alt), white 10%) 100%)',
      color: '#fff', border: '1px solid transparent',
    },
    pill:      { background: 'var(--hx-text)', color: 'var(--hx-bg)', border: 'none', borderRadius: 999 },
  }

  return (
    <motion.button
      whileHover={!disabled ? { y: variant === 'link' ? 0 : -1.5 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={cx('hx-root hx-focus hx-button', getSystemClass(system), className)}
      disabled={disabled || loading}
      style={{
        ...themeVars,
        ...sz,
        ...variantStyles[variant],
        width: fullWidth ? '100%' : undefined,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: `all ${loading ? '0' : 'var(--hx-dur-base)'} var(--hx-ease)`,
        position: 'relative', overflow: 'hidden',
        ...style,
      }}
      {...(rest as Record<string, unknown>)}
    >
      {iconPosition === 'left' && icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      {loading
        ? <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', opacity: 0.6,
                animation: `hx-dot 1.2s ease-in-out ${i * 0.15}s infinite` }}/>
            ))}
          </span>
        : children
      }
      {iconPosition === 'right' && icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
    </motion.button>
  )
}
