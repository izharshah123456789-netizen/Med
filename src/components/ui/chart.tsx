import * as React from "react";
import { type PropsWithChildren } from "react";

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    color?: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
};

type ChartContainerProps = PropsWithChildren & {
  config: ChartConfig;
  className?: string;
  style?: React.CSSProperties;
};

export function ChartContainer({
  config,
  className,
  style,
  children,
}: ChartContainerProps) {
  const cssVars: React.CSSProperties = {};
  for (const key of Object.keys(config)) {
    if (config[key].color) {
      cssVars[`--color-${key}`] = config[key].color as string;
    }
  }
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart-container"
        className={className}
        style={{ ...cssVars, ...style }}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: React.ReactNode;
}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-slate-900">{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function useChartConfig(): ChartConfig {
  const ctx = React.useContext(ChartContext);
  if (!ctx) {
    throw new Error("useChartConfig must be used within a ChartContainer");
  }
  return ctx.config;
}