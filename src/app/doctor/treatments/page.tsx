"use client";
import React, { useState, useEffect } from "react";

export default function TreatmentsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="p-4 text-xs text-slate-500 font-medium">Loading treatment catalog...</div>;

  const treatments = [
    { code: "#TRT 101", name: "General Medical Checkup", category: "Routine Consult", duration: "30 Mins", fee: "$150", status: "Active" },
    { code: "#TRT 102", name: "Cardiac Risk Screening", category: "Diagnostics", duration: "45 Mins", fee: "$320", status: "Active" },
    { code: "#TRT 103", name: "Pediatric Vaccination", category: "Immunization", duration: "20 Mins", fee: "$90", status: "Active" },
    { code: "#TRT 104", name: "AI Video Telehealth Visit", category: "Remote Consult", duration: "25 Mins", fee: "$120", status: "Active" },
  ];

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-7xl mx-auto pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Treatment Service Catalog</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">Configure consultation fees, medical procedures, and diagnostic package pricing</p>
        </div>
        <button className="px-4 py-2 text-xs font-bold rounded-xl bg-[#226E4B] text-white hover:bg-[#1b583c]">
          Add Treatment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Services</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">18 Procedures Listed</h3>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Most Popular</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">General Consultation</h3>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Telehealth Fee</span>
          <h3 className="text-2xl font-bold text-[#226E4B] mt-1">$120 Standard Rate</h3>
        </div>
      </div>

      <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-4">Treatment Catalog</h2>
        <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Code</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Treatment Name</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Category</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Duration</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Standard Fee</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Status</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {treatments.map((t) => (
                <tr key={t.code}>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 font-bold text-slate-900">{t.code}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 text-slate-900">{t.name}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 text-slate-600">{t.category}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 text-slate-600">{t.duration}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 font-bold text-slate-900">{t.fee}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3">
                    <span className="bg-emerald-50 text-[#226E4B] px-2.5 py-1 rounded-full font-bold">{t.status}</span>
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3">
                    <button className="text-xs text-[#226E4B] font-medium hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
