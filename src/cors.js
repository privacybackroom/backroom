const cors = require("cors");
const { ALLOWED_ORIGINS } = require("./config");

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server calls (no Origin header)
    if (!origin) {
      return callback(null, true);
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    const msg =
      "The CORS policy for this site does not allow access from the specified Origin: " +
      origin;
    return callback(new Error(msg), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
  optionsSuccessStatus: 204
};

module.exports = cors(corsOptions);
