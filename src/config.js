const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env if present
dotenv.config({ path: path.join(process.cwd(), ".env") });

const PORT = process.env.PORT || 4000;

// Example: "https://privacybackroom.app,http://localhost:5173"
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ||
  "https://privacybackroom.app")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

module.exports = {
  PORT,
  ALLOWED_ORIGINS,
  LOG_LEVEL
};
