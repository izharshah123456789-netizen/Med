"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOME_ROUTE, SIGN_IN_ROUTE } from "../../lib/routes";
import { useSectionTheme } from "../../hooks/useSectionTheme";

const navLinks = [
  { label: "FAQs", href: `${HOME_ROUTE}#faqs` },
  { label: "About", href: `${HOME_ROUTE}#about` },
  { label: "Features", href: `${HOME_ROUTE}#features` },
  { label: "MEDORA IMPACT", href: `${HOME_ROUTE}#impact` },
  { label: "Pricing", href: `${HOME_ROUTE}#pricing` },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSectionTheme();
  const isDark = theme === "dark";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ease-in-out px-4 sm:px-6 lg:px-8 py-3.5",
        isDark
          ? "bg-[#113F2A]/95 backdrop-blur-md border-white/15"
          : "bg-white/95 backdrop-blur-md border-[#E2E8F0]",
      )}
    >
      <nav id="main-navbar" className="w-full transition-all duration-300">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-12 h-16 flex items-center justify-between w-full">
          <a
            href={HOME_ROUTE}
            id="nav-logo-text"
            className={cn(
              "brand-text inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight shrink-0 group",
              isDark ? "text-white" : "text-[#113F2A]",
            )}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2F0E8] border border-[#226E4B]/20 text-[#226E4B] transition-all duration-300 group-hover:bg-[#226E4B] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#226E4B]/25">
              <svg
                className="h-5 w-5"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M16 3 28 9.5v13L16 29 4 22.5v-13L16 3Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 9v14M9 16h14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Medora
          </a>

          <div className="hidden md:flex items-center gap-7 font-semibold text-xs tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "nav-link relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#226E4B] after:transition-all after:duration-300 hover:after:w-full",
                  isDark ? "text-[#E2E8F0]" : "text-[#1A2E26]",
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href={SIGN_IN_ROUTE}
              data-nav-sign-in="desktop"
              className="inline-flex items-center justify-center gap-2 bg-[#226E4B] hover:bg-[#195238] text-white px-5 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg shadow-[#226E4B]/25 hover:shadow-xl hover:shadow-[#226E4B]/35 active:scale-[0.98] transition-all duration-200"
            >
              Sign In
            </a>
          </div>

          <button
            id="mobileMenuButton"
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobileNavMenu"
            aria-label="Open navigation menu"
            className={cn(
              "inline-flex md:hidden items-center justify-center rounded-xl border border-[#226E4B]/20 bg-white/70 p-2.5 relative z-50 pointer-events-auto transition-colors duration-200 hover:bg-[#E2F0E8]",
              isDark ? "text-white" : "text-[#113F2A]",
            )}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <div
            id="mobileNavMenu"
            className={cn(
              "md:hidden fixed inset-x-0 top-16 z-40 flex-col gap-1 border-t p-6 shadow-xl",
              menuOpen ? "flex" : "hidden",
              isDark
                ? "border-white/15 bg-[#113F2A] text-white shadow-[#226E4B]/10"
                : "border-[#E2E8F0] bg-[#113F2A] text-white shadow-slate-900/5",
            )}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="nav-link rounded-lg px-3 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800/60 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={SIGN_IN_ROUTE}
              data-nav-sign-in="mobile"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[#226E4B] hover:bg-[#195238] text-white px-4 py-3 rounded-full text-sm font-bold tracking-wide shadow-lg shadow-[#226E4B]/25 transition-all duration-200 w-full text-center"
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
