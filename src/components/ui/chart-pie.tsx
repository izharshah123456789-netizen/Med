"use client";

import { useMemo, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Consultations", value: 5200, color: "#226E4B" },
  { name: "Treatments & Procedures", value: 3800, color: "#10B981" },
  { name: "Diagnostics & Labs", value: 2100, color: "#059669" },
  { name: "AI Telehealth Visits", value: 1350, color: "#0D9488" },
];

export function ChartPie() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalRevenue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[240px] w-full flex items-center justify-center text-xs font-medium text-slate-400">
        Loading Revenue Telemetry...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[240px] flex items-center justify-center">
      <ResponsiveContainer height={240} width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={chartData}
            dataKey="value"
            innerRadius={60}
            nameKey="name"
            outerRadius={90}
            paddingAngle={4}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell fill={entry.color} key={`cell-${index}`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
          ${totalRevenue.toLocaleString()}
        </span>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Total Sales
        </span>
      </div>
    </div>
  );
}

export default ChartPie;