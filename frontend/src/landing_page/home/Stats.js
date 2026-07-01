import React from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD_URL } from '../../config';

const TRUST_STATS = [
  { value: '1.3Cr+', label: 'Active Clients',    grad: 'grad-green' },
  { value: '₹3.5L Cr',label: 'Assets Under Care',grad: 'grad-blue'  },
  { value: '99.9%',  label: 'Platform Uptime',   grad: 'grad-blue'  },
  { value: '30+',    label: 'Fintech Startups',  grad: 'grad-gold'  },
];

const FEATURES = [
  { icon: '🛡️', title: 'Customer-first, always',
    desc: '1.3+ crore customers trust Tradyfi with ₹3.5+ lakh crores worth of equity investments.' },
  { icon: '🚫', title: 'No spam or gimmicks',
    desc: 'No gamification or annoying push notifications. High-quality apps you use at your pace.' },
  { icon: '🌐', title: 'The Tradyfi universe',
    desc: 'Not just an app — a whole ecosystem. 30+ fintech startups offer tailored services.' },
  { icon: '📈', title: 'Do better with money',
    desc: 'With Nudge and Kill Switch, we actively help you make smarter decisions with your money.' },
];

export default function Stats() {
  return (
    <section className="section" id="trust" style={{background:'linear-gradient(180deg, var(--bg-0) 0%, var(--bg-1) 100%)'}}>
      {/* Background grid */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="blob blob-2" style={{top:'20%',right:'-10%'}} aria-hidden="true"/>

      <div className="wrapper">
        <div className="trust-grid">

          {/* LEFT — stats + features */}
          <div>
            <div className="section-label">Why Tradyfi</div>
            <h2 className="heading-lg" id="trust-heading">
              Trust With <span className="grad-blue">Confidence</span>
            </h2>
            <p className="body-lg" style={{marginTop:16,marginBottom:40}}>
              We've been building India's most trusted brokerage platform since 2010.
            </p>

            <div className="features-list">
              {FEATURES.map(f => (
                <div className="feat-item" key={f.title}>
                  <div className="feat-icon" aria-hidden="true">{f.icon}</div>
                  <div className="feat-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — stat cards */}
          <div>
            <div className="trust-stats-side">
              {TRUST_STATS.map(s => (
                <div className="trust-stat-card card-3d" key={s.label}>
                  <div className={`tsc-value ${s.grad}`}>{s.value}</div>
                  <div className="tsc-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mini ecosystem card */}
            <div className="card-3d" style={{padding:'28px',marginTop:24}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <span style={{fontSize:24}}>🚀</span>
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>Kite Trading Platform</div>
                  <div style={{fontSize:12,color:'var(--text-muted)'}}>Award-winning UI · 2M+ daily users</div>
                </div>
              </div>

              {/* Mini sparkline */}
              <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none" role="img" aria-label="Platform growth chart">
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#3d7fff" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#3d7fff" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,55 L30,48 L60,40 L90,45 L120,30 L150,35 L180,20 L210,25 L240,12 L270,15 L300,5" stroke="#3d7fff" strokeWidth="2" fill="none"/>
                <path d="M0,55 L30,48 L60,40 L90,45 L120,30 L150,35 L180,20 L210,25 L240,12 L270,15 L300,5 L300,60 L0,60 Z" fill="url(#sparkGrad)"/>
              </svg>

              <div style={{display:'flex',gap:16,marginTop:16}}>
                <Link to="/product" id="stats-products" className="btn btn-primary btn-sm">Explore Products</Link>
                <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" id="stats-demo" className="btn btn-ghost btn-sm">Try Kite Demo</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
