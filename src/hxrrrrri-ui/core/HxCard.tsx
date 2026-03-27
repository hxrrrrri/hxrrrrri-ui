import type { PropsWithChildren, HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { cx, clamp } from '../lib-utils'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'

interface HxCardProps extends HTMLAttributes<HTMLDivElement> {
  system?: HxSystem
  tilt?: boolean
}

export function HxCard({
  system = 'luxury',
  tilt = false,
  className,
  style,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: PropsWithChildren<HxCardProps>) {
  const themeVars = useTheme(system)

  return (
    <motion.div
      className={cx('hx-root hx-surface', getSystemClass(system), className)}
      style={{
        ...themeVars,
        borderRadius: 16,
        padding: 18,
        boxShadow: 'var(--hx-shadow-soft)',
        transformStyle: 'preserve-3d',
        transition: 'transform 180ms ease',
        ...style,
      }}
      onMouseMove={(event) => {
        if (!tilt) return onMouseMove?.(event)
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        const rx = clamp(y * -9, -9, 9)
        const ry = clamp(x * 9, -9, 9)
        event.currentTarget.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
        onMouseMove?.(event)
      }}
      onMouseLeave={(event) => {
        if (tilt) event.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
        onMouseLeave?.(event)
      }}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.div>
  )
}

