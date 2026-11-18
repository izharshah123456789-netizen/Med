"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { DOCTOR_OPTIONS } from "../../../lib/staff-attendance";
import StaffAttendance from "../../../components/doctor/StaffAttendance";

export default function DoctorDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const doctorName = user?.doctorName || DOCTOR_OPTIONS[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateTo = (route: string) => {
    if (typeof window === "undefined") return;
    window.history.pushState({}, "", route);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (!mounted) {
    return (
      <div className="p-4 text-center text-slate-500 font-medium text-xs">
        Loading dashboard telemetry...
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 lg:space-y-6 lg:p-8 max-w-7xl mx-auto pb-16">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Practice Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Welcome back, {doctorName}
          </p>
        </div>
        <div className="bg-emerald-50 text-[#226E4B] px-3.5 py-1.5 rounded-xl text-xs font-bold border border-emerald-200/60 shadow-sm">
          Clinic Telemetry Active
        </div>
      </div>

      {/* SUMMARY CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Today Consultations
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">12</h2>
          <p className="text-xs font-medium text-emerald-600">+3 appointments vs yesterday</p>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Patients
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">320</h2>
          <p className="text-xs font-medium text-emerald-600">+12% growth this month</p>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Monthly Practice Revenue
          </span>
          <h2 className="text-3xl font-extrabold text-[#226E4B]">$12,450</h2>
          <p className="text-xs font-medium text-emerald-600">On target for Q4</p>
        </div>
      </div>

      {/* QUICK ACTION FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            title: "AI Clinic Website Builder",
            description:
              "Generate or customize your clinic digital storefront, services, and online booking portal.",
            action: "Launch Builder",
            route: "/doctor/ai-builder",
          },
          {
            title: "Treatment Management",
            description:
              "Update medical procedures, consultation fees, and diagnostic test pricing.",
            action: "Manage Catalog",
            route: "/doctor/treatments",
          },
          {
            title: "Automated WhatsApp Alerts",
            description:
              "Send automated pre visit reminders, lab results, and follow up schedules to patients.",
            action: "View Telemetry",
            route: "/doctor/patients",
          },
          {
            title: "Clinical Roster and Duty Shifts",
            description:
              "Assign duty hours, room allocations, and physician shifts for todays practice.",
            action: "Manage Shifts",
            route: "/doctor/doctors",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3"
          >
            <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
            <p className="text-xs font-medium text-slate-500">{card.description}</p>
            <button
              type="button"
              onClick={() => navigateTo(card.route)}
              className="bg-[#226E4B] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm hover:bg-[#1b583c] transition-all"
            >
              {card.action}
            </button>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 lg:p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Today Appointment Queue</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-900">Ayesha Khan</p>
              <p className="text-[11px] text-slate-500 font-medium">General Checkup • 09:30 AM</p>
            </div>
            <span className="bg-emerald-100 text-[#226E4B] text-[11px] font-bold px-2.5 py-1 rounded-full">
              Completed
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-900">Zainab Bibi</p>
              <p className="text-[11px] text-slate-500 font-medium">Follow up Visit • 11:00 AM</p>
            </div>
            <span className="bg-amber-100 text-amber-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
              In Consultation
            </span>
        </div>
        <button
          type="button"
          onClick={() => navigateTo("/doctor/appointments")}
          className="text-xs font-bold text-[#226E4B] hover:underline"
        >
          View Full Queue
        </button>
      </div>
      </div>

      <StaffAttendance doctorName={doctorName} doctorId={user?.userId} />
    </div>
  );
}
