import { useState } from 'react'

const Arr = ({ s=13 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

function Section({ title, code, children }) {
  const [show, setShow] = useState(false)
  return (
    <div className="docs-section">
      <div className="docs-section-title">{title}</div>
      {children}
      {code && (
        <div>
          <button onClick={() => setShow(s => !s)} className="lux-btn lux-btn-ghost" style={{padding:'7px 14px',fontSize:'9px',marginTop:'12px'}}>
            {show ? 'Hide' : 'Show'} code
          </button>
          {show && <div className="docs-code" dangerouslySetInnerHTML={{__html: code}}/>}
        </div>
      )}
    </div>
  )
}

const bars = [35,50,42,65,55,80,48,72,60,90,55,95]
const bars2 = [40,55,48,70,62,75,58,80,68,85,72,90]

export default function LuxuryDocs() {
  const [tog1, setTog1] = useState(true)
  const [tog2, setTog2] = useState(false)
  const [form, setForm] = useState({name:'',email:'',msg:''})
  const [sent, setSent] = useState(false)

  return (
    <div className="docs-page">
      {/* Header */}
      <div style={{marginBottom:'56px'}}>
        <div className="lux-text-label" style={{marginBottom:'14px'}}>System 01</div>
        <h1 style={{fontSize:'clamp(3rem,8vw,7rem)',fontWeight:900,lineHeight:0.88,letterSpacing:'-0.046em',color:'#fff',marginBottom:'18px'}}>
          Luxury Glass
        </h1>
        <p style={{fontSize:'15px',color:'rgba(255,255,255,0.45)',maxWidth:'520px',lineHeight:1.75}}>
          Apple Vision Pro–grade glassmorphism. Every component responds to your theme variables. 5 glass tiers, inset edge highlights, shine sweeps, ambient orbs.
        </p>
      </div>

      {/* Navbar */}
      <Section title="01 / Navbar" code={`<span class="k">&lt;header</span> <span class="s">className</span>=<span class="v">"lux-navbar"</span><span class="k">&gt;</span>\n  <span class="k">&lt;a</span> <span class="s">className</span>=<span class="v">"lux-nav-logo"</span><span class="k">&gt;</span>MR.K<span class="k">&lt;/a&gt;</span>\n  <span class="k">&lt;span</span> <span class="s">className</span>=<span class="v">"lux-nav-link active"</span><span class="k">&gt;</span>Works<span class="k">&lt;/span&gt;</span>\n  <span class="k">&lt;span</span> <span class="s">className</span>=<span class="v">"lux-nav-link"</span><span class="k">&gt;</span>About<span class="k">&lt;/span&gt;</span>\n<span class="k">&lt;/header&gt;</span>`}>
        <div className="lux-navbar" style={{borderRadius:'16px',border:'1px solid rgba(255,255,255,0.06)'}}>
          <span className="lux-nav-logo">MR.K</span>
          <span className="lux-nav-link active" style={{position:'relative'}}>Works<span className="lux-nav-dot"/></span>
          <span className="lux-nav-link">3D Lab</span>
          <span className="lux-nav-link">About</span>
          <span className="lux-nav-link">Contact</span>
          <div style={{marginLeft:'auto',display:'flex',gap:'8px',alignItems:'center'}}>
            <span className="lux-badge lux-badge-success"><span className="lux-dot lux-dot-green"/>Open</span>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="02 / Buttons" code={`<span class="k">&lt;button</span> <span class="s">className</span>=<span class="v">"lux-btn lux-btn-primary"</span><span class="k">&gt;</span>Primary<span class="k">&lt;/button&gt;</span>\n<span class="k">&lt;button</span> <span class="s">className</span>=<span class="v">"lux-btn lux-btn-ghost"</span><span class="k">&gt;</span>Ghost<span class="k">&lt;/button&gt;</span>\n<span class="k">&lt;button</span> <span class="s">className</span>=<span class="v">"lux-btn lux-btn-outline"</span><span class="k">&gt;</span>Outline<span class="k">&lt;/button&gt;</span>\n<span class="c">// Sizes: lux-btn-sm / lux-btn-lg / lux-btn-icon</span>`}>
        <div className="docs-row">
          <button className="lux-btn lux-btn-primary">Primary <Arr/></button>
          <button className="lux-btn lux-btn-ghost">Ghost</button>
          <button className="lux-btn lux-btn-outline">Outline</button>
          <button className="lux-btn lux-btn-primary lux-btn-sm">Small</button>
          <button className="lux-btn lux-btn-ghost lux-btn-lg">Large</button>
          <button className="lux-btn lux-btn-ghost lux-btn-icon" title="Icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </button>
        </div>
      </Section>

      {/* Glass Cards */}
      <Section title="03 / Glass Cards" code={`<span class="c">// Five tiers: g1 (subtle) → g4 (heavy) + accent</span>\n<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-g1 lux-hi lux-shine"</span><span class="k">&gt;</span>...<span class="k">&lt;/div&gt;</span>\n<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-g2 lux-hi2 lux-shine"</span><span class="k">&gt;</span>...<span class="k">&lt;/div&gt;</span>\n<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-g-accent lux-hi2"</span><span class="k">&gt;</span>...<span class="k">&lt;/div&gt;</span>`}>
        <div className="docs-grid-3">
          {[
            {cls:'lux-g1 lux-hi',t:'G1 Subtle',d:'Lightest glass. Page sections.'},
            {cls:'lux-g2 lux-hi2',t:'G2 Standard',d:'Workhorse. Cards, panels.'},
            {cls:'lux-g3 lux-hi3',t:'G3 Heavy',d:'Modals, popovers.'},
          ].map(({cls,t,d})=>(
            <div key={t} className={`${cls} lux-shine`} style={{padding:'24px',borderRadius:'22px',position:'relative',overflow:'hidden'}}>
              <div className="lux-text-label" style={{marginBottom:'10px'}}>{t}</div>
              <div style={{fontSize:'14px',fontWeight:700,color:'rgba(255,255,255,0.85)',marginBottom:'6px'}}>Card Title</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,0.42)',lineHeight:1.6}}>{d}</div>
              <div style={{display:'flex',gap:'5px',marginTop:'12px',flexWrap:'wrap'}}>
                <span className="lux-tag">React</span><span className="lux-tag">GSAP</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'12px'}}>
          <div className="lux-g-accent lux-hi2" style={{padding:'24px',borderRadius:'22px',position:'relative',overflow:'hidden',maxWidth:'380px'}}>
            <div style={{position:'absolute',inset:'-20px',background:'radial-gradient(circle at 35% 35%,rgba(255,255,255,0.08),transparent 60%)',pointerEvents:'none'}}/>
            <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'rgba(255,255,255,0.65)',marginBottom:'10px',position:'relative'}}>Accent Card</div>
            <div style={{fontSize:'18px',fontWeight:900,color:'#fff',marginBottom:'8px',position:'relative'}}>Let's Build Something.</div>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.65)',lineHeight:1.70,position:'relative'}}>Open to roles, freelance, and interesting projects.</p>
            <button className="lux-btn lux-btn-ghost" style={{marginTop:'16px',position:'relative',fontSize:'10px',padding:'9px 18px'}}>Get in Touch</button>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section title="04 / Stats & Progress" code={`<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-stat"</span><span class="k">&gt;</span>\n  <span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-stat-label"</span><span class="k">&gt;</span>SIH<span class="k">&lt;/div&gt;</span>\n  <span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-stat-val"</span><span class="k">&gt;</span>2×<span class="k">&lt;/div&gt;</span>\n  <span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-stat-sub"</span><span class="k">&gt;</span>National Winner<span class="k">&lt;/div&gt;</span>\n<span class="k">&lt;/div&gt;</span>`}>
        <div className="docs-grid-4" style={{marginBottom:'20px'}}>
          {[{l:'SIH',v:'2×',s:'National Winner'},{l:'Projects',v:'6+',s:'Shipped'},{l:'Stack',v:'15+',s:'Technologies'},{l:'Base',v:'KL',s:'Kerala, India'}].map(s=>(
            <div key={s.l} className="lux-stat"><div className="lux-stat-label">{s.l}</div><div className="lux-stat-val">{s.v}</div><div className="lux-stat-sub">{s.s}</div></div>
          ))}
        </div>
        <div className="lux-g1 lux-hi" style={{padding:'24px',borderRadius:'18px'}}>
          <div className="lux-text-label" style={{marginBottom:'18px'}}>Skills</div>
          {[{n:'React / Next.js',p:94},{n:'PyTorch / ML',p:82,c:'#A78BFA'},{n:'FastAPI',p:88,c:'#00D18C'}].map(s=>(
            <div key={s.n} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                <span style={{fontSize:'11px',fontWeight:600,color:'rgba(255,255,255,0.65)'}}>{s.n}</span>
                <span style={{fontSize:'10px',fontWeight:800,color:s.c||'var(--hxrrrrri-a1)'}}>{s.p}%</span>
              </div>
              <div className="lux-progress-track">
                <div className="lux-progress-fill" style={{width:`${s.p}%`,background:s.c?`linear-gradient(90deg,${s.c},${s.c}88)`:undefined,boxShadow:s.c?`0 0 8px ${s.c}66`:undefined}}/>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Graphs */}
      <Section title="05 / Sparkline Graphs">
        <div className="docs-grid-2">
          {[{title:'Monthly Visitors',val:'24.8K',up:'+18.4%',d:bars},{title:'Deployments',val:'143',up:'+7',d:bars2}].map(g=>(
            <div key={g.title} className="lux-graph-wrap">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'18px'}}>
                <div><div style={{fontSize:'11px',fontWeight:700,color:'rgba(255,255,255,0.50)',marginBottom:'4px'}}>{g.title}</div><div style={{fontSize:'26px',fontWeight:900,background:'linear-gradient(135deg,#fff,rgba(255,255,255,0.65))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1}}>{g.val}</div></div>
                <span style={{fontSize:'10px',fontWeight:800,color:'#22dd88',letterSpacing:'0.08em'}}>{g.up}</span>
              </div>
              <div style={{display:'flex',alignItems:'flex-end',gap:'5px',height:'56px'}}>
                {g.d.map((v,i)=><div key={i} className={`lux-bar${i===g.d.length-1?' active':''}`} style={{height:`${v*0.55}px`,flex:1}}/>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Forms */}
      <Section title="06 / Form Elements" code={`<span class="k">&lt;label</span> <span class="s">className</span>=<span class="v">"lux-input-label"</span><span class="k">&gt;</span>Name<span class="k">&lt;/label&gt;</span>\n<span class="k">&lt;input</span> <span class="s">className</span>=<span class="v">"lux-input"</span> <span class="s">placeholder</span>=<span class="v">"Your name"</span><span class="k">/&gt;</span>`}>
        <div className="docs-grid-2">
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {!sent ? <>
              <div><label className="lux-input-label">01 / Full Name</label><input className="lux-input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div><label className="lux-input-label">02 / Email</label><input className="lux-input" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div><label className="lux-input-label">03 / Message</label><textarea className="lux-input" rows={3} placeholder="Your message..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/></div>
              <button className="lux-btn lux-btn-primary" style={{justifyContent:'center'}} onClick={()=>setSent(true)}>Send Message <Arr/></button>
            </> : <div style={{textAlign:'center',padding:'32px 0'}}><div style={{fontSize:'48px',fontWeight:900,background:'linear-gradient(135deg,#fff,rgba(255,255,255,0.65))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1,marginBottom:'12px'}}>Sent.</div><p style={{fontSize:'12px',color:'rgba(255,255,255,0.35)',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:'12px'}}>Thanks!</p><button className="lux-btn lux-btn-ghost lux-btn-sm" onClick={()=>{setSent(false);setForm({name:'',email:'',msg:''})}}>Reset</button></div>}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <select className="lux-input"><option>Full-time Role</option><option>Freelance</option><option>Collaboration</option></select>
            {[{l:'Open to Work',v:tog1,f:setTog1},{l:'Dark Mode',v:tog2,f:setTog2}].map(t=>(
              <div key={t.l} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px',background:'rgba(255,255,255,0.04)',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div className={`lux-toggle${t.v?' on':''}`} onClick={()=>t.f(!t.v)}><div className="lux-toggle-knob"/></div>
                <span style={{fontSize:'13px',color:'rgba(255,255,255,0.65)'}}>{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section title="07 / Badges & Tags" code={`<span class="k">&lt;span</span> <span class="s">className</span>=<span class="v">"lux-badge lux-badge-accent"</span><span class="k">&gt;</span>...<span class="k">&lt;/span&gt;</span>\n<span class="k">&lt;span</span> <span class="s">className</span>=<span class="v">"lux-badge lux-badge-success"</span><span class="k">&gt;</span>...<span class="k">&lt;/span&gt;</span>\n<span class="k">&lt;span</span> <span class="s">className</span>=<span class="v">"lux-tag"</span><span class="k">&gt;</span>React<span class="k">&lt;/span&gt;</span>`}>
        <div className="docs-row" style={{marginBottom:'10px'}}>
          <span className="lux-badge lux-badge-accent"><span className="lux-dot lux-dot-accent"/>Primary</span>
          <span className="lux-badge lux-badge-glass">Ghost</span>
          <span className="lux-badge lux-badge-success"><span className="lux-dot lux-dot-green"/>Live</span>
          <span className="lux-badge lux-badge-warn">Warning</span>
          <span className="lux-badge lux-badge-err">Error</span>
        </div>
        <div className="docs-row">
          {['React','Next.js','TypeScript','FastAPI','PyTorch','YOLOv8','Three.js','GSAP'].map(t=><span key={t} className="lux-tag">{t}</span>)}
        </div>
      </Section>

      {/* Notifications */}
      <Section title="08 / Notifications" code={`<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-notif lux-notif-success"</span><span class="k">&gt;</span>\n  <span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-notif-icon"</span><span class="k">&gt;</span>✓<span class="k">&lt;/div&gt;</span>\n  <span class="k">&lt;div&gt;</span>\n    <span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-notif-title"</span><span class="k">&gt;</span>Title<span class="k">&lt;/div&gt;</span>\n    <span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-notif-body"</span><span class="k">&gt;</span>Body<span class="k">&lt;/div&gt;</span>\n  <span class="k">&lt;/div&gt;</span>\n<span class="k">&lt;/div&gt;</span>`}>
        <div style={{display:'flex',flexDirection:'column',gap:'8px',maxWidth:'520px'}}>
          {[
            {cls:'lux-notif-success',ic:'✓',icBg:'rgba(0,210,120,0.20)',icCol:'rgba(0,220,130,0.90)',t:'Deployment successful',b:'ECO-3D Studio is live'},
            {cls:'lux-notif-info',ic:'i',icBg:'rgba(79,195,247,0.20)',icCol:'rgba(79,195,247,0.90)',t:'New message from recruiter',b:'Insight Enterprises reached out'},
            {cls:'lux-notif-warn',ic:'!',icBg:'rgba(232,184,75,0.20)',icCol:'rgba(232,184,75,0.90)',t:'API rate limit approaching',b:'80% of monthly quota consumed'},
            {cls:'lux-notif-err',ic:'×',icBg:'rgba(229,62,92,0.20)',icCol:'rgba(229,62,92,0.90)',t:'Build failed',b:'TypeError: Cannot read properties'},
          ].map(n=>(
            <div key={n.t} className={`lux-notif ${n.cls}`}>
              <div className="lux-notif-icon" style={{background:n.icBg,color:n.icCol}}>{n.ic}</div>
              <div><div className="lux-notif-title">{n.t}</div><div className="lux-notif-body">{n.b}</div></div>
            </div>
          ))}
        </div>
      </Section>

      {/* Avatars */}
      <Section title="09 / Avatars" code={`<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-avatar lux-avatar-md"</span><span class="k">&gt;</span>HS<span class="k">&lt;/div&gt;</span>`}>
        <div className="docs-row" style={{alignItems:'flex-end',marginBottom:'16px'}}>
          <div className="lux-avatar lux-avatar-sm">HS</div>
          <div className="lux-avatar lux-avatar-md">MK</div>
          <div className="lux-avatar lux-avatar-lg">MR</div>
          <div className="lux-avatar lux-avatar-md" style={{background:'linear-gradient(135deg,rgba(0,210,140,0.7),rgba(5,155,100,0.7))'}}>EC</div>
        </div>
        <div className="lux-g2 lux-hi2" style={{padding:'18px',borderRadius:'18px',display:'flex',alignItems:'center',gap:'14px',maxWidth:'360px'}}>
          <div className="lux-avatar lux-avatar-lg">HS</div>
          <div><div style={{fontSize:'14px',fontWeight:800,color:'rgba(255,255,255,0.90)',marginBottom:'4px'}}>Harisankar S</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.42)',marginBottom:'8px'}}>AI/ML Engineer</div><div style={{display:'flex',gap:'5px'}}><span className="lux-badge lux-badge-accent"><span className="lux-dot lux-dot-accent"/>Open</span><span className="lux-badge lux-badge-glass">MBCET '26</span></div></div>
        </div>
      </Section>

      {/* Loaders */}
      <Section title="10 / Loaders" code={`<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-loader-ring"</span><span class="k">/&gt;</span>\n<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-loader-dots"</span><span class="k">&gt;&lt;span/&gt;&lt;span/&gt;&lt;span/&gt;&lt;/div&gt;</span>\n<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-loader-pulse"</span><span class="k">/&gt;</span>\n<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-loader-bar-wrap"</span><span class="k">&gt;&lt;div</span> <span class="s">className</span>=<span class="v">"lux-loader-bar-fill"</span><span class="k">/&gt;&lt;/div&gt;</span>`}>
        <div className="docs-row" style={{gap:'32px'}}>
          {[
            {l:'Ring',el:<div className="lux-loader-ring"/>},
            {l:'Dots',el:<div className="lux-loader-dots"><span/><span/><span/></div>},
            {l:'Pulse',el:<div className="lux-loader-pulse"/>},
            {l:'Bar',el:<div className="lux-loader-bar-wrap"><div className="lux-loader-bar-fill"/></div>},
          ].map(({l,el})=>(
            <div key={l} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
              {el}<span style={{fontSize:'9px',color:'rgba(255,255,255,0.28)',letterSpacing:'0.14em',textTransform:'uppercase'}}>{l}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section title="11 / Steps" code={`<span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-step-row"</span><span class="k">&gt;</span>\n  <span class="k">&lt;div</span> <span class="s">className</span>=<span class="v">"lux-step-num done"</span><span class="k">&gt;</span>1<span class="k">&lt;/div&gt;</span>\n  ...\n<span class="k">&lt;/div&gt;</span>`}>
        <div className="lux-g1 lux-hi" style={{padding:'24px',borderRadius:'18px',maxWidth:'360px'}}>
          {[{n:1,t:'Fork the repo',s:'github.com/hxrrrrri',done:true},{n:2,t:'Copy CSS files',s:'tokens + luxury + minimal',done:true},{n:3,t:'Set your theme',s:'--hxrrrrri-a1, --hxrrrrri-ar/ag/ab',done:false}].map((st,i)=>(
            <div key={i}>
              <div className="lux-step-row">
                <div className={`lux-step-num${st.done?' done':''}`}>{st.n}</div>
                <div><div style={{fontSize:'12px',fontWeight:700,color:st.done?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.45)',marginBottom:'2px'}}>{st.t}</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.32)'}}>{st.s}</div></div>
              </div>
              {i<2&&<div style={{width:'1px',height:'16px',background:'rgba(var(--hxrrrrri-ar),var(--hxrrrrri-ag),var(--hxrrrrri-ab),0.20)',margin:'0 14px 12px 14px'}}/>}
            </div>
          ))}
        </div>
      </Section>

      {/* Divider */}
      <Section title="12 / Dividers">
        <div className="lux-divider"/>
        <div style={{display:'flex',alignItems:'center',gap:'12px',margin:'8px 0'}}>
          <span style={{flex:1,height:'1px',background:'rgba(255,255,255,0.07)'}}/>
          <span style={{fontSize:'9px',fontWeight:800,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',whiteSpace:'nowrap'}}>or continue with</span>
          <span style={{flex:1,height:'1px',background:'rgba(255,255,255,0.07)'}}/>
        </div>
        <div style={{height:'1px',background:`linear-gradient(90deg,var(--hxrrrrri-a1),var(--hxrrrrri-a2))`,margin:'16px 0',borderRadius:'2px'}}/>
      </Section>

      {/* Footer */}
      <Section title="13 / Footer" code={`<span class="k">&lt;footer</span> <span class="s">className</span>=<span class="v">"lux-footer"</span><span class="k">&gt;...&lt;/footer&gt;</span>`}>
        <div className="lux-footer">
          <div><div style={{fontWeight:900,fontSize:'15px',letterSpacing:'-0.04em',background:'linear-gradient(135deg,#fff,rgba(255,255,255,0.55))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>MR.K</div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.18)',marginTop:'2px',letterSpacing:'0.12em',textTransform:'uppercase'}}>Harisankar S. © 2025</div></div>
          <div style={{display:'flex',gap:'18px'}}>
            {['Works','About','Contact'].map(l=><span key={l} style={{fontSize:'10px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.09em',textTransform:'uppercase',cursor:'pointer'}}>{l}</span>)}
          </div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.12)',letterSpacing:'0.06em'}}>React · Vite · GSAP</div>
        </div>
      </Section>
    </div>
  )
}
