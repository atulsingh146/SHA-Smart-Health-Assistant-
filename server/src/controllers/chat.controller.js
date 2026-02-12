import Chat from "../models/Chat.js";
import { generateAI } from "../utils/aiClient.js";

export async function sendMessage(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const userMsg = await Chat.create({
      role: "user",
      message,
    });

    const prompt = `
You are a health assistant.

Respond ONLY in this format:

• Point 1
• Point 2
• Point 3
• Point 4
• Point 5

Maximum 5 points.
Keep each point short (1 sentence).
No diagnosis. No medicines.

Question:
${message}
`;

    const reply = await generateAI(prompt);

    let formatted = reply
      .replace(/(\d+\.)/g, "\n•")
      .replace(/•/g, "\n•")
      .trim();

    if (formatted.startsWith("\n")) {
      formatted = formatted.substring(1);
    }
    const aiMsg = await Chat.create({
      role: "assistant",
      message: reply,
    });

    res.json({
      user: userMsg,
      assistant: aiMsg,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export async function getChatHistory(req, res) {
  const messages = await Chat.find().sort({ createdAt: 1 });
  res.json(messages);
}
