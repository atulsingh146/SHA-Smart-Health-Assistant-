import { generateAI } from "../utils/aiClient.js";

export async function getHealthTip(req, res) {
  try {
    const prompt = `
You are a health assistant.
Give one short daily health tip.
Maximum 20 words.
No diagnosis.
`;

    const tip = await generateAI(prompt);

    res.json({ tip });
  } catch (err) {
    console.error("Tip Error:", err);
    res.status(500).json({ error: err.message });
  }
}
