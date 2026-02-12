export async function generateAI(prompt) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );


  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini Error:", errText);
    throw new Error(errText);
  }

  const data = await response.json();

  console.log("GEMINI RAW RESPONSE:", JSON.stringify(data, null, 2));

  const text =
    data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ") || "";

  return text.trim();
}