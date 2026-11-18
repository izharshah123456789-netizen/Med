"use client";

import React, { useState, type FormEvent } from "react";
import { useAuth, type UserMetadata } from "../../context/AuthContext";
import { DOCTOR_OPTIONS } from "../../lib/staff-attendance";
import { isDevelopmentDemo } from "../../lib/supabase";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  border: "1px solid #d5e1da",
  borderRadius: 12,
  background: "#f8fbf9",
  color: "#17231c",
  fontSize: 15,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  border: 0,
  borderRadius: 12,
  background: "#226E4B",
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
};

const credentials = [
  { mobile: "9876543210", role: "reception" },
  { mobile: "9876543211", role: "doctor" },
  { mobile: "9876543212", role: "owner" },
];

export function StaffLogin() {
  const [mobile, setMobile] = useState("");
  const [doctorName, setDoctorName] = useState<string>(DOCTOR_OPTIONS[0]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpLength, setOtpLength] = useState(isDevelopmentDemo ? 4 : 6);
  const { requestStaffOtp, verifyStaffOtp } = useAuth();

  const handleSendOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter a valid 10 digit mobile number");
      return;
    }
    try {
      await requestStaffOtp(mobile);
      setOtpLength(isDevelopmentDemo ? 4 : 6);
      setOtpSent(true);
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "The code could not be sent. Please try again.",
      );
    }
  };

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    let user: UserMetadata;
    try {
      user = await verifyStaffOtp(mobile, otp, doctorName);
    } catch (verifyError) {
      setError(
        verifyError instanceof Error
          ? verifyError.message
          : "The code could not be verified. Please try again.",
      );
      return;
    }
    const roleRoutes = {
      reception: "/reception/dashboard",
      doctor: "/doctor/dashboard",
      owner: "/owner/dashboard",
      patient: "/patient/dashboard",
    };
    window.history.pushState({}, "", roleRoutes[user.role]);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        background: "#f2f9f5",
        fontFamily: "Arial",
      }}
    >
      <a
        href="/signin"
        style={{
          width: "100%",
          maxWidth: 440,
          marginBottom: 16,
          color: "#226E4B",
          fontSize: 14,
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Back to sign in
      </a>
      <section
        style={{
          alignSelf: "stretch",
          maxWidth: 440,
          padding: 32,
          border: "1px solid #e0ebe4",
          borderRadius: 24,
          background: "#ffffff",
          boxShadow: "0 20px 50px rgba(34, 110, 75, 0.1)",
        }}
      >
        <header style={{ marginBottom: 28 }}>
          <div
            style={{
              width: 44,
              height: 44,
              display: "grid",
              placeItems: "center",
              marginBottom: 18,
              borderRadius: 14,
              background: "#226E4B",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <h1 style={{ margin: "0 0 8px", color: "#17231c", fontSize: 28 }}>
            Staff Login
          </h1>
          <p style={{ margin: 0, color: "#637168", fontSize: 14 }}>
            Sign in to your Medora staff portal
          </p>
        </header>

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <label
              htmlFor="staffDoctor"
              style={{ display: "block", marginBottom: 8, color: "#34443a", fontSize: 13, fontWeight: 700 }}
            >
              Doctor you work for
            </label>
            <select
              id="staffDoctor"
              name="doctor"
              required
              value={doctorName}
              onChange={(event) => setDoctorName(event.target.value)}
              style={{ ...fieldStyle, marginBottom: 20 }}
            >
              {DOCTOR_OPTIONS.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
            <label
              htmlFor="staffMobile"
              style={{ display: "block", marginBottom: 8, color: "#34443a", fontSize: 13, fontWeight: 700 }}
            >
              Mobile Number
            </label>
            <input
              id="staffMobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              autoComplete="tel"
              required
              placeholder="Enter 10 digit mobile number"
              value={mobile}
              onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))}
              style={fieldStyle}
            />
            <button type="submit" style={{ ...buttonStyle, marginTop: 20 }}>
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <label
              htmlFor="staffOtp"
              style={{ display: "block", marginBottom: 8, color: "#34443a", fontSize: 13, fontWeight: 700 }}
            >
              Enter OTP
            </label>
            <input
              id="staffOtp"
              name="otp"
              type="text"
              inputMode="numeric"
              pattern={`\\d{${otpLength}}`}
              maxLength={otpLength}
              required
              placeholder={`Enter ${otpLength} digit OTP`}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 4))}
              style={fieldStyle}
            />
            <p style={{ margin: "10px 0 18px", color: "#637168", fontSize: 13 }}>
            Signing in for {doctorName}. Enter the code sent to {mobile}
            </p>
            <button type="submit" style={buttonStyle}>
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setError("");
              }}
              style={{
                width: "100%",
                marginTop: 12,
                padding: 10,
                border: 0,
                background: "transparent",
                color: "#226E4B",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Change Mobile Number
            </button>
          </form>
        )}

        {error ? (
          <p role="alert" style={{ margin: "16px 0 0", color: "#b42318", fontSize: 14 }}>
            {error}
          </p>
        ) : null}

        <aside
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 12,
            background: "#f2f7f4",
            color: "#44534a",
            fontSize: 12,
            lineHeight: 1.8,
          }}
        >
          {isDevelopmentDemo ? (
            <>
              <strong style={{ display: "block", color: "#25352b" }}>Development Test Credentials</strong>
              {credentials.map((credential) => (
                <div key={credential.mobile}>
                  {credential.mobile} | OTP 1234 | {credential.role}
                </div>
              ))}
            </>
          ) : (
            <span>Use the six digit code sent to your mobile number.</span>
          )}
        </aside>
      </section>
    </main>
  );
}

export default StaffLogin;
