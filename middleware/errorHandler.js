// Central error handling middleware
// Must have 4 arguments so Express recognises it as an error handler
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || 500;

  console.error(`[ERROR] ${err.message}`);

  res.status(status).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      status,
    },
  });
}

module.exports = errorHandler;
