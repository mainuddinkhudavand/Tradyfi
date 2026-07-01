import React from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Menu from "./Menu";

const Home = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Menu />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
