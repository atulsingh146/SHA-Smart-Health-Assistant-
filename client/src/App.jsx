import Navbar from "./components/Navbar";
import AppRoutes from "./app/AppRoutes";
import EmergencyButton from "./components/EmergencyButton";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto p-6">
        <AppRoutes />
      </main>
    </div>
  );
}
