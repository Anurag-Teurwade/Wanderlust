const express = require("express");
const router = express.Router();
const { callAI } = require("../utils/aiService");

router.post("/", async (req, res) => {
  const { query } = req.body;

console.log("📦 Headers received:", req.headers);
console.log("📦 Full body received:", req.body);



  if (!query || typeof query !== 'string') {
    console.error("🔴 Invalid query format");
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const response = await callAI(query);
    console.log("🟢 AI Responded:", response);
    res.json({ response });
  } catch (err) {
    console.error("❌ Error while calling AI:", err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

module.exports = router;
