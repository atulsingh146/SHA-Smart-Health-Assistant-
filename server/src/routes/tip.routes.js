import { Router } from "express";
import { getHealthTip } from "../controllers/tip.controller.js";

const router = Router();

router.get("/", getHealthTip);

export default router;
