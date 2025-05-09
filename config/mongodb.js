const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://barahawamdeh2003:bara2003s@healthcare.q0myc7e.mongodb.net/Helathcare?retryWrites=true&w=majority&appName=Helathcare",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: { w: "majority" },
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
