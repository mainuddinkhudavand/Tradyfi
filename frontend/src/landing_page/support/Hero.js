import React from "react";

function Hero() {
  return (
    <div className="section anim-fade-up" style={{ background: "linear-gradient(135deg, #020611 0%, #060d1f 100%)", borderBottom: "1px solid var(--glass-border)", padding: "120px 0 80px" }}>
      <div className="wrapper">
        
        {/* Support Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div className="section-label" style={{ marginBottom: "12px" }}>Help &amp; Support</div>
            <h1 className="heading-md" style={{ color: "var(--text-primary)" }}>Support Portal</h1>
          </div>
          <a href="https://support.zerodha.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            Track Tickets
          </a>
        </div>

        {/* Support Grid */}
        <div className="grid-2" style={{ gap: "48px", alignItems: "start" }}>
          
          {/* Search bar & quick links */}
          <div className="card-3d" style={{ padding: "36px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", color: "var(--text-primary)" }}>
              Search for answers or browse topics
            </h2>
            <div style={{ position: "relative", marginBottom: "24px" }}>
              <input 
                type="text" 
                placeholder="Eg. how do I activate F&O, margin requirements..." 
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  outline: "none",
                  transition: "var(--transition)"
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = "var(--accent-blue)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(61,127,255,0.2)";
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                { label: "Track account opening", url: "https://signup.zerodha.com/status" },
                { label: "Track segment activation", url: "https://support.zerodha.com/category/your-zerodha-account/your-profile/segment-activation" },
                { label: "Intraday margins", url: "https://zerodha.com/margin-calculator/" },
                { label: "Kite user manual", url: "https://kite.trade/docs/kite/" }
              ].map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="badge" 
                  style={{ textDecoration: "none", fontSize: "12px" }}
                >
                  <span className="badge-dot" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Featured articles */}
          <div className="card-3d" style={{ padding: "36px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "var(--accent-gold)" }}>★</span> Featured Articles
            </h2>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {[
                { label: "Current Corporate Actions: Takeovers & Delisting - June 2026", url: "https://support.zerodha.com/category/trading-and-markets/corporate-actions" },
                { label: "Latest Intraday leverage updates - MIS & CO limits", url: "https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-types" },
                { label: "Important: SEBI guidelines on nomination updates", url: "https://support.zerodha.com/category/your-zerodha-account/nomination" }
              ].map((art, idx) => (
                <li key={idx} style={{ marginBottom: "16px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}>→</span>
                  <a 
                    href={art.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      color: "var(--text-secondary)", 
                      fontSize: "14.5px", 
                      lineHeight: "1.5", 
                      transition: "color 0.2s" 
                    }}
                    onMouseOver={e=>e.currentTarget.style.color="var(--accent-cyan)"}
                    onMouseOut={e=>e.currentTarget.style.color="var(--text-secondary)"}
                  >
                    {art.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;
