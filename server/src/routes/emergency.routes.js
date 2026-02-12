import { Router } from "express";
import { getEmergency } from "../controllers/emergency.controller.js";

const router = Router();

router.get("/", getEmergency);

export default router;
