import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-[#226E4B]/15 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#226E4B] text-white hover:bg-[#1B5E3A] shadow-sm",
    secondary:
      "bg-[#E2F0E8] text-[#226E4B] hover:bg-[#D1EBE0]",
    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  if (asChild) {
    return (
      <span
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}