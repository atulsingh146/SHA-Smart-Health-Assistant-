import { z } from "zod";
import { generateAI } from "../utils/aiClient.js";
import Symptom from "../models/Symptom.js";

const schema = z.object({
  symptoms: z.string(),
  severity: z.number(),
  duration: z.string(),
});

export async function symptomCheck(req, res) {
  try {
    const { symptoms, severity, duration } = schema.parse(req.body);

    const prompt = `
You are a health assistant.
Do NOT diagnose.
Do NOT prescribe medicine.

Symptoms: ${symptoms}
Severity: ${severity}/5
Duration: ${duration}

Respond ONLY in this JSON format:

{
  "causes": "...",
  "advice": "..."
}
`;

    const aiText = await generateAI(prompt);

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch {
      parsed = {
        causes: aiText,
        advice: "Monitor symptoms and consult a doctor if condition worsens.",
      };
    }
    const saved = await Symptom.create({
      symptoms,
      severity,
      duration,
      causes: parsed.causes,
      advice: parsed.advice,
    });

    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
export async function getSymptomHistory(req, res) {
  const history = await Symptom.find().sort({ createdAt: -1 });
  res.json(history);
}
