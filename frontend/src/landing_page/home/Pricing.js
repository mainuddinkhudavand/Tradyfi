import React from 'react';
import { Link } from 'react-router-dom';

const PLANS = [
  {
    name: 'Equity Delivery',
    amount: '₹0',
    period: 'Zero brokerage',
    desc: 'Invest in stocks and direct mutual funds for the long term with absolutely zero brokerage.',
    features: ['All NSE & BSE stocks','Direct mutual funds','ETFs & index funds','IPO applications','No hidden charges'],
    cta: 'Start Investing',
    featured: false,
    ctaId: 'price-equity',
  },
  {
    name: 'Intraday & F&O',
    amount: '₹20',
    period: 'or 0.03% — whichever is lower',
    desc: 'Flat ₹20 per executed order for intraday equity, futures & options, currency and commodity.',
    features: ['Equity intraday','Futures & Options','Currency derivatives','Commodity F&O','Advanced order types'],
    cta: 'Trade Now',
    featured: true,
    ctaId: 'price-fno',
  },
  {
    name: 'Mutual Funds',
    amount: '₹0',
    period: 'Zero commission',
    desc: 'Invest in 5000+ direct mutual funds with zero commission — more returns, your way.',
    features: ['5000+ direct funds','SIP automation','Portfolio analytics','Tax harvesting','Coin platform access'],
    cta: 'Start SIP',
    featured: false,
    ctaId: 'price-mf',
  },
];

export default function Pricing() {
  return (
    <section className="section" id="pricing-home" aria-labelledby="pricing-heading">
      <div className="blob blob-1" style={{top:'0%',left:'-15%',opacity:0.06}} aria-hidden="true"/>
      <div className="wrapper">
        <div className="text-center" style={{marginBottom:16}}>
          <div className="section-label" style={{display:'inline-flex'}}>Transparent Pricing</div>
          <h2 className="heading-lg" id="pricing-heading">
            Unbeatable <span className="grad-gold">Pricing</span>
          </h2>
          <p className="body-lg" style={{maxWidth:520,margin:'16px auto 0'}}>
            We pioneered discount broking in India. Flat fees, no hidden charges — ever.
          </p>
        </div>

        <div className="pricing-cards">
          {PLANS.map(p => (
            <div className={`price-card card-3d${p.featured ? ' featured' : ''}`} key={p.name}>
              <div className="section-label" style={{display:'inline-flex',marginBottom:12}}>
                {p.name}
              </div>
              <div className={`price-amount${p.featured ? ' grad-blue' : ''}`}>{p.amount}</div>
              <div className="price-period">{p.period}</div>
              <p className="price-desc">{p.desc}</p>
              <ul className="price-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <Link
                to="/signup"
                id={p.ctaId}
                className={`btn ${p.featured ? 'btn-primary' : 'btn-secondary'}`}
                style={{width:'100%',justifyContent:'center'}}
              >
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <p style={{textAlign:'center',marginTop:36,fontSize:13,color:'var(--text-muted)'}}>
          * All prices are inclusive of GST. Account opening is free. No AMC for first year.
          <Link to="/pricing" id="pricing-see-all" style={{color:'var(--accent-cyan)',marginLeft:8}}>See full pricing →</Link>
        </p>
      </div>
    </section>
  );
}
