import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Funds = () => {
  const [funds, setFunds] = useState(100000.00);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amountInput, setAmountInput] = useState("");
  const [upiIdInput, setUpiIdInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchFunds = () => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${BACKEND_URL}/verify`, { headers })
      .then(res => {
        if (res.data?.user?.funds !== undefined) {
          setFunds(res.data.user.funds);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Funds fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const handleAddFundsSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    setErrorMsg("");

    axios.post(`${BACKEND_URL}/addFunds`, { amount: Number(amountInput) }, { headers })
      .then(res => {
        if (res.data.success) {
          setFunds(res.data.funds);
          setShowAddModal(false);
          setAmountInput("");
          setUpiIdInput("");
        } else {
          setErrorMsg(res.data.message || "Failed to deposit.");
        }
      })
      .catch(err => {
        setErrorMsg(err.response?.data?.message || "Deposit error.");
      });
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    setErrorMsg("");

    axios.post(`${BACKEND_URL}/withdrawFunds`, { amount: Number(amountInput) }, { headers })
      .then(res => {
        if (res.data.success) {
          setFunds(res.data.funds);
          setShowWithdrawModal(false);
          setAmountInput("");
        } else {
          setErrorMsg(res.data.message || "Failed to withdraw.");
        }
      })
      .catch(err => {
        setErrorMsg(err.response?.data?.message || "Withdrawal error.");
      });
  };

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
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading funds balance...</span>
      </div>
    );
  }

  const formattedFunds = funds.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button className="btn btn-green" onClick={() => { setShowAddModal(true); setErrorMsg(""); setAmountInput(""); }}>Add funds</button>
        <button className="btn btn-blue" style={{ marginLeft: 12 }} onClick={() => { setShowWithdrawModal(true); setErrorMsg(""); setAmountInput(""); }}>Withdraw</button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{formattedFunds}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹0.00</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹{formattedFunds}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹{formattedFunds}</p>
            </div>
            <div className="data">
              <p>Live Balance</p>
              <p>₹{formattedFunds}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account active</p>
            <button className="btn btn-blue" style={{ opacity: 0.6, cursor: "not-allowed" }} disabled>Activate Commodity</button>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddModal && (
        <div style={modalOverlayStyle}>
          <div className="card-3d" style={modalContentStyle}>
            <h3 className="grad-blue" style={{ fontSize: "16px", fontWeight: "700", marginBottom: "18px", color: "var(--accent-green)" }}>
              📥 Add Funds via UPI
            </h3>
            <form onSubmit={handleAddFundsSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Amount (₹)</label>
                <input 
                  type="number" 
                  min="100" 
                  placeholder="e.g. 5000" 
                  value={amountInput}
                  onChange={e => setAmountInput(e.target.value)}
                  style={inputStyle}
                  required 
                />
              </div>
              <div>
                <label style={labelStyle}>UPI ID (VPA)</label>
                <input 
                  type="text" 
                  placeholder="e.g. trader@upi" 
                  value={upiIdInput}
                  onChange={e => setUpiIdInput(e.target.value)}
                  style={inputStyle}
                  required 
                />
              </div>

              {errorMsg && (
                <div style={errorStyle}>⚠️ {errorMsg}</div>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button type="submit" className="btn btn-green" style={{ flex: 1, height: "38px" }}>Deposit</button>
                <button type="button" className="btn btn-grey" onClick={() => setShowAddModal(false)} style={{ flex: 1, height: "38px" }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      {showWithdrawModal && (
        <div style={modalOverlayStyle}>
          <div className="card-3d" style={modalContentStyle}>
            <h3 className="grad-blue" style={{ fontSize: "16px", fontWeight: "700", marginBottom: "18px", color: "var(--accent-blue)" }}>
              📤 Withdraw Funds
            </h3>
            <form onSubmit={handleWithdrawSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Withdrawal Amount (₹)</label>
                <input 
                  type="number" 
                  min="100" 
                  max={funds}
                  placeholder={`Max: ₹${funds.toFixed(2)}`} 
                  value={amountInput}
                  onChange={e => setAmountInput(e.target.value)}
                  style={inputStyle}
                  required 
                />
              </div>

              {errorMsg && (
                <div style={errorStyle}>⚠️ {errorMsg}</div>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button type="submit" className="btn btn-blue" style={{ flex: 1, height: "38px" }}>Withdraw</button>
                <button type="button" className="btn btn-grey" onClick={() => setShowWithdrawModal(false)} style={{ flex: 1, height: "38px" }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

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
  width: "360px",
  background: "var(--bg-2)",
  border: "1px solid var(--glass-border)",
  padding: "28px",
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

const errorStyle = {
  fontSize: "12px",
  color: "var(--accent-red)",
  background: "rgba(255,77,77,0.08)",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid rgba(255,77,77,0.15)"
};

export default Funds;
