import React from 'react';
import { Link } from 'react-router-dom';

const STEPS = [
  { num: '01', icon: '📋', title: 'Fill the form',     desc: 'Enter your basic details. Takes less than 5 minutes.' },
  { num: '02', icon: '📄', title: 'KYC verification',  desc: 'Upload your PAN & Aadhaar. 100% digital process.' },
  { num: '03', icon: '✅', title: 'Account activated', desc: 'Start trading on the same day — no paper work.' },
];

export default function OpenAccount() {
  return (
    <section className="section cta-section" id="open-account" aria-labelledby="cta-heading">
      <div className="cta-glow-1" aria-hidden="true"/>
      <div className="cta-glow-2" aria-hidden="true"/>
      <div className="bg-grid" aria-hidden="true"/>

      <div className="wrapper cta-inner">
        <div className="section-label" style={{display:'inline-flex'}}>Get Started Today</div>
        <h2 className="heading-lg" id="cta-heading">
          Open a Tradyfi Account<br/>
          <span className="grad-blue">in 10 Minutes</span>
        </h2>
        <p className="body-lg" style={{maxWidth:500,margin:'20px auto 0'}}>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&amp;O trades.
          100% online. No physical paperwork.
        </p>

        {/* Steps */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,margin:'52px 0',textAlign:'left'}}>
          {STEPS.map(s => (
            <div className="card-3d" style={{padding:'32px 28px'}} key={s.num}>
              <div style={{
                width:44,height:44,borderRadius:12,
                background:'linear-gradient(135deg,rgba(61,127,255,0.15),rgba(124,58,237,0.15))',
                border:'1px solid rgba(61,127,255,0.2)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:20,marginBottom:16,
              }}>
                {s.icon}
              </div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:'var(--accent-cyan)',marginBottom:8}}>
                STEP {s.num}
              </div>
              <h4 style={{fontWeight:600,fontSize:16,marginBottom:8}}>{s.title}</h4>
              <p style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.6}}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="cta-actions">
          <Link to="/signup" id="cta-open" className="btn btn-primary btn-lg">
            🚀 Open Free Account Now
          </Link>
          <Link to="/pricing" id="cta-pricing" className="btn btn-secondary btn-lg">
            View All Pricing
          </Link>
        </div>
        <p className="cta-note">
          ✓ Free account opening &nbsp;·&nbsp; ✓ No minimum balance &nbsp;·&nbsp; ✓ SEBI regulated
        </p>
      </div>
    </section>
  );
}
