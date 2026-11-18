"use client";

import React from "react";
import { ClinicalSuiteSection } from "./clinical-suite-section";

export default function LandingPage() {
  return (
    <div className="min-w-full min-h-screen font-sans antialiased">
      <main className="w-full pt-16">
        {/* Section 1: Hero - DARK */}
        <section
          id="hero"
          data-section-theme="dark"
          className="w-full bg-[#113F2A] text-white py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Hero Section</h1>
          </div>
        </section>

        {/* Section 2: Core Features - LIGHT */}
        <section
          id="core_features"
          data-section-theme="light"
          className="w-full bg-white text-slate-900 py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-center">Core Features</h2>
          </div>
        </section>

        {/* Section 3: Workflow - LIGHT */}
        <section
          id="workflow"
          data-section-theme="light"
          className="w-full bg-white text-slate-900 py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-center">Workflow</h2>
          </div>
        </section>

        {/* Section 4: Clinical AI - LIGHT */}
        <section
          id="clinical_ai"
          data-section-theme="light"
          className="w-full bg-white text-slate-900 py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-center">Clinical AI</h2>
          </div>
        </section>

        {/* Section 5: Clinical Suite - LIGHT */}
        <ClinicalSuiteSection />

        {/* Section 6: Impact - LIGHT */}
        <section
          id="impact"
          data-section-theme="light"
          className="w-full bg-white text-slate-900 py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-center">Impact</h2>
          </div>
        </section>

        {/* Section 7: Pricing - LIGHT */}
        <section
          id="pricing"
          data-section-theme="light"
          className="w-full bg-white text-slate-900 py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-center">Pricing</h2>
          </div>
        </section>

        {/* Section 8: Footer - DARK */}
        <footer
          id="footer"
          data-section-theme="dark"
          className="w-full bg-[#113F2A] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm opacity-80">© Medora. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
