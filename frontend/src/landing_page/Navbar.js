import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`zp-nav${solid ? ' solid' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">

        {/* ── Logo ── */}
        <Link to="/" className="nav-logo" id="nav-logo">
          <div className="logo-mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 19L11 3L19 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 13H16" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="11" cy="11" r="3" fill="none" stroke="#00f5a0" strokeWidth="1.5"/>
            </svg>
          </div>
          <span className="logo-name">Tradyfi<span>Pro</span></span>
        </Link>

        {/* ── Links ── */}
        <ul className="nav-links">
          {[
            { label: 'Products', to: '/product'  },
            { label: 'Pricing',  to: '/pricing'  },
            { label: 'About',    to: '/about'    },
            { label: 'Support',  to: '/support'  },
          ].map(({ label, to }) => (
            <li key={label}><Link to={to} id={`nav-${label.toLowerCase()}`}>{label}</Link></li>
          ))}
        </ul>

        {/* ── Actions ── */}
        <div className="nav-actions">
          <Link to="/login" id="nav-login" className="btn btn-ghost btn-sm">Log in</Link>
          <Link to="/signup" id="nav-signup" className="btn btn-primary btn-sm">
            Open Account →
          </Link>
        </div>
      </div>
    </nav>
  );
}
