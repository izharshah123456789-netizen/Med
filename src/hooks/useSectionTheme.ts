import { useState, useEffect } from "react";

export type NavTheme = "dark" | "light";

export function useSectionTheme(): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("dark");

  useEffect(() => {
    const checkNavbarTouchSection = () => {
      const navbarElement =
        document.querySelector<HTMLElement>("header") ??
        document.querySelector<HTMLElement>("nav");
      const navbarHeight = navbarElement?.getBoundingClientRect().height ?? 80;
      const sampleY = Math.min(navbarHeight / 2, window.innerHeight - 10);
      const sampleX = window.innerWidth / 2;
      const previousPointerEvents = navbarElement?.style.pointerEvents;

      if (navbarElement) navbarElement.style.pointerEvents = "none";
      const elementAtNavbar = document.elementFromPoint(sampleX, sampleY);
      if (navbarElement) {
        navbarElement.style.pointerEvents = previousPointerEvents ?? "";
      }

      let sectionElement = elementAtNavbar?.closest<HTMLElement>("[data-section-theme]");
      const isAtPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      if (isAtPageBottom) {
        const themedSections = document.querySelectorAll<HTMLElement>("[data-section-theme]");
        const lastSection = themedSections[themedSections.length - 1];
        if (lastSection) sectionElement = lastSection;
      }

      const detectedTheme = sectionElement?.getAttribute("data-section-theme");
      if (detectedTheme === "dark" || detectedTheme === "light") {
        setTheme(detectedTheme);
      }
    };

    window.addEventListener("scroll", checkNavbarTouchSection, { passive: true });
    window.addEventListener("resize", checkNavbarTouchSection, { passive: true });
    checkNavbarTouchSection();

    return () => {
      window.removeEventListener("scroll", checkNavbarTouchSection);
      window.removeEventListener("resize", checkNavbarTouchSection);
    };
  }, []);

  return theme;
}
