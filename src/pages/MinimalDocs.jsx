import { useState } from 'react'

const Arr = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

function Section({ title, children }) {
  return (
    <div className="min-section">
      <div className="min-section-label">{title}</div>
      {children}
    </div>
  )
}

const bars = [35,50,42,65,55,80,48,72,60,90,55,95]

export default function MinimalDocs() {
  const [tog1, setTog1] = useState(true)
  const [tog2, setTog2] = useState(false)
  const [form, setForm] = useState({name:'',email:'',msg:''})
  const [sent, setSent] = useState(false)

  return (
    <div className="min-page-bg">
      <div className="min-page-content">
        {/* Header */}
        <div style={{marginBottom:'56px'}}>
          <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'#9B9B98',marginBottom:'14px'}}>System 02</div>
          <h1 style={{fontSize:'clamp(3rem,8vw,6.5rem)',fontWeight:800,lineHeight:0.90,letterSpacing:'-0.046em',color:'#0D0D0C',marginBottom:'18px'}}>Ultra Minimal</h1>
          <p style={{fontSize:'15px',color:'#6B6B68',maxWidth:'520px',lineHeight:1.75}}>
            Ink on paper. No gradients. No shadows. No glass. Pure typographic hierarchy and Swiss-grid spacing. Every component uses flat colour and precision.
          </p>
        </div>

        {/* Navbar */}
        <Section title="01 / Navbar">
          <div className="min-navbar" style={{border:'1px solid #E5E4E0'}}>
            <span className="min-nav-logo">MR.K</span>
            <span className="min-nav-link active">Works</span>
            <span className="min-nav-link">Lab</span>
            <span className="min-nav-link">About</span>
            <span className="min-nav-link">Contact</span>
            <div style={{marginLeft:'auto'}}><span className="min-badge min-badge-dark" style={{fontSize:'9px'}}>Open to Work</span></div>
          </div>
          <div className="min-code">
            <span className="k">{'<header'}</span> <span className="s">className</span>=<span className="c">"min-navbar"</span><span className="k">{'>'}</span>{'\n'}
            {'  '}<span className="k">{'<span'}</span> <span className="s">className</span>=<span className="c">"min-nav-link active"</span><span className="k">{'>'}</span>Works<span className="k">{'</span>'}</span>{'\n'}
            <span className="k">{'</header>'}</span>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="02 / Buttons">
          <div className="min-row">
            <button className="min-btn min-btn-primary">Primary</button>
            <button className="min-btn min-btn-outline">Outline</button>
            <button className="min-btn min-btn-ghost">Ghost</button>
            <button className="min-btn min-btn-primary min-btn-sm">Small</button>
            <button className="min-btn min-btn-outline min-btn-lg">Large →</button>
          </div>
          <div className="min-code">
            <span className="k">{'<button'}</span> <span className="s">className</span>=<span className="c">"min-btn min-btn-primary"</span><span className="k">{'>'}</span>Primary<span className="k">{'</button>'}</span>{'\n'}
            <span className="k">{'<button'}</span> <span className="s">className</span>=<span className="c">"min-btn min-btn-outline"</span><span className="k">{'>'}</span>Outline<span className="k">{'</button>'}</span>{'\n'}
            <span className="k">{'<button'}</span> <span className="s">className</span>=<span className="c">"min-btn min-btn-ghost"</span><span className="k">{'>'}</span>Ghost<span className="k">{'</button>'}</span>
          </div>
        </Section>

        {/* Cards */}
        <Section title="03 / Cards">
          <div className="min-grid-3">
            <div className="min-card">
              <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.20em',textTransform:'uppercase',color:'#9B9B98',marginBottom:'10px'}}>+001 / Featured</div>
              <div style={{fontSize:'18px',fontWeight:800,color:'#0D0D0C',marginBottom:'8px',lineHeight:1.1}}>ECO-3D<br/>Studio</div>
              <p style={{fontSize:'12px',color:'#6B6B68',lineHeight:1.65,marginBottom:'12px'}}>Geospatial AI for env analysis and 3D floor plans.</p>
              <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>{['Next.js','YOLOv8','R3F'].map(t=><span key={t} className="min-tag">{t}</span>)}</div>
            </div>
            <div className="min-card">
              <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.20em',textTransform:'uppercase',color:'#9B9B98',marginBottom:'10px'}}>+002 / AI</div>
              <div style={{fontSize:'18px',fontWeight:800,color:'#0D0D0C',marginBottom:'8px',lineHeight:1.1}}>Multilingual<br/>RAG Pipeline</div>
              <p style={{fontSize:'12px',color:'#6B6B68',lineHeight:1.65,marginBottom:'12px'}}>Semantic search with FAISS + LangChain.</p>
              <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>{['Python','FAISS','FastAPI'].map(t=><span key={t} className="min-tag">{t}</span>)}</div>
            </div>
            <div className="min-card" style={{background:'#0D0D0C'}}>
              <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.20em',textTransform:'uppercase',color:'#6B6B68',marginBottom:'10px'}}>+003 / CTA</div>
              <div style={{fontSize:'18px',fontWeight:800,color:'#FAFAF9',marginBottom:'8px',lineHeight:1.1}}>Let's Build<br/>Something.</div>
              <p style={{fontSize:'12px',color:'#6B6B68',lineHeight:1.65,marginBottom:'12px'}}>Open to roles and interesting projects.</p>
              <button className="min-btn" style={{background:'#FAFAF9',color:'#0D0D0C',padding:'9px 20px',fontSize:'11px'}}>Contact →</button>
            </div>
          </div>
          <div style={{marginTop:'12px',maxWidth:'480px'}}>
            <div className="min-card min-card-border-l">
              <blockquote>
                <p style={{fontSize:'15px',fontWeight:500,color:'#0D0D0C',lineHeight:1.6,fontStyle:'italic'}}>"Building intelligent systems at the intersection of computer vision, NLP, and modern web architecture."</p>
                <cite style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'#9B9B98',marginTop:'8px',display:'block'}}>— Harisankar S</cite>
              </blockquote>
            </div>
          </div>
        </Section>

        {/* Stats + Progress */}
        <Section title="04 / Stats & Progress">
          <div className="min-grid-4" style={{marginBottom:'20px'}}>
            {[{l:'SIH',v:'2×',s:'National'},{l:'Projects',v:'6+',s:'Shipped'},{l:'Stack',v:'15+',s:'Tech'},{l:'Year',v:'2026',s:'Graduating'}].map(s=>(
              <div key={s.l} className="min-stat"><div className="min-stat-label">{s.l}</div><div className="min-stat-val">{s.v}</div><div className="min-stat-sub">{s.s}</div></div>
            ))}
          </div>
          <div className="min-card" style={{maxWidth:'480px'}}>
            <div className="min-label" style={{marginBottom:'16px'}}>Capabilities</div>
            {[{n:'React / Next.js',p:94},{n:'PyTorch / ML',p:82},{n:'FastAPI',p:88}].map(s=>(
              <div key={s.n} style={{marginBottom:'14px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}><span className="min-progress-name" style={{fontSize:'12px',color:'#6B6B68'}}>{s.n}</span><span style={{fontSize:'11px',fontWeight:700,color:'#0D0D0C'}}>{s.p}%</span></div>
                <div className="min-progress-track"><div className="min-progress-fill" style={{width:`${s.p}%`}}/></div>
              </div>
            ))}
          </div>
        </Section>

        {/* Graph + Table */}
        <Section title="05 / Charts & Tables">
          <div className="min-grid-2">
            <div className="min-graph-wrap">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px'}}>
                <div><div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'#9B9B98',marginBottom:'4px'}}>Monthly Visitors</div><div style={{fontSize:'26px',fontWeight:800,color:'#0D0D0C',lineHeight:1,letterSpacing:'-0.04em'}}>24.8K</div></div>
                <span style={{fontSize:'10px',fontWeight:700,color:'#1C7C52'}}>+18.4%</span>
              </div>
              <div style={{display:'flex',alignItems:'flex-end',gap:'4px',height:'48px',marginBottom:'8px'}}>
                {bars.map((v,i)=><div key={i} className={`min-bar${i===bars.length-1?' active':''}`} style={{height:`${v*0.46}px`,flex:1}}/>)}
              </div>
              <div className="min-divider"/>
            </div>
            <div className="min-card min-card-sm">
              <div className="min-label" style={{marginBottom:'12px'}}>Tech Stack</div>
              <table className="min-table">
                <thead><tr><th>Technology</th><th>Projects</th><th>Level</th></tr></thead>
                <tbody>
                  <tr><td>React</td><td>6</td><td><span className="min-badge min-badge-dark" style={{fontSize:'9px'}}>Expert</span></td></tr>
                  <tr><td>FastAPI</td><td>4</td><td><span className="min-badge min-badge-accent" style={{fontSize:'9px'}}>Advanced</span></td></tr>
                  <tr><td>PyTorch</td><td>3</td><td><span className="min-badge min-badge-outline" style={{fontSize:'9px'}}>Proficient</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* Forms */}
        <Section title="06 / Forms">
          <div className="min-grid-2">
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              {!sent ? <>
                <div><label className="min-label">Full Name</label><input className="min-input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
                <div><label className="min-label">Email</label><input className="min-input" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
                <div><label className="min-label">Message</label><textarea className="min-input" rows={3} placeholder="Your message..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/></div>
                <button className="min-btn min-btn-primary" style={{justifyContent:'center',width:'100%'}} onClick={()=>setSent(true)}>Send Message</button>
              </> : <div style={{textAlign:'center',padding:'32px 0',border:'1px solid #E5E4E0',background:'#fff'}}><div style={{fontSize:'36px',fontWeight:800,color:'#0D0D0C',letterSpacing:'-0.04em',marginBottom:'8px'}}>Sent.</div><p style={{fontSize:'11px',color:'#9B9B98',letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:'12px'}}>Thanks!</p><button className="min-btn min-btn-outline min-btn-sm" onClick={()=>{setSent(false);setForm({name:'',email:'',msg:''})}}>Reset</button></div>}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <div><label className="min-label">Interest</label><select className="min-input"><option>Full-time Role</option><option>Freelance</option><option>Collaboration</option></select></div>
              {[{l:'Open to Work',v:tog1,f:setTog1},{l:'Notifications',v:tog2,f:setTog2}].map(t=>(
                <div key={t.l} style={{display:'flex',alignItems:'center',gap:'14px',padding:'13px',background:'#fff',border:'1px solid #E5E4E0'}}>
                  <div className={`min-toggle${t.v?' on':''}`} onClick={()=>t.f(!t.v)}><div className="min-toggle-knob"/></div>
                  <span style={{fontSize:'13px',color:'#6B6B68'}}>{t.l}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="07 / Badges & Tags">
          <div className="min-row" style={{marginBottom:'10px'}}>
            <span className="min-badge min-badge-dark">Dark</span>
            <span className="min-badge min-badge-outline">Outline</span>
            <span className="min-badge min-badge-accent">Accent</span>
            <span className="min-badge min-badge-success">Success</span>
            <span className="min-badge min-badge-warn">Warning</span>
            <span className="min-badge min-badge-err">Error</span>
          </div>
          <div className="min-row">
            {['React','Next.js','Python','FastAPI','PyTorch','GSAP'].map(t=><span key={t} className="min-tag">{t}</span>)}
          </div>
        </Section>

        {/* Notifications */}
        <Section title="08 / Notifications">
          <div style={{display:'flex',flexDirection:'column',gap:'8px',maxWidth:'480px'}}>
            {[
              {cls:'min-notif-success',t:'Deployment successful',b:'ECO-3D Studio is live'},
              {cls:'',t:'New message from recruiter',b:'Insight Enterprises reached out'},
              {cls:'min-notif-warn',t:'API rate limit approaching',b:'80% of monthly quota consumed'},
              {cls:'min-notif-err',t:'Build failed',b:'TypeError: Cannot read properties'},
            ].map(n=>(
              <div key={n.t} className={`min-notif ${n.cls}`}>
                <div className="min-notif-title">{n.t}</div>
                <div className="min-notif-body">{n.b}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Avatars */}
        <Section title="09 / Avatars">
          <div className="min-row" style={{alignItems:'flex-end',marginBottom:'16px'}}>
            <div className="min-avatar min-avatar-sm">HS</div>
            <div className="min-avatar min-avatar-md">MK</div>
            <div className="min-avatar min-avatar-lg">MR</div>
            <div className="min-avatar min-avatar-md min-avatar-dark">EC</div>
          </div>
          <div className="min-card" style={{display:'flex',alignItems:'center',gap:'14px',maxWidth:'360px'}}>
            <div className="min-avatar min-avatar-lg min-avatar-dark">HS</div>
            <div><div style={{fontSize:'14px',fontWeight:800,color:'#0D0D0C',marginBottom:'4px'}}>Harisankar S</div><div style={{fontSize:'11px',color:'#6B6B68',marginBottom:'8px'}}>AI/ML Engineer</div><div style={{display:'flex',gap:'5px'}}><span className="min-badge min-badge-dark" style={{fontSize:'9px'}}>Open</span><span className="min-badge min-badge-outline" style={{fontSize:'9px'}}>MBCET '26</span></div></div>
          </div>
        </Section>

        {/* Loaders */}
        <Section title="10 / Loaders">
          <div className="min-row" style={{gap:'32px'}}>
            {[
              {l:'Ring',el:<div className="min-loader-ring"/>},
              {l:'Dots',el:<div className="min-loader-dots"><span/><span/><span/></div>},
              {l:'Bar',el:<div className="min-loader-bar"/>},
            ].map(({l,el})=>(
              <div key={l} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                {el}<span style={{fontSize:'9px',color:'#9B9B98',letterSpacing:'0.14em',textTransform:'uppercase'}}>{l}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Steps */}
        <Section title="11 / Steps">
          <div className="min-card" style={{maxWidth:'360px'}}>
            {[{n:1,t:'Fork the repository',s:'github.com/hxrrrrri',done:false},{n:2,t:'Copy component files',s:'Drop into your src/',done:false},{n:3,t:'Customise & deploy',s:'Change :root variables',done:true}].map(st=>(
              <div key={st.n} className="min-step-row">
                <div className={`min-step-num${st.done?' min-step-done':''}`}>{st.n}</div>
                <div><div style={{fontSize:'12px',fontWeight:700,color:st.done?'#9B9B98':'#0D0D0C',marginBottom:'2px'}}>{st.t}</div><div style={{fontSize:'11px',color:'#9B9B98'}}>{st.s}</div></div>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <Section title="12 / Footer">
          <div className="min-footer" style={{border:'1px solid #E5E4E0'}}>
            <div><div className="min-footer-logo">MR.K</div><div style={{fontSize:'10px',color:'#9B9B98',marginTop:'2px'}}>Harisankar S. © 2025</div></div>
            <div style={{display:'flex',gap:'18px'}}>{['Works','About','Contact'].map(l=><span key={l} className="min-footer-link">{l}</span>)}</div>
            <div style={{fontSize:'10px',color:'#B0B0AC'}}>React · Vite · GSAP</div>
          </div>
        </Section>
      </div>
    </div>
  )
}
