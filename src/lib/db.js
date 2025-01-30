import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please add your MongoDB URI to the .env file.");
}

let isConnected = false; // Track connection status

export default async function dbConnect() {
  if (isConnected) {
    console.log("⚡ Using existing database connection.");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Stop the app if DB connection fails
  }
}
