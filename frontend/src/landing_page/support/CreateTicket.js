import React from "react";

const SUPPORT_TOPICS = [
  {
    title: "Account Opening",
    icon: "📋",
    links: [
      { label: "Online Account Opening", url: "https://support.zerodha.com/category/account-opening/online-account-opening" },
      { label: "Offline Account Opening", url: "https://support.zerodha.com/category/account-opening/offline-account-opening" },
      { label: "NRI Account Opening", url: "https://support.zerodha.com/category/account-opening/nri-account-opening" },
      { label: "Charges at Tradyfi", url: "https://zerodha.com/charges" },
    ],
  },
  {
    title: "Your Tradyfi Account",
    icon: "👤",
    links: [
      { label: "Login Credentials & Security", url: "https://support.zerodha.com/category/your-zerodha-account/login-credentials" },
      { label: "Profile & Personal Settings", url: "https://support.zerodha.com/category/your-zerodha-account/your-profile" },
      { label: "Nominee & Re-KYC", url: "https://support.zerodha.com/category/your-zerodha-account/nomination" },
      { label: "Account Closure & Deactivation", url: "https://support.zerodha.com/category/your-zerodha-account/account-closure-deactivation" },
    ],
  },
  {
    title: "Trading & Markets",
    icon: "📈",
    links: [
      { label: "Kite Platform & Charts", url: "https://support.zerodha.com/category/trading-and-markets/kite" },
      { label: "Margins & Collateral Limits", url: "https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-types" },
      { label: "Order Types & Market Hours", url: "https://support.zerodha.com/category/trading-and-markets/kite/order-types" },
      { label: "Corporate Actions & Pledging", url: "https://support.zerodha.com/category/trading-and-markets/corporate-actions" },
    ],
  },
  {
    title: "Funds & Withdrawals",
    icon: "💰",
    links: [
      { label: "Adding Funds (UPI, Netbanking)", url: "https://support.zerodha.com/category/funds-funding/adding-funds" },
      { label: "Fund Withdrawal Timelines", url: "https://support.zerodha.com/category/funds-funding/withdrawal-fund-transfer" },
      { label: "e-Mandates & Auto-Pay", url: "https://support.zerodha.com/category/funds-funding/e-mandates" },
      { label: "Instant Fund Transfers", url: "https://support.zerodha.com/category/funds-funding/withdrawal-fund-transfer" },
    ],
  },
  {
    title: "Console & Reports",
    icon: "📊",
    links: [
      { label: "Ledger & Account Statements", url: "https://support.zerodha.com/category/console/ledger" },
      { label: "Portfolio Holding Reports", url: "https://support.zerodha.com/category/console/portfolio" },
      { label: "Tax P&L Reports & Calculations", url: "https://support.zerodha.com/category/console/reports" },
      { label: "Tradebook & Transaction Details", url: "https://support.zerodha.com/category/console/reports" },
    ],
  },
  {
    title: "Coin Mutual Funds",
    icon: "🎯",
    links: [
      { label: "Direct Mutual Fund Investing", url: "https://support.zerodha.com/category/mutual-funds/coin-web" },
      { label: "SIP Setup & Management", url: "https://support.zerodha.com/category/mutual-funds/coin-web" },
      { label: "National Pension Scheme (NPS)", url: "https://support.zerodha.com/category/mutual-funds/coin-web" },
      { label: "Redemptions & Settlements", url: "https://support.zerodha.com/category/mutual-funds/coin-web" },
    ],
  },
];

function CreateTicket() {
  return (
    <div className="section anim-fade-up d1">
      <div className="wrapper">
        <div style={{ marginBottom: "44px" }}>
          <h2 className="heading-md" style={{ color: "var(--text-primary)" }}>Browse Help Topics</h2>
          <p className="body-md" style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Select a category to view answers, guides, and create a support ticket.
          </p>
        </div>

        <div className="grid-3" style={{ gap: "28px" }}>
          {SUPPORT_TOPICS.map((topic) => (
            <div className="card-3d" style={{ padding: "32px" }} key={topic.title}>
              <h3 
                className="heading-md" 
                style={{ 
                  fontSize: "17.5px", 
                  fontWeight: "700", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "10px", 
                  marginBottom: "20px", 
                  color: "var(--text-primary)" 
                }}
              >
                <span style={{ fontSize: "20px" }}>{topic.icon}</span>
                {topic.title}
              </h3>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                {topic.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: "12px" }}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        fontSize: "13.5px", 
                        color: "var(--text-muted)", 
                        lineHeight: "1.6", 
                        transition: "color 0.2s" 
                      }}
                      onMouseOver={e=>e.currentTarget.style.color="var(--accent-cyan)"}
                      onMouseOut={e=>e.currentTarget.style.color="var(--text-muted)"}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
