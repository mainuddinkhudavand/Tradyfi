import React from 'react';
import { Link } from 'react-router-dom';
import HeroCanvas from './HeroCanvas';
import { DASHBOARD_URL } from '../../config';

/* ── Fake chart bars data ── */
const BARS = [
  { h: 45, up: true  }, { h: 62, up: true  }, { h: 38, up: false },
  { h: 75, up: true  }, { h: 58, up: true  }, { h: 90, up: true  },
  { h: 68, up: false }, { h: 85, up: true  }, { h: 72, up: true  },
  { h: 95, up: true  }, { h: 60, up: false }, { h: 88, up: true  },
];

/* ── Ticker data (doubled for seamless loop) ── */
const TICKERS = [
  { name: 'RELIANCE', price: '2,943.55', chg: '+1.24%', up: true  },
  { name: 'TCS',      price: '3,812.10', chg: '+0.87%', up: true  },
  { name: 'INFY',     price: '1,524.30', chg: '-0.43%', up: false },
  { name: 'HDFCBANK', price: '1,672.60', chg: '+2.10%', up: true  },
  { name: 'WIPRO',    price: '   438.70', chg: '-0.71%', up: false },
  { name: 'NIFTY50',  price: '22,513.00',chg: '+0.95%', up: true  },
  { name: 'SENSEX',   price: '74,119.00',chg: '+1.02%', up: true  },
  { name: 'BAJFINANCE',price:'6,928.40', chg: '+1.56%', up: true  },
];
const DOUBLE_TICKERS = [...TICKERS, ...TICKERS];

export default function Hero() {
  return (
    <>
      {/* ════ 3D HERO ════ */}
      <section className="hero" id="hero" aria-label="Hero section">

        {/* Three.js canvas */}
        <div className="hero-canvas-wrap">
          <HeroCanvas />
        </div>

        {/* Gradient overlay */}
        <div className="hero-gradient-overlay" aria-hidden="true" />

        {/* Content */}
        <div className="hero-content">

          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-eyebrow anim-fade-up d1" aria-label="Status">
              <span className="live-dot" aria-hidden="true" />
              Live Markets Open · NSE &amp; BSE
            </div>

            <h1 className="hero-title anim-fade-up d2">
              Invest in <br/>
              <span className="grad-blue">Everything</span> <br/>
              That Matters
            </h1>

            <p className="hero-sub anim-fade-up d3">
              India's #1 discount broker. Trade stocks, F&amp;O, mutual funds,
              ETFs &amp; bonds — at ₹0 delivery &amp; flat ₹20 per order.
            </p>

            <div className="hero-actions anim-fade-up d4">
              <Link to="/signup" id="hero-cta-primary" className="btn btn-primary btn-lg">
                🚀 Open Free Account
              </Link>
              <a href={DASHBOARD_URL} id="hero-cta-demo" className="btn btn-secondary btn-lg">
                Explore Platform
              </a>
            </div>

            <div className="hero-kpis anim-fade-up d5">
              <div className="kpi-item">
                <div className="kpi-value grad-green">1.3Cr+</div>
                <div className="kpi-label">Active Clients</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-value grad-blue">₹3.5L Cr</div>
                <div className="kpi-label">Assets Managed</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-value" style={{color:'var(--accent-gold)'}}>15%+</div>
                <div className="kpi-label">Daily Order Volume</div>
              </div>
            </div>
          </div>

          {/* RIGHT — chart card */}
          <div className="hero-right anim-fade-up d3">
            <div className="hero-chart-card card-3d" aria-label="Live chart preview">
              <div className="chart-header">
                <div>
                  <div className="chart-ticker">NIFTY 50</div>
                  <div className="chart-change">▲ +213 (+0.95%)</div>
                </div>
                <div className="chart-price grad-green">22,513</div>
              </div>
              <div className="chart-bars" role="img" aria-label="Price chart">
                {BARS.map((b, i) => (
                  <div
                    key={i}
                    className={`c-bar ${b.up ? 'up' : 'down'}`}
                    style={{ height: `${b.h}%`, animationDelay: `${i * 0.06}s` }}
                  />
                ))}
              </div>

              {/* x-axis labels */}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, fontSize:10, color:'var(--text-muted)' }}>
                {['9:15','10:00','11:00','12:00','13:00','14:00','15:00','15:30'].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Floating cards */}
            <div className="float-card fc1">
              <div className="float-card-label">Portfolio P&amp;L</div>
              <div className="float-card-value grad-green">+₹14,238</div>
            </div>
            <div className="float-card fc2">
              <div className="float-card-label">Today's Volume</div>
              <div className="float-card-value" style={{color:'var(--accent-cyan)'}}>₹2.1 Cr</div>
            </div>
            <div className="float-card fc3">
              <div className="float-card-label">Open Positions</div>
              <div className="float-card-value" style={{color:'var(--text-primary)'}}>8 Active</div>
            </div>
          </div>

        </div>
      </section>

      {/* ════ TICKER BAR ════ */}
      <div className="ticker-wrap" aria-label="Live stock ticker">
        <div className="ticker-track">
          {DOUBLE_TICKERS.map((t, i) => (
            <div className="t-item" key={i}>
              <span className="t-name">{t.name}</span>
              <span className="t-price">{t.price}</span>
              <span className={t.up ? 't-up' : 't-down'}>{t.chg}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
