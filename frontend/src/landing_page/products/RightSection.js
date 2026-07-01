import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="section-sm anim-fade-up">
      <div className="wrapper">
        <div className="grid-2" style={{ gap: "60px" }}>
          
          {/* Product Info Panel */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="section-label" style={{ display: "inline-flex", width: "fit-content" }}>Advanced Analytics</div>
            <h2 className="heading-lg" style={{ marginBottom: "20px" }}>{productName}</h2>
            <p className="body-lg" style={{ marginBottom: "28px" }}>{productDesription}</p>
            
            {/* Buttons */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href={learnMore} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Learn More
              </a>
            </div>
          </div>

          {/* Product Image Panel */}
          <div className="card-3d flex-center" style={{ padding: "30px", overflow: "hidden", minHeight: "320px" }}>
            <img 
              src={imageURL} 
              alt={`${productName} platform interface preview`} 
              style={{
                maxWidth: "100%",
                maxHeight: "340px",
                objectFit: "contain",
                filter: "drop-shadow(0 20px 40px rgba(124,58,237,0.25))",
                transition: "transform 0.5s ease"
              }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.03) rotate(1deg)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default RightSection;
