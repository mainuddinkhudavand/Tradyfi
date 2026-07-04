import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";

import HomePage    from "./landing_page/home/HomePage";
import Signup      from "./landing_page/signup/Signup";
import Login       from "./landing_page/login/Login";
import AboutPage   from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import NotFound    from "./landing_page/NotFound";
import Navbar      from "./landing_page/Navbar";
import Footer      from "./landing_page/Footer";
import ScrollToTop  from "./landing_page/ScrollToTop";

import DashboardHome from "./dashboard/components/Home";

const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      {/* Landing pages layout (with Global Navbar and Footer) */}
      <Route element={<LandingLayout />}>
        <Route path="/"        element={<HomePage    />} />
        <Route path="/signup"  element={<Signup      />} />
        <Route path="/login"   element={<Login       />} />
        <Route path="/about"   element={<AboutPage   />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*"        element={<NotFound    />} />
      </Route>

      {/* Merged Dashboard Portal (No Global Navbar/Footer) */}
      <Route path="/dashboard/*" element={<DashboardHome />} />
    </Routes>
  </BrowserRouter>
);
