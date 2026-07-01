import React from "react";
import Hero from "./Hero";
import Team from "./Team";

export default function AboutPage() {
  return (
    <div className="about-page-wrapper" style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <div className="bg-grid" aria-hidden="true" />
      <div className="blob blob-1" style={{ top: "10%", left: "5%" }} aria-hidden="true" />
      <div className="blob blob-2" style={{ bottom: "20%", right: "5%" }} aria-hidden="true" />
      <Hero />
      <div className="divider" aria-hidden="true" />
      <Team />
    </div>
  );
}
