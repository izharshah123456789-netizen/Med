'use client';

import React from 'react';
import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';

export default function ReceptionDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['reception']}>
      <div className="min-h-screen bg-[#F2F9F5] p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Reception Dashboard</h1>
          <p className="text-sm text-slate-600">Welcome to the reception portal</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
