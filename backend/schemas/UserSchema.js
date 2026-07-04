const { Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true,
    unique: true
  },
  funds: {
    type: Number,
    default: 100000.00
  },
  marginUsed: {
    type: Number,
    default: 0.00
  },
  totalDeposits: {
    type: Number,
    default: 100000.00
  },
  totalWithdrawals: {
    type: Number,
    default: 0.00
  },
  totalTrades: {
    type: Number,
    default: 18
  },
  netPnl: {
    type: Number,
    default: 3740.00
  }
});

module.exports = { UserSchema };
