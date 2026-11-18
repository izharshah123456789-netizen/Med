"use client";

import React, { useState, useEffect, useCallback } from "react";

type Feature = {
  title: string;
  category: string;
  description: string;
  details: string;
  benefits: string[];
};

export function ClinicalSuiteSection() {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      title: "Virtual Consults & E Rx",
      category: "Clinical Care",
      description: "Remote video visits with integrated electronic prescribing for seamless patient care.",
      details:
        "Connect with patients remotely through secure video consultations and generate electronic prescriptions that are sent directly to pharmacies. Streamlines the entire care workflow from booking to medication fulfillment.",
      benefits: [
        "Secure HIPAA compliant video visits",
        "Electronic prescriptions sent to pharmacy",
        "Reduced no shows and wait times",
        "Integrated patient chart access",
      ],
    },
    {
      title: "Real Time Practice Stats",
      category: "Analytics",
      description: "Live dashboard metrics showing appointments revenue patient volume and provider performance.",
      details:
        "Monitor your practice performance with real time analytics across appointments revenue patient volume and provider utilization. Get instant visibility into key operational metrics without manual reporting.",
      benefits: [
        "Live appointment tracking",
        "Revenue and financial metrics",
        "Patient volume trends",
        "Provider performance scores",
      ],
    },
    {
      title: "Voice Driven Rescheduling",
      category: "Scheduling",
      description: "Patients can reschedule appointments using natural voice commands through the practice assistant.",
      details:
        "Enable patients to reschedule their appointments by speaking naturally to the AI assistant. The system understands context checks availability and confirms new time slots without front desk intervention.",
      benefits: [
        "Natural language voice commands",
        "Real time availability checking",
        "Automated confirmation messages",
        "Reduces front desk phone load",
      ],
    },
    {
      title: "AI Booking & Q&A Assistant",
      category: "Patient Engagement",
      description: "Conversational AI that handles appointment booking and answers common patient questions twenty four seven.",
      details:
        "An intelligent conversational assistant that manages appointment scheduling answers frequently asked questions and guides patients through common workflows. Available around the clock to reduce administrative burden.",
      benefits: [
        "Twenty four seven availability",
        "Automated appointment booking",
        "FAQ and patient education",
        "Seamless handoff to staff",
      ],
    },
    {
      title: "All In One Practice Suite",
      category: "Platform",
      description: "Complete practice management platform combining scheduling billing records and communications in one unified interface.",
      details:
        "Everything your practice needs in a single unified platform. Scheduling billing electronic health records patient messaging and reporting all work together seamlessly without switching between multiple systems.",
      benefits: [
        "Unified practice management",
        "Integrated billing and payments",
        "Electronic health records",
        "Secure patient messaging",
      ],
    },
    {
      title: "24/7 Dedicated Support",
      category: "Support",
      description: "Round the clock expert support for your practice team with priority escalation and guaranteed response times.",
      details:
        "Dedicated support team available at all hours to assist with technical issues training questions and practice optimization. Priority escalation paths ensure critical issues are resolved quickly.",
      benefits: [
        "Twenty four seven expert support",
        "Priority issue escalation",
        "Practice optimization guidance",
        "Guaranteed response times",
      ],
    },
  ];

  const closeModal = useCallback(() => {
    setActiveFeature(null);
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setActiveFeature(null);
      }
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveFeature(null);
      }
    };

    if (activeFeature) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeFeature]);

  return (
    <section
      id="clinical_suite"
      dataTheme="light"
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
              role="button"
              tabIndex={0}
              onClick={() => setActiveFeature(feature)}
              onTouchStart={() => {}}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFeature(feature);
                }
              }}
              className="cursor-pointer select-none touch-manipulation relative z-10 pointer-events-auto rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 shadow-sm transition-colors duration-300 hover:bg-emerald-50/60 active:scale-95 transition-transform duration-150"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mb-3 uppercase tracking-wide">
                {feature.category}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {feature.description}
              </p>
              <button
                type="button"
                className="cursor-pointer pointer-events-auto text-sm font-semibold text-[#226E4B] hover:text-[#195238]"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFeature(feature);
                }}
              >
                Tap for details
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeFeature ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white dark:bg-[#113F2A] text-slate-900 dark:text-white max-w-lg w-full rounded-2xl p-6 shadow-2xl relative border border-emerald-800/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              onClick={closeModal}
            >
              (X)
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-2 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-100/70 rounded">
                {activeFeature.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {activeFeature.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {activeFeature.details}
            </p>
            <div className="mb-6">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">
                Key Benefits
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {activeFeature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5 text-emerald-600">
                      •
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#226E4B] hover:bg-[#195238] text-white px-4 py-3 rounded-full text-sm font-bold tracking-wide"
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}