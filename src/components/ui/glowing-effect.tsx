"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 64,
    spread = 40,
    variant = "default",
    glow = false,
    className,
    disabled = true,
    borderWidth = 2,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        const element = containerRef.current;
        if (!element) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const el = containerRef.current;
          if (!el) return;

          const { left, top, width, height } = el.getBoundingClientRect();
          const mouseX = e?.x ?? 0;
          const mouseY = e?.y ?? 0;

          // Relative position within the element
          const relX = mouseX - left;
          const relY = mouseY - top;
          el.style.setProperty("--mouse-x", `${relX}px`);
          el.style.setProperty("--mouse-y", `${relY}px`);

          // Distance from cursor to nearest edge of the card
          const dx = Math.max(-relX, relX - width, 0);
          const dy = Math.max(-relY, relY - height, 0);
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Glow intensity based on proximity
          const opacity = Math.max(0, Math.min(1, 1 - dist / proximity));
          el.style.setProperty("--active", String(opacity));
        });
      },
      [proximity],
    );

    useEffect(() => {
      if (disabled) return;

      const handlePointerMove = (e: PointerEvent) => handleMove(e);
      const handleScroll = () => handleMove();

      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        if (animationFrameRef.current)
          cancelAnimationFrame(animationFrameRef.current);
        document.body.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("scroll", handleScroll);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        style={
          {
            "--mouse-x": "50%",
            "--mouse-y": "50%",
            "--active": "0",
            "--border-width": `${borderWidth}px`,
            "--gradient":
              variant === "white"
                ? `radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), #FFFFFF 0%, #FFFFFF 30%, #FFFFFF00 60%)`
                : `radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), #FEF08A 0%, #FDE68A 12%, #FBBF24 25%, #F59E0B 40%, #F59E0B00 55%)`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-[calc(-1*var(--border-width))] rounded-[inherit] opacity-0 transition-opacity duration-300",
          glow && "opacity-100",
          blur > 0 && `blur-[${blur}px]`,
          className,
        )}
      >
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            border: `${borderWidth}px solid transparent`,
            background: "var(--gradient)",
            backgroundClip: "padding-box",
            WebkitBackgroundClip: "padding-box",
            opacity: "var(--active, 0)",
            transition: "opacity 150ms ease-out",
          } as React.CSSProperties}
        />
      </div>
    );
  },
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
export default GlowingEffect;