import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="section-sm anim-fade-up">
      <div className="wrapper">
        <div className="grid-2" style={{ gap: "60px" }}>
          
          {/* Product Image Panel */}
          <div className="card-3d flex-center" style={{ padding: "30px", overflow: "hidden", minHeight: "320px" }}>
            <img 
              src={imageURL} 
              alt={`${productName} platform interface preview`} 
              style={{
                maxWidth: "100%",
                maxHeight: "340px",
                objectFit: "contain",
                filter: "drop-shadow(0 20px 40px rgba(61,127,255,0.25))",
                transition: "transform 0.5s ease"
              }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.03) rotate(-1deg)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
            />
          </div>

          {/* Product Info Panel */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="section-label" style={{ display: "inline-flex", width: "fit-content" }}>Featured Product</div>
            <h2 className="heading-lg" style={{ marginBottom: "20px" }}>{productName}</h2>
            <p className="body-lg" style={{ marginBottom: "28px" }}>{productDesription}</p>
            
            {/* Buttons */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
              <a href={tryDemo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Try Demo
              </a>
              <a href={learnMore} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Learn More
              </a>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
              <a href={googlePlay} target="_blank" rel="noopener noreferrer" style={{ transition: "transform 0.2s" }} onMouseOver={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>
                <img src="/media/images/googlePlayBadge.svg" alt="Get it on Google Play" style={{ height: "42px" }} />
              </a>
              <a href={appStore} target="_blank" rel="noopener noreferrer" style={{ transition: "transform 0.2s" }} onMouseOver={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>
                <img src="/media/images/appstoreBadge.svg" alt="Download on the App Store" style={{ height: "42px" }} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LeftSection;
