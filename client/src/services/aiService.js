import api from "./api";

export async function analyzeSymptoms({ symptoms, severity, duration }) {
  const response = await api.post("/ai/symptom-check", {
    symptoms,
    severity,
    duration,
  });

  return response.data;
}
export async function getSymptomHistory() {
  const res = await api.get("/ai/history");
  return res.data;
}

export async function getHealthTip() {
  const res = await api.get("/tip");

  if (typeof res.data === "string") {
    return res.data;
  }

  if (res.data?.tip) {
    return res.data.tip;
  }

  return "";
}