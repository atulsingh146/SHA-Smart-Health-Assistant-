import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SymptomChecker from "../pages/SymptomChecker";
import Tracker from "../pages/Tracker";
import AiChat from "../pages/AiChat";
import Emergency from "../pages/EmergencyAlert";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedLayout from "../layouts/ProtectedLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/check"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <SymptomChecker />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tracker"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Tracker />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-chat"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <AiChat />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergency"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Emergency />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
