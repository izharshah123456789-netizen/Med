"use client";

import React, { useEffect, useState } from "react";
import { HowItWorks } from "../components/ui/how-it-works";
import CoreFeatures from "../components/ui/core-features";
import { Navbar } from "../components/ui/navbar";
import SignInPage from "./signin/page";
import { isSignInPathname } from "../lib/routes";

export default function Page() {
  const [pathname, setPathname] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", syncPathname);
    return () => window.removeEventListener("popstate", syncPathname);
  }, []);

  if (isSignInPathname(pathname)) {
    return <SignInPage />;
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
          <HowItWorks />
          <CoreFeatures />
        </main>
      </div>
    </div>
  );
}
