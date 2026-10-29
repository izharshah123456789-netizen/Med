"use client";
import React, { useState, useEffect } from "react";

export default function WebsitePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="p-4 text-xs text-slate-500 font-medium">Loading website settings...</div>;

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-7xl mx-auto pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Clinic Website Management</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">Manage public storefront, clinic domain, and patient online booking portal</p>
        </div>
        <button className="px-4 py-2 text-xs font-bold rounded-xl bg-[#226E4B] text-white hover:bg-[#1b583c]">
          Publish Changes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Public Status</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">Domain Active</h3>
          <p className="text-sm text-slate-500 mt-2">medora.com/drsyedizhar</p>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Visitors</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">1,420 Patient Visits</h3>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Online Appointments</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">84 Direct Bookings</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Domain Configuration</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Custom Domain</label>
              <input type="text" defaultValue="medora.com/drsyedizhar" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#226E4B]" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm text-slate-600">SSL Status</span>
              <span className="text-xs font-bold text-[#226E4B] bg-emerald-50 px-2 py-1 rounded-full">Secure</span>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Clinic Address</label>
              <input type="text" defaultValue="Main Street Clinic Downtown" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#226E4B]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Hero Banner Customizer</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Clinic Tagline</label>
              <input type="text" defaultValue="Trusted care for every patient" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#226E4B]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Header Media Upload</label>
              <div className="flex items-center gap-2">
                <input type="file" accept="image/*" className="block w-full text-sm text-slate-600 file:mr-2 file:px-3 file:py-1.5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#226E4B] file:text-white hover:file:bg-[#1b583c]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Call to Action Button</label>
              <input type="text" defaultValue="Book Appointment" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#226E4B]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Operating Hours and Public Contact</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Monday to Friday</span>
              <span className="font-medium text-slate-900">09:00 AM to 06:00 PM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Saturday</span>
              <span className="font-medium text-slate-900">09:00 AM to 02:00 PM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Sunday</span>
              <span className="font-medium text-slate-900">Closed</span>
            </div>
            <hr className="border-slate-100 my-3" />
            <div className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">&#9742;</span>
              <div>
                <p className="text-sm font-medium text-slate-900">Phone</p>
                <p className="text-sm text-slate-500">+1 555 0102</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">&#9993;</span>
              <div>
                <p className="text-sm font-medium text-slate-900">Email</p>
                <p className="text-sm text-slate-500">clinic@medora.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
