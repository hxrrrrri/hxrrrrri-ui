import { Link } from 'react-router-dom'
import { THEMES } from '../lib/themes.js'

const Arr = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

export default function LandingPage() {
  return (
    <div className="docs-page" style={{paddingTop:'80px'}}>

      {/* Hero */}
      <div style={{marginBottom:'88px',maxWidth:'720px'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'5px 14px',borderRadius:'999px',background:'rgba(255,255,255,0.045)',border:'1px solid rgba(255,255,255,0.09)',marginBottom:'28px'}}>
          <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--hxrrrrri-a1)',boxShadow:'0 0 8px var(--hxrrrrri-a1)',flexShrink:0}}/>
          <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)'}}>by Harisankar S — MR.K</span>
        </div>
        <h1 style={{fontSize:'clamp(3rem,8vw,7rem)',fontWeight:900,lineHeight:0.88,letterSpacing:'-0.046em',color:'#fff',marginBottom:'24px'}}>
          hxrrrrri-UI<span style={{color:'var(--hxrrrrri-a1)'}}>.</span>
        </h1>
        <p style={{fontSize:'18px',lineHeight:1.7,color:'rgba(255,255,255,0.50)',maxWidth:'560px',marginBottom:'36px',fontWeight:400}}>
          Two complete React component systems. Ultra Luxury Glass — Apple Vision Pro–grade glassmorphism. Ultra Minimal — ink on paper precision. Copy the CSS, use the class names, ship in minutes.
        </p>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
          <Link to="/luxury" className="lux-btn lux-btn-primary">Luxury Glass <Arr/></Link>
          <Link to="/minimal" className="lux-btn lux-btn-ghost">Minimal System <Arr/></Link>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="lux-btn lux-btn-ghost" style={{color:'rgba(255,255,255,0.35)',fontSize:'10px',padding:'11px 18px'}}>github/hxrrrrri</a>
        </div>
      </div>

      {/* Feature cards */}
      <div className="docs-grid-3" style={{marginBottom:'80px'}}>
        <div className="lux-g2 lux-hi2 lux-shine" style={{padding:'32px',borderRadius:'24px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,right:0,width:'160px',height:'160px',background:'radial-gradient(circle at 80% 20%,rgba(var(--hxrrrrri-ar),var(--hxrrrrri-ag),var(--hxrrrrri-ab),0.07),transparent 65%)',pointerEvents:'none'}}/>
          <div className="lux-text-label" style={{marginBottom:'14px'}}>Luxury Glass</div>
          <h2 style={{fontSize:'22px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'12px'}}>Apple Vision Pro<br/>Glass System</h2>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.45)',lineHeight:1.72,marginBottom:'20px'}}>5 glass tiers, inset highlight effects, backdrop blur, ambient orbs, 10 live themes. Every component responds to one CSS variable change.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
            {['Buttons','Cards','Inputs','Loaders','Graphs','Badges'].map(t=><span key={t} className="lux-tag">{t}</span>)}
          </div>
        </div>
        <div className="lux-g2 lux-hi2 lux-shine" style={{padding:'32px',borderRadius:'24px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',bottom:0,left:0,width:'160px',height:'160px',background:'radial-gradient(circle at 20% 80%,rgba(var(--hxrrrrri-br),var(--hxrrrrri-bg-c),var(--hxrrrrri-bb),0.06),transparent 65%)',pointerEvents:'none'}}/>
          <div className="lux-text-label" style={{marginBottom:'14px'}}>Minimal</div>
          <h2 style={{fontSize:'22px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'12px'}}>Ink on Paper<br/>Precision</h2>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.45)',lineHeight:1.72,marginBottom:'20px'}}>Zero gradients. Zero shadows. Pure typography and spacing hierarchy. Inspired by Swiss grid design and editorial print.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
            {['Buttons','Cards','Tables','Forms','Steps','Tags'].map(t=><span key={t} className="lux-tag">{t}</span>)}
          </div>
        </div>
        <div className="lux-g-accent lux-hi2" style={{padding:'32px',borderRadius:'24px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:'-20px',background:'radial-gradient(circle at 35% 35%,rgba(255,255,255,0.08),transparent 60%)',pointerEvents:'none'}}/>
          <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.65)',marginBottom:'14px'}}>10 Themes</div>
          <h2 style={{fontSize:'22px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'12px'}}>Live Theme<br/>Switching</h2>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.65)',lineHeight:1.72,marginBottom:'20px'}}>Every element is CSS-variable driven. One function call changes the entire palette — buttons, glows, gradients, backgrounds.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
            {THEMES.map(t=><span key={t.id} style={{width:'12px',height:'12px',borderRadius:'50%',background:`radial-gradient(circle at 35% 35%, ${t.dot1}, ${t.dot2})`,border:'1px solid rgba(255,255,255,0.15)',flexShrink:0}}/>)}
          </div>
        </div>
      </div>

      {/* Quick install */}
      <div style={{marginBottom:'80px'}}>
        <div className="lux-text-label" style={{marginBottom:'22px'}}>Quick Start</div>
        <div className="docs-grid-2">
          <div>
            <div style={{fontSize:'14px',fontWeight:700,color:'rgba(255,255,255,0.75)',marginBottom:'10px'}}>1. Install with npm (or npm + npx project init)</div>
            <div className="docs-code">
              <span className="c"># If you need a fresh app</span>{'\n'}
              <span className="k">npx</span> <span className="s">create-vite@latest my-app -- --template react</span>{'\n'}
              <span className="k">cd</span> <span className="s">my-app</span>{'\n\n'}
              <span className="c"># Install HXRRRRRI UI + motion engine</span>{'\n'}
              <span className="k">npm</span> <span className="s">install hxrrrrri-ui framer-motion</span>{'\n\n'}
              <span className="c"># If package is private, use GitHub source</span>{'\n'}
              <span className="k">npm</span> <span className="s">install github:hxrrrrri/hxrrrrri-ui</span>
            </div>
          </div>
          <div>
            <div style={{fontSize:'14px',fontWeight:700,color:'rgba(255,255,255,0.75)',marginBottom:'10px'}}>2. Import and use in your page</div>
            <div className="docs-code">
              <span className="k">import</span> {'{ '}<span className="v">ThemeProvider, HxButton, HxCard</span>{' }'} <span className="k">from</span> <span className="s">'hxrrrrri-ui'</span>{'\n'}
              <span className="k">import</span> <span className="s">'hxrrrrri-ui/style.css'</span>{'\n\n'}
              <span className="s">&lt;ThemeProvider&gt;</span>{'\n'}
              {'  '}<span className="s">&lt;HxCard system="luxury" tilt&gt;</span>{'\n'}
              {'    '}<span className="s">&lt;HxButton system="luxury" variant="gradient"&gt;Launch&lt;/HxButton&gt;</span>{'\n'}
              {'  '}<span className="s">&lt;/HxCard&gt;</span>{'\n'}
              <span className="s">&lt;/ThemeProvider&gt;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Theme teaser */}
      <div style={{marginBottom:'80px'}}>
        <div className="lux-text-label" style={{marginBottom:'22px'}}>Change theme in one line</div>
        <div className="docs-code" style={{marginTop:0,marginBottom:'20px'}}>
          <span className="k">import</span> {'{ '}<span className="v">applyTheme</span>{' }'} <span className="k">from</span> <span className="s">'./lib/themes.js'</span>{'\n\n'}
          <span className="c">// Instantly switch the entire UI palette</span>{'\n'}
          <span className="v">applyTheme</span>(<span className="s">'arctic'</span>)<span className="c">   // Glacial cyan · Polar violet</span>{'\n'}
          <span className="v">applyTheme</span>(<span className="s">'aurum'</span>)<span className="c">    // Liquid gold · Vermillion lacquer</span>{'\n'}
          <span className="v">applyTheme</span>(<span className="s">'obsidian'</span>)<span className="c"> // Burnt ember · Midnight indigo</span>
        </div>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {THEMES.map(t=>(
            <div key={t.id} style={{display:'flex',alignItems:'center',gap:'7px',padding:'6px 12px',borderRadius:'10px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)'}}>
              <span style={{width:'14px',height:'14px',borderRadius:'50%',background:`radial-gradient(circle at 38% 35%, ${t.dot1}, ${t.dot2})`,border:'1px solid rgba(255,255,255,0.15)',flexShrink:0}}/>
              <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.50)'}}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="lux-footer">
        <div>
          <div style={{fontWeight:900,fontSize:'16px',letterSpacing:'-0.04em',background:'linear-gradient(135deg,#fff,rgba(255,255,255,0.55))'  ,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>hxrrrrri-UI</div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.20)',marginTop:'3px',letterSpacing:'0.12em',textTransform:'uppercase'}}>By Harisankar S — hxrrrrri</div>
        </div>
        <div style={{display:'flex',gap:'20px'}}>
          <Link to="/luxury" style={{fontSize:'11px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.09em',textTransform:'uppercase',textDecoration:'none'}}>Luxury</Link>
          <Link to="/minimal" style={{fontSize:'11px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.09em',textTransform:'uppercase',textDecoration:'none'}}>Minimal</Link>
          <Link to="/themes" style={{fontSize:'11px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.09em',textTransform:'uppercase',textDecoration:'none'}}>Themes</Link>
        </div>
        <div style={{fontSize:'10px',color:'rgba(255,255,255,0.12)',letterSpacing:'0.06em'}}>React · Vite · CSS Variables · MIT License</div>
      </div>
    </div>
  )
}
