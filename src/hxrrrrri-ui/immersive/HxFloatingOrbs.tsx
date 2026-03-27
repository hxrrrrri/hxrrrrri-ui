import { motion } from 'framer-motion'

export function HxFloatingOrbs() {
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1, overflow: 'clip' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], x: [0, i % 2 === 0 ? 20 : -20, 0] }}
          transition={{ duration: 7 + i * 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 220 + i * 130,
            height: 220 + i * 130,
            borderRadius: '50%',
            filter: 'blur(42px)',
            opacity: 0.22,
            background: i === 0 ? 'var(--hx-accent)' : i === 1 ? 'var(--hx-accent-alt)' : 'var(--hx-glow)',
            left: `${12 + i * 30}%`,
            top: `${10 + i * 18}%`,
          }}
        />
      ))}
    </div>
  )
}

