import React from 'react';
import { Link } from 'react-router-dom';

const TRADING_ITEMS = [
  'Futures & Options','Commodity Derivatives','Currency Derivatives',
  'Stocks & IPOs','Direct Mutual Funds','Bonds & Govt. Securities',
  'ETFs','Digital Gold','REITs & InvITs',
];

export default function Awards() {
  return (
    <section className="section" id="awards" aria-labelledby="awards-heading">
      <div className="wrapper">
        <div className="awards-grid">

          {/* LEFT — decorative visual */}
          <div className="awards-img-wrap anim-fade-up">
            <div className="awards-img-bg" aria-hidden="true" />
            {/* Custom SVG broker illustration */}
            <div className="card-3d awards-visual-card">
              <svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="India's largest broker illustration" style={{ maxWidth: '100%', height: 'auto' }}>
                {/* Candle chart */}
                <rect x="30"  y="100" width="18" height="80" rx="3" fill="rgba(0,245,160,0.6)"/>
                <line x1="39" y1="85"  x2="39" y2="100" stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>
                <line x1="39" y1="180" x2="39" y2="195" stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>

                <rect x="65"  y="70"  width="18" height="100" rx="3" fill="rgba(0,245,160,0.6)"/>
                <line x1="74" y1="55"  x2="74" y2="70"  stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>
                <line x1="74" y1="170" x2="74" y2="185" stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>

                <rect x="100" y="120" width="18" height="60"  rx="3" fill="rgba(248,113,113,0.6)"/>
                <line x1="109" y1="105" x2="109" y2="120" stroke="rgba(248,113,113,0.6)" strokeWidth="2"/>
                <line x1="109" y1="180" x2="109" y2="195" stroke="rgba(248,113,113,0.6)" strokeWidth="2"/>

                <rect x="135" y="60"  width="18" height="110" rx="3" fill="rgba(0,245,160,0.6)"/>
                <line x1="144" y1="45"  x2="144" y2="60"  stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>
                <line x1="144" y1="170" x2="144" y2="190" stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>

                <rect x="170" y="90"  width="18" height="85"  rx="3" fill="rgba(0,245,160,0.6)"/>
                <line x1="179" y1="75"  x2="179" y2="90"  stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>
                <line x1="179" y1="175" x2="179" y2="195" stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>

                <rect x="205" y="40"  width="18" height="130" rx="3" fill="rgba(0,245,160,0.6)"/>
                <line x1="214" y1="25"  x2="214" y2="40"  stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>
                <line x1="214" y1="170" x2="214" y2="195" stroke="rgba(0,245,160,0.6)" strokeWidth="2"/>

                {/* Trend line */}
                <polyline
                  points="39,140 74,120 109,150 144,100 179,130 214,80"
                  stroke="url(#grad1)" strokeWidth="2.5" fill="none" strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#3d7fff"/>
                    <stop offset="100%" stopColor="#00d4ff"/>
                  </linearGradient>
                </defs>

                {/* Label */}
                <text x="140" y="225" textAnchor="middle" fill="#5a6e8a" fontSize="12" fontFamily="Inter,sans-serif">
                  India's #1 Stock Broker
                </text>
              </svg>

              {/* Stat pills */}
              <div style={{ display:'flex', justifyContent:'center', gap:16, marginTop:24 }}>
                <div className="card-3d" style={{padding:'12px 20px',textAlign:'center',minWidth:100}}>
                  <div style={{fontFamily:'Space Grotesk',fontWeight:700,fontSize:'1.5rem',color:'var(--accent-green)'}}>15%+</div>
                  <div style={{fontSize:11,color:'var(--text-muted)'}}>Daily Orders</div>
                </div>
                <div className="card-3d" style={{padding:'12px 20px',textAlign:'center',minWidth:100}}>
                  <div style={{fontFamily:'Space Grotesk',fontWeight:700,fontSize:'1.5rem',color:'var(--accent-cyan)'}}>2M+</div>
                  <div style={{fontSize:11,color:'var(--text-muted)'}}>Clients</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — copy */}
          <div className="anim-fade-up d2">
            <div className="section-label">India's Largest Broker</div>
            <h2 className="heading-lg" id="awards-heading">
              Trusted by <span className="grad-blue">2+ Million</span><br/>Investors Nationwide
            </h2>
            <p className="body-lg" style={{marginTop:20,marginBottom:36}}>
              Tradyfi clients contribute to over <strong style={{color:'var(--text-primary)'}}>15% of all retail order volumes</strong> in India
              daily — across every major asset class.
            </p>

            <div className="trade-badges">
              {TRADING_ITEMS.map(item => (
                <span className="badge" key={item}>
                  <span className="badge-dot" aria-hidden="true"/>
                  {item}
                </span>
              ))}
            </div>

            <div style={{display:'flex',gap:16,marginTop:40,flexWrap:'wrap'}}>
              <Link to="/product" id="awards-explore" className="btn btn-primary">
                Explore Products →
              </Link>
              <Link to="/pricing" id="awards-pricing" className="btn btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
