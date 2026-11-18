"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type RevenueMetric = {
  name: string;
  value: number;
  color: string;
};

export function ChartPie({
  data,
  total,
}: {
  data: RevenueMetric[];
  total: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell fill={entry.color} key={`cell-${index}`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {total}
        </span>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Total Sales
        </span>
      </div>
    </div>
  );
}

export default ChartPie;