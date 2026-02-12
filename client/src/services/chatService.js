import api from "./api";


export async function sendChatMessage(message) {
  const res = await api.post("/chat/message", { message });
  return res.data;
}

export async function getChatHistory() {
  const res = await api.get("/chat/history");
  return res.data;
}
