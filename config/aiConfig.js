require('dotenv').config();

module.exports = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  modelEndpoint: "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent"
};
