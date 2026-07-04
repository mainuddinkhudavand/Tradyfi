import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const navigate = useNavigate();

  // States for user profile data & financial stats
  const [profileData, setProfileData] = useState({
    username: localStorage.getItem("username") || "Demo Trader",
    clientId: localStorage.getItem("clientId") || "TS-394851",
    email: localStorage.getItem("userEmail") || "trader@tradyfi.pro",
    phone: localStorage.getItem("userPhone") || "+91 98765 43210",
    totalDeposits: 100000.00,
    totalWithdrawals: 0.00,
    totalTrades: 18,
    netPnl: 3740.00
  });

  const [avatarImage, setAvatarImage] = useState(() => {
    return localStorage.getItem("avatarImage") || null;
  });

  useEffect(() => {
    const handleOpenSettings = () => {
      setSettingsModalOpen(true);
    };
    window.addEventListener("open-settings", handleOpenSettings);
    return () => window.removeEventListener("open-settings", handleOpenSettings);
  }, []);

  // Sync profileData dynamically from server on modal open
  useEffect(() => {
    if (profileModalOpen) {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      axios.get(`${BACKEND_URL}/verify`, { headers })
        .then(res => {
          if (res.data.success) {
            setProfileData({
              username: res.data.user.username,
              clientId: res.data.user.clientId,
              email: res.data.user.email,
              phone: res.data.user.phone,
              totalDeposits: res.data.user.totalDeposits || 100000.00,
              totalWithdrawals: res.data.user.totalWithdrawals || 0.00,
              totalTrades: res.data.user.totalTrades || 18,
              netPnl: res.data.user.netPnl || 3740.00
            });
          }
        })
        .catch(err => {
          console.error("Error syncing profile details:", err);
          // Fallback to localStorage if server is unreachable
          setProfileData(prev => ({
            ...prev,
            username: localStorage.getItem("username") || prev.username,
            clientId: localStorage.getItem("clientId") || prev.clientId,
            email: localStorage.getItem("userEmail") || prev.email,
            phone: localStorage.getItem("userPhone") || prev.phone
          }));
        });
    }
  }, [profileModalOpen]);

  // Sync selected menu based on current window location
  useEffect(() => {
    const path = window.location.pathname;
    if (path.endsWith("/orders")) setSelectedMenu(1);
    else if (path.endsWith("/holdings")) setSelectedMenu(2);
    else if (path.endsWith("/positions")) setSelectedMenu(3);
    else if (path.endsWith("/funds")) setSelectedMenu(4);
    else if (path.endsWith("/apps")) setSelectedMenu(5);
    else setSelectedMenu(0);

    // Auto-close mobile navigation drawer on menu click / redirect
    window.dispatchEvent(new CustomEvent("close-mobile-sidebar"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  // States for settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("userSettings");
    return saved ? JSON.parse(saved) : {
      darkMode: true,
      notifications: true,
      charting: true,
      doubleTap: false
    };
  });

  const getInitials = (name) => {
    if (!name) return "US";
    const parts = name.trim().split(/[\s-_]+/);
    if (parts.length >= 2) {
      return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleMyProfileClick = (e) => {
    e.stopPropagation();
    setProfileModalOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    setSettingsModalOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const handleLogoutClick = (e) => {
    e.stopPropagation();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("clientId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("avatarImage");
    navigate("/login");
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("avatarImage", reader.result);
        setAvatarImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarRemove = (e) => {
    e.stopPropagation();
    localStorage.removeItem("avatarImage");
    setAvatarImage(null);
  };

  const handleProfileFieldChange = (key, value) => {
    setProfileData(prev => {
      const updated = { ...prev, [key]: value };
      if (key === "username") {
        localStorage.setItem("username", value);
      } else if (key === "clientId") {
        localStorage.setItem("clientId", value);
      } else if (key === "email") {
        localStorage.setItem("userEmail", value);
      } else if (key === "phone") {
        localStorage.setItem("userPhone", value);
      }
      return updated;
    });
  };

  const toggleSetting = (key) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("userSettings", JSON.stringify(updated));
      return updated;
    });
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", index: 0 },
    { label: "Orders", path: "/dashboard/orders", index: 1 },
    { label: "Holdings", path: "/dashboard/holdings", index: 2 },
    { label: "Positions", path: "/dashboard/positions", index: 3 },
    { label: "Funds", path: "/dashboard/funds", index: 4 },
    { label: "Apps", path: "/dashboard/apps", index: 5 },
  ];

  const modalInputStyle = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--glass-border)",
    borderRadius: "8px",
    padding: "8px 12px",
    color: "var(--text-primary)",
    fontSize: "13px",
    outline: "none",
    marginTop: "4px",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s"
  };

  const labelStyle = {
    display: "block",
    fontSize: "10px",
    fontWeight: "700",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  return (
    <div className="menu-container">
      {/* Tradyfi Logo */}
      <Link to="/" className="ts-logo-link" aria-label="Tradyfi Home">
        <div className="ts-logo-mark" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M3 19L11 3L19 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 13H16" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="11" cy="11" r="3" fill="none" stroke="#00f5a0" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="ts-logo-text">Tradyfi</span>
      </Link>

      <div className="menus">
        <ul>
          {menuItems.map((item) => (
            <li key={item.index}>
              <Link
                style={{ textDecoration: "none" }}
                to={item.path}
                onClick={() => handleMenuClick(item.index)}
              >
                <p className={selectedMenu === item.index ? activeMenuClass : menuClass}>
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar" style={{ overflow: "hidden", padding: 0 }}>
            {avatarImage ? (
              <img src={avatarImage} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              getInitials(profileData.username)
            )}
          </div>
          <p className="username" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "120px" }}>
            {profileData.username}
          </p>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
              <ul>
                <li onClick={handleMyProfileClick}>My Profile</li>
                <li onClick={handleSettingsClick}>Settings</li>
                <li onClick={handleLogoutClick}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div className="card-3d" style={{
            width: "680px",
            background: "var(--bg-2)",
            border: "1px solid var(--glass-border)",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch"
          }}>
            <h3 className="heading-md grad-blue" style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-cyan)", fontSize: "18px", fontWeight: "700" }}>
              👤 Investor Profile & Performance
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "28px" }}>
              {/* Left Column: Account Details */}
              <div>
                <h4 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", marginBottom: "16px" }}>Account Details</h4>
                
                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                  <div style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "white",
                    overflow: "hidden",
                    border: "2px solid var(--accent-cyan)",
                    boxShadow: "0 0 12px rgba(0,212,255,0.2)"
                  }}>
                    {avatarImage ? (
                      <img src={avatarImage} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      getInitials(profileData.username)
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{
                      cursor: "pointer",
                      padding: "4px 10px",
                      fontSize: "11px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--text-secondary)",
                      textAlign: "center"
                    }}>
                      Upload Picture
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarUpload} />
                    </label>
                    {avatarImage && (
                      <button onClick={handleAvatarRemove} style={{ cursor: "pointer", border: "none", background: "transparent", fontSize: "10px", color: "var(--accent-red)", padding: 0, textAlign: "left" }}>
                        Remove picture
                      </button>
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <label style={labelStyle}>Username / Name</label>
                    <input 
                      type="text" 
                      value={profileData.username}
                      onChange={(e) => handleProfileFieldChange("username", e.target.value)}
                      style={modalInputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = "var(--accent-cyan)"}
                      onBlur={e => e.currentTarget.style.borderColor = "var(--glass-border)"}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Client Code (ID)</label>
                    <input type="text" value={profileData.clientId} disabled style={{ ...modalInputStyle, opacity: 0.6, cursor: "not-allowed" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => handleProfileFieldChange("email", e.target.value)}
                      style={modalInputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = "var(--accent-cyan)"}
                      onBlur={e => e.currentTarget.style.borderColor = "var(--glass-border)"}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Mobile Phone</label>
                    <input 
                      type="text" 
                      value={profileData.phone}
                      onChange={(e) => handleProfileFieldChange("phone", e.target.value)}
                      style={modalInputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = "var(--accent-cyan)"}
                      onBlur={e => e.currentTarget.style.borderColor = "var(--glass-border)"}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Performance & History */}
              <div style={{ borderLeft: "1px solid var(--glass-border)", paddingLeft: "32px" }}>
                <h4 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", marginBottom: "16px" }}>Performance & Analytics</h4>
                
                {/* Stats cards grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", borderRadius: "10px", padding: "12px" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Total Trades</span>
                    <strong style={{ fontSize: "18px", display: "block", color: "var(--text-primary)", marginTop: "4px" }}>{profileData.totalTrades}</strong>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", borderRadius: "10px", padding: "12px" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Win Rate</span>
                    <strong style={{ fontSize: "18px", display: "block", color: "var(--accent-cyan)", marginTop: "4px" }}>64%</strong>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", borderRadius: "10px", padding: "12px", gridColumn: "span 2" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Net Realized P&L</span>
                    <strong style={{ fontSize: "18px", display: "block", color: "var(--accent-green)", marginTop: "4px" }}>
                      +₹{Number(profileData.netPnl).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>

                <h4 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", marginBottom: "12px", marginTop: "16px" }}>Financial History</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--text-secondary)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
                    <span>Total Deposited:</span>
                    <strong style={{ color: "var(--text-primary)" }}>
                      ₹{Number(profileData.totalDeposits).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
                    <span>Total Withdrawn:</span>
                    <strong style={{ color: "var(--text-primary)" }}>
                      ₹{Number(profileData.totalWithdrawals).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "6px" }}>
                    <span>Account Margin Balance:</span>
                    <strong style={{ color: "var(--accent-cyan)" }}>
                      ₹{Number(profileData.funds || 100000.00).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="btn btn-blue" 
              style={{ width: "100%", height: "42px" }}
              onClick={() => setProfileModalOpen(false)}
            >
              Close Profile Console
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div className="card-3d" style={{
            width: "360px",
            background: "var(--bg-2)",
            border: "1px solid var(--glass-border)",
            padding: "28px",
            borderRadius: "16px",
            boxShadow: "0 20px 80px rgba(0,0,0,0.6)"
          }}>
            <h3 className="heading-md grad-blue" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-cyan)", fontSize: "16px", fontWeight: "700" }}>
              ⚙️ Settings
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "28px" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Dark Mode</span>
                <button 
                  onClick={() => toggleSetting("darkMode")}
                  style={{
                    background: settings.darkMode ? "rgba(0, 245, 160, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid " + (settings.darkMode ? "var(--accent-green)" : "var(--glass-border)"),
                    color: settings.darkMode ? "var(--accent-green)" : "var(--text-muted)",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.2s"
                  }}
                >
                  {settings.darkMode ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Order Notifications</span>
                <button 
                  onClick={() => toggleSetting("notifications")}
                  style={{
                    background: settings.notifications ? "rgba(0, 245, 160, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid " + (settings.notifications ? "var(--accent-green)" : "var(--glass-border)"),
                    color: settings.notifications ? "var(--accent-green)" : "var(--text-muted)",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.2s"
                  }}
                >
                  {settings.notifications ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Interactive Charting</span>
                <button 
                  onClick={() => toggleSetting("charting")}
                  style={{
                    background: settings.charting ? "rgba(0, 245, 160, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid " + (settings.charting ? "var(--accent-green)" : "var(--glass-border)"),
                    color: settings.charting ? "var(--accent-green)" : "var(--text-muted)",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.2s"
                  }}
                >
                  {settings.charting ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Double Tap to Buy/Sell</span>
                <button 
                  onClick={() => toggleSetting("doubleTap")}
                  style={{
                    background: settings.doubleTap ? "rgba(0, 245, 160, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid " + (settings.doubleTap ? "var(--accent-green)" : "var(--glass-border)"),
                    color: settings.doubleTap ? "var(--accent-green)" : "var(--text-muted)",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.2s"
                  }}
                >
                  {settings.doubleTap ? "Enabled" : "Disabled"}
                </button>
              </div>

            </div>
            <button 
              className="btn btn-blue" 
              style={{ width: "100%", height: "38px" }}
              onClick={() => setSettingsModalOpen(false)}
            >
              Save &amp; Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
