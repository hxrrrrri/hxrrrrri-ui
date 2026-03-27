import { useId, type InputHTMLAttributes } from 'react'

interface HxAccessibleFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
  required?: boolean
}

export function HxAccessibleField({ label, hint, error, required, id, style, ...rest }: HxAccessibleFieldProps) {
  const uid = useId()
  const inputId = id ?? uid
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label
        htmlFor={inputId}
        style={{ fontSize: 13, fontWeight: 600, color: 'var(--hx-text)', userSelect: 'none' }}
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: '#DC2626', marginLeft: 4 }}>*</span>
        )}
      </label>

      <input
        id={inputId}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={!!error}
        aria-required={required}
        style={{
          padding: '11px 14px', fontSize: 14, borderRadius: 6,
          border: `2px solid ${error ? '#DC2626' : 'var(--hx-border)'}`,
          background: 'var(--hx-surface)', color: 'var(--hx-text)',
          outline: 'none', fontFamily: 'var(--hx-font-sans)',
          transition: 'border-color 150ms',
          ...style,
        }}
        onFocus={e => { if (!error) e.currentTarget.style.borderColor = 'var(--hx-accent)' }}
        onBlur={e => { e.currentTarget.style.borderColor = error ? '#DC2626' : 'var(--hx-border)' }}
        {...rest}
      />

      {hint && !error && (
        <p id={hintId} style={{ margin: 0, fontSize: 12, color: 'var(--hx-text-muted)', lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" style={{ margin: 0, fontSize: 12, color: '#DC2626', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
    </div>
  )
}
