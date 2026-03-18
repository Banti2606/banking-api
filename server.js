const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));

// Root route (important for Render health check)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Error middleware
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

// Connect DB AFTER app setup
connectDB();

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});