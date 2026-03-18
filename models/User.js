const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 0 },
  refreshToken: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);