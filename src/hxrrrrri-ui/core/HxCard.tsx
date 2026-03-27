import type { PropsWithChildren, HTMLAttributes, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { HxSystem } from '../types'
import { cx, clamp } from '../lib-utils'
import { useTheme } from '../hooks/useTheme'
import { getSystemClass } from '../systems/systemClass'

export interface HxCardProps extends HTMLAttributes<HTMLDivElement> {
  system?: HxSystem
  tilt?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
  /** Accent bar colour at the top of the card */
  accentBar?: boolean
  hover?: boolean
}

const paddingMap = { none: 0, sm: 14, md: 20, lg: 28 }

export function HxCard({
  system = 'luxury',
  tilt = false,
  padding = 'md',
  accentBar = false,
  hover = false,
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
      whileHover={hover ? { y: -3 } : {}}
      style={{
        ...themeVars,
        padding: paddingMap[padding],
        transformStyle: 'preserve-3d',
        transition: 'transform 180ms var(--hx-ease), box-shadow 180ms var(--hx-ease)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      onMouseMove={(event) => {
        if (!tilt) return onMouseMove?.(event)
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        const rx = clamp(y * -8, -8, 8)
        const ry = clamp(x * 8, -8, 8)
        event.currentTarget.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
        onMouseMove?.(event)
      }}
      onMouseLeave={(event) => {
        if (tilt) event.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
        onMouseLeave?.(event)
      }}
      {...(rest as Record<string, unknown>)}
    >
      {accentBar && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, var(--hx-accent), var(--hx-accent-alt))',
          borderRadius: 'inherit',
        }}/>
      )}
      {children}
    </motion.div>
  )
}
