import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import type { HxSystem } from '../types'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'
import { useTheme } from '../hooks/useTheme'

type HxButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'glass'
  | 'neon'
  | 'soft'
  | 'elevated'
  | 'link'
  | 'chip'
  | 'icon'
  | 'ai'
  | 'voice'
  | 'gradient'
  | 'pill'
  | 'split'

export interface HxButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  system?: HxSystem
  variant?: HxButtonVariant
}

export function HxButton({
  system = 'luxury',
  variant = 'primary',
  className,
  style,
  children,
  ...rest
}: HxButtonProps) {
  const themeVars = useTheme(system)

  const variantStyles: Record<HxButtonVariant, CSSProperties> = {
    primary: { background: 'var(--hx-accent)', color: 'white' },
    secondary: { background: 'var(--hx-accent-alt)', color: 'white' },
    ghost: { background: 'transparent', color: 'var(--hx-text)' },
    outline: { background: 'transparent', border: '1px solid var(--hx-border)' },
    danger: { background: '#DC2626', color: '#fff' },
    success: { background: '#0C9B62', color: '#fff' },
    warning: { background: '#D97706', color: '#fff' },
    info: { background: '#0369A1', color: '#fff' },
    glass: { background: 'color-mix(in oklab, var(--hx-surface), transparent 20%)', backdropFilter: 'blur(12px)' },
    neon: { background: 'transparent', border: '1px solid var(--hx-accent)', color: 'var(--hx-accent)', boxShadow: '0 0 16px var(--hx-glow)' },
    soft: { background: 'color-mix(in oklab, var(--hx-accent), white 72%)' },
    elevated: { background: 'var(--hx-surface)', boxShadow: 'var(--hx-shadow-soft)' },
    link: { background: 'transparent', textDecoration: 'underline', paddingInline: 2 },
    chip: { background: 'color-mix(in oklab, var(--hx-accent), transparent 82%)', borderRadius: 999 },
    icon: { width: 42, height: 42, padding: 0, display: 'inline-grid', placeItems: 'center' },
    ai: { background: 'linear-gradient(135deg, var(--hx-accent), var(--hx-accent-alt))', color: '#fff' },
    voice: { background: '#111827', color: '#ECFEFF', border: '1px solid #164E63' },
    gradient: { background: 'linear-gradient(145deg, var(--hx-accent), color-mix(in oklab, var(--hx-accent-alt), white 15%))', color: '#fff' },
    pill: { background: 'var(--hx-text)', color: 'var(--hx-bg)', borderRadius: 999 },
    split: { background: 'linear-gradient(90deg, var(--hx-accent) 50%, var(--hx-accent-alt) 50%)', color: '#fff' },
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cx('hx-root hx-focus hx-button hx-surface', getSystemClass(system), className)}
      style={{
        ...themeVars,
        ...variantStyles[variant],
        borderRadius: 12,
        padding: '10px 16px',
        fontWeight: 700,
        transition: 'all 220ms var(--hx-motion-ease)',
        ...style,
      }}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  )
}

