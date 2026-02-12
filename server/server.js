import { setServers } from "node:dns/promises";
setServers(["8.8.4.4", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

import healthRoutes from "./src/routes/health.routes.js";
import aiRoutes from "./src/routes/ai.routes.js";
import chatRoutes from "./src/routes/chat.routes.js";
import emergencyRoutes from "./src/routes/emergency.routes.js";
import tipRoutes from "./src/routes/tip.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();

/* ==============================
   CORS CONFIG (Frontend Ready)
================================= */

// Replace this with your actual frontend URL after deploy
const allowedOrigins = [
  "http://localhost:5000",
  "https://sha-smart-health-assistant-1.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

/* ==============================
   TEST ROUTES
================================= */

app.get("/", (req, res) => {
  res.send("Smart Health API Running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

/* ==============================
   API ROUTES
================================= */

app.use("/api/auth", authRoutes);
app.use("/api/health-tracker", healthRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/tip", tipRoutes);

/* ==============================
   START SERVER
================================= */

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
