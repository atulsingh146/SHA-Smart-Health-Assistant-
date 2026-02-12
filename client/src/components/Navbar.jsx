import { Link, NavLink, useNavigate } from "react-router-dom";

const navClass = ({ isActive }) =>
  `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-sky-100 text-sky-700"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
  }`;

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  }

  return (
    <header className="fixed top-0 left-0 w-full h-[45px] z-50 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 font-semibold text-slate-900"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-lg">
            🩺
          </div>
          <span className="text-lg tracking-tight">Smart Health Assistant</span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navClass}>
            Dashboard
          </NavLink>

          <NavLink to="/check" className={navClass}>
            Symptoms
          </NavLink>

          <NavLink to="/tracker" className={navClass}>
            Tracker
          </NavLink>

          <NavLink to="/ai-chat" className={navClass}>
            AI Chat
          </NavLink>
          <NavLink
            to="/register "
            className={`${navClass} hover:bg-red-100 rounded-xl transition`}
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
