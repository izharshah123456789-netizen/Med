import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface CircleProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  gradientStart?: string;
  gradientEnd?: string;
  trackColor?: string;
  className?: string;
  children?: React.ReactNode;
  duration?: number;
  formatValue?: (value: number) => string;
}

export function CircleProgress({
  value,
  maxValue = 200,
  size = 160,
  strokeWidth = 8,
  gradientStart = "#226E4B",
  gradientEnd = "#10B981",
  trackColor = "#E2F0E8",
  className,
  children,
  duration = 1200,
  formatValue,
}: CircleProgressProps) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<SVGCircleElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(Math.max(value / maxValue, 0), 1);
  const offset = circumference * (1 - pct);

  useEffect(() => {
    let start = 0;
    const target = pct;
    const step = target / (duration / 16);
    let raf: number;
    const tick = () => {
      start += step;
      if (start >= target) {
        setDisplayed(target);
        cancelAnimationFrame(raf);
        return;
      }
      setDisplayed(start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pct, duration]);

  const center = size / 2;
  const gradId = `circle-grad-${Math.floor(Math.random() * 1e9)}`;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          ref={ref}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - displayed)}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children ? (
          children
        ) : (
          <>
            <span className="text-3xl font-black text-slate-900">
              {formatValue ? formatValue(value) : value}
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              of {maxValue}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function cn(...inputs: (string | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}
