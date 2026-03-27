# MRK-UI — Ultra Luxury Glass + Ultra Minimal

A premium React component library by **Harisankar S (MR.K)** with two complete design systems.

## Live Docs
Deploy this repo to Vercel — it auto-detects as a Vite project.

## Two Systems

### 🖤 Luxury Glass (`lux-*`)
Apple Vision Pro–grade glassmorphism. 5 glass tiers, inset highlights, ambient orbs, 10 live themes.

### ⬜ Ultra Minimal (`min-*`)
Ink on paper. Zero gradients. Zero shadows. Swiss-grid precision.

## Quick Start

```bash
# 1. Copy the CSS files into your project
cp src/styles/tokens.css  your-project/src/styles/
cp src/styles/luxury.css  your-project/src/styles/
cp src/styles/minimal.css your-project/src/styles/
cp src/lib/themes.js      your-project/src/lib/

# 2. Import in your main.jsx / App.jsx
import './styles/tokens.css'
import './styles/luxury.css'   # for glass system
import './styles/minimal.css'  # for minimal system

# 3. Use class names directly
<button className="lux-btn lux-btn-primary">Primary</button>
<div className="lux-g2 lux-hi2 lux-shine">Glass Card</div>
<button className="min-btn min-btn-primary">Minimal</button>
```

## Theming

```js
import { applyTheme, THEMES } from './lib/themes.js'

// Apply any of the 10 luxury themes
applyTheme('arctic')    // Glacial cyan · Polar violet
applyTheme('aurum')     // Liquid gold · Vermillion lacquer
applyTheme('obsidian')  // Burnt ember · Midnight indigo (default)

// All 10: obsidian, arctic, emerald, aurum, sakura, amethyst, copper, pearl, crimson, ocean
```

## CSS Variable System (Luxury)

Set these in `:root` to customise any theme:
- `--mrk-a1` — Primary accent colour
- `--mrk-ar / --mrk-ag / --mrk-ab` — Primary RGB components
- `--mrk-a2` — Secondary accent colour  
- `--mrk-br / --mrk-bg-c / --mrk-bb` — Secondary RGB components
- `--mrk-bg-l1/l2/l3` — Background gradient layers
- `--mrk-orb1/2/3` — Ambient orb colours

## Component Classes

### Luxury Glass
`lux-g1/g2/g3/g4` · `lux-g-accent` · `lux-hi/hi2/hi3` · `lux-shine`  
`lux-btn` + `lux-btn-primary/ghost/outline/sm/lg/icon`  
`lux-input` · `lux-input-label` · `lux-toggle`  
`lux-badge` + `lux-badge-accent/glass/success/warn/err`  
`lux-stat` + `lux-stat-label/val/sub`  
`lux-progress-track/fill` · `lux-avatar` + `lux-avatar-sm/md/lg`  
`lux-loader-ring/dots/pulse/bar-wrap/bar-fill`  
`lux-notif` + `lux-notif-info/success/warn/err`  
`lux-navbar` · `lux-nav-logo/link/dot` · `lux-footer`  
`lux-tag` · `lux-divider` · `lux-step-row/num` · `lux-orb`

### Ultra Minimal
`min-btn` + `min-btn-primary/outline/ghost/sm/lg`  
`min-card` + `min-card-sm/border-l/dark`  
`min-input` · `min-label` · `min-toggle`  
`min-badge` + `min-badge-dark/outline/accent/success/warn/err`  
`min-stat` + `min-stat-label/val/sub`  
`min-progress-track/fill` · `min-avatar` + `min-avatar-sm/md/lg/dark`  
`min-loader-ring/dots/bar`  
`min-notif` + `min-notif-success/warn/err/info`  
`min-navbar` · `min-nav-logo/link` · `min-footer`  
`min-tag` · `min-divider` · `min-step-row/num/done` · `min-table`

## License
MIT — use freely, credit appreciated.

---
Built by [Harisankar S](https://github.com/hxrrrrri) · [portfolio-glass](https://github.com/hxrrrrri/portfolio-glass)
