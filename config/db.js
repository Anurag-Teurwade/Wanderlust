const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLASDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ DB Connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};

module.exports = connectDB;
