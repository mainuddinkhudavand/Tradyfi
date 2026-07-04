import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Summary = () => {
  const [positions, setPositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [funds, setFunds] = useState(100000.00);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username") || "Trader";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    Promise.all([
      axios.get(`${BACKEND_URL}/allPositions`, { headers }),
      axios.get(`${BACKEND_URL}/allHoldings`, { headers }),
      axios.get(`${BACKEND_URL}/verify`, { headers })
    ])
      .then(([posRes, holdRes, verifyRes]) => {
        setPositions(posRes.data);
        setHoldings(holdRes.data);
        if (verifyRes.data?.user?.funds !== undefined) {
          setFunds(verifyRes.data.user.funds);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Summary fetch error:", err);
        setLoading(false);
      });
  }, []);

  const totalPositionsPnl = positions.reduce((sum, s) => {
    return sum + (s.price * s.qty - s.avg * s.qty);
  }, 0);
  const posPnlClass = totalPositionsPnl >= 0 ? "profit" : "loss";

  const totalHoldingsInvestment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const totalHoldingsCurrent    = holdings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const totalHoldingsPnl        = totalHoldingsCurrent - totalHoldingsInvestment;
  const holdingsPnlPercent      = totalHoldingsInvestment > 0 ? (totalHoldingsPnl / totalHoldingsInvestment) * 100 : 0;
  const holdingsPnlClass        = totalHoldingsPnl >= 0 ? "profit" : "loss";

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px" }}>
        <div style={{
          width: "24px",
          height: "24px",
          border: "2px solid rgba(255,255,255,0.05)",
          borderTopColor: "var(--accent-cyan)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginRight: "10px"
        }} />
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading summary...</span>
      </div>
    );
  }

  return (
    <>
      <div className="username">
        <h6>👋 Welcome back, {username}!</h6>
      </div>

      {/* Equity section */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>
        <div className="data">
          <div className="first">
            <h3>₹{funds.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins used <span>₹0.00</span>
            </p>
            <p>
              Opening balance <span>₹{funds.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Holdings summary */}
      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>
        <div className="data">
          <div className="first">
            <h3 className={holdingsPnlClass}>
              {totalHoldingsPnl >= 0 ? "+" : ""}₹{totalHoldingsPnl.toFixed(2)}
              <small style={{ marginLeft: 8, color: totalHoldingsPnl >= 0 ? "var(--accent-green)" : "var(--accent-red)" }}>
                {totalHoldingsPnl >= 0 ? "+" : ""}{holdingsPnlPercent.toFixed(2)}%
              </small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Current value <span>₹{totalHoldingsCurrent.toFixed(2)}</span>
            </p>
            <p>
              Investment <span>₹{totalHoldingsInvestment.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Positions summary */}
      {positions.length > 0 && (
        <div className="section">
          <span>
            <p>Positions ({positions.length})</p>
          </span>
          <div className="data">
            <div className="first">
              <h3 className={posPnlClass}>
                {totalPositionsPnl >= 0 ? "+" : ""}₹{totalPositionsPnl.toFixed(2)}
              </h3>
              <p>Day P&amp;L</p>
            </div>
            <hr />
            <div className="second">
              <p>
                Open positions <span>{positions.length}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;
