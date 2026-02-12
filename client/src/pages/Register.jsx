import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Already User Exist");
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
            Create your account and start tracking your wellness with AI-powered
            health insights.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-slate-50 px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6 bg-gradient-to-br from-violet-50 to-white p-5 shadow-md"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-slate-800">
              Create Account ✨
            </h2>
            <p className="text-sm text-slate-500">Sign up to continue</p>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Atul Singh"
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="••••••••"
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.confirmPassword}
              onChange={handleChange}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <span
              className="text-teal-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
          {error && (
            <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-in">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
