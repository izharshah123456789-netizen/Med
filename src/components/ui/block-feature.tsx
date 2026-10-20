"use client"

import React from "react"
import { motion, AnimatePresence } from "motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlockFeatureProps {
  metric: string | number
  label: string
  description: string
  icon?: LucideIcon
  type?: "grid" | "code" | "compliance" | "orbit"
  className?: string
}

const BlockFeature = ({ metric, label, description, icon: Icon, type, className }: BlockFeatureProps) => {
  const renderGridBlock = () => {
    return (
      <div className={cn(
        "relative rounded-2xl border border-[#226E4B]/20 bg-white p-6 shadow-sm overflow-hidden",
        className
      )}>
        <div className="bg-gradient-to-br from-[#E8F5EE] to-[#226E4B] bg-clip-text text-transparent text-5xl md:text-6xl font-extrabold mb-4 text-[#72E3AD] animate-gradient-pulse">
          {metric}
        </div>
        <h3 className="text-[#111827] text-xl font-bold mb-3">
          {label}
        </h3>
        <p className="text-[#4B5563] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    )
  }

  const renderCodeEditor = () => {
    return (
      <div className={cn(
        "relative rounded-2xl border border-[#226E4B]/20 bg-white p-6 shadow-sm overflow-hidden",
        className
      )}>
        <div className="bg-gradient-to-br from-[#E8F5EE] to-[#226E4B] bg-clip-text text-transparent text-4xl md:text-5xl font-bold mb-4 text-[#72E3AD] animate-code-simulate">
          {metric}
        </div>
        <h3 className="text-[#111827] text-xl font-bold mb-3">
          {label}
        </h3>
        <p className="text-[#4B5563] text-sm leading-relaxed">
          {description}
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-lg bg-[#E8F5EE] flex items-center justify-center border border-[#A3D1B8] shadow-md">
            <div className="text-xs text-[#226E4B] font-bold">SOAP</div>
          </div>
        </div>
      </div>
    )
  }

  const renderComplianceBadge = () => {
    return (
      <div className={cn(
        "relative rounded-2xl border border-[#226E4B]/20 bg-white p-6 shadow-sm overflow-hidden",
        className
      )}>
        <div className="bg-gradient-to-br from-[#E8F5EE] to-[#226E4B] bg-clip-text text-transparent text-5xl md:text-6xl font-extrabold mb-4 text-[#72E3AD] animate-compliance-cycle">
          {metric}
        </div>
        <h3 className="text-[#111827] text-xl font-bold mb-3">
          {label}
        </h3>
        <p className="text-[#4B5563] text-sm leading-relaxed">
          {description}
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#226E4B] border-4 border-white flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-white/20 animate-compliance-badges"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#D97706] flex items-center justify-center text-xs font-bold text-white">HIPAA</div>
                <div className="w-6 h-6 rounded-full bg-[#D97706] flex items-center justify-center text-xs font-bold text-white">GDPR</div>
                <div className="w-6 h-6 rounded-full bg-[#D97706] flex items-center justify-center text-xs font-bold text-white">ISO</div>
                <div className="w-6 h-6 rounded-full bg-[#D97706] flex items-center justify-center text-xs font-bold text-white">SOC2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderOrbitAnimation = () => {
    return (
      <div className={cn(
        "relative rounded-2xl border border-[#226E4B]/20 bg-white p-6 shadow-sm overflow-hidden",
        className
      )}>
        <div className="bg-gradient-to-br from-[#E8F5EE] to-[#226E4B] bg-clip-text text-transparent text-5xl md:text-6xl font-extrabold mb-4 text-[#72E3AD] animate-orbit-pulse">
          {metric}
        </div>
        <h3 className="text-[#111827] text-xl font-bold mb-3">
          {label}
        </h3>
        <p className="text-[#4B5563] text-sm leading-relaxed">
          {description}
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#226E4B] border-4 border-white flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-white/20 animate-orbit-rings"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center text-xs font-bold text-white animate-sparkle">✨</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    type === "grid" ? renderGridBlock() :
    type === "code" ? renderCodeEditor() :
    type === "compliance" ? renderComplianceBadge() :
    type === "orbit" ? renderOrbitAnimation() :
    renderGridBlock()
  )
}

export default BlockFeature;