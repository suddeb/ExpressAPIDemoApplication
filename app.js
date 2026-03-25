const express = require("express");
const rateLimit = require("express-rate-limit");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Rate Limiting ────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                // Limit each IP to 100 requests per windowMs
  standardHeaders: true,   // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,    // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});

// ─── Global Middleware ────────────────────────────────────────────
app.use(express.json());          // Parse incoming JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static UI files
app.use(logger);                  // Log every request to the console

// ─── Health Check ─────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "express-api-demo is running 🚀",
    version: "1.0.0",
    endpoints: {
      users:    "/api/users",
      products: "/api/products",
    },
  });
});

// ─── API Routes ───────────────────────────────────────────────────
app.use("/api/users",    apiLimiter, usersRouter);
app.use("/api/products", apiLimiter, productsRouter);

// ─── 404 Handler ──────────────────────────────────────────────────
app.use((req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// ─── Central Error Handler ────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  Server running on http://localhost:${PORT}`);
  console.log(`🖥️   Web UI available at http://localhost:${PORT}`);
  console.log(`📦  Endpoints:`);
  console.log(`     GET  /api/health`);
  console.log(`     GET  /api/users`);
  console.log(`     GET  /api/users/:id`);
  console.log(`     POST /api/users`);
  console.log(`     PUT  /api/users/:id`);
  console.log(`    DEL  /api/users/:id`);
  console.log(`     GET  /api/products`);
  console.log(`     GET  /api/products/:id`);
  console.log(`     POST /api/products`);
  console.log(`     PUT  /api/products/:id`);
  console.log(`    DEL  /api/products/:id\n`);
});
