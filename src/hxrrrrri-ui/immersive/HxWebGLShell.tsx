import type { PropsWithChildren } from 'react'

interface HxWebGLShellProps {
  fallbackLabel?: string
}

export function HxWebGLShell({ fallbackLabel = 'WebGL canvas mount point', children }: PropsWithChildren<HxWebGLShellProps>) {
  return (
    <div style={{ border: '1px dashed var(--hx-border)', borderRadius: 16, padding: 14 }}>
      <strong style={{ display: 'block', marginBottom: 8 }}>{fallbackLabel}</strong>
      <p style={{ marginTop: 0, opacity: 0.75 }}>
        Attach a Three.js or React Three Fiber renderer to this container for immersive scenes.
      </p>
      {children}
    </div>
  )
}

