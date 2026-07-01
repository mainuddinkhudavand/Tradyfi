import React from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD_URL } from '../config';

const NAV_LINKS = {
  Company: [
    { label:'About',              to:'/about'   },
    { label:'Products',           to:'/product' },
    { label:'Pricing',            to:'/pricing' },
    { label:'Referral Programme', to:'#'        },
    { label:'Careers',            to:'#'        },
    { label:'Press & Media',      to:'#'        },
  ],
  Support: [
    { label:'Contact',            to:'/support' },
    { label:'Support Portal',     to:'/support' },
    { label:'Z-Connect Blog',     to:'#'        },
    { label:'List of Charges',    to:'/pricing' },
    { label:'Downloads',          to:'#'        },
  ],
  Account: [
    { label:'Open an Account',    to:'/signup'  },
    { label:'Fund Transfer',      to:'#'        },
    { label:'60-Day Challenge',   to:'#'        },
    { label:'Kite Demo',          to: DASHBOARD_URL },
  ],
};

export default function Footer() {
  return (
    <footer className="zp-footer" role="contentinfo" aria-label="Site footer">

      {/* Top grid */}
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="nav-logo" style={{textDecoration:'none',display:'inline-flex'}}>
            <div className="logo-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 19L11 3L19 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 13H16" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="11" cy="11" r="3" fill="none" stroke="#00f5a0" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className="logo-name" style={{marginLeft:10}}>Tradyfi<span>Pro</span></span>
          </Link>
          <p>
            India's largest discount broker, helping over 1.3 crore investors trade smarter since 2010.
            SEBI registered · NSE &amp; BSE member.
          </p>
          {/* Social */}
          <div className="footer-social" aria-label="Social media links">
            {[
              {icon:'𝕏', label:'Twitter', id:'footer-twitter', url:'https://twitter.com/tradyfi'},
              {icon:'in',label:'LinkedIn',id:'footer-linkedin', url:'https://linkedin.com/company/tradyfi'},
              {icon:'▶', label:'YouTube', id:'footer-youtube', url:'https://youtube.com/tradyfi'},
              {icon:'f', label:'Facebook',id:'footer-facebook', url:'https://facebook.com/tradyfi'},
            ].map(s => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="social-btn" id={s.id} aria-label={s.label} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(NAV_LINKS).map(([section, links]) => (
          <div className="footer-col" key={section}>
            <h6>{section}</h6>
            {links.map(l => {
              const isExternal = l.to.startsWith("http") || l.to.startsWith("#");
              const id = `footer-${l.label.toLowerCase().replace(/\s+/g,'-')}`;
              if (isExternal) {
                return (
                  <a href={l.to} key={l.label} id={id}>
                    {l.label}
                  </a>
                );
              }
              return (
                <Link to={l.to} key={l.label} id={id}>
                  {l.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p className="footer-disclaimer">
          <strong>Tradyfi Broking Ltd.</strong>: Member of NSE &amp; BSE — SEBI Registration no.: INZ000031633.
          CDSL: Depository services through Tradyfi Securities Pvt. Ltd. — SEBI Registration no.: IN-DP-100-2015.
          Commodity Trading through Tradyfi Commodities Pvt. Ltd. MCX: 46025 — SEBI Registration no.: INZ000038238.
          Registered Address: #153/154, 4th Cross, Dollars Colony, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India.
        </p>
        <p className="footer-disclaimer">
          Investments in securities market are subject to market risks; read all related documents carefully before investing.
          "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers."
        </p>
        <div className="footer-copy">
          <span>© 2010 – {new Date().getFullYear()} Tradyfi Broking Ltd. All rights reserved.</span>
          <div style={{display:'flex',gap:20}}>
            <a href="https://tradyfi.pro/privacy" target="_blank" rel="noopener noreferrer" id="footer-privacy" style={{color:'var(--text-muted)',fontSize:12,transition:'color 0.2s'}}
               onMouseOver={e=>e.target.style.color='var(--accent-cyan)'}
               onMouseOut={e=>e.target.style.color='var(--text-muted)'}>Privacy Policy</a>
            <a href="https://tradyfi.pro/terms" target="_blank" rel="noopener noreferrer" id="footer-terms" style={{color:'var(--text-muted)',fontSize:12,transition:'color 0.2s'}}
               onMouseOver={e=>e.target.style.color='var(--accent-cyan)'}
               onMouseOut={e=>e.target.style.color='var(--text-muted)'}>Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
