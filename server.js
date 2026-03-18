const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
const errorMiddleware = require("./middleware/errorMiddleware");

app.use(errorMiddleware);