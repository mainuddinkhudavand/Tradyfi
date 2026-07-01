import React from "react";

function Hero() {
  return (
    <div className="section anim-fade-up">
      <div className="wrapper">
        <div style={{ textAlign: "center", marginBottom: "80px", marginTop: "40px" }}>
          <div className="section-label">Who We Are</div>
          <h1 className="heading-lg grad-blue" style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.2" }}>
            We pioneered the discount broking model in India.<br />
            Now, we are breaking ground with our technology.
          </h1>
        </div>

        <div className="grid-2" style={{ alignItems: "stretch" }}>
          <div className="card-3d" style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p className="body-lg" style={{ marginBottom: "20px" }}>
              We kick-started operations on the 15th of August, 2010 with the goal
              of breaking all barriers that traders and investors face in India in
              terms of cost, support, and technology.
            </p>
            <p className="body-md" style={{ marginBottom: "20px" }}>
              We named the company <strong>Tradyfi</strong>, representing a complete, global
              sphere of trading opportunities where all barriers are broken.
            </p>
            <p className="body-md">
              Today, our disruptive pricing models and in-house technology have
              made us the biggest stock broker in India. Over 1+ Crore clients place millions
              of orders every day through our powerful ecosystem of investment platforms, contributing
              over 15% of all Indian retail trading volumes.
            </p>
          </div>

          <div className="card-3d" style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p className="body-md" style={{ marginBottom: "20px" }}>
              In addition, we run a number of popular open online educational and
              community initiatives to empower retail traders and investors.
            </p>
            <p className="body-md" style={{ marginBottom: "20px" }}>
              <a href="https://rainmatter.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)", fontWeight: "600", textDecoration: "underline" }}>
                Rainmatter
              </a>
              , our fintech fund and incubator, has invested in several fintech
              startups with the goal of growing the Indian capital markets.
            </p>
            <p className="body-md">
              And yet, we are always up to something new every day. Catch up on
              the latest updates on our blog or see what the media is saying about
              us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
