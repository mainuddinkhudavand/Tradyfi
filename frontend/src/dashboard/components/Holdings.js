import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { BACKEND_URL } from "../../config";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(`${BACKEND_URL}/allHoldings`, { headers })
      .then((res) => {
        setAllHoldings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Holdings fetch error:", err);
        setLoading(false);
      });
  }, []);

  const labels = allHoldings.map((s) => s["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(61, 127, 255, 0.5)",
        borderColor: "rgba(61, 127, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Compute totals
  const totalInvestment = allHoldings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const totalCurrent    = allHoldings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const totalPnl        = totalCurrent - totalInvestment;
  const pnlClass        = totalPnl >= 0 ? "profit" : "loss";
  const pnlPercent      = totalInvestment > 0 ? (totalPnl / totalInvestment) * 100 : 0;

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
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading holdings...</span>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">
        Holdings <span>{allHoldings.length}</span>
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            ₹{totalInvestment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            ₹{totalCurrent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={pnlClass}>
            {totalPnl >= 0 ? "+" : ""}₹{Math.abs(totalPnl).toFixed(2)} (
            {pnlPercent.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      {allHoldings.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <VerticalGraph data={data} />
        </div>
      )}
    </>
  );
};

export default Holdings;
