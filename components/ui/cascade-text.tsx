import React, { useEffect, useRef, useState, type CSSProperties } from 'react';

export interface TextRevealProps {
  text: string;
  fontSize?: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  /** Prevent mid-word wrapping (e.g. "Amplified" splitting onto two lines). */
  noWrap?: boolean;
  /** Delay between each character during the cascade, in ms */
  stagger?: number;
  /** Duration of the color transition on hover, in ms */
  duration?: number;
  /** Duration of the entry reveal animation, in ms */
  revealDuration?: number;
}

/**
 * TextReveal
 *
 * Renders a line of text whose characters cascade into place on entry and
 * transition through a hover accent color character-by-character on hover.
 *
 * Each line is a single TextReveal instance so that long words such as
 * "Amplified" never break mid-word — set `noWrap` (or wrap with
 * `whitespace-nowrap`) to keep the line on one row.
 *
 * Usage (3-line hero cascade):
 *   <TextReveal text="Precision" fontSize="3.5rem" color="#FFFFFF" hoverColor="#0D9488" className="font-extrabold" />
 *   <br>
 *   <TextReveal text="Care," fontSize="3.5rem" color="#FFFFFF" hoverColor="#0D9488" className="font-extrabold" />
 *   <br>
 *   <TextReveal text="Amplified by AI." fontSize="2.75rem" color="#E8F5EE" hoverColor="#F59E0B" className="font-extrabold" />
 */
export function TextReveal({
  text,
  fontSize = '3.5rem',
  color = '#FFFFFF',
  hoverColor = '#0D9488',
  className = '',
  noWrap = true,
  stagger = 50,
  duration = 500,
  revealDuration = 600,
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [entered, setEntered] = useState(false);

  // Apply a per-character transition delay so the cascade feels sequential.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>('.tr-char');
    chars.forEach((char, i) => {
      char.style.transitionDelay = `${i * stagger}ms`;
    });
    // Trigger the entry reveal on the next frame.
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [stagger]);

  const applyCascade = (targetColor: string) => {
    const el = containerRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>('.tr-char');
    chars.forEach((char, i) => {
      char.style.transitionDelay = `${i * stagger}ms`;
      char.style.color = targetColor;
    });
  };

  const handleMouseEnter = () => applyCascade(hoverColor);
  const handleMouseLeave = () => applyCascade(color);

  const style: CSSProperties = {
    fontSize,
    color,
    display: 'inline-block',
    whiteSpace: noWrap ? 'nowrap' : 'normal',
  };

  return (
    <span
      ref={containerRef}
      className={`tr-reveal ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text.split('').map((char, i) => {
        const isSpace = char === ' ';
        return (
          <span
            key={i}
            className={`tr-char${entered ? ' tr-char--entered' : ''}`}
            style={{
              display: 'inline-block',
              opacity: entered ? 1 : 0,
              transform: entered ? 'none' : 'translateY(14px)',
              transition: `opacity ${revealDuration}ms ease-out, transform ${revealDuration}ms ease-out, color ${duration}ms ease-out`,
              color,
            }}
          >
            {isSpace ? ' ' : char}
          </span>
        );
      })}
    </span>
  );
}