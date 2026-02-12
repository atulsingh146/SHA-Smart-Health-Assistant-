import { useState } from "react";
import { analyzeSymptoms } from "../services/aiService";
import { detectEmergencyRisk } from "../services/emergencyRules";
import SymptomHistorySidebar from "../components/SymptomHistorySidebar";
import EmergencyAlert from "../pages/EmergencyAlert";
import { useRisk } from "../context/RiskContext";


export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState(3);
  const [duration, setDuration] = useState("1-2 days");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [emergency, setEmergency] = useState(null);
const { riskLevel, setRiskLevel } = useRisk();


  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      alert("Please describe your symptoms");
      return;
    }

    setResult(null);
    setEmergency(null);

    const risk = detectEmergencyRisk(symptoms);

    if (risk.level === "HIGH") {
      setEmergency(risk);
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeSymptoms({
        symptoms,
        severity,
        duration,
      });

      setResult(response);

      if (risk.level === "MEDIUM") {
        setEmergency(risk);
      }

    } catch (error) {
      console.error("AI Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSymptomChange = (e) => {
    const value = e.target.value;
    setSymptoms(value);

    const risk = detectEmergencyRisk(value);
    setRiskLevel(risk.level);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

  
        <div className="space-y-6  bg-gradient-to-br from-violet-50 to-white  rounded-3xl p-4 shadow-md">

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              AI Symptom Checker
            </h1>
            <p className="text-slate-600 mt-1">
              Describe how you’re feeling and get AI-powered health guidance.
            </p>
          </div>

  
          <div className=" space-y-5  bg-gradient-to-br from-violet-50 to-white  rounded-3xl p-4 shadow-md">

            <div>
              <label className="font-medium text-slate-700">
                Your Symptoms
              </label>
              <textarea
                rows="4"
                value={symptoms}
                onChange={handleSymptomChange}
                placeholder="e.g. fever, headache, sore throat"
                className="w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

    
            <div>
              <label className="font-medium text-slate-700">
                Severity:{" "}
                <span className="text-teal-600 font-semibold">
                  {severity}/5
                </span>
              </label>
<input
  type="range"
  min="1"
  max="5"
  value={severity}
  onChange={(e) => setSeverity(Number(e.target.value))}
  className="w-full mt-3 h-2 rounded-lg bg-slate-200 accent-teal-600 cursor-pointer"
/>

            </div>


            <div>
              <label className="font-medium text-slate-700">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full mt-2 border rounded-xl p-3 bg-teal-50"
              >
                <option>Few hours</option>
                <option>1-2 days</option>
                <option>3-5 days</option>
                <option>More than a week</option>
              </select>
            </div>


            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`w-full font-semibold py-3 rounded-xl transition ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : riskLevel === "HIGH"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : riskLevel === "MEDIUM"
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              {loading
                ? "Analyzing..."
                : riskLevel === "HIGH"
                ? "Seek Immediate Help"
                : "Analyze Symptoms"}
            </button>

            <p className="text-xs text-slate-500 text-center">
              This tool does not replace professional medical advice.
            </p>
          </div>

          {emergency && (
            <EmergencyAlert
              level={emergency.level}
              message={emergency.message}
            />
          )}

          {result && (
            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">
                AI Assessment
              </h2>

              <p className="whitespace-pre-line">
                <strong>Possible Causes:</strong>
                <br />
                {result.causes}
              </p>

              <p className="whitespace-pre-line">
                <strong>Advice:</strong>
                <br />
                {result.advice}
              </p>
            </div>
          )}

        </div>
        <div className="sticky top-6 h-fit">
          <SymptomHistorySidebar />
        </div>

      </div>
    </div>
  );
}
