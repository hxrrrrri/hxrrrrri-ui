import { useMemo, useState } from 'react'
import {
  ThemeProvider, HxThemeSwitcher,
  HxButton, HxInput, HxTextarea, HxCard, HxModal, HxDropdown,
  HxCommandPalette, HxDragBoard, HxDataTable, HxTimeline,
  HxDashboardGrid, HxDashboardTile,
  HxParallax, HxGesturePanel, HxPageTransition,
  HxFloatingOrbs, HxPerspectiveStage, HxWebGLShell,
  HxAccessibleField,
} from '../hxrrrrri-ui'

// ── Sample data ───────────────────────────────────────────────────
const CMD_ITEMS = [
  { id: 'new-proj',    title: 'Create New Project',     subtitle: 'Scaffold a full app shell',     icon: '✦', kbd: '⌘N', onSelect: () => {} },
  { id: 'theme-audit', title: 'Run Theme Audit',         subtitle: 'Validate all token mappings',  icon: '◈', kbd: '⌘T', onSelect: () => {} },
  { id: 'export-map',  title: 'Generate Export Map',     subtitle: 'Optimise bundle entry points', icon: '⊞', kbd: '⌘E', onSelect: () => {} },
  { id: 'docs',        title: 'Open Documentation',      subtitle: 'Component API reference',      icon: '◻', kbd: '⌘D', onSelect: () => {} },
  { id: 'deploy',      title: 'Deploy to Vercel',        subtitle: 'Push production build',        icon: '▲', kbd: '⌘⇧D',onSelect: () => {} },
]

const TIMELINE_ITEMS = [
  { id:'1', title:'Foundation',   date:'Q1 2024', status:'done',    icon:'✓', description:'Design tokens, theming system, motion primitives, typed APIs.' },
  { id:'2', title:'Core Suite',   date:'Q2 2024', status:'done',    icon:'✓', description:'Buttons, inputs, cards, modals, dropdowns, and theme switcher.' },
  { id:'3', title:'Advanced',     date:'Q3 2024', status:'active',  icon:'●', description:'Command palette, drag board, virtualised data table, timeline.' },
  { id:'4', title:'Immersive',    date:'Q4 2024', status:'pending', icon:'○', description:'3D stage, WebGL shell, gesture panel, floating orbs.' },
]

const BOARD_SEED = [
  { id:'a', title:'Design token pipeline',  description:'Audit all colour stops', tag:'design',  lane:'Backlog' },
  { id:'b', title:'Motion curves QA',       description:'60fps across 7 systems', tag:'feature', lane:'In Progress' },
  { id:'c', title:'A11y compliance report', description:'WCAG 2.1 AA target',     tag:'urgent',  lane:'Done' },
  { id:'d', title:'CSS variable audit',     description:'Remove redundant vars',  tag:'bug',     lane:'Backlog' },
  { id:'e', title:'Dark mode tokens',       description:'Per-system dark values', tag:'feature', lane:'In Progress' },
]

const TABLE_COLS = [
  { key:'name',    title:'Component',  width:180 },
  { key:'system',  title:'System',     width:140 },
  { key:'status',  title:'Status',     width:110, render: (v) => (
    <span style={{ padding:'2px 9px', borderRadius:99, fontSize:11, fontWeight:700,
      background: v==='Live'?'#05966920':v==='Beta'?'#D9770620':'#64748B20',
      color:       v==='Live'?'#059669': v==='Beta'?'#D97706': '#64748B' }}>
      {v}
    </span>
  )},
  { key:'latency', title:'Latency' },
]
const TABLE_ROWS = Array.from({ length: 200 }, (_, i) => ({
  name:    ['HxButton','HxCard','HxInput','HxModal','HxDropdown','HxDataTable','HxTimeline','HxDragBoard','HxCommandPalette','HxDashboardGrid'][i%10],
  system:  ['luxury','minimal','brutalist','neofuturistic','enterprise','experimental','a11y'][i%7],
  status:  i%3===0?'Live':i%3===1?'Beta':'Draft',
  latency: `${12+(i%60)}ms`,
}))

const DROPDOWN_OPTS = [
  { label:'Glass Surfaces',      value:'glass',     icon:'◻' },
  { label:'Data Grid',           value:'grid',      icon:'⊞' },
  { label:'Immersive Stage',     value:'immersive', icon:'◈' },
  { label:'Accessible Kit',      value:'a11y',      icon:'♿' },
  { label:'Command Palette',     value:'cmd',       icon:'⌘' },
]

// ── Section wrapper ────────────────────────────────────────────────
function Section({ title, tag, children, system }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
        <span style={{ fontSize:8, fontWeight:900, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--hx-accent)', opacity:0.8 }}>{tag}</span>
        <div style={{ flex:1, height:1, background:'var(--hx-border)' }}/>
        <span style={{ fontSize:13, fontWeight:700, color:'var(--hx-text)', opacity:0.8 }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
export default function HxLibraryShowcase() {
  const [system, setSystem]           = useState('luxury')
  const [cmdOpen, setCmdOpen]         = useState(false)
  const [modalOpen, setModalOpen]     = useState(false)
  const [features, setFeatures]       = useState(['glass'])
  const [board, setBoard]             = useState(BOARD_SEED)
  const [inputVal, setInputVal]       = useState('')
  const [formError, setFormError]     = useState('')
  const routeKey = useMemo(() => `showcase-${system}`, [system])

  const validateAndSubmit = () => {
    if (!inputVal.trim()) { setFormError('This field is required'); return }
    setFormError(''); alert(`Submitted: ${inputVal}`)
  }

  return (
    <ThemeProvider>
      <HxFloatingOrbs count={3}/>

      <div className="docs-page" style={{ paddingBottom: 80 }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize:8, fontWeight:900, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:14 }}>
            HXRRRRRI-UI · Interactive Showcase
          </div>
          <h1 style={{ fontSize:'clamp(2.4rem,6vw,5rem)', fontWeight:900, lineHeight:0.92, letterSpacing:'-0.04em', color:'rgba(255,255,255,0.97)', margin:'0 0 18px' }}>
            7 Design Systems.<br/>
            <span style={{ color:'var(--hx-accent)' }}>One Library.</span>
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.50)', maxWidth:540, lineHeight:1.75, margin:'0 0 28px' }}>
            Switch between Luxury, Minimal, Brutalist, Neo-Futuristic, Enterprise, Experimental, and A11y — every component adapts its shape, shadow, and colour system instantly.
          </p>
          <HxThemeSwitcher value={system} onChange={setSystem}/>
        </div>

        <HxPageTransition routeKey={routeKey}>

          {/* ── Buttons ───────────────────────────────────────── */}
          <Section title="Buttons" tag="01 / Core" system={system}>
            <HxCard system={system} padding="lg">
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:14 }}>
                <HxButton system={system} variant="primary">Primary</HxButton>
                <HxButton system={system} variant="secondary">Secondary</HxButton>
                <HxButton system={system} variant="ghost">Ghost</HxButton>
                <HxButton system={system} variant="outline">Outline</HxButton>
                <HxButton system={system} variant="gradient">Gradient</HxButton>
                <HxButton system={system} variant="neon">Neon</HxButton>
                <HxButton system={system} variant="soft">Soft</HxButton>
                <HxButton system={system} variant="ai">AI</HxButton>
                <HxButton system={system} variant="danger">Danger</HxButton>
                <HxButton system={system} variant="success">Success</HxButton>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:14, alignItems:'center' }}>
                <HxButton system={system} variant="primary" size="xs">XSmall</HxButton>
                <HxButton system={system} variant="primary" size="sm">Small</HxButton>
                <HxButton system={system} variant="primary" size="md">Medium</HxButton>
                <HxButton system={system} variant="primary" size="lg">Large</HxButton>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, alignItems:'center' }}>
                <HxButton system={system} variant="primary" loading>Loading</HxButton>
                <HxButton system={system} variant="outline" disabled>Disabled</HxButton>
                <HxButton system={system} variant="primary" fullWidth onClick={() => setModalOpen(true)}>
                  Open Modal (Full Width)
                </HxButton>
              </div>
            </HxCard>
          </Section>

          {/* ── Cards ─────────────────────────────────────────── */}
          <Section title="Cards" tag="02 / Core" system={system}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
              <HxCard system={system} tilt accentBar padding="lg" hover>
                <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.20em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Tilt + Accent Bar</div>
                <h3 style={{ margin:'0 0 8px', fontSize:17, fontWeight:700, color:'var(--hx-text)' }}>Interactive Card</h3>
                <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.65 }}>Hover to see the 3D tilt effect and lift. Accent bar changes with system theme.</p>
              </HxCard>
              <HxCard system={system} padding="lg" hover>
                <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.20em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Hover Lift</div>
                <h3 style={{ margin:'0 0 8px', fontSize:17, fontWeight:700, color:'var(--hx-text)' }}>Standard Card</h3>
                <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.65 }}>Gentle lift on hover. System class controls radius, shadow, and backdrop filter.</p>
                <div style={{ display:'flex', gap:6, marginTop:14 }}>
                  <HxButton system={system} variant="primary" size="sm">Action</HxButton>
                  <HxButton system={system} variant="ghost" size="sm">Cancel</HxButton>
                </div>
              </HxCard>
              <HxCard system={system} padding="lg" tilt style={{ background:'linear-gradient(135deg,color-mix(in oklab, var(--hx-accent), transparent 80%),var(--hx-surface))' }}>
                <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.20em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Gradient Surface</div>
                <h3 style={{ margin:'0 0 8px', fontSize:17, fontWeight:700, color:'var(--hx-text)' }}>Tinted Card</h3>
                <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.65 }}>Custom background using color-mix with the accent token.</p>
              </HxCard>
            </div>
          </Section>

          {/* ── Forms ─────────────────────────────────────────── */}
          <Section title="Inputs & Forms" tag="03 / Core" system={system}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <HxCard system={system} padding="lg">
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <HxInput system={system} label="Project Name" placeholder="my-awesome-project" hint="Use lowercase letters and hyphens"/>
                  <HxInput system={system} label="API Endpoint" mode="ai" placeholder="https://api.example.com"/>
                  <HxInput system={system} label="OTP Code" mode="otp" placeholder="000000" maxLength={6}/>
                  <HxInput system={system} label="Validated Field" placeholder="Must not be empty"
                    value={inputVal} onChange={e => { setInputVal(e.target.value); setFormError('') }}
                    error={formError}/>
                  <HxDropdown system={system} label="Features" options={DROPDOWN_OPTS} value={features} onChange={setFeatures} multiple/>
                </div>
              </HxCard>
              <HxCard system={system} padding="lg">
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <HxTextarea system={system} label="Description" placeholder="Describe your component library…" rows={4}/>
                  <HxAccessibleField label="Secure URL" hint="Use HTTPS for all production endpoints" placeholder="https://"
                    style={{ width:'100%' }}/>
                  <HxAccessibleField label="Required Field" required error="This field cannot be empty" placeholder=""
                    style={{ width:'100%' }}/>
                  <HxButton system={system} variant="primary" fullWidth onClick={validateAndSubmit}>
                    Submit Form
                  </HxButton>
                </div>
              </HxCard>
            </div>
          </Section>

          {/* ── Dashboard ─────────────────────────────────────── */}
          <Section title="Dashboard Grid" tag="04 / Advanced" system={system}>
            <HxDashboardGrid system={system} columns={12} gap={12}>
              <HxDashboardTile system={system} colSpan={3} accent title="Active Users"  value="12,847" subtitle="vs last month" trend={{ value: 14.2, label: 'MoM' }}/>
              <HxDashboardTile system={system} colSpan={3} accent title="Revenue"       value="$84.2K" subtitle="this month"   trend={{ value: 8.1,  label: 'MoM' }}/>
              <HxDashboardTile system={system} colSpan={3} accent title="Deployments"   value="143"    subtitle="this week"    trend={{ value: -3.2, label: 'WoW' }}/>
              <HxDashboardTile system={system} colSpan={3} accent title="Error Rate"    value="0.08%"  subtitle="last 24h"     trend={{ value: -22.4,label: 'DoD' }}/>
              <HxDashboardTile system={system} colSpan={8} title="System Status">
                <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:8 }}>
                  {[['API Gateway','99.98%','Operational'],['Database Cluster','100%','Operational'],['CDN Edge','99.91%','Degraded']].map(([svc,uptime,st]) => (
                    <div key={svc} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--hx-border)' }}>
                      <span style={{ fontSize:13, fontWeight:500, color:'var(--hx-text)' }}>{svc}</span>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:12, color:'var(--hx-text-muted)' }}>{uptime}</span>
                        <span style={{ fontSize:11, fontWeight:700, padding:'2px 9px', borderRadius:99,
                          background:st==='Operational'?'#05966920':'#D9770620',
                          color:st==='Operational'?'#059669':'#D97706' }}>{st}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </HxDashboardTile>
              <HxDashboardTile system={system} colSpan={4} title="Quick Actions">
                <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:8 }}>
                  <HxButton system={system} variant="primary" size="sm" fullWidth onClick={() => setCmdOpen(true)}>⌘K Command Palette</HxButton>
                  <HxButton system={system} variant="outline" size="sm" fullWidth onClick={() => setModalOpen(true)}>Open Modal</HxButton>
                  <HxButton system={system} variant="soft"    size="sm" fullWidth>Export Report</HxButton>
                </div>
              </HxDashboardTile>
            </HxDashboardGrid>
          </Section>

          {/* ── Data Table ────────────────────────────────────── */}
          <Section title="Virtualised Data Table" tag="05 / Advanced" system={system}>
            <HxDataTable
              system={system} columns={TABLE_COLS} rows={TABLE_ROWS}
              viewportHeight={280} striped searchable
            />
          </Section>

          {/* ── Drag Board ────────────────────────────────────── */}
          <Section title="Kanban Drag Board" tag="06 / Advanced" system={system}>
            <HxDragBoard
              system={system}
              lanes={['Backlog', 'In Progress', 'Done']}
              items={board}
              onChange={setBoard}
            />
          </Section>

          {/* ── Timeline ──────────────────────────────────────── */}
          <Section title="Timeline" tag="07 / Advanced" system={system}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <HxCard system={system} padding="lg">
                <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:16 }}>Vertical</div>
                <HxTimeline system={system} items={TIMELINE_ITEMS}/>
              </HxCard>
              <HxCard system={system} padding="lg">
                <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:16 }}>Horizontal</div>
                <HxTimeline system={system} items={TIMELINE_ITEMS} orientation="horizontal"/>
              </HxCard>
            </div>
          </Section>

          {/* ── Gesture + Immersive ───────────────────────────── */}
          <Section title="Gesture & Immersive" tag="08 / Immersive" system={system}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <HxGesturePanel onDismiss={() => alert('Dismissed!')}>
                <HxCard system={system} padding="lg">
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Gesture Panel</div>
                  <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.6 }}>Drag this card horizontally to trigger the dismiss callback. Spring physics on release.</p>
                </HxCard>
              </HxGesturePanel>

              <HxPerspectiveStage>
                <HxCard system={system} padding="lg" tilt>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Perspective Stage</div>
                  <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.6 }}>Wrapped in a perspective container. Move your cursor over it for a depth effect.</p>
                </HxCard>
              </HxPerspectiveStage>

              <HxWebGLShell fallbackLabel="WebGL / Three.js Mount Point">
                <HxCard system={system} padding="lg" style={{ minHeight:120, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:10 }}>
                  <div style={{ fontSize:24 }}>◈</div>
                  <div style={{ fontSize:13, color:'var(--hx-text-muted)', textAlign:'center' }}>Mount a react-three-fiber<br/>scene inside this shell</div>
                </HxCard>
              </HxWebGLShell>

              <HxCard system={system} padding="lg" style={{ minHeight:120, display:'flex', flexDirection:'column', justifyContent:'center', gap:12 }}>
                <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:2 }}>Floating Orbs Config</div>
                <code style={{ fontSize:12, background:'color-mix(in oklab, var(--hx-border), transparent 40%)', padding:'8px 12px', borderRadius:8, color:'var(--hx-text)', lineHeight:1.6, display:'block' }}>
                  {'<HxFloatingOrbs count={3} blur={80} opacity={0.22}/>'}
                </code>
                <p style={{ margin:0, fontSize:12, color:'var(--hx-text-muted)', lineHeight:1.5 }}>Active orbs are visible in the page background. Colours follow theme accent vars.</p>
              </HxCard>
            </div>
          </Section>

          {/* ── Parallax ──────────────────────────────────────── */}
          <Section title="Scroll Parallax" tag="09 / Motion" system={system}>
            <HxParallax speed={30}>
              <HxCard system={system} accentBar padding="lg" style={{ textAlign:'center' }}>
                <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:12 }}>HxParallax · speed=30</div>
                <p style={{ margin:0, fontSize:14, color:'var(--hx-text-muted)', lineHeight:1.7 }}>This card scrolls at a different rate than the page. Wrap any content in HxParallax to create depth layers.</p>
              </HxCard>
            </HxParallax>
          </Section>

        </HxPageTransition>
      </div>

      {/* ── Command Palette ─────────────────────────────────── */}
      <HxCommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        items={CMD_ITEMS}
        system={system}
      />

      {/* ── Modal ───────────────────────────────────────────── */}
      <HxModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="HXRRRRRI-UI Modal"
        description="This modal adapts to the currently selected design system. Try switching systems and reopening."
        system={system}
        footer={
          <>
            <HxButton system={system} variant="ghost" onClick={() => setModalOpen(false)}>Cancel</HxButton>
            <HxButton system={system} variant="primary" onClick={() => setModalOpen(false)}>Confirm</HxButton>
          </>
        }
      >
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <p style={{ margin:0, fontSize:14, color:'var(--hx-text-muted)', lineHeight:1.7 }}>
            Active system: <strong style={{ color:'var(--hx-accent)' }}>{system}</strong>. The modal header, body, footer, and close button all respect the theme tokens defined in the ThemeProvider.
          </p>
          <HxInput system={system} label="Quick Input" placeholder="Test an input inside a modal…"/>
        </div>
      </HxModal>
    </ThemeProvider>
  )
}
