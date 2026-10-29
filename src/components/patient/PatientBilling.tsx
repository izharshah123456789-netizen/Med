import React from "react";

export default function PatientBilling() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Billing</h1>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <p className="text-xs text-slate-500 mb-3">Invoice #1042 · $120.00 · Paid</p>
        <button type="button" className="text-xs font-bold text-white bg-[#226E4B] px-3 py-1.5 rounded-lg">Download Receipt</button>
      </div>
    </div>
  );
}
