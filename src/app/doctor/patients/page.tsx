"use client";

import { useEffect, useMemo, useState } from "react";

const summaries = [
  { label: "Registered Patients", value: "320" },
  { label: "Appointments Today", value: "14" },
  { label: "WhatsApp Reminders", value: "210" },
];

const GENDERS = ["Female", "Male", "Other"];
const DIAGNOSIS_TAGS = ["Migraine", "Hypertension", "Diabetes"];

export default function DoctorPatientsPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    fullName: "",
    age: "",
    gender: "Female",
    contact: "",
    diagnosis: "",
  });
  const [patients, setPatients] = useState([
    {
      id: "MED 1042",
      name: "Zainab Bibi",
      ageGender: "34 years / Female",
      contact: "+92 300 1234567",
      lastVisit: "October 21, 2026",
      diagnosis: "Migraine",
      status: "Active",
      record: "EHR",
    },
    {
      id: "MED 1043",
      name: "Muhammad Usman",
      ageGender: "45 years / Male",
      contact: "+92 301 9876543",
      lastVisit: "October 19, 2026",
      diagnosis: "Hypertension",
      status: "Active",
      record: "EHR",
    },
  ]);
  const [registeredCount, setRegisteredCount] = useState(320);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return patients;

    return patients.filter((patient) =>
      [
        patient.id,
        patient.name,
        patient.ageGender,
        patient.contact,
        patient.lastVisit,
        patient.diagnosis,
        patient.status,
        patient.record,
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [search, patients]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreatePatient = (event) => {
    event.preventDefault();
    const lastNumber = patients.reduce((max, patient) => {
      const number = Number(patient.id.replace("MED ", ""));
      return number > max ? number : max;
    }, 0);
    const nextId = `MED ${lastNumber + 1}`;
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const record = {
      id: nextId,
      name: newPatient.fullName,
      ageGender: `${newPatient.age} years / ${newPatient.gender}`,
      contact: newPatient.contact,
      lastVisit: today,
      diagnosis: newPatient.diagnosis,
      status: "Active",
      record: "EHR",
    };
    setPatients([...patients, record]);
    setRegisteredCount(registeredCount + 1);
    setNewPatient({ fullName: "", age: "", gender: "Female", contact: "", diagnosis: "" });
    setIsAddPatientOpen(false);
  };

  if (!mounted) {
    return (
      <div className="p-4 text-center font-medium text-slate-500">
        Loading patient directory...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6 pb-16">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Master Patient Directory
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Electronic health records and patient contact index
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddPatientOpen(true)}
          className="bg-[#113F2A] hover:bg-[#1b5238] text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all"
        >
          + New Patient File
        </button>
      </header>

      <section
        aria-label="Patient directory summaries"
        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
      >
        {summaries.map((summary) => (
          <div
            key={summary.label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 lg:p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {summary.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {summary.label === "Registered Patients" ? registeredCount : summary.value}
            </p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 lg:p-6 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Patient File Index
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Search patient records by name, ID, diagnosis, or contact
            </p>
          </div>
          <label className="block w-full sm:max-w-xs">
            <span className="sr-only">Search patient records</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search patient records"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
            />
          </label>
        </div>
        <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[900px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 font-semibold uppercase text-slate-400">
                <th scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">Patient ID</th>
                <th scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">Full Name</th>
                <th scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">Age / Gender</th>
                <th scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">Contact</th>
                <th scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">Last Visit Date</th>
                <th scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">Diagnosis Tag</th>
                <th scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap font-bold text-slate-900">{patient.id}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{patient.name}</span>
                      <span className="rounded-full bg-[#E2F0E8] px-2 py-0.5 text-[10px] font-bold text-[#226E4B]">
                        {patient.record}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">{patient.ageGender}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">{patient.contact}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">{patient.lastVisit}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                      {patient.diagnosis}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-bold text-[#226E4B]">
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-8 sm:px-4 sm:py-8 whitespace-nowrap text-center text-sm text-slate-500"
                  >
                    No patient records match this search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isAddPatientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-slate-900 max-w-md w-full rounded-2xl p-6 shadow-2xl relative border border-emerald-800/20">
            <h2 className="text-lg font-bold text-slate-900">Create New Patient File</h2>
            <p className="mt-1 text-xs text-slate-500">Register new electronic health record</p>
            <form onSubmit={handleCreatePatient} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newPatient.fullName}
                  onChange={(event) => setNewPatient({ ...newPatient, fullName: event.target.value })}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Age Years</label>
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(event) => setNewPatient({ ...newPatient, age: event.target.value })}
                  placeholder="Age"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
                <select
                  value={newPatient.gender}
                  onChange={(event) => setNewPatient({ ...newPatient, gender: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                >
                  {GENDERS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Mobile Contact Number</label>
                <input
                  type="tel"
                  value={newPatient.contact}
                  onChange={(event) => setNewPatient({ ...newPatient, contact: event.target.value })}
                  placeholder="Enter contact number"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Initial Diagnosis Tag</label>
                <select
                  value={newPatient.diagnosis}
                  onChange={(event) => setNewPatient({ ...newPatient, diagnosis: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                >
                  {DIAGNOSIS_TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#113F2A] hover:bg-[#1b5238] text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                  Create File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
