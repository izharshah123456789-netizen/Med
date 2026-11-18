import React from "react";
import { createRoot } from "react-dom/client";
import MedoraChatWidget from "./components/ui/medora-chat-widget";

const container = document.getElementById("medora-chat-widget-root");
if (container) {
  const root = createRoot(container);
  root.render(<MedoraChatWidget />);
}
