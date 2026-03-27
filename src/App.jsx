import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './styles/tokens.css'
import './styles/luxury.css'
import './styles/minimal.css'
import './app.css'
import { THEMES, applyTheme } from './lib/themes.js'
import LandingPage from './pages/LandingPage.jsx'
import LuxuryDocs from './pages/LuxuryDocs.jsx'
import MinimalDocs from './pages/MinimalDocs.jsx'
import ThemesPage from './pages/ThemesPage.jsx'

const GH = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>

function NavBar() {
  const { pathname } = useLocation()
  const [activeTheme, setActiveTheme] = useState('obsidian')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const cur = THEMES.find(t => t.id === activeTheme)

  useEffect(() => { applyTheme(THEMES[0]) }, [])

  useEffect(() => {
    if (!open) return
    const h = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false) }
    setTimeout(() => document.addEventListener('click', h), 0)
    return () => document.removeEventListener('click', h)
  }, [open])

  const pick = (t) => { setActiveTheme(t.id); applyTheme(t); setOpen(false) }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/luxury', label: 'Luxury Glass' },
    { to: '/minimal', label: 'Minimal' },
    { to: '/themes', label: 'Themes' },
  ]

  return (
    <header className="docs-nav">
      <div className="docs-nav-inner">
        <Link to="/" className="docs-logo">MRK-UI</Link>
        <nav className="docs-links">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={`docs-link${pathname === to || (to !== '/' && pathname.startsWith(to)) ? ' active' : ''}`}>{label}</Link>
          ))}
        </nav>
        <div className="docs-nav-right">
          <div className="theme-trigger-wrap" ref={wrapRef}>
            <button className="theme-trigger" onClick={() => setOpen(o => !o)}>
              <span className="theme-orb" style={{ background: `radial-gradient(circle at 38% 35%, ${cur.dot1} 0%, ${cur.dot2} 55%, rgba(0,0,0,0.5) 100%)` }}/>
              <span className="theme-trigger-name">{cur.name}</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink:0 }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {open && (
              <div className="theme-dropdown">
                <div className="theme-dropdown-header">
                  <div className="theme-dropdown-label">Colour Theme</div>
                  <div className="theme-dropdown-sub">10 luxury palettes · two colours each</div>
                </div>
                <div className="theme-grid">
                  {THEMES.map(theme => (
                    <button key={theme.id} className={`theme-item${activeTheme === theme.id ? ' active' : ''}`} onClick={() => pick(theme)}>
                      {activeTheme === theme.id && <div className="theme-item-bar" style={{ background: `linear-gradient(90deg, ${theme.dot1}, ${theme.dot2})` }}/>}
                      <div className="theme-item-row">
                        <span className="theme-item-orb" style={{ background: `radial-gradient(circle at 38% 35%, ${theme.dot1} 0%, ${theme.dot2} 55%, rgba(0,0,0,0.45) 100%)`, boxShadow: activeTheme === theme.id ? `0 0 12px ${theme.dot1}55` : 'none' }}/>
                        <span className="theme-item-name">{theme.name}</span>
                        {activeTheme === theme.id && <span className="theme-item-active-dot" style={{ background: theme.dot1, boxShadow: `0 0 6px ${theme.dot1}` }}/>}
                      </div>
                      <div className="theme-item-desc">{theme.desc}</div>
                      <div className="theme-swatches"><span style={{ background: theme.dot1 }}/><span style={{ background: theme.dot2 }}/></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="docs-gh"><GH/></a>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="lux-orb lux-orb-1" aria-hidden="true"/>
      <div className="lux-orb lux-orb-2" aria-hidden="true"/>
      <div className="lux-orb lux-orb-3" aria-hidden="true"/>
      <NavBar/>
      <Routes>
        <Route path="/"        element={<LandingPage/>}/>
        <Route path="/luxury"  element={<LuxuryDocs/>}/>
        <Route path="/minimal" element={<MinimalDocs/>}/>
        <Route path="/themes"  element={<ThemesPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
