const User = require("../models/User");
const Transaction = require("../models/Transaction");

// Get account
exports.getAccount = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// Deposit
exports.deposit = async (req, res) => {
  const { amount } = req.body;

  const user = await User.findById(req.user.id);
  user.balance += amount;
  await user.save();

  await Transaction.create({
    userId: user._id,
    type: "deposit",
    amount
  });

  res.json({ balance: user.balance });
};

// Withdraw
exports.withdraw = async (req, res) => {
  const { amount } = req.body;

  const user = await User.findById(req.user.id);

  if (user.balance < amount)
    return res.status(400).json({ msg: "Insufficient balance" });

  user.balance -= amount;
  await user.save();

  await Transaction.create({
    userId: user._id,
    type: "withdraw",
    amount
  });

  res.json({ balance: user.balance });
};

// Transactions
exports.getTransactions = async (req, res) => {
  const tx = await Transaction.find({ userId: req.user.id });
  res.json(tx);
};