const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getAccount,
  deposit,
  withdraw,
  getTransactions
} = require("../controllers/accountController");

router.get("/", auth, getAccount);
router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);
router.get("/transactions", auth, getTransactions);

module.exports = router;