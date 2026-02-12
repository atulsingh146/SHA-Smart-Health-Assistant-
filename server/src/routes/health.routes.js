import { Router } from "express";
import auth from "../middlewares/auth.js";
import { saveDaily, getHistory } from "../controllers/health.controller.js";

const router = Router();

router.post("/daily", auth, saveDaily);
router.get("/history", auth, getHistory);

export default router;
