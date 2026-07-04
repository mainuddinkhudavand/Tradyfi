import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DASHBOARD_URL, BACKEND_URL } from "../../config";

export default function Login() {
  const [formData, setFormData] = useState({ userid: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.userid || !formData.password) {
      setError("Please enter your User ID and password.");
      return;
    }
    setLoading(true);
    axios
      .post(`${BACKEND_URL}/login`, {
        userid: formData.userid,
        password: formData.password,
      })
      .then((res) => {
        if (res.data.success) {
          // Save credentials to localStorage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("clientId", res.data.user.clientId);
          localStorage.setItem("userEmail", res.data.user.email);
          localStorage.setItem("userPhone", res.data.user.phone);
          // Redirect to dashboard on success
          window.location.href = DASHBOARD_URL;
        } else {
          setError(res.data.message || "Login failed.");
          setLoading(false);
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Server error. Please try again.";
        setError(msg);
        setLoading(false);
      });
  };

  return (
    <div
      className="signup-page-wrapper"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "120px 24px 80px",
      }}
    >
      {/* Background decorations */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="blob blob-1" style={{ top: "-10%", left: "30%" }} aria-hidden="true" />
      <div className="blob blob-2" style={{ bottom: "-10%", right: "20%" }} aria-hidden="true" />

      {/* Container */}
      <div className="wrapper" style={{ zIndex: 2, display: "flex", justifyContent: "center", width: "100%" }}>
        <div
          className="card-3d anim-fade-up"
          style={{
            width: "100%",
            maxWidth: "440px",
            padding: "48px 40px",
            background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.5), var(--shadow-glow)",
          }}
        >
          {/* Logo / Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div
              className="logo-mark"
              style={{ margin: "0 auto 16px", width: "52px", height: "52px", borderRadius: "14px" }}
            >
              <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
                <path d="M3 19L11 3L19 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 13H16" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="11" cy="11" r="3" fill="none" stroke="#00f5a0" strokeWidth="1.5" />
              </svg>
            </div>
            <h2 className="heading-md" style={{ color: "var(--text-primary)" }}>
              Welcome Back
            </h2>
            <p className="body-sm" style={{ marginTop: "6px" }}>
              Log in to your Tradyfi account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label
                htmlFor="userid"
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "8px",
                }}
              >
                User ID / Client Code
              </label>
              <input
                id="userid"
                type="text"
                name="userid"
                placeholder="e.g. TS394851"
                value={formData.userid}
                onChange={handleInputChange}
                style={inputStyle}
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                style={inputStyle}
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(255, 80, 80, 0.1)",
                  border: "1px solid rgba(255, 80, 80, 0.3)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#ff6b6b",
                  fontSize: "13px",
                }}
              >
                {error}
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "8px", height: "54px" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In →"}
            </button>

            <div style={{ textAlign: "right", marginTop: "-8px" }}>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--accent-cyan)",
                  fontSize: "13px",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Footer */}
          <div style={{ marginTop: "32px", textAlign: "center", fontSize: "13px", color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--accent-cyan)", fontWeight: "600" }}>
              Open Free Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid var(--glass-border)",
  color: "var(--text-primary)",
  fontSize: "14.5px",
  outline: "none",
  transition: "all 0.3s",
  boxSizing: "border-box",
};
