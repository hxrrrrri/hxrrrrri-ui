import type { Transition, Variants } from 'framer-motion'

export const hxEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const hxTransition: Transition = {
  duration: 0.45,
  ease: hxEase,
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: hxTransition },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
}

export const popIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: hxTransition },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.16 } },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
}
