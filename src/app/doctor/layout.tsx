"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/doctor/dashboard",
  );
  const [navOpen, setNavOpen] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);

    const hyphenChar = String.fromCharCode(45);
    const navEventName = ["medora", "navigate"].join(hyphenChar);
    const onMedoraNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const target = customEvent.detail;
      if (!target) return;
      setActiveTab(target);
      const tabToRoute: Record<string, string> = {
        appointments: "/doctor/appointments",
        analytics: "/doctor/analytics",
        patients: "/doctor/patients",
        doctors: "/doctor/doctors",
        website: "/doctor/website",
        dashboard: "/doctor/dashboard",
        treatments: "/doctor/treatments"
      };
      tabToRoute[["ai", "builder"].join(hyphenChar)] = ["/doctor/ai", "builder"].join(hyphenChar);
      const nextRoute = tabToRoute[target] || ("/doctor/" + target);
      if (typeof window !== "undefined" && window.location.pathname !== nextRoute) {
        window.history.pushState({}, "", nextRoute);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
      setPathname(nextRoute);
    };

    window.addEventListener(navEventName, onMedoraNavigate);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener(navEventName, onMedoraNavigate);
    };
  }, []);

  const navigateTo = (route: string) => {
    if (typeof window === "undefined" || window.location.pathname === route) return;
    window.history.pushState({}, "", route);
    window.dispatchEvent(new PopStateEvent("popstate"));
    setPathname(route);
    setNavOpen(false);
  };

  const signOut = async () => {
    try {
      await logout();
      window.location.href = "/signin";
    } catch (error) {
      setSignOutError(
        error instanceof Error ? error.message : "Sign out failed.",
      );
    }
  };

  const overviewItems = [
    { label: "Dashboard", route: "/doctor/dashboard" },
    { label: "Analytics", route: "/doctor/analytics" },
  ];

  const workspaceItems = [
    { label: "Doctors", route: "/doctor/doctors" },
    { label: "Patients", route: "/doctor/patients" },
    { label: "Appointments", route: "/doctor/appointments" },
    { label: "Website", route: "/doctor/website" },
    { label: "AI Website Builder", route: "/doctor/ai-builder" },
    { label: "Treatments", route: "/doctor/treatments" },
  ];

  const renderNavItems = (items: { label: string; route: string }[]) => (
    items.map(({ label, route }) => {
      const active = pathname === route;
      return (
        <button
          key={label}
          type="button"
          onClick={() => navigateTo(route)}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            active
              ? "bg-[#226E4B] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <span>{label}</span>
        </button>
      );
    })
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F2F9F5] flex items-center justify-center text-slate-500 font-medium text-sm">
        Initializing Medora Portal...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F2F9F5] flex-col lg:flex-row">
      {/* DESKTOP SIDEBAR: Visible only on lg screens */}
      <aside className="hidden lg:flex w-64 flex-col flex-shrink-0 border-r border-slate-200/80 bg-white min-h-screen p-6">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#226E4B] flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
              M
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Medora</h2>
              <p className="text-[11px] font-semibold text-[#226E4B]">Doctor Portal</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <p className="px-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Overview
            </p>
            {renderNavItems(overviewItems)}

            <p className="px-3.5 pt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </p>
            {renderNavItems(workspaceItems)}
          </nav>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-slate-100 mt-auto">
          <div className="flex flex-col min-w-0 pr-2">
            <p className="truncate font-bold text-xs text-slate-800">Dr. Syed Izhar</p>
            <p className="text-[10px] text-slate-400 font-medium">Chief Officer</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 whitespace-nowrap"
            aria-label="Sign out"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MOBILE TOP HEADER: Hidden on lg screens */}
      <header className="block lg:hidden sticky top-0 z-50 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
        <button
          type="button"
          onClick={() => setNavOpen((value) => !value)}
          aria-label={navOpen ? "Close navigation" : "Open navigation"}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#226E4B] flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <span className="text-xs font-bold text-slate-900 hidden sm:inline">Medora</span>
        </div>
        <div className="w-7" />
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-full max-w-[80vw] bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#226E4B] flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="text-sm font-bold text-slate-900">Medora</span>
          </div>
          <button
            type="button"
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Overview
          </p>
          {renderNavItems(overviewItems)}

          <p className="px-2 pt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </p>
          {renderNavItems(workspaceItems)}

          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-1.5 w-full justify-center text-xs font-semibold text-red-600 hover:text-red-700 whitespace-nowrap py-2"
              aria-label="Sign out"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT VIEWPORT: Full remaining height and width */}
      <main className="flex-1 overflow-y-auto min-h-screen pt-16 lg:pt-0 lg:mt-0 pb-16">
        {signOutError ? (
          <p role="alert" className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {signOutError}
          </p>
        ) : null}
        {children}
      </main>
    </div>
  );
}
