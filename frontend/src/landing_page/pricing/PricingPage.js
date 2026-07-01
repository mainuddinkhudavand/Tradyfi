import React from "react";
import Hero from "./Hero";
import Brokerage from "./Brokerage";
import OpenAccount from "../OpenAccount";

export default function PricingPage() {
  return (
    <div className="pricing-page-wrapper" style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <div className="bg-grid" aria-hidden="true" />
      <div className="blob blob-3" style={{ top: "15%", right: "10%" }} aria-hidden="true" />
      <div className="blob blob-1" style={{ bottom: "25%", left: "5%" }} aria-hidden="true" />
      <Hero />
      <OpenAccount />
      <div className="divider" aria-hidden="true" />
      <Brokerage />
    </div>
  );
}
