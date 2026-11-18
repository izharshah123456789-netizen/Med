import React from 'react';
import { createRoot } from 'react-dom/client';
import Page from './app/page';
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('medora-staff-login-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <AuthProvider>
      <Page />
    </AuthProvider>
  );
}
