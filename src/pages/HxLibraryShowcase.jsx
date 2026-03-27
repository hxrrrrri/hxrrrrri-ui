import { useMemo, useState } from 'react'
import {
  ThemeProvider,
  HxThemeSwitcher,
  HxButton,
  HxInput,
  HxTextarea,
  HxCard,
  HxModal,
  HxDropdown,
  HxCommandPalette,
  HxDragBoard,
  HxDataTable,
  HxTimeline,
  HxDashboardGrid,
  HxDashboardTile,
  HxParallax,
  HxGesturePanel,
  HxPageTransition,
  HxFloatingOrbs,
  HxPerspectiveStage,
  HxWebGLShell,
  HxAccessibleField,
} from '../hxrrrrri-ui'

const commandItems = [
  { id: 'new-project', title: 'Create New Project', subtitle: 'Scaffold a full app shell', onSelect: () => window.alert('Create New Project') },
  { id: 'theme-audit', title: 'Run Theme Audit', subtitle: 'Validate all token mappings', onSelect: () => window.alert('Run Theme Audit') },
  { id: 'export-map', title: 'Generate Export Map', subtitle: 'Optimize bundle entry points', onSelect: () => window.alert('Generate Export Map') },
]

const timelineItems = [
  { id: '1', title: 'Foundation', date: 'Q1', description: 'Tokens, theming, motion primitives, typed APIs.' },
  { id: '2', title: 'Core Suite', date: 'Q2', description: 'Buttons, inputs, cards, modal, dropdown, and switchers.' },
  { id: '3', title: 'Advanced Grid', date: 'Q3', description: 'Command layer, boards, virtualized data surfaces.' },
]

const boardSeed = [
  { id: 'a', title: 'Token pipeline', lane: 'Backlog' },
  { id: 'b', title: 'Motion curves QA', lane: 'In Progress' },
  { id: 'c', title: 'A11y report', lane: 'Done' },
]

const tableRows = Array.from({ length: 200 }, (_, idx) => ({
  name: `Service ${idx + 1}`,
  status: idx % 3 === 0 ? 'Live' : idx % 3 === 1 ? 'Queued' : 'Draft',
  latency: `${40 + (idx % 70)}ms`,
}))

const tableColumns = [
  { key: 'name', title: 'Name' },
  { key: 'status', title: 'Status' },
  { key: 'latency', title: 'Latency' },
]

const dropdownOptions = [
  { label: 'Glass Surfaces', value: 'glass' },
  { label: 'Data Grid', value: 'grid' },
  { label: 'Immersive Stage', value: 'immersive' },
  { label: 'Accessible Kit', value: 'a11y' },
]

export default function HxLibraryShowcase() {
  const [system, setSystem] = useState('luxury')
  const [commandOpen, setCommandOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState(['glass'])
  const [boardItems, setBoardItems] = useState(boardSeed)

  const routeKey = useMemo(() => `showcase-${system}`, [system])

  return (
    <ThemeProvider>
      <HxFloatingOrbs />
      <div className="docs-page" style={{ paddingBottom: 80 }}>
        <div className="docs-section" style={{ marginBottom: 20 }}>
          <div className="docs-section-title">HXRRRRRI UI Showcase</div>
          <p style={{ marginTop: 0, color: 'rgba(255,255,255,0.66)', maxWidth: 740 }}>
            This page renders the new library components live. Change the active design system and interact with each module.
          </p>
          <div style={{ maxWidth: 360 }}>
            <HxThemeSwitcher value={system} onChange={setSystem} />
          </div>
        </div>

        <HxPageTransition routeKey={routeKey}>
          <HxParallax speed={45}>
            <div className="docs-grid-2" style={{ alignItems: 'start' }}>
              <HxCard system={system} tilt>
                <h3 style={{ marginTop: 0 }}>Core Controls</h3>
                <div className="docs-row" style={{ marginBottom: 10 }}>
                  <HxButton system={system} variant="gradient" onClick={() => setModalOpen(true)}>Open Modal</HxButton>
                  <HxButton system={system} variant="neon" onClick={() => setCommandOpen(true)}>Command Palette</HxButton>
                  <HxButton system={system} variant="ghost">Ghost</HxButton>
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <HxInput system={system} placeholder="Project name" />
                  <HxInput system={system} mode="otp" placeholder="OTP" maxLength={6} />
                  <HxTextarea system={system} placeholder="Describe your UI intent..." />
                  <HxDropdown
                    system={system}
                    options={dropdownOptions}
                    value={selectedFeatures}
                    onChange={setSelectedFeatures}
                    multiple
                  />
                </div>
              </HxCard>

              <HxPerspectiveStage>
                <HxCard system={system} tilt>
                  <h3 style={{ marginTop: 0 }}>Accessibility-First Field</h3>
                  <HxAccessibleField
                    label="Deployment endpoint"
                    hint="Use a secure URL with HTTPS."
                    placeholder="https://api.example.com"
                  />
                </HxCard>
              </HxPerspectiveStage>
            </div>
          </HxParallax>

          <div className="docs-section" style={{ marginTop: 24 }}>
            <div className="docs-section-title">Advanced Components</div>
            <div style={{ display: 'grid', gap: 14 }}>
              <HxDashboardGrid system={system}>
                <HxDashboardTile system={system} colSpan={4}><strong>Active System:</strong> {system}</HxDashboardTile>
                <HxDashboardTile system={system} colSpan={4}><strong>Features:</strong> {selectedFeatures.join(', ')}</HxDashboardTile>
                <HxDashboardTile system={system} colSpan={4}><strong>Cards:</strong> Motion + 3D tilt enabled</HxDashboardTile>
              </HxDashboardGrid>

              <HxDragBoard
                system={system}
                lanes={['Backlog', 'In Progress', 'Done']}
                items={boardItems}
                onChange={setBoardItems}
              />

              <HxDataTable system={system} columns={tableColumns} rows={tableRows} viewportHeight={260} />
              <HxTimeline system={system} items={timelineItems} />
            </div>
          </div>

          <div className="docs-section">
            <div className="docs-section-title">Gesture + Immersive</div>
            <div className="docs-grid-2" style={{ alignItems: 'start' }}>
              <HxGesturePanel onDismiss={() => window.alert('Gesture panel dismissed')}>
                <h4 style={{ marginTop: 0 }}>Swipe Me</h4>
                <p style={{ marginBottom: 0 }}>Drag horizontally to trigger the dismiss callback.</p>
              </HxGesturePanel>

              <HxWebGLShell fallbackLabel="3D Canvas Integration">
                <div style={{ height: 120, borderRadius: 10, border: '1px solid var(--hx-border)', display: 'grid', placeItems: 'center' }}>
                  Mount react-three-fiber scene here.
                </div>
              </HxWebGLShell>
            </div>
          </div>
        </HxPageTransition>
      </div>

      <HxCommandPalette open={commandOpen} onOpenChange={setCommandOpen} items={commandItems} system={system} />

      <HxModal open={modalOpen} onClose={() => setModalOpen(false)} title="HXRRRRRI Modal" system={system}>
        <p style={{ marginTop: 0 }}>This modal is powered by the new library and supports all design systems.</p>
        <HxButton system={system} variant="primary" onClick={() => setModalOpen(false)}>Close</HxButton>
      </HxModal>
    </ThemeProvider>
  )
}
