# HXRRRRRI-UI

A production-grade React component library with **7 design systems** in one package.

**[Live Docs →](https://hxrrrrri-ui.vercel.app)** &nbsp;|&nbsp; By [Harisankar S (MR.K)](https://github.com/hxrrrrri)

---

## 7 Design Systems

| System | ID | Philosophy |
|--------|----|-----------|
| ✦ Luxury | `luxury` | Glassmorphism, inset highlights, ambient glow |
| ◻ Minimal | `minimal` | Ink on paper, flat, Swiss-grid typography |
| ⬛ Brutalist | `brutalist` | Bold borders, offset shadows, raw energy |
| ◈ Neo-Futuristic | `neofuturistic` | Neon glow, holographic surfaces, 3D |
| ⊞ Enterprise | `enterprise` | Clean SaaS, data-heavy, subtle elevation |
| ⬡ Experimental | `experimental` | Asymmetric, physics-based, unconventional |
| ♿ A11y | `a11y` | WCAG 2.1 AA, high contrast, keyboard-first |

---

## Component Catalogue

### Core
`HxButton` · `HxCard` · `HxInput` · `HxTextarea` · `HxModal` · `HxDropdown` · `HxThemeSwitcher`

### Advanced
`HxCommandPalette` · `HxDragBoard` · `HxDataTable` · `HxTimeline` · `HxDashboardGrid` · `HxDashboardTile`

### Motion
`HxPageTransition` · `HxParallax` · `HxGesturePanel`

### Immersive
`HxFloatingOrbs` · `HxPerspectiveStage` · `HxWebGLShell`

### A11y
`HxAccessibleField`

---

## Quick Start

```tsx
// 1. Import styles
import 'hxrrrrri-ui/style.css'

// 2. Wrap in ThemeProvider
import { ThemeProvider, HxButton, HxCard } from 'hxrrrrri-ui'

export default function App() {
  return (
    <ThemeProvider>
      <HxCard system="luxury" tilt accentBar>
        <HxButton system="luxury" variant="primary">
          Launch Project
        </HxButton>
      </HxCard>
    </ThemeProvider>
  )
}
```

## Switching Systems

Every component accepts a `system` prop. No theme context changes needed:

```tsx
<HxButton system="luxury"        variant="primary">Luxury</HxButton>
<HxButton system="minimal"       variant="primary">Minimal</HxButton>
<HxButton system="brutalist"     variant="primary">Brutalist</HxButton>
<HxButton system="neofuturistic" variant="neon">Neo-Futuristic</HxButton>
<HxButton system="enterprise"    variant="primary">Enterprise</HxButton>
<HxButton system="experimental"  variant="gradient">Experimental</HxButton>
<HxButton system="a11y"          variant="primary">A11y</HxButton>
```

## HxButton Variants

`primary` · `secondary` · `ghost` · `outline` · `danger` · `success` · `warning` · `info` · `glass` · `neon` · `soft` · `elevated` · `link` · `chip` · `icon` · `ai` · `gradient` · `pill`

## Key Component APIs

### HxButton
```tsx
<HxButton
  system="luxury"
  variant="primary"    // 18 variants
  size="md"            // xs | sm | md | lg
  loading={false}
  disabled={false}
  fullWidth={false}
  icon={<Icon/>}
  iconPosition="right" // left | right
/>
```

### HxCard
```tsx
<HxCard
  system="luxury"
  tilt={true}          // 3D tilt on hover
  accentBar={true}     // gradient top bar
  hover={true}         // lift on hover
  padding="md"         // none | sm | md | lg
/>
```

### HxDataTable (virtualised — handles 200k+ rows)
```tsx
<HxDataTable
  system="enterprise"
  columns={[{ key: 'name', title: 'Name', width: 180 }]}
  rows={rows}
  viewportHeight={380}
  striped={true}
  searchable={true}
/>
```

### HxCommandPalette (⌘K)
```tsx
<HxCommandPalette
  open={open}
  onOpenChange={setOpen}
  system="luxury"
  items={[{ id: '1', title: 'Deploy', icon: '▲', kbd: '⌘D', onSelect: () => {} }]}
/>
```

---

## Deploy

```bash
git clone https://github.com/hxrrrrri/hxrrrrri-ui
cd hxrrrrri-ui
npm install && npm run dev
```

Import to Vercel → Framework: Vite → Deploy.

---

MIT License · Built by [Harisankar S (MR.K)](https://github.com/hxrrrrri)
