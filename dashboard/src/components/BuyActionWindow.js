import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { BACKEND_URL } from "../config";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [orderType, setOrderType] = useState("MARKET");
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    axios
      .post(`${BACKEND_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      })
      .then(() => {
        generalContext.closeBuyWindow();
      })
      .catch((err) => {
        console.error("Order error:", err);
        generalContext.closeBuyWindow();
      });
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      {/* Header */}
      <div className="container-header">
        <div className="header-left">
          <h3>
            {uid} <span>NSE</span>
          </h3>
          <div className="market-options">
            <label>
              <input
                type="radio"
                name="orderType"
                value="MARKET"
                checked={orderType === "MARKET"}
                onChange={() => setOrderType("MARKET")}
              />{" "}
              Market
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="orderType"
                value="LIMIT"
                checked={orderType === "LIMIT"}
                onChange={() => setOrderType("LIMIT")}
              />{" "}
              Limit
            </label>
          </div>
        </div>
        <button
          className="close-btn"
          onClick={handleCancelClick}
          aria-label="Close buy window"
        >
          ✕
        </button>
      </div>

      {/* Tab */}
      <div className="tab">
        <button className="tab-active">Regular</button>
        <button>Cover</button>
        <button>AMO</button>
      </div>

      {/* Inputs */}
      <div className="regular-order">
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
              value={orderType === "MARKET" ? "Market" : stockPrice}
            />
          </fieldset>
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
