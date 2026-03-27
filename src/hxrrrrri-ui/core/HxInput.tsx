import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'
import { useTheme } from '../hooks/useTheme'

export interface HxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  system?: HxSystem
  mode?: 'text' | 'password' | 'otp' | 'ai' | 'voice'
}

export function HxInput({ system = 'luxury', mode = 'text', className, style, ...rest }: HxInputProps) {
  const themeVars = useTheme(system)
  return (
    <motion.input
      whileFocus={{ scale: 1.005 }}
      className={cx('hx-root hx-focus hx-input hx-surface', getSystemClass(system), className)}
      style={{
        ...themeVars,
        width: '100%',
        borderRadius: mode === 'otp' ? 8 : 12,
        border: '1px solid var(--hx-border)',
        padding: mode === 'otp' ? '10px 12px' : '12px 14px',
        letterSpacing: mode === 'otp' ? '0.35em' : undefined,
        background: mode === 'ai' ? 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 86%)' : 'var(--hx-surface)',
        ...style,
      }}
      {...(rest as Record<string, unknown>)}
    />
  )
}

export interface HxTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  system?: HxSystem
}

export function HxTextarea({ system = 'minimal', className, style, ...rest }: HxTextareaProps) {
  const themeVars = useTheme(system)
  return (
    <textarea
      className={cx('hx-root hx-focus hx-surface', getSystemClass(system), className)}
      style={{
        ...themeVars,
        width: '100%',
        minHeight: 120,
        borderRadius: 12,
        border: '1px solid var(--hx-border)',
        padding: '12px 14px',
        resize: 'vertical',
        ...style,
      }}
      {...rest}
    />
  )
}

