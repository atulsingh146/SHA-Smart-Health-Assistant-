import { useRisk } from "../context/RiskContext";
import { useNavigate } from "react-router-dom";

export default function EmergencyButton() {
  const { riskLevel } = useRisk();
  const navigate = useNavigate();

  let styles = "";
  let text = "";

  if (riskLevel === "HIGH") {
    styles = "bg-red-600 hover:bg-red-700 animate-pulse";
    text = "🚨Emergency";
  } 
  else if (riskLevel === "MEDIUM") {
    styles = "bg-yellow-500 hover:bg-yellow-600";
    text = "⚠️Urgent";
  } 
  else {
    styles = "bg-green-600 hover:bg-green-700";
    text = "Safe";
  }

  return (
    <button
      onClick={() => navigate("/emergency")}
      className={`fixed bottom-6 right-6 text-white font-semibold px-6 py-3 rounded-full shadow-xl transition transform hover:scale-105 z-50 ${styles}`}
    >
      {text}
    </button>
  );
}
