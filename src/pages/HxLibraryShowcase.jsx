import { useMemo, useState } from 'react'
import {
  ThemeProvider, HxThemeSwitcher,
  // Core
  HxButton, HxInput, HxTextarea, HxCard, HxModal, HxDropdown,
  // Advanced
  HxCommandPalette, HxDragBoard, HxDataTable, HxTimeline, HxDashboardGrid, HxDashboardTile,
  // Motion
  HxParallax, HxGesturePanel, HxPageTransition,
  // Immersive
  HxFloatingOrbs, HxPerspectiveStage, HxWebGLShell,
  // A11y
  HxAccessibleField,
  // Feedback
  HxAlert, HxToaster, toast, HxProgress, HxCircularProgress, HxSkeleton, HxSpinner, HxBadge,
  // Navigation
  HxTabs, HxBreadcrumb, HxPagination, HxStepper, HxNavMenu, HxSidebar,
  // Layout
  HxStack, HxGrid, HxGridItem, HxDivider, HxContainer, HxSimpleGrid, HxCenter, HxWrap, HxBox,
  // Form
  HxCheckbox, HxRadioGroup, HxSwitch, HxSlider, HxRating, HxFileUpload, HxNumberInput, HxColorPicker, HxPinInput,
  // Display
  HxTooltip, HxPopover, HxAccordion, HxTag, HxTagGroup, HxAvatarGroup, HxStat, HxCode, HxKbd, HxTable, HxChip,
  // Overlay
  HxDrawer, HxContextMenu, HxAlertDialog, HxSheet,
} from '../hxrrrrri-ui'

// ── Demo data ─────────────────────────────────────────────────────
const CMD_ITEMS = [
  { id:'1', title:'Create Project',      subtitle:'Scaffold a full app',        icon:'✦', kbd:'⌘N', onSelect:()=>toast.success('Creating project…') },
  { id:'2', title:'Deploy to Vercel',    subtitle:'Push production build',      icon:'▲', kbd:'⌘D', onSelect:()=>toast.info('Deploying…') },
  { id:'3', title:'Open Docs',           subtitle:'Component API reference',    icon:'◻', kbd:'⌘K', onSelect:()=>toast.info('Opening docs…') },
  { id:'4', title:'Run Theme Audit',     subtitle:'Validate all token maps',    icon:'◈', kbd:'⌘T', onSelect:()=>toast.warning('Auditing themes…') },
  { id:'5', title:'Delete Workspace',    subtitle:'Permanently remove data',    icon:'⚠', kbd:'⌘⌫', onSelect:()=>toast.error('Workspace deleted') },
]
const TIMELINE_ITEMS = [
  { id:'1', title:'Foundation',  date:'Q1',  status:'done',    icon:'✓', description:'Design tokens, theming, motion primitives.' },
  { id:'2', title:'Core Suite',  date:'Q2',  status:'done',    icon:'✓', description:'Buttons, inputs, cards, modals, dropdowns.' },
  { id:'3', title:'Advanced',    date:'Q3',  status:'active',  icon:'●', description:'Command palette, drag board, data table.' },
  { id:'4', title:'Immersive',   date:'Q4',  status:'pending', icon:'○', description:'3D stage, WebGL, gesture panel, orbs.' },
]
const BOARD_SEED = [
  { id:'a', title:'Token pipeline',    description:'Audit all colour stops',  tag:'design',  lane:'Backlog' },
  { id:'b', title:'Motion curves QA',  description:'60fps across 7 systems', tag:'feature', lane:'In Progress' },
  { id:'c', title:'A11y report',       description:'WCAG 2.1 AA target',     tag:'urgent',  lane:'Done' },
  { id:'d', title:'Dark mode tokens',  description:'Per-system dark values',  tag:'feature', lane:'Backlog' },
  { id:'e', title:'CSS variable audit',description:'Remove redundant vars',   tag:'bug',     lane:'In Progress' },
]
const TABLE_COLS = [
  { key:'name',   title:'Component', width:180 },
  { key:'system', title:'System',    width:140 },
  { key:'status', title:'Status',    width:110, render:(v)=><span style={{ padding:'2px 9px', borderRadius:99, fontSize:11, fontWeight:700, background:v==='Live'?'#05966920':v==='Beta'?'#D9770620':'#64748B20', color:v==='Live'?'#059669':v==='Beta'?'#D97706':'#64748B' }}>{v}</span> },
  { key:'latency',title:'Latency' },
]
const TABLE_ROWS = Array.from({length:200},(_,i)=>({ name:['HxButton','HxCard','HxInput','HxModal','HxDropdown','HxDataTable','HxTimeline','HxDragBoard','HxCommandPalette','HxDashboardGrid'][i%10], system:['luxury','minimal','brutalist','neofuturistic','enterprise','experimental','a11y'][i%7], status:i%3===0?'Live':i%3===1?'Beta':'Draft', latency:`${12+(i%60)}ms` }))
const DROPDOWN_OPTS = [
  {label:'Glass Surfaces',value:'glass',icon:'◻'},{label:'Data Grid',value:'grid',icon:'⊞'},
  {label:'Immersive Stage',value:'immersive',icon:'◈'},{label:'Accessible Kit',value:'a11y',icon:'♿'},
]
const MENU_GROUPS = [
  { label:'Actions', items:[{ label:'Edit', icon:'✏', shortcut:'⌘E', onClick:()=>toast.info('Edit') },{ label:'Duplicate', icon:'⊕', shortcut:'⌘D', onClick:()=>toast.info('Duplicate') }] },
  { items:[{ label:'Delete', icon:'🗑', danger:true, onClick:()=>toast.error('Deleted!') }] },
]
const SIDEBAR_ITEMS = [
  { id:'dash',      label:'Dashboard',   icon:'⊞', badge:3 },
  { id:'projects',  label:'Projects',    icon:'◻', children:[
    { id:'proj-active', label:'Active',    icon:'●' },
    { id:'proj-done',   label:'Completed', icon:'✓' },
  ]},
  { id:'analytics', label:'Analytics',   icon:'◈' },
  { id:'settings',  label:'Settings',    icon:'⚙' },
]
const TABS_ITEMS = [
  { id:'overview', label:'Overview', badge:3 },
  { id:'code',     label:'Code' },
  { id:'preview',  label:'Preview' },
  { id:'docs',     label:'Docs' },
]
const ACCORDION_ITEMS = [
  { id:'1', title:'What is HXRRRRRI-UI?', content:'A production-grade React component library with 7 design systems — Luxury, Minimal, Brutalist, Neo-Futuristic, Enterprise, Experimental, and A11y.', icon:'◈' },
  { id:'2', title:'How do I switch design systems?', content:'Every component accepts a system prop. Pass "luxury", "minimal", "brutalist", "neofuturistic", "enterprise", "experimental", or "a11y" to any component.', icon:'◻' },
  { id:'3', title:'Is it accessible?', content:'The a11y system meets WCAG 2.1 AA standards. All interactive components include proper ARIA attributes, keyboard navigation, and focus management.', icon:'♿' },
]
const AVATARS = [
  { name:'Harisankar S', color:'#FF4D2D' },{ name:'Arjun M', color:'#5555D8' },{ name:'Priya K', color:'#00D18C' },
  { name:'Rohan V', color:'#E8B84B' },{ name:'Anjali T', color:'#FF6B9D' },{ name:'Dev P', color:'#A78BFA' },
]
const CONTEXT_ITEMS = [
  { label:'Open',      icon:'↗', onClick:()=>toast.info('Opening…') },
  { label:'Edit',      icon:'✏', onClick:()=>toast.info('Editing…') },
  { label:'Copy Link', icon:'⊕', shortcut:'⌘C', onClick:()=>toast.success('Copied!') },
  { divider:true },
  { label:'Delete',    icon:'🗑', danger:true, onClick:()=>toast.error('Deleted!') },
]

// ── Section header ────────────────────────────────────────────────
function Section({ tag, title, children }) {
  return (
    <div style={{ marginBottom:40 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
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
  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [sheetOpen, setSheetOpen]     = useState(false)
  const [alertOpen, setAlertOpen]     = useState(false)
  const [features, setFeatures]       = useState(['glass'])
  const [board, setBoard]             = useState(BOARD_SEED)
  const [page, setPage]               = useState(1)
  const [step, setStep]               = useState(1)
  const [rating, setRating]           = useState(3)
  const [sliderVal, setSliderVal]     = useState(65)
  const [numVal, setNumVal]           = useState(12)
  const [pinVal, setPinVal]           = useState('')
  const [checked1, setChecked1]       = useState(true)
  const [checked2, setChecked2]       = useState(false)
  const [switched, setSwitched]       = useState(true)
  const [radioVal, setRadioVal]       = useState('card')
  const [color, setColor]             = useState('#FF4D2D')
  const [sidebarActive, setSidebarActive] = useState('dash')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab]     = useState('overview')
  const [tags, setTags]               = useState([{id:'react',label:'React',color:'#0284C7'},{id:'ts',label:'TypeScript',color:'#7C3AED'},{id:'vite',label:'Vite',color:'#F59E0B'},{id:'framer',label:'Framer Motion',color:'#FF4D2D'}])

  const routeKey = useMemo(() => `showcase-${system}`, [system])

  const STEPPER_STEPS = [
    { label:'Install',   description:'npm install hxrrrrri-ui' },
    { label:'Import',    description:'import styles and ThemeProvider' },
    { label:'Use',       description:'Drop any component anywhere' },
    { label:'Customise', description:'Set system prop or CSS vars' },
  ]

  return (
    <ThemeProvider>
      <HxToaster position="top-right" system={system}/>
      <HxFloatingOrbs count={3}/>

      <div className="docs-page" style={{ paddingBottom:80 }}>

        {/* ── HERO ── */}
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:8, fontWeight:900, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:14 }}>HXRRRRRI-UI · Interactive Showcase</div>
          <h1 style={{ fontSize:'clamp(2.4rem,6vw,5rem)', fontWeight:900, lineHeight:0.92, letterSpacing:'-0.04em', color:'rgba(255,255,255,0.97)', margin:'0 0 18px' }}>
            7 Systems.<br/><span style={{ color:'var(--hx-accent)' }}>100+ Components.</span>
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.48)', maxWidth:560, lineHeight:1.75, margin:'0 0 28px' }}>
            Every component adapts shape, shadow, colour, and radius when you switch systems. Framer Motion throughout. Full TypeScript. Zero config.
          </p>
          <HxThemeSwitcher value={system} onChange={setSystem}/>
        </div>

        <HxPageTransition routeKey={routeKey}>

        {/* ══ 01  BUTTONS ════════════════════════════════════════ */}
        <Section tag="01 / Core" title="Buttons — 18 variants × 4 sizes">
          <HxCard system={system} padding="lg">
            <HxStack gap={10}>
              <HxWrap gap={8}>
                {['primary','secondary','ghost','outline','glass','neon','soft','elevated','ai','gradient','danger','success','warning','info','link','chip','pill'].map(v=>(
                  <HxButton key={v} system={system} variant={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</HxButton>
                ))}
              </HxWrap>
              <HxDivider system={system}/>
              <HxWrap gap={8} align="center">
                {['xs','sm','md','lg'].map(sz=><HxButton key={sz} system={system} variant="primary" size={sz}>{sz.toUpperCase()}</HxButton>)}
                <HxButton system={system} variant="primary" loading>Loading</HxButton>
                <HxButton system={system} variant="outline" disabled>Disabled</HxButton>
              </HxWrap>
              <HxButton system={system} variant="primary" fullWidth onClick={()=>setModalOpen(true)}>
                Full Width → Opens Modal
              </HxButton>
            </HxStack>
          </HxCard>
        </Section>

        {/* ══ 02  CARDS ══════════════════════════════════════════ */}
        <Section tag="02 / Core" title="Cards — tilt, accent bar, hover lift">
          <HxSimpleGrid minChildWidth={240} gap={14}>
            <HxCard system={system} tilt accentBar padding="lg" hover>
              <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>3D Tilt + Accent Bar</div>
              <h3 style={{ margin:'0 0 8px', fontSize:16, fontWeight:700, color:'var(--hx-text)' }}>Interactive Card</h3>
              <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.65 }}>Hover over me — 3D tilt physics, shine sweep, and lift all respond to cursor position.</p>
            </HxCard>
            <HxCard system={system} padding="lg" hover>
              <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Hover Lift</div>
              <h3 style={{ margin:'0 0 8px', fontSize:16, fontWeight:700, color:'var(--hx-text)' }}>Standard Card</h3>
              <p style={{ margin:'0 0 14px', fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.65 }}>System class drives radius, shadow, and backdrop filter automatically.</p>
              <HxStack direction="row" gap={8}>
                <HxButton system={system} variant="primary" size="sm">Action</HxButton>
                <HxButton system={system} variant="ghost" size="sm">Cancel</HxButton>
              </HxStack>
            </HxCard>
            <HxCard system={system} padding="lg" tilt style={{ background:'linear-gradient(135deg,color-mix(in oklab,var(--hx-accent),transparent 80%),var(--hx-surface))' }}>
              <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Gradient Tint</div>
              <h3 style={{ margin:'0 0 8px', fontSize:16, fontWeight:700, color:'var(--hx-text)' }}>Tinted Card</h3>
              <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.65 }}>Custom background with color-mix using the live accent token.</p>
            </HxCard>
          </HxSimpleGrid>
        </Section>

        {/* ══ 03  FORMS ══════════════════════════════════════════ */}
        <Section tag="03 / Core + Form" title="Inputs, Dropdowns, Form Controls">
          <HxGrid columns={2} gap={16}>
            <HxCard system={system} padding="lg">
              <HxStack gap={14}>
                <HxInput system={system} label="Project Name" placeholder="my-awesome-project" hint="Lowercase letters and hyphens only"/>
                <HxInput system={system} label="AI Query" mode="ai" placeholder="Describe your intent…"/>
                <HxInput system={system} label="Search" mode="search" placeholder="Type to search…"/>
                <HxDropdown system={system} label="Features" options={DROPDOWN_OPTS} value={features} onChange={setFeatures} multiple/>
                <HxTextarea system={system} label="Description" placeholder="What are you building?" rows={3}/>
              </HxStack>
            </HxCard>
            <HxCard system={system} padding="lg">
              <HxStack gap={14}>
                <HxPinInput length={4} system={system} value={pinVal} onChange={setPinVal} onComplete={v=>toast.success(`PIN complete: ${v}`)}/>
                <HxNumberInput system={system} label="Quantity" value={numVal} onChange={setNumVal} min={1} max={100} suffix="items"/>
                <HxColorPicker system={system} label="Brand Color" value={color} onChange={setColor}/>
                <HxCheckbox system={system} label="Enable notifications" checked={checked1} onChange={setChecked1}/>
                <HxCheckbox system={system} label="Subscribe to updates" checked={checked2} onChange={setChecked2}/>
                <HxSwitch system={system} label="Auto-deploy" description="Push to Vercel on every commit" checked={switched} onChange={setSwitched}/>
                <HxButton system={system} variant="primary" fullWidth onClick={()=>toast.success('Form submitted!')}>Submit</HxButton>
              </HxStack>
            </HxCard>
          </HxGrid>
        </Section>

        {/* ══ 04  RADIO + SLIDER + RATING ════════════════════════ */}
        <Section tag="04 / Form" title="Radio Groups, Sliders, Rating, File Upload">
          <HxGrid columns={2} gap={16}>
            <HxCard system={system} padding="lg">
              <HxStack gap={20}>
                <HxRadioGroup system={system} options={[{value:'card',label:'Card variant',description:'Best for feature selections'},{value:'list',label:'List variant',description:'Best for long option sets'},{value:'inline',label:'Inline variant',description:'Best for compact layouts'}]} value={radioVal} onChange={setRadioVal} variant="card"/>
              </HxStack>
            </HxCard>
            <HxCard system={system} padding="lg">
              <HxStack gap={20}>
                <HxSlider system={system} label="Volume" value={sliderVal} onChange={setSliderVal} showValue marks={[{value:0,label:'0'},{value:50,label:'50'},{value:100,label:'100'}]}/>
                <HxSlider system={system} label="Balance" defaultValue={50} color="#A78BFA" showValue/>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:12, color:'var(--hx-text-muted)', fontWeight:600 }}>Rating</span>
                  <HxRating system={system} value={rating} onChange={setRating} max={5}/>
                  <HxRating system={system} value={4} max={5} icon="heart" readOnly size="sm"/>
                </div>
                <HxFileUpload system={system} label="Upload Assets" hint="PNG, JPG, SVG — max 5MB" accept="image/*" maxSize={5*1024*1024}/>
              </HxStack>
            </HxCard>
          </HxGrid>
        </Section>

        {/* ══ 05  FEEDBACK ═══════════════════════════════════════ */}
        <Section tag="05 / Feedback" title="Alerts, Progress, Skeleton, Spinner, Badge">
          <HxGrid columns={2} gap={16}>
            <HxCard system={system} padding="lg">
              <HxStack gap={10}>
                <HxAlert system={system} variant="success" title="Deployment successful" description="ECO-3D is live at eco-3-d.vercel.app" dismissible/>
                <HxAlert system={system} variant="info" title="New message" description="Insight Enterprises reached out about your application"/>
                <HxAlert system={system} variant="warning" title="Rate limit" description="80% of your monthly API quota consumed" dismissible/>
                <HxAlert system={system} variant="error" title="Build failed" description="TypeError: Cannot read properties of undefined"/>
              </HxStack>
            </HxCard>
            <HxCard system={system} padding="lg">
              <HxStack gap={16}>
                <HxProgress system={system} value={sliderVal} label="Upload Progress" showValue/>
                <HxProgress system={system} value={42} color="#A78BFA" label="Memory" showValue size="lg"/>
                <HxProgress system={system} value={78} color="#059669" striped animated size="sm"/>
                <div style={{ display:'flex', gap:24, alignItems:'center', flexWrap:'wrap' }}>
                  <HxCircularProgress system={system} value={sliderVal} size={64}/>
                  <HxCircularProgress system={system} value={42} size={64} color="#A78BFA"/>
                  <HxSpinner system={system} size={32}/>
                  <HxSpinner system={system} size={24} color="#A78BFA"/>
                </div>
                <HxSkeleton system={system} variant="card"/>
                <div style={{ display:'flex', gap:12 }}>
                  <HxBadge system={system} count={12}><HxButton system={system} variant="outline" size="sm">Inbox</HxButton></HxBadge>
                  <HxBadge system={system} dot><HxButton system={system} variant="ghost" size="sm">Notifications</HxButton></HxBadge>
                </div>
                <HxStack direction="row" gap={8}>
                  {['success','info','warning','error'].map(v=>(
                    <HxButton key={v} system={system} variant="ghost" size="sm" onClick={()=>toast[v](`${v.charAt(0).toUpperCase()+v.slice(1)} toast!`,`This is a ${v} notification`)}>Toast {v}</HxButton>
                  ))}
                </HxStack>
              </HxStack>
            </HxCard>
          </HxGrid>
        </Section>

        {/* ══ 06  NAVIGATION ═════════════════════════════════════ */}
        <Section tag="06 / Navigation" title="Tabs, Breadcrumb, Pagination, Stepper, Menu, Sidebar">
          <HxStack gap={16}>
            {/* Tabs */}
            <HxCard system={system} padding="lg">
              <HxStack gap={16}>
                <HxTabs system={system} items={TABS_ITEMS} value={activeTab} onChange={setActiveTab} variant="line">
                  {id => <div style={{ fontSize:13, color:'var(--hx-text-muted)', padding:'4px 0' }}>Content for <strong style={{ color:'var(--hx-accent)' }}>{id}</strong> tab</div>}
                </HxTabs>
                <HxTabs system={system} items={TABS_ITEMS} variant="pill"/>
                <HxTabs system={system} items={TABS_ITEMS} variant="soft"/>
              </HxStack>
            </HxCard>

            {/* Breadcrumb + Menu */}
            <HxGrid columns={2} gap={14}>
              <HxCard system={system} padding="lg">
                <HxStack gap={14}>
                  <HxBreadcrumb system={system} items={[{label:'Home',href:'#'},{label:'Projects',href:'#'},{label:'ECO-3D Studio'}]}/>
                  <HxPagination total={200} page={page} pageSize={10} onChange={setPage} system={system}/>
                  <div style={{ display:'flex', gap:10 }}>
                    <HxNavMenu system={system} trigger={<HxButton system={system} variant="outline" size="sm">Menu ▾</HxButton>} groups={MENU_GROUPS}/>
                    <HxButton system={system} variant="ghost" size="sm" onClick={()=>setDrawerOpen(true)}>Open Drawer →</HxButton>
                    <HxButton system={system} variant="ghost" size="sm" onClick={()=>setSheetOpen(true)}>Open Sheet ↑</HxButton>
                  </div>
                </HxStack>
              </HxCard>
              <HxCard system={system} padding="lg">
                <HxStepper system={system} steps={STEPPER_STEPS} activeStep={step} orientation="vertical"/>
                <div style={{ display:'flex', gap:8, marginTop:16 }}>
                  <HxButton system={system} variant="ghost" size="sm" onClick={()=>setStep(s=>Math.max(0,s-1))}>← Back</HxButton>
                  <HxButton system={system} variant="primary" size="sm" onClick={()=>setStep(s=>Math.min(3,s+1))}>Next →</HxButton>
                </div>
              </HxCard>
            </HxGrid>

            {/* Sidebar demo */}
            <HxCard system={system} padding="none" style={{ overflow:'hidden', height:320, display:'flex' }}>
              <HxSidebar system={system} items={SIDEBAR_ITEMS} activeId={sidebarActive} onNavigate={setSidebarActive} collapsed={sidebarCollapsed} header={!sidebarCollapsed && <div style={{ fontWeight:700, fontSize:14, color:'var(--hx-text)' }}>HXRRRRRI-UI</div>} footer={<HxButton system={system} variant="ghost" size="sm" fullWidth onClick={()=>setSidebarCollapsed(c=>!c)}>{sidebarCollapsed?'→':'←'}</HxButton>}/>
              <div style={{ flex:1, padding:24, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}>
                <div style={{ fontSize:28 }}>⊞</div>
                <div style={{ fontSize:14, fontWeight:700, color:'var(--hx-text)' }}>{sidebarActive.charAt(0).toUpperCase()+sidebarActive.slice(1)}</div>
                <div style={{ fontSize:12, color:'var(--hx-text-muted)' }}>Click sidebar items to navigate</div>
              </div>
            </HxCard>
          </HxStack>
        </Section>

        {/* ══ 07  DISPLAY ════════════════════════════════════════ */}
        <Section tag="07 / Display" title="Tooltip, Popover, Accordion, Tags, Avatar, Stat, Code">
          <HxGrid columns={2} gap={16}>
            <HxCard system={system} padding="lg">
              <HxStack gap={16}>
                {/* Tooltip */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Tooltip</div>
                  <HxWrap gap={8}>
                    {['top','bottom','left','right'].map(p=>(
                      <HxTooltip key={p} label={`${p} tooltip`} placement={p} system={system}>
                        <HxButton system={system} variant="outline" size="sm">{p}</HxButton>
                      </HxTooltip>
                    ))}
                  </HxWrap>
                </div>
                {/* Popover */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Popover</div>
                  <HxPopover system={system} title="Release Notes" trigger={<HxButton system={system} variant="outline" size="sm">Click me</HxButton>} content={<div style={{ fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.6 }}>v1.0 — 100+ components, 7 systems, Framer Motion throughout, full TypeScript types.</div>}/>
                </div>
                {/* Avatar group */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Avatar Group</div>
                  <HxStack direction="row" gap={16} align="center">
                    <HxAvatarGroup avatars={AVATARS} max={4} size="md"/>
                    <HxAvatarGroup avatars={AVATARS} max={3} size="sm"/>
                  </HxStack>
                </div>
                {/* Tags */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Tags</div>
                  <HxTagGroup system={system} tags={tags} onRemove={id=>setTags(t=>t.filter(x=>x.id!==id))}/>
                  <div style={{ marginTop:8, display:'flex', gap:6, flexWrap:'wrap' }}>
                    <HxTag system={system} variant="solid" color="#0284C7">Solid</HxTag>
                    <HxTag system={system} variant="outline" color="#D97706">Outline</HxTag>
                    <HxChip system={system} selected>Selected Chip</HxChip>
                    <HxChip system={system}>Normal Chip</HxChip>
                  </div>
                </div>
              </HxStack>
            </HxCard>
            <HxCard system={system} padding="lg">
              <HxStack gap={16}>
                {/* Stats */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Stats</div>
                  <HxGrid columns={2} gap={12}>
                    <HxBox system={system} rounded border="1px solid var(--hx-border)" p="16px">
                      <HxStat system={system} label="Active Users" value="12,847" indicator={{ value:14.2, label:'MoM' }} helpText="vs last month"/>
                    </HxBox>
                    <HxBox system={system} rounded border="1px solid var(--hx-border)" p="16px">
                      <HxStat system={system} label="Revenue" value="$84.2K" indicator={{ value:8.1, label:'MoM' }} helpText="this month"/>
                    </HxBox>
                  </HxGrid>
                </div>
                {/* Code */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Code + Kbd</div>
                  <HxCode system={system} language="TSX">{`<HxButton system="luxury" variant="gradient">\n  Launch Project\n</HxButton>`}</HxCode>
                  <div style={{ marginTop:10, display:'flex', gap:8, alignItems:'center' }}>
                    <span style={{ fontSize:13, color:'var(--hx-text-muted)' }}>Press</span>
                    <HxKbd>⌘</HxKbd><HxKbd>K</HxKbd>
                    <span style={{ fontSize:13, color:'var(--hx-text-muted)' }}>to open command palette.</span>
                  </div>
                </div>
                {/* Context Menu */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Context Menu</div>
                  <HxContextMenu items={CONTEXT_ITEMS} system={system}>
                    <div style={{ padding:'24px', borderRadius:10, border:'2px dashed var(--hx-border)', textAlign:'center', fontSize:13, color:'var(--hx-text-muted)', cursor:'context-menu' }}>Right-click inside this area</div>
                  </HxContextMenu>
                </div>
              </HxStack>
            </HxCard>
          </HxGrid>
        </Section>

        {/* ══ 08  ACCORDION ══════════════════════════════════════ */}
        <Section tag="08 / Display" title="Accordion — default, separated, flush">
          <HxGrid columns={3} gap={14}>
            <HxAccordion system={system} items={ACCORDION_ITEMS} defaultOpen={['1']} variant="default"/>
            <HxAccordion system={system} items={ACCORDION_ITEMS} variant="separated" multiple/>
            <HxAccordion system={system} items={ACCORDION_ITEMS} variant="flush"/>
          </HxGrid>
        </Section>

        {/* ══ 09  ADVANCED ═══════════════════════════════════════ */}
        <Section tag="09 / Advanced" title="Dashboard Grid, Data Table, Kanban, Timeline">
          <HxStack gap={16}>
            <HxDashboardGrid system={system} columns={12} gap={12}>
              <HxDashboardTile system={system} colSpan={3} accent title="Users"       value="12,847" trend={{ value:14.2 }}/>
              <HxDashboardTile system={system} colSpan={3} accent title="Revenue"     value="$84.2K" trend={{ value:8.1  }}/>
              <HxDashboardTile system={system} colSpan={3} accent title="Deploys"     value="143"    trend={{ value:-3.2 }}/>
              <HxDashboardTile system={system} colSpan={3} accent title="Error Rate"  value="0.08%"  trend={{ value:-22  }}/>
              <HxDashboardTile system={system} colSpan={8} title="Quick Actions">
                <HxWrap gap={8} style={{ marginTop:12 }}>
                  <HxButton system={system} variant="primary" size="sm" onClick={()=>setCmdOpen(true)}>⌘K Command</HxButton>
                  <HxButton system={system} variant="outline" size="sm" onClick={()=>setModalOpen(true)}>Modal</HxButton>
                  <HxButton system={system} variant="ghost" size="sm" onClick={()=>setAlertOpen(true)}>Alert Dialog</HxButton>
                </HxWrap>
              </HxDashboardTile>
              <HxDashboardTile system={system} colSpan={4} title="Progress">
                <HxStack gap={10} style={{ marginTop:12 }}>
                  <HxProgress system={system} value={sliderVal} showValue size="sm"/>
                  <HxProgress system={system} value={78} color="#059669" size="sm" showValue/>
                </HxStack>
              </HxDashboardTile>
            </HxDashboardGrid>
            <HxDataTable system={system} columns={TABLE_COLS} rows={TABLE_ROWS} viewportHeight={260} striped searchable/>
            <HxDragBoard system={system} lanes={['Backlog','In Progress','Done']} items={board} onChange={setBoard}/>
            <HxGrid columns={2} gap={14}>
              <HxCard system={system} padding="lg"><div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:16 }}>Vertical</div><HxTimeline system={system} items={TIMELINE_ITEMS}/></HxCard>
              <HxCard system={system} padding="lg"><div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:16 }}>Horizontal</div><HxTimeline system={system} items={TIMELINE_ITEMS} orientation="horizontal"/></HxCard>
            </HxGrid>
          </HxStack>
        </Section>

        {/* ══ 10  MOTION + IMMERSIVE ══════════════════════════════ */}
        <Section tag="10 / Motion + Immersive" title="Gesture, Parallax, Perspective, WebGL, Orbs">
          <HxGrid columns={2} gap={14}>
            <HxGesturePanel onDismiss={()=>toast.info('Dismissed!')}>
              <HxCard system={system} padding="lg"><div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Gesture Panel</div><p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.6 }}>Drag horizontally to trigger dismiss callback. Spring physics on release.</p></HxCard>
            </HxGesturePanel>
            <HxPerspectiveStage>
              <HxCard system={system} padding="lg" tilt><div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:10 }}>Perspective Stage</div><p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.6 }}>Wrapped in a depth container. Move your cursor for a layered parallax effect.</p></HxCard>
            </HxPerspectiveStage>
            <HxParallax speed={25}>
              <HxCard system={system} accentBar padding="lg" style={{ textAlign:'center' }}>
                <div style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--hx-accent)', marginBottom:12 }}>HxParallax · speed=25</div>
                <p style={{ margin:0, fontSize:13, color:'var(--hx-text-muted)', lineHeight:1.7 }}>Scrolls at a different rate than the page. Create depth layers effortlessly.</p>
              </HxCard>
            </HxParallax>
            <HxWebGLShell fallbackLabel="WebGL / Three.js Mount">
              <HxCenter minH={140} style={{ background:'color-mix(in oklab,var(--hx-accent),var(--hx-surface) 88%)', borderRadius:12 }}>
                <HxStack align="center" gap={8}>
                  <div style={{ fontSize:32 }}>◈</div>
                  <div style={{ fontSize:13, color:'var(--hx-text-muted)', textAlign:'center' }}>Mount react-three-fiber<br/>inside this shell</div>
                </HxStack>
              </HxCenter>
            </HxWebGLShell>
          </HxGrid>
        </Section>

        {/* ══ 11  A11Y ═══════════════════════════════════════════ */}
        <Section tag="11 / Accessibility" title="WCAG 2.1 AA — Accessible Fields, A11y System">
          <HxCard system="a11y" padding="lg">
            <HxGrid columns={2} gap={16}>
              <HxStack gap={14}>
                <HxAccessibleField label="Full Name" required placeholder="John Doe"/>
                <HxAccessibleField label="Email Address" required hint="We'll never share your email." placeholder="john@example.com" type="email"/>
                <HxAccessibleField label="Invalid Field" error="This field is required" placeholder=""/>
              </HxStack>
              <HxStack gap={14}>
                <HxCheckbox system="a11y" label="I agree to the terms of service" size="lg"/>
                <HxSwitch system="a11y" label="Enable 2FA" description="Adds an extra layer of security to your account" defaultChecked/>
                <HxRadioGroup system="a11y" options={[{value:'email',label:'Email notifications'},{value:'sms',label:'SMS notifications'},{value:'push',label:'Push notifications'}]} defaultValue="email"/>
              </HxStack>
            </HxGrid>
          </HxCard>
        </Section>

        {/* ══ 12  ALL 7 SYSTEMS SIDE BY SIDE ════════════════════ */}
        <Section tag="12 / Systems" title="All 7 Design Systems — same component, 7 personalities">
          <HxSimpleGrid minChildWidth={200} gap={12}>
            {['luxury','minimal','brutalist','neofuturistic','enterprise','experimental','a11y'].map(sys=>(
              <div key={sys}>
                <div style={{ fontSize:8, fontWeight:900, letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:8, opacity:0.5 }}>{sys}</div>
                <HxCard system={sys} padding="md" accentBar>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--hx-accent)', marginBottom:8 }}>HxCard</div>
                  <p style={{ fontSize:11, color:'var(--hx-text-muted)', margin:'0 0 12px', lineHeight:1.5 }}>Every component responds to the system prop.</p>
                  <HxButton system={sys} variant="primary" size="sm" fullWidth>Button</HxButton>
                </HxCard>
              </div>
            ))}
          </HxSimpleGrid>
        </Section>

        </HxPageTransition>
      </div>

      {/* ── Overlays ────────────────────────────────────────── */}
      <HxCommandPalette open={cmdOpen} onOpenChange={setCmdOpen} items={CMD_ITEMS} system={system}/>

      <HxModal open={modalOpen} onClose={()=>setModalOpen(false)} title="HXRRRRRI-UI Modal" description={`Active system: ${system} — all tokens update instantly when you switch.`} system={system}
        footer={<><HxButton system={system} variant="ghost" onClick={()=>setModalOpen(false)}>Cancel</HxButton><HxButton system={system} variant="primary" onClick={()=>setModalOpen(false)}>Confirm</HxButton></>}>
        <HxStack gap={14}>
          <HxAlert system={system} variant="info" title="Context-aware" description="The modal header, X button, and focus ring all respect your current system tokens."/>
          <HxInput system={system} label="Quick Input" placeholder="Test an input inside a modal…"/>
        </HxStack>
      </HxModal>

      <HxDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} title="Side Drawer" description="A slide-in side panel component" system={system}
        footer={<><HxButton system={system} variant="ghost" onClick={()=>setDrawerOpen(false)}>Close</HxButton><HxButton system={system} variant="primary" onClick={()=>{toast.success('Saved!');setDrawerOpen(false)}}>Save</HxButton></>}>
        <HxStack gap={14}>
          <HxInput system={system} label="Name" placeholder="Enter a name…"/>
          <HxTextarea system={system} label="Notes" placeholder="Any additional notes…" rows={4}/>
          <HxSwitch system={system} label="Active" defaultChecked/>
        </HxStack>
      </HxDrawer>

      <HxSheet open={sheetOpen} onClose={()=>setSheetOpen(false)} title="Bottom Sheet" system={system}>
        <HxStack gap={14}>
          <p style={{ margin:0, fontSize:14, color:'var(--hx-text-muted)', lineHeight:1.65 }}>A mobile-first bottom sheet component. Drag handle at the top, smooth spring animation.</p>
          <HxRadioGroup system={system} options={[{value:'s',label:'Small (200px)'},{value:'m',label:'Medium (320px)'},{value:'l',label:'Large (480px)'}]} defaultValue="m"/>
          <HxButton system={system} variant="primary" fullWidth onClick={()=>setSheetOpen(false)}>Done</HxButton>
        </HxStack>
      </HxSheet>

      <HxAlertDialog open={alertOpen} onClose={()=>setAlertOpen(false)} onConfirm={()=>{toast.error('Workspace deleted');setAlertOpen(false)}} title="Delete Workspace?" description="This action is permanent and cannot be undone. All projects, tokens, and deployment history will be erased." confirmLabel="Delete Workspace" variant="danger" system={system}/>
    </ThemeProvider>
  )
}
