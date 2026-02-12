import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import api from "../services/api";
import { getHealthTip } from "../services/aiService";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function getLast7DaysData(logs) {
  const result = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const key = d.toISOString().split("T")[0];
    const dayLog = logs.find((log) => log.date === key);

    result.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      sleep: dayLog?.sleepHours || 0,
      water: dayLog?.waterGlasses || 0,
    });
  }

  return result;
}

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [tip, setTip] = useState("Loading tip...");

  const location = useLocation(); 
  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user?.name?.split(" ")[0];
  const formattedName =
    firstName?.charAt(0).toUpperCase() + firstName?.slice(1).toLowerCase();

  async function loadDashboard() {
    try {
      const res = await api.get("/health-tracker/history");
      setLogs(res.data.logs || res.data);
      setWeeklyData(getLast7DaysData(res.data.logs || res.data));
    } catch (err) {
      console.error("Dashboard load error:", err.message);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, [location.pathname]); 

  useEffect(() => {
    async function loadTip() {
      try {
        const tipText = await getHealthTip();
        setTip(tipText || "No tip available today.");
      } catch {
        setTip("Unable to load AI tip right now.");
      }
    }
    loadTip();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayLog = logs.find((log) => log.date === today) || {};

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome Back, {formattedName} 👋
          </h1>
          <p className="text-slate-600 mt-2">
            Track your wellness and get AI-powered health insights.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 flex flex-col gap-6 pr-2">
            <div className="bg-gradient-to-br from-violet-50 to-white rounded-3xl p-5 shadow-md">
              <h2 className="text-lg font-semibold text-slate-800">
                Today’s Health
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <StatCard
                  title="Mood 😊"
                  value={
                    todayLog.mood
                      ? todayLog.mood.charAt(0).toUpperCase() +
                        todayLog.mood.slice(1).toLowerCase()
                      : "N/A"
                  }
                  tint="bg-cyan-50"
                />
                <StatCard
                  title="Sleep 💤"
                  value={`${todayLog.sleepHours || 0} hrs`}
                  tint="bg-blue-50"
                />
                <StatCard
                  title="Water 💧"
                  value={`${todayLog.waterGlasses || 0} cups`}
                  tint="bg-cyan-50"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-white rounded-3xl p-5 shadow-md">
              <h2 className="text-lg font-semibold text-slate-800">
                Weekly Wellness
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your hydration improved this week 💧
              </p>

              <div className="mt-4 h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Area
                      type="monotone"
                      dataKey="sleep"
                      stroke="#0EA5A4"
                      fill="#99F6E4"
                      strokeWidth={3}
                      name="Sleep (hrs)"
                    />

                    <Area
                      type="monotone"
                      dataKey="water"
                      stroke="#0284C7"
                      fill="#BAE6FD"
                      strokeWidth={3}
                      name="Water (cups)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-3xl p-6 bg-gradient-to-br from-violet-50 to-white shadow-md border border-violet-100">
              <h2 className="font-semibold text-slate-800">
                🤖 AI Health Insight
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">{tip}</p>
              <p className="text-xs text-slate-400 mt-4">
                AI-generated tip. Not a medical diagnosis.
              </p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-white rounded-3xl p-4 shadow-md">
              <h2 className="text-lg font-semibold text-slate-800">
                Quick Actions
              </h2>

              <div className="mt-6 space-y-4">
                <Link
                  to="/symptom-checker"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-teal-50 transition"
                >
                  🩺 Symptom Checker
                </Link>

                <Link
                  to="/tracker"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-teal-50 transition"
                >
                  📊 Health Tracker
                </Link>

                <Link
                  to="/ai-chat"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-teal-50 transition"
                >
                  💬 AI Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
