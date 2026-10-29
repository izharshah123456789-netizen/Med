"use client";

import React, { useEffect, useState } from "react";
import LandingPage from "../components/ui/landing-page";
import DoctorDashboardPage from "./doctor/dashboard/page";
import DoctorAnalyticsPage from "./doctor/analytics/page";
import DoctorDoctorsPage from "./doctor/doctors/page";
import DoctorPatientsPage from "./doctor/patients/page";
import DoctorAppointmentsPage from "./doctor/appointments/page";
import DoctorWebsitePage from "./doctor/website/page";
import DoctorAiBuilderPage from "./doctor/ai-builder/page";
import DoctorTreatmentsPage from "./doctor/treatments/page";
import DoctorLayout from "./doctor/layout";
import PatientLayout from "./patient/layout";
import PatientDashboardPage from "./patient/dashboard/page";
import { Navbar } from "../components/ui/navbar";
import SignInPage from "../components/ui/signin";
import MedoraChatWidget from "@/components/ui/medora-chat-widget";
import {
  isDoctorDashboardPathname,
  isDoctorAnalyticsPathname,
  isDoctorDoctorsPathname,
  isDoctorPatientsPathname,
  isDoctorAppointmentsPathname,
  isDoctorWebsitePathname,
  isDoctorAiBuilderPathname,
  isDoctorTreatmentsPathname,
  isSignInPathname,
  isPatientDashboardPathname,
} from "../lib/routes";

export default function Page() {
  const [pathname, setPathname] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", syncPathname);

    const hyphenChar = String.fromCharCode(45);
    const navEventName = ["medora", "navigate"].join(hyphenChar);
    const onMedoraNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const target = customEvent.detail;
      if (!target) return;
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
      window.removeEventListener("popstate", syncPathname);
      window.removeEventListener(navEventName, onMedoraNavigate);
    };
  }, []);

  if (isSignInPathname(pathname)) {
    return <SignInPage />;
  }

  if (
    isDoctorDashboardPathname(pathname) ||
    isDoctorAnalyticsPathname(pathname) ||
    isDoctorDoctorsPathname(pathname) ||
    isDoctorPatientsPathname(pathname) ||
    isDoctorAppointmentsPathname(pathname) ||
    isDoctorWebsitePathname(pathname) ||
    isDoctorAiBuilderPathname(pathname) ||
    isDoctorTreatmentsPathname(pathname)
  ) {
    return (
      <DoctorLayout>
        {isDoctorAnalyticsPathname(pathname) ? (
          <DoctorAnalyticsPage />
        ) : isDoctorDoctorsPathname(pathname) ? (
          <DoctorDoctorsPage />
        ) : isDoctorPatientsPathname(pathname) ? (
          <DoctorPatientsPage />
        ) : isDoctorAppointmentsPathname(pathname) ? (
          <DoctorAppointmentsPage />
        ) : isDoctorWebsitePathname(pathname) ? (
          <DoctorWebsitePage />
        ) : isDoctorAiBuilderPathname(pathname) ? (
          <DoctorAiBuilderPage />
        ) : isDoctorTreatmentsPathname(pathname) ? (
          <DoctorTreatmentsPage />
        ) : (
          <DoctorDashboardPage />
        )}
      </DoctorLayout>
    );
  }

  if (isPatientDashboardPathname(pathname)) {
    return (
      <PatientLayout>
        <PatientDashboardPage />
      </PatientLayout>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F2F9F5]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 bg-[#226E4B]/5 blur-3xl rounded-full w-[500px] h-[500px]" />
        <div className="absolute -bottom-40 -right-32 bg-[#226E4B]/5 blur-3xl rounded-full w-[460px] h-[460px]" />
      </div>

      <div className="relative z-10 flex w-full flex-col">
        <Navbar />
        <main className="w-full">
          <LandingPage />
        </main>
      </div>

      <MedoraChatWidget />
    </div>
  );
}
