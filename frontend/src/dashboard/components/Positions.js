import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(`${BACKEND_URL}/allPositions`, { headers })
      .then((res) => {
        setPositions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Positions fetch error:", err);
        setLoading(false);
      });
  }, []);

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
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading positions...</span>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">
        Positions <span>{positions.length}</span>
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>
                  No open positions
                </td>
              </tr>
            ) : (
              positions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
