const { nod_env } = require("../config");

// ErrorHandler.js
const ErrorHandler = (err, req, res, next) => {
  // console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: nod_env === "development" ? err.stack : undefined,
  });
};

module.exports = ErrorHandler;
