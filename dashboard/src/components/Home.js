import React from "react";
import { useLocation, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Menu from "./Menu";

const Home = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Watchlist", path: "/watchlist", icon: "📊" },
    { label: "Orders", path: "/orders", icon: "📝" },
    { label: "Portfolio", path: "/holdings", icon: "💼" },
    { label: "Funds", path: "/funds", icon: "💰" }
  ];

  return (
    <div className="home-layout-root">
      <Menu />
      <div className="main-content-layout">
        <TopBar />
        <Dashboard />
        
        {/* Mobile Bottom Navigation */}
        <div className="mobile-bottom-nav">
          {tabs.map((tab) => {
            const isActive = currentPath === tab.path || (tab.path === "/holdings" && (currentPath === "/holdings" || currentPath === "/positions"));
            return (
              <Link 
                key={tab.label} 
                to={tab.path} 
                className={`mobile-nav-item ${isActive ? "active" : ""}`}
              >
                <span className="mobile-nav-icon">{tab.icon}</span>
                <span className="mobile-nav-label">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
