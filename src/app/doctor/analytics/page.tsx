"use client";

import { useEffect, useState } from "react";
import { AppointmentScheduleCarousel } from "../../../components/ui/appointment-schedule-carousel";
import { ChartPie } from "../../../components/ui/chart-pie";
import { CircleProgress } from "../../../components/ui/circle-progress";
import { PatientGrowthChart } from "../../../components/ui/patient-growth-chart";

const revenueData = [
  { name: "Consultations", value: 5200, color: "#226E4B" },
  { name: "Treatments and Procedures", value: 3800, color: "#10B981" },
  { name: "Diagnostics and Labs", value: 2100, color: "#059669" },
  { name: "AI Telehealth Visits", value: 1350, color: "#0D9488" },
];

const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);

export default function DoctorAnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-4 text-center font-medium text-slate-500">
        Loading analytics telemetry...
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-8 bg-[#F2F9F5] p-4 lg:p-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Clinic Analytics and Insights
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Practice performance, patient growth, and AI efficiency
          </p>
        </div>
        <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            className="rounded-lg bg-[#226E4B] px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            This Month
          </button>
          <button
            type="button"
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            This Year
          </button>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-4 lg:p-6 shadow-sm">
        <div>
          <h2 className="text-base sm:text-xl font-bold text-slate-900">Practice Revenue</h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Monthly breakdown by clinical service
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-2">
          <ChartPie />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {revenueData.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-slate-600">
                    {item.name}
                  </span>
                </div>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  ${item.value.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  {((item.value / totalRevenue) * 100).toFixed(1)} percent
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppointmentScheduleCarousel />

      <PatientGrowthChart />

      <section className="rounded-3xl border border-slate-200/80 bg-white p-4 lg:p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900">
              AI Scribing Efficiency
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Time saved through clinical documentation support
            </p>
          </div>
          <div className="rounded-2xl bg-[#E2F0E8] px-6 py-5 text-center">
            <p className="text-4xl font-black text-[#226E4B]">18.5</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#226E4B]">
              Hours Saved
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200/80 p-4">
              <p className="text-xs text-slate-500">Voice Notes Transcribed</p>
              <p className="mt-1 text-lg font-bold text-slate-900">142</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 p-4">
              <p className="text-xs text-slate-500">Auto Summaries</p>
              <p className="mt-1 text-lg font-bold text-slate-900">98</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Practice capacity insights" className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Monthly Booking Capacity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              74 percent capacity reached
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <CircleProgress value={148} maxValue={200} size={140} />
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Completed Visits</span>
                <span className="font-bold text-slate-900">124</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Upcoming</span>
                <span className="font-bold text-slate-900">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Cancellations</span>
                <span className="font-bold text-slate-900">6</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Patient Directory Insights
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              320 registered patients
            </p>
          </div>
          <div className="space-y-4">
            {[
              { label: "Returning Patients", value: 65 },
              { label: "New Consultations", value: 25 },
              { label: "Chronic Follow Ups", value: 10 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-bold text-slate-900">
                    {item.value} percent
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2F0E8]">
                  <div
                    className="h-full rounded-full bg-[#226E4B]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
