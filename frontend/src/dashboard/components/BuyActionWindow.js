import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { BACKEND_URL } from "../../config";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100.0);
  const [orderType, setOrderType] = useState("MARKET");
  const [error, setError] = useState("");
  const generalContext = useContext(GeneralContext);

  const isBuy = mode === "BUY";

  // Watchlist stock prices metadata lookup
  const stockMeta = {
    "INFY": 1555.45,
    "ONGC": 116.8,
    "TCS": 3194.8,
    "KPITTECH": 266.45,
    "QUICKHEAL": 308.55,
    "WIPRO": 577.75,
    "M&M": 779.8,
    "RELIANCE": 2112.4,
    "HUL": 512.4,
    "BHARTIARTL": 541.15,
    "HDFCBANK": 1522.35,
    "HINDUNILVR": 2417.4,
    "ITC": 207.9,
    "SBIN": 430.2,
    "SGBMAY29": 4719.0,
    "TATAPOWER": 124.15,
    "EVEREADY": 312.35,
    "JUBLFOOD": 3082.65
  };

  const currentLTP = stockMeta[uid.toUpperCase()] || 100.00;
  const displayPrice = orderType === "MARKET" ? currentLTP : (Number(stockPrice) || 0);
  const marginRequired = displayPrice * (Number(stockQuantity) || 0);

  const handleOrderClick = () => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    setError("");
    axios
      .post(`${BACKEND_URL}/newOrder`, {
        name: uid.toUpperCase(),
        qty: Number(stockQuantity),
        price: orderType === "MARKET" ? 0 : Number(stockPrice),
        mode: mode, // BUY or SELL
      }, { headers })
      .then((res) => {
        if (res.data.success) {
          generalContext.closeBuyWindow();
          window.location.reload(); // refresh dashboard state
        } else {
          setError(res.data.message || "Order failed.");
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Order failed. Check balance.";
        setError(msg);
      });
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  const themeColor = isBuy ? "var(--accent-blue)" : "var(--accent-red)";
  const themeBg = isBuy ? "rgba(61,127,255,0.2)" : "rgba(255,77,77,0.2)";

  return (
    <div className="container" id="buy-window" style={{ borderColor: themeColor }}>
      {/* Header */}
      <div className="container-header" style={{ background: isBuy ? "linear-gradient(135deg, rgba(61,127,255,0.25), rgba(0,212,255,0.1))" : "linear-gradient(135deg, rgba(255,77,77,0.25), rgba(245,104,52,0.1))" }}>
        <div className="header-left">
          <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700" }}>
            {mode} {uid} <span>NSE</span>
          </h3>
          <div className="market-options" style={{ marginTop: "6px" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="orderType"
                value="MARKET"
                checked={orderType === "MARKET"}
                onChange={() => setOrderType("MARKET")}
                style={{ accentColor: themeColor }}
              />{" "}
              Market
            </label>
            <label style={{ marginLeft: 12, cursor: "pointer" }}>
              <input
                type="radio"
                name="orderType"
                value="LIMIT"
                checked={orderType === "LIMIT"}
                onChange={() => {
                  setOrderType("LIMIT");
                  setStockPrice(currentLTP);
                }}
                style={{ accentColor: themeColor }}
              />{" "}
              Limit
            </label>
          </div>
        </div>
        <button
          className="close-btn"
          onClick={handleCancelClick}
          aria-label="Close transaction window"
        >
          ✕
        </button>
      </div>

      {/* Inputs */}
      <div className="regular-order" style={{ padding: "20px 20px 14px" }}>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price (₹)</legend>
            <input
              type={orderType === "MARKET" ? "text" : "number"}
              name="price"
              id="price"
              step="0.05"
              disabled={orderType === "MARKET"}
              onChange={(e) => setStockPrice(e.target.value)}
              value={orderType === "MARKET" ? `Market (${currentLTP})` : stockPrice}
            />
          </fieldset>
        </div>

        {error && (
          <div style={{
            fontSize: "12px",
            color: "var(--accent-red)",
            marginTop: "12px",
            background: "rgba(255,77,77,0.08)",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid rgba(255,77,77,0.15)"
          }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="buttons">
        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
          Required Margin: <strong style={{ color: "var(--text-primary)" }}>₹{marginRequired.toFixed(2)}</strong>
        </span>
        <div>
          <button 
            className="btn" 
            style={{ 
              background: themeBg, 
              color: themeColor, 
              border: `1px solid ${themeColor}`,
              padding: "6px 16px",
              fontSize: "12px",
              height: "32px",
              borderRadius: "6px"
            }} 
            onClick={handleOrderClick}
          >
            {mode}
          </button>
          <button 
            className="btn btn-grey" 
            style={{ padding: "6px 16px", fontSize: "12px", height: "32px", borderRadius: "6px" }} 
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
