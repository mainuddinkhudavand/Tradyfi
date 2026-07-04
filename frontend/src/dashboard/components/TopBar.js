import React, { useState } from "react";
import { Link } from "react-router-dom";

/* Static index data — in production, replace with live WebSocket */
const INDICES = [
  { name: "NIFTY 50", value: "22,513.00", chg: "+0.95%", up: true },
  { name: "SENSEX",   value: "74,119.00", chg: "+1.02%", up: true },
];

const NOTIFICATIONS = [
  { id: 1, text: "🎉 Welcome to Tradyfi! Your account is active.", path: "/dashboard", time: "1 hour ago" },
  { id: 2, text: "📈 NIFTY 50 reached a new high of 22,513.00.", path: "/dashboard/holdings", time: "2 hours ago" },
  { id: 3, text: "💰 Fund Transfer of ₹50,000 successful.", path: "/dashboard/funds", time: "1 day ago" }
];

const TopBar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleSettingsClick = () => {
    window.dispatchEvent(new CustomEvent("open-settings"));
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="topbar-container" style={{ display: "flex", justifyContent: "space-between", paddingRight: "28px" }}>
      {/* Indices panel */}
      <div className="indices-container">
        {INDICES.map((idx) => (
          <div key={idx.name} className={idx.up ? "nifty" : "sensex"}>
            <p className="index">{idx.name}</p>
            <p className="index-points" style={{ color: idx.up ? "var(--accent-green)" : "var(--accent-red)" }}>
              {idx.value}
            </p>
            <p className="percent" style={{ color: idx.up ? "var(--accent-green)" : "var(--accent-red)" }}>
              {idx.chg}
            </p>
          </div>
        ))}
      </div>

      {/* Header Right Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
        <div className="search-wrap" style={{ position: "relative" }}>
          <input 
            type="text" 
            placeholder="Search stock, index, options..." 
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--glass-border)",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "12px",
              color: "var(--text-primary)",
              outline: "none",
              width: "220px",
              transition: "border-color 0.2s"
            }}
            onFocus={e => e.currentTarget.style.borderColor = "var(--accent-cyan)"}
            onBlur={e => e.currentTarget.style.borderColor = "var(--glass-border)"}
          />
        </div>
        
        <div style={{ display: "flex", gap: "16px", color: "var(--text-secondary)", position: "relative" }}>
          {/* Notification Button */}
          <button 
            style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "16px", position: "relative" }} 
            onClick={toggleNotifications}
            aria-label="Notifications"
          >
            🔔
            <span style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "6px",
              height: "6px",
              background: "var(--accent-cyan)",
              borderRadius: "50%"
            }} />
          </button>

          {/* Settings Button */}
          <button 
            style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "16px" }} 
            onClick={handleSettingsClick}
            aria-label="Settings"
          >
            ⚙️
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div 
              style={{
                position: "absolute",
                top: "130%",
                right: "32px",
                width: "280px",
                background: "var(--bg-2)",
                border: "1px solid var(--glass-border)",
                borderRadius: "10px",
                padding: "12px",
                zIndex: 200,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h4 style={{ fontSize: "12px", fontWeight: "700", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accent-cyan)" }}>
                Notifications
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", paddingLeft: 0 }}>
                {NOTIFICATIONS.map((n) => (
                  <li 
                    key={n.id} 
                    style={{ 
                      borderBottom: "1px solid rgba(255,255,255,0.03)", 
                      paddingBottom: "8px",
                      paddingTop: "6px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      borderRadius: "6px",
                      transition: "background 0.2s" 
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "var(--glass-hover)"}
                    onMouseOut={(e) => e.currentTarget.style.background = "none"}
                  >
                    <Link 
                      to={n.path} 
                      onClick={() => setIsNotificationsOpen(false)}
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      <p style={{ fontSize: "12px", color: "var(--text-primary)", lineHeight: "1.4", margin: 0 }}>{n.text}</p>
                      <span style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "2px", display: "block" }}>{n.time}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
