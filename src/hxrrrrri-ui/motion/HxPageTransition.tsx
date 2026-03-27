import { AnimatePresence, motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

interface HxPageTransitionProps {
  routeKey: string
}

export function HxPageTransition({ routeKey, children }: PropsWithChildren<HxPageTransitionProps>) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

