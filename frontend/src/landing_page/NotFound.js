import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-wrapper" style={{
      position: "relative",
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    }}>
      <div className="bg-grid" aria-hidden="true" />
      <div className="blob blob-1" style={{ top: "20%", left: "20%" }} aria-hidden="true" />
      
      <div className="card-3d anim-fade-up" style={{ padding: "60px 40px", maxWidth: "500px", margin: "0 20px" }}>
        <h1 className="heading-xl grad-blue" style={{ fontSize: "6rem", marginBottom: "16px", lineHeight: "1" }}>404</h1>
        <h2 className="heading-md" style={{ color: "var(--text-primary)", marginBottom: "16px" }}>Page Lost in Orbit</h2>
        <p className="body-md" style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
          The link you followed may be broken or the page has been moved to a different coordinate system.
        </p>
        <Link to="/" className="btn btn-primary">
          🌌 Return to Home Planet
        </Link>
      </div>
    </div>
  );
}
