import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AssignmentOutlined } from "@mui/icons-material";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(`${BACKEND_URL}/allOrders`, { headers })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Orders fetch error:", err);
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
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading orders...</span>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">
        Orders <span>{orders.length}</span>
      </h3>

      {orders.length === 0 ? (
        <div className="orders">
          <div className="no-orders">
            <AssignmentOutlined
              className="icon"
              style={{ fontSize: 64, color: "var(--text-muted)", opacity: 0.4 }}
            />
            <p>You haven't placed any orders today</p>
            <Link to="/dashboard" className="btn btn-blue">
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="order-table" style={{ marginTop: 20 }}>
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const modeClass = order.mode === "BUY" ? "profit" : "loss";
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price > 0 ? `₹${order.price.toFixed(2)}` : "Market"}</td>
                    <td className={modeClass} style={{ fontWeight: 600 }}>{order.mode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;
