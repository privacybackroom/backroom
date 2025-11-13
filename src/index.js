const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const { PORT } = require("./config");
const corsMiddleware = require("./cors");
const healthRouter = require("./routes/health");
const instructionsRouter = require("./routes/instructions");

const app = express();

// Security headers (CSP disabled because this is API-only)
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// Simple logging
app.use(morgan("dev"));

// JSON parser
app.use(express.json());

// CORS for API routes
app.use(corsMiddleware);

// Routes
app.use("/health", healthRouter);
app.use("/shielded-instruction", instructionsRouter);

// Root endpoint for quick check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "privacy-backroom-backend",
    health: "/health",
    instructions: "/shielded-instruction"
  });
});

// Error handler (including CORS errors)
app.use((err, req, res, next) => {
  if (err && err.message && err.message.startsWith("The CORS policy")) {
    return res.status(403).json({
      error: "CORS_NOT_ALLOWED",
      message: err.message
    });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Unexpected error."
  });
});

app.listen(PORT, () => {
  console.log(`Privacy Backroom backend listening on port ${PORT}`);
});
