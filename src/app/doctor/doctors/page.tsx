"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Building2, Clock3, Plus, Stethoscope } from "lucide-react";

interface Doctor {
  name: string;
  role: string;
  room: string;
  hours: string;
  status: string;
}

const initialDoctors: Doctor[] = [
  {
    name: "Dr. Syed Izhar Hussain",
    role: "Chief Medical Officer",
    room: "Room 101",
    hours: "09:00 AM to 03:00 PM",
    status: "In Consultation",
  },
  {
    name: "Dr. Ayesha Malik",
    role: "Senior Cardiologist",
    room: "Room 104",
    hours: "10:00 AM to 04:00 PM",
    status: "Active",
  },
  {
    name: "Dr. Tariq Mahmood",
    role: "Lead Pediatrician",
    room: "Room 202",
    hours: "01:00 PM to 06:00 PM",
    status: "On Break",
  },
  {
    name: "Dr. Fatima Zain",
    role: "Dermatologist",
    room: "Room 205",
    hours: "09:00 AM to 02:00 PM",
    status: "Off Duty",
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-[#E2F0E8] text-[#226E4B]",
  "In Consultation": "bg-emerald-100 text-[#226E4B]",
  "On Break": "bg-amber-100 text-amber-700",
  "Off Duty": "bg-slate-100 text-slate-600",
};

const kpis = [
  {
    label: "Active Medical Staff",
    value: "12",
    detail: "Active Physicians",
    sub: "Two joined this month",
    icon: Stethoscope,
  },
  {
    label: "On Duty Today",
    value: "5",
    detail: "Clinicians",
    sub: "Active in consultation rooms",
    icon: Clock3,
  },
  {
    label: "Medical Specialties",
    value: "8",
    detail: "Departments",
    sub: "Cardiology, Pediatrics, Dermatology, Neurology",
    icon: Building2,
  },
];

export default function DoctorDoctorsPage() {
  const [mounted, setMounted] = useState(false);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  useEffect(() => setMounted(true), []);

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return doctors.filter((doctor) => {
      const matchesSearch = [
        doctor.name,
        doctor.role,
        doctor.room,
        doctor.hours,
        doctor.status,
      ].some((value) => value.toLowerCase().includes(query));
      const matchesStatus =
        statusFilter === "All Statuses" || doctor.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [doctors, search, statusFilter]);

  function registerDoctor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const room = String(form.get("room") ?? "").trim();
    const hours = String(form.get("hours") ?? "").trim();

    if (!name || !role || !room || !hours) {
      setRegistrationError("Complete every registration field before saving.");
      return;
    }

    setDoctors((current) => [
      ...current,
      { name, role, room, hours, status: "Active" },
    ]);
    setRegistrationError("");
    setShowRegistration(false);
  }

  if (!mounted) {
    return (
      <div className="p-4 text-center font-medium text-slate-500">
        Loading clinical staff directory...
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-8 bg-[#F2F9F5] p-4 lg:p-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
            Clinical Staff Directory
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Manage clinicians, duty schedules, and consultation rooms
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setRegistrationError("");
            setShowRegistration((visible) => !visible);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#226E4B] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b583c]"
        >
          <Plus className="h-4 w-4" />
          Register New Doctor
        </button>
      </header>

      {showRegistration && (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 lg:p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Register a Clinician
          </h2>
          <form
            onSubmit={registerDoctor}
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <label className="text-xs font-semibold text-slate-600">
              Full Name
              <input
                required
                name="name"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal"
              />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Specialty
              <input
                required
                name="role"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal"
              />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Room Assignment
              <input
                required
                name="room"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal"
              />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Duty Hours
              <input
                required
                name="hours"
                placeholder="09:00 AM to 03:00 PM"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal"
              />
            </label>
            {registrationError && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 sm:col-span-2 lg:col-span-4"
              >
                {registrationError}
              </p>
            )}
            <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
              <button
                type="submit"
                className="rounded-lg bg-[#226E4B] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b583c]"
              >
                Save Registration
              </button>
              <button
                type="button"
                onClick={() => {
                  setRegistrationError("");
                  setShowRegistration(false);
                }}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section
        aria-label="Clinical staff summaries"
        className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3"
      >
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 lg:p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {kpi.label}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E2F0E8] text-[#226E4B]">
                <kpi.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-black tracking-tight text-slate-900">
              {kpi.value} {kpi.detail}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">{kpi.sub}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-lg font-bold text-slate-900">Clinical Roster</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label>
              <span className="sr-only">Search clinicians</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search clinicians"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] sm:w-64"
              />
            </label>
            <label>
              <span className="sr-only">Filter by status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] sm:w-44"
              >
                <option>All Statuses</option>
                <option>Active</option>
                <option>In Consultation</option>
                <option>On Break</option>
                <option>Off Duty</option>
              </select>
            </label>
          </div>
        </div>

        {filteredDoctors.map((doctor) => (
          <article
            key={`${doctor.name}-${doctor.room}`}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 lg:p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {doctor.name}
                </p>
                <p className="text-xs text-slate-500">{doctor.role}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span>
                  <span className="font-semibold">Room:</span> {doctor.room}
                </span>
                <span>
                  <span className="font-semibold">Duty Hours:</span>{" "}
                  {doctor.hours}
                </span>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${statusColors[doctor.status] ?? statusColors.Active}`}
                >
                  {doctor.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Manage Timings
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View Patient Queue
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#226E4B] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#184F36]"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredDoctors.length === 0 && (
          <p className="rounded-2xl border border-slate-200/80 bg-white p-4 lg:p-8 text-center text-sm text-slate-500">
            No clinicians match these filters
          </p>
        )}
      </section>
    </div>
  );
}
