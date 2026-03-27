import type { HxSystem } from '../types'
import { HxDropdown } from './HxDropdown'

const systems: Array<{ label: string; value: HxSystem }> = [
  { label: 'Luxury', value: 'luxury' },
  { label: 'Minimal', value: 'minimal' },
  { label: 'Brutalist', value: 'brutalist' },
  { label: 'Neo-Futuristic', value: 'neofuturistic' },
  { label: 'Enterprise', value: 'enterprise' },
  { label: 'Experimental', value: 'experimental' },
  { label: 'Accessibility', value: 'a11y' },
]

interface HxThemeSwitcherProps {
  value: HxSystem
  onChange: (system: HxSystem) => void
}

export function HxThemeSwitcher({ value, onChange }: HxThemeSwitcherProps) {
  return (
    <HxDropdown
      options={systems}
      value={[value]}
      multiple={false}
      searchable={false}
      onChange={(next) => {
        const selected = next[0]
        if (selected) onChange(selected as HxSystem)
      }}
      placeholder="Choose design system"
      system="enterprise"
    />
  )
}

