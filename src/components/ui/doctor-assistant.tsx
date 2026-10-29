"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Mic, Send, X } from "lucide-react";

export function DoctorAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: "Hello. How can I help your clinic today?" },
  ]);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript;
      handleCommand(transcript);
    };
    rec.start();
    return () => rec.stop();
  }, []);

  const handleCommand = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("show appointments")) {
      document.querySelector('[aria-label="Open appointments"]')?.scrollIntoView({ behavior: "smooth" });
      setMessages((m) => [...m, { role: "assistant", text: "Showing appointments" }]);
    } else if (lower.includes("publish website")) {
      setMessages((m) => [...m, { role: "assistant", text: "Website published" }]);
    } else if (lower.includes("verify account")) {
      setMessages((m) => [...m, { role: "assistant", text: "Verification started" }]);
    } else if (lower.includes("set hours")) {
      setMessages((m) => [...m, { role: "assistant", text: "Opening hours updated" }]);
    } else {
      setMessages((m) => [...m, { role: "user", text }, { role: "assistant", text: "Noted" }]);
    }
  };

  const send = () => {
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 99999, display: "block" }}>
      {isOpen && (
        <div className="mb-4 bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <span className="font-bold text-[#226E4B]">Medora Assistant</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "assistant" ? "text-left" : "text-right"}>
                <span className="inline-block rounded-xl px-3 py-2 text-sm bg-[#F2F9F5] text-slate-800">{m.text}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 border-t border-slate-200">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Type a message" />
            <button onClick={send} style={{ zIndex: 99999, display: "flex" }} className="rounded-xl bg-[#226E4B] text-white p-2">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        style={{ zIndex: 99999, display: "flex" }}
        className="relative h-14 w-14 items-center justify-center rounded-full bg-[#226E4B] text-white shadow-lg"
        aria-label="Open assistant"
      >
        <span className="absolute inset-0 rounded-full bg-[#226E4B] animate-ping opacity-30" />
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}

export default DoctorAssistant;
