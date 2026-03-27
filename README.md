# HXRRRRRI-UI

**The most comprehensive React component library you'll find.** 7 design systems. 100+ production-ready components. Full TypeScript. Framer Motion throughout. Zero configuration.

**[Live Docs →](https://hxrrrrri-ui.vercel.app)** | By [Harisankar S (MR.K)](https://github.com/hxrrrrri)

---

## 7 Design Systems

| Icon | System | `system` prop | Philosophy |
|------|--------|---------------|-----------|
| ✦ | Luxury | `luxury` | Glassmorphism, inset highlights, ambient glow — Apple Vision Pro grade |
| ◻ | Minimal | `minimal` | Ink on paper, flat, Swiss-grid typography precision |
| ⬛ | Brutalist | `brutalist` | Bold borders, offset shadows, raw visual energy |
| ◈ | Neo-Futuristic | `neofuturistic` | Neon glow, holographic surfaces, scan-line aesthetics |
| ⊞ | Enterprise | `enterprise` | Clean SaaS, data-heavy dashboards, subtle elevation |
| ⬡ | Experimental | `experimental` | Asymmetric corners, physics-based, unconventional |
| ♿ | A11y | `a11y` | WCAG 2.1 AA, high contrast, full keyboard navigation |

---

## Full Component Catalogue — 100+ Components

### Core
`HxButton` (18 variants × 4 sizes) · `HxCard` (tilt, accent bar, hover lift) · `HxInput` (text, password, OTP, AI, search) · `HxTextarea` · `HxModal` (sm/md/lg/xl) · `HxDropdown` (single, multi, searchable) · `HxThemeSwitcher`

### Feedback
`HxAlert` (info/success/warning/error, dismissible) · `HxToaster` + `toast()` imperative API · `HxProgress` (linear, striped, animated) · `HxCircularProgress` · `HxSkeleton` (text/card/circular/rectangular) · `HxSpinner` · `HxBadge` (count, dot, positions)

### Navigation
`HxTabs` (line/pill/enclosed/soft, badges) · `HxBreadcrumb` (custom separator, collapsed) · `HxPagination` (siblings, edge pages) · `HxStepper` (horizontal/vertical, dots, progress) · `HxNavMenu` (grouped, keyboard shortcuts, danger) · `HxSidebar` (collapsible, nested items, badges)

### Layout
`HxStack` · `HxGrid` + `HxGridItem` · `HxSimpleGrid` (auto-fill) · `HxDivider` (labelled, dashed, vertical) · `HxContainer` (sm/md/lg/xl/2xl) · `HxAspectRatio` · `HxCenter` · `HxWrap` · `HxBox` · `HxScrollArea`

### Form
`HxCheckbox` (indeterminate) · `HxRadioGroup` (default/card variants) · `HxSwitch` (sizes, descriptions) · `HxSlider` (marks, custom colour) · `HxRating` (star/heart, half-stars) · `HxFileUpload` (drag & drop, size validation) · `HxNumberInput` (prefix/suffix, min/max) · `HxColorPicker` (presets, hex input) · `HxPinInput` (OTP, mask)

### Display
`HxTooltip` (4 placements, delay) · `HxPopover` (click/hover trigger) · `HxAccordion` (default/separated/flush, multiple) · `HxTag` + `HxTagGroup` (removable, selectable) · `HxChip` · `HxAvatarGroup` (max + overflow count) · `HxStat` (trend indicators) · `HxCode` (inline + block) · `HxKbd` · `HxTable` (striped, hover, custom render) · `HxBadge`

### Overlay
`HxDrawer` (left/right/top/bottom, sizes) · `HxContextMenu` (right-click, keyboard shortcuts) · `HxAlertDialog` (danger/warning/info, async confirm) · `HxSheet` (bottom sheet, drag handle)

### Advanced
`HxCommandPalette` (⌘K, keyboard nav, icons, kbd badges) · `HxDragBoard` (Kanban, lane counts, colour-coded tags) · `HxDataTable` (virtualised 200k+ rows, sort, search, custom render) · `HxTimeline` (vertical/horizontal, status colours) · `HxDashboardGrid` + `HxDashboardTile` (trend arrows, accent bars)

### Motion
`HxPageTransition` · `HxParallax` · `HxGesturePanel` (swipe dismiss, spring physics)

### Immersive
`HxFloatingOrbs` (configurable count/blur/opacity) · `HxPerspectiveStage` · `HxWebGLShell` (Three.js/R3F mount point)

### A11y
`HxAccessibleField` (ARIA, required asterisk, error icon, hint text)

---

## Quick Start

```bash
git clone https://github.com/hxrrrrri/hxrrrrri-ui
cd hxrrrrri-ui && npm install && npm run dev
```

## Install In Another React App

```bash
# npm registry (after publish)
npm install hxrrrrri-ui framer-motion

# OR directly from GitHub
npm install github:hxrrrrri/hxrrrrri-ui

# OR from GitHub Packages
npm install @hxrrrrri/hxrrrrri-ui --registry=https://npm.pkg.github.com
```

```tsx
import 'hxrrrrri-ui/style.css'
import { ThemeProvider, HxButton } from 'hxrrrrri-ui'

export function Demo() {
  return (
    <ThemeProvider>
      <HxButton system="luxury" variant="gradient">Launch</HxButton>
    </ThemeProvider>
  )
}
```

```tsx
// 1. Import styles (once, in main.tsx)
import 'hxrrrrri-ui/style.css'

// 2. Wrap app in ThemeProvider
import { ThemeProvider, HxButton, HxCard, HxModal } from 'hxrrrrri-ui'

export default function App() {
  return (
    <ThemeProvider>
      <HxCard system="luxury" tilt accentBar>
        <HxButton system="luxury" variant="gradient" size="lg">
          Launch Project
        </HxButton>
      </HxCard>
    </ThemeProvider>
  )
}
```

## Switching Systems

```tsx
// Same component — 7 completely different personalities
<HxButton system="luxury"        variant="primary">Luxury</HxButton>
<HxButton system="minimal"       variant="primary">Minimal</HxButton>
<HxButton system="brutalist"     variant="primary">Brutalist</HxButton>
<HxButton system="neofuturistic" variant="neon">Neo-Futuristic</HxButton>
<HxButton system="enterprise"    variant="primary">Enterprise</HxButton>
<HxButton system="experimental"  variant="gradient">Experimental</HxButton>
<HxButton system="a11y"          variant="primary">A11y</HxButton>
```

## Imperative Toast API

```tsx
import { HxToaster, toast } from 'hxrrrrri-ui'

// Mount once
<HxToaster position="top-right" system="luxury"/>

// Call anywhere
toast.success('Deployment successful!', 'Live at vercel.app')
toast.error('Build failed', 'TypeError on line 42')
toast.warning('Rate limit', '80% quota consumed')
toast.info('New message', 'Check your inbox')
```

## Key Component APIs

```tsx
<HxButton variant="primary" size="md" loading fullWidth icon={<Icon/>} iconPosition="right"/>

<HxCard tilt accentBar hover padding="lg" system="luxury"/>

<HxDataTable columns={cols} rows={rows} viewportHeight={400} striped searchable
  columns={[{ key:'status', title:'Status', render:(v,row) => <Badge>{v}</Badge> }]}
/>

<HxDrawer open={open} onClose={close} placement="right" size="md"
  title="Title" description="Description" footer={<Buttons/>}
/>

<HxAlertDialog open={open} onClose={close} onConfirm={deleteIt}
  title="Delete?" variant="danger" confirmLabel="Yes, delete"
/>

<HxStepper steps={steps} activeStep={2} orientation="vertical" variant="default"/>
<HxPagination total={200} page={page} pageSize={10} onChange={setPage}/>
<HxSidebar items={items} activeId={id} onNavigate={navigate} collapsed/>
```

---

## Deploy

```bash
git init && git add . && git commit -m "feat: HXRRRRRI-UI v1.0"
git remote add origin https://github.com/hxrrrrri/hxrrrrri-ui
git push -u origin main
# Import to vercel.com/new → Vite auto-detected → Deploy
```

---

## Publish To npm (Maintainer)

### First publish

```bash
npm login
npm whoami
npm run release:check
npm publish --access public
```

### Publish updates

```bash
# choose one
npm run release:patch
npm run release:minor
npm run release:major

npm run release:check
npm publish --access public
git push origin HEAD --follow-tags
```

For complete release notes and troubleshooting, see docs/PUBLISHING.md.

---

MIT License · Built by [Harisankar S (MR.K)](https://github.com/hxrrrrri) · MBCET '26
