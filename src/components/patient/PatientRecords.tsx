import React from "react";

export default function PatientRecords() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Medical Records</h1>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <p className="text-xs text-slate-500 mb-3">Blood Panel · Apr 20, 2026 · Normal</p>
        <button type="button" className="text-xs font-bold text-white bg-[#226E4B] px-3 py-1.5 rounded-lg">Download Report</button>
      </div>
    </div>
  );
}
