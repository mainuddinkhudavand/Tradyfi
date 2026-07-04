import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Menu from "./Menu";
import { BACKEND_URL } from "../../config";
import "../dashboard.css";

const Home = () => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Verify token with backend
    axios.get(`${BACKEND_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      if (res.data.success) {
        setAuthorized(true);
        // Sync user details to localStorage
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("clientId", res.data.user.clientId);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userPhone", res.data.user.phone);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
      setLoading(false);
    })
    .catch(() => {
      // Offline fallback: if token exists, let them proceed (e.g. mock mode connectivity hiccup)
      if (token) {
        setAuthorized(true);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#050811",
        color: "#e8edf5",
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(255,255,255,0.05)",
            borderTopColor: "var(--accent-cyan)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <h3 style={{ fontSize: "16px", fontWeight: "500", opacity: 0.8 }}>Loading Tradyfi Pro...</h3>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#050811" }}>
      <Menu />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
