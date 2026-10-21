"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";

type ImpactFeature = {
  number: string;
  title: string;
  description: string;
  badge: string;
  minHeight: string;
  offset: string;
  pinColor: string;
};

const medoraFeatures: ImpactFeature[] = [
  {
    number: "60%",
    title: "Less Administrative Time",
    description: "Spent on administrative charting and manual paperwork per doctor.",
    badge: "• EFFICIENCY GAIN",
    minHeight: "min-h-[360px]",
    offset: "",
    pinColor: "#226E4B",
  },
  {
    number: "3.5 hrs",
    title: "Saved Daily Per Physician",
    description: "Automated clinical scribing and scheduling give hours back to direct patient care.",
    badge: "• TIME RECLAIMED",
    minHeight: "min-h-[380px]",
    offset: "mt-[50px]",
    pinColor: "#88C3A4",
  },
  {
    number: "40%",
    title: "Reduction in Operational Costs",
    description: "Drastically cut practice overhead staffing burden and claim rejections.",
    badge: "• COST OPTIMIZED",
    minHeight: "min-h-[310px]",
    offset: "-mt-[30px]",
    pinColor: "#226E4B",
  },
  {
    number: "99.8%",
    title: "Clinical & Coding Accuracy",
    description: "Precision AI dialogue transcription automated ICD 10 medical coding and zero paper errors.",
    badge: "• HIGH PRECISION",
    minHeight: "min-h-[360px]",
    offset: "",
    pinColor: "#88C3A4",
  },
];

type Anchor = { x: number; y: number };

type WaveShape = {
  out: number;
  in: number;
  outY: number;
  inY: number;
};

const waveShapes: WaveShape[] = [
  { out: 0.3, in: 0.38, outY: 10, inY: 5 },
  { out: 0.34, in: 0.34, outY: -5, inY: -10 },
  { out: 0.34, in: 0.34, outY: 10, inY: 10 },
];

const buildWavePath = (anchors: Anchor[]) => {
  if (anchors.length < 2) return "";

  const segments = [`M ${anchors[0].x.toFixed(2)} ${anchors[0].y.toFixed(2)}`];
  for (let index = 0; index < anchors.length - 1; index += 1) {
    const from = anchors[index];
    const to = anchors[index + 1];
    const shape = waveShapes[index % waveShapes.length];
    const span = to.x - from.x;
    const controlOne = {
      x: from.x + span * shape.out,
      y: from.y + shape.outY,
    };
    const controlTwo = {
      x: to.x - span * shape.in,
      y: to.y + shape.inY,
    };
    segments.push(
      `C ${controlOne.x.toFixed(2)} ${controlOne.y.toFixed(2)}, ${controlTwo.x.toFixed(2)} ${controlTwo.y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`,
    );
  }
  return segments.join(" ");
};

export function HowItWorks({ id = "impact" }: { id?: string }) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [canvas, setCanvas] = useState({ width: 0, height: 0 });
  const [connectorPath, setConnectorPath] = useState("");

  const measureConnector = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    if (!svgRect.width || !svgRect.height) return;

    const anchors: Anchor[] = [];
    medoraFeatures.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      anchors.push({
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top - svgRect.top,
      });
    });

    if (anchors.length < 2) return;

    setCanvas((previous) =>
      previous.width === svgRect.width && previous.height === svgRect.height
        ? previous
        : { width: svgRect.width, height: svgRect.height },
    );
    setConnectorPath(buildWavePath(anchors));
  }, []);

  useLayoutEffect(() => {
    measureConnector();
  }, [measureConnector]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const observer = new ResizeObserver(() => measureConnector());
    observer.observe(row);
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    window.addEventListener("resize", measureConnector);
    window.addEventListener("load", measureConnector);
    const settleTimer = window.setTimeout(measureConnector, 400);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureConnector);
      window.removeEventListener("load", measureConnector);
      window.clearTimeout(settleTimer);
    };
  }, [measureConnector]);

  return (
    <section id={id} className="medora-impact py-24 px-6 bg-[#EEF7F2]" data-navbar-theme="apricot">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#226E4B] bg-[#E2F0E8] border border-[#226E4B]/15 uppercase mb-3">
            MEDORA IMPACT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-none mx-auto mb-3">
            Proven Practice Outcomes
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-none mx-auto mb-10">
            Measurable efficiency gains financial savings and precision clinical automation.
          </p>
        </div>
      </div>

      <div className="medora-impact-cards-viewport w-full overflow-hidden">
        <div
          ref={rowRef}
          className="medora-impact-cards relative mx-auto grid w-full min-w-0 max-w-[1720px] grid-cols-4 items-start gap-2 md:gap-8 z-10 pt-16"
        >
          {medoraFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={cn("medora-impact-card-wrap relative z-10 flex min-w-0 flex-col items-center px-2 md:px-3", feature.offset)}
            >
              <motion.div
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={cn(
                  "pin-step-card relative w-full rounded-2xl bg-white border border-[#226E4B]/20 p-6 shadow-[0_15px_35px_rgba(34,110,75,0.12)] flex flex-col",
                  feature.minHeight,
                )}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ boxShadow: "0 22px 46px rgba(34, 110, 75, 0.20)" }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 drop-shadow-[0_6px_12px_rgba(34,110,75,0.25)]">
                  <Pin className="w-7 h-7" fill={feature.pinColor} stroke={feature.pinColor} strokeWidth={1.75} />
                </div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
                >
                  <div className="text-4xl sm:text-5xl font-black text-[#226E4B]">{feature.number}</div>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">{feature.description}</p>
                </motion.div>
                <span className="inline-flex items-center text-[10px] font-bold text-[#226E4B] bg-[#E2F0E8] border border-[#226E4B]/20 px-3 py-1 rounded-full w-fit uppercase mt-auto">
                  {feature.badge}
                </span>
              </motion.div>
            </div>
          ))}

          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox={`0 0 ${(canvas.width || 1).toFixed(2)} ${(canvas.height || 1).toFixed(2)}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d={connectorPath}
              stroke="#226E4B"
              strokeOpacity={0.4}
              strokeWidth={2.5}
              strokeDasharray="8 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              fill="none"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -140 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {connectorPath
              ? [0, -1.5].map((delay) => (
                  <circle key={`traveler-${delay}`} r={4.5} fill="#226E4B" opacity={0.9}>
                    <animateMotion dur="3s" repeatCount="indefinite" path={connectorPath} begin={`${delay}s`} />
                  </circle>
                ))
              : null}
          </svg>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
