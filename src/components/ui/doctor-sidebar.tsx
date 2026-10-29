"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Activity,
  Stethoscope,
  Users,
  UserRound,
  X,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Calendar,
  Globe,
  Bot,
  Pill,
} from "lucide-react";
import {
  DOCTOR_DASHBOARD_ROUTE,
  DOCTOR_ANALYTICS_ROUTE,
  DOCTOR_DOCTORS_ROUTE,
  DOCTOR_PATIENTS_ROUTE,
  DOCTOR_APPOINTMENTS_ROUTE,
  DOCTOR_WEBSITE_ROUTE,
  DOCTOR_AI_BUILDER_ROUTE,
  DOCTOR_TREATMENTS_ROUTE,
} from "../../lib/routes";

type NavItem = { label: string; icon: React.ElementType; route: string };

const navigation: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, route: DOCTOR_DASHBOARD_ROUTE },
  { label: "Analytics", icon: Activity, route: DOCTOR_ANALYTICS_ROUTE },
  { label: "Doctors", icon: Stethoscope, route: DOCTOR_DOCTORS_ROUTE },
  { label: "Patients", icon: Users, route: DOCTOR_PATIENTS_ROUTE },
  { label: "Appointments", icon: Calendar, route: DOCTOR_APPOINTMENTS_ROUTE },
  { label: "Website", icon: Globe, route: DOCTOR_WEBSITE_ROUTE },
  { label: "AI Website Builder", icon: Bot, route: DOCTOR_AI_BUILDER_ROUTE },
  { label: "Treatments", icon: Pill, route: DOCTOR_TREATMENTS_ROUTE },
];

export default function DoctorSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : DOCTOR_DASHBOARD_ROUTE,
  );

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigateTo = (route: string) => {
    if (typeof window === "undefined" || window.location.pathname === route) return;
    window.history.pushState({}, "", route);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const isActive = (route: string) => pathname === route;

  return (
    <aside className="flex h-full shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200" style={{ width: collapsed ? 60 : 256 }}>
      <div className="flex min-h-16 items-center justify-between border-b border-slate-100 px-4 py-2">
        <a href={DOCTOR_DASHBOARD_ROUTE} className="flex min-w-0 items-center gap-3" onClick={(e) => { e.preventDefault(); navigateTo(DOCTOR_DASHBOARD_ROUTE); }}>
          <span className="block truncate text-sm font-extrabold text-slate-900">Medora</span>
        </a>
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="hidden rounded-lg p-2 text-slate-500 hover:bg-[#F2F9F5] hover:text-[#226E4B] lg:inline-flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        <div className="space-y-1">
          {navigation.map(({ label, icon: Icon, route }) => {
            const active = isActive(route);
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(route);
                }}
                title={collapsed ? label : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${active ? "bg-[#E2F0E8] text-[#226E4B]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} ${collapsed && "justify-center px-2"}`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                {!collapsed && <span className="truncate">{label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100 p-3">
        <button
          type="button"
          title={collapsed ? "Sign out" : undefined}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#226E4B] ${collapsed ? "justify-center px-2" : ""}`}
          onClick={() => {
            try {
              window.sessionStorage.removeItem("medoraDoctorSession");
            } catch {}
            navigateTo("/signin");
          }}
        >
          <UserRound className="h-[18px] w-[18px]" aria-hidden="true" />
          {!collapsed && "Sign out"}
        </button>
      </div>
    </aside>
  );
}
