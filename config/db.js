const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLASDB_URL, {
        });
        console.log("✅ DB Connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};

module.exports = connectDB;
