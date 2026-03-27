import { THEMES, applyTheme } from '../lib/themes.js'

export default function ThemesPage() {
  const pick = (t) => applyTheme(t)

  return (
    <div className="docs-page">
      <div style={{marginBottom:'56px'}}>
        <div className="lux-text-label" style={{marginBottom:'14px'}}>All Themes</div>
        <h1 style={{fontSize:'clamp(2.5rem,7vw,6rem)',fontWeight:900,lineHeight:0.88,letterSpacing:'-0.046em',color:'#fff',marginBottom:'18px'}}>10 Luxury<br/>Palettes.</h1>
        <p style={{fontSize:'15px',color:'rgba(255,255,255,0.45)',maxWidth:'520px',lineHeight:1.75}}>
          Each theme has two distinct complementary accent colours. Click any card to apply it live across the entire site. All CSS variables update instantly.
        </p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px',marginBottom:'72px'}}>
        {THEMES.map(theme => (
          <button key={theme.id} onClick={() => pick(theme)}
            className="lux-g2 lux-hi2 lux-shine"
            style={{padding:'28px',borderRadius:'22px',cursor:'pointer',fontFamily:'inherit',textAlign:'left',border:'none',transition:'transform 0.28s cubic-bezier(0.16,1,0.3,1)',position:'relative',overflow:'hidden'}}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
          >
            {/* Dual accent bar */}
            <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:`linear-gradient(90deg, ${theme.dot1}, ${theme.dot2})`,zIndex:2}}/>
            {/* Dual colour orb preview */}
            <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'18px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:`radial-gradient(circle at 38% 35%, ${theme.dot1} 0%, ${theme.dot2} 55%, rgba(0,0,0,0.4) 100%)`,border:'2px solid rgba(255,255,255,0.15)',boxShadow:`0 0 20px ${theme.dot1}44`,flexShrink:0}}/>
              <div>
                <div style={{fontSize:'14px',fontWeight:900,color:'rgba(255,255,255,0.90)',letterSpacing:'-0.01em'}}>{theme.name}</div>
                <div style={{fontSize:'9px',color:'rgba(255,255,255,0.35)',letterSpacing:'0.04em',marginTop:'2px'}}>{theme.id}</div>
              </div>
            </div>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,0.42)',lineHeight:1.55,marginBottom:'18px'}}>{theme.desc}</div>
            {/* Colour swatches */}
            <div style={{display:'flex',gap:'6px',alignItems:'center',marginBottom:'12px'}}>
              <div style={{height:'24px',flex:1,borderRadius:'6px',background:theme.dot1,boxShadow:`0 2px 8px ${theme.dot1}44`}}/>
              <div style={{height:'24px',flex:1,borderRadius:'6px',background:theme.dot2,boxShadow:`0 2px 8px ${theme.dot2}44`}}/>
            </div>
            {/* Hex values */}
            <div style={{display:'flex',gap:'8px'}}>
              <span style={{fontSize:'9px',fontWeight:700,letterSpacing:'0.06em',color:'rgba(255,255,255,0.28)',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'3px 8px',borderRadius:'6px'}}>{theme.dot1}</span>
              <span style={{fontSize:'9px',fontWeight:700,letterSpacing:'0.06em',color:'rgba(255,255,255,0.28)',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'3px 8px',borderRadius:'6px'}}>{theme.dot2}</span>
            </div>
            {/* Mini button preview */}
            <div style={{marginTop:'16px',padding:'8px 14px',borderRadius:'9px',background:`linear-gradient(135deg,${theme.dot1}cc,${theme.dot1}88)`,border:`1px solid ${theme.dot1}99`,display:'inline-flex',alignItems:'center',gap:'6px',fontSize:'9px',fontWeight:800,letterSpacing:'0.10em',textTransform:'uppercase',color:'#fff',boxShadow:`0 4px 16px ${theme.dot1}44`}}>
              Apply Theme
            </div>
          </button>
        ))}
      </div>

      {/* Usage code */}
      <div style={{marginBottom:'48px'}}>
        <div className="lux-text-label" style={{marginBottom:'18px'}}>Usage</div>
        <div className="docs-code">
          <span className="k">import</span> {'{ '}<span className="v">THEMES</span>{', '}<span className="v">applyTheme</span>{' }'} <span className="k">from</span> <span className="s">'./lib/themes.js'</span>{'\n\n'}
          <span className="c">// Apply by ID</span>{'\n'}
          <span className="v">applyTheme</span>(<span className="s">'arctic'</span>){'\n\n'}
          <span className="c">// Apply custom theme object</span>{'\n'}
          <span className="v">applyTheme</span>({'{'}{'\n'}
          {'  '}<span className="k">id</span>: <span className="s">'myTheme'</span>,{'\n'}
          {'  '}<span className="k">vars</span>: {'{'}{'\n'}
          {'    '}<span className="s">'--mrk-a1'</span>: <span className="s">'#FF0080'</span>,{'\n'}
          {'    '}<span className="s">'--mrk-ar'</span>: <span className="s">'255'</span>, <span className="s">'--mrk-ag'</span>: <span className="s">'0'</span>, <span className="s">'--mrk-ab'</span>: <span className="s">'128'</span>,{'\n'}
          {'    '}<span className="c">// ... bg layers, orbs</span>{'\n'}
          {'  '}{'}'}{'\n'}
          {'})'}{'\n\n'}
          <span className="c">// Or loop all themes</span>{'\n'}
          {'THEMES.forEach(t => console.log(t.id, t.dot1, t.dot2))'}
        </div>
      </div>

      {/* CSS variable reference */}
      <div>
        <div className="lux-text-label" style={{marginBottom:'18px'}}>CSS Variable Reference</div>
        <div className="docs-grid-2">
          <div className="lux-g1 lux-hi" style={{padding:'22px',borderRadius:'18px'}}>
            <div style={{fontSize:'10px',fontWeight:700,color:'rgba(255,255,255,0.40)',letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:'14px'}}>Accent Variables</div>
            {[
              ['--mrk-a1','Primary accent hex'],
              ['--mrk-a2','Secondary accent hex'],
              ['--mrk-ar / --mrk-ag / --mrk-ab','Primary RGB components'],
              ['--mrk-br / --mrk-bg-c / --mrk-bb','Secondary RGB components'],
            ].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',gap:'16px',marginBottom:'10px',borderBottom:'1px solid rgba(255,255,255,0.04)',paddingBottom:'10px'}}>
                <code style={{fontSize:'11px',fontWeight:700,color:'rgba(255,107,71,0.85)',fontFamily:'monospace'}}>{k}</code>
                <span style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',textAlign:'right'}}>{v}</span>
              </div>
            ))}
          </div>
          <div className="lux-g1 lux-hi" style={{padding:'22px',borderRadius:'18px'}}>
            <div style={{fontSize:'10px',fontWeight:700,color:'rgba(255,255,255,0.40)',letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:'14px'}}>Background Variables</div>
            {[
              ['--mrk-bg-l1','Primary radial gradient layer'],
              ['--mrk-bg-l2','Secondary radial gradient layer'],
              ['--mrk-bg-l3','Accent glow layer'],
              ['--mrk-bg-d1 – d4','Dark base gradient stops'],
              ['--mrk-orb1 / orb2 / orb3','Ambient orb colours'],
            ].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',gap:'16px',marginBottom:'10px',borderBottom:'1px solid rgba(255,255,255,0.04)',paddingBottom:'10px'}}>
                <code style={{fontSize:'11px',fontWeight:700,color:'rgba(79,195,247,0.85)',fontFamily:'monospace'}}>{k}</code>
                <span style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',textAlign:'right'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
