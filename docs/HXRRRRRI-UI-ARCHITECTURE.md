# HXRRRRRI-UI Architecture Blueprint

## Vision
HXRRRRRI-UI is a multi-paradigm React ecosystem designed to ship premium interfaces across seven design systems with one API surface.

## Folder Structure

```txt
src/hxrrrrri-ui/
  core/            # Base interactive UI (buttons, inputs, cards, modal, dropdown)
  systems/         # Design-paradigm wrappers and system utilities
  motion/          # Reusable animation primitives and transition components
  advanced/        # Command palette, board, data table, timeline, dashboard
  immersive/       # Perspective, floating visual layers, WebGL shell wrappers
  a11y/            # Accessibility-first opinionated components
  hooks/           # Shared logic and headless behavior
  styles/          # Tokens and system-level CSS
  types/           # Shared TypeScript contracts
  index.ts         # Tree-shakable barrel exports
```

## Naming Conventions
- Components: HxPascalCase (example: HxCommandPalette)
- Hooks: useCamelCase (example: useHeadlessSelect)
- Design system id: lowercase string union (luxury, minimal, brutalist, neofuturistic, enterprise, experimental, a11y)
- CSS class prefix: hx-

## Export System
- Single-entry consumer import: `import { HxButton, HxDataTable } from 'hxrrrrri-ui'`
- Domain imports: `import { HxParallax } from 'hxrrrrri-ui/motion'` can be added later via package exports map.
- All components are functional, typed, and tree-shakable via ESM exports.

## Design Systems and Components

### Luxury UI
- Components: HxLuxuryPanel, HxButton (glass/gradient), HxCard (tilt)
- Style direction: premium glass, reflective surfaces, rich gradients
- Customization: theme tokens `--hx-accent`, `--hx-glow`, and motion variants

### Minimal UI
- Components: HxMinimalPanel, HxButton (ghost/link), HxInput
- Style direction: whitespace-first, editorial hierarchy, no visual noise
- Customization: border radius zero, monochrome palette via ThemeProvider override

### Brutalist UI
- Components: HxBrutalistPanel, HxButton (split/outline), HxCard
- Style direction: sharp edges, high-contrast borders, offset shadows
- Customization: border width, hard shadow offset, typography scale

### Neo-Futuristic UI
- Components: HxNeoPanel, HxFloatingOrbs, HxPerspectiveStage
- Style direction: holographic glows, cyan-magenta accents, depth cues
- Customization: glow strength, perspective depth, neon color channels

### Enterprise UI
- Components: HxEnterprisePanel, HxDataTable, HxDashboardGrid, HxDragBoard
- Style direction: structured hierarchy, data density, predictable interactions
- Customization: row heights, virtualization viewport, tile spans

### Experimental UI
- Components: HxExperimentalPanel, HxGesturePanel, HxParallax
- Style direction: asymmetric geometry, motion-driven interaction
- Customization: drag dismiss threshold, parallax speed, shape morphology

### Accessibility-First UI
- Components: HxA11yPanel, HxAccessibleField
- Style direction: high contrast, clear focus, predictable semantics
- Customization: label/hint/error semantics and contrast-safe token values

## Full Component Code Locations
- Core: src/hxrrrrri-ui/core/
- Advanced: src/hxrrrrri-ui/advanced/
- Motion: src/hxrrrrri-ui/motion/
- Immersive: src/hxrrrrri-ui/immersive/
- Accessibility: src/hxrrrrri-ui/a11y/
- System variants: src/hxrrrrri-ui/systems/

Each file contains complete production-ready React code and can be consumed immediately.

## Usage Example

```tsx
import { ThemeProvider, HxButton, HxCard, HxCommandPalette, HxDataTable } from './src/hxrrrrri-ui'

export function Demo() {
  return (
    <ThemeProvider>
      <HxCard system="luxury" tilt>
        <HxButton system="luxury" variant="gradient">Launch</HxButton>
      </HxCard>
      <HxDataTable
        system="enterprise"
        columns={[{ key: 'name', title: 'Name' }, { key: 'status', title: 'Status' }]}
        rows={[{ name: 'Pipeline A', status: 'Live' }]}
      />
      <HxCommandPalette open={false} onOpenChange={() => {}} items={[]} />
    </ThemeProvider>
  )
}
```

## Documentation Site Structure
- Getting Started
- Installation
- Theming and Tokens
- Design Systems Overview
- Core Components
- Advanced Components
- Motion and Immersive APIs
- Accessibility Recipes
- Migration and Versioning

## Scalability Rules
- Keep shared behavior in hooks or motion primitives.
- Keep system-specific styling in system wrappers and token overrides.
- Favor composition over prop explosion.
- Add headless-first APIs when introducing complex input components.
