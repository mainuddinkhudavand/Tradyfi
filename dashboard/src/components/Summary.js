import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Summary = () => {
  const [positions, setPositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${BACKEND_URL}/allPositions`),
      axios.get(`${BACKEND_URL}/allHoldings`)
    ])
      .then(([posRes, holdRes]) => {
        setPositions(posRes.data);
        setHoldings(holdRes.data);
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
    return <div style={{ color: "var(--text-muted)", padding: 20 }}>Loading summary…</div>;
  }

  return (
    <>
      <div className="username">
        <h6>👋 Welcome back, Trader!</h6>
      </div>

      {/* Equity section */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>
        <div className="data">
          <div className="first">
            <h3>₹3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins used <span>₹0</span>
            </p>
            <p>
              Opening balance <span>₹3.74k</span>
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
              <small style={{ marginLeft: 8 }}>
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
