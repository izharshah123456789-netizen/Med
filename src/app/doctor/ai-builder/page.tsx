"use client";
import React, { useState, useEffect } from "react";

export default function AiBuilderPage() {
  const [mounted, setMounted] = useState(false);
  const [prompt, setPrompt] = useState("");
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="p-4 text-xs text-slate-500 font-medium">Loading AI website builder...</div>;

  const presets = ["Modern Cardiology Practice", "Pediatric Clinic Theme", "Minimalist Telehealth"];

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-7xl mx-auto pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">AI Clinic Website Builder</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">Generate or customize your clinic storefront using AI prompts and voice directives</p>
        </div>
        <button className="px-4 py-2 text-xs font-bold rounded-xl bg-[#226E4B] text-white hover:bg-[#1b583c]">
          Publish Changes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Generation Engine</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">Medora AI v2.4</h3>
          <p className="text-xs text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Published Sections</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">6 Custom Blocks</h3>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">SEO Health Score</span>
          <h3 className="text-2xl font-bold text-[#226E4B] mt-1">98% Optimization</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-7 bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">AI Prompt Generator</h2>
          <div className="space-y-3">
            <textarea
              defaultValue=""
              placeholder="Describe layout changes, new medical services, or seasonal banners..."
              className="w-full min-h-[140px] px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#226E4B] resize-none"
            />
            <div className="flex items-center gap-2">
              <input type="text" defaultValue="" placeholder="Optional voice directive..." className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#226E4B]" />
              <button className="px-4 py-2 text-xs font-bold rounded-xl bg-[#226E4B] text-white hover:bg-[#1b583c]">
                Generate
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm mb-6">
            <h2 className="text-base font-bold text-slate-900 mb-3">One Click Layout Presets</h2>
            <div className="space-y-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPrompt(preset)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-left text-slate-700 hover:bg-[#F2F9F5] hover:text-slate-900 transition-colors"
                >
                  <span>{preset}</span>
                  <span className="text-slate-400">Apply</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Real Time Preview Canvas</h2>
            <div className="aspect-video bg-[#F2F9F5] rounded-xl border border-slate-200 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#226E4B]/10 flex items-center justify-center mx-auto mb-3 text-[#226E4B] font-bold text-xl">M</div>
                  <p className="text-sm font-medium text-slate-700">Storefront Preview</p>
                  <p className="text-xs text-slate-500 mt-1">AI generated layout appears here</p>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-[#226E4B] text-white hover:bg-[#1b583c]">
              Publish Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
