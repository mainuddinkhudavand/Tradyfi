require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "tradyfi_jwt_secret_key";

const isMock = !uri || uri.includes("<<your_mongoDB_url_here>>");

const corsOptions = {
  origin: (origin, callback) => {
    const sanitizeUrl = (url) => (url ? url.trim().replace(/\/+$/, "") : "");
    const allowed = [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      sanitizeUrl(process.env.FRONTEND_URL),
      sanitizeUrl(process.env.DASHBOARD_URL)
    ].filter(Boolean);
    const originSanitized = sanitizeUrl(origin);
    if (!origin || allowed.indexOf(originSanitized) !== -1 || process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ── Mock Datasets & State (For Mock Mode) ──────────────────────────────────
const STOCK_PRICES = {
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

const initialHoldings = [
  { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
  { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
  { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
  { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
  { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
  { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
  { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
  { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
  { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
  { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
  { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
  { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
  { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" }
];

const initialPositions = [
  { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
  { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true }
];

// Pre-seeded mock database state
const mockUsers = [
  {
    username: "Demo Trader",
    email: "trader@tradyfi.pro",
    phone: "9876543210",
    // bcrypt hash of "password123"
    password: bcrypt.hashSync("password123", 10),
    clientId: "TS-394851",
    funds: 100000.00,
    marginUsed: 0.00,
    totalDeposits: 100000.00,
    totalWithdrawals: 0.00,
    totalTrades: 18,
    netPnl: 3740.00
  }
];

const mockUserHoldings = {
  "TS-394851": JSON.parse(JSON.stringify(initialHoldings))
};

const mockUserPositions = {
  "TS-394851": JSON.parse(JSON.stringify(initialPositions))
};

const mockUserOrders = {
  "TS-394851": []
};

// Mock database connection if running in mock mode
if (isMock) {
  console.log("Running in MOCK mode (No valid MONGO_URL configured)");
  mongoose.connect = async () => {
    console.log("Mock DB connection simulated successfully.");
    return true;
  };
}

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Root health-check endpoint
app.get("/", (req, res) => {
  res.send("Tradyfi Pro REST API is running successfully!");
});

// ── Auth Token Verification Middleware ────────────────────────────────────
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token required." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
};

// ── Authentication Endpoints ──────────────────────────────────────────────

// Signup API
app.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const clientId = "TS-" + Math.floor(100000 + Math.random() * 900000);
  const passwordHash = bcrypt.hashSync(password, 10);

  if (isMock) {
    // Check duplicates
    if (mockUsers.some(u => u.email === email || u.username === name)) {
      return res.status(400).json({ success: false, message: "Username or Email already registered." });
    }

    const newUser = {
      username: name,
      email,
      phone,
      password: passwordHash,
      clientId,
      funds: 100000.00,
      marginUsed: 0.00
    };

    mockUsers.push(newUser);
    mockUserHoldings[clientId] = JSON.parse(JSON.stringify(initialHoldings));
    mockUserPositions[clientId] = JSON.parse(JSON.stringify(initialPositions));
    mockUserOrders[clientId] = [];

    return res.json({
      success: true,
      message: "Account created successfully!",
      clientId,
      username: name
    });
  } else {
    try {
      // Check existing in DB
      const existing = await UserModel.findOne({ $or: [{ email }, { username: name }] });
      if (existing) {
        return res.status(400).json({ success: false, message: "Username or Email already registered." });
      }

      const newUser = new UserModel({
        username: name,
        email,
        phone,
        password: passwordHash,
        clientId,
        funds: 100000.00,
        marginUsed: 0.00
      });
      await newUser.save();

      // Seed initial holdings and positions for the user in MongoDB
      for (const hold of initialHoldings) {
        await new HoldingsModel({ ...hold, clientId }).save();
      }
      for (const pos of initialPositions) {
        await new PositionsModel({ ...pos, clientId }).save();
      }

      return res.json({
        success: true,
        message: "Account created successfully!",
        clientId,
        username: name
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }
});

// Login API
app.post("/login", async (req, res) => {
  const { userid, password } = req.body;
  if (!userid || !password) {
    return res.status(400).json({ success: false, message: "User ID/Email and password required." });
  }

  if (isMock) {
    const cleanUserid = userid.replace(/-/g, "").toLowerCase();
    const user = mockUsers.find(u => {
      const matchClientId = u.clientId.replace(/-/g, "").toLowerCase() === cleanUserid;
      const matchEmail = u.email.toLowerCase() === userid.toLowerCase();
      const matchUsername = u.username.toLowerCase() === userid.toLowerCase();
      return matchClientId || matchEmail || matchUsername;
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { username: user.username, clientId: user.clientId, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({
      success: true,
      token,
      user: {
        username: user.username,
        clientId: user.clientId,
        email: user.email,
        phone: user.phone,
        funds: user.funds,
        totalDeposits: user.totalDeposits,
        totalWithdrawals: user.totalWithdrawals,
        totalTrades: user.totalTrades,
        netPnl: user.netPnl
      },
      message: "Login successful"
    });
  } else {
    try {
      const cleanUserid = userid.replace(/-/g, "");
      const possibleClientIds = [
        userid,
        userid.toUpperCase(),
        userid.toLowerCase(),
        cleanUserid,
        cleanUserid.toUpperCase(),
        cleanUserid.toLowerCase()
      ];
      if (cleanUserid.toLowerCase().startsWith("ts")) {
        const numericPart = cleanUserid.slice(2);
        possibleClientIds.push("TS-" + numericPart);
        possibleClientIds.push("ts-" + numericPart);
      }

      const user = await UserModel.findOne({
        $or: [
          { clientId: { $in: possibleClientIds } },
          { email: { $regex: new RegExp("^" + userid + "$", "i") } },
          { username: { $regex: new RegExp("^" + userid + "$", "i") } }
        ]
      });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ success: false, message: "Invalid credentials." });
      }

      const token = jwt.sign(
        { username: user.username, clientId: user.clientId, email: user.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.json({
        success: true,
        token,
        user: {
          username: user.username,
          clientId: user.clientId,
          email: user.email,
          phone: user.phone,
          funds: user.funds,
          totalDeposits: user.totalDeposits,
          totalWithdrawals: user.totalWithdrawals,
          totalTrades: user.totalTrades,
          netPnl: user.netPnl
        },
        message: "Login successful"
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }
});

// Verify Session API
app.get("/verify", authenticateToken, async (req, res) => {
  const clientId = req.user.clientId;
  if (isMock) {
    const user = mockUsers.find(u => u.clientId === clientId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.json({
      success: true,
      user: {
        username: user.username,
        clientId: user.clientId,
        email: user.email,
        phone: user.phone,
        funds: user.funds,
        totalDeposits: user.totalDeposits,
        totalWithdrawals: user.totalWithdrawals,
        totalTrades: user.totalTrades,
        netPnl: user.netPnl
      }
    });
  } else {
    try {
      const user = await UserModel.findOne({ clientId });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
      return res.json({
        success: true,
        user: {
          username: user.username,
          clientId: user.clientId,
          email: user.email,
          phone: user.phone,
          funds: user.funds,
          totalDeposits: user.totalDeposits,
          totalWithdrawals: user.totalWithdrawals,
          totalTrades: user.totalTrades,
          netPnl: user.netPnl
        }
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }
});

// ── Fund Operations Endpoints ─────────────────────────────────────────────

app.post("/addFunds", authenticateToken, async (req, res) => {
  const { amount } = req.body;
  const numAmt = Number(amount);
  if (isNaN(numAmt) || numAmt <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  if (isMock) {
    const user = mockUsers.find(u => u.clientId === req.user.clientId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    user.funds += numAmt;
    user.totalDeposits = (user.totalDeposits || 100000.00) + numAmt;
    return res.json({ success: true, funds: user.funds });
  } else {
    try {
      const user = await UserModel.findOne({ clientId: req.user.clientId });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
      user.funds += numAmt;
      user.totalDeposits = (user.totalDeposits || 100000.00) + numAmt;
      await user.save();
      return res.json({ success: true, funds: user.funds });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }
});

app.post("/withdrawFunds", authenticateToken, async (req, res) => {
  const { amount } = req.body;
  const numAmt = Number(amount);
  if (isNaN(numAmt) || numAmt <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  if (isMock) {
    const user = mockUsers.find(u => u.clientId === req.user.clientId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.funds < numAmt) {
      return res.status(400).json({ success: false, message: "Insufficient funds available." });
    }
    user.funds -= numAmt;
    user.totalWithdrawals = (user.totalWithdrawals || 0.00) + numAmt;
    return res.json({ success: true, funds: user.funds });
  } else {
    try {
      const user = await UserModel.findOne({ clientId: req.user.clientId });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
      if (user.funds < numAmt) {
        return res.status(400).json({ success: false, message: "Insufficient funds available." });
      }
      user.funds -= numAmt;
      user.totalWithdrawals = (user.totalWithdrawals || 0.00) + numAmt;
      await user.save();
      return res.json({ success: true, funds: user.funds });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }
});

// ── Portfolio & Order Endpoints (User Protected) ──────────────────────────

app.get("/allHoldings", authenticateToken, async (req, res) => {
  const clientId = req.user.clientId;
  if (isMock) {
    return res.json(mockUserHoldings[clientId] || []);
  } else {
    try {
      const holdings = await HoldingsModel.find({ clientId });
      res.json(holdings);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
});

app.get("/allPositions", authenticateToken, async (req, res) => {
  const clientId = req.user.clientId;
  if (isMock) {
    return res.json(mockUserPositions[clientId] || []);
  } else {
    try {
      const positions = await PositionsModel.find({ clientId });
      res.json(positions);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
});

app.get("/allOrders", authenticateToken, async (req, res) => {
  const clientId = req.user.clientId;
  if (isMock) {
    return res.json(mockUserOrders[clientId] || []);
  } else {
    try {
      const orders = await OrdersModel.find({ clientId });
      res.json(orders);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
});

app.post("/newOrder", authenticateToken, async (req, res) => {
  const { name, qty, price: inputPrice, mode } = req.body;
  const clientId = req.user.clientId;
  const quantity = Number(qty);

  if (!name || isNaN(quantity) || quantity <= 0 || !mode) {
    return res.status(400).json({ success: false, message: "Invalid order parameters" });
  }

  const stockPrice = inputPrice > 0 ? Number(inputPrice) : (STOCK_PRICES[name.toUpperCase()] || 100.00);
  const totalCost = stockPrice * quantity;

  if (isMock) {
    const user = mockUsers.find(u => u.clientId === clientId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.totalTrades = (user.totalTrades || 18) + 1;

    if (mode === "BUY") {
      if (user.funds < totalCost) {
        return res.status(400).json({
          success: false,
          message: `Insufficient funds. Required: ₹${totalCost.toFixed(2)}, Available: ₹${user.funds.toFixed(2)}`
        });
      }
      user.funds -= totalCost;

      // Update/Create Holding
      if (!mockUserHoldings[clientId]) mockUserHoldings[clientId] = [];
      const existingHolding = mockUserHoldings[clientId].find(h => h.name.toUpperCase() === name.toUpperCase());
      if (existingHolding) {
        const newQty = existingHolding.qty + quantity;
        existingHolding.avg = (existingHolding.avg * existingHolding.qty + stockPrice * quantity) / newQty;
        existingHolding.qty = newQty;
        existingHolding.price = stockPrice;
      } else {
        mockUserHoldings[clientId].push({
          name: name.toUpperCase(),
          qty: quantity,
          avg: stockPrice,
          price: stockPrice,
          net: "+0.00%",
          day: "+0.00%"
        });
      }

      // Update/Create Position
      if (!mockUserPositions[clientId]) mockUserPositions[clientId] = [];
      const existingPosition = mockUserPositions[clientId].find(p => p.name.toUpperCase() === name.toUpperCase());
      if (existingPosition) {
        existingPosition.qty += quantity;
        existingPosition.price = stockPrice;
      } else {
        mockUserPositions[clientId].push({
          product: "CNC",
          name: name.toUpperCase(),
          qty: quantity,
          avg: stockPrice,
          price: stockPrice,
          net: "+0.00%",
          day: "+0.00%",
          isLoss: false
        });
      }
    } else if (mode === "SELL") {
      if (!mockUserHoldings[clientId]) mockUserHoldings[clientId] = [];
      const holding = mockUserHoldings[clientId].find(h => h.name.toUpperCase() === name.toUpperCase());
      if (!holding || holding.qty < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient quantity. You own ${holding ? holding.qty : 0} shares of ${name}, but tried to sell ${quantity}.`
        });
      }

      user.funds += totalCost;
      holding.qty -= quantity;
      if (holding.qty === 0) {
        mockUserHoldings[clientId] = mockUserHoldings[clientId].filter(h => h.name.toUpperCase() !== name.toUpperCase());
      }

      // Update/Create Position
      if (!mockUserPositions[clientId]) mockUserPositions[clientId] = [];
      const position = mockUserPositions[clientId].find(p => p.name.toUpperCase() === name.toUpperCase());
      if (position) {
        position.qty -= quantity;
        if (position.qty === 0) {
          mockUserPositions[clientId] = mockUserPositions[clientId].filter(p => p.name.toUpperCase() !== name.toUpperCase());
        }
      }
    }

    // Save Order
    if (!mockUserOrders[clientId]) mockUserOrders[clientId] = [];
    mockUserOrders[clientId].push({
      name: name.toUpperCase(),
      qty: quantity,
      price: stockPrice,
      mode,
      clientId
    });

    return res.json({ success: true, message: "Order executed successfully!" });
  } else {
    // MongoDB mode
    try {
      const user = await UserModel.findOne({ clientId });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      user.totalTrades = (user.totalTrades || 18) + 1;
      await user.save();

      if (mode === "BUY") {
        if (user.funds < totalCost) {
          return res.status(400).json({
            success: false,
            message: `Insufficient funds. Required: ₹${totalCost.toFixed(2)}, Available: ₹${user.funds.toFixed(2)}`
          });
        }
        user.funds -= totalCost;
        await user.save();

        // Update HoldingsModel
        let holding = await HoldingsModel.findOne({ name: name.toUpperCase(), clientId });
        if (holding) {
          const newQty = holding.qty + quantity;
          holding.avg = (holding.avg * holding.qty + stockPrice * quantity) / newQty;
          holding.qty = newQty;
          holding.price = stockPrice;
          await holding.save();
        } else {
          await new HoldingsModel({
            name: name.toUpperCase(),
            qty: quantity,
            avg: stockPrice,
            price: stockPrice,
            net: "+0.00%",
            day: "+0.00%",
            clientId
          }).save();
        }

        // Update PositionsModel
        let position = await PositionsModel.findOne({ name: name.toUpperCase(), clientId });
        if (position) {
          position.qty += quantity;
          position.price = stockPrice;
          await position.save();
        } else {
          await new PositionsModel({
            product: "CNC",
            name: name.toUpperCase(),
            qty: quantity,
            avg: stockPrice,
            price: stockPrice,
            net: "+0.00%",
            day: "+0.00%",
            isLoss: false,
            clientId
          }).save();
        }
      } else if (mode === "SELL") {
        let holding = await HoldingsModel.findOne({ name: name.toUpperCase(), clientId });
        if (!holding || holding.qty < quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient quantity. You own ${holding ? holding.qty : 0} shares of ${name.toUpperCase()}, but tried to sell ${quantity}.`
          });
        }

        user.funds += totalCost;
        await user.save();

        holding.qty -= quantity;
        if (holding.qty === 0) {
          await HoldingsModel.deleteOne({ _id: holding._id });
        } else {
          await holding.save();
        }

        let position = await PositionsModel.findOne({ name: name.toUpperCase(), clientId });
        if (position) {
          position.qty -= quantity;
          if (position.qty === 0) {
            await PositionsModel.deleteOne({ _id: position._id });
          } else {
            await position.save();
          }
        }
      }

      // Save Order
      await new OrdersModel({
        name: name.toUpperCase(),
        qty: quantity,
        price: stockPrice,
        mode,
        clientId
      }).save();

      return res.json({ success: true, message: "Order executed successfully!" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Backend server started on port ${PORT}!`);
  mongoose.connect(uri).then(async () => {
    console.log("Database connection initialized!");
    if (!isMock) {
      try {
        const demoUser = await UserModel.findOne({ clientId: "TS-394851" });
        if (!demoUser) {
          const passwordHash = bcrypt.hashSync("password123", 10);
          await new UserModel({
            username: "Demo Trader",
            email: "trader@tradyfi.pro",
            phone: "9876543210",
            password: passwordHash,
            clientId: "TS-394851",
            funds: 100000.00,
            marginUsed: 0.00,
            totalDeposits: 100000.00,
            totalWithdrawals: 0.00,
            totalTrades: 18,
            netPnl: 3740.00
          }).save();
          console.log("Demo Trader seeded in MongoDB!");

          // Seed default holdings and positions in MongoDB
          for (const hold of initialHoldings) {
            await new HoldingsModel({ ...hold, clientId: "TS-394851" }).save();
          }
          for (const pos of initialPositions) {
            await new PositionsModel({ ...pos, clientId: "TS-394851" }).save();
          }
          console.log("Demo Trader portfolio seeded in MongoDB!");
        }
      } catch (err) {
        console.error("Error auto-seeding Demo Trader in MongoDB:", err);
      }
    }
  }).catch(err => {
    console.error("Database connection failed:", err);
  });
});
