import { AnimatePresence, motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import type { HxSystem } from '../types'
import { useTheme } from '../hooks/useTheme'
import { cx } from '../lib-utils'
import { getSystemClass } from '../systems/systemClass'

interface HxModalProps {
  open: boolean
  onClose: () => void
  title?: string
  system?: HxSystem
}

export function HxModal({ open, onClose, title, system = 'luxury', children }: PropsWithChildren<HxModalProps>) {
  const themeVars = useTheme(system)

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'grid',
            placeItems: 'center',
            padding: 20,
            zIndex: 60,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 14, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
            className={cx('hx-root hx-surface', getSystemClass(system))}
            style={{ ...themeVars, width: 'min(640px, 100%)', padding: 20, borderRadius: 20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{title ?? 'Modal'}</h3>
              <button className="hx-focus" onClick={onClose} style={{ background: 'transparent', border: 0, cursor: 'pointer' }}>
                Close
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

