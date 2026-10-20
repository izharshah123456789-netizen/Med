"use client";
import { Mic, Clock, Users, MessageSquare, DollarSign, FileText } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";

const glowingSettings = {
  blur: 0,
  spread: 60,
  proximity: 100,
  inactiveZone: 0.01,
  borderWidth: 4,
};

const clinicCapabilities = [
  {
    icon: <Mic className="h-5 w-5 text-[#226E4B]"/>,
    tag: "AI AMBIENT SCRIBE",
    title: "Generates accurate SOAP notes in real time during patient conversations.",
    area: "md:col-span-6 lg:col-span-4",
  },
  {
    icon: <Clock className="h-5 w-5 text-[#226E4B]"/>,
    tag: "SMART WAITING-ROOM QUEUE",
    title: "Live patient queue tracking with real-time room assignment.",
    area: "md:col-span-6 lg:col-span-4",
  },
  {
    icon: <Users className="h-5 w-5 text-[#226E4B]"/>,
    tag: "PATIENT ENGAGEMENT PORTAL",
    title: "Secure messaging, lab result sharing, and tele-health video consults.",
    area: "md:col-span-6 lg:col-span-4",
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-[#226E4B]"/>,
    tag: "AUTOMATED WHATSAPP & SMS REMINDERS",
    title: "Reduces appointment no-shows by up to 95%.",
    area: "md:col-span-6 lg:col-span-4",
  },
  {
    icon: <DollarSign className="h-5 w-5 text-[#226E4B]"/>,
    tag: "REVENUE CYCLE MANAGEMENT (RCM)",
    title: "Automated ICD-10 medical coding assistance and instant claim submissions.",
    area: "md:col-span-6 lg:col-span-4",
  },
  {
    icon: <FileText className="h-5 w-5 text-[#226E4B]"/>,
    tag: "EHR / EMR INTEROPERABILITY",
    title: "Seamless multi-directional sync with existing hospital systems.",
    area: "md:col-span-6 lg:col-span-4",
  },
];

export function ClinicCapabilitiesSection() {
  return (
    <section className="py-20 px-6 bg-[#F9FAFB]/60">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
            Engineered for High-Performance Clinics
          </h2>
          <p className="text-base md:text-lg text-[#6B7280]">
            Everything you need to eliminate administrative burnout and elevate patient satisfaction.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {clinicCapabilities.map((item, index) => (
            <li key={index} className={`min-h-[12rem] list-none ${item.area}`}>
              <div className="relative rounded-2xl border border-[#226E4B]/20 bg-white p-6 shadow-sm overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <GlowingEffect
                    glow={true}
                    disabled={false}
                    spread={40}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                </div>
                <div className="relative z-10 flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl p-6 bg-white/50 backdrop-blur-sm border border-[#226E4B]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] flex items-center justify-center shrink-0 border border-[#A3D1B8]">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold tracking-wider text-[#226E4B] uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm md:text-base font-medium text-[#374151] leading-relaxed">
                    {item.title}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}