const axios = require('axios');
const { geminiApiKey, modelEndpoint } = require('../config/aiConfig');

const callAI = async (userInput) => {
  try {
    console.log("🧠 User Input Received:", userInput);

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: userInput }]
        }
      ]
    };

    console.log("📦 Sending to Gemini:", JSON.stringify(payload, null, 2));

    const response = await axios.post(
      `${modelEndpoint}?key=${geminiApiKey}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Gemini Response:", JSON.stringify(response.data, null, 2));

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini AI."
    );
  } catch (err) {
    console.error("\n❌ Gemini API Error Occurred:");

    if (err.response) {
      // Gemini responded with an error
      console.error("📛 Status Code:", err.response.status);
      console.error("📛 Error Data:", JSON.stringify(err.response.data, null, 2));
      console.error("📛 Headers:", JSON.stringify(err.response.headers, null, 2));
    } else if (err.request) {
      // No response from Gemini
      console.error("❗ No response received:", err.request);
    } else {
      // General error
      console.error("❗ Request setup error:", err.message);
    }

    return "AI request failed. Please check the console for error details.";
  }
};

module.exports = { callAI };
