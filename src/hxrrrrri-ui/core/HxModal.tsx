import { AnimatePresence, motion } from 'framer-motion'
import type { PropsWithChildren, ReactNode } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

const X_ICON = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

interface HxModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  footer?: ReactNode
  system?: HxSystem
}

const widthMap = { sm: 420, md: 560, lg: 720, xl: 900 }

export function HxModal({
  open, onClose, title, description, size = 'md', footer, system = 'luxury', children
}: PropsWithChildren<HxModalProps>) {
  const themeVars = useTheme(system)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 'var(--hx-z-modal)' as unknown as number,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
            display: 'grid', placeItems: 'center', padding: '20px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 28, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            onClick={e => e.stopPropagation()}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={{
              ...themeVars,
              width: `min(${widthMap[size]}px, 100%)`,
              maxHeight: '90dvh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'hx-modal-title' : undefined}
          >
            {/* Header */}
            {title && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                padding: '20px 24px 16px', borderBottom: '1px solid var(--hx-border)',
                gap: 16, flexShrink: 0,
              }}>
                <div>
                  <h2 id="hx-modal-title" style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--hx-text)', lineHeight: 1.3 }}>{title}</h2>
                  {description && <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--hx-text-muted)', lineHeight: 1.5 }}>{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="hx-focus"
                  aria-label="Close modal"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 32, height: 32, borderRadius: 8, border: '1px solid var(--hx-border)',
                    background: 'transparent', cursor: 'pointer', color: 'var(--hx-text)',
                    flexShrink: 0, transition: 'background 150ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--hx-border)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                >
                  <X_ICON/>
                </button>
              </div>
            )}

            {/* Body */}
            <div className="hx-scroll" style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div style={{
                padding: '16px 24px 20px', borderTop: '1px solid var(--hx-border)',
                display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0,
              }}>
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
