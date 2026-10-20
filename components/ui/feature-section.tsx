"use client";

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "Engineered for High-Performance Clinics",
  autoPlayInterval = 3500,
  imageHeight = "h-[450px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn("p-8 md:p-12 bg-[#F9FAFB]/50", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-center text-[#111827] tracking-tight">
          {title}
        </h2>
        <p className="text-base md:text-lg text-[#6B7280] text-center mb-12 max-w-2xl mx-auto">
          Everything you need to eliminate administrative burnout and elevate patient satisfaction.
        </p>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="order-2 md:order-1 space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  setCurrentFeature(index)
                  setProgress(0)
                }}
                className={cn(
                  "flex items-start gap-4 md:gap-6 p-5 rounded-2xl cursor-pointer transition-all duration-300 border",
                  index === currentFeature
                    ? "bg-white border-[#226E4B]/30 shadow-xl shadow-[#0D9488]/10"
                    : "bg-transparent border-transparent hover:bg-white/60"
                )}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.5 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 font-bold text-sm",
                    index === currentFeature
                      ? "bg-[#226E4B] border-[#226E4B] text-white scale-110 shadow-md shadow-[#226E4B]/20"
                      : "bg-[#E8F5EE] border-[#A3D1B8] text-[#226E4B]"
                  )}
                >
                  {index <= currentFeature ? "✓" : index + 1}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[#111827] mb-1">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative w-full overflow-hidden rounded-3xl border border-[#226E4B]/20 shadow-2xl bg-white",
              imageHeight
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-3xl overflow-hidden"
                      initial={{ y: 60, opacity: 0, rotateX: -10 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -60, opacity: 0, rotateX: 10 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image alt={feature.step} className="w-full h-full object-cover" height={600} src={feature.image} width={1000}/>
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#111827]/80 via-[#111827]/20 to-transparent p-6 flex items-end">
                        <span className="text-white text-sm font-semibold tracking-wide bg-[#226E4B]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          {feature.step}: {feature.title}
                        </span>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}