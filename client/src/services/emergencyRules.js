// High-risk symptoms (red flags)
const RED_FLAG_KEYWORDS = [
  "chest pain",
  "pain in chest",
  "difficulty breathing",
  "shortness of breath",
  "can't breathe",
  "fainting",
  "loss of consciousness",
  "severe bleeding",
  "stroke",
  "paralysis",
  "slurred speech",
  "seizure",
  "heart attack",
];

// Medium-risk symptoms
const YELLOW_FLAG_KEYWORDS = [
  "high fever",
  "persistent vomiting",
  "vomiting continuously",
  "severe headache",
  "confusion",
  "blurred vision",
];

export function detectEmergencyRisk(text) {
  if (!text) {
    return { level: "LOW", message: "" };
  }

  const input = text.toLowerCase().trim();

  for (let keyword of RED_FLAG_KEYWORDS) {
    if (input.includes(keyword)) {
      return {
        level: "HIGH",
        message:
          "🚨 This may be a medical emergency. Seek immediate medical attention.",
      };
    }
  }

  for (let keyword of YELLOW_FLAG_KEYWORDS) {
    if (input.includes(keyword)) {
      return {
        level: "MEDIUM",
        message:
          "⚠️ These symptoms may require urgent medical advice. Consider contacting a doctor.",
      };
    }
  }

  return {
    level: "LOW",
    message: "",
  };
}
