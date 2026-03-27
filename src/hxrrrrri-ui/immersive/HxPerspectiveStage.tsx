import type { PropsWithChildren } from 'react'

export function HxPerspectiveStage({ children }: PropsWithChildren) {
  return (
    <section
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        padding: 20,
        borderRadius: 24,
        border: '1px solid var(--hx-border)',
        background: 'linear-gradient(180deg, color-mix(in oklab, var(--hx-surface), transparent 10%), var(--hx-surface))',
      }}
    >
      {children}
    </section>
  )
}

