import { useState } from "react";
import { saveDailyHealth } from "../services/healthInsights";

export default function Tracker() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    date: today,
    sleepHours: "",
    waterGlasses: "",
    mood: "neutral",
    temperature: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await saveDailyHealth({
        ...form,
        sleepHours: Number(form.sleepHours),
        waterGlasses: Number(form.waterGlasses),
        temperature: form.temperature
          ? Number(form.temperature)
          : null,
      });

      setMessage("success");
    } catch (err) {
      setMessage("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 ">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Daily Health Tracker
        </h1>
        <p className="text-slate-600 mt-1">
          Log today’s health habits to stay consistent.
        </p>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5  bg-gradient-to-br from-violet-50 to-white  rounded-3xl p-4 shadow-md">

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-medium text-slate-700">
              Sleep Hours
            </label>
            <input
              type="number"
              min="0"
              max="24"
              name="sleepHours"
              value={form.sleepHours}
              onChange={handleChange}
              placeholder="e.g. 7"
              className="w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="font-medium text-slate-700">
              Water Intake (glasses)
            </label>
            <input
              type="number"
              min="0"
              max="20"
              name="waterGlasses"
              value={form.waterGlasses}
              onChange={handleChange}
              placeholder="e.g. 8"
              className="w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>


          <div>
            <label className="font-medium text-slate-700">
              Mood
            </label>
            <select
              name="mood"
              value={form.mood}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="excellent">Excellent</option>
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-slate-700">
              Body Temperature (°C) <span className="text-xs text-slate-500">(optional)</span>
            </label>
            <input
              type="number"
              step="0.1"
              name="temperature"
              value={form.temperature}
              onChange={handleChange}
              placeholder="e.g. 98.6"
              className="w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-xl transition ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 text-white"
            }`}
          >
            {loading ? "Saving..." : "Save Today’s Data"}
          </button>

          {message === "success" && (
            <p className="text-green-600 text-center font-medium">
              Health log saved successfully
            </p>
          )}

          {message === "error" && (
            <p className="text-red-600 text-center font-medium">
              ❌ Something went wrong. Please try again.
            </p>
          )}

        </form>
      </div>
    </div>
  );
}
