import React from 'react';

const EDU_CARDS = [
  { icon: '📚', title: 'Varsity',       desc: 'World\'s largest stock market education book — from basics to advanced.' },
  { icon: '💬', title: 'TradingQ&A',    desc: 'Most active trading community in India for all market-related queries.' },
  { icon: '🎓', title: 'Free Courses',  desc: '500+ free lessons covering technical analysis, options, and more.' },
  { icon: '📊', title: 'Market Pulse',  desc: 'Real-time market data, news, and analysis for informed decisions.' },
];

export default function Education() {
  return (
    <section className="section" id="education" style={{background:'linear-gradient(180deg,var(--bg-1) 0%,var(--bg-0) 100%)'}}>
      <div className="bg-grid" aria-hidden="true"/>
      <div className="blob blob-3" style={{bottom:'0%',right:'5%',opacity:0.08}} aria-hidden="true"/>

      <div className="wrapper">
        <div className="edu-grid">

          {/* LEFT — visual */}
          <div className="edu-img-wrap anim-fade-up">
            <div className="edu-img-glow" aria-hidden="true"/>
            <div className="card-3d" style={{padding:'40px',position:'relative',overflow:'hidden'}}>
              {/* Book / education SVG */}
              <svg width="100%" height="220" viewBox="0 0 320 220" fill="none" role="img" aria-label="Education illustration">
                {/* Screen */}
                <rect x="20" y="20" width="280" height="160" rx="12" fill="rgba(61,127,255,0.08)" stroke="rgba(61,127,255,0.2)" strokeWidth="1.5"/>
                {/* Code lines */}
                {[40,60,80,100,120,140].map((y,i) => (
                  <rect key={y} x="40" y={y} width={80 + (i%3)*40} height="8" rx="4"
                    fill={i%4===0 ? 'rgba(0,212,255,0.4)' : i%4===1 ? 'rgba(61,127,255,0.3)' : i%4===2 ? 'rgba(0,245,160,0.3)' : 'rgba(124,58,237,0.3)'}/>
                ))}
                {/* Chart mini */}
                <polyline points="180,150 200,120 220,135 240,90 260,105 280,70" stroke="#00d4ff" strokeWidth="2" fill="none"/>
                {/* Stand */}
                <rect x="140" y="180" width="40" height="10" rx="4" fill="rgba(255,255,255,0.06)"/>
                <rect x="120" y="190" width="80" height="6"  rx="3" fill="rgba(255,255,255,0.04)"/>
                {/* Text labels */}
                <text x="160" y="212" textAnchor="middle" fill="#5a6e8a" fontSize="11" fontFamily="Inter,sans-serif">Varsity Learning Platform</text>
              </svg>

              {/* Progress bars */}
              <div style={{marginTop:20}}>
                {[
                  {label:'Technical Analysis', pct:85, color:'var(--accent-blue)'},
                  {label:'Options Trading',    pct:72, color:'var(--accent-purple)'},
                  {label:'Fundamental Research',pct:90,color:'var(--accent-green)'},
                ].map(b => (
                  <div key={b.label} style={{marginBottom:14}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}>
                      <span style={{color:'var(--text-secondary)'}}>{b.label}</span>
                      <span style={{color:b.color,fontWeight:600}}>{b.pct}%</span>
                    </div>
                    <div style={{height:6,background:'var(--glass-bg)',borderRadius:999,border:'1px solid var(--glass-border)'}}>
                      <div style={{height:'100%',width:`${b.pct}%`,background:b.color,borderRadius:999,opacity:0.8}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — copy */}
          <div className="anim-fade-up d2">
            <div className="section-label">Free Education</div>
            <h2 className="heading-lg" id="edu-heading">
              Free &amp; Open<br/>
              <span className="grad-cyan" style={{background:'linear-gradient(135deg,#00d4ff,#00f5a0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                Market Education
              </span>
            </h2>
            <p className="body-lg" style={{marginTop:16,marginBottom:32}}>
              Varsity, the world's largest online stock market education platform, covers everything
              from absolute basics to advanced trading strategies — completely free.
            </p>

            <div className="edu-cards">
              {EDU_CARDS.map(c => (
                <div className="edu-card card-3d" key={c.title} style={{padding:20}}>
                  <div className="edu-card-icon">{c.icon}</div>
                  <h5 style={{fontSize:14,fontWeight:600,marginBottom:4}}>{c.title}</h5>
                  <p style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.6}}>{c.desc}</p>
                </div>
              ))}
            </div>

            <div style={{display:'flex',gap:14,marginTop:36,flexWrap:'wrap'}}>
              <a href="https://zerodha.com/varsity/" target="_blank" rel="noopener noreferrer" id="edu-varsity" className="btn btn-primary">Visit Varsity →</a>
              <a href="https://tradingqna.com" target="_blank" rel="noopener noreferrer" id="edu-tradingqa" className="btn btn-secondary">TradingQ&A →</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
