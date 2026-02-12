import api from "./api";

export async function saveDailyHealth(data) {
  const res = await api.post("/health-tracker/daily", data);
  return res.data;
}

export async function getHealthHistory() {
  const res = await api.get("/health-tracker/history");
  return res.data;
}
