import React from "react";
import { createRoot } from "react-dom/client";
import Page from "./app/page";

const container = document.getElementById("medora-dashboard-root");
if (container) {
  createRoot(container).render(<Page />);
}
