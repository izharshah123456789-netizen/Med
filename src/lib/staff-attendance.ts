export const STAFF_ATTENDANCE_STORAGE_KEY = "medora_staff_attendance";

export const DOCTOR_OPTIONS = [
  "Dr. Syed Izhar Hussain",
  "Dr. Ayesha Malik",
  "Dr. Tariq Mahmood",
  "Dr. Fatima Zain",
] as const;

export type StaffAttendanceEntry = {
  id: string;
  staffMobile: string;
  staffName?: string;
  doctorName: string;
  checkedInAt: string;
};

export function readStaffAttendance(): StaffAttendanceEntry[] {
  const stored = window.localStorage.getItem(STAFF_ATTENDANCE_STORAGE_KEY);
  if (!stored) return [];

  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed)) {
    throw new Error("Stored staff attendance must be a list");
  }

  return parsed.filter(
    (entry): entry is StaffAttendanceEntry =>
      typeof entry === "object" &&
      entry !== null &&
      typeof entry.id === "string" &&
      typeof entry.staffMobile === "string" &&
      typeof entry.doctorName === "string" &&
      typeof entry.checkedInAt === "string",
  );
}

export function recordStaffAttendance(
  staffMobile: string,
  doctorName: string,
): void {
  const entries = readStaffAttendance();
  entries.unshift({
    id: `${Date.now()}${staffMobile}`,
    staffMobile,
    doctorName,
    checkedInAt: new Date().toISOString(),
  });
  window.localStorage.setItem(
    STAFF_ATTENDANCE_STORAGE_KEY,
    JSON.stringify(entries),
  );
}
