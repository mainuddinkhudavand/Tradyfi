import React from "react";

function Hero() {
  return (
    <div className="section-sm anim-fade-up">
      <div className="wrapper" style={{ textAlign: "center", marginTop: "40px" }}>
        <div className="section-label">Innovative Eco-System</div>
        <h1 className="heading-xl grad-blue" style={{ marginBottom: "16px" }}>Technology</h1>
        <p className="body-lg" style={{ maxWidth: "600px", margin: "0 auto 28px" }}>
          Sleek, modern and intuitive trading platforms.
        </p>
        <p className="body-md">
          Check out our{" "}
          <a href="#universe" style={{ color: "var(--accent-cyan)", textDecoration: "underline", fontWeight: "600" }}>
            investment offerings{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
