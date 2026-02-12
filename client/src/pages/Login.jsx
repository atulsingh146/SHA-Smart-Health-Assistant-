import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-teal-500 to-indigo-200 text-white items-center justify-center p-10 rounded-md">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Smart Health Assistant
          </h1>
          <p className="text-lg text-white/90">
            Track your wellness, analyze symptoms, and get AI-powered health
            insights — all in one place.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-slate-50 px-6  ">
      
        <form
        
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6 bg-gradient-to-br from-violet-50 to-white rounded-3xl p-5 shadow-md"
        >
                    {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3  text-sm rounded-xl shadow-lg animate-slide-in">
              {error}
            </div>
          )}
          <div className="text-center space-y-2 ">
            <h2 className="text-2xl font-semibold text-slate-800">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-slate-500">
              Login to continue to your dashboard
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium transition ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <span
              className="text-teal-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
