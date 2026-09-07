import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB, getDbStatus } from "./config/db.js";

// Routes
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health Check API
app.get("/api/health", (req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    service: "EstateHub MERN Backend API",
    version: "1.0.0",
    database: dbStatus,
  });
});

// Mount Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/agents", agentRoutes);

// Root Fallback
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 30px; background: #0b132b; color: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <h1 style="color: #64dfdf; margin-top: 0;">🏰 EstateHub MERN Backend API</h1>
      <p style="color: #cbd5e1;">Your Node.js + Express + MongoDB Server is running successfully!</p>
      <hr style="border: 0; border-top: 1px solid #1c2541; margin: 20px 0;" />
      <h3 style="color: #ffd166;">Available Endpoints:</h3>
      <ul style="line-height: 1.8; color: #94a3b8;">
        <li><a href="/api/health" style="color: #48cae4;">GET /api/health</a> - Health & Database status</li>
        <li><a href="/api/properties" style="color: #48cae4;">GET /api/properties</a> - Properties listing & filter</li>
        <li><a href="/api/agents" style="color: #48cae4;">GET /api/agents</a> - Verified RERA Agents</li>
        <li><a href="/api/visits" style="color: #48cae4;">GET /api/visits</a> - Inspection bookings</li>
        <li><a href="/api/deals" style="color: #48cae4;">GET /api/deals</a> - Deal Desk LOI term sheets</li>
      </ul>
    </div>
  `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found on this server` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 [EstateHub Server]: Running on http://localhost:${PORT}`);
  console.log(`📡 [API Health Check]: http://localhost:${PORT}/api/health`);
  console.log(`🏡 [Properties API]: http://localhost:${PORT}/api/properties\n`);
});
