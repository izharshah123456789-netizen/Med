"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ imageSrc, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn("relative rounded-3xl border border-[#226E4B]/20 bg-white p-6 shadow-sm overflow-hidden group hover:-translate-y-1.5 transition-all duration-300", className)}>
      <GlowingEffect
        blur={0}
        spread={40}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
        glow={true}
        disabled={false}
      />
      <div className="relative z-10 flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#226E4B]/10 shadow-sm">
        {/* Visual Header Graphic Banner */}
        <div className="w-full h-48 bg-gradient-to-br from-[#226E4B] to-[#0D9488] overflow-hidden relative flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover object-center rounded-xl transform group-hover:scale-105 transition-transform duration-500 shadow-inner"
          />
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-[#111827] font-bold text-lg md:text-xl mt-2 tracking-tight">
              {title}
            </h3>
            <p className="text-[#4B5563] text-sm leading-relaxed mt-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function FeatureSections() {
  const securityFeatures = [
    {
      imageSrc: "https://cdn.21st.dev/assets/mirror/be/be1b2e97582f627f0b12c78b4659a78dd89731065529b2d92f1d6aa7c7906c14.png",
      title: "End-to-End Encryption",
      description: "AES-256 encryption at rest and TLS 1.3 in transit.",
    },
    {
      imageSrc: "https://cdn.21st.dev/assets/mirror/48/48f0b980c99986438bdcc25df7482983be83095e483abe5d525595a6290ffd6e.png",
      title: "HIPAA & GDPR Compliant",
      description: "Strict BAA availability and European data residency options.",
    },
    {
      imageSrc: "https://cdn.21st.dev/assets/mirror/b6/b6e8f44114cb6b12a5b19ef51876a8217c76fe1fcf014b3251a004377453f29a.png",
      title: "Role-Based Access Control (RBAC)",
      description: "Granular permission settings for doctors, nurses, and billing staff.",
    },
    {
      imageSrc: "https://cdn.21st.dev/assets/mirror/48/48f0b980c99986438bdcc25df7482983be83095e483abe5d525595a6290ffd6e.png",
      title: "Comprehensive Audit Logs",
      description: "Tamper-proof logging for every chart access and modification.",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-8 bg-[#F9FAFB] w-full">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E8F5EE] border border-[#A3D1B8] text-[#226E4B] text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
          ENTERPRISE SECURITY
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] mb-4 tracking-tight">
          Bank-Grade Privacy for Sensitive Patient Data
        </h2>
        <p className="text-[#4B5563] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Built from the ground up to exceed international healthcare data protection standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {securityFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            imageSrc={feature.imageSrc}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
