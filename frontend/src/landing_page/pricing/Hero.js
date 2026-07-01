import React from "react";

function Hero() {
  return (
    <div className="section anim-fade-up">
      <div className="wrapper">
        <div style={{ textAlign: "center", marginBottom: "80px", marginTop: "40px" }}>
          <div className="section-label">Pricing Plans</div>
          <h1 className="heading-xl grad-blue" style={{ marginBottom: "16px" }}>Pricing</h1>
          <p className="body-lg" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Free equity investments and flat ₹20 intraday and F&amp;O trades. Simple, transparent pricing structure.
          </p>
        </div>

        <div className="grid-3" style={{ marginTop: "40px" }}>
          {/* Equity */}
          <div className="card-3d text-center" style={{ padding: "44px 36px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(61,127,255,0.1))",
              display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
              marginBottom: "24px", border: "1px solid rgba(0,212,255,0.2)"
            }}>
              <img src="/media/images/pricingEquity.svg" alt="Equity delivery icon" style={{ width: "40px", height: "40px" }} />
            </div>
            <h3 className="heading-md" style={{ marginBottom: "16px" }}>Free equity delivery</h3>
            <p className="body-md" style={{ flexGrow: 1 }}>
              All equity delivery investments (NSE, BSE), are absolutely free — ₹0 brokerage.
            </p>
            <div className="price-amount" style={{ marginTop: "24px" }}>
              <span className="grad-green">₹0</span>
            </div>
            <p className="price-period">Commission / Brokerage</p>
          </div>

          {/* Intraday */}
          <div className="card-3d text-center featured" style={{ padding: "44px 36px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(61,127,255,0.15))",
              display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
              marginBottom: "24px", border: "1px solid rgba(124,58,237,0.3)"
            }}>
              <img src="/media/images/intradayTrades.svg" alt="Intraday trades icon" style={{ width: "40px", height: "40px" }} />
            </div>
            <h3 className="heading-md" style={{ marginBottom: "16px" }}>Intraday &amp; F&amp;O</h3>
            <p className="body-md" style={{ flexGrow: 1 }}>
              Flat Rs. 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades.
            </p>
            <div className="price-amount" style={{ marginTop: "24px" }}>
              <span className="grad-blue">₹20</span>
            </div>
            <p className="price-period">Max per executed order</p>
          </div>

          {/* Mutual Funds */}
          <div className="card-3d text-center" style={{ padding: "44px 36px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(61,127,255,0.1))",
              display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
              marginBottom: "24px", border: "1px solid rgba(0,212,255,0.2)"
            }}>
              <img src="/media/images/pricingEquity.svg" alt="Mutual funds icon" style={{ width: "40px", height: "40px" }} />
            </div>
            <h3 className="heading-md" style={{ marginBottom: "16px" }}>Free direct MF</h3>
            <p className="body-md" style={{ flexGrow: 1 }}>
              All direct mutual fund investments are absolutely free — ₹0 commissions &amp; DP charges.
            </p>
            <div className="price-amount" style={{ marginTop: "24px" }}>
              <span className="grad-green">₹0</span>
            </div>
            <p className="price-period">Commissions &amp; charges</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
