"use client"

import React, { useState, useRef } from "react"

const features = [
  { title: "Instant Clinic Websites", description: "Automated website generation deployed to Google Cloud. Instantly launches custom, AI managed digital practices for doctors.", pill: "Live" },
  { title: "AI Voice & Clinical Assistant", description: "Answers medical queries instantly and executes hands free voice commands to complete clinical workflows on demand.", pill: "Live" },
  { title: "1-Click Site Builder", description: "Build and deploy a clinic site in one click with pre built templates and automated SEO.", pill: "Live" },
  { title: "Smart Scheduling", description: "AI driven appointment booking that reduces no shows and fills cancellations automatically.", pill: "Live" },
  { title: "Patient Portal", description: "Secure patient access to records, prescriptions, and messaging in one place.", pill: "Live" },
  { title: "Analytics Dashboard", description: "Real time clinic performance metrics and revenue insights at a glance.", pill: "Live" },
]

export default function CoreFeatures() {
  return (
    <section id="features" className="w-full bg-[#EBF4F0] py-20">
      <div className="text-center mb-10 px-4">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#226E4B] bg-[#E2F0E8] border border-[#226E4B]/15 uppercase mb-3 select-none">
          SYSTEM ARCHITECTURE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
          MEDORA Core Features
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Everything you need to automate your medical practice and doctor website.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
        {features.map((f, i) => (
          <FeatureCard key={i} title={f.title} description={f.description} pill={f.pill} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({ title, description, pill }: { title: string; description: string; pill: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(0)

  const update = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={(e) => update(e.clientX, e.clientY)}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onTouchStart={(e) => {
        setOpacity(1)
        update(e.touches[0].clientX, e.touches[0].clientY)
      }}
      onTouchMove={(e) => update(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={() => setOpacity(0)}
      className="relative p-3 sm:p-5 rounded-2xl border border-slate-200 bg-white overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          opacity,
          background: "radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 110, 75, 0.4), rgba(212, 230, 110, 0.3) 45%, transparent 80%)",
        }}
      />
      <div className="relative z-10 flex flex-col gap-2">
        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-[#E2F0E8] text-[#226E4B] flex items-center justify-center">★</div>
        <h3 className="text-xs sm:text-base font-bold text-slate-900">{title}</h3>
        <p className="text-[10px] sm:text-xs leading-snug line-clamp-4 text-slate-600">{description}</p>
        <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#E2F0E8] text-[#226E4B] self-start">{pill}</span>
      </div>
    </div>
  )
}
