import { createClient, type User } from "@supabase/supabase-js";

export type UserRole = "patient" | "reception" | "doctor" | "owner";

export type Profile = {
  id: string;
  role: UserRole;
  display_name: string;
  phone: string | null;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const hasSupabaseConfiguration = Boolean(supabaseUrl || supabaseAnonKey);
export const isDevelopmentDemo =
  import.meta.env.DEV && !hasSupabaseConfiguration;

export const supabase =
  isSupabaseConfigured && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function getSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
}

export function isUserRole(value: unknown): value is UserRole {
  return (
    value === "patient" ||
    value === "reception" ||
    value === "doctor" ||
    value === "owner"
  );
}

export async function getProfile(user: User): Promise<Profile> {
  const client = getSupabase();
  const { data, error } = await client
    .from("profiles")
    .select("id, role, display_name, phone")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  if (!data || !isUserRole(data.role)) {
    throw new Error("Your account does not have a valid Medora profile.");
  }

  return {
    id: data.id,
    role: data.role,
    display_name: data.display_name,
    phone: data.phone,
  };
}

export function formatStaffPhone(mobile: string): string {
  const internationalNumber = mobile.replace(/\s/g, "");
  if (/^\+[1-9]\d{7,14}$/.test(internationalNumber)) {
    return internationalNumber;
  }
  const digits = mobile.replace(/\D/g, "");
  if (digits.length !== 10) {
    throw new Error("Enter a valid 10 digit mobile number.");
  }
  return `+91${digits}`;
}

export async function getAssignedDoctors(staffUserId: string) {
  const client = getSupabase();
  const { data: assignments, error: assignmentError } = await client
    .from("staff_doctor_assignments")
    .select("doctor_user_id")
    .eq("staff_user_id", staffUserId);

  if (assignmentError) throw assignmentError;
  const doctorIds = (assignments || []).map((assignment) => assignment.doctor_user_id);
  if (doctorIds.length === 0) return [];

  const { data: doctors, error: doctorError } = await client
    .from("profiles")
    .select("id, display_name")
    .eq("role", "doctor")
    .in("id", doctorIds);

  if (doctorError) throw doctorError;
  return (doctors || []).map((doctor) => ({
    id: doctor.id,
    name: doctor.display_name,
  }));
}

export async function recordSupabaseAttendance(
  staffUserId: string,
  doctorId: string,
): Promise<void> {
  const client = getSupabase();
  const { error } = await client.from("staff_attendance").insert({
    staff_user_id: staffUserId,
    doctor_user_id: doctorId,
  });
  if (error) throw error;
}

export type RemoteAttendanceEntry = {
  id: string;
  staffMobile: string;
  staffName: string;
  doctorName: string;
  checkedInAt: string;
};

export async function getStaffAttendanceForDoctor(
  doctorId: string,
): Promise<RemoteAttendanceEntry[]> {
  const client = getSupabase();
  const { data: attendance, error: attendanceError } = await client
    .from("staff_attendance")
    .select("id, staff_user_id, checked_in_at")
    .eq("doctor_user_id", doctorId)
    .order("checked_in_at", { ascending: false });

  if (attendanceError) throw attendanceError;
  if (!attendance || attendance.length === 0) return [];

  const staffIds = [...new Set(attendance.map((entry) => entry.staff_user_id))];
  const { data: profiles, error: profileError } = await client
    .from("profiles")
    .select("id, display_name, phone")
    .in("id", staffIds);

  if (profileError) throw profileError;
  const profileById = new Map(
    (profiles || []).map((profile) => [profile.id, profile]),
  );

  return attendance.map((entry) => {
    const profile = profileById.get(entry.staff_user_id);
    return {
      id: entry.id,
      staffMobile: profile?.phone || "",
      staffName: profile?.display_name || "Staff",
      doctorName: "",
      checkedInAt: entry.checked_in_at,
    };
  });
}
