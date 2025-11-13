import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/database.js";

// Import routes
import menuRoutes from "./routes/menuRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cloudinaryConfig from "./config/cloudinary.js";

// Load environment variables
dotenv.config();

// Express app setup
const app = express();
const PORT = process.env.PORT || 5000;

// Current directory setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS middleware: allow localhost and any frontend on Render
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests (curl, Postman)
      if (
        origin.includes("localhost") ||
        origin.includes("onrender.com") ||
        origin === process.env.FRONTEND_URL
      ) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/api", (req, res) => {
  res.json({
    message: "KAI Restaurant API Server",
    status: "Running",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/categories", categoryRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // SPA fallback for React Router
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack || err);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    cloudinaryConfig();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
