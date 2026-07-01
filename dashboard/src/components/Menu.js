import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../config";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // States for user profile data
  const [profileData, setProfileData] = useState({
    username: localStorage.getItem("username") || "TS-394851",
    clientId: localStorage.getItem("clientId") || "TS-008271",
    email: localStorage.getItem("userEmail") || "trader@tradyfi.pro",
    phone: localStorage.getItem("userPhone") || "+91 98765 43210"
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

  // Sync profileData dynamically on mount in case it was stored during login/signup
  useEffect(() => {
    setProfileData({
      username: localStorage.getItem("username") || "TS-394851",
      clientId: localStorage.getItem("clientId") || "TS-008271",
      email: localStorage.getItem("userEmail") || "trader@tradyfi.pro",
      phone: localStorage.getItem("userPhone") || "+91 98765 43210"
    });
  }, [profileModalOpen]);

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
    localStorage.removeItem("username");
    localStorage.removeItem("clientId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("avatarImage");
    window.location.href = `${FRONTEND_URL}/login`;
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
    { label: "Dashboard", path: "/", index: 0 },
    { label: "Orders", path: "/orders", index: 1 },
    { label: "Holdings", path: "/holdings", index: 2 },
    { label: "Positions", path: "/positions", index: 3 },
    { label: "Funds", path: "/funds", index: 4 },
    { label: "Apps", path: "/apps", index: 5 },
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

  return (
    <div className="menu-container">
      {/* Tradyfi Logo */}
      <a href={FRONTEND_URL} className="ts-logo-link" aria-label="Tradyfi Home">
        <div className="ts-logo-mark" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M3 19L11 3L19 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 13H16" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="11" cy="11" r="3" fill="none" stroke="#00f5a0" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="ts-logo-text">Tradyfi</span>
      </a>

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
            width: "385px",
            background: "var(--bg-2)",
            border: "1px solid var(--glass-border)",
            padding: "28px",
            borderRadius: "16px",
            boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch"
          }}>
            <h3 className="heading-md grad-blue" style={{ marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              👤 User Profile
            </h3>
            
            {/* Avatar Upload space */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: "700",
                color: "white",
                overflow: "hidden",
                border: "2.5px solid var(--accent-cyan)",
                boxShadow: "0 0 16px rgba(0,212,255,0.3)"
              }}>
                {avatarImage ? (
                  <img src={avatarImage} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  getInitials(profileData.username)
                )}
              </div>
              
              <div style={{ display: "flex", gap: "8px" }}>
                <label className="buy" style={{
                  cursor: "pointer",
                  padding: "5px 12px",
                  fontSize: "11px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  📷 Upload Picture
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: "none" }} 
                    onChange={handleAvatarUpload}
                  />
                </label>
                {avatarImage && (
                  <button 
                    onClick={handleAvatarRemove}
                    style={{
                      cursor: "pointer",
                      padding: "5px 12px",
                      fontSize: "11px",
                      borderRadius: "6px",
                      background: "rgba(255,77,77,0.15)",
                      border: "1px solid rgba(255,77,77,0.3)",
                      color: "var(--accent-red)",
                      transition: "all 0.2s"
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Editable Profile Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Username / Name</label>
                <input 
                  type="text" 
                  value={profileData.username}
                  onChange={(e) => handleProfileFieldChange("username", e.target.value)}
                  style={modalInputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = "var(--accent-cyan)"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--glass-border)"}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Client ID</label>
                <input 
                  type="text" 
                  value={profileData.clientId}
                  onChange={(e) => handleProfileFieldChange("clientId", e.target.value)}
                  style={modalInputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = "var(--accent-cyan)"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--glass-border)"}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email Address</label>
                <input 
                  type="email" 
                  value={profileData.email}
                  onChange={(e) => handleProfileFieldChange("email", e.target.value)}
                  style={modalInputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = "var(--accent-cyan)"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--glass-border)"}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Mobile Number</label>
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

            <button 
              className="buy" 
              style={{ width: "100%", height: "38px", background: "var(--accent-blue)", color: "white", border: "none" }}
              onClick={() => setProfileModalOpen(false)}
            >
              Save &amp; Close
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
            <h3 className="heading-md grad-blue" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
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
              className="buy" 
              style={{ width: "100%", height: "38px", background: "var(--accent-blue)", color: "white", border: "none" }}
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
