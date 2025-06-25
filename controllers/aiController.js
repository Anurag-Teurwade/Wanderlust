const { callAI } = require('../utils/aiService');

const respondToPrompt = async (req, res) => {
  const { query } = req.body; // ✅ match key
  try {
    const response = await callAI(query);
    res.json({ response });
  } catch (error) {
    console.error("❌ Error in respondToPrompt:", error);
    res.status(500).json({ error: 'AI processing failed' });
  }
};

module.exports = { respondToPrompt };
