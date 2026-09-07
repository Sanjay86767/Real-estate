import mongoose from "mongoose";
import dns from "node:dns";

// Fix for Windows DNS resolving MongoDB Atlas SRV records
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  // Ignore if not permitted
}

let isConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/estatehub";

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ [MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ [MongoDB Notice]: Could not connect to MongoDB at ${mongoUri}`);
    console.warn(`💡 Tip: To connect to MongoDB Atlas, set MONGO_URI in 'backend/.env' (e.g., mongodb+srv://<user>:<password>@cluster.mongodb.net/estatehub)`);
    console.log(`⚡ [MERN Fallback Active]: In-Memory fallback store enabled for zero-friction local development!`);
    isConnected = false;
    return null;
  }
};

export const getDbStatus = () => ({
  connected: isConnected,
  mode: isConnected ? "MongoDB (Live Database)" : "In-Memory MERN Fallback",
  uri: process.env.MONGO_URI ? "MongoDB Atlas / Custom URI" : "Default Local URI"
});
