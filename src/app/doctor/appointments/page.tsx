"use client";
import React, { useState, useEffect } from "react";

export default function AppointmentsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="p-4 text-xs text-slate-500 font-medium">Loading appointments...</div>;

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-7xl mx-auto pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Appointments Schedule Telemetry</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">Manage patient bookings and consultation queues</p>
        </div>
        <button className="px-4 py-2 text-xs font-bold rounded-xl bg-[#226E4B] text-white hover:bg-[#1b583c]">
          + Book New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today Bookings</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">14 Appointments</h3>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Capacity Status</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">74% Capacity</h3>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Consultation Modes</span>
          <h3 className="text-2xl font-bold text-[#226E4B] mt-1">10 Clinic 4 Telehealth</h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 lg:p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-4">Master Schedule Table</h2>
        <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">APT ID</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Patient Name</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Doctor</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Time</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 font-bold text-slate-900">#APT-2041</td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 font-bold text-slate-900">Ayesha Khan</td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3">Dr. Syed Izhar Hussain</td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3">09:30 AM</td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3"><span className="bg-emerald-50 text-[#226E4B] px-2.5 py-1 rounded-full font-bold">Completed</span></td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 font-bold text-slate-900">#APT-2042</td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 font-bold text-slate-900">Zainab Bibi</td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3">Dr. Syed Izhar Hussain</td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3">11:00 AM</td>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3"><span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-bold">In Consultation</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
