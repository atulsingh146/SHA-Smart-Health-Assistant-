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
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/health-tracker", healthRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/tip", tipRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
});
