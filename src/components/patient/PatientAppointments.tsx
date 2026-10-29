import React from "react";

export default function PatientAppointments() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Appointments</h1>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-3">Upcoming</h2>
        <p className="text-xs text-slate-500">Dr. Syed Izhar · Cardiology · Tomorrow 10:00 AM</p>
        <span className="inline-block mt-2 text-[10px] font-bold text-[#226E4B] bg-[#E2F0E8] px-2 py-1 rounded-full">Confirmed</span>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-3">Past</h2>
        <p className="text-xs text-slate-500">Dr. Ayesha Khan · General · Mar 12, 2026</p>
      </div>
      <button type="button" className="text-xs font-bold text-white bg-[#226E4B] px-3 py-1.5 rounded-lg">Schedule New Appointment</button>
    </div>
  );
}
