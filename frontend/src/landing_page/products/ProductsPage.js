import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
import { DASHBOARD_URL } from "../../config";

export default function ProductsPage() {
  return (
    <div className="products-page-wrapper" style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <div className="bg-grid" aria-hidden="true" />
      <div className="blob blob-1" style={{ top: "5%", left: "10%" }} aria-hidden="true" />
      <div className="blob blob-2" style={{ bottom: "15%", right: "8%" }} aria-hidden="true" />
      <Hero />
      <LeftSection
        imageURL="/media/images/kite.png"
        productName="Kite"
        productDesription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo={DASHBOARD_URL}
        learnMore={DASHBOARD_URL}
        googlePlay="https://play.google.com/store/apps/details?id=com.tradyfi.kite"
        appStore="https://apps.apple.com/in/app/tradyfi-kite"
      />
      <RightSection
        imageURL="/media/images/console.png"
        productName="Console"
        productDesription="The central dashboard for your Tradyfi account. Gain insights into your trades and investments with in-depth reports and visualisations."
        learnMore={DASHBOARD_URL}
      />
      <LeftSection
        imageURL="/media/images/coin.png"
        productName="Coin"
        productDesription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        tryDemo={DASHBOARD_URL}
        learnMore={DASHBOARD_URL}
        googlePlay="https://play.google.com/store/apps/details?id=com.tradyfi.coin"
        appStore="https://apps.apple.com/in/app/tradyfi-coin"
      />
      <RightSection
        imageURL="/media/images/kiteconnect.png"
        productName="Kite Connect API"
        productDesription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        learnMore={DASHBOARD_URL}
      />
      <LeftSection
        imageURL="/media/images/varsity.png"
        productName="Varsity Mobile"
        productDesription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        tryDemo="https://zerodha.com/varsity/"
        learnMore="https://zerodha.com/varsity/"
        googlePlay="https://play.google.com/store/apps/details?id=com.tradyfi.varsity"
        appStore="https://apps.apple.com/in/app/tradyfi-varsity"
      />
      <div style={{ textAlign: "center", margin: "80px 0" }}>
        <p className="body-lg" style={{ maxWidth: "600px", margin: "0 auto 20px" }}>
          Want to know more about our technology stack?
        </p>
        <a href="https://tradyfi.tech" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          Check out the Tradyfi.tech Blog
        </a>
      </div>
      <div className="divider" aria-hidden="true" />
      <Universe />
    </div>
  );
}
