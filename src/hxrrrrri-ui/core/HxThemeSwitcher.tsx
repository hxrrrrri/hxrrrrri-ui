import type { HxSystem } from '../types'

interface HxThemeSwitcherProps {
  value: string
  onChange: (system: string) => void
}

const SYSTEMS: Array<{ label: string; value: HxSystem; icon: string; desc: string }> = [
  { value: 'luxury',        label: 'Luxury',       icon: '✦', desc: 'Glassmorphism' },
  { value: 'minimal',       label: 'Minimal',      icon: '◻', desc: 'Ink on paper' },
  { value: 'brutalist',     label: 'Brutalist',    icon: '⬛', desc: 'Raw & bold' },
  { value: 'neofuturistic', label: 'Neo',          icon: '◈', desc: 'Neon & 3D' },
  { value: 'enterprise',    label: 'Enterprise',   icon: '⊞', desc: 'SaaS & data' },
  { value: 'experimental',  label: 'Experimental', icon: '⬡', desc: 'Asymmetric' },
  { value: 'a11y',          label: 'A11y',         icon: '♿', desc: 'Accessible' },
]

export function HxThemeSwitcher({ value, onChange }: HxThemeSwitcherProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {SYSTEMS.map(sys => {
        const active = value === sys.value
        return (
          <button
            key={sys.value}
            type="button"
            onClick={() => onChange(sys.value)}
            title={sys.desc}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
              border: active ? '1.5px solid var(--hx-accent)' : '1.5px solid var(--hx-border)',
              background: active ? 'color-mix(in oklab, var(--hx-accent), var(--hx-surface) 84%)' : 'var(--hx-surface)',
              color: active ? 'var(--hx-accent)' : 'var(--hx-text-muted)',
              fontWeight: active ? 700 : 500, fontSize: 12,
              fontFamily: 'var(--hx-font-sans)',
              transition: 'all 150ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1 }}>{sys.icon}</span>
            {sys.label}
          </button>
        )
      })}
    </div>
  )
}
