import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'

interface HxAccessibleFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
  system?: HxSystem
}

export function HxAccessibleField({ label, hint, error, system = 'a11y', ...rest }: HxAccessibleFieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const themeVars = useTheme(system)

  return (
    <label style={{ ...themeVars, display: 'grid', gap: 6, color: 'var(--hx-text)' }}>
      <span style={{ fontWeight: 700 }}>{label}</span>
      <input
        id={id}
        aria-describedby={[hint ? hintId : '', error ? errorId : ''].join(' ').trim() || undefined}
        aria-invalid={error ? true : undefined}
        style={{ border: '2px solid var(--hx-border)', borderRadius: 8, padding: '10px 12px', fontSize: 16 }}
        {...rest}
      />
      {hint ? (
        <small id={hintId} style={{ opacity: 0.8 }}>
          {hint}
        </small>
      ) : null}
      {error ? (
        <small id={errorId} style={{ color: '#B91C1C', fontWeight: 700 }}>
          {error}
        </small>
      ) : null}
    </label>
  )
}

