"use client";

import React, { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import PatientDashboardPage from "../patient/dashboard/page";
import PatientAppointments from "../../components/patient/PatientAppointments";
import PatientPrescriptions from "../../components/patient/PatientPrescriptions";
import PatientRecords from "../../components/patient/PatientRecords";
import PatientBilling from "../../components/patient/PatientBilling";
import { useAuth } from "../../context/AuthContext";

export default function PatientLayout({ children }: { children?: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [signOutError, setSignOutError] = useState("");
  const { logout } = useAuth();
  const signOut = async () => {
    try {
      await logout();
      window.location.href = "/signin";
    } catch (error) {
      setSignOutError(
        error instanceof Error ? error.message : "Sign out failed.",
      );
    }
  };
  const navItems = [
    { label: "Dashboard", tab: "dashboard" },
    { label: "Appointments", tab: "appointments" },
    { label: "Prescriptions", tab: "prescriptions" },
    { label: "Medical Records", tab: "records" },
    { label: "Billing", tab: "billing" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        return <PatientAppointments />;
      case "prescriptions":
        return <PatientPrescriptions />;
      case "records":
        return <PatientRecords />;
      case "billing":
        return <PatientBilling />;
      default:
        return <PatientDashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F2F9F5] flex-col lg:flex-row">
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200/80 bg-white p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-[#226E4B] flex items-center justify-center text-white font-extrabold text-xl shadow-sm">M</div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Medora</h2>
            <p className="text-[11px] font-semibold text-[#226E4B]">Patient Portal</p>
          </div>
        </div>
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab(item.tab); }}
              className={`w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.tab
                  ? "bg-[#226E4B] text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-900">Sarah Jenkins</p>
            <p className="text-[10px] text-slate-400 font-medium">Patient</p>
          </div>
          <button type="button" onClick={signOut} className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1">
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </aside>
      <header className="block lg:hidden sticky top-0 z-50 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
        <button type="button" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
          {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#226E4B] flex items-center justify-center text-white font-bold text-sm">M</div>
          <span className="text-xs font-bold text-slate-900">Medora</span>
        </div>
        <div className="w-7" />
      </header>
      <main className="flex-1 overflow-y-auto min-h-screen pt-16 lg:pt-0 pb-16">
        {signOutError ? (
          <p role="alert" className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {signOutError}
          </p>
        ) : null}
        {renderContent()}
      </main>
    </div>
  );
}
