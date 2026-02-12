import Navbar from "../components/Navbar";
import EmergencyButton from "../components/EmergencyButton";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="pt-16">
        {children || <Outlet />}
      </div>
      <EmergencyButton />
    </>
  );
}
