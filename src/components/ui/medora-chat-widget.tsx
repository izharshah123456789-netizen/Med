import React, { useState } from "react";

export function MedoraChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white border border-emerald-800/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-2 z-[10000]">
          <div className="bg-[#113F2A] text-white p-4 flex items-center justify-between border-b border-emerald-800/50">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-300 text-sm">
                M
              </div>
              <span className="font-semibold text-sm">Medora AI Assistant</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-emerald-200 hover:text-white text-lg font-bold px-2 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-4 h-64 overflow-y-auto text-xs text-slate-700 space-y-3">
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200/50">
              Hello Dr. Syed Izhar Hussain. How can I assist you with clinic operations, appointments, or analytics today?
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-emerald-800/20 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask Medora AI..."
              className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none"
            />
            <button type="button" className="bg-[#226E4B] text-white text-xs px-3 py-2 rounded-lg font-medium">
              Send
            </button>
          </div>
        </div>
      )}

      {/* Sleek 3D Green "M" Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Medora AI Assistant"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#226E4B] via-[#113F2A] to-[#0A291B] border-2 border-emerald-400/40 shadow-[0_10px_25px_rgba(17,63,42,0.6),inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation"
      >
        <span className="font-black text-2xl text-emerald-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none">
          M
        </span>
      </button>
    </div>
  );
}

export default MedoraChatWidget;
