"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";

const chartData = [
  { date: "Jan 1", patients: 210 },
  { date: "Jan 5", patients: 250 },
  { date: "Jan 9", patients: 310 },
  { date: "Jan 13", patients: 290 },
  { date: "Jan 17", patients: 220 },
  { date: "Jan 21", patients: 280 },
  { date: "Jan 25", patients: 320 },
  { date: "Jan 29", patients: 340 },
  { date: "Mar 2", patients: 310 },
];

const BASELINE = 210;

function computeVariance(current: number): string {
  const pct = ((current - BASELINE) / BASELINE) * 100;
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}%`;
}

interface CustomTooltipProps extends TooltipProps<number, string> {}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const value = payload[0].value as number;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="text-slate-700">
        {value} Patients
      </p>
      <p className={cn("font-semibold", value >= BASELINE ? "text-[#226E4B]" : "text-amber-500")}>
        {computeVariance(value)}
      </p>
    </div>
  );
}

export function PatientGrowthChart() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Active Patient Directory Growth</h3>
          <p className="mt-1 text-xs text-slate-500">Monthly progression telemetry</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl bg-[#E2F0E8] px-4 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#226E4B]/70">Active Patients</p>
            <p className="text-xl font-black text-slate-900">320</p>
          </div>
          <div className="rounded-xl bg-[#E2F0E8] px-4 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#226E4B]/70">Growth</p>
            <p className="text-xl font-black text-[#226E4B]">+12.7%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#226E4B]" />
          <span className="text-slate-500">High: 340 Patients</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="text-slate-500">Low: 210 Patients</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#10B981]" />
          <span className="text-slate-500">Change: +14.2%</span>
        </div>
      </div>

      <div className="mt-6">
        <ResponsiveContainer height={240} width="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#64748B", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              domain={[0, "auto"]}
            />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ outline: "none" }}
            />
            <Line
              type="monotone"
              dataKey="patients"
              stroke="#226E4B"
              strokeWidth={2.5}
              dot={{ fill: "#226E4B", stroke: "#ffffff", strokeWidth: 2, r: 4 }}
              activeDot={{
                fill: "#226E4B",
                stroke: "#ffffff",
                strokeWidth: 3,
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PatientGrowthChart;