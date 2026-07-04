import React, { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

// Import ChartJS modules for line chart
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Filler
} from "chart.js";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  ChartTooltip,
  ChartLegend,
  Filler
);

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [analyticsStock, setAnalyticsStock] = useState(null);
  const [alertStock, setAlertStock] = useState(null);
  const [alertConfig, setAlertConfig] = useState({ type: "GREATER_THAN", price: "" });

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const doughnutData = {
    labels: filteredWatchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price (₹)",
        data: filteredWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(0, 245, 160, 0.4)",
          "rgba(0, 212, 255, 0.4)",
          "rgba(245, 101, 101, 0.4)",
        ].slice(0, filteredWatchlist.length),
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(0, 245, 160, 1)",
          "rgba(0, 212, 255, 1)",
          "rgba(245, 101, 101, 1)",
        ].slice(0, filteredWatchlist.length),
        borderWidth: 1,
      },
    ],
  };

  // Generate dynamic 7-day mock trend chart data
  const generateTrendData = (stock) => {
    if (!stock) return null;
    const ltp = stock.price;
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const prices = [];
    let priceTracker = ltp * 0.94;
    for (let i = 0; i < 6; i++) {
      priceTracker += (Math.random() - 0.45) * (ltp * 0.025);
      prices.push(Number(priceTracker.toFixed(2)));
    }
    prices.push(ltp); // last day is the current price

    return {
      labels: days,
      datasets: [
        {
          label: `${stock.name} 7D Price`,
          data: prices,
          borderColor: stock.isDown ? "var(--accent-red)" : "var(--accent-green)",
          backgroundColor: stock.isDown ? "rgba(255,77,77,0.04)" : "rgba(0,245,160,0.04)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: stock.isDown ? "var(--accent-red)" : "var(--accent-green)",
          pointBorderColor: "#fff",
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    };
  };

  const trendData = analyticsStock ? generateTrendData(analyticsStock) : null;

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(9,14,26,0.95)",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        titleColor: "#e8edf5",
        bodyColor: "#9aa5b8",
      }
    },
    scales: {
      x: { ticks: { color: "#5c6a82", font: { size: 10 } }, grid: { display: false } },
      y: { ticks: { color: "#5c6a82", font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.04)" } }
    }
  };

  const handleSaveAlert = (e) => {
    e.preventDefault();
    alert(`Alert configured successfully! We will notify you when ${alertStock.name} goes ${alertConfig.type === "GREATER_THAN" ? "above" : "below"} ₹${Number(alertConfig.price).toFixed(2)}.`);
    setAlertStock(null);
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, wipro, reliance"
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="counts"> {filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock) => {
          return (
            <WatchListItem 
              stock={stock} 
              key={stock.name} 
              onOpenAnalytics={() => setAnalyticsStock(stock)}
              onOpenAlert={() => {
                setAlertStock(stock);
                setAlertConfig({ type: "GREATER_THAN", price: stock.price.toFixed(2) });
              }}
            />
          );
        })}
      </ul>

      {filteredWatchlist.length > 0 && <DoughnutChart data={doughnutData} />}

      {/* Analytics Modal */}
      {analyticsStock && (
        <div style={modalOverlayStyle} onClick={() => setAnalyticsStock(null)}>
          <div className="card-3d" style={modalContentStyle} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
                  📈 {analyticsStock.name} <span style={{ fontSize: "11px", fontWeight: "400", color: "var(--text-muted)", background: "rgba(255,255,255,0.04)", padding: "2px 6px", borderRadius: "4px" }}>NSE</span>
                </h3>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>Sector: Technology / Index Asset</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", display: "block" }}>₹{analyticsStock.price.toFixed(2)}</span>
                <span style={{ fontSize: "12px", fontWeight: "600", color: analyticsStock.isDown ? "var(--accent-red)" : "var(--accent-green)" }}>
                  {analyticsStock.isDown ? "▼" : "▲"} {analyticsStock.percent}
                </span>
              </div>
            </div>

            {/* Line Chart */}
            <div style={{ height: "180px", marginBottom: "24px", position: "relative" }}>
              {trendData && <Line data={trendData} options={trendOptions} />}
            </div>

            {/* Valuation Stats */}
            <h4 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", marginBottom: "12px", borderBottom: "1px solid var(--glass-border)", paddingBottom: "6px" }}>
              Valuation Metrics
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", fontSize: "12.5px", color: "var(--text-secondary)", marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>52W High:</span>
                <strong style={{ color: "var(--text-primary)" }}>₹{(analyticsStock.price * 1.15).toFixed(2)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>52W Low:</span>
                <strong style={{ color: "var(--text-primary)" }}>₹{(analyticsStock.price * 0.82).toFixed(2)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>P/E Ratio:</span>
                <strong style={{ color: "var(--text-primary)" }}>28.6</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Div. Yield:</span>
                <strong style={{ color: "var(--text-primary)" }}>1.45%</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Avg. Volume:</span>
                <strong style={{ color: "var(--text-primary)" }}>3.8M</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Beta:</span>
                <strong style={{ color: "var(--text-primary)" }}>1.12</strong>
              </div>
            </div>

            {/* Close Button */}
            <button 
              className="btn btn-grey" 
              style={{ width: "100%", height: "38px" }} 
              onClick={() => setAnalyticsStock(null)}
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Alert Creator Modal */}
      {alertStock && (
        <div style={modalOverlayStyle} onClick={() => setAlertStock(null)}>
          <div className="card-3d" style={{ ...modalContentStyle, width: "340px" }} onClick={e => e.stopPropagation()}>
            <h3 className="grad-blue" style={{ fontSize: "16px", fontWeight: "700", marginBottom: "18px", color: "var(--accent-cyan)", display: "flex", alignItems: "center", gap: "6px", margin: 0 }}>
              🔔 Create Price Alert for {alertStock.name}
            </h3>
            <form onSubmit={handleSaveAlert} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              <div>
                <label style={labelStyle}>Trigger Rule</label>
                <select 
                  value={alertConfig.type} 
                  onChange={e => setAlertConfig(prev => ({ ...prev, type: e.target.value }))}
                  style={selectStyle}
                >
                  <option value="GREATER_THAN">Price goes above (≥)</option>
                  <option value="LESS_THAN">Price goes below (≤)</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Trigger Value (₹)</label>
                <input 
                  type="number" 
                  step="0.05"
                  value={alertConfig.price}
                  onChange={e => setAlertConfig(prev => ({ ...prev, price: e.target.value }))}
                  style={inputStyle}
                  required 
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button type="submit" className="btn btn-green" style={{ flex: 1, height: "38px" }}>Save Alert</button>
                <button type="button" className="btn btn-grey" onClick={() => setAlertStock(null)} style={{ flex: 1, height: "38px" }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onOpenAnalytics, onOpenAlert }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
    setShowMoreMenu(false);
  };

  return (
    <li 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      style={{ minHeight: "58px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price.toFixed(2)}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions 
          uid={stock.name} 
          onOpenAnalytics={onOpenAnalytics}
          onOpenMore={(e) => {
            e.stopPropagation();
            setShowMoreMenu(!showMoreMenu);
          }}
        />
      )}

      {/* Absolute dropdown context menu */}
      {showMoreMenu && (
        <div 
          style={{
            position: "absolute",
            top: "42px",
            right: "12px",
            background: "var(--bg-2)",
            border: "1px solid var(--glass-border)",
            borderRadius: "8px",
            padding: "4px 0",
            zIndex: 100,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            width: "135px"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li 
              style={dropdownItemStyle} 
              onClick={() => {
                setShowMoreMenu(false);
                alert(`📌 ${stock.name} pinned to top of watchlist!`);
              }}
              onMouseOver={e => e.target.style.background = "var(--glass-hover)"}
              onMouseOut={e => e.target.style.background = "transparent"}
            >
              Pin to top
            </li>
            <li 
              style={dropdownItemStyle} 
              onClick={() => {
                setShowMoreMenu(false);
                onOpenAlert();
              }}
              onMouseOver={e => e.target.style.background = "var(--glass-hover)"}
              onMouseOut={e => e.target.style.background = "transparent"}
            >
              Create alert
            </li>
            <li 
              style={dropdownItemStyle} 
              onClick={() => {
                setShowMoreMenu(false);
                alert(`🎯 Good-Till-Triggered (GTT) order initialized for ${stock.name} at ₹${(stock.price * 0.95).toFixed(2)}.`);
              }}
              onMouseOver={e => e.target.style.background = "var(--glass-hover)"}
              onMouseOut={e => e.target.style.background = "transparent"}
            >
              Create GTT
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

const WatchListActions = ({ uid, onOpenAnalytics, onOpenMore }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, "BUY");
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(uid, "SELL");
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" onClick={handleSellClick}>Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={onOpenAnalytics}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" onClick={onOpenMore}>
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

// Styling definitions
const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modalContentStyle = {
  width: "410px",
  background: "var(--bg-2)",
  border: "1px solid var(--glass-border)",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 20px 80px rgba(0,0,0,0.6)"
};

const labelStyle = {
  display: "block",
  fontSize: "10px",
  fontWeight: "700",
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid var(--glass-border)",
  borderRadius: "8px",
  padding: "10px 14px",
  color: "var(--text-primary)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};

const selectStyle = {
  ...inputStyle,
  color: "var(--text-primary)",
  background: "var(--bg-1)",
  cursor: "pointer"
};

const dropdownItemStyle = {
  padding: "8px 16px",
  fontSize: "12px",
  color: "var(--text-secondary)",
  cursor: "pointer",
  transition: "all 0.2s"
};
