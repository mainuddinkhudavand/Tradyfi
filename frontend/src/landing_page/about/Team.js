import React from "react";

function Team() {
  return (
    <div className="section anim-fade-up d1">
      <div className="wrapper">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label">Our Leadership</div>
          <h2 className="heading-lg">People behind the vision</h2>
        </div>

        <div className="grid-2" style={{ gap: "40px" }}>
          <div className="card-3d flex-center" style={{ padding: "40px", flexDirection: "column", textAlign: "center" }}>
            <div style={{ position: "relative", width: "220px", height: "220px", marginBottom: "28px" }}>
              <div className="logo-mark" style={{ position: "absolute", inset: "-4px", borderRadius: "50%", zIndex: 0 }} />
              <img
                src="/media/images/nithinKamath.jpg"
                alt="Nithin Kamath - Founder & CEO of Tradyfi"
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 1,
                  border: "4px solid var(--bg-1)"
                }}
              />
            </div>
            <h4 className="heading-md" style={{ color: "var(--text-primary)" }}>Nithin Kamath</h4>
            <p className="body-sm" style={{ color: "var(--accent-cyan)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>Founder, CEO</p>
          </div>

          <div className="card-3d" style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p className="body-lg" style={{ marginBottom: "20px" }}>
              Nithin bootstrapped and founded Tradyfi in 2010 to overcome the
              hurdles he faced during his decade long stint as a trader. Today,
              Tradyfi has changed the landscape of the Indian broking industry.
            </p>
            <p className="body-md" style={{ marginBottom: "20px" }}>
              He is a member of the SEBI Secondary Market Advisory Committee
              (SMAC) and the Market Data Advisory Committee (MDAC).
            </p>
            <p className="body-md" style={{ marginBottom: "28px", fontStyle: "italic", color: "var(--text-muted)" }}>
              Playing basketball is his zen.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="/" className="btn btn-ghost btn-sm" style={{ padding: "8px 16px" }}>
                Homepage
              </a>
              <a href="https://tradingqna.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ padding: "8px 16px" }}>
                TradingQnA
              </a>
              <a href="https://twitter.com/nithinkamath" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ padding: "8px 16px" }}>
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
