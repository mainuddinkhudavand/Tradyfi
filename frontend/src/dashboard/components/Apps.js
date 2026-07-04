import React, { useState } from "react";

const APPS_DATA = [
  {
    id: "smallcase",
    name: "Smallcase",
    tagline: "Thematic investing & stock portfolios",
    desc: "Invest in diversified, professionally managed thematic baskets of stocks and ETFs matching your investment ideas.",
    icon: "💼",
    accent: "var(--accent-blue)"
  },
  {
    id: "sensibull",
    name: "Sensibull",
    tagline: "India's largest options trading platform",
    desc: "Write option strategies, analyze open interest, get option signals, and manage option chains with real-time risk charts.",
    icon: "📊",
    accent: "var(--accent-cyan)"
  },
  {
    id: "streak",
    name: "Streak",
    tagline: "Smarter algo trading for retail traders",
    desc: "Create, backtest, and deploy algorithmic trading strategies without writing a single line of code.",
    icon: "⚡",
    accent: "var(--accent-green)"
  },
  {
    id: "ditto",
    name: "Ditto Insurance",
    tagline: "Spam-free health & life insurance advice",
    desc: "Understand your policy terms, get honest advice, and purchase health and life insurance plans from major insurers.",
    icon: "🛡️",
    accent: "var(--accent-orange)"
  },
  {
    id: "goldenpi",
    name: "GoldenPi",
    tagline: "Bonds and corporate debentures",
    desc: "Earn regular fixed payouts by investing in corporate bonds, Government securities, and fixed income assets.",
    icon: "🪙",
    accent: "var(--accent-gold)"
  }
];

const Apps = () => {
  const [connections, setConnections] = useState(() => {
    const saved = localStorage.getItem("connectedApps");
    return saved ? JSON.parse(saved) : {};
  });

  const handleConnectClick = (appId) => {
    setConnections(prev => {
      const isConnected = prev[appId];
      const updated = { ...prev, [appId]: !isConnected };
      localStorage.setItem("connectedApps", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <h3 className="title">
        Partner Apps <span>{APPS_DATA.length}</span>
      </h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "28px", marginTop: "-12px", maxWidth: "600px" }}>
        Connect your Tradyfi account with premier financial products to expand your investing capabilities.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px"
      }}>
        {APPS_DATA.map((app) => {
          const isConnected = !!connections[app.id];
          return (
            <div 
              key={app.id}
              className="card-3d"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--glass-border)",
                borderRadius: "14px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = app.accent}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--glass-border)"}
            >
              {/* Header */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--glass-border)",
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {app.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>{app.name}</h4>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>{app.tagline}</span>
                </div>
              </div>

              {/* Body */}
              <p style={{
                fontSize: "12.5px",
                color: "var(--text-secondary)",
                lineHeight: "1.5",
                marginBottom: "24px",
                flex: 1
              }}>
                {app.desc}
              </p>

              {/* Action */}
              <button
                className="btn"
                style={{
                  width: "100%",
                  height: "38px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: isConnected ? "1px solid var(--accent-green)" : "1px solid var(--glass-border)",
                  background: isConnected ? "rgba(0, 245, 160, 0.08)" : "rgba(255,255,255,0.03)",
                  color: isConnected ? "var(--accent-green)" : "var(--text-primary)",
                  transition: "all 0.2s"
                }}
                onClick={() => handleConnectClick(app.id)}
              >
                {isConnected ? "✓ Connected" : "Connect Account"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Apps;
