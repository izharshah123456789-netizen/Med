import React from "react";
import { createRoot } from "react-dom/client";
import { HowItWorks } from "./components/ui/how-it-works";

const container = document.getElementById("medora-impact-section");
if (container) {
  const root = createRoot(container);
  root.render(<HowItWorks />);
}
