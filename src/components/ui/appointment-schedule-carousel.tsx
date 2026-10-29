"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Clock, Stethoscope, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
  time: string;
  patient: string;
  type: string;
  status: string;
  duration: string;
}

const appointments: Appointment[] = [
  { time: "09:30 AM", patient: "Ayesha Khan", type: "General Checkup", status: "Completed", duration: "25 min" },
  { time: "11:00 AM", patient: "Dr. Tariq Mahmood", type: "Follow-Up Visit", status: "In Progress", duration: "30 min" },
  { time: "02:15 PM", patient: "Zainab Bibi", type: "Pediatric Consult", status: "Upcoming", duration: "45 min" },
  { time: "04:00 PM", patient: "Muhammad Usman", type: "Lab Review", status: "Upcoming", duration: "20 min" },
  { time: "05:30 PM", patient: "Sara Ahmed", type: "AI Telehealth", status: "Confirmed", duration: "15 min" },
];

const statusConfig: Record<string, { dot: string; label: string }> = {
  Completed: { dot: "bg-[#226E4B]", label: "Completed" },
  "In Progress": { dot: "bg-amber-500", label: "In Progress" },
  Upcoming: { dot: "bg-slate-400", label: "Upcoming" },
  Confirmed: { dot: "bg-[#10B981]", label: "Confirmed" },
};

export function AppointmentScheduleCarousel() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!mounted) {
    return (
      <div className="w-full rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Today Schedule Telemetry</h3>
          <p className="mt-1 text-xs text-slate-500">Real time clinical appointment tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E2F0E8] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#226E4B]">
            <CalendarDays className="h-3.5 w-3.5" />
            {appointments.length} Consultations Today
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-[#F2F9F5] hover:text-[#226E4B]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-[#F2F9F5] hover:text-[#226E4B]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-6 flex gap-4 overflow-x-auto scrollbar-none pb-4"
      >
        {appointments.map((appt) => {
          const status = statusConfig[appt.status] ?? statusConfig.Upcoming;
          return (
            <div
              key={appt.time}
              className={cn(
                "min-w-[280px] max-w-[300px] bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3 flex-shrink-0 hover:border-[#226E4B]/40 transition-all",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-[#226E4B] text-xs font-bold px-2.5 py-1">
                  <Clock className="h-3 w-3" />
                  {appt.time}
                </span>
                <span className={cn("h-2 w-2 rounded-full", status.dot)} />
              </div>

              <div>
                <p className="text-slate-900 font-bold text-base">{appt.patient}</p>
                <p className="mt-0.5 text-xs text-slate-500">{appt.type}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expected</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-700">{appt.time}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Duration</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-700">{appt.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-700">{status.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AppointmentScheduleCarousel;