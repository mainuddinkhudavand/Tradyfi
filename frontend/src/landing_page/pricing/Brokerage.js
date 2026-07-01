import React from "react";

function Brokerage() {
  return (
    <div className="section-sm anim-fade-up d2">
      <div className="wrapper">
        <div className="grid-2" style={{ alignItems: "stretch" }}>
          
          {/* Left: Additional Charges List */}
          <div className="card-3d" style={{ padding: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 className="heading-md grad-blue">Charges &amp; Guidelines</h3>
              <a href="https://zerodha.com/brokerage-calculator/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                Brokerage Calculator
              </a>
            </div>
            <ul
              style={{
                listStyleType: "none",
                lineHeight: "1.9",
                fontSize: "13.5px",
                color: "var(--text-secondary)",
                paddingLeft: 0
              }}
            >
              {[
                "Call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.",
                "Digital contract notes will be sent via e-mail.",
                "Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply.",
                "For NRI account (non-PIS), 0.5% or ₹100 per executed order for equity (whichever is lower).",
                "For NRI account (PIS), 0.5% or ₹200 per executed order for equity (whichever is lower).",
                "If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order."
              ].map((text, idx) => (
                <li key={idx} style={{ display: "flex", gap: "12px", marginBottom: "14px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}>▪</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: List of Charges link card */}
          <div className="card-3d flex-center" style={{ padding: "40px", flexDirection: "column", textAlign: "center", background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(61,127,255,0.02) 100%)" }}>
            <h3 className="heading-md" style={{ marginBottom: "16px" }}>Detailed Charges List</h3>
            <p className="body-md" style={{ color: "var(--text-muted)", marginBottom: "32px", maxWidth: "320px" }}>
              Review the complete breakdown of transaction charges, STT, GST, stamp duties, and regulatory fees.
            </p>
            <a href="https://zerodha.com/charges/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              📖 View List of Charges
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Brokerage;
