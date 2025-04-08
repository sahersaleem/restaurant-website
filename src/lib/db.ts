import mongoose from "mongoose";

export default async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log(" Already connected to MongoDB");
    return mongoose.connection.asPromise();
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  try {
    await mongoose.connect(uri);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error);
    throw error;
  }
}
