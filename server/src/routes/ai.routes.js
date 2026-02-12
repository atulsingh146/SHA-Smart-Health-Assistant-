import { Router } from "express";
import {
  symptomCheck,
  getSymptomHistory,
} from "../controllers/ai.controller.js";

const router = Router();

router.post("/symptom-check", symptomCheck);
router.get("/history", getSymptomHistory);

export default router;
