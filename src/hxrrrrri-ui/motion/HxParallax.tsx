import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { PropsWithChildren } from 'react'

interface HxParallaxProps {
  speed?: number
}

export function HxParallax({ speed = 70, children }: PropsWithChildren<HxParallaxProps>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

  return (
    <div ref={ref} style={{ overflow: 'clip' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

