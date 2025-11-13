const express = require("express");
const { validateInstruction } = require("../utils/validateInstruction");
const { addInstruction, getInstructions } = require("../store/memoryStore");

const router = express.Router();

// POST /shielded-instruction
router.post("/", (req, res) => {
  const payload = req.body;
  const { valid, errors } = validateInstruction(payload);

  if (!valid) {
    return res.status(400).json({
      error: "INVALID_INSTRUCTION",
      details: errors
    });
  }

  const saved = addInstruction(payload);

  return res.status(201).json({
    status: "accepted",
    id: saved.id,
    receivedAt: saved.receivedAt
  });
});

// Optional: GET /shielded-instruction (for debugging / dashboards)
router.get("/", (req, res) => {
  const items = getInstructions();
  res.json({
    count: items.length,
    items
  });
});

module.exports = router;
