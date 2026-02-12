import { Router } from "express";
import {
  sendMessage,
  getChatHistory,
} from "../controllers/chat.controller.js";

const router = Router();

router.post("/message", sendMessage);
router.get("/history", getChatHistory);

export default router;
