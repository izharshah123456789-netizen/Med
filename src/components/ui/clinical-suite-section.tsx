"use client";

import React from "react";

export function ClinicalSuiteSection() {
  const features = [
    {
      title: "AI Clinical Scribe",
      description: "Automated charting and SOAP note generation with ICD-10 coding.",
    },
    {
      title: "Smart Scheduling",
      description: "AI-driven appointment booking that reduces no-shows and fills gaps.",
    },
    {
      title: "Patient Portal",
      description: "Secure access to records, prescriptions, and messaging.",
    },
  ];

  return (
    <section
      id="clinical-suite"
      data-theme="light"
      className="w-full bg-white text-slate-900 py-12 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 rounded-full">
            Clinical Suite
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 tracking-tight mb-3">
          Engineered for High Performance Clinics
        </h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          Powerful AI tools to eliminate clinical burnout and elevate patient satisfaction.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 shadow-sm transition-colors duration-300 hover:bg-emerald-50/60"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
