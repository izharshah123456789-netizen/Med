"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Stethoscope,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HOME_ROUTE } from "../../lib/routes";

type Role = "patient" | "doctor";

type RoleFields = {
  identifierLabel: string;
  identifierPlaceholder: string;
  submitLabel: string;
  icon: LucideIcon;
};

const roleFields: Record<Role, RoleFields> = {
  patient: {
    identifierLabel: "Email / Phone Number",
    identifierPlaceholder: "Email or phone number",
    submitLabel: "Sign In as Patient",
    icon: User,
  },
  doctor: {
    identifierLabel: "Provider Email / NPI ID",
    identifierPlaceholder: "Provider email or NPI ID",
    submitLabel: "Sign In as Doctor",
    icon: Stethoscope,
  },
};

const roleTabs: { role: Role; label: string; icon: LucideIcon }[] = [
  { role: "patient", label: "Patient", icon: User },
  { role: "doctor", label: "Doctor", icon: Stethoscope },
];

const inputShell =
  "w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#226E4B] focus:bg-white focus:ring-4 focus:ring-[#226E4B]/10 transition-all duration-200";

function GoogleMark() {
  return (
    <svg
      className="w-5 h-5 shrink-0"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.29v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.29a12 12 0 0 0 0 10.78l3.98-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.61l3.98 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

export function SignInPage() {
  const [role, setRole] = useState<Role>("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");

  const fields = roleFields[role];
  const IdentifierIcon = fields.icon;

  const selectRole = (nextRole: Role) => {
    setRole(nextRole);
    setMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      role === "patient"
        ? "Patient sign in is ready. Connect this form to your Medora patient account service."
        : "Doctor sign in is ready. Connect this form to your Medora provider account service.",
    );
  };

  return (
    <main className="bg-[#F2F9F5] min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-10 relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 bg-[#226E4B]/5 blur-3xl rounded-full w-[500px] h-[500px]" />
        <div className="absolute -bottom-40 -right-32 bg-[#226E4B]/5 blur-3xl rounded-full w-[460px] h-[460px]" />
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 bg-white/70 blur-3xl rounded-full w-[320px] h-[320px]" />
      </div>

      <header className="relative z-10 flex w-full items-center">
        <a
          href={HOME_ROUTE}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#226E4B] hover:text-[#184F36] transition-colors mb-6"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back to Medora Home
        </a>
      </header>

      <div className="relative z-10 flex flex-1 items-center justify-center py-6">
        <div className="bg-white/95 backdrop-blur-md border border-[#226E4B]/10 rounded-3xl shadow-[0_20px_50px_rgba(34,110,75,0.08)] max-w-lg w-full mx-auto p-8 sm:p-10 transition-all duration-300">
          <div className="pt-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome to Medora
            </h1>
            <p className="text-sm font-medium text-slate-500 mb-8">
              Access your intelligent clinical portal
            </p>
          </div>

          <div
            className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl mb-8 border border-slate-200/60"
            role="tablist"
            aria-label="Account type"
          >
            {roleTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = role === tab.role;
              return (
                <button
                  key={tab.role}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectRole(tab.role)}
                  className={cn(
                    "rounded-xl py-3 text-sm transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#226E4B]/20",
                    isActive
                      ? "bg-[#226E4B] text-white font-semibold shadow-md shadow-[#226E4B]/20"
                      : "text-slate-600 hover:text-slate-900 font-medium hover:bg-white/50",
                  )}
                >
                  <TabIcon className="h-4 w-4" aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="medora-identifier"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                {fields.identifierLabel}
              </label>
              <div className="relative">
                <IdentifierIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 transition-colors duration-200"
                  aria-hidden="true"
                />
                <input
                  id="medora-identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder={fields.identifierPlaceholder}
                  className={cn(inputShell, "pl-11")}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="medora-password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 transition-colors duration-200"
                  aria-hidden="true"
                />
                <input
                  id="medora-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className={cn(inputShell, "pl-11 pr-12")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:text-[#226E4B] hover:bg-[#E2F0E8] transition-all duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="group inline-flex cursor-pointer select-none items-center gap-3">
                <input
                  type="checkbox"
                  name="remember"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-[#226E4B]/25",
                    rememberMe
                      ? "border-[#226E4B] bg-[#226E4B] shadow-sm shadow-[#226E4B]/30"
                      : "border-slate-300 bg-slate-50/50 group-hover:border-[#226E4B]/50",
                  )}
                >
                  <Check
                    className={cn(
                      "h-3.5 w-3.5 text-white transition-opacity duration-200",
                      rememberMe ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors duration-200">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() =>
                  setMessage("Password reset is available through your clinic administrator.")
                }
                className="text-sm font-semibold text-[#226E4B] hover:text-[#184F36] transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#226E4B] hover:bg-[#195238] active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-[#226E4B]/25 hover:shadow-xl hover:shadow-[#226E4B]/35 transition-all duration-200 text-sm tracking-wide mt-2"
            >
              {fields.submitLabel}
            </button>
          </form>

          {message ? (
            <p className="mt-5 text-sm font-medium text-[#226E4B] bg-[#E2F0E8] border border-[#226E4B]/15 rounded-xl px-4 py-3">
              {message}
            </p>
          ) : null}

          <div className="relative mt-6 mb-3 flex items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
            />
            <span className="relative bg-white px-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Or continue with
            </span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 mt-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 active:scale-[0.99] text-slate-700 font-semibold rounded-xl shadow-sm transition-all duration-200 text-sm cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#226E4B]/10"
          >
            <GoogleMark />
            <span>Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            New to Medora?{" "}
            <a
              href={`${HOME_ROUTE}#pricing`}
              className="font-semibold text-[#226E4B] hover:text-[#184F36] transition-colors duration-200"
            >
              Deploy your AI clinic
            </a>
          </p>
        </div>
      </div>

      <footer className="relative z-10 flex flex-col items-center justify-center gap-1 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Mail className="h-3.5 w-3.5 text-[#226E4B]" aria-hidden="true" />
          Secure encrypted access for your Medora workspace
        </p>
        <p className="text-xs text-slate-400">
          Protected by enterprise grade security and continuous audit logging
        </p>
      </footer>
    </main>
  );
}

export default SignInPage;
