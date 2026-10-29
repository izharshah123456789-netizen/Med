import React from "react";

export default function PatientPrescriptions() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Prescriptions</h1>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-1">Metformin 500mg</h2>
        <p className="text-xs text-slate-500">Twice daily · 2 refills remaining</p>
        <p className="text-xs text-slate-400 mt-1">Dr. Syed Izhar</p>
        <button type="button" className="mt-3 text-xs font-bold text-white bg-[#226E4B] px-3 py-1.5 rounded-lg">Request Refill</button>
      </div>
    </div>
  );
}
