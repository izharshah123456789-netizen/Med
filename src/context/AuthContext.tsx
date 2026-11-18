"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { recordStaffAttendance } from "../lib/staff-attendance";
import {
  formatStaffPhone,
  getAssignedDoctors,
  getProfile,
  getSupabase,
  hasSupabaseConfiguration,
  isDevelopmentDemo,
  isSupabaseConfigured,
  supabase,
  type UserRole,
} from "../lib/supabase";

export type { UserRole } from "../lib/supabase";

export type UserMetadata = {
  mobile: string;
  role: UserRole;
  doctorName?: string;
  doctorId?: string;
  userId?: string;
};

type AuthContextType = {
  user: UserMetadata | null;
  token: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  authError: string | null;
  loginDemo: (mobile: string, role: UserRole, doctorName?: string) => UserMetadata;
  loginWithPassword: (
    identifier: string,
    password: string,
    expectedRole: "patient" | "doctor",
    doctorName?: string,
  ) => Promise<UserMetadata>;
  requestStaffOtp: (mobile: string) => Promise<void>;
  verifyStaffOtp: (
    mobile: string,
    otp: string,
    doctorName: string,
  ) => Promise<UserMetadata>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoCredentials: Record<string, UserRole> = {
  "9876543210": "reception",
  "9876543211": "doctor",
  "9876543212": "owner",
};

function isUserMetadata(value: unknown): value is UserMetadata {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.mobile === "string" &&
    (candidate.role === "patient" ||
      candidate.role === "reception" ||
      candidate.role === "doctor" ||
      candidate.role === "owner") &&
    (candidate.doctorName === undefined ||
      typeof candidate.doctorName === "string") &&
    (candidate.doctorId === undefined ||
      typeof candidate.doctorId === "string") &&
    (candidate.userId === undefined || typeof candidate.userId === "string")
  );
}

function createDemoToken(): string {
  const bytes = new Uint8Array(24);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Authentication failed.";
}

async function getAuthenticatedProfile(user: Parameters<typeof getProfile>[0]) {
  try {
    return await getProfile(user);
  } catch (error) {
    const { error: signOutError } = await getSupabase().auth.signOut();
    if (signOutError) {
      console.error("Could not clear the account without a profile", signOutError);
    }
    throw error;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserMetadata | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const restoreSession = async () => {
      if (hasSupabaseConfiguration) {
        try {
          const client = getSupabase();
          const { data, error } = await client.auth.getSession();
          if (error) throw error;
          if (data.session) {
            const profile = await getProfile(data.session.user);
            setUser({
              mobile:
                profile.phone ||
                data.session.user.phone ||
                data.session.user.email ||
                "",
              role: profile.role,
              doctorName:
                profile.role === "doctor" ? profile.display_name : undefined,
              userId: profile.id,
            });
            setToken(data.session.access_token);
          }
        } catch (error) {
          const message = getErrorMessage(error);
          setAuthError(message);
          console.error("Could not restore the Supabase session", error);
          if (supabase) {
            const { error: signOutError } = await supabase.auth.signOut();
            if (signOutError) {
              console.error("Could not clear the invalid Supabase session", signOutError);
            }
          }
        }
      } else if (isDevelopmentDemo) {
        const storedUser = window.localStorage.getItem("medora_user");
        const storedToken = window.localStorage.getItem("medora_token");
        let parsedUser: unknown = null;
        if (storedUser) {
          try {
            parsedUser = JSON.parse(storedUser);
          } catch {
            window.localStorage.removeItem("medora_user");
            window.localStorage.removeItem("medora_token");
          }
        }
        if (isUserMetadata(parsedUser) && storedToken) {
          setUser(parsedUser);
          setToken(storedToken);
        }
      }
      setIsReady(true);
    };

    void restoreSession();
  }, []);

  const loginDemo = (
    mobile: string,
    role: UserRole,
    doctorName?: string,
  ): UserMetadata => {
    if (!isDevelopmentDemo) {
      throw new Error("Demo sign in is only available without Supabase in development.");
    }

    const userData: UserMetadata = { mobile, role, doctorName };
    const authToken = createDemoToken();
    if (role === "reception" && doctorName) {
      recordStaffAttendance(mobile, doctorName);
    }
    window.localStorage.setItem("medora_user", JSON.stringify(userData));
    window.localStorage.setItem("medora_token", authToken);
    window.localStorage.setItem("isLoggedIn", "true");
    window.localStorage.setItem("userRole", role);
    setUser(userData);
    setToken(authToken);
    setAuthError(null);
    return userData;
  };

  const loginWithPassword = async (
    identifier: string,
    password: string,
    expectedRole: "patient" | "doctor",
    doctorName?: string,
  ): Promise<UserMetadata> => {
    if (isDevelopmentDemo) {
      return loginDemo(
        identifier,
        expectedRole,
        expectedRole === "doctor" ? doctorName : undefined,
      );
    }

    const client = getSupabase();
    const normalizedIdentifier = identifier.trim();
    const credentials = normalizedIdentifier.includes("@")
      ? { email: normalizedIdentifier, password }
      : { phone: formatStaffPhone(normalizedIdentifier), password };
    const { data, error } = await client.auth.signInWithPassword(credentials);
    if (error) throw error;
    if (!data.user) throw new Error("Supabase did not return a signed in user.");

    const profile = await getAuthenticatedProfile(data.user);
    if (profile.role !== expectedRole) {
      const { error: signOutError } = await client.auth.signOut();
      if (signOutError) throw signOutError;
      throw new Error("This account cannot sign in to the selected portal.");
    }

    const userData: UserMetadata = {
      mobile:
        profile.phone ||
        data.user.phone ||
        data.user.email ||
        normalizedIdentifier,
      role: profile.role,
      doctorName: profile.role === "doctor" ? profile.display_name : undefined,
      userId: profile.id,
    };
    const { data: sessionData, error: sessionError } =
      await client.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) {
      throw new Error("Supabase did not return an active session.");
    }
    setUser(userData);
    setToken(sessionData.session.access_token);
    setAuthError(null);
    return userData;
  };

  const requestStaffOtp = async (mobile: string): Promise<void> => {
    if (isDevelopmentDemo) {
      if (!/^\d{10}$/.test(mobile)) {
        throw new Error("Enter a valid 10 digit mobile number.");
      }
      return;
    }

    const client = getSupabase();
    const { error } = await client.auth.signInWithOtp({
      phone: formatStaffPhone(mobile),
      options: { shouldCreateUser: false },
    });
    if (error) throw error;
  };

  const verifyStaffOtp = async (
    mobile: string,
    otp: string,
    doctorName: string,
  ): Promise<UserMetadata> => {
    if (isDevelopmentDemo) {
      const role = demoCredentials[mobile];
      if (otp !== "1234" || !role) {
        throw new Error("The mobile number or OTP is not valid.");
      }
      return loginDemo(mobile, role, doctorName);
    }

    const client = getSupabase();
    const { data, error } = await client.auth.verifyOtp({
      phone: formatStaffPhone(mobile),
      token: otp,
      type: "sms",
    });
    if (error) throw error;
    if (!data.user || !data.session) {
      throw new Error("Supabase did not return a verified session.");
    }

    const profile = await getAuthenticatedProfile(data.user);
    if (profile.role !== "reception" && profile.role !== "doctor" && profile.role !== "owner") {
      const { error: signOutError } = await client.auth.signOut();
      if (signOutError) throw signOutError;
      throw new Error("This account does not have staff portal access.");
    }

    let assignedDoctorId: string | undefined;
    if (profile.role === "reception") {
      const assignedDoctors = await getAssignedDoctors(profile.id);
      const selectedDoctor = assignedDoctors.find(
        (doctor) => doctor.name === doctorName,
      );
      if (!selectedDoctor) {
        const { error: signOutError } = await client.auth.signOut();
        if (signOutError) throw signOutError;
        throw new Error("You are not assigned to the selected doctor.");
      }
      assignedDoctorId = selectedDoctor.id;

      const { error: attendanceError } = await client
        .from("staff_attendance")
        .insert({
          staff_user_id: profile.id,
          doctor_user_id: assignedDoctorId,
        });
      if (attendanceError) {
        const { error: signOutError } = await client.auth.signOut();
        if (signOutError) throw signOutError;
        throw attendanceError;
      }
    }

    const userData: UserMetadata = {
      mobile: profile.phone || data.user.phone || mobile,
      role: profile.role,
      doctorName:
        profile.role === "doctor"
          ? profile.display_name
          : profile.role === "reception"
            ? doctorName
            : undefined,
      doctorId: assignedDoctorId,
      userId: profile.id,
    };
    setUser(userData);
    setToken(data.session.access_token);
    setAuthError(null);
    return userData;
  };

  const logout = async (): Promise<void> => {
    if (isSupabaseConfigured) {
      const { error } = await getSupabase().auth.signOut();
      if (error) throw error;
    }
    window.localStorage.removeItem("medora_user");
    window.localStorage.removeItem("medora_token");
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userRole");
    setUser(null);
    setToken(null);
    setAuthError(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isReady,
    authError,
    loginDemo,
    loginWithPassword,
    requestStaffOtp,
    verifyStaffOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function verifyOtp(mobile: string, otp: string): UserRole | null {
  if (otp !== "1234") return null;
  return demoCredentials[mobile] || null;
}
