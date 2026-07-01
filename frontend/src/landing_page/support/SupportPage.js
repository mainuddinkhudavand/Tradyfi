import React from "react";
import Hero from "./Hero";
import CreateTicket from "./CreateTicket";

export default function SupportPage() {
  return (
    <div className="support-page-wrapper" style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <div className="bg-grid" aria-hidden="true" />
      <div className="blob blob-1" style={{ top: "10%", right: "15%" }} aria-hidden="true" />
      <div className="blob blob-3" style={{ bottom: "20%", left: "5%" }} aria-hidden="true" />
      <Hero />
      <div className="divider" aria-hidden="true" />
      <CreateTicket />
    </div>
  );
}
