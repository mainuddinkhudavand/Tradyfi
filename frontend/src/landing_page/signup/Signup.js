import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../../config";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", otp: "" });
  const [step, setStep] = useState(1); // 1: Info, 2: OTP, 3: Success
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.email || !formData.phone) {
        alert("Please enter both email and phone number.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(2);
      }, 1200);
    } else if (step === 2) {
      if (!formData.otp) {
        alert("Please enter the verification OTP.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 1500);
    }
  };

  return (
    <div className="signup-page-wrapper" style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: "120px 24px 80px"
    }}>
      {/* Background decorations */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="blob blob-1" style={{ top: "-10%", left: "30%" }} aria-hidden="true" />
      <div className="blob blob-2" style={{ bottom: "-10%", right: "20%" }} aria-hidden="true" />
      
      {/* Container */}
      <div className="wrapper" style={{ zIndex: 2, display: "flex", justifyContent: "center", width: "100%" }}>
        <div className="card-3d anim-fade-up" style={{
          width: "100%",
          maxWidth: "480px",
          padding: "48px 40px",
          background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.5), var(--shadow-glow)"
        }}>
          
          {/* Logo / Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div className="logo-mark" style={{ margin: "0 auto 16px", width: "52px", height: "52px", borderRadius: "14px" }}>
              <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
                <path d="M3 19L11 3L19 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 13H16" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="11" cy="11" r="3" fill="none" stroke="#00f5a0" strokeWidth="1.5"/>
              </svg>
            </div>
            <h2 className="heading-md" style={{ color: "var(--text-primary)" }}>
              {step === 3 ? "Welcome to Tradyfi" : "Join Tradyfi"}
            </h2>
            <p className="body-sm" style={{ marginTop: "6px" }}>
              {step === 1 && "Create your digital investment account in minutes"}
              {step === 2 && `Enter the 6-digit OTP sent to ${formData.phone}`}
              {step === 3 && "Your investment account is fully configured and ready!"}
            </p>
          </div>

          {/* Form Steps */}
          {step === 1 && (
            <form onSubmit={handleNextStep} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="name@domain.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>Mobile Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="e.g. +91 99999 99999" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg" 
                style={{ width: "100%", marginTop: "12px", height: "54px" }}
                disabled={loading}
              >
                {loading ? "Generating OTP..." : "Continue →"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>Verification Code (OTP)</label>
                <input 
                  type="text" 
                  name="otp"
                  placeholder="Enter 6-digit code" 
                  maxLength="6"
                  value={formData.otp}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, textAlign: "center", letterSpacing: "8px", fontSize: "20px" }}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg" 
                style={{ width: "100%", marginTop: "12px", height: "54px" }}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Activate Account"}
              </button>

              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="btn btn-ghost" 
                style={{ width: "100%", border: "none", background: "transparent" }}
              >
                Go Back
              </button>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Success Badge */}
              <div className="flex-center" style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: "rgba(0,245,160,0.1)",
                border: "2px solid var(--accent-green)",
                margin: "0 auto"
              }}>
                <span style={{ fontSize: "32px", color: "var(--accent-green)" }}>✓</span>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--glass-border)",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "left"
              }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Account ID Details</div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", display: "flex", justifyContent: "space-between" }}>
                  <span>Client Code:</span>
                  <span className="grad-blue">TS-394851</span>
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "6px" }}>
                  Owner: {formData.name || "Investor"}
                </div>
              </div>

              <a 
                href={DASHBOARD_URL} 
                className="btn btn-primary btn-lg" 
                style={{ width: "100%" }}
                onClick={() => {
                  localStorage.setItem("username", formData.name || "Investor");
                  localStorage.setItem("clientId", "TS-394851");
                  localStorage.setItem("userEmail", formData.email || "trader@tradyfi.pro");
                  localStorage.setItem("userPhone", formData.phone || "+91 98765 43210");
                }}
              >
                Enter Tradyfi Dashboard
              </a>
            </div>
          )}

          {/* Footer of card */}
          {step !== 3 && (
            <div style={{ marginTop: "32px", textAlign: "center", fontSize: "13px", color: "var(--text-muted)" }}>
              Already have an account? <Link to="/login" style={{ color: "var(--accent-cyan)", fontWeight: "600" }}>Log in here</Link>
            </div>
          )}
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
  transition: "all 0.3s"
};
