const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getAIHealthTip(weeklyData) {
  if (!weeklyData || weeklyData.length === 0) {
    return "Start tracking your health to receive AI-based tips.";
  }

  const summary = weeklyData
    .map(d => `Day ${d.day}: Sleep ${d.sleep} hrs, Water ${d.water} cups`)
    .join(", ");

  const prompt = `
You are a health assistant.
Analyze weekly sleep and water data.
Give ONE short, safe health tip.
Do NOT give medical diagnosis.
Avoid scary language.

Weekly data:
${summary}
`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text
    || "Maintain healthy habits for better wellness.";
}
