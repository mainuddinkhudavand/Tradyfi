import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`zp-nav${solid || menuOpen ? ' solid' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">

        {/* ── Logo ── */}
        <Link to="/" className="nav-logo" id="nav-logo" onClick={() => setMenuOpen(false)}>
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

        {/* ── Hamburger Menu Button (Mobile Only) ── */}
        <button 
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 1001
          }}
        >
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
        </button>

        {/* ── Mobile Drawer (Overlay) ── */}
        {menuOpen && (
          <div 
            className="nav-mobile-overlay"
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(2, 6, 17, 0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 28px',
              gap: '24px',
              zIndex: 1000,
              animation: 'fade-in 0.3s ease'
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px', padding: 0 }}>
              {[
                { label: 'Products', to: '/product'  },
                { label: 'Pricing',  to: '/pricing'  },
                { label: 'About',    to: '/about'    },
                { label: 'Support',  to: '/support'  },
              ].map(({ label, to }) => (
                <li key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                  <Link 
                    to={to} 
                    onClick={() => setMenuOpen(false)} 
                    style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
              <Link 
                to="/login" 
                onClick={() => setMenuOpen(false)} 
                className="btn btn-ghost" 
                style={{ justifyContent: 'center', padding: '12px', fontSize: '16px' }}
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                onClick={() => setMenuOpen(false)} 
                className="btn btn-primary" 
                style={{ justifyContent: 'center', padding: '12px', fontSize: '16px' }}
              >
                Open Account →
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
