const errorMiddleware = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    err.message = "Invalid ID format";
  }

  // Duplicate key (MongoDB)
  if (err.code === 11000) {
    statusCode = 400;
    err.message = "Duplicate field value (Email already exists)";
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    err.message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    err.message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};

module.exports = errorMiddleware;