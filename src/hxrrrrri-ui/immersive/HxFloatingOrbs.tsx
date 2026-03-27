import { motion } from 'framer-motion'

interface HxFloatingOrbsProps {
  count?: number
  blur?: number
  opacity?: number
}

const ORB_CONFIGS = [
  { size: 600, x: '8%',  y: '5%',  dur: 9,  color: 'var(--hx-accent)',     dx: 28,  dy: -24 },
  { size: 480, x: '62%', y: '12%', dur: 13, color: 'var(--hx-accent-alt)', dx: -22, dy: 18  },
  { size: 380, x: '28%', y: '60%', dur: 11, color: 'var(--hx-glow)',        dx: 18,  dy: -14 },
]

export function HxFloatingOrbs({ count = 3, blur = 80, opacity = 0.22 }: HxFloatingOrbsProps) {
  const orbs = ORB_CONFIGS.slice(0, count)

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 'var(--hx-z-orbs)' as unknown as number, overflow: 'clip' }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, orb.dy, 0],
            x: [0, orb.dx, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.4,
          }}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            filter: `blur(${blur}px)`,
            opacity,
            background: orb.color,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
