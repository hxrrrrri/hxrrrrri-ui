import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { fadeInUp, popIn } from './motionPresets'

export function HxReveal({ children }: PropsWithChildren) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={fadeInUp}>
      {children}
    </motion.div>
  )
}

export function HxPop({ children }: PropsWithChildren) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={popIn}>
      {children}
    </motion.div>
  )
}

