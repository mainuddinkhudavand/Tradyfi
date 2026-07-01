import React from "react";
import { Link } from "react-router-dom";

const PARTNERS = [
  { name: "Smallcase", desc: "Thematic investment platform", details: "Invest in customized, diversified portfolios of stocks or ETFs centered around specific ideas, sectors, or trends." },
  { name: "Streak", desc: "Algo & systematic trading", details: "Design, backtest, and deploy algorithmic trading strategies in minutes without writing a single line of code." },
  { name: "Sensibull", desc: "Options trading platform", details: "The ultimate options trading suite. Analyze option chains, model strategies, and manage risk with ease." },
  { name: "GoldenPI", desc: "Bonds & fixed income investments", details: "Access high-yield corporate bonds, government bonds, and debentures directly online with ease." },
  { name: "Ditto", desc: "Spam-free insurance advice", details: "Get personalized, spam-free guidance on choosing and buying health and term insurance policies." },
  { name: "Tijori", desc: "Fundamental research & analysis", details: "Perform in-depth fundamental analysis. Track revenues, track sector metrics, and compare stocks." },
];

function Universe() {
  return (
    <div className="section anim-fade-up d1" id="universe">
      <div className="wrapper">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label">Ecosystem Partners</div>
          <h2 className="heading-lg" style={{ marginBottom: "16px" }}>The Tradyfi Universe</h2>
          <p className="body-lg" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Extend your trading and investment experience even further with our premier partner platforms.
          </p>
        </div>

        <div className="grid-3" style={{ gap: "24px" }}>
          {PARTNERS.map((p, idx) => (
            <div className="card-3d" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", minHeight: "240px" }} key={p.name}>
              {/* Partner Header Icon mockup */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(61,127,255,0.15), rgba(124,58,237,0.15))",
                border: "1px solid rgba(61,127,255,0.2)",
                display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
                fontWeight: "800", fontSize: "18px", color: "var(--accent-cyan)", marginBottom: "20px"
              }}>
                {p.name.charAt(0)}
              </div>
              
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>{p.name}</h3>
              <div style={{ fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent-green)", marginTop: "4px", marginBottom: "14px" }}>
                {p.desc}
              </div>
              <p className="body-sm" style={{ flexGrow: 1 }}>{p.details}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Create a Tradyfi Account Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Universe;
