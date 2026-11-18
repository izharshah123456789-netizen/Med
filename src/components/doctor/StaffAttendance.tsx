"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  readStaffAttendance,
  STAFF_ATTENDANCE_STORAGE_KEY,
  type StaffAttendanceEntry,
} from "../../lib/staff-attendance";
import {
  getStaffAttendanceForDoctor,
  isSupabaseConfigured,
} from "../../lib/supabase";

type StaffAttendanceProps = {
  doctorName: string;
  doctorId?: string;
};

function localDateKey(value: Date): string {
  return `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`;
}

export default function StaffAttendance({
  doctorName,
  doctorId,
}: StaffAttendanceProps) {
  const [entries, setEntries] = useState<StaffAttendanceEntry[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadAttendance = async () => {
      try {
        const nextEntries = isSupabaseConfigured
          ? doctorId
            ? (await getStaffAttendanceForDoctor(doctorId)).map((entry) => ({
                ...entry,
                doctorName,
              }))
            : []
          : readStaffAttendance();
        if (!active) return;
        setEntries(nextEntries);
        setError("");
        setIsLoading(false);
      } catch {
        if (active) {
          setError("Staff attendance could not be loaded. Please try again.");
          setIsLoading(false);
        }
      }
    };

    if (isSupabaseConfigured && !doctorId) {
      setError("Your doctor profile is missing from this session.");
      setIsLoading(false);
    } else {
      void loadAttendance();
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === STAFF_ATTENDANCE_STORAGE_KEY || event.key === null) {
        void loadAttendance();
      }
    };
    window.addEventListener("storage", onStorage);
    const refreshTimer = isSupabaseConfigured
      ? window.setInterval(() => void loadAttendance(), 30000)
      : undefined;
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
      if (refreshTimer !== undefined) window.clearInterval(refreshTimer);
    };
  }, [doctorId, doctorName]);

  const doctorEntries = useMemo(
    () => entries.filter((entry) => entry.doctorName === doctorName),
    [doctorName, entries],
  );
  const todayEntries = doctorEntries.filter(
    (entry) => localDateKey(new Date(entry.checkedInAt)) === localDateKey(new Date()),
  );

  return (
    <section
      aria-labelledby="staffAttendanceHeading"
      className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm lg:p-6"
    >
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2
            id="staffAttendanceHeading"
            className="text-base font-bold text-slate-900"
          >
            Staff Attendance
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Staff sign ins for {doctorName}
          </p>
        </div>
        <div className="rounded-xl bg-[#E2F0E8] px-4 py-2 text-sm font-bold text-[#226E4B]">
          {todayEntries.length} sign ins today
        </div>
      </header>

      {error ? (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      ) : isLoading ? (
        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          Loading staff attendance...
        </p>
      ) : entries.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          No staff sign ins recorded for this doctor yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500">
                <th scope="col" className="px-3 py-3 font-semibold">
                  Staff Mobile
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Date
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Sign In Time
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {doctorEntries.map((entry) => {
                const checkedInAt = new Date(entry.checkedInAt);
                return (
                  <tr key={entry.id} className="border-b border-slate-50 last:border-0">
                    <td className="px-3 py-3 font-semibold text-slate-800">
                      <span>{entry.staffName || "Staff"}</span>
                      <span className="block text-xs font-normal text-slate-500">
                        {entry.staffMobile}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {checkedInAt.toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {checkedInAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-[#E2F0E8] px-2.5 py-1 text-xs font-bold text-[#226E4B]">
                        Present
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
