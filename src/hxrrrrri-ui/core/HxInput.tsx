import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'
import { useTheme } from '../hooks/useTheme'

export interface HxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  system?: HxSystem
  mode?: 'text' | 'password' | 'otp' | 'ai' | 'search'
  label?: string
  hint?: string
  error?: string
}

export const HxInput = forwardRef<HTMLInputElement, HxInputProps>(function HxInput(
  { system = 'luxury', mode = 'text', label, hint, error, className, style, id, ...rest },
  ref
) {
  const themeVars = useTheme(system)
  const inputId = id ?? (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined)

  const baseStyle = {
    ...themeVars,
    width: '100%',
    padding: mode === 'otp' ? '10px 14px' : '11px 14px',
    borderRadius: mode === 'otp' ? 8 : (system === 'minimal' || system === 'brutalist' ? 0 : system === 'a11y' ? 6 : 11),
    border: error
      ? '1.5px solid #DC2626'
      : `1.5px solid ${mode === 'ai' ? 'color-mix(in oklab, var(--hx-accent), transparent 55%)' : 'var(--hx-border)'}`,
    background: mode === 'ai'
      ? 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 88%)'
      : 'var(--hx-surface)',
    color: 'var(--hx-text)',
    letterSpacing: mode === 'otp' ? '0.32em' : 'normal',
    fontSize: 14,
    fontFamily: mode === 'ai' ? 'var(--hx-font-mono)' : 'var(--hx-font-sans)',
    outline: 'none',
    transition: 'border-color 180ms var(--hx-ease), box-shadow 180ms var(--hx-ease)',
    ...style,
  }

  return (
    <div className="hx-root" style={themeVars as React.CSSProperties}>
      {label && (
        <label htmlFor={inputId} style={{
          display: 'block', marginBottom: 6,
          fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
          color: error ? '#DC2626' : 'var(--hx-text-muted)',
        }}>
          {label}
        </label>
      )}
      <motion.input
        ref={ref}
        id={inputId}
        type={mode === 'password' ? 'password' : mode === 'otp' ? 'tel' : mode === 'search' ? 'search' : 'text'}
        className={cx('hx-focus hx-input', getSystemClass(system), className)}
        whileFocus={{ scale: 1.002 }}
        style={baseStyle as Record<string, unknown>}
        {...(rest as Record<string, unknown>)}
      />
      {(hint || error) && (
        <p style={{
          marginTop: 5, marginBottom: 0, fontSize: 12,
          color: error ? '#DC2626' : 'var(--hx-text-muted)',
          lineHeight: 1.5,
        }}>{error ?? hint}</p>
      )}
    </div>
  )
})

export interface HxTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  system?: HxSystem
  label?: string
  hint?: string
  error?: string
}

export const HxTextarea = forwardRef<HTMLTextAreaElement, HxTextareaProps>(function HxTextarea(
  { system = 'luxury', label, hint, error, className, style, id, ...rest },
  ref
) {
  const themeVars = useTheme(system)
  const textareaId = id ?? (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined)

  return (
    <div className="hx-root" style={themeVars as React.CSSProperties}>
      {label && (
        <label htmlFor={textareaId} style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: error ? '#DC2626' : 'var(--hx-text-muted)' }}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cx('hx-focus hx-input hx-surface hx-scroll', getSystemClass(system), className)}
        style={{
          ...themeVars,
          width: '100%',
          minHeight: 100,
          padding: '11px 14px',
          borderRadius: system === 'minimal' || system === 'brutalist' ? 0 : 11,
          border: `1.5px solid ${error ? '#DC2626' : 'var(--hx-border)'}`,
          resize: 'vertical',
          fontSize: 14,
          lineHeight: 1.6,
          outline: 'none',
          transition: 'border-color 180ms var(--hx-ease)',
          ...style,
        }}
        {...rest}
      />
      {(hint || error) && (
        <p style={{ marginTop: 5, marginBottom: 0, fontSize: 12, color: error ? '#DC2626' : 'var(--hx-text-muted)', lineHeight: 1.5 }}>{error ?? hint}</p>
      )}
    </div>
  )
})
