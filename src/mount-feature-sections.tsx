import React from 'react';
import { createRoot } from 'react-dom/client';
import { FeatureSections } from './components/ui/feature-sections';

const container = document.getElementById('bank-grade-privacy-section');
if (container) {
  const root = createRoot(container);
  root.render(<FeatureSections />);
}